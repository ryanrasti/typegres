import { sql, PostgresDialect, Kysely } from 'kysely';
import { Pool } from 'pg';
import array from 'postgres-array';
import 'postgres-date';
import 'postgres-interval';
import 'postgres-bytea';
import range from 'postgres-range';

class QueryAlias {
    name;
    constructor(name) {
        this.name = name;
    }
}
class Context {
    // The list of tables in the current context (including aliases for subqueries)
    namespace;
    usedAliases;
    constructor(namespace) {
        this.namespace = namespace;
        this.usedAliases = new Set(namespace.values());
    }
    static new() {
        return new Context(new Map());
    }
    withReference(ref) {
        if (this.usedAliases.has(ref)) {
            throw new Error(`Alias "${ref}" already exists in the current context.`);
        }
        const newNamespace = new Map(this.namespace);
        newNamespace.set(new QueryAlias(ref), ref);
        return new Context(newNamespace);
    }
    withAliases(aliases) {
        const newNamespace = new Map(this.namespace);
        for (const alias of aliases) {
            let aliasName = alias.name;
            if (this.usedAliases.has(alias.name)) {
                for (const i of Array(100).keys()) {
                    aliasName = `${alias}_${i}`;
                    if (!this.usedAliases.has(aliasName)) {
                        break;
                    }
                    if (i === 99) {
                        throw new Error(`Alias ${aliasName} already exists in the current context: ${JSON.stringify(Array.from(this.usedAliases))}`);
                    }
                }
            }
            newNamespace.set(alias, aliasName);
        }
        return new Context(newNamespace);
    }
    getAlias(alias) {
        const name = this.namespace.get(alias);
        if (!name) {
            throw new Error(`Alias "${alias.name}" not found in the current context: ${JSON.stringify(Array.from(this.usedAliases))} / ${JSON.stringify(Array.from(this.namespace))}`);
        }
        return name;
    }
}
class Expression {
}
class LiteralExpression extends Expression {
    value;
    type;
    constructor(value, type) {
        super();
        this.value = value;
        this.type = type;
    }
    compile() {
        return sql `cast(${this.value} as ${sql.raw(this.type)})`;
    }
}
class LiteralUnknownExpression extends Expression {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    compile() {
        return sql `${this.value}`;
    }
}
class FunctionExpression extends Expression {
    name;
    args;
    constructor(name, args) {
        super();
        this.name = name;
        this.args = args;
    }
    compile(ctx) {
        return sql `${sql.ref(this.name)}(${sql.join(this.args.map((arg) => arg.compile(ctx)))})`;
    }
}
class BinaryOperatorExpression extends Expression {
    operator;
    args;
    constructor(operator, args) {
        super();
        this.operator = operator;
        this.args = args;
    }
    compile(ctx) {
        return sql `${this.args[0].compile(ctx)} ${sql.raw(this.operator)} ${this.args[1].compile(ctx)}`;
    }
}

const dialect = new PostgresDialect({
    pool: new Pool({
        host: "localhost",
        user: "postgres",
        port: 1234,
        max: 10,
        database: "test",
        types: {
            getTypeParser: (_oid, format) => {
                if (format === "binary") {
                    throw new Error("Binary format not supported");
                }
                return (v) => v;
            },
        },
    }),
});
const db$1 = new Kysely({
    dialect,
});

const Sentinel = class Sentinel {
    static typeString() {
        return "sentinel";
    }
};
const genericArgs = { T: Sentinel, R: Sentinel };
const getRetType = (args, defn) => {
    const { args: params, ret } = typeof defn === "function" ? defn(genericArgs) : defn;
    if (args.length !== params.length) {
        return false;
    }
    let genericBindsTo;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const param = params[i];
        if (param === Sentinel) {
            if (arg instanceof Any) {
                genericBindsTo = arg.getClass();
            }
            continue;
        }
        const subtype = param.subtype();
        const argSubtype = arg instanceof Any ? arg.getClass().subtype() : null;
        if (argSubtype != null && subtype?.subtype === Sentinel) {
            // If the argument is a subtype of the parameter, we can bind it
            // to the generic type.
            genericBindsTo = argSubtype.subtype;
            continue;
        }
        if (arg instanceof Any &&
            arg.getClass().typeString() !== param.typeString() &&
            !(arg instanceof param)) {
            // If the argument is not an instance of the parameter, we can't bind it.
            // Note that if the argument type is not an `Any` (i.e., its a primitive type),
            //  we assume it matches -- it shouldn't matter because we assert that primitive
            //  types will only be passed if all return types are the same.
            return false;
        }
    }
    if (!genericBindsTo) {
        if (ret === Sentinel) {
            throw new Error(`Cannot determine return type for function ${defn} with args ${args}`);
        }
        return { ret, genericBindsTo };
    }
    if (ret === Sentinel) {
        return { ret: genericBindsTo, genericBindsTo };
    }
    const retSubtype = "subtype" in ret && ret.subtype();
    if (retSubtype && retSubtype?.subtype === Sentinel) {
        return { ret: retSubtype.withSubtype(genericBindsTo), genericBindsTo };
    }
    return { ret, genericBindsTo };
};
class SelectableFunctionExpression extends SelectableExpression {
    fnExpr;
    constructor(fnExpr, schema) {
        super(schema);
        this.fnExpr = fnExpr;
    }
    compile(ctx) {
        return this.fnExpr.compile(ctx);
    }
}
const sqlFunction = (name, defn, args) => {
    const [{ matchingDef, RetType }] = defn.flatMap((def) => {
        const RetType = getRetType(args, def);
        return RetType
            ? [
                {
                    matchingDef: typeof def === "function" ? def(genericArgs) : def,
                    RetType: RetType.ret,
                    genericBindsTo: RetType.genericBindsTo,
                },
            ]
            : [];
    });
    if (!RetType) {
        console.error(`No matching function found for ${name}`, args, defn.map((d) => (typeof d === "function" ? d(genericArgs).args : d.args)));
        throw new Error(`No matching function found for ${name} with args ${JSON.stringify(args)} / ${JSON.stringify(defn)} / ${JSON.stringify(defn.map((d) => typeof d === "function" ? d(genericArgs).args : d.args))}`);
    }
    const argsAsExpressions = args.map((arg) => {
        if (arg instanceof Any) {
            return arg.toExpression();
        }
        // Rely on postgres to determine what the input type should be:
        return new LiteralUnknownExpression(arg);
    });
    return RetType.new(matchingDef.isOperator
        ? new BinaryOperatorExpression(name, argsAsExpressions)
        : new FunctionExpression(name, argsAsExpressions));
};

class PgAny {
    static parse(v) { return v; }
    static typeString() { return "any"; }
    anyValue(...args) {
        return sqlFunction("any_value", [({ T }) => ({ args: [T], ret: T, isOperator: false })], [this, ...args]);
    }
    anyValueTransfn(...args) {
        return sqlFunction("any_value_transfn", [({ T }) => ({ args: [T, T], ret: T, isOperator: false })], [this, ...args]);
    }
    arrayFill(...args) {
        return sqlFunction("array_fill", [({ T }) => ({ args: [T, Array$1.of((default_1$4))], ret: Array$1.of(T), isOperator: false }), ({ T }) => ({ args: [T, Array$1.of((default_1$4)), Array$1.of((default_1$4))], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arrayPrepend(...args) {
        return sqlFunction("array_prepend", [({ T }) => ({ args: [T, Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    concat(...args) {
        return sqlFunction("concat", [{ args: [(Any)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    count(...args) {
        return sqlFunction("count", [{ args: [(Any)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    cumeDist(...args) {
        return sqlFunction("cume_dist", [{ args: [(Any)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    denseRank(...args) {
        return sqlFunction("dense_rank", [{ args: [(Any)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    elemContainedByMultirange(...args) {
        return sqlFunction("elem_contained_by_multirange", [({ T }) => ({ args: [T, anymultirange], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    elemContainedByRange(...args) {
        return sqlFunction("elem_contained_by_range", [({ T }) => ({ args: [T, anyrange], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    firstValue(...args) {
        return sqlFunction("first_value", [({ T }) => ({ args: [T], ret: T, isOperator: false })], [this, ...args]);
    }
    jsonAgg(...args) {
        return sqlFunction("json_agg", [({ T }) => ({ args: [T], ret: (json), isOperator: false })], [this, ...args]);
    }
    jsonAggStrict(...args) {
        return sqlFunction("json_agg_strict", [({ T }) => ({ args: [T], ret: (json), isOperator: false })], [this, ...args]);
    }
    jsonBuildArray(...args) {
        return sqlFunction("json_build_array", [{ args: [(Any)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonBuildObject(...args) {
        return sqlFunction("json_build_object", [{ args: [(Any)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonObjectAgg(...args) {
        return sqlFunction("json_object_agg", [{ args: [(Any), (Any)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonObjectAggStrict(...args) {
        return sqlFunction("json_object_agg_strict", [{ args: [(Any), (Any)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonObjectAggUnique(...args) {
        return sqlFunction("json_object_agg_unique", [{ args: [(Any), (Any)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonObjectAggUniqueStrict(...args) {
        return sqlFunction("json_object_agg_unique_strict", [{ args: [(Any), (Any)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonPopulateRecord(...args) {
        return sqlFunction("json_populate_record", [({ T }) => ({ args: [T, (json), (default_1$8)], ret: T, isOperator: false })], [this, ...args]);
    }
    jsonPopulateRecordset(...args) {
        return sqlFunction("json_populate_recordset", [({ T }) => ({ args: [T, (json), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false })], [this, ...args]);
    }
    jsonbAgg(...args) {
        return sqlFunction("jsonb_agg", [({ T }) => ({ args: [T], ret: (jsonb), isOperator: false })], [this, ...args]);
    }
    jsonbAggStrict(...args) {
        return sqlFunction("jsonb_agg_strict", [({ T }) => ({ args: [T], ret: (jsonb), isOperator: false })], [this, ...args]);
    }
    jsonbBuildArray(...args) {
        return sqlFunction("jsonb_build_array", [{ args: [(Any)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbBuildObject(...args) {
        return sqlFunction("jsonb_build_object", [{ args: [(Any)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbObjectAgg(...args) {
        return sqlFunction("jsonb_object_agg", [{ args: [(Any), (Any)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbObjectAggStrict(...args) {
        return sqlFunction("jsonb_object_agg_strict", [{ args: [(Any), (Any)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbObjectAggUnique(...args) {
        return sqlFunction("jsonb_object_agg_unique", [{ args: [(Any), (Any)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbObjectAggUniqueStrict(...args) {
        return sqlFunction("jsonb_object_agg_unique_strict", [{ args: [(Any), (Any)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbPopulateRecord(...args) {
        return sqlFunction("jsonb_populate_record", [({ T }) => ({ args: [T, (jsonb)], ret: T, isOperator: false })], [this, ...args]);
    }
    jsonbPopulateRecordValid(...args) {
        return sqlFunction("jsonb_populate_record_valid", [({ T }) => ({ args: [T, (jsonb)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    jsonbPopulateRecordset(...args) {
        return sqlFunction("jsonb_populate_recordset", [({ T }) => ({ args: [T, (jsonb)], ret: Setof.ofSchema({}), isOperator: false })], [this, ...args]);
    }
    lag(...args) {
        return sqlFunction("lag", [({ T }) => ({ args: [T, (default_1$4), T], ret: T, isOperator: false }), ({ T }) => ({ args: [T], ret: T, isOperator: false }), ({ T }) => ({ args: [T, (default_1$4)], ret: T, isOperator: false })], [this, ...args]);
    }
    lastValue(...args) {
        return sqlFunction("last_value", [({ T }) => ({ args: [T], ret: T, isOperator: false })], [this, ...args]);
    }
    lead(...args) {
        return sqlFunction("lead", [({ T }) => ({ args: [T, (default_1$4), T], ret: T, isOperator: false }), ({ T }) => ({ args: [T], ret: T, isOperator: false }), ({ T }) => ({ args: [T, (default_1$4)], ret: T, isOperator: false })], [this, ...args]);
    }
    mode(...args) {
        return sqlFunction("mode", [({ T }) => ({ args: [T], ret: T, isOperator: false })], [this, ...args]);
    }
    nthValue(...args) {
        return sqlFunction("nth_value", [({ T }) => ({ args: [T, (default_1$4)], ret: T, isOperator: false })], [this, ...args]);
    }
    numNonnulls(...args) {
        return sqlFunction("num_nonnulls", [{ args: [(Any)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    numNulls(...args) {
        return sqlFunction("num_nulls", [{ args: [(Any)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    percentRank(...args) {
        return sqlFunction("percent_rank", [{ args: [(Any)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgCollationFor(...args) {
        return sqlFunction("pg_collation_for", [{ args: [(Any)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgColumnCompression(...args) {
        return sqlFunction("pg_column_compression", [{ args: [(Any)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgColumnSize(...args) {
        return sqlFunction("pg_column_size", [{ args: [(Any)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgColumnToastChunkId(...args) {
        return sqlFunction("pg_column_toast_chunk_id", [{ args: [(Any)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgTypeof(...args) {
        return sqlFunction("pg_typeof", [{ args: [(Any)], ret: (regtype), isOperator: false }], [this, ...args]);
    }
    quoteLiteral(...args) {
        return sqlFunction("quote_literal", [({ T }) => ({ args: [T], ret: (default_1$1), isOperator: false })], [this, ...args]);
    }
    quoteNullable(...args) {
        return sqlFunction("quote_nullable", [({ T }) => ({ args: [T], ret: (default_1$1), isOperator: false })], [this, ...args]);
    }
    rank(...args) {
        return sqlFunction("rank", [{ args: [(Any)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    toJson(...args) {
        return sqlFunction("to_json", [({ T }) => ({ args: [T], ret: (json), isOperator: false })], [this, ...args]);
    }
    toJsonb(...args) {
        return sqlFunction("to_jsonb", [({ T }) => ({ args: [T], ret: (jsonb), isOperator: false })], [this, ...args]);
    }
    widthBucket(...args) {
        return sqlFunction("width_bucket", [({ T }) => ({ args: [T, Array$1.of(T)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    ["||"](...args) {
        return sqlFunction("||", [({ T }) => ({ args: [T, Array$1.of(T)], ret: Array$1.of(T), isOperator: true })], [this, ...args]);
    }
    ["<@"](...args) {
        return sqlFunction("<@", [({ T }) => ({ args: [T, anymultirange], ret: (default_1$8), isOperator: true }), ({ T }) => ({ args: [T, anyrange], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
}

class Any extends PgAny {
    v;
    constructor(v) {
        super();
        this.v = v;
    }
    static new(v) {
        return new Any(v);
    }
    asAggregate() {
        return undefined;
    }
    static typeString() {
        return undefined;
    }
    static subtype() {
        return undefined;
    }
    toExpression() {
        if (this.v instanceof Expression) {
            return this.v;
        }
        const typeString = this.getClass()?.typeString();
        if (!typeString) {
            throw new Error(`Type string is not defined for ${this.constructor.name}`);
        }
        return new LiteralExpression(this.v, typeString);
    }
    serializeParamTypes = undefined;
    resultType = undefined;
    nullability = undefined;
    static parse(v) {
        return v;
    }
    then(resolve, reject) {
        const expr = this.toExpression();
        const kexpr = db$1.selectNoFrom(expr.compile(Context.new()).as("val"));
        kexpr
            .executeTakeFirst()
            ?.then((result) => resolve((result?.val != null
            ? this.getClass().parse(result.val)
            : result?.val)))
            .catch((err) => {
            console.error("Error executing query:", kexpr.compile(), err);
            reject(err);
        });
    }
    getClass() {
        return this.constructor;
    }
}

class aclitem extends Any {
    static new(v) { return new aclitem(v); }
    static parse(v) { return v; }
    static typeString() { return "aclitem"; }
    asAggregate() {
        return undefined;
    }
    aclitemeq(...args) {
        return sqlFunction("aclitemeq", [{ args: [(aclitem), (aclitem)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hashAclitem(...args) {
        return sqlFunction("hash_aclitem", [{ args: [(aclitem)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashAclitemExtended(...args) {
        return sqlFunction("hash_aclitem_extended", [{ args: [(aclitem), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(aclitem), (aclitem)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class anyenum extends Any {
    static parse(v) { return v; }
    static typeString() { return "anyenum"; }
    asAggregate() {
        return undefined;
    }
    enumCmp(...args) {
        return sqlFunction("enum_cmp", [({ T }) => ({ args: [T, T], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    enumEq(...args) {
        return sqlFunction("enum_eq", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    enumFirst(...args) {
        return sqlFunction("enum_first", [({ T }) => ({ args: [T], ret: T, isOperator: false })], [this, ...args]);
    }
    enumGe(...args) {
        return sqlFunction("enum_ge", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    enumGt(...args) {
        return sqlFunction("enum_gt", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    enumLarger(...args) {
        return sqlFunction("enum_larger", [({ T }) => ({ args: [T, T], ret: T, isOperator: false })], [this, ...args]);
    }
    enumLast(...args) {
        return sqlFunction("enum_last", [({ T }) => ({ args: [T], ret: T, isOperator: false })], [this, ...args]);
    }
    enumLe(...args) {
        return sqlFunction("enum_le", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    enumLt(...args) {
        return sqlFunction("enum_lt", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    enumNe(...args) {
        return sqlFunction("enum_ne", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    enumRange(...args) {
        return sqlFunction("enum_range", [({ T }) => ({ args: [T], ret: Array$1.of(T), isOperator: false }), ({ T }) => ({ args: [T, T], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    enumSmaller(...args) {
        return sqlFunction("enum_smaller", [({ T }) => ({ args: [T, T], ret: T, isOperator: false })], [this, ...args]);
    }
    hashenum(...args) {
        return sqlFunction("hashenum", [({ T }) => ({ args: [T], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    hashenumextended(...args) {
        return sqlFunction("hashenumextended", [({ T }) => ({ args: [T, (default_1$3)], ret: (default_1$3), isOperator: false })], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [({ T }) => ({ args: [T], ret: T, isOperator: false })], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
}

class anymultirange extends Any {
    static parse(v) { return v; }
    static typeString() { return "anymultirange"; }
    asAggregate() {
        return undefined;
    }
    hashMultirange(...args) {
        return sqlFunction("hash_multirange", [{ args: [anymultirange], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashMultirangeExtended(...args) {
        return sqlFunction("hash_multirange_extended", [{ args: [anymultirange, (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    isempty(...args) {
        return sqlFunction("isempty", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lower(...args) {
        return sqlFunction("lower", [({ T }) => ({ args: [anymultirange], ret: T, isOperator: false })], [this, ...args]);
    }
    lowerInc(...args) {
        return sqlFunction("lower_inc", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lowerInf(...args) {
        return sqlFunction("lower_inf", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeAdjacentMultirange(...args) {
        return sqlFunction("multirange_adjacent_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeAdjacentRange(...args) {
        return sqlFunction("multirange_adjacent_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeAfterMultirange(...args) {
        return sqlFunction("multirange_after_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeAfterRange(...args) {
        return sqlFunction("multirange_after_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeBeforeMultirange(...args) {
        return sqlFunction("multirange_before_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeBeforeRange(...args) {
        return sqlFunction("multirange_before_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeCmp(...args) {
        return sqlFunction("multirange_cmp", [{ args: [anymultirange, anymultirange], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    multirangeContainedByMultirange(...args) {
        return sqlFunction("multirange_contained_by_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeContainedByRange(...args) {
        return sqlFunction("multirange_contained_by_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeContainsElem(...args) {
        return sqlFunction("multirange_contains_elem", [({ T }) => ({ args: [anymultirange, T], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    multirangeContainsMultirange(...args) {
        return sqlFunction("multirange_contains_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeContainsRange(...args) {
        return sqlFunction("multirange_contains_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeEq(...args) {
        return sqlFunction("multirange_eq", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeGe(...args) {
        return sqlFunction("multirange_ge", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeGt(...args) {
        return sqlFunction("multirange_gt", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeIntersect(...args) {
        return sqlFunction("multirange_intersect", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: false }], [this, ...args]);
    }
    multirangeIntersectAggTransfn(...args) {
        return sqlFunction("multirange_intersect_agg_transfn", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: false }], [this, ...args]);
    }
    multirangeLe(...args) {
        return sqlFunction("multirange_le", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeLt(...args) {
        return sqlFunction("multirange_lt", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeMinus(...args) {
        return sqlFunction("multirange_minus", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: false }], [this, ...args]);
    }
    multirangeNe(...args) {
        return sqlFunction("multirange_ne", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeOverlapsMultirange(...args) {
        return sqlFunction("multirange_overlaps_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeOverlapsRange(...args) {
        return sqlFunction("multirange_overlaps_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeOverleftMultirange(...args) {
        return sqlFunction("multirange_overleft_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeOverleftRange(...args) {
        return sqlFunction("multirange_overleft_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeOverrightMultirange(...args) {
        return sqlFunction("multirange_overright_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeOverrightRange(...args) {
        return sqlFunction("multirange_overright_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirangeUnion(...args) {
        return sqlFunction("multirange_union", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: false }], [this, ...args]);
    }
    rangeAgg(...args) {
        return sqlFunction("range_agg", [{ args: [anymultirange], ret: anymultirange, isOperator: false }], [this, ...args]);
    }
    rangeIntersectAgg(...args) {
        return sqlFunction("range_intersect_agg", [{ args: [anymultirange], ret: anymultirange, isOperator: false }], [this, ...args]);
    }
    rangeMerge(...args) {
        return sqlFunction("range_merge", [{ args: [anymultirange], ret: anyrange, isOperator: false }], [this, ...args]);
    }
    unnest(...args) {
        return sqlFunction("unnest", [{ args: [anymultirange], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    upper(...args) {
        return sqlFunction("upper", [({ T }) => ({ args: [anymultirange], ret: T, isOperator: false })], [this, ...args]);
    }
    upperInc(...args) {
        return sqlFunction("upper_inc", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    upperInf(...args) {
        return sqlFunction("upper_inf", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["-|-"](...args) {
        return sqlFunction("-|-", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }, { args: [anymultirange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }, { args: [anymultirange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }, { args: [anymultirange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [({ T }) => ({ args: [anymultirange, T], ret: (default_1$8), isOperator: true }), { args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }, { args: [anymultirange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&&"](...args) {
        return sqlFunction("&&", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }, { args: [anymultirange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&<"](...args) {
        return sqlFunction("&<", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }, { args: [anymultirange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&>"](...args) {
        return sqlFunction("&>", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: true }, { args: [anymultirange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: true }], [this, ...args]);
    }
}

class anynonarray extends Any {
    static parse(v) { return v; }
    static typeString() { return "anynonarray"; }
    asAggregate() {
        return undefined;
    }
    anytextcat(...args) {
        return sqlFunction("anytextcat", [({ T }) => ({ args: [T, (default_1$1)], ret: (default_1$1), isOperator: false })], [this, ...args]);
    }
    arrayAgg(...args) {
        return sqlFunction("array_agg", [({ T }) => ({ args: [T], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
}

class anyrange extends Any {
    static parse(v) { return v; }
    static typeString() { return "anyrange"; }
    asAggregate() {
        return undefined;
    }
    hashRange(...args) {
        return sqlFunction("hash_range", [{ args: [anyrange], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashRangeExtended(...args) {
        return sqlFunction("hash_range_extended", [{ args: [anyrange, (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    isempty(...args) {
        return sqlFunction("isempty", [{ args: [anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lower(...args) {
        return sqlFunction("lower", [({ T }) => ({ args: [anyrange], ret: T, isOperator: false })], [this, ...args]);
    }
    lowerInc(...args) {
        return sqlFunction("lower_inc", [{ args: [anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lowerInf(...args) {
        return sqlFunction("lower_inf", [{ args: [anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    multirange(...args) {
        return sqlFunction("multirange", [{ args: [anyrange], ret: anymultirange, isOperator: false }], [this, ...args]);
    }
    rangeAdjacent(...args) {
        return sqlFunction("range_adjacent", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeAdjacentMultirange(...args) {
        return sqlFunction("range_adjacent_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeAfter(...args) {
        return sqlFunction("range_after", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeAfterMultirange(...args) {
        return sqlFunction("range_after_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeAgg(...args) {
        return sqlFunction("range_agg", [{ args: [anyrange], ret: anymultirange, isOperator: false }], [this, ...args]);
    }
    rangeBefore(...args) {
        return sqlFunction("range_before", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeBeforeMultirange(...args) {
        return sqlFunction("range_before_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeCmp(...args) {
        return sqlFunction("range_cmp", [{ args: [anyrange, anyrange], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    rangeContainedBy(...args) {
        return sqlFunction("range_contained_by", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeContainedByMultirange(...args) {
        return sqlFunction("range_contained_by_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeContains(...args) {
        return sqlFunction("range_contains", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeContainsElem(...args) {
        return sqlFunction("range_contains_elem", [({ T }) => ({ args: [anyrange, T], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    rangeContainsMultirange(...args) {
        return sqlFunction("range_contains_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeEq(...args) {
        return sqlFunction("range_eq", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeGe(...args) {
        return sqlFunction("range_ge", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeGt(...args) {
        return sqlFunction("range_gt", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeIntersect(...args) {
        return sqlFunction("range_intersect", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], [this, ...args]);
    }
    rangeIntersectAgg(...args) {
        return sqlFunction("range_intersect_agg", [{ args: [anyrange], ret: anyrange, isOperator: false }], [this, ...args]);
    }
    rangeIntersectAggTransfn(...args) {
        return sqlFunction("range_intersect_agg_transfn", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], [this, ...args]);
    }
    rangeLe(...args) {
        return sqlFunction("range_le", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeLt(...args) {
        return sqlFunction("range_lt", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeMerge(...args) {
        return sqlFunction("range_merge", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], [this, ...args]);
    }
    rangeMinus(...args) {
        return sqlFunction("range_minus", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], [this, ...args]);
    }
    rangeNe(...args) {
        return sqlFunction("range_ne", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeOverlaps(...args) {
        return sqlFunction("range_overlaps", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeOverlapsMultirange(...args) {
        return sqlFunction("range_overlaps_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeOverleft(...args) {
        return sqlFunction("range_overleft", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeOverleftMultirange(...args) {
        return sqlFunction("range_overleft_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeOverright(...args) {
        return sqlFunction("range_overright", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeOverrightMultirange(...args) {
        return sqlFunction("range_overright_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rangeUnion(...args) {
        return sqlFunction("range_union", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], [this, ...args]);
    }
    upper(...args) {
        return sqlFunction("upper", [({ T }) => ({ args: [anyrange], ret: T, isOperator: false })], [this, ...args]);
    }
    upperInc(...args) {
        return sqlFunction("upper_inc", [{ args: [anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    upperInf(...args) {
        return sqlFunction("upper_inf", [{ args: [anyrange], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["-|-"](...args) {
        return sqlFunction("-|-", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }, { args: [anyrange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }, { args: [anyrange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }, { args: [anyrange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }, ({ T }) => ({ args: [anyrange, T], ret: (default_1$8), isOperator: true }), { args: [anyrange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&&"](...args) {
        return sqlFunction("&&", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }, { args: [anyrange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&<"](...args) {
        return sqlFunction("&<", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }, { args: [anyrange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&>"](...args) {
        return sqlFunction("&>", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: true }, { args: [anyrange, anymultirange], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: true }], [this, ...args]);
    }
}

class bit$1 extends Any {
    static new(v) { return new bit$1(v); }
    static parse(v) { return v; }
    static typeString() { return "bit"; }
    asAggregate() {
        return undefined;
    }
    bit(...args) {
        return sqlFunction("bit", [{ args: [(bit$1), (default_1$4), (default_1$8)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitAnd(...args) {
        return sqlFunction("bit_and", [{ args: [(bit$1)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitCount(...args) {
        return sqlFunction("bit_count", [{ args: [(bit$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    bitLength(...args) {
        return sqlFunction("bit_length", [{ args: [(bit$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    bitOr(...args) {
        return sqlFunction("bit_or", [{ args: [(bit$1)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitXor(...args) {
        return sqlFunction("bit_xor", [{ args: [(bit$1)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitand(...args) {
        return sqlFunction("bitand", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitcmp(...args) {
        return sqlFunction("bitcmp", [{ args: [(bit$1), (bit$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    biteq(...args) {
        return sqlFunction("biteq", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bitge(...args) {
        return sqlFunction("bitge", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bitgt(...args) {
        return sqlFunction("bitgt", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bitle(...args) {
        return sqlFunction("bitle", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bitlt(...args) {
        return sqlFunction("bitlt", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bitne(...args) {
        return sqlFunction("bitne", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bitnot(...args) {
        return sqlFunction("bitnot", [{ args: [(bit$1)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitor(...args) {
        return sqlFunction("bitor", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitshiftleft(...args) {
        return sqlFunction("bitshiftleft", [{ args: [(bit$1), (default_1$4)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitshiftright(...args) {
        return sqlFunction("bitshiftright", [{ args: [(bit$1), (default_1$4)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitxor(...args) {
        return sqlFunction("bitxor", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    getBit(...args) {
        return sqlFunction("get_bit", [{ args: [(bit$1), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(bit$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int8(...args) {
        return sqlFunction("int8", [{ args: [(bit$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    length(...args) {
        return sqlFunction("length", [{ args: [(bit$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    octetLength(...args) {
        return sqlFunction("octet_length", [{ args: [(bit$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    overlay(...args) {
        return sqlFunction("overlay", [{ args: [(bit$1), (bit$1), (default_1$4)], ret: (bit$1), isOperator: false }, { args: [(bit$1), (bit$1), (default_1$4), (default_1$4)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    position(...args) {
        return sqlFunction("position", [{ args: [(bit$1), (bit$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    setBit(...args) {
        return sqlFunction("set_bit", [{ args: [(bit$1), (default_1$4), (default_1$4)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    substring(...args) {
        return sqlFunction("substring", [{ args: [(bit$1), (default_1$4)], ret: (bit$1), isOperator: false }, { args: [(bit$1), (default_1$4), (default_1$4)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    ["&"](...args) {
        return sqlFunction("&", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["|"](...args) {
        return sqlFunction("|", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(bit$1), (default_1$4)], ret: (bit$1), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(bit$1), (default_1$4)], ret: (bit$1), isOperator: true }], [this, ...args]);
    }
    ["#"](...args) {
        return sqlFunction("#", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: true }], [this, ...args]);
    }
}

// Adapted from `node-pg-types` (https://github.com/brianc/node-pg-types/blob/master/lib/textParsers.js)
function parseBool(value) {
    return (value === "TRUE" ||
        value === "t" ||
        value === "true" ||
        value === "y" ||
        value === "yes" ||
        value === "on" ||
        value === "1");
}
range.parse;

const typeMap = {
    bool: {
        parse: parseBool,
        serialize: (value) => (value ? "true" : "false"),
        serializeFromTypes: ["boolean"],
    },
    int2: {
        parse: Number,
        serialize: (value) => value.toString(),
        serializeFromTypes: ["number"],
    },
    int4: {
        parse: Number,
        serialize: (value) => value.toString(),
        serializeFromTypes: ["number"],
    },
    int8: {
        parse: BigInt,
        serialize: (value) => value.toString(),
        serializeFromTypes: ["bigint"],
    },
    float4: {
        parse: parseFloat,
        serialize: (value) => value.toString(),
        serializeFromTypes: ["number"],
    },
    float8: {
        parse: parseFloat,
        serialize: (value) => value.toString(),
        serializeFromTypes: ["number"],
    },
    numeric: {
        parse: (x) => x,
        serialize: (value) => value.toString(),
        serializeFromTypes: ["number", "bigint", "string"],
    },
    text: {
        parse: (x) => x,
        serialize: (value) => value,
        serializeFromTypes: ["string"],
    },
};

let default_1$8 = class default_1 extends Any {
    static new(v) { return new default_1$8(v); }
    static serializeParamTypes = undefined;
    static parse(v) { return typeMap["bool"].parse(v); }
    static typeString() { return "bool"; }
    asAggregate() {
        return undefined;
    }
    binaryUpgradeSetRecordInitPrivs(...args) {
        return sqlFunction("binary_upgrade_set_record_init_privs", [{ args: [(default_1$8)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    boolAnd(...args) {
        return sqlFunction("bool_and", [{ args: [(default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boolOr(...args) {
        return sqlFunction("bool_or", [{ args: [(default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boolandStatefunc(...args) {
        return sqlFunction("booland_statefunc", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    booleq(...args) {
        return sqlFunction("booleq", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boolge(...args) {
        return sqlFunction("boolge", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boolgt(...args) {
        return sqlFunction("boolgt", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boolle(...args) {
        return sqlFunction("boolle", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boollt(...args) {
        return sqlFunction("boollt", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boolne(...args) {
        return sqlFunction("boolne", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boolorStatefunc(...args) {
        return sqlFunction("boolor_statefunc", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    btboolcmp(...args) {
        return sqlFunction("btboolcmp", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    currentSchemas(...args) {
        return sqlFunction("current_schemas", [{ args: [(default_1$8)], ret: Array$1.of((name$1)), isOperator: false }], [this, ...args]);
    }
    databaseToXml(...args) {
        return sqlFunction("database_to_xml", [{ args: [(default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    databaseToXmlAndXmlschema(...args) {
        return sqlFunction("database_to_xml_and_xmlschema", [{ args: [(default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    databaseToXmlschema(...args) {
        return sqlFunction("database_to_xmlschema", [{ args: [(default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    every(...args) {
        return sqlFunction("every", [{ args: [(default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(default_1$8)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgBackupStop(...args) {
        return sqlFunction("pg_backup_stop", [{ args: [(default_1$8)], ret: Record.of({ lsn: (pg_lsn), labelfile: (default_1$1), spcmapfile: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    pgLogicalEmitMessage(...args) {
        return sqlFunction("pg_logical_emit_message", [{ args: [(default_1$8), (default_1$1), (bytea), (default_1$8)], ret: (pg_lsn), isOperator: false }, { args: [(default_1$8), (default_1$1), (default_1$1), (default_1$8)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgPromote(...args) {
        return sqlFunction("pg_promote", [{ args: [(default_1$8), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgReplicationOriginSessionProgress(...args) {
        return sqlFunction("pg_replication_origin_session_progress", [{ args: [(default_1$8)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    text(...args) {
        return sqlFunction("text", [{ args: [(default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
};

class box$1 extends Any {
    static new(v) { return new box$1(v); }
    static parse(v) { return v; }
    static typeString() { return "box"; }
    asAggregate() {
        return undefined;
    }
    area(...args) {
        return sqlFunction("area", [{ args: [(box$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    boundBox(...args) {
        return sqlFunction("bound_box", [{ args: [(box$1), (box$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    boxAbove(...args) {
        return sqlFunction("box_above", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxAboveEq(...args) {
        return sqlFunction("box_above_eq", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxAdd(...args) {
        return sqlFunction("box_add", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    boxBelow(...args) {
        return sqlFunction("box_below", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxBelowEq(...args) {
        return sqlFunction("box_below_eq", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxCenter(...args) {
        return sqlFunction("box_center", [{ args: [(box$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    boxContainPt(...args) {
        return sqlFunction("box_contain_pt", [{ args: [(box$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxContained(...args) {
        return sqlFunction("box_contained", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxDistance(...args) {
        return sqlFunction("box_distance", [{ args: [(box$1), (box$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    boxDiv(...args) {
        return sqlFunction("box_div", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    boxEq(...args) {
        return sqlFunction("box_eq", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxGe(...args) {
        return sqlFunction("box_ge", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxGt(...args) {
        return sqlFunction("box_gt", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxIntersect(...args) {
        return sqlFunction("box_intersect", [{ args: [(box$1), (box$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    boxLe(...args) {
        return sqlFunction("box_le", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxLeft(...args) {
        return sqlFunction("box_left", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxLt(...args) {
        return sqlFunction("box_lt", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxMul(...args) {
        return sqlFunction("box_mul", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    boxOverabove(...args) {
        return sqlFunction("box_overabove", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxOverbelow(...args) {
        return sqlFunction("box_overbelow", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxOverlap(...args) {
        return sqlFunction("box_overlap", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }, { args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxOverleft(...args) {
        return sqlFunction("box_overleft", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxOverright(...args) {
        return sqlFunction("box_overright", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxRight(...args) {
        return sqlFunction("box_right", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxSame(...args) {
        return sqlFunction("box_same", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    boxSub(...args) {
        return sqlFunction("box_sub", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    center(...args) {
        return sqlFunction("center", [{ args: [(box$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    circle(...args) {
        return sqlFunction("circle", [{ args: [(box$1)], ret: (circle$1), isOperator: false }], [this, ...args]);
    }
    diagonal(...args) {
        return sqlFunction("diagonal", [{ args: [(box$1)], ret: (lseg$1), isOperator: false }], [this, ...args]);
    }
    distBp(...args) {
        return sqlFunction("dist_bp", [{ args: [(box$1), (point$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distBs(...args) {
        return sqlFunction("dist_bs", [{ args: [(box$1), (lseg$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    height(...args) {
        return sqlFunction("height", [{ args: [(box$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    lseg(...args) {
        return sqlFunction("lseg", [{ args: [(box$1)], ret: (lseg$1), isOperator: false }], [this, ...args]);
    }
    point(...args) {
        return sqlFunction("point", [{ args: [(box$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    polygon(...args) {
        return sqlFunction("polygon", [{ args: [(box$1)], ret: (polygon$1), isOperator: false }], [this, ...args]);
    }
    width(...args) {
        return sqlFunction("width", [{ args: [(box$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ["|>>"](...args) {
        return sqlFunction("|>>", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">^"](...args) {
        return sqlFunction(">^", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: true }], [this, ...args]);
    }
    ["<<|"](...args) {
        return sqlFunction("<<|", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<^"](...args) {
        return sqlFunction("<^", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [{ args: [(box$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<->"](...args) {
        return sqlFunction("<->", [{ args: [(box$1), (box$1)], ret: (default_1$6), isOperator: true }, { args: [(box$1), (point$1)], ret: (default_1$6), isOperator: true }, { args: [(box$1), (lseg$1)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["#"](...args) {
        return sqlFunction("#", [{ args: [(box$1), (box$1)], ret: (box$1), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: true }], [this, ...args]);
    }
    ["|&>"](...args) {
        return sqlFunction("|&>", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&<|"](...args) {
        return sqlFunction("&<|", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["?#"](...args) {
        return sqlFunction("?#", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&&"](...args) {
        return sqlFunction("&&", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&<"](...args) {
        return sqlFunction("&<", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&>"](...args) {
        return sqlFunction("&>", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~="](...args) {
        return sqlFunction("~=", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: true }], [this, ...args]);
    }
}

class bpchar$1 extends Any {
    static new(v) { return new bpchar$1(v); }
    static parse(v) { return v; }
    static typeString() { return "bpchar"; }
    asAggregate() {
        return undefined;
    }
    bpchar(...args) {
        return sqlFunction("bpchar", [{ args: [(bpchar$1), (default_1$4), (default_1$8)], ret: (bpchar$1), isOperator: false }], [this, ...args]);
    }
    bpcharLarger(...args) {
        return sqlFunction("bpchar_larger", [{ args: [(bpchar$1), (bpchar$1)], ret: (bpchar$1), isOperator: false }], [this, ...args]);
    }
    bpcharPatternGe(...args) {
        return sqlFunction("bpchar_pattern_ge", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharPatternGt(...args) {
        return sqlFunction("bpchar_pattern_gt", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharPatternLe(...args) {
        return sqlFunction("bpchar_pattern_le", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharPatternLt(...args) {
        return sqlFunction("bpchar_pattern_lt", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharSmaller(...args) {
        return sqlFunction("bpchar_smaller", [{ args: [(bpchar$1), (bpchar$1)], ret: (bpchar$1), isOperator: false }], [this, ...args]);
    }
    bpcharcmp(...args) {
        return sqlFunction("bpcharcmp", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    bpchareq(...args) {
        return sqlFunction("bpchareq", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharge(...args) {
        return sqlFunction("bpcharge", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpchargt(...args) {
        return sqlFunction("bpchargt", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpchariclike(...args) {
        return sqlFunction("bpchariclike", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharicnlike(...args) {
        return sqlFunction("bpcharicnlike", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharicregexeq(...args) {
        return sqlFunction("bpcharicregexeq", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharicregexne(...args) {
        return sqlFunction("bpcharicregexne", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharle(...args) {
        return sqlFunction("bpcharle", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharlike(...args) {
        return sqlFunction("bpcharlike", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharlt(...args) {
        return sqlFunction("bpcharlt", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharne(...args) {
        return sqlFunction("bpcharne", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharnlike(...args) {
        return sqlFunction("bpcharnlike", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharregexeq(...args) {
        return sqlFunction("bpcharregexeq", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpcharregexne(...args) {
        return sqlFunction("bpcharregexne", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    btbpcharPatternCmp(...args) {
        return sqlFunction("btbpchar_pattern_cmp", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    charLength(...args) {
        return sqlFunction("char_length", [{ args: [(bpchar$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    characterLength(...args) {
        return sqlFunction("character_length", [{ args: [(bpchar$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashbpchar(...args) {
        return sqlFunction("hashbpchar", [{ args: [(bpchar$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashbpcharextended(...args) {
        return sqlFunction("hashbpcharextended", [{ args: [(bpchar$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    length(...args) {
        return sqlFunction("length", [{ args: [(bpchar$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(bpchar$1)], ret: (bpchar$1), isOperator: false }], [this, ...args]);
    }
    name(...args) {
        return sqlFunction("name", [{ args: [(bpchar$1)], ret: (name$1), isOperator: false }], [this, ...args]);
    }
    octetLength(...args) {
        return sqlFunction("octet_length", [{ args: [(bpchar$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    text(...args) {
        return sqlFunction("text", [{ args: [(bpchar$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    ["~>=~"](...args) {
        return sqlFunction("~>=~", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~>~"](...args) {
        return sqlFunction("~>~", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~<=~"](...args) {
        return sqlFunction("~<=~", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~<~"](...args) {
        return sqlFunction("~<~", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~~*"](...args) {
        return sqlFunction("~~*", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~~*"](...args) {
        return sqlFunction("!~~*", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~*"](...args) {
        return sqlFunction("~*", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~*"](...args) {
        return sqlFunction("!~*", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~~"](...args) {
        return sqlFunction("~~", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~~"](...args) {
        return sqlFunction("!~~", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~"](...args) {
        return sqlFunction("~", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~"](...args) {
        return sqlFunction("!~", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class bytea extends Any {
    static new(v) { return new bytea(v); }
    static parse(v) { return v; }
    static typeString() { return "bytea"; }
    asAggregate() {
        return undefined;
    }
    bitCount(...args) {
        return sqlFunction("bit_count", [{ args: [(bytea)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    bitLength(...args) {
        return sqlFunction("bit_length", [{ args: [(bytea)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btrim(...args) {
        return sqlFunction("btrim", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    byteacat(...args) {
        return sqlFunction("byteacat", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    byteacmp(...args) {
        return sqlFunction("byteacmp", [{ args: [(bytea), (bytea)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    byteaeq(...args) {
        return sqlFunction("byteaeq", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    byteage(...args) {
        return sqlFunction("byteage", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    byteagt(...args) {
        return sqlFunction("byteagt", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    byteale(...args) {
        return sqlFunction("byteale", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bytealike(...args) {
        return sqlFunction("bytealike", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bytealt(...args) {
        return sqlFunction("bytealt", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    byteane(...args) {
        return sqlFunction("byteane", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    byteanlike(...args) {
        return sqlFunction("byteanlike", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    convert(...args) {
        return sqlFunction("convert", [{ args: [(bytea), (name$1), (name$1)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    convertFrom(...args) {
        return sqlFunction("convert_from", [{ args: [(bytea), (name$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    encode(...args) {
        return sqlFunction("encode", [{ args: [(bytea), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    getBit(...args) {
        return sqlFunction("get_bit", [{ args: [(bytea), (default_1$3)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    getByte(...args) {
        return sqlFunction("get_byte", [{ args: [(bytea), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    length(...args) {
        return sqlFunction("length", [{ args: [(bytea)], ret: (default_1$4), isOperator: false }, { args: [(bytea), (name$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    like(...args) {
        return sqlFunction("like", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    likeEscape(...args) {
        return sqlFunction("like_escape", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    ltrim(...args) {
        return sqlFunction("ltrim", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    md5(...args) {
        return sqlFunction("md5", [{ args: [(bytea)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    notlike(...args) {
        return sqlFunction("notlike", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    octetLength(...args) {
        return sqlFunction("octet_length", [{ args: [(bytea)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    overlay(...args) {
        return sqlFunction("overlay", [{ args: [(bytea), (bytea), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(bytea), (bytea), (default_1$4), (default_1$4)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    position(...args) {
        return sqlFunction("position", [{ args: [(bytea), (bytea)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    rtrim(...args) {
        return sqlFunction("rtrim", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    setBit(...args) {
        return sqlFunction("set_bit", [{ args: [(bytea), (default_1$3), (default_1$4)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    setByte(...args) {
        return sqlFunction("set_byte", [{ args: [(bytea), (default_1$4), (default_1$4)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    sha224(...args) {
        return sqlFunction("sha224", [{ args: [(bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    sha256(...args) {
        return sqlFunction("sha256", [{ args: [(bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    sha384(...args) {
        return sqlFunction("sha384", [{ args: [(bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    sha512(...args) {
        return sqlFunction("sha512", [{ args: [(bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    stringAgg(...args) {
        return sqlFunction("string_agg", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    substr(...args) {
        return sqlFunction("substr", [{ args: [(bytea), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(bytea), (default_1$4), (default_1$4)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    substring(...args) {
        return sqlFunction("substring", [{ args: [(bytea), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(bytea), (default_1$4), (default_1$4)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~~"](...args) {
        return sqlFunction("~~", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~~"](...args) {
        return sqlFunction("!~~", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class char$1 extends Any {
    static new(v) { return new char$1(v); }
    static parse(v) { return v; }
    static typeString() { return "char"; }
    asAggregate() {
        return undefined;
    }
    acldefault(...args) {
        return sqlFunction("acldefault", [{ args: [(char$1), (oid$1)], ret: Array$1.of((aclitem)), isOperator: false }], [this, ...args]);
    }
    bpchar(...args) {
        return sqlFunction("bpchar", [{ args: [(char$1)], ret: (bpchar$1), isOperator: false }], [this, ...args]);
    }
    btcharcmp(...args) {
        return sqlFunction("btcharcmp", [{ args: [(char$1), (char$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    chareq(...args) {
        return sqlFunction("chareq", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    charge(...args) {
        return sqlFunction("charge", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    chargt(...args) {
        return sqlFunction("chargt", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    charle(...args) {
        return sqlFunction("charle", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    charlt(...args) {
        return sqlFunction("charlt", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    charne(...args) {
        return sqlFunction("charne", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hashchar(...args) {
        return sqlFunction("hashchar", [{ args: [(char$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashcharextended(...args) {
        return sqlFunction("hashcharextended", [{ args: [(char$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(char$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    text(...args) {
        return sqlFunction("text", [{ args: [(char$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class cid extends Any {
    static new(v) { return new cid(v); }
    static parse(v) { return v; }
    static typeString() { return "cid"; }
    asAggregate() {
        return undefined;
    }
    cideq(...args) {
        return sqlFunction("cideq", [{ args: [(cid), (cid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(cid), (cid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class cidr$1 extends Any {
    static new(v) { return new cidr$1(v); }
    static parse(v) { return v; }
    static typeString() { return "cidr"; }
    asAggregate() {
        return undefined;
    }
    abbrev(...args) {
        return sqlFunction("abbrev", [{ args: [(cidr$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    setMasklen(...args) {
        return sqlFunction("set_masklen", [{ args: [(cidr$1), (default_1$4)], ret: (cidr$1), isOperator: false }], [this, ...args]);
    }
}

class circle$1 extends Any {
    static new(v) { return new circle$1(v); }
    static parse(v) { return v; }
    static typeString() { return "circle"; }
    asAggregate() {
        return undefined;
    }
    area(...args) {
        return sqlFunction("area", [{ args: [(circle$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    box(...args) {
        return sqlFunction("box", [{ args: [(circle$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    center(...args) {
        return sqlFunction("center", [{ args: [(circle$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    circleAbove(...args) {
        return sqlFunction("circle_above", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleAddPt(...args) {
        return sqlFunction("circle_add_pt", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: false }], [this, ...args]);
    }
    circleBelow(...args) {
        return sqlFunction("circle_below", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleCenter(...args) {
        return sqlFunction("circle_center", [{ args: [(circle$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    circleContainPt(...args) {
        return sqlFunction("circle_contain_pt", [{ args: [(circle$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleContained(...args) {
        return sqlFunction("circle_contained", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleDistance(...args) {
        return sqlFunction("circle_distance", [{ args: [(circle$1), (circle$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    circleDivPt(...args) {
        return sqlFunction("circle_div_pt", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: false }], [this, ...args]);
    }
    circleEq(...args) {
        return sqlFunction("circle_eq", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleGe(...args) {
        return sqlFunction("circle_ge", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleGt(...args) {
        return sqlFunction("circle_gt", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleLe(...args) {
        return sqlFunction("circle_le", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleLeft(...args) {
        return sqlFunction("circle_left", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleLt(...args) {
        return sqlFunction("circle_lt", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleMulPt(...args) {
        return sqlFunction("circle_mul_pt", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: false }], [this, ...args]);
    }
    circleNe(...args) {
        return sqlFunction("circle_ne", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleOverabove(...args) {
        return sqlFunction("circle_overabove", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleOverbelow(...args) {
        return sqlFunction("circle_overbelow", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleOverlap(...args) {
        return sqlFunction("circle_overlap", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleOverleft(...args) {
        return sqlFunction("circle_overleft", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleOverright(...args) {
        return sqlFunction("circle_overright", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleRight(...args) {
        return sqlFunction("circle_right", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleSame(...args) {
        return sqlFunction("circle_same", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    circleSubPt(...args) {
        return sqlFunction("circle_sub_pt", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: false }], [this, ...args]);
    }
    diameter(...args) {
        return sqlFunction("diameter", [{ args: [(circle$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distCpoint(...args) {
        return sqlFunction("dist_cpoint", [{ args: [(circle$1), (point$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distCpoly(...args) {
        return sqlFunction("dist_cpoly", [{ args: [(circle$1), (polygon$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    point(...args) {
        return sqlFunction("point", [{ args: [(circle$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    polygon(...args) {
        return sqlFunction("polygon", [{ args: [(circle$1)], ret: (polygon$1), isOperator: false }], [this, ...args]);
    }
    radius(...args) {
        return sqlFunction("radius", [{ args: [(circle$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ["|>>"](...args) {
        return sqlFunction("|>>", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: true }], [this, ...args]);
    }
    ["<<|"](...args) {
        return sqlFunction("<<|", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [{ args: [(circle$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<->"](...args) {
        return sqlFunction("<->", [{ args: [(circle$1), (circle$1)], ret: (default_1$6), isOperator: true }, { args: [(circle$1), (point$1)], ret: (default_1$6), isOperator: true }, { args: [(circle$1), (polygon$1)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["|&>"](...args) {
        return sqlFunction("|&>", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&<|"](...args) {
        return sqlFunction("&<|", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&&"](...args) {
        return sqlFunction("&&", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&<"](...args) {
        return sqlFunction("&<", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&>"](...args) {
        return sqlFunction("&>", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~="](...args) {
        return sqlFunction("~=", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: true }], [this, ...args]);
    }
}

class date$1 extends Any {
    static new(v) { return new date$1(v); }
    static parse(v) { return v; }
    static typeString() { return "date"; }
    asAggregate() {
        return undefined;
    }
    dateCmp(...args) {
        return sqlFunction("date_cmp", [{ args: [(date$1), (date$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    dateCmpTimestamp(...args) {
        return sqlFunction("date_cmp_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    dateCmpTimestamptz(...args) {
        return sqlFunction("date_cmp_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    dateEq(...args) {
        return sqlFunction("date_eq", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateEqTimestamp(...args) {
        return sqlFunction("date_eq_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateEqTimestamptz(...args) {
        return sqlFunction("date_eq_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateGe(...args) {
        return sqlFunction("date_ge", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateGeTimestamp(...args) {
        return sqlFunction("date_ge_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateGeTimestamptz(...args) {
        return sqlFunction("date_ge_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateGt(...args) {
        return sqlFunction("date_gt", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateGtTimestamp(...args) {
        return sqlFunction("date_gt_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateGtTimestamptz(...args) {
        return sqlFunction("date_gt_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateLarger(...args) {
        return sqlFunction("date_larger", [{ args: [(date$1), (date$1)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    dateLe(...args) {
        return sqlFunction("date_le", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateLeTimestamp(...args) {
        return sqlFunction("date_le_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateLeTimestamptz(...args) {
        return sqlFunction("date_le_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateLt(...args) {
        return sqlFunction("date_lt", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateLtTimestamp(...args) {
        return sqlFunction("date_lt_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateLtTimestamptz(...args) {
        return sqlFunction("date_lt_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateMi(...args) {
        return sqlFunction("date_mi", [{ args: [(date$1), (date$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    dateMiInterval(...args) {
        return sqlFunction("date_mi_interval", [{ args: [(date$1), (interval$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    dateMii(...args) {
        return sqlFunction("date_mii", [{ args: [(date$1), (default_1$4)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    dateNe(...args) {
        return sqlFunction("date_ne", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateNeTimestamp(...args) {
        return sqlFunction("date_ne_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    dateNeTimestamptz(...args) {
        return sqlFunction("date_ne_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    datePlInterval(...args) {
        return sqlFunction("date_pl_interval", [{ args: [(date$1), (interval$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    datePli(...args) {
        return sqlFunction("date_pli", [{ args: [(date$1), (default_1$4)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    dateSmaller(...args) {
        return sqlFunction("date_smaller", [{ args: [(date$1), (date$1)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    daterange(...args) {
        return sqlFunction("daterange", [{ args: [(date$1), (date$1)], ret: (daterange$1), isOperator: false }, { args: [(date$1), (date$1), (default_1$1)], ret: (daterange$1), isOperator: false }], [this, ...args]);
    }
    daterangeSubdiff(...args) {
        return sqlFunction("daterange_subdiff", [{ args: [(date$1), (date$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    datetimePl(...args) {
        return sqlFunction("datetime_pl", [{ args: [(date$1), (time$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    datetimetzPl(...args) {
        return sqlFunction("datetimetz_pl", [{ args: [(date$1), (timetz$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(date$1), (date$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isfinite(...args) {
        return sqlFunction("isfinite", [{ args: [(date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(date$1)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    timestamp(...args) {
        return sqlFunction("timestamp", [{ args: [(date$1)], ret: (timestamp$1), isOperator: false }, { args: [(date$1), (time$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    timestamptz(...args) {
        return sqlFunction("timestamptz", [{ args: [(date$1)], ret: (timestamptz$1), isOperator: false }, { args: [(date$1), (time$1)], ret: (timestamptz$1), isOperator: false }, { args: [(date$1), (timetz$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(date$1), (date$1)], ret: (default_1$4), isOperator: true }, { args: [(date$1), (interval$1)], ret: (timestamp$1), isOperator: true }, { args: [(date$1), (default_1$4)], ret: (date$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(date$1), (interval$1)], ret: (timestamp$1), isOperator: true }, { args: [(date$1), (default_1$4)], ret: (date$1), isOperator: true }, { args: [(date$1), (time$1)], ret: (timestamp$1), isOperator: true }, { args: [(date$1), (timetz$1)], ret: (timestamptz$1), isOperator: true }], [this, ...args]);
    }
}

class datemultirange$1 extends Any {
    static new(v) { return new datemultirange$1(v); }
    static parse(v) { return v; }
    static typeString() { return "datemultirange"; }
    asAggregate() {
        return undefined;
    }
}

class daterange$1 extends Any {
    static new(v) { return new daterange$1(v); }
    static parse(v) { return v; }
    static typeString() { return "daterange"; }
    asAggregate() {
        return undefined;
    }
    datemultirange(...args) {
        return sqlFunction("datemultirange", [{ args: [(daterange$1)], ret: (datemultirange$1), isOperator: false }], [this, ...args]);
    }
    daterangeCanonical(...args) {
        return sqlFunction("daterange_canonical", [{ args: [(daterange$1)], ret: (daterange$1), isOperator: false }], [this, ...args]);
    }
}

let default_1$7 = class default_1 extends Any {
    static new(v) { return new default_1$7(v); }
    static serializeParamTypes = undefined;
    static parse(v) { return typeMap["float4"].parse(v); }
    static typeString() { return "float4"; }
    asAggregate() {
        return undefined;
    }
    abs(...args) {
        return sqlFunction("abs", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    avg(...args) {
        return sqlFunction("avg", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    btfloat48Cmp(...args) {
        return sqlFunction("btfloat48cmp", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btfloat4Cmp(...args) {
        return sqlFunction("btfloat4cmp", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    float48Div(...args) {
        return sqlFunction("float48div", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float48Eq(...args) {
        return sqlFunction("float48eq", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float48Ge(...args) {
        return sqlFunction("float48ge", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float48Gt(...args) {
        return sqlFunction("float48gt", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float48Le(...args) {
        return sqlFunction("float48le", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float48Lt(...args) {
        return sqlFunction("float48lt", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float48Mi(...args) {
        return sqlFunction("float48mi", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float48Mul(...args) {
        return sqlFunction("float48mul", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float48Ne(...args) {
        return sqlFunction("float48ne", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float48Pl(...args) {
        return sqlFunction("float48pl", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float4Abs(...args) {
        return sqlFunction("float4abs", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float4Div(...args) {
        return sqlFunction("float4div", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float4Eq(...args) {
        return sqlFunction("float4eq", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float4Ge(...args) {
        return sqlFunction("float4ge", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float4Gt(...args) {
        return sqlFunction("float4gt", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float4Larger(...args) {
        return sqlFunction("float4larger", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float4Le(...args) {
        return sqlFunction("float4le", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float4Lt(...args) {
        return sqlFunction("float4lt", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float4Mi(...args) {
        return sqlFunction("float4mi", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float4Mul(...args) {
        return sqlFunction("float4mul", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float4Ne(...args) {
        return sqlFunction("float4ne", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float4Pl(...args) {
        return sqlFunction("float4pl", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float4Smaller(...args) {
        return sqlFunction("float4smaller", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float4Um(...args) {
        return sqlFunction("float4um", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float4Up(...args) {
        return sqlFunction("float4up", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float8(...args) {
        return sqlFunction("float8", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    flt4MulCash(...args) {
        return sqlFunction("flt4_mul_cash", [{ args: [(default_1$7), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    hashfloat4(...args) {
        return sqlFunction("hashfloat4", [{ args: [(default_1$7)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashfloat4Extended(...args) {
        return sqlFunction("hashfloat4extended", [{ args: [(default_1$7), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(default_1$7), (default_1$7), (default_1$6), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2(...args) {
        return sqlFunction("int2", [{ args: [(default_1$7)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(default_1$7)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int8(...args) {
        return sqlFunction("int8", [{ args: [(default_1$7)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    numeric(...args) {
        return sqlFunction("numeric", [{ args: [(default_1$7)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddev(...args) {
        return sqlFunction("stddev", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    stddevPop(...args) {
        return sqlFunction("stddev_pop", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    stddevSamp(...args) {
        return sqlFunction("stddev_samp", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    sum(...args) {
        return sqlFunction("sum", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    toChar(...args) {
        return sqlFunction("to_char", [{ args: [(default_1$7), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    varPop(...args) {
        return sqlFunction("var_pop", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    varSamp(...args) {
        return sqlFunction("var_samp", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    variance(...args) {
        return sqlFunction("variance", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: true }, { args: [(default_1$7), (money$1)], ret: (money$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: true }, { args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: true }], [this, ...args]);
    }
};

let default_1$6 = class default_1 extends Any {
    static new(v) { return new default_1$6(v); }
    static serializeParamTypes = undefined;
    static parse(v) { return typeMap["float8"].parse(v); }
    static typeString() { return "float8"; }
    asAggregate() {
        return undefined;
    }
    abs(...args) {
        return sqlFunction("abs", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    acos(...args) {
        return sqlFunction("acos", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    acosd(...args) {
        return sqlFunction("acosd", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    acosh(...args) {
        return sqlFunction("acosh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    asind(...args) {
        return sqlFunction("asind", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    asinh(...args) {
        return sqlFunction("asinh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    atan(...args) {
        return sqlFunction("atan", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    atan2(...args) {
        return sqlFunction("atan2", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    atan2D(...args) {
        return sqlFunction("atan2d", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    atand(...args) {
        return sqlFunction("atand", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    atanh(...args) {
        return sqlFunction("atanh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    avg(...args) {
        return sqlFunction("avg", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    btfloat84Cmp(...args) {
        return sqlFunction("btfloat84cmp", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btfloat8Cmp(...args) {
        return sqlFunction("btfloat8cmp", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    cbrt(...args) {
        return sqlFunction("cbrt", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ceil(...args) {
        return sqlFunction("ceil", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ceiling(...args) {
        return sqlFunction("ceiling", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    corr(...args) {
        return sqlFunction("corr", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    cos(...args) {
        return sqlFunction("cos", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    cosd(...args) {
        return sqlFunction("cosd", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    cosh(...args) {
        return sqlFunction("cosh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    cot(...args) {
        return sqlFunction("cot", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    cotd(...args) {
        return sqlFunction("cotd", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    covarPop(...args) {
        return sqlFunction("covar_pop", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    covarSamp(...args) {
        return sqlFunction("covar_samp", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dcbrt(...args) {
        return sqlFunction("dcbrt", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    degrees(...args) {
        return sqlFunction("degrees", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dexp(...args) {
        return sqlFunction("dexp", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dlog1(...args) {
        return sqlFunction("dlog1", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dlog10(...args) {
        return sqlFunction("dlog10", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dpow(...args) {
        return sqlFunction("dpow", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dround(...args) {
        return sqlFunction("dround", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dsqrt(...args) {
        return sqlFunction("dsqrt", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dtrunc(...args) {
        return sqlFunction("dtrunc", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    erf(...args) {
        return sqlFunction("erf", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    erfc(...args) {
        return sqlFunction("erfc", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    exp(...args) {
        return sqlFunction("exp", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float4(...args) {
        return sqlFunction("float4", [{ args: [(default_1$6)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float84Div(...args) {
        return sqlFunction("float84div", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float84Eq(...args) {
        return sqlFunction("float84eq", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float84Ge(...args) {
        return sqlFunction("float84ge", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float84Gt(...args) {
        return sqlFunction("float84gt", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float84Le(...args) {
        return sqlFunction("float84le", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float84Lt(...args) {
        return sqlFunction("float84lt", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float84Mi(...args) {
        return sqlFunction("float84mi", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float84Mul(...args) {
        return sqlFunction("float84mul", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float84Ne(...args) {
        return sqlFunction("float84ne", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float84Pl(...args) {
        return sqlFunction("float84pl", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Abs(...args) {
        return sqlFunction("float8abs", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Div(...args) {
        return sqlFunction("float8div", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Eq(...args) {
        return sqlFunction("float8eq", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float8Ge(...args) {
        return sqlFunction("float8ge", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float8Gt(...args) {
        return sqlFunction("float8gt", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float8Larger(...args) {
        return sqlFunction("float8larger", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Le(...args) {
        return sqlFunction("float8le", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float8Lt(...args) {
        return sqlFunction("float8lt", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float8Mi(...args) {
        return sqlFunction("float8mi", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Mul(...args) {
        return sqlFunction("float8mul", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Ne(...args) {
        return sqlFunction("float8ne", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float8Pl(...args) {
        return sqlFunction("float8pl", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Smaller(...args) {
        return sqlFunction("float8smaller", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Um(...args) {
        return sqlFunction("float8um", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    float8Up(...args) {
        return sqlFunction("float8up", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    floor(...args) {
        return sqlFunction("floor", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    flt8MulCash(...args) {
        return sqlFunction("flt8_mul_cash", [{ args: [(default_1$6), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    hashfloat8(...args) {
        return sqlFunction("hashfloat8", [{ args: [(default_1$6)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashfloat8Extended(...args) {
        return sqlFunction("hashfloat8extended", [{ args: [(default_1$6), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(default_1$6), (default_1$6), (default_1$6), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2(...args) {
        return sqlFunction("int2", [{ args: [(default_1$6)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(default_1$6)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int8(...args) {
        return sqlFunction("int8", [{ args: [(default_1$6)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    ln(...args) {
        return sqlFunction("ln", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    log(...args) {
        return sqlFunction("log", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    log10(...args) {
        return sqlFunction("log10", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    mulDInterval(...args) {
        return sqlFunction("mul_d_interval", [{ args: [(default_1$6), (interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    numeric(...args) {
        return sqlFunction("numeric", [{ args: [(default_1$6)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    percentileCont(...args) {
        return sqlFunction("percentile_cont", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6), (interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    percentileDisc(...args) {
        return sqlFunction("percentile_disc", [({ T }) => ({ args: [(default_1$6), T], ret: T, isOperator: false })], [this, ...args]);
    }
    pgSleep(...args) {
        return sqlFunction("pg_sleep", [{ args: [(default_1$6)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    point(...args) {
        return sqlFunction("point", [{ args: [(default_1$6), (default_1$6)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    pow(...args) {
        return sqlFunction("pow", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    power(...args) {
        return sqlFunction("power", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    radians(...args) {
        return sqlFunction("radians", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    randomNormal(...args) {
        return sqlFunction("random_normal", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    regrAvgx(...args) {
        return sqlFunction("regr_avgx", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    regrAvgy(...args) {
        return sqlFunction("regr_avgy", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    regrCount(...args) {
        return sqlFunction("regr_count", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    regrIntercept(...args) {
        return sqlFunction("regr_intercept", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    regrR2(...args) {
        return sqlFunction("regr_r2", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    regrSlope(...args) {
        return sqlFunction("regr_slope", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    regrSxx(...args) {
        return sqlFunction("regr_sxx", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    regrSxy(...args) {
        return sqlFunction("regr_sxy", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    regrSyy(...args) {
        return sqlFunction("regr_syy", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    round(...args) {
        return sqlFunction("round", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    setseed(...args) {
        return sqlFunction("setseed", [{ args: [(default_1$6)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    sign(...args) {
        return sqlFunction("sign", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    sind(...args) {
        return sqlFunction("sind", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    sinh(...args) {
        return sqlFunction("sinh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    sqrt(...args) {
        return sqlFunction("sqrt", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    stddev(...args) {
        return sqlFunction("stddev", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    stddevPop(...args) {
        return sqlFunction("stddev_pop", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    stddevSamp(...args) {
        return sqlFunction("stddev_samp", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    sum(...args) {
        return sqlFunction("sum", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    tan(...args) {
        return sqlFunction("tan", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    tand(...args) {
        return sqlFunction("tand", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    tanh(...args) {
        return sqlFunction("tanh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    toChar(...args) {
        return sqlFunction("to_char", [{ args: [(default_1$6), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    toTimestamp(...args) {
        return sqlFunction("to_timestamp", [{ args: [(default_1$6)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    trunc(...args) {
        return sqlFunction("trunc", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    varPop(...args) {
        return sqlFunction("var_pop", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    varSamp(...args) {
        return sqlFunction("var_samp", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    variance(...args) {
        return sqlFunction("variance", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ["^"](...args) {
        return sqlFunction("^", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: true }, { args: [(default_1$6), (money$1)], ret: (money$1), isOperator: true }, { args: [(default_1$6), (interval$1)], ret: (interval$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: true }, { args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
};

class inet extends Any {
    static new(v) { return new inet(v); }
    static parse(v) { return v; }
    static typeString() { return "inet"; }
    asAggregate() {
        return undefined;
    }
    abbrev(...args) {
        return sqlFunction("abbrev", [{ args: [(inet)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    broadcast(...args) {
        return sqlFunction("broadcast", [{ args: [(inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    cidr(...args) {
        return sqlFunction("cidr", [{ args: [(inet)], ret: (cidr$1), isOperator: false }], [this, ...args]);
    }
    family(...args) {
        return sqlFunction("family", [{ args: [(inet)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashinet(...args) {
        return sqlFunction("hashinet", [{ args: [(inet)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashinetextended(...args) {
        return sqlFunction("hashinetextended", [{ args: [(inet), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    host(...args) {
        return sqlFunction("host", [{ args: [(inet)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    hostmask(...args) {
        return sqlFunction("hostmask", [{ args: [(inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    inetMerge(...args) {
        return sqlFunction("inet_merge", [{ args: [(inet), (inet)], ret: (cidr$1), isOperator: false }], [this, ...args]);
    }
    inetSameFamily(...args) {
        return sqlFunction("inet_same_family", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    inetand(...args) {
        return sqlFunction("inetand", [{ args: [(inet), (inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    inetmi(...args) {
        return sqlFunction("inetmi", [{ args: [(inet), (inet)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    inetmiInt8(...args) {
        return sqlFunction("inetmi_int8", [{ args: [(inet), (default_1$3)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    inetnot(...args) {
        return sqlFunction("inetnot", [{ args: [(inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    inetor(...args) {
        return sqlFunction("inetor", [{ args: [(inet), (inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    inetpl(...args) {
        return sqlFunction("inetpl", [{ args: [(inet), (default_1$3)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    masklen(...args) {
        return sqlFunction("masklen", [{ args: [(inet)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    netmask(...args) {
        return sqlFunction("netmask", [{ args: [(inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    network(...args) {
        return sqlFunction("network", [{ args: [(inet)], ret: (cidr$1), isOperator: false }], [this, ...args]);
    }
    networkCmp(...args) {
        return sqlFunction("network_cmp", [{ args: [(inet), (inet)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    networkEq(...args) {
        return sqlFunction("network_eq", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkGe(...args) {
        return sqlFunction("network_ge", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkGt(...args) {
        return sqlFunction("network_gt", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkLarger(...args) {
        return sqlFunction("network_larger", [{ args: [(inet), (inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    networkLe(...args) {
        return sqlFunction("network_le", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkLt(...args) {
        return sqlFunction("network_lt", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkNe(...args) {
        return sqlFunction("network_ne", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkOverlap(...args) {
        return sqlFunction("network_overlap", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkSmaller(...args) {
        return sqlFunction("network_smaller", [{ args: [(inet), (inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    networkSub(...args) {
        return sqlFunction("network_sub", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkSubeq(...args) {
        return sqlFunction("network_subeq", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkSup(...args) {
        return sqlFunction("network_sup", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    networkSupeq(...args) {
        return sqlFunction("network_supeq", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    setMasklen(...args) {
        return sqlFunction("set_masklen", [{ args: [(inet), (default_1$4)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    text(...args) {
        return sqlFunction("text", [{ args: [(inet)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    ["&"](...args) {
        return sqlFunction("&", [{ args: [(inet), (inet)], ret: (inet), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(inet), (inet)], ret: (default_1$3), isOperator: true }, { args: [(inet), (default_1$3)], ret: (inet), isOperator: true }], [this, ...args]);
    }
    ["|"](...args) {
        return sqlFunction("|", [{ args: [(inet), (inet)], ret: (inet), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(inet), (default_1$3)], ret: (inet), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&&"](...args) {
        return sqlFunction("&&", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<="](...args) {
        return sqlFunction("<<=", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">>="](...args) {
        return sqlFunction(">>=", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

let default_1$5 = class default_1 extends Any {
    static new(v) { return new default_1$5(v); }
    static serializeParamTypes = undefined;
    static parse(v) { return typeMap["int2"].parse(v); }
    static typeString() { return "int2"; }
    asAggregate() {
        return undefined;
    }
    abs(...args) {
        return sqlFunction("abs", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    avg(...args) {
        return sqlFunction("avg", [{ args: [(default_1$5)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    bitAnd(...args) {
        return sqlFunction("bit_and", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    bitOr(...args) {
        return sqlFunction("bit_or", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    bitXor(...args) {
        return sqlFunction("bit_xor", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    btint24Cmp(...args) {
        return sqlFunction("btint24cmp", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btint28Cmp(...args) {
        return sqlFunction("btint28cmp", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btint2Cmp(...args) {
        return sqlFunction("btint2cmp", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    float4(...args) {
        return sqlFunction("float4", [{ args: [(default_1$5)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float8(...args) {
        return sqlFunction("float8", [{ args: [(default_1$5)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    hashint2(...args) {
        return sqlFunction("hashint2", [{ args: [(default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashint2Extended(...args) {
        return sqlFunction("hashint2extended", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(default_1$5), (default_1$5), (default_1$5), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$5), (default_1$5), (default_1$4), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$5), (default_1$5), (default_1$3), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int24Div(...args) {
        return sqlFunction("int24div", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int24Eq(...args) {
        return sqlFunction("int24eq", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int24Ge(...args) {
        return sqlFunction("int24ge", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int24Gt(...args) {
        return sqlFunction("int24gt", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int24Le(...args) {
        return sqlFunction("int24le", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int24Lt(...args) {
        return sqlFunction("int24lt", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int24Mi(...args) {
        return sqlFunction("int24mi", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int24Mul(...args) {
        return sqlFunction("int24mul", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int24Ne(...args) {
        return sqlFunction("int24ne", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int24Pl(...args) {
        return sqlFunction("int24pl", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int28Div(...args) {
        return sqlFunction("int28div", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int28Eq(...args) {
        return sqlFunction("int28eq", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int28Ge(...args) {
        return sqlFunction("int28ge", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int28Gt(...args) {
        return sqlFunction("int28gt", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int28Le(...args) {
        return sqlFunction("int28le", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int28Lt(...args) {
        return sqlFunction("int28lt", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int28Mi(...args) {
        return sqlFunction("int28mi", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int28Mul(...args) {
        return sqlFunction("int28mul", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int28Ne(...args) {
        return sqlFunction("int28ne", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int28Pl(...args) {
        return sqlFunction("int28pl", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int2MulCash(...args) {
        return sqlFunction("int2_mul_cash", [{ args: [(default_1$5), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    int2Abs(...args) {
        return sqlFunction("int2abs", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2And(...args) {
        return sqlFunction("int2and", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Div(...args) {
        return sqlFunction("int2div", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Eq(...args) {
        return sqlFunction("int2eq", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2Ge(...args) {
        return sqlFunction("int2ge", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2Gt(...args) {
        return sqlFunction("int2gt", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2Larger(...args) {
        return sqlFunction("int2larger", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Le(...args) {
        return sqlFunction("int2le", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2Lt(...args) {
        return sqlFunction("int2lt", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2Mi(...args) {
        return sqlFunction("int2mi", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Mod(...args) {
        return sqlFunction("int2mod", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Mul(...args) {
        return sqlFunction("int2mul", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Ne(...args) {
        return sqlFunction("int2ne", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2Not(...args) {
        return sqlFunction("int2not", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Or(...args) {
        return sqlFunction("int2or", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Pl(...args) {
        return sqlFunction("int2pl", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Shl(...args) {
        return sqlFunction("int2shl", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Shr(...args) {
        return sqlFunction("int2shr", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Smaller(...args) {
        return sqlFunction("int2smaller", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Um(...args) {
        return sqlFunction("int2um", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Up(...args) {
        return sqlFunction("int2up", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Xor(...args) {
        return sqlFunction("int2xor", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int8(...args) {
        return sqlFunction("int8", [{ args: [(default_1$5)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    mod(...args) {
        return sqlFunction("mod", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    numeric(...args) {
        return sqlFunction("numeric", [{ args: [(default_1$5)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddev(...args) {
        return sqlFunction("stddev", [{ args: [(default_1$5)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddevPop(...args) {
        return sqlFunction("stddev_pop", [{ args: [(default_1$5)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddevSamp(...args) {
        return sqlFunction("stddev_samp", [{ args: [(default_1$5)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    sum(...args) {
        return sqlFunction("sum", [{ args: [(default_1$5)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    varPop(...args) {
        return sqlFunction("var_pop", [{ args: [(default_1$5)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    varSamp(...args) {
        return sqlFunction("var_samp", [{ args: [(default_1$5)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    variance(...args) {
        return sqlFunction("variance", [{ args: [(default_1$5)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$5), (money$1)], ret: (money$1), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: true }, { args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    ["&"](...args) {
        return sqlFunction("&", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    ["%"](...args) {
        return sqlFunction("%", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    ["|"](...args) {
        return sqlFunction("|", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
    ["#"](...args) {
        return sqlFunction("#", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: true }], [this, ...args]);
    }
};

class int2vector extends Any {
    static new(v) { return new int2vector(v); }
    static parse(v) { return v; }
    static typeString() { return "int2vector"; }
    asAggregate() {
        return undefined;
    }
}

let default_1$4 = class default_1 extends Any {
    static new(v) { return new default_1$4(v); }
    static serializeParamTypes = undefined;
    static parse(v) { return typeMap["int4"].parse(v); }
    static typeString() { return "int4"; }
    asAggregate() {
        return undefined;
    }
    abs(...args) {
        return sqlFunction("abs", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    avg(...args) {
        return sqlFunction("avg", [{ args: [(default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    bit(...args) {
        return sqlFunction("bit", [{ args: [(default_1$4), (default_1$4)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitAnd(...args) {
        return sqlFunction("bit_and", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    bitOr(...args) {
        return sqlFunction("bit_or", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    bitXor(...args) {
        return sqlFunction("bit_xor", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    bool(...args) {
        return sqlFunction("bool", [{ args: [(default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    btint42Cmp(...args) {
        return sqlFunction("btint42cmp", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btint48Cmp(...args) {
        return sqlFunction("btint48cmp", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btint4Cmp(...args) {
        return sqlFunction("btint4cmp", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    char(...args) {
        return sqlFunction("char", [{ args: [(default_1$4)], ret: (char$1), isOperator: false }], [this, ...args]);
    }
    chr(...args) {
        return sqlFunction("chr", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    float4(...args) {
        return sqlFunction("float4", [{ args: [(default_1$4)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float8(...args) {
        return sqlFunction("float8", [{ args: [(default_1$4)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    gcd(...args) {
        return sqlFunction("gcd", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    generateSeries(...args) {
        return sqlFunction("generate_series", [{ args: [(default_1$4), (default_1$4)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$4)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    hashint4(...args) {
        return sqlFunction("hashint4", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashint4Extended(...args) {
        return sqlFunction("hashint4extended", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(default_1$4), (default_1$4), (default_1$5), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$4), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$3), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2(...args) {
        return sqlFunction("int2", [{ args: [(default_1$4)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int42Div(...args) {
        return sqlFunction("int42div", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int42Eq(...args) {
        return sqlFunction("int42eq", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int42Ge(...args) {
        return sqlFunction("int42ge", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int42Gt(...args) {
        return sqlFunction("int42gt", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int42Le(...args) {
        return sqlFunction("int42le", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int42Lt(...args) {
        return sqlFunction("int42lt", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int42Mi(...args) {
        return sqlFunction("int42mi", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int42Mul(...args) {
        return sqlFunction("int42mul", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int42Ne(...args) {
        return sqlFunction("int42ne", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int42Pl(...args) {
        return sqlFunction("int42pl", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int48Div(...args) {
        return sqlFunction("int48div", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int48Eq(...args) {
        return sqlFunction("int48eq", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int48Ge(...args) {
        return sqlFunction("int48ge", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int48Gt(...args) {
        return sqlFunction("int48gt", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int48Le(...args) {
        return sqlFunction("int48le", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int48Lt(...args) {
        return sqlFunction("int48lt", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int48Mi(...args) {
        return sqlFunction("int48mi", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int48Mul(...args) {
        return sqlFunction("int48mul", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int48Ne(...args) {
        return sqlFunction("int48ne", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int48Pl(...args) {
        return sqlFunction("int48pl", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int4MulCash(...args) {
        return sqlFunction("int4_mul_cash", [{ args: [(default_1$4), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    int4Abs(...args) {
        return sqlFunction("int4abs", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4And(...args) {
        return sqlFunction("int4and", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Div(...args) {
        return sqlFunction("int4div", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Eq(...args) {
        return sqlFunction("int4eq", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int4Ge(...args) {
        return sqlFunction("int4ge", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int4Gt(...args) {
        return sqlFunction("int4gt", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int4Inc(...args) {
        return sqlFunction("int4inc", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Larger(...args) {
        return sqlFunction("int4larger", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Le(...args) {
        return sqlFunction("int4le", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int4Lt(...args) {
        return sqlFunction("int4lt", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int4Mi(...args) {
        return sqlFunction("int4mi", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Mod(...args) {
        return sqlFunction("int4mod", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Mul(...args) {
        return sqlFunction("int4mul", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Ne(...args) {
        return sqlFunction("int4ne", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int4Not(...args) {
        return sqlFunction("int4not", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Or(...args) {
        return sqlFunction("int4or", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Pl(...args) {
        return sqlFunction("int4pl", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Range(...args) {
        return sqlFunction("int4range", [{ args: [(default_1$4), (default_1$4)], ret: (int4range), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$1)], ret: (int4range), isOperator: false }], [this, ...args]);
    }
    int4RangeSubdiff(...args) {
        return sqlFunction("int4range_subdiff", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    int4Shl(...args) {
        return sqlFunction("int4shl", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Shr(...args) {
        return sqlFunction("int4shr", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Smaller(...args) {
        return sqlFunction("int4smaller", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Um(...args) {
        return sqlFunction("int4um", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Up(...args) {
        return sqlFunction("int4up", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Xor(...args) {
        return sqlFunction("int4xor", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int8(...args) {
        return sqlFunction("int8", [{ args: [(default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    integerPlDate(...args) {
        return sqlFunction("integer_pl_date", [{ args: [(default_1$4), (date$1)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    lcm(...args) {
        return sqlFunction("lcm", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    loClose(...args) {
        return sqlFunction("lo_close", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    loCreat(...args) {
        return sqlFunction("lo_creat", [{ args: [(default_1$4)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    loLseek(...args) {
        return sqlFunction("lo_lseek", [{ args: [(default_1$4), (default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    loLseek64(...args) {
        return sqlFunction("lo_lseek64", [{ args: [(default_1$4), (default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    loTell(...args) {
        return sqlFunction("lo_tell", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    loTell64(...args) {
        return sqlFunction("lo_tell64", [{ args: [(default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    loTruncate(...args) {
        return sqlFunction("lo_truncate", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    loTruncate64(...args) {
        return sqlFunction("lo_truncate64", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    loread(...args) {
        return sqlFunction("loread", [{ args: [(default_1$4), (default_1$4)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    lowrite(...args) {
        return sqlFunction("lowrite", [{ args: [(default_1$4), (bytea)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    makeDate(...args) {
        return sqlFunction("make_date", [{ args: [(default_1$4), (default_1$4), (default_1$4)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    makeInterval(...args) {
        return sqlFunction("make_interval", [{ args: [(default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$6)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    makeTime(...args) {
        return sqlFunction("make_time", [{ args: [(default_1$4), (default_1$4), (default_1$6)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    makeTimestamp(...args) {
        return sqlFunction("make_timestamp", [{ args: [(default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$6)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    makeTimestamptz(...args) {
        return sqlFunction("make_timestamptz", [{ args: [(default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$6)], ret: (timestamptz$1), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$6), (default_1$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    mod(...args) {
        return sqlFunction("mod", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    money(...args) {
        return sqlFunction("money", [{ args: [(default_1$4)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    ntile(...args) {
        return sqlFunction("ntile", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    numeric(...args) {
        return sqlFunction("numeric", [{ args: [(default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryLock(...args) {
        return sqlFunction("pg_advisory_lock", [{ args: [(default_1$4), (default_1$4)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryLockShared(...args) {
        return sqlFunction("pg_advisory_lock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryUnlock(...args) {
        return sqlFunction("pg_advisory_unlock", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryUnlockShared(...args) {
        return sqlFunction("pg_advisory_unlock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryXactLock(...args) {
        return sqlFunction("pg_advisory_xact_lock", [{ args: [(default_1$4), (default_1$4)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryXactLockShared(...args) {
        return sqlFunction("pg_advisory_xact_lock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgBlockingPids(...args) {
        return sqlFunction("pg_blocking_pids", [{ args: [(default_1$4)], ret: Array$1.of((default_1$4)), isOperator: false }], [this, ...args]);
    }
    pgCancelBackend(...args) {
        return sqlFunction("pg_cancel_backend", [{ args: [(default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgEncodingMaxLength(...args) {
        return sqlFunction("pg_encoding_max_length", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgEncodingToChar(...args) {
        return sqlFunction("pg_encoding_to_char", [{ args: [(default_1$4)], ret: (name$1), isOperator: false }], [this, ...args]);
    }
    pgIsolationTestSessionIsBlocked(...args) {
        return sqlFunction("pg_isolation_test_session_is_blocked", [{ args: [(default_1$4), Array$1.of((default_1$4))], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLogBackendMemoryContexts(...args) {
        return sqlFunction("pg_log_backend_memory_contexts", [{ args: [(default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgSafeSnapshotBlockingPids(...args) {
        return sqlFunction("pg_safe_snapshot_blocking_pids", [{ args: [(default_1$4)], ret: Array$1.of((default_1$4)), isOperator: false }], [this, ...args]);
    }
    pgStatGetActivity(...args) {
        return sqlFunction("pg_stat_get_activity", [{ args: [(default_1$4)], ret: Setof.ofSchema({ datid: (oid$1), pid: (default_1$4), usesysid: (oid$1), application_name: (default_1$1), state: (default_1$1), query: (default_1$1), wait_event_type: (default_1$1), wait_event: (default_1$1), xact_start: (timestamptz$1), query_start: (timestamptz$1), backend_start: (timestamptz$1), state_change: (timestamptz$1), client_addr: (inet), client_hostname: (default_1$1), client_port: (default_1$4), backend_xid: (xid$1), backend_xmin: (xid$1), backend_type: (default_1$1), ssl: (default_1$8), sslversion: (default_1$1), sslcipher: (default_1$1), sslbits: (default_1$4), ssl_client_dn: (default_1$1), ssl_client_serial: (default_1$2), ssl_issuer_dn: (default_1$1), gss_auth: (default_1$8), gss_princ: (default_1$1), gss_enc: (default_1$8), gss_delegation: (default_1$8), leader_pid: (default_1$4), query_id: (default_1$3) }), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendActivity(...args) {
        return sqlFunction("pg_stat_get_backend_activity", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendActivityStart(...args) {
        return sqlFunction("pg_stat_get_backend_activity_start", [{ args: [(default_1$4)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendClientAddr(...args) {
        return sqlFunction("pg_stat_get_backend_client_addr", [{ args: [(default_1$4)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendClientPort(...args) {
        return sqlFunction("pg_stat_get_backend_client_port", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendDbid(...args) {
        return sqlFunction("pg_stat_get_backend_dbid", [{ args: [(default_1$4)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendPid(...args) {
        return sqlFunction("pg_stat_get_backend_pid", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendStart(...args) {
        return sqlFunction("pg_stat_get_backend_start", [{ args: [(default_1$4)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendSubxact(...args) {
        return sqlFunction("pg_stat_get_backend_subxact", [{ args: [(default_1$4)], ret: Record.of({ subxact_count: (default_1$4), subxact_overflowed: (default_1$8) }), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendUserid(...args) {
        return sqlFunction("pg_stat_get_backend_userid", [{ args: [(default_1$4)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendWaitEvent(...args) {
        return sqlFunction("pg_stat_get_backend_wait_event", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendWaitEventType(...args) {
        return sqlFunction("pg_stat_get_backend_wait_event_type", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetBackendXactStart(...args) {
        return sqlFunction("pg_stat_get_backend_xact_start", [{ args: [(default_1$4)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgTerminateBackend(...args) {
        return sqlFunction("pg_terminate_backend", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTryAdvisoryLock(...args) {
        return sqlFunction("pg_try_advisory_lock", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTryAdvisoryLockShared(...args) {
        return sqlFunction("pg_try_advisory_lock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTryAdvisoryXactLock(...args) {
        return sqlFunction("pg_try_advisory_xact_lock", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTryAdvisoryXactLockShared(...args) {
        return sqlFunction("pg_try_advisory_xact_lock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polygon(...args) {
        return sqlFunction("polygon", [{ args: [(default_1$4), (circle$1)], ret: (polygon$1), isOperator: false }], [this, ...args]);
    }
    random(...args) {
        return sqlFunction("random", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    stddev(...args) {
        return sqlFunction("stddev", [{ args: [(default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddevPop(...args) {
        return sqlFunction("stddev_pop", [{ args: [(default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddevSamp(...args) {
        return sqlFunction("stddev_samp", [{ args: [(default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    sum(...args) {
        return sqlFunction("sum", [{ args: [(default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    toChar(...args) {
        return sqlFunction("to_char", [{ args: [(default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    toHex(...args) {
        return sqlFunction("to_hex", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    toOct(...args) {
        return sqlFunction("to_oct", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    varPop(...args) {
        return sqlFunction("var_pop", [{ args: [(default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    varSamp(...args) {
        return sqlFunction("var_samp", [{ args: [(default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    variance(...args) {
        return sqlFunction("variance", [{ args: [(default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$4), (money$1)], ret: (money$1), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: true }, { args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }, { args: [(default_1$4), (date$1)], ret: (date$1), isOperator: true }], [this, ...args]);
    }
    ["&"](...args) {
        return sqlFunction("&", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
    ["%"](...args) {
        return sqlFunction("%", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
    ["|"](...args) {
        return sqlFunction("|", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
    ["#"](...args) {
        return sqlFunction("#", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: true }], [this, ...args]);
    }
};

class int4multirange extends Any {
    static new(v) { return new int4multirange(v); }
    static parse(v) { return v; }
    static typeString() { return "int4multirange"; }
    asAggregate() {
        return undefined;
    }
}

class int4range extends Any {
    static new(v) { return new int4range(v); }
    static parse(v) { return v; }
    static typeString() { return "int4range"; }
    asAggregate() {
        return undefined;
    }
    int4Multirange(...args) {
        return sqlFunction("int4multirange", [{ args: [(int4range)], ret: (int4multirange), isOperator: false }], [this, ...args]);
    }
    int4RangeCanonical(...args) {
        return sqlFunction("int4range_canonical", [{ args: [(int4range)], ret: (int4range), isOperator: false }], [this, ...args]);
    }
}

let default_1$3 = class default_1 extends Any {
    static new(v) { return new default_1$3(v); }
    static serializeParamTypes = undefined;
    static parse(v) { return typeMap["int8"].parse(v); }
    static typeString() { return "int8"; }
    asAggregate() {
        return undefined;
    }
    abs(...args) {
        return sqlFunction("abs", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    avg(...args) {
        return sqlFunction("avg", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    bit(...args) {
        return sqlFunction("bit", [{ args: [(default_1$3), (default_1$4)], ret: (bit$1), isOperator: false }], [this, ...args]);
    }
    bitAnd(...args) {
        return sqlFunction("bit_and", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    bitOr(...args) {
        return sqlFunction("bit_or", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    bitXor(...args) {
        return sqlFunction("bit_xor", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    btint82Cmp(...args) {
        return sqlFunction("btint82cmp", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btint84Cmp(...args) {
        return sqlFunction("btint84cmp", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btint8Cmp(...args) {
        return sqlFunction("btint8cmp", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    factorial(...args) {
        return sqlFunction("factorial", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    float4(...args) {
        return sqlFunction("float4", [{ args: [(default_1$3)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float8(...args) {
        return sqlFunction("float8", [{ args: [(default_1$3)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    gcd(...args) {
        return sqlFunction("gcd", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    generateSeries(...args) {
        return sqlFunction("generate_series", [{ args: [(default_1$3), (default_1$3)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$3), (default_1$3), (default_1$3)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    hashint8(...args) {
        return sqlFunction("hashint8", [{ args: [(default_1$3)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashint8Extended(...args) {
        return sqlFunction("hashint8extended", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(default_1$3), (default_1$3), (default_1$3), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2(...args) {
        return sqlFunction("int2", [{ args: [(default_1$3)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int2Sum(...args) {
        return sqlFunction("int2_sum", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(default_1$3)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int4Sum(...args) {
        return sqlFunction("int4_sum", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int82Div(...args) {
        return sqlFunction("int82div", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int82Eq(...args) {
        return sqlFunction("int82eq", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int82Ge(...args) {
        return sqlFunction("int82ge", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int82Gt(...args) {
        return sqlFunction("int82gt", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int82Le(...args) {
        return sqlFunction("int82le", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int82Lt(...args) {
        return sqlFunction("int82lt", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int82Mi(...args) {
        return sqlFunction("int82mi", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int82Mul(...args) {
        return sqlFunction("int82mul", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int82Ne(...args) {
        return sqlFunction("int82ne", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int82Pl(...args) {
        return sqlFunction("int82pl", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int84Div(...args) {
        return sqlFunction("int84div", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int84Eq(...args) {
        return sqlFunction("int84eq", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int84Ge(...args) {
        return sqlFunction("int84ge", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int84Gt(...args) {
        return sqlFunction("int84gt", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int84Le(...args) {
        return sqlFunction("int84le", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int84Lt(...args) {
        return sqlFunction("int84lt", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int84Mi(...args) {
        return sqlFunction("int84mi", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int84Mul(...args) {
        return sqlFunction("int84mul", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int84Ne(...args) {
        return sqlFunction("int84ne", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int84Pl(...args) {
        return sqlFunction("int84pl", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8MulCash(...args) {
        return sqlFunction("int8_mul_cash", [{ args: [(default_1$3), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    int8Abs(...args) {
        return sqlFunction("int8abs", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8And(...args) {
        return sqlFunction("int8and", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Dec(...args) {
        return sqlFunction("int8dec", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8DecAny(...args) {
        return sqlFunction("int8dec_any", [{ args: [(default_1$3), (Any)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Div(...args) {
        return sqlFunction("int8div", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Eq(...args) {
        return sqlFunction("int8eq", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int8Ge(...args) {
        return sqlFunction("int8ge", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int8Gt(...args) {
        return sqlFunction("int8gt", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int8Inc(...args) {
        return sqlFunction("int8inc", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8IncAny(...args) {
        return sqlFunction("int8inc_any", [{ args: [(default_1$3), (Any)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8IncFloat8Float8(...args) {
        return sqlFunction("int8inc_float8_float8", [{ args: [(default_1$3), (default_1$6), (default_1$6)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Larger(...args) {
        return sqlFunction("int8larger", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Le(...args) {
        return sqlFunction("int8le", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int8Lt(...args) {
        return sqlFunction("int8lt", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int8Mi(...args) {
        return sqlFunction("int8mi", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Mod(...args) {
        return sqlFunction("int8mod", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Mul(...args) {
        return sqlFunction("int8mul", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Ne(...args) {
        return sqlFunction("int8ne", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int8Not(...args) {
        return sqlFunction("int8not", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Or(...args) {
        return sqlFunction("int8or", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Pl(...args) {
        return sqlFunction("int8pl", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8PlInet(...args) {
        return sqlFunction("int8pl_inet", [{ args: [(default_1$3), (inet)], ret: (inet), isOperator: false }], [this, ...args]);
    }
    int8Range(...args) {
        return sqlFunction("int8range", [{ args: [(default_1$3), (default_1$3)], ret: (int8range), isOperator: false }, { args: [(default_1$3), (default_1$3), (default_1$1)], ret: (int8range), isOperator: false }], [this, ...args]);
    }
    int8RangeSubdiff(...args) {
        return sqlFunction("int8range_subdiff", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    int8Shl(...args) {
        return sqlFunction("int8shl", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Shr(...args) {
        return sqlFunction("int8shr", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Smaller(...args) {
        return sqlFunction("int8smaller", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Um(...args) {
        return sqlFunction("int8um", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Up(...args) {
        return sqlFunction("int8up", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Xor(...args) {
        return sqlFunction("int8xor", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    lcm(...args) {
        return sqlFunction("lcm", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    mod(...args) {
        return sqlFunction("mod", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    money(...args) {
        return sqlFunction("money", [{ args: [(default_1$3)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    numeric(...args) {
        return sqlFunction("numeric", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    oid(...args) {
        return sqlFunction("oid", [{ args: [(default_1$3)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryLock(...args) {
        return sqlFunction("pg_advisory_lock", [{ args: [(default_1$3)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryLockShared(...args) {
        return sqlFunction("pg_advisory_lock_shared", [{ args: [(default_1$3)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryUnlock(...args) {
        return sqlFunction("pg_advisory_unlock", [{ args: [(default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryUnlockShared(...args) {
        return sqlFunction("pg_advisory_unlock_shared", [{ args: [(default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryXactLock(...args) {
        return sqlFunction("pg_advisory_xact_lock", [{ args: [(default_1$3)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgAdvisoryXactLockShared(...args) {
        return sqlFunction("pg_advisory_xact_lock_shared", [{ args: [(default_1$3)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgSizePretty(...args) {
        return sqlFunction("pg_size_pretty", [{ args: [(default_1$3)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgTryAdvisoryLock(...args) {
        return sqlFunction("pg_try_advisory_lock", [{ args: [(default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTryAdvisoryLockShared(...args) {
        return sqlFunction("pg_try_advisory_lock_shared", [{ args: [(default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTryAdvisoryXactLock(...args) {
        return sqlFunction("pg_try_advisory_xact_lock", [{ args: [(default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTryAdvisoryXactLockShared(...args) {
        return sqlFunction("pg_try_advisory_xact_lock_shared", [{ args: [(default_1$3)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgWalSummaryContents(...args) {
        return sqlFunction("pg_wal_summary_contents", [{ args: [(default_1$3), (pg_lsn), (pg_lsn)], ret: Setof.ofSchema({ relfilenode: (oid$1), reltablespace: (oid$1), reldatabase: (oid$1), relforknumber: (default_1$5), relblocknumber: (default_1$3), is_limit_block: (default_1$8) }), isOperator: false }], [this, ...args]);
    }
    random(...args) {
        return sqlFunction("random", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    stddev(...args) {
        return sqlFunction("stddev", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddevPop(...args) {
        return sqlFunction("stddev_pop", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddevSamp(...args) {
        return sqlFunction("stddev_samp", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    sum(...args) {
        return sqlFunction("sum", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    toChar(...args) {
        return sqlFunction("to_char", [{ args: [(default_1$3), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    toHex(...args) {
        return sqlFunction("to_hex", [{ args: [(default_1$3)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    toOct(...args) {
        return sqlFunction("to_oct", [{ args: [(default_1$3)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    txidStatus(...args) {
        return sqlFunction("txid_status", [{ args: [(default_1$3)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    txidVisibleInSnapshot(...args) {
        return sqlFunction("txid_visible_in_snapshot", [{ args: [(default_1$3), (txid_snapshot)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    varPop(...args) {
        return sqlFunction("var_pop", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    varSamp(...args) {
        return sqlFunction("var_samp", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    variance(...args) {
        return sqlFunction("variance", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (money$1)], ret: (money$1), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: true }, { args: [(default_1$3), (inet)], ret: (inet), isOperator: true }], [this, ...args]);
    }
    ["&"](...args) {
        return sqlFunction("&", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
    ["%"](...args) {
        return sqlFunction("%", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
    ["|"](...args) {
        return sqlFunction("|", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
    ["#"](...args) {
        return sqlFunction("#", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: true }], [this, ...args]);
    }
};

class int8multirange extends Any {
    static new(v) { return new int8multirange(v); }
    static parse(v) { return v; }
    static typeString() { return "int8multirange"; }
    asAggregate() {
        return undefined;
    }
}

class int8range extends Any {
    static new(v) { return new int8range(v); }
    static parse(v) { return v; }
    static typeString() { return "int8range"; }
    asAggregate() {
        return undefined;
    }
    int8Multirange(...args) {
        return sqlFunction("int8multirange", [{ args: [(int8range)], ret: (int8multirange), isOperator: false }], [this, ...args]);
    }
    int8RangeCanonical(...args) {
        return sqlFunction("int8range_canonical", [{ args: [(int8range)], ret: (int8range), isOperator: false }], [this, ...args]);
    }
}

class interval$1 extends Any {
    static new(v) { return new interval$1(v); }
    static parse(v) { return v; }
    static typeString() { return "interval"; }
    asAggregate() {
        return undefined;
    }
    avg(...args) {
        return sqlFunction("avg", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(interval$1), (interval$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    interval(...args) {
        return sqlFunction("interval", [{ args: [(interval$1), (default_1$4)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    intervalCmp(...args) {
        return sqlFunction("interval_cmp", [{ args: [(interval$1), (interval$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    intervalDiv(...args) {
        return sqlFunction("interval_div", [{ args: [(interval$1), (default_1$6)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    intervalEq(...args) {
        return sqlFunction("interval_eq", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    intervalGe(...args) {
        return sqlFunction("interval_ge", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    intervalGt(...args) {
        return sqlFunction("interval_gt", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    intervalHash(...args) {
        return sqlFunction("interval_hash", [{ args: [(interval$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    intervalHashExtended(...args) {
        return sqlFunction("interval_hash_extended", [{ args: [(interval$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    intervalLarger(...args) {
        return sqlFunction("interval_larger", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    intervalLe(...args) {
        return sqlFunction("interval_le", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    intervalLt(...args) {
        return sqlFunction("interval_lt", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    intervalMi(...args) {
        return sqlFunction("interval_mi", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    intervalMul(...args) {
        return sqlFunction("interval_mul", [{ args: [(interval$1), (default_1$6)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    intervalNe(...args) {
        return sqlFunction("interval_ne", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    intervalPl(...args) {
        return sqlFunction("interval_pl", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    intervalPlDate(...args) {
        return sqlFunction("interval_pl_date", [{ args: [(interval$1), (date$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    intervalPlTime(...args) {
        return sqlFunction("interval_pl_time", [{ args: [(interval$1), (time$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    intervalPlTimestamp(...args) {
        return sqlFunction("interval_pl_timestamp", [{ args: [(interval$1), (timestamp$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    intervalPlTimestamptz(...args) {
        return sqlFunction("interval_pl_timestamptz", [{ args: [(interval$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    intervalPlTimetz(...args) {
        return sqlFunction("interval_pl_timetz", [{ args: [(interval$1), (timetz$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    intervalSmaller(...args) {
        return sqlFunction("interval_smaller", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    intervalUm(...args) {
        return sqlFunction("interval_um", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    isfinite(...args) {
        return sqlFunction("isfinite", [{ args: [(interval$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    justifyDays(...args) {
        return sqlFunction("justify_days", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    justifyHours(...args) {
        return sqlFunction("justify_hours", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    justifyInterval(...args) {
        return sqlFunction("justify_interval", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    pgSleepFor(...args) {
        return sqlFunction("pg_sleep_for", [{ args: [(interval$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    sum(...args) {
        return sqlFunction("sum", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    time(...args) {
        return sqlFunction("time", [{ args: [(interval$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timezone(...args) {
        return sqlFunction("timezone", [{ args: [(interval$1), (timestamptz$1)], ret: (timestamp$1), isOperator: false }, { args: [(interval$1), (timestamp$1)], ret: (timestamptz$1), isOperator: false }, { args: [(interval$1), (timetz$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    toChar(...args) {
        return sqlFunction("to_char", [{ args: [(interval$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(interval$1), (default_1$6)], ret: (interval$1), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(interval$1), (default_1$6)], ret: (interval$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: true }, { args: [(interval$1), (date$1)], ret: (timestamp$1), isOperator: true }, { args: [(interval$1), (time$1)], ret: (time$1), isOperator: true }, { args: [(interval$1), (timestamp$1)], ret: (timestamp$1), isOperator: true }, { args: [(interval$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: true }, { args: [(interval$1), (timetz$1)], ret: (timetz$1), isOperator: true }], [this, ...args]);
    }
}

class json extends Any {
    static new(v) { return new json(v); }
    static parse(v) { return v; }
    static typeString() { return "json"; }
    asAggregate() {
        return undefined;
    }
    jsonArrayElement(...args) {
        return sqlFunction("json_array_element", [{ args: [(json), (default_1$4)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonArrayElementText(...args) {
        return sqlFunction("json_array_element_text", [{ args: [(json), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    jsonArrayElements(...args) {
        return sqlFunction("json_array_elements", [{ args: [(json)], ret: Setof.ofSchema({ value: (json) }), isOperator: false }], [this, ...args]);
    }
    jsonArrayElementsText(...args) {
        return sqlFunction("json_array_elements_text", [{ args: [(json)], ret: Setof.ofSchema({ value: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    jsonArrayLength(...args) {
        return sqlFunction("json_array_length", [{ args: [(json)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    jsonEach(...args) {
        return sqlFunction("json_each", [{ args: [(json)], ret: Setof.ofSchema({ key: (default_1$1), value: (json) }), isOperator: false }], [this, ...args]);
    }
    jsonEachText(...args) {
        return sqlFunction("json_each_text", [{ args: [(json)], ret: Setof.ofSchema({ key: (default_1$1), value: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    jsonExtractPath(...args) {
        return sqlFunction("json_extract_path", [{ args: [(json), Array$1.of((default_1$1))], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonExtractPathText(...args) {
        return sqlFunction("json_extract_path_text", [{ args: [(json), Array$1.of((default_1$1))], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    jsonObjectField(...args) {
        return sqlFunction("json_object_field", [{ args: [(json), (default_1$1)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonObjectFieldText(...args) {
        return sqlFunction("json_object_field_text", [{ args: [(json), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    jsonObjectKeys(...args) {
        return sqlFunction("json_object_keys", [{ args: [(json)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    jsonStripNulls(...args) {
        return sqlFunction("json_strip_nulls", [{ args: [(json)], ret: (json), isOperator: false }], [this, ...args]);
    }
    jsonToRecord(...args) {
        return sqlFunction("json_to_record", [({ R }) => ({ args: [(json)], ret: Record.of(R), isOperator: false })], [this, ...args]);
    }
    jsonToRecordset(...args) {
        return sqlFunction("json_to_recordset", [{ args: [(json)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    jsonToTsvector(...args) {
        return sqlFunction("json_to_tsvector", [{ args: [(json), (jsonb)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    jsonTypeof(...args) {
        return sqlFunction("json_typeof", [{ args: [(json)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    toTsvector(...args) {
        return sqlFunction("to_tsvector", [{ args: [(json)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    tsHeadline(...args) {
        return sqlFunction("ts_headline", [{ args: [(json), (tsquery)], ret: (json), isOperator: false }, { args: [(json), (tsquery), (default_1$1)], ret: (json), isOperator: false }], [this, ...args]);
    }
    ["->"](...args) {
        return sqlFunction("->", [{ args: [(json), (default_1$4)], ret: (json), isOperator: true }, { args: [(json), (default_1$1)], ret: (json), isOperator: true }], [this, ...args]);
    }
    ["->>"](...args) {
        return sqlFunction("->>", [{ args: [(json), (default_1$4)], ret: (default_1$1), isOperator: true }, { args: [(json), (default_1$1)], ret: (default_1$1), isOperator: true }], [this, ...args]);
    }
    ["#>"](...args) {
        return sqlFunction("#>", [{ args: [(json), Array$1.of((default_1$1))], ret: (json), isOperator: true }], [this, ...args]);
    }
    ["#>>"](...args) {
        return sqlFunction("#>>", [{ args: [(json), Array$1.of((default_1$1))], ret: (default_1$1), isOperator: true }], [this, ...args]);
    }
}

class jsonb extends Any {
    static new(v) { return new jsonb(v); }
    static parse(v) { return v; }
    static typeString() { return "jsonb"; }
    asAggregate() {
        return undefined;
    }
    bool(...args) {
        return sqlFunction("bool", [{ args: [(jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    float4(...args) {
        return sqlFunction("float4", [{ args: [(jsonb)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float8(...args) {
        return sqlFunction("float8", [{ args: [(jsonb)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    int2(...args) {
        return sqlFunction("int2", [{ args: [(jsonb)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(jsonb)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int8(...args) {
        return sqlFunction("int8", [{ args: [(jsonb)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    jsonbArrayElement(...args) {
        return sqlFunction("jsonb_array_element", [{ args: [(jsonb), (default_1$4)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbArrayElementText(...args) {
        return sqlFunction("jsonb_array_element_text", [{ args: [(jsonb), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    jsonbArrayElements(...args) {
        return sqlFunction("jsonb_array_elements", [{ args: [(jsonb)], ret: Setof.ofSchema({ value: (jsonb) }), isOperator: false }], [this, ...args]);
    }
    jsonbArrayElementsText(...args) {
        return sqlFunction("jsonb_array_elements_text", [{ args: [(jsonb)], ret: Setof.ofSchema({ value: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    jsonbArrayLength(...args) {
        return sqlFunction("jsonb_array_length", [{ args: [(jsonb)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    jsonbCmp(...args) {
        return sqlFunction("jsonb_cmp", [{ args: [(jsonb), (jsonb)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    jsonbConcat(...args) {
        return sqlFunction("jsonb_concat", [{ args: [(jsonb), (jsonb)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbContained(...args) {
        return sqlFunction("jsonb_contained", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbContains(...args) {
        return sqlFunction("jsonb_contains", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbDelete(...args) {
        return sqlFunction("jsonb_delete", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: false }, { args: [(jsonb), (default_1$4)], ret: (jsonb), isOperator: false }, { args: [(jsonb), (default_1$1)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbDeletePath(...args) {
        return sqlFunction("jsonb_delete_path", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbEach(...args) {
        return sqlFunction("jsonb_each", [{ args: [(jsonb)], ret: Setof.ofSchema({ key: (default_1$1), value: (jsonb) }), isOperator: false }], [this, ...args]);
    }
    jsonbEachText(...args) {
        return sqlFunction("jsonb_each_text", [{ args: [(jsonb)], ret: Setof.ofSchema({ key: (default_1$1), value: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    jsonbEq(...args) {
        return sqlFunction("jsonb_eq", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbExists(...args) {
        return sqlFunction("jsonb_exists", [{ args: [(jsonb), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbExistsAll(...args) {
        return sqlFunction("jsonb_exists_all", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbExistsAny(...args) {
        return sqlFunction("jsonb_exists_any", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbExtractPath(...args) {
        return sqlFunction("jsonb_extract_path", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbExtractPathText(...args) {
        return sqlFunction("jsonb_extract_path_text", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    jsonbGe(...args) {
        return sqlFunction("jsonb_ge", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbGt(...args) {
        return sqlFunction("jsonb_gt", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbHash(...args) {
        return sqlFunction("jsonb_hash", [{ args: [(jsonb)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    jsonbHashExtended(...args) {
        return sqlFunction("jsonb_hash_extended", [{ args: [(jsonb), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    jsonbInsert(...args) {
        return sqlFunction("jsonb_insert", [{ args: [(jsonb), Array$1.of((default_1$1)), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbLe(...args) {
        return sqlFunction("jsonb_le", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbLt(...args) {
        return sqlFunction("jsonb_lt", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbNe(...args) {
        return sqlFunction("jsonb_ne", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbObjectField(...args) {
        return sqlFunction("jsonb_object_field", [{ args: [(jsonb), (default_1$1)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbObjectFieldText(...args) {
        return sqlFunction("jsonb_object_field_text", [{ args: [(jsonb), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    jsonbObjectKeys(...args) {
        return sqlFunction("jsonb_object_keys", [{ args: [(jsonb)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    jsonbPathExists(...args) {
        return sqlFunction("jsonb_path_exists", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbPathExistsOpr(...args) {
        return sqlFunction("jsonb_path_exists_opr", [{ args: [(jsonb), (jsonpath)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbPathExistsTz(...args) {
        return sqlFunction("jsonb_path_exists_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbPathMatch(...args) {
        return sqlFunction("jsonb_path_match", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbPathMatchOpr(...args) {
        return sqlFunction("jsonb_path_match_opr", [{ args: [(jsonb), (jsonpath)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbPathMatchTz(...args) {
        return sqlFunction("jsonb_path_match_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    jsonbPathQuery(...args) {
        return sqlFunction("jsonb_path_query", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    jsonbPathQueryArray(...args) {
        return sqlFunction("jsonb_path_query_array", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbPathQueryArrayTz(...args) {
        return sqlFunction("jsonb_path_query_array_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbPathQueryFirst(...args) {
        return sqlFunction("jsonb_path_query_first", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbPathQueryFirstTz(...args) {
        return sqlFunction("jsonb_path_query_first_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbPathQueryTz(...args) {
        return sqlFunction("jsonb_path_query_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    jsonbPretty(...args) {
        return sqlFunction("jsonb_pretty", [{ args: [(jsonb)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    jsonbSet(...args) {
        return sqlFunction("jsonb_set", [{ args: [(jsonb), Array$1.of((default_1$1)), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbSetLax(...args) {
        return sqlFunction("jsonb_set_lax", [{ args: [(jsonb), Array$1.of((default_1$1)), (jsonb), (default_1$8), (default_1$1)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbStripNulls(...args) {
        return sqlFunction("jsonb_strip_nulls", [{ args: [(jsonb)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    jsonbToRecord(...args) {
        return sqlFunction("jsonb_to_record", [({ R }) => ({ args: [(jsonb)], ret: Record.of(R), isOperator: false })], [this, ...args]);
    }
    jsonbToRecordset(...args) {
        return sqlFunction("jsonb_to_recordset", [{ args: [(jsonb)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    jsonbToTsvector(...args) {
        return sqlFunction("jsonb_to_tsvector", [{ args: [(jsonb), (jsonb)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    jsonbTypeof(...args) {
        return sqlFunction("jsonb_typeof", [{ args: [(jsonb)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    numeric(...args) {
        return sqlFunction("numeric", [{ args: [(jsonb)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    toTsvector(...args) {
        return sqlFunction("to_tsvector", [{ args: [(jsonb)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    tsHeadline(...args) {
        return sqlFunction("ts_headline", [{ args: [(jsonb), (tsquery)], ret: (jsonb), isOperator: false }, { args: [(jsonb), (tsquery), (default_1$1)], ret: (jsonb), isOperator: false }], [this, ...args]);
    }
    ["->"](...args) {
        return sqlFunction("->", [{ args: [(jsonb), (default_1$4)], ret: (jsonb), isOperator: true }, { args: [(jsonb), (default_1$1)], ret: (jsonb), isOperator: true }], [this, ...args]);
    }
    ["->>"](...args) {
        return sqlFunction("->>", [{ args: [(jsonb), (default_1$4)], ret: (default_1$1), isOperator: true }, { args: [(jsonb), (default_1$1)], ret: (default_1$1), isOperator: true }], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: true }, { args: [(jsonb), (default_1$4)], ret: (jsonb), isOperator: true }, { args: [(jsonb), (default_1$1)], ret: (jsonb), isOperator: true }], [this, ...args]);
    }
    ["#-"](...args) {
        return sqlFunction("#-", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["?"](...args) {
        return sqlFunction("?", [{ args: [(jsonb), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["?&"](...args) {
        return sqlFunction("?&", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["?|"](...args) {
        return sqlFunction("?|", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["#>"](...args) {
        return sqlFunction("#>", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: true }], [this, ...args]);
    }
    ["#>>"](...args) {
        return sqlFunction("#>>", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$1), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@?"](...args) {
        return sqlFunction("@?", [{ args: [(jsonb), (jsonpath)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@@"](...args) {
        return sqlFunction("@@", [{ args: [(jsonb), (jsonpath)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class jsonpath extends Any {
    static new(v) { return new jsonpath(v); }
    static parse(v) { return v; }
    static typeString() { return "jsonpath"; }
    asAggregate() {
        return undefined;
    }
}

class language_handler extends Any {
    static new(v) { return new language_handler(v); }
    static parse(v) { return v; }
    static typeString() { return "language_handler"; }
    asAggregate() {
        return undefined;
    }
}

class line$1 extends Any {
    static new(v) { return new line$1(v); }
    static parse(v) { return v; }
    static typeString() { return "line"; }
    asAggregate() {
        return undefined;
    }
    closeLs(...args) {
        return sqlFunction("close_ls", [{ args: [(line$1), (lseg$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    distLp(...args) {
        return sqlFunction("dist_lp", [{ args: [(line$1), (point$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distLs(...args) {
        return sqlFunction("dist_ls", [{ args: [(line$1), (lseg$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    interLb(...args) {
        return sqlFunction("inter_lb", [{ args: [(line$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ishorizontal(...args) {
        return sqlFunction("ishorizontal", [{ args: [(line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isparallel(...args) {
        return sqlFunction("isparallel", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isperp(...args) {
        return sqlFunction("isperp", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isvertical(...args) {
        return sqlFunction("isvertical", [{ args: [(line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lineDistance(...args) {
        return sqlFunction("line_distance", [{ args: [(line$1), (line$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    lineEq(...args) {
        return sqlFunction("line_eq", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lineHorizontal(...args) {
        return sqlFunction("line_horizontal", [{ args: [(line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lineInterpt(...args) {
        return sqlFunction("line_interpt", [{ args: [(line$1), (line$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    lineIntersect(...args) {
        return sqlFunction("line_intersect", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lineParallel(...args) {
        return sqlFunction("line_parallel", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    linePerp(...args) {
        return sqlFunction("line_perp", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lineVertical(...args) {
        return sqlFunction("line_vertical", [{ args: [(line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["##"](...args) {
        return sqlFunction("##", [{ args: [(line$1), (lseg$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["<->"](...args) {
        return sqlFunction("<->", [{ args: [(line$1), (point$1)], ret: (default_1$6), isOperator: true }, { args: [(line$1), (lseg$1)], ret: (default_1$6), isOperator: true }, { args: [(line$1), (line$1)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["?#"](...args) {
        return sqlFunction("?#", [{ args: [(line$1), (box$1)], ret: (default_1$8), isOperator: true }, { args: [(line$1), (line$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["#"](...args) {
        return sqlFunction("#", [{ args: [(line$1), (line$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["?||"](...args) {
        return sqlFunction("?||", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["?-|"](...args) {
        return sqlFunction("?-|", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class lseg$1 extends Any {
    static new(v) { return new lseg$1(v); }
    static parse(v) { return v; }
    static typeString() { return "lseg"; }
    asAggregate() {
        return undefined;
    }
    closeLseg(...args) {
        return sqlFunction("close_lseg", [{ args: [(lseg$1), (lseg$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    closeSb(...args) {
        return sqlFunction("close_sb", [{ args: [(lseg$1), (box$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    distSb(...args) {
        return sqlFunction("dist_sb", [{ args: [(lseg$1), (box$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distSl(...args) {
        return sqlFunction("dist_sl", [{ args: [(lseg$1), (line$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distSp(...args) {
        return sqlFunction("dist_sp", [{ args: [(lseg$1), (point$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    interSb(...args) {
        return sqlFunction("inter_sb", [{ args: [(lseg$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    interSl(...args) {
        return sqlFunction("inter_sl", [{ args: [(lseg$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ishorizontal(...args) {
        return sqlFunction("ishorizontal", [{ args: [(lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isparallel(...args) {
        return sqlFunction("isparallel", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isperp(...args) {
        return sqlFunction("isperp", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isvertical(...args) {
        return sqlFunction("isvertical", [{ args: [(lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    length(...args) {
        return sqlFunction("length", [{ args: [(lseg$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    lsegCenter(...args) {
        return sqlFunction("lseg_center", [{ args: [(lseg$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    lsegDistance(...args) {
        return sqlFunction("lseg_distance", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    lsegEq(...args) {
        return sqlFunction("lseg_eq", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegGe(...args) {
        return sqlFunction("lseg_ge", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegGt(...args) {
        return sqlFunction("lseg_gt", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegHorizontal(...args) {
        return sqlFunction("lseg_horizontal", [{ args: [(lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegInterpt(...args) {
        return sqlFunction("lseg_interpt", [{ args: [(lseg$1), (lseg$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    lsegIntersect(...args) {
        return sqlFunction("lseg_intersect", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegLe(...args) {
        return sqlFunction("lseg_le", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegLength(...args) {
        return sqlFunction("lseg_length", [{ args: [(lseg$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    lsegLt(...args) {
        return sqlFunction("lseg_lt", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegNe(...args) {
        return sqlFunction("lseg_ne", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegParallel(...args) {
        return sqlFunction("lseg_parallel", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegPerp(...args) {
        return sqlFunction("lseg_perp", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    lsegVertical(...args) {
        return sqlFunction("lseg_vertical", [{ args: [(lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    onSb(...args) {
        return sqlFunction("on_sb", [{ args: [(lseg$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    onSl(...args) {
        return sqlFunction("on_sl", [{ args: [(lseg$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    point(...args) {
        return sqlFunction("point", [{ args: [(lseg$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    ["##"](...args) {
        return sqlFunction("##", [{ args: [(lseg$1), (lseg$1)], ret: (point$1), isOperator: true }, { args: [(lseg$1), (box$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["<->"](...args) {
        return sqlFunction("<->", [{ args: [(lseg$1), (box$1)], ret: (default_1$6), isOperator: true }, { args: [(lseg$1), (line$1)], ret: (default_1$6), isOperator: true }, { args: [(lseg$1), (point$1)], ret: (default_1$6), isOperator: true }, { args: [(lseg$1), (lseg$1)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["?#"](...args) {
        return sqlFunction("?#", [{ args: [(lseg$1), (box$1)], ret: (default_1$8), isOperator: true }, { args: [(lseg$1), (line$1)], ret: (default_1$8), isOperator: true }, { args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["#"](...args) {
        return sqlFunction("#", [{ args: [(lseg$1), (lseg$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["?||"](...args) {
        return sqlFunction("?||", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["?-|"](...args) {
        return sqlFunction("?-|", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class macaddr$1 extends Any {
    static new(v) { return new macaddr$1(v); }
    static parse(v) { return v; }
    static typeString() { return "macaddr"; }
    asAggregate() {
        return undefined;
    }
    hashmacaddr(...args) {
        return sqlFunction("hashmacaddr", [{ args: [(macaddr$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashmacaddrextended(...args) {
        return sqlFunction("hashmacaddrextended", [{ args: [(macaddr$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    macaddr8(...args) {
        return sqlFunction("macaddr8", [{ args: [(macaddr$1)], ret: (macaddr8$1), isOperator: false }], [this, ...args]);
    }
    macaddrAnd(...args) {
        return sqlFunction("macaddr_and", [{ args: [(macaddr$1), (macaddr$1)], ret: (macaddr$1), isOperator: false }], [this, ...args]);
    }
    macaddrCmp(...args) {
        return sqlFunction("macaddr_cmp", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    macaddrEq(...args) {
        return sqlFunction("macaddr_eq", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddrGe(...args) {
        return sqlFunction("macaddr_ge", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddrGt(...args) {
        return sqlFunction("macaddr_gt", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddrLe(...args) {
        return sqlFunction("macaddr_le", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddrLt(...args) {
        return sqlFunction("macaddr_lt", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddrNe(...args) {
        return sqlFunction("macaddr_ne", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddrNot(...args) {
        return sqlFunction("macaddr_not", [{ args: [(macaddr$1)], ret: (macaddr$1), isOperator: false }], [this, ...args]);
    }
    macaddrOr(...args) {
        return sqlFunction("macaddr_or", [{ args: [(macaddr$1), (macaddr$1)], ret: (macaddr$1), isOperator: false }], [this, ...args]);
    }
    trunc(...args) {
        return sqlFunction("trunc", [{ args: [(macaddr$1)], ret: (macaddr$1), isOperator: false }], [this, ...args]);
    }
    ["&"](...args) {
        return sqlFunction("&", [{ args: [(macaddr$1), (macaddr$1)], ret: (macaddr$1), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["|"](...args) {
        return sqlFunction("|", [{ args: [(macaddr$1), (macaddr$1)], ret: (macaddr$1), isOperator: true }], [this, ...args]);
    }
}

class macaddr8$1 extends Any {
    static new(v) { return new macaddr8$1(v); }
    static parse(v) { return v; }
    static typeString() { return "macaddr8"; }
    asAggregate() {
        return undefined;
    }
    hashmacaddr8(...args) {
        return sqlFunction("hashmacaddr8", [{ args: [(macaddr8$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashmacaddr8Extended(...args) {
        return sqlFunction("hashmacaddr8extended", [{ args: [(macaddr8$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    macaddr(...args) {
        return sqlFunction("macaddr", [{ args: [(macaddr8$1)], ret: (macaddr$1), isOperator: false }], [this, ...args]);
    }
    macaddr8And(...args) {
        return sqlFunction("macaddr8_and", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (macaddr8$1), isOperator: false }], [this, ...args]);
    }
    macaddr8Cmp(...args) {
        return sqlFunction("macaddr8_cmp", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    macaddr8Eq(...args) {
        return sqlFunction("macaddr8_eq", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddr8Ge(...args) {
        return sqlFunction("macaddr8_ge", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddr8Gt(...args) {
        return sqlFunction("macaddr8_gt", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddr8Le(...args) {
        return sqlFunction("macaddr8_le", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddr8Lt(...args) {
        return sqlFunction("macaddr8_lt", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddr8Ne(...args) {
        return sqlFunction("macaddr8_ne", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    macaddr8Not(...args) {
        return sqlFunction("macaddr8_not", [{ args: [(macaddr8$1)], ret: (macaddr8$1), isOperator: false }], [this, ...args]);
    }
    macaddr8Or(...args) {
        return sqlFunction("macaddr8_or", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (macaddr8$1), isOperator: false }], [this, ...args]);
    }
    macaddr8Set7Bit(...args) {
        return sqlFunction("macaddr8_set7bit", [{ args: [(macaddr8$1)], ret: (macaddr8$1), isOperator: false }], [this, ...args]);
    }
    trunc(...args) {
        return sqlFunction("trunc", [{ args: [(macaddr8$1)], ret: (macaddr8$1), isOperator: false }], [this, ...args]);
    }
    ["&"](...args) {
        return sqlFunction("&", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (macaddr8$1), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["|"](...args) {
        return sqlFunction("|", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (macaddr8$1), isOperator: true }], [this, ...args]);
    }
}

class money$1 extends Any {
    static new(v) { return new money$1(v); }
    static parse(v) { return v; }
    static typeString() { return "money"; }
    asAggregate() {
        return undefined;
    }
    cashCmp(...args) {
        return sqlFunction("cash_cmp", [{ args: [(money$1), (money$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    cashDivCash(...args) {
        return sqlFunction("cash_div_cash", [{ args: [(money$1), (money$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    cashDivFlt4(...args) {
        return sqlFunction("cash_div_flt4", [{ args: [(money$1), (default_1$7)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashDivFlt8(...args) {
        return sqlFunction("cash_div_flt8", [{ args: [(money$1), (default_1$6)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashDivInt2(...args) {
        return sqlFunction("cash_div_int2", [{ args: [(money$1), (default_1$5)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashDivInt4(...args) {
        return sqlFunction("cash_div_int4", [{ args: [(money$1), (default_1$4)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashDivInt8(...args) {
        return sqlFunction("cash_div_int8", [{ args: [(money$1), (default_1$3)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashEq(...args) {
        return sqlFunction("cash_eq", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    cashGe(...args) {
        return sqlFunction("cash_ge", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    cashGt(...args) {
        return sqlFunction("cash_gt", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    cashLe(...args) {
        return sqlFunction("cash_le", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    cashLt(...args) {
        return sqlFunction("cash_lt", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    cashMi(...args) {
        return sqlFunction("cash_mi", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashMulFlt4(...args) {
        return sqlFunction("cash_mul_flt4", [{ args: [(money$1), (default_1$7)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashMulFlt8(...args) {
        return sqlFunction("cash_mul_flt8", [{ args: [(money$1), (default_1$6)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashMulInt2(...args) {
        return sqlFunction("cash_mul_int2", [{ args: [(money$1), (default_1$5)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashMulInt4(...args) {
        return sqlFunction("cash_mul_int4", [{ args: [(money$1), (default_1$4)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashMulInt8(...args) {
        return sqlFunction("cash_mul_int8", [{ args: [(money$1), (default_1$3)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashNe(...args) {
        return sqlFunction("cash_ne", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    cashPl(...args) {
        return sqlFunction("cash_pl", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashWords(...args) {
        return sqlFunction("cash_words", [{ args: [(money$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    cashlarger(...args) {
        return sqlFunction("cashlarger", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    cashsmaller(...args) {
        return sqlFunction("cashsmaller", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    numeric(...args) {
        return sqlFunction("numeric", [{ args: [(money$1)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    sum(...args) {
        return sqlFunction("sum", [{ args: [(money$1)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(money$1), (money$1)], ret: (default_1$6), isOperator: true }, { args: [(money$1), (default_1$7)], ret: (money$1), isOperator: true }, { args: [(money$1), (default_1$6)], ret: (money$1), isOperator: true }, { args: [(money$1), (default_1$5)], ret: (money$1), isOperator: true }, { args: [(money$1), (default_1$4)], ret: (money$1), isOperator: true }, { args: [(money$1), (default_1$3)], ret: (money$1), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(money$1), (default_1$7)], ret: (money$1), isOperator: true }, { args: [(money$1), (default_1$6)], ret: (money$1), isOperator: true }, { args: [(money$1), (default_1$5)], ret: (money$1), isOperator: true }, { args: [(money$1), (default_1$4)], ret: (money$1), isOperator: true }, { args: [(money$1), (default_1$3)], ret: (money$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: true }], [this, ...args]);
    }
}

class name$1 extends Any {
    static new(v) { return new name$1(v); }
    static parse(v) { return v; }
    static typeString() { return "name"; }
    asAggregate() {
        return undefined;
    }
    binaryUpgradeLogicalSlotHasCaughtUp(...args) {
        return sqlFunction("binary_upgrade_logical_slot_has_caught_up", [{ args: [(name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    bpchar(...args) {
        return sqlFunction("bpchar", [{ args: [(name$1)], ret: (bpchar$1), isOperator: false }], [this, ...args]);
    }
    btnamecmp(...args) {
        return sqlFunction("btnamecmp", [{ args: [(name$1), (name$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btnametextcmp(...args) {
        return sqlFunction("btnametextcmp", [{ args: [(name$1), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hasAnyColumnPrivilege(...args) {
        return sqlFunction("has_any_column_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasColumnPrivilege(...args) {
        return sqlFunction("has_column_privilege", [{ args: [(name$1), (oid$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasDatabasePrivilege(...args) {
        return sqlFunction("has_database_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasForeignDataWrapperPrivilege(...args) {
        return sqlFunction("has_foreign_data_wrapper_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasFunctionPrivilege(...args) {
        return sqlFunction("has_function_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasLanguagePrivilege(...args) {
        return sqlFunction("has_language_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasParameterPrivilege(...args) {
        return sqlFunction("has_parameter_privilege", [{ args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasSchemaPrivilege(...args) {
        return sqlFunction("has_schema_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasSequencePrivilege(...args) {
        return sqlFunction("has_sequence_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasServerPrivilege(...args) {
        return sqlFunction("has_server_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTablePrivilege(...args) {
        return sqlFunction("has_table_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTablespacePrivilege(...args) {
        return sqlFunction("has_tablespace_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTypePrivilege(...args) {
        return sqlFunction("has_type_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hashname(...args) {
        return sqlFunction("hashname", [{ args: [(name$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashnameextended(...args) {
        return sqlFunction("hashnameextended", [{ args: [(name$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    like(...args) {
        return sqlFunction("like", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameconcatoid(...args) {
        return sqlFunction("nameconcatoid", [{ args: [(name$1), (oid$1)], ret: (name$1), isOperator: false }], [this, ...args]);
    }
    nameeq(...args) {
        return sqlFunction("nameeq", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameeqtext(...args) {
        return sqlFunction("nameeqtext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namege(...args) {
        return sqlFunction("namege", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namegetext(...args) {
        return sqlFunction("namegetext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namegt(...args) {
        return sqlFunction("namegt", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namegttext(...args) {
        return sqlFunction("namegttext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameiclike(...args) {
        return sqlFunction("nameiclike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameicnlike(...args) {
        return sqlFunction("nameicnlike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameicregexeq(...args) {
        return sqlFunction("nameicregexeq", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameicregexne(...args) {
        return sqlFunction("nameicregexne", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namele(...args) {
        return sqlFunction("namele", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameletext(...args) {
        return sqlFunction("nameletext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namelike(...args) {
        return sqlFunction("namelike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namelt(...args) {
        return sqlFunction("namelt", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namelttext(...args) {
        return sqlFunction("namelttext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namene(...args) {
        return sqlFunction("namene", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namenetext(...args) {
        return sqlFunction("namenetext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    namenlike(...args) {
        return sqlFunction("namenlike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameregexeq(...args) {
        return sqlFunction("nameregexeq", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    nameregexne(...args) {
        return sqlFunction("nameregexne", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    notlike(...args) {
        return sqlFunction("notlike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgCharToEncoding(...args) {
        return sqlFunction("pg_char_to_encoding", [{ args: [(name$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgCopyLogicalReplicationSlot(...args) {
        return sqlFunction("pg_copy_logical_replication_slot", [{ args: [(name$1), (name$1)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }, { args: [(name$1), (name$1), (default_1$8)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }, { args: [(name$1), (name$1), (default_1$8), (name$1)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }], [this, ...args]);
    }
    pgCopyPhysicalReplicationSlot(...args) {
        return sqlFunction("pg_copy_physical_replication_slot", [{ args: [(name$1), (name$1)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }, { args: [(name$1), (name$1), (default_1$8)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }], [this, ...args]);
    }
    pgCreateLogicalReplicationSlot(...args) {
        return sqlFunction("pg_create_logical_replication_slot", [{ args: [(name$1), (name$1), (default_1$8), (default_1$8), (default_1$8)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }], [this, ...args]);
    }
    pgCreatePhysicalReplicationSlot(...args) {
        return sqlFunction("pg_create_physical_replication_slot", [{ args: [(name$1), (default_1$8), (default_1$8)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }], [this, ...args]);
    }
    pgDatabaseSize(...args) {
        return sqlFunction("pg_database_size", [{ args: [(name$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgDropReplicationSlot(...args) {
        return sqlFunction("pg_drop_replication_slot", [{ args: [(name$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgExtensionUpdatePaths(...args) {
        return sqlFunction("pg_extension_update_paths", [{ args: [(name$1)], ret: Setof.ofSchema({ source: (default_1$1), target: (default_1$1), path: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    pgHasRole(...args) {
        return sqlFunction("pg_has_role", [{ args: [(name$1), (name$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLogicalSlotGetBinaryChanges(...args) {
        return sqlFunction("pg_logical_slot_get_binary_changes", [{ args: [(name$1), (pg_lsn), (default_1$4), Array$1.of((default_1$1))], ret: Setof.ofSchema({ lsn: (pg_lsn), xid: (xid$1), data: (bytea) }), isOperator: false }], [this, ...args]);
    }
    pgLogicalSlotGetChanges(...args) {
        return sqlFunction("pg_logical_slot_get_changes", [{ args: [(name$1), (pg_lsn), (default_1$4), Array$1.of((default_1$1))], ret: Setof.ofSchema({ lsn: (pg_lsn), xid: (xid$1), data: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    pgLogicalSlotPeekBinaryChanges(...args) {
        return sqlFunction("pg_logical_slot_peek_binary_changes", [{ args: [(name$1), (pg_lsn), (default_1$4), Array$1.of((default_1$1))], ret: Setof.ofSchema({ lsn: (pg_lsn), xid: (xid$1), data: (bytea) }), isOperator: false }], [this, ...args]);
    }
    pgLogicalSlotPeekChanges(...args) {
        return sqlFunction("pg_logical_slot_peek_changes", [{ args: [(name$1), (pg_lsn), (default_1$4), Array$1.of((default_1$1))], ret: Setof.ofSchema({ lsn: (pg_lsn), xid: (xid$1), data: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    pgReplicationSlotAdvance(...args) {
        return sqlFunction("pg_replication_slot_advance", [{ args: [(name$1), (pg_lsn)], ret: Record.of({ slot_name: (name$1), end_lsn: (pg_lsn) }), isOperator: false }], [this, ...args]);
    }
    pgTablespaceSize(...args) {
        return sqlFunction("pg_tablespace_size", [{ args: [(name$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    schemaToXml(...args) {
        return sqlFunction("schema_to_xml", [{ args: [(name$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    schemaToXmlAndXmlschema(...args) {
        return sqlFunction("schema_to_xml_and_xmlschema", [{ args: [(name$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    schemaToXmlschema(...args) {
        return sqlFunction("schema_to_xmlschema", [{ args: [(name$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    text(...args) {
        return sqlFunction("text", [{ args: [(name$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    varchar(...args) {
        return sqlFunction("varchar", [{ args: [(name$1)], ret: (varchar$1), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: true }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: true }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: true }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~~*"](...args) {
        return sqlFunction("~~*", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~~*"](...args) {
        return sqlFunction("!~~*", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~*"](...args) {
        return sqlFunction("~*", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~*"](...args) {
        return sqlFunction("!~*", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: true }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~~"](...args) {
        return sqlFunction("~~", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: true }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: true }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~~"](...args) {
        return sqlFunction("!~~", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~"](...args) {
        return sqlFunction("~", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~"](...args) {
        return sqlFunction("!~", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

let default_1$2 = class default_1 extends Any {
    static new(v) { return new default_1$2(v); }
    static serializeParamTypes = undefined;
    static parse(v) { return typeMap["numeric"].parse(v); }
    static typeString() { return "numeric"; }
    asAggregate() {
        return undefined;
    }
    abs(...args) {
        return sqlFunction("abs", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    avg(...args) {
        return sqlFunction("avg", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    ceil(...args) {
        return sqlFunction("ceil", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    ceiling(...args) {
        return sqlFunction("ceiling", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    div(...args) {
        return sqlFunction("div", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    exp(...args) {
        return sqlFunction("exp", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    float4(...args) {
        return sqlFunction("float4", [{ args: [(default_1$2)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    float8(...args) {
        return sqlFunction("float8", [{ args: [(default_1$2)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    floor(...args) {
        return sqlFunction("floor", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    gcd(...args) {
        return sqlFunction("gcd", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    generateSeries(...args) {
        return sqlFunction("generate_series", [{ args: [(default_1$2), (default_1$2)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$2), (default_1$2), (default_1$2)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    hashNumeric(...args) {
        return sqlFunction("hash_numeric", [{ args: [(default_1$2)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashNumericExtended(...args) {
        return sqlFunction("hash_numeric_extended", [{ args: [(default_1$2), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(default_1$2), (default_1$2), (default_1$2), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    int2(...args) {
        return sqlFunction("int2", [{ args: [(default_1$2)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    int4(...args) {
        return sqlFunction("int4", [{ args: [(default_1$2)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    int8(...args) {
        return sqlFunction("int8", [{ args: [(default_1$2)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8Sum(...args) {
        return sqlFunction("int8_sum", [{ args: [(default_1$2), (default_1$3)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    lcm(...args) {
        return sqlFunction("lcm", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    ln(...args) {
        return sqlFunction("ln", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    log(...args) {
        return sqlFunction("log", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    log10(...args) {
        return sqlFunction("log10", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    minScale(...args) {
        return sqlFunction("min_scale", [{ args: [(default_1$2)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    mod(...args) {
        return sqlFunction("mod", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    money(...args) {
        return sqlFunction("money", [{ args: [(default_1$2)], ret: (money$1), isOperator: false }], [this, ...args]);
    }
    numeric(...args) {
        return sqlFunction("numeric", [{ args: [(default_1$2), (default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericAbs(...args) {
        return sqlFunction("numeric_abs", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericAdd(...args) {
        return sqlFunction("numeric_add", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericCmp(...args) {
        return sqlFunction("numeric_cmp", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    numericDiv(...args) {
        return sqlFunction("numeric_div", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericDivTrunc(...args) {
        return sqlFunction("numeric_div_trunc", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericEq(...args) {
        return sqlFunction("numeric_eq", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    numericExp(...args) {
        return sqlFunction("numeric_exp", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericGe(...args) {
        return sqlFunction("numeric_ge", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    numericGt(...args) {
        return sqlFunction("numeric_gt", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    numericInc(...args) {
        return sqlFunction("numeric_inc", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericLarger(...args) {
        return sqlFunction("numeric_larger", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericLe(...args) {
        return sqlFunction("numeric_le", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    numericLn(...args) {
        return sqlFunction("numeric_ln", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericLog(...args) {
        return sqlFunction("numeric_log", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericLt(...args) {
        return sqlFunction("numeric_lt", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    numericMod(...args) {
        return sqlFunction("numeric_mod", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericMul(...args) {
        return sqlFunction("numeric_mul", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericNe(...args) {
        return sqlFunction("numeric_ne", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    numericPlPgLsn(...args) {
        return sqlFunction("numeric_pl_pg_lsn", [{ args: [(default_1$2), (pg_lsn)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    numericPower(...args) {
        return sqlFunction("numeric_power", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericSmaller(...args) {
        return sqlFunction("numeric_smaller", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericSqrt(...args) {
        return sqlFunction("numeric_sqrt", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericSub(...args) {
        return sqlFunction("numeric_sub", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericUminus(...args) {
        return sqlFunction("numeric_uminus", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numericUplus(...args) {
        return sqlFunction("numeric_uplus", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    numrange(...args) {
        return sqlFunction("numrange", [{ args: [(default_1$2), (default_1$2)], ret: (numrange$1), isOperator: false }, { args: [(default_1$2), (default_1$2), (default_1$1)], ret: (numrange$1), isOperator: false }], [this, ...args]);
    }
    numrangeSubdiff(...args) {
        return sqlFunction("numrange_subdiff", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgLsn(...args) {
        return sqlFunction("pg_lsn", [{ args: [(default_1$2)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgSizePretty(...args) {
        return sqlFunction("pg_size_pretty", [{ args: [(default_1$2)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pow(...args) {
        return sqlFunction("pow", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    power(...args) {
        return sqlFunction("power", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    random(...args) {
        return sqlFunction("random", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    round(...args) {
        return sqlFunction("round", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2), (default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    scale(...args) {
        return sqlFunction("scale", [{ args: [(default_1$2)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    sign(...args) {
        return sqlFunction("sign", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    sqrt(...args) {
        return sqlFunction("sqrt", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddev(...args) {
        return sqlFunction("stddev", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddevPop(...args) {
        return sqlFunction("stddev_pop", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    stddevSamp(...args) {
        return sqlFunction("stddev_samp", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    sum(...args) {
        return sqlFunction("sum", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    toChar(...args) {
        return sqlFunction("to_char", [{ args: [(default_1$2), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    trimScale(...args) {
        return sqlFunction("trim_scale", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    trunc(...args) {
        return sqlFunction("trunc", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2), (default_1$4)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    varPop(...args) {
        return sqlFunction("var_pop", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    varSamp(...args) {
        return sqlFunction("var_samp", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    variance(...args) {
        return sqlFunction("variance", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: true }, { args: [(default_1$2), (pg_lsn)], ret: (pg_lsn), isOperator: true }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["%"](...args) {
        return sqlFunction("%", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["^"](...args) {
        return sqlFunction("^", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: true }], [this, ...args]);
    }
};

class nummultirange$1 extends Any {
    static new(v) { return new nummultirange$1(v); }
    static parse(v) { return v; }
    static typeString() { return "nummultirange"; }
    asAggregate() {
        return undefined;
    }
}

class numrange$1 extends Any {
    static new(v) { return new numrange$1(v); }
    static parse(v) { return v; }
    static typeString() { return "numrange"; }
    asAggregate() {
        return undefined;
    }
    nummultirange(...args) {
        return sqlFunction("nummultirange", [{ args: [(numrange$1)], ret: (nummultirange$1), isOperator: false }], [this, ...args]);
    }
}

class oid$1 extends Any {
    static new(v) { return new oid$1(v); }
    static parse(v) { return v; }
    static typeString() { return "oid"; }
    asAggregate() {
        return undefined;
    }
    amvalidate(...args) {
        return sqlFunction("amvalidate", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetMissingValue(...args) {
        return sqlFunction("binary_upgrade_set_missing_value", [{ args: [(oid$1), (default_1$1), (default_1$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextArrayPgTypeOid(...args) {
        return sqlFunction("binary_upgrade_set_next_array_pg_type_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextHeapPgClassOid(...args) {
        return sqlFunction("binary_upgrade_set_next_heap_pg_class_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextHeapRelfilenode(...args) {
        return sqlFunction("binary_upgrade_set_next_heap_relfilenode", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextIndexPgClassOid(...args) {
        return sqlFunction("binary_upgrade_set_next_index_pg_class_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextIndexRelfilenode(...args) {
        return sqlFunction("binary_upgrade_set_next_index_relfilenode", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextMultirangeArrayPgTypeOid(...args) {
        return sqlFunction("binary_upgrade_set_next_multirange_array_pg_type_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextMultirangePgTypeOid(...args) {
        return sqlFunction("binary_upgrade_set_next_multirange_pg_type_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextPgAuthidOid(...args) {
        return sqlFunction("binary_upgrade_set_next_pg_authid_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextPgEnumOid(...args) {
        return sqlFunction("binary_upgrade_set_next_pg_enum_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextPgTablespaceOid(...args) {
        return sqlFunction("binary_upgrade_set_next_pg_tablespace_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextPgTypeOid(...args) {
        return sqlFunction("binary_upgrade_set_next_pg_type_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextToastPgClassOid(...args) {
        return sqlFunction("binary_upgrade_set_next_toast_pg_class_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeSetNextToastRelfilenode(...args) {
        return sqlFunction("binary_upgrade_set_next_toast_relfilenode", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    btequalimage(...args) {
        return sqlFunction("btequalimage", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    btoidcmp(...args) {
        return sqlFunction("btoidcmp", [{ args: [(oid$1), (oid$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btvarstrequalimage(...args) {
        return sqlFunction("btvarstrequalimage", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    colDescription(...args) {
        return sqlFunction("col_description", [{ args: [(oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    fmgrCValidator(...args) {
        return sqlFunction("fmgr_c_validator", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    fmgrInternalValidator(...args) {
        return sqlFunction("fmgr_internal_validator", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    fmgrSqlValidator(...args) {
        return sqlFunction("fmgr_sql_validator", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    formatType(...args) {
        return sqlFunction("format_type", [{ args: [(oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    hasAnyColumnPrivilege(...args) {
        return sqlFunction("has_any_column_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasColumnPrivilege(...args) {
        return sqlFunction("has_column_privilege", [{ args: [(oid$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasDatabasePrivilege(...args) {
        return sqlFunction("has_database_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasForeignDataWrapperPrivilege(...args) {
        return sqlFunction("has_foreign_data_wrapper_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasFunctionPrivilege(...args) {
        return sqlFunction("has_function_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasLanguagePrivilege(...args) {
        return sqlFunction("has_language_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasParameterPrivilege(...args) {
        return sqlFunction("has_parameter_privilege", [{ args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasSchemaPrivilege(...args) {
        return sqlFunction("has_schema_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasSequencePrivilege(...args) {
        return sqlFunction("has_sequence_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasServerPrivilege(...args) {
        return sqlFunction("has_server_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTablePrivilege(...args) {
        return sqlFunction("has_table_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTablespacePrivilege(...args) {
        return sqlFunction("has_tablespace_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTypePrivilege(...args) {
        return sqlFunction("has_type_privilege", [{ args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hashoid(...args) {
        return sqlFunction("hashoid", [{ args: [(oid$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashoidextended(...args) {
        return sqlFunction("hashoidextended", [{ args: [(oid$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    int8(...args) {
        return sqlFunction("int8", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    loCreate(...args) {
        return sqlFunction("lo_create", [{ args: [(oid$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    loExport(...args) {
        return sqlFunction("lo_export", [{ args: [(oid$1), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    loFromBytea(...args) {
        return sqlFunction("lo_from_bytea", [{ args: [(oid$1), (bytea)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    loGet(...args) {
        return sqlFunction("lo_get", [{ args: [(oid$1)], ret: (bytea), isOperator: false }, { args: [(oid$1), (default_1$3), (default_1$4)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    loOpen(...args) {
        return sqlFunction("lo_open", [{ args: [(oid$1), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    loPut(...args) {
        return sqlFunction("lo_put", [{ args: [(oid$1), (default_1$3), (bytea)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    loUnlink(...args) {
        return sqlFunction("lo_unlink", [{ args: [(oid$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    makeaclitem(...args) {
        return sqlFunction("makeaclitem", [{ args: [(oid$1), (oid$1), (default_1$1), (default_1$8)], ret: (aclitem), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(oid$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    objDescription(...args) {
        return sqlFunction("obj_description", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (name$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    oideq(...args) {
        return sqlFunction("oideq", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidge(...args) {
        return sqlFunction("oidge", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidgt(...args) {
        return sqlFunction("oidgt", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidlarger(...args) {
        return sqlFunction("oidlarger", [{ args: [(oid$1), (oid$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    oidle(...args) {
        return sqlFunction("oidle", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidlt(...args) {
        return sqlFunction("oidlt", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidne(...args) {
        return sqlFunction("oidne", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidsmaller(...args) {
        return sqlFunction("oidsmaller", [{ args: [(oid$1), (oid$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgCollationActualVersion(...args) {
        return sqlFunction("pg_collation_actual_version", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgCollationIsVisible(...args) {
        return sqlFunction("pg_collation_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgConversionIsVisible(...args) {
        return sqlFunction("pg_conversion_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgDatabaseCollationActualVersion(...args) {
        return sqlFunction("pg_database_collation_actual_version", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgDatabaseSize(...args) {
        return sqlFunction("pg_database_size", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgDescribeObject(...args) {
        return sqlFunction("pg_describe_object", [{ args: [(oid$1), (oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgFilenodeRelation(...args) {
        return sqlFunction("pg_filenode_relation", [{ args: [(oid$1), (oid$1)], ret: (regclass$1), isOperator: false }], [this, ...args]);
    }
    pgFunctionIsVisible(...args) {
        return sqlFunction("pg_function_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgGetConstraintdef(...args) {
        return sqlFunction("pg_get_constraintdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetFunctionArgDefault(...args) {
        return sqlFunction("pg_get_function_arg_default", [{ args: [(oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetFunctionArguments(...args) {
        return sqlFunction("pg_get_function_arguments", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetFunctionIdentityArguments(...args) {
        return sqlFunction("pg_get_function_identity_arguments", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetFunctionResult(...args) {
        return sqlFunction("pg_get_function_result", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetFunctionSqlbody(...args) {
        return sqlFunction("pg_get_function_sqlbody", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetFunctiondef(...args) {
        return sqlFunction("pg_get_functiondef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetIndexdef(...args) {
        return sqlFunction("pg_get_indexdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$4), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetPartitionConstraintdef(...args) {
        return sqlFunction("pg_get_partition_constraintdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetPartkeydef(...args) {
        return sqlFunction("pg_get_partkeydef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetRuledef(...args) {
        return sqlFunction("pg_get_ruledef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetStatisticsobjdef(...args) {
        return sqlFunction("pg_get_statisticsobjdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetStatisticsobjdefColumns(...args) {
        return sqlFunction("pg_get_statisticsobjdef_columns", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetStatisticsobjdefExpressions(...args) {
        return sqlFunction("pg_get_statisticsobjdef_expressions", [{ args: [(oid$1)], ret: Array$1.of((default_1$1)), isOperator: false }], [this, ...args]);
    }
    pgGetTriggerdef(...args) {
        return sqlFunction("pg_get_triggerdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetUserbyid(...args) {
        return sqlFunction("pg_get_userbyid", [{ args: [(oid$1)], ret: (name$1), isOperator: false }], [this, ...args]);
    }
    pgGetViewdef(...args) {
        return sqlFunction("pg_get_viewdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgHasRole(...args) {
        return sqlFunction("pg_has_role", [{ args: [(oid$1), (name$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgIdentifyObject(...args) {
        return sqlFunction("pg_identify_object", [{ args: [(oid$1), (oid$1), (default_1$4)], ret: Record.of({ type: (default_1$1), schema: (default_1$1), name: (default_1$1), identity: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    pgIdentifyObjectAsAddress(...args) {
        return sqlFunction("pg_identify_object_as_address", [{ args: [(oid$1), (oid$1), (default_1$4)], ret: Record.of({ type: (default_1$1), object_names: Array$1.of((default_1$1)), object_args: Array$1.of((default_1$1)) }), isOperator: false }], [this, ...args]);
    }
    pgIndexamHasProperty(...args) {
        return sqlFunction("pg_indexam_has_property", [{ args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgIndexamProgressPhasename(...args) {
        return sqlFunction("pg_indexam_progress_phasename", [{ args: [(oid$1), (default_1$3)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgIsOtherTempSchema(...args) {
        return sqlFunction("pg_is_other_temp_schema", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLsTmpdir(...args) {
        return sqlFunction("pg_ls_tmpdir", [{ args: [(oid$1)], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], [this, ...args]);
    }
    pgOpclassIsVisible(...args) {
        return sqlFunction("pg_opclass_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgOperatorIsVisible(...args) {
        return sqlFunction("pg_operator_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgOpfamilyIsVisible(...args) {
        return sqlFunction("pg_opfamily_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgSequenceParameters(...args) {
        return sqlFunction("pg_sequence_parameters", [{ args: [(oid$1)], ret: Record.of({ start_value: (default_1$3), minimum_value: (default_1$3), maximum_value: (default_1$3), increment: (default_1$3), cycle_option: (default_1$8), cache_size: (default_1$3), data_type: (oid$1) }), isOperator: false }], [this, ...args]);
    }
    pgStatGetAnalyzeCount(...args) {
        return sqlFunction("pg_stat_get_analyze_count", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetAutoanalyzeCount(...args) {
        return sqlFunction("pg_stat_get_autoanalyze_count", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetAutovacuumCount(...args) {
        return sqlFunction("pg_stat_get_autovacuum_count", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetBlocksFetched(...args) {
        return sqlFunction("pg_stat_get_blocks_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetBlocksHit(...args) {
        return sqlFunction("pg_stat_get_blocks_hit", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbActiveTime(...args) {
        return sqlFunction("pg_stat_get_db_active_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbBlkReadTime(...args) {
        return sqlFunction("pg_stat_get_db_blk_read_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbBlkWriteTime(...args) {
        return sqlFunction("pg_stat_get_db_blk_write_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbBlocksFetched(...args) {
        return sqlFunction("pg_stat_get_db_blocks_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbBlocksHit(...args) {
        return sqlFunction("pg_stat_get_db_blocks_hit", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbChecksumFailures(...args) {
        return sqlFunction("pg_stat_get_db_checksum_failures", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbChecksumLastFailure(...args) {
        return sqlFunction("pg_stat_get_db_checksum_last_failure", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbConflictAll(...args) {
        return sqlFunction("pg_stat_get_db_conflict_all", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbConflictLock(...args) {
        return sqlFunction("pg_stat_get_db_conflict_lock", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbConflictLogicalslot(...args) {
        return sqlFunction("pg_stat_get_db_conflict_logicalslot", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbConflictSnapshot(...args) {
        return sqlFunction("pg_stat_get_db_conflict_snapshot", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbConflictStartupDeadlock(...args) {
        return sqlFunction("pg_stat_get_db_conflict_startup_deadlock", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbConflictTablespace(...args) {
        return sqlFunction("pg_stat_get_db_conflict_tablespace", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbDeadlocks(...args) {
        return sqlFunction("pg_stat_get_db_deadlocks", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbIdleInTransactionTime(...args) {
        return sqlFunction("pg_stat_get_db_idle_in_transaction_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbNumbackends(...args) {
        return sqlFunction("pg_stat_get_db_numbackends", [{ args: [(oid$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbSessionTime(...args) {
        return sqlFunction("pg_stat_get_db_session_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbSessions(...args) {
        return sqlFunction("pg_stat_get_db_sessions", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbSessionsAbandoned(...args) {
        return sqlFunction("pg_stat_get_db_sessions_abandoned", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbSessionsFatal(...args) {
        return sqlFunction("pg_stat_get_db_sessions_fatal", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbSessionsKilled(...args) {
        return sqlFunction("pg_stat_get_db_sessions_killed", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbStatResetTime(...args) {
        return sqlFunction("pg_stat_get_db_stat_reset_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbTempBytes(...args) {
        return sqlFunction("pg_stat_get_db_temp_bytes", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbTempFiles(...args) {
        return sqlFunction("pg_stat_get_db_temp_files", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbTuplesDeleted(...args) {
        return sqlFunction("pg_stat_get_db_tuples_deleted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbTuplesFetched(...args) {
        return sqlFunction("pg_stat_get_db_tuples_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbTuplesInserted(...args) {
        return sqlFunction("pg_stat_get_db_tuples_inserted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbTuplesReturned(...args) {
        return sqlFunction("pg_stat_get_db_tuples_returned", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbTuplesUpdated(...args) {
        return sqlFunction("pg_stat_get_db_tuples_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbXactCommit(...args) {
        return sqlFunction("pg_stat_get_db_xact_commit", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDbXactRollback(...args) {
        return sqlFunction("pg_stat_get_db_xact_rollback", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetDeadTuples(...args) {
        return sqlFunction("pg_stat_get_dead_tuples", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetFunctionCalls(...args) {
        return sqlFunction("pg_stat_get_function_calls", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetFunctionSelfTime(...args) {
        return sqlFunction("pg_stat_get_function_self_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetFunctionTotalTime(...args) {
        return sqlFunction("pg_stat_get_function_total_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetInsSinceVacuum(...args) {
        return sqlFunction("pg_stat_get_ins_since_vacuum", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetLastAnalyzeTime(...args) {
        return sqlFunction("pg_stat_get_last_analyze_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetLastAutoanalyzeTime(...args) {
        return sqlFunction("pg_stat_get_last_autoanalyze_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetLastAutovacuumTime(...args) {
        return sqlFunction("pg_stat_get_last_autovacuum_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetLastVacuumTime(...args) {
        return sqlFunction("pg_stat_get_last_vacuum_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetLastscan(...args) {
        return sqlFunction("pg_stat_get_lastscan", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    pgStatGetLiveTuples(...args) {
        return sqlFunction("pg_stat_get_live_tuples", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetModSinceAnalyze(...args) {
        return sqlFunction("pg_stat_get_mod_since_analyze", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetNumscans(...args) {
        return sqlFunction("pg_stat_get_numscans", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetSubscription(...args) {
        return sqlFunction("pg_stat_get_subscription", [{ args: [(oid$1)], ret: Setof.ofSchema({ subid: (oid$1), relid: (oid$1), pid: (default_1$4), leader_pid: (default_1$4), received_lsn: (pg_lsn), last_msg_send_time: (timestamptz$1), last_msg_receipt_time: (timestamptz$1), latest_end_lsn: (pg_lsn), latest_end_time: (timestamptz$1), worker_type: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    pgStatGetSubscriptionStats(...args) {
        return sqlFunction("pg_stat_get_subscription_stats", [{ args: [(oid$1)], ret: Record.of({ subid: (oid$1), apply_error_count: (default_1$3), sync_error_count: (default_1$3), stats_reset: (timestamptz$1) }), isOperator: false }], [this, ...args]);
    }
    pgStatGetTuplesDeleted(...args) {
        return sqlFunction("pg_stat_get_tuples_deleted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetTuplesFetched(...args) {
        return sqlFunction("pg_stat_get_tuples_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetTuplesHotUpdated(...args) {
        return sqlFunction("pg_stat_get_tuples_hot_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetTuplesInserted(...args) {
        return sqlFunction("pg_stat_get_tuples_inserted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetTuplesNewpageUpdated(...args) {
        return sqlFunction("pg_stat_get_tuples_newpage_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetTuplesReturned(...args) {
        return sqlFunction("pg_stat_get_tuples_returned", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetTuplesUpdated(...args) {
        return sqlFunction("pg_stat_get_tuples_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetVacuumCount(...args) {
        return sqlFunction("pg_stat_get_vacuum_count", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactBlocksFetched(...args) {
        return sqlFunction("pg_stat_get_xact_blocks_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactBlocksHit(...args) {
        return sqlFunction("pg_stat_get_xact_blocks_hit", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactFunctionCalls(...args) {
        return sqlFunction("pg_stat_get_xact_function_calls", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactFunctionSelfTime(...args) {
        return sqlFunction("pg_stat_get_xact_function_self_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactFunctionTotalTime(...args) {
        return sqlFunction("pg_stat_get_xact_function_total_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactNumscans(...args) {
        return sqlFunction("pg_stat_get_xact_numscans", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactTuplesDeleted(...args) {
        return sqlFunction("pg_stat_get_xact_tuples_deleted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactTuplesFetched(...args) {
        return sqlFunction("pg_stat_get_xact_tuples_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactTuplesHotUpdated(...args) {
        return sqlFunction("pg_stat_get_xact_tuples_hot_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactTuplesInserted(...args) {
        return sqlFunction("pg_stat_get_xact_tuples_inserted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactTuplesNewpageUpdated(...args) {
        return sqlFunction("pg_stat_get_xact_tuples_newpage_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactTuplesReturned(...args) {
        return sqlFunction("pg_stat_get_xact_tuples_returned", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatGetXactTuplesUpdated(...args) {
        return sqlFunction("pg_stat_get_xact_tuples_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgStatResetSingleFunctionCounters(...args) {
        return sqlFunction("pg_stat_reset_single_function_counters", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgStatResetSingleTableCounters(...args) {
        return sqlFunction("pg_stat_reset_single_table_counters", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgStatResetSubscriptionStats(...args) {
        return sqlFunction("pg_stat_reset_subscription_stats", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgStatisticsObjIsVisible(...args) {
        return sqlFunction("pg_statistics_obj_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTableIsVisible(...args) {
        return sqlFunction("pg_table_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTablespaceDatabases(...args) {
        return sqlFunction("pg_tablespace_databases", [{ args: [(oid$1)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    pgTablespaceLocation(...args) {
        return sqlFunction("pg_tablespace_location", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgTablespaceSize(...args) {
        return sqlFunction("pg_tablespace_size", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgTsConfigIsVisible(...args) {
        return sqlFunction("pg_ts_config_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTsDictIsVisible(...args) {
        return sqlFunction("pg_ts_dict_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTsParserIsVisible(...args) {
        return sqlFunction("pg_ts_parser_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTsTemplateIsVisible(...args) {
        return sqlFunction("pg_ts_template_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgTypeIsVisible(...args) {
        return sqlFunction("pg_type_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    plpgsqlValidator(...args) {
        return sqlFunction("plpgsql_validator", [{ args: [(oid$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    rowSecurityActive(...args) {
        return sqlFunction("row_security_active", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    satisfiesHashPartition(...args) {
        return sqlFunction("satisfies_hash_partition", [{ args: [(oid$1), (default_1$4), (default_1$4), (Any)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    shobjDescription(...args) {
        return sqlFunction("shobj_description", [{ args: [(oid$1), (name$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    tsParse(...args) {
        return sqlFunction("ts_parse", [{ args: [(oid$1), (default_1$1)], ret: Setof.ofSchema({ tokid: (default_1$4), token: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    tsTokenType(...args) {
        return sqlFunction("ts_token_type", [{ args: [(oid$1)], ret: Setof.ofSchema({ tokid: (default_1$4), alias: (default_1$1), description: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class oidvector extends Any {
    static new(v) { return new oidvector(v); }
    static parse(v) { return v; }
    static typeString() { return "oidvector"; }
    asAggregate() {
        return undefined;
    }
    btoidvectorcmp(...args) {
        return sqlFunction("btoidvectorcmp", [{ args: [(oidvector), (oidvector)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashoidvector(...args) {
        return sqlFunction("hashoidvector", [{ args: [(oidvector)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashoidvectorextended(...args) {
        return sqlFunction("hashoidvectorextended", [{ args: [(oidvector), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    oidvectoreq(...args) {
        return sqlFunction("oidvectoreq", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidvectorge(...args) {
        return sqlFunction("oidvectorge", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidvectorgt(...args) {
        return sqlFunction("oidvectorgt", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidvectorle(...args) {
        return sqlFunction("oidvectorle", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidvectorlt(...args) {
        return sqlFunction("oidvectorlt", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidvectorne(...args) {
        return sqlFunction("oidvectorne", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    oidvectortypes(...args) {
        return sqlFunction("oidvectortypes", [{ args: [(oidvector)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class path$1 extends Any {
    static new(v) { return new path$1(v); }
    static parse(v) { return v; }
    static typeString() { return "path"; }
    asAggregate() {
        return undefined;
    }
    area(...args) {
        return sqlFunction("area", [{ args: [(path$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distPathp(...args) {
        return sqlFunction("dist_pathp", [{ args: [(path$1), (point$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    isclosed(...args) {
        return sqlFunction("isclosed", [{ args: [(path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isopen(...args) {
        return sqlFunction("isopen", [{ args: [(path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    length(...args) {
        return sqlFunction("length", [{ args: [(path$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    npoints(...args) {
        return sqlFunction("npoints", [{ args: [(path$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pathAdd(...args) {
        return sqlFunction("path_add", [{ args: [(path$1), (path$1)], ret: (path$1), isOperator: false }], [this, ...args]);
    }
    pathAddPt(...args) {
        return sqlFunction("path_add_pt", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: false }], [this, ...args]);
    }
    pathContainPt(...args) {
        return sqlFunction("path_contain_pt", [{ args: [(path$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pathDistance(...args) {
        return sqlFunction("path_distance", [{ args: [(path$1), (path$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pathDivPt(...args) {
        return sqlFunction("path_div_pt", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: false }], [this, ...args]);
    }
    pathInter(...args) {
        return sqlFunction("path_inter", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pathLength(...args) {
        return sqlFunction("path_length", [{ args: [(path$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pathMulPt(...args) {
        return sqlFunction("path_mul_pt", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: false }], [this, ...args]);
    }
    pathNEq(...args) {
        return sqlFunction("path_n_eq", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pathNGe(...args) {
        return sqlFunction("path_n_ge", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pathNGt(...args) {
        return sqlFunction("path_n_gt", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pathNLe(...args) {
        return sqlFunction("path_n_le", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pathNLt(...args) {
        return sqlFunction("path_n_lt", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pathNpoints(...args) {
        return sqlFunction("path_npoints", [{ args: [(path$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pathSubPt(...args) {
        return sqlFunction("path_sub_pt", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: false }], [this, ...args]);
    }
    pclose(...args) {
        return sqlFunction("pclose", [{ args: [(path$1)], ret: (path$1), isOperator: false }], [this, ...args]);
    }
    polygon(...args) {
        return sqlFunction("polygon", [{ args: [(path$1)], ret: (polygon$1), isOperator: false }], [this, ...args]);
    }
    popen(...args) {
        return sqlFunction("popen", [{ args: [(path$1)], ret: (path$1), isOperator: false }], [this, ...args]);
    }
    ["<->"](...args) {
        return sqlFunction("<->", [{ args: [(path$1), (point$1)], ret: (default_1$6), isOperator: true }, { args: [(path$1), (path$1)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(path$1), (path$1)], ret: (path$1), isOperator: true }, { args: [(path$1), (point$1)], ret: (path$1), isOperator: true }], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [{ args: [(path$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: true }], [this, ...args]);
    }
    ["?#"](...args) {
        return sqlFunction("?#", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: true }], [this, ...args]);
    }
}

class pg_ddl_command extends Any {
    static new(v) { return new pg_ddl_command(v); }
    static parse(v) { return v; }
    static typeString() { return "pg_ddl_command"; }
    asAggregate() {
        return undefined;
    }
}

class pg_lsn extends Any {
    static new(v) { return new pg_lsn(v); }
    static parse(v) { return v; }
    static typeString() { return "pg_lsn"; }
    asAggregate() {
        return undefined;
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(pg_lsn)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgLsnCmp(...args) {
        return sqlFunction("pg_lsn_cmp", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgLsnEq(...args) {
        return sqlFunction("pg_lsn_eq", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLsnGe(...args) {
        return sqlFunction("pg_lsn_ge", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLsnGt(...args) {
        return sqlFunction("pg_lsn_gt", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLsnHash(...args) {
        return sqlFunction("pg_lsn_hash", [{ args: [(pg_lsn)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgLsnHashExtended(...args) {
        return sqlFunction("pg_lsn_hash_extended", [{ args: [(pg_lsn), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgLsnLarger(...args) {
        return sqlFunction("pg_lsn_larger", [{ args: [(pg_lsn), (pg_lsn)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgLsnLe(...args) {
        return sqlFunction("pg_lsn_le", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLsnLt(...args) {
        return sqlFunction("pg_lsn_lt", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLsnMi(...args) {
        return sqlFunction("pg_lsn_mi", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    pgLsnMii(...args) {
        return sqlFunction("pg_lsn_mii", [{ args: [(pg_lsn), (default_1$2)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgLsnNe(...args) {
        return sqlFunction("pg_lsn_ne", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLsnPli(...args) {
        return sqlFunction("pg_lsn_pli", [{ args: [(pg_lsn), (default_1$2)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgLsnSmaller(...args) {
        return sqlFunction("pg_lsn_smaller", [{ args: [(pg_lsn), (pg_lsn)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgReplicationOriginXactSetup(...args) {
        return sqlFunction("pg_replication_origin_xact_setup", [{ args: [(pg_lsn), (timestamptz$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgWalLsnDiff(...args) {
        return sqlFunction("pg_wal_lsn_diff", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    pgWalfileName(...args) {
        return sqlFunction("pg_walfile_name", [{ args: [(pg_lsn)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgWalfileNameOffset(...args) {
        return sqlFunction("pg_walfile_name_offset", [{ args: [(pg_lsn)], ret: Record.of({ file_name: (default_1$1), file_offset: (default_1$4) }), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$2), isOperator: true }, { args: [(pg_lsn), (default_1$2)], ret: (pg_lsn), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(pg_lsn), (default_1$2)], ret: (pg_lsn), isOperator: true }], [this, ...args]);
    }
}

class pg_mcv_list extends Any {
    static new(v) { return new pg_mcv_list(v); }
    static parse(v) { return v; }
    static typeString() { return "pg_mcv_list"; }
    asAggregate() {
        return undefined;
    }
    pgMcvListItems(...args) {
        return sqlFunction("pg_mcv_list_items", [{ args: [(pg_mcv_list)], ret: Setof.ofSchema({ index: (default_1$4), values: Array$1.of((default_1$1)), nulls: Array$1.of((default_1$8)), frequency: (default_1$6), base_frequency: (default_1$6) }), isOperator: false }], [this, ...args]);
    }
}

class pg_node_tree extends Any {
    static new(v) { return new pg_node_tree(v); }
    static parse(v) { return v; }
    static typeString() { return "pg_node_tree"; }
    asAggregate() {
        return undefined;
    }
    pgGetExpr(...args) {
        return sqlFunction("pg_get_expr", [{ args: [(pg_node_tree), (oid$1)], ret: (default_1$1), isOperator: false }, { args: [(pg_node_tree), (oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
}

class pg_snapshot extends Any {
    static new(v) { return new pg_snapshot(v); }
    static parse(v) { return v; }
    static typeString() { return "pg_snapshot"; }
    asAggregate() {
        return undefined;
    }
    pgSnapshotXip(...args) {
        return sqlFunction("pg_snapshot_xip", [{ args: [(pg_snapshot)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    pgSnapshotXmax(...args) {
        return sqlFunction("pg_snapshot_xmax", [{ args: [(pg_snapshot)], ret: (xid8), isOperator: false }], [this, ...args]);
    }
}

class point$1 extends Any {
    static new(v) { return new point$1(v); }
    static parse(v) { return v; }
    static typeString() { return "point"; }
    asAggregate() {
        return undefined;
    }
    box(...args) {
        return sqlFunction("box", [{ args: [(point$1)], ret: (box$1), isOperator: false }, { args: [(point$1), (point$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    circle(...args) {
        return sqlFunction("circle", [{ args: [(point$1), (default_1$6)], ret: (circle$1), isOperator: false }], [this, ...args]);
    }
    closePb(...args) {
        return sqlFunction("close_pb", [{ args: [(point$1), (box$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    closePl(...args) {
        return sqlFunction("close_pl", [{ args: [(point$1), (line$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    closePs(...args) {
        return sqlFunction("close_ps", [{ args: [(point$1), (lseg$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    distPb(...args) {
        return sqlFunction("dist_pb", [{ args: [(point$1), (box$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distPc(...args) {
        return sqlFunction("dist_pc", [{ args: [(point$1), (circle$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distPl(...args) {
        return sqlFunction("dist_pl", [{ args: [(point$1), (line$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distPpath(...args) {
        return sqlFunction("dist_ppath", [{ args: [(point$1), (path$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distPpoly(...args) {
        return sqlFunction("dist_ppoly", [{ args: [(point$1), (polygon$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distPs(...args) {
        return sqlFunction("dist_ps", [{ args: [(point$1), (lseg$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ishorizontal(...args) {
        return sqlFunction("ishorizontal", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isvertical(...args) {
        return sqlFunction("isvertical", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    line(...args) {
        return sqlFunction("line", [{ args: [(point$1), (point$1)], ret: (line$1), isOperator: false }], [this, ...args]);
    }
    lseg(...args) {
        return sqlFunction("lseg", [{ args: [(point$1), (point$1)], ret: (lseg$1), isOperator: false }], [this, ...args]);
    }
    onPb(...args) {
        return sqlFunction("on_pb", [{ args: [(point$1), (box$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    onPl(...args) {
        return sqlFunction("on_pl", [{ args: [(point$1), (line$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    onPpath(...args) {
        return sqlFunction("on_ppath", [{ args: [(point$1), (path$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    onPs(...args) {
        return sqlFunction("on_ps", [{ args: [(point$1), (lseg$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pointAbove(...args) {
        return sqlFunction("point_above", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }, { args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pointAdd(...args) {
        return sqlFunction("point_add", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    pointBelow(...args) {
        return sqlFunction("point_below", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }, { args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pointDistance(...args) {
        return sqlFunction("point_distance", [{ args: [(point$1), (point$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    pointDiv(...args) {
        return sqlFunction("point_div", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    pointEq(...args) {
        return sqlFunction("point_eq", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pointHoriz(...args) {
        return sqlFunction("point_horiz", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pointLeft(...args) {
        return sqlFunction("point_left", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pointMul(...args) {
        return sqlFunction("point_mul", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    pointNe(...args) {
        return sqlFunction("point_ne", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pointRight(...args) {
        return sqlFunction("point_right", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pointSub(...args) {
        return sqlFunction("point_sub", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    pointVert(...args) {
        return sqlFunction("point_vert", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ptContainedCircle(...args) {
        return sqlFunction("pt_contained_circle", [{ args: [(point$1), (circle$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ptContainedPoly(...args) {
        return sqlFunction("pt_contained_poly", [{ args: [(point$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    slope(...args) {
        return sqlFunction("slope", [{ args: [(point$1), (point$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ["##"](...args) {
        return sqlFunction("##", [{ args: [(point$1), (box$1)], ret: (point$1), isOperator: true }, { args: [(point$1), (line$1)], ret: (point$1), isOperator: true }, { args: [(point$1), (lseg$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["<->"](...args) {
        return sqlFunction("<->", [{ args: [(point$1), (box$1)], ret: (default_1$6), isOperator: true }, { args: [(point$1), (circle$1)], ret: (default_1$6), isOperator: true }, { args: [(point$1), (line$1)], ret: (default_1$6), isOperator: true }, { args: [(point$1), (path$1)], ret: (default_1$6), isOperator: true }, { args: [(point$1), (polygon$1)], ret: (default_1$6), isOperator: true }, { args: [(point$1), (lseg$1)], ret: (default_1$6), isOperator: true }, { args: [(point$1), (point$1)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    [">^"](...args) {
        return sqlFunction(">^", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["|>>"](...args) {
        return sqlFunction("|>>", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["<^"](...args) {
        return sqlFunction("<^", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<|"](...args) {
        return sqlFunction("<<|", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["/"](...args) {
        return sqlFunction("/", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["~="](...args) {
        return sqlFunction("~=", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["?-"](...args) {
        return sqlFunction("?-", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["*"](...args) {
        return sqlFunction("*", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: true }], [this, ...args]);
    }
    ["?|"](...args) {
        return sqlFunction("?|", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class polygon$1 extends Any {
    static new(v) { return new polygon$1(v); }
    static parse(v) { return v; }
    static typeString() { return "polygon"; }
    asAggregate() {
        return undefined;
    }
    box(...args) {
        return sqlFunction("box", [{ args: [(polygon$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    circle(...args) {
        return sqlFunction("circle", [{ args: [(polygon$1)], ret: (circle$1), isOperator: false }], [this, ...args]);
    }
    distPolyc(...args) {
        return sqlFunction("dist_polyc", [{ args: [(polygon$1), (circle$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    distPolyp(...args) {
        return sqlFunction("dist_polyp", [{ args: [(polygon$1), (point$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    npoints(...args) {
        return sqlFunction("npoints", [{ args: [(polygon$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    path(...args) {
        return sqlFunction("path", [{ args: [(polygon$1)], ret: (path$1), isOperator: false }], [this, ...args]);
    }
    point(...args) {
        return sqlFunction("point", [{ args: [(polygon$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    polyAbove(...args) {
        return sqlFunction("poly_above", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyBelow(...args) {
        return sqlFunction("poly_below", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyCenter(...args) {
        return sqlFunction("poly_center", [{ args: [(polygon$1)], ret: (point$1), isOperator: false }], [this, ...args]);
    }
    polyContainPt(...args) {
        return sqlFunction("poly_contain_pt", [{ args: [(polygon$1), (point$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyContained(...args) {
        return sqlFunction("poly_contained", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyDistance(...args) {
        return sqlFunction("poly_distance", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    polyLeft(...args) {
        return sqlFunction("poly_left", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyNpoints(...args) {
        return sqlFunction("poly_npoints", [{ args: [(polygon$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    polyOverabove(...args) {
        return sqlFunction("poly_overabove", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyOverbelow(...args) {
        return sqlFunction("poly_overbelow", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyOverlap(...args) {
        return sqlFunction("poly_overlap", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyOverleft(...args) {
        return sqlFunction("poly_overleft", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyOverright(...args) {
        return sqlFunction("poly_overright", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polyRight(...args) {
        return sqlFunction("poly_right", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    polySame(...args) {
        return sqlFunction("poly_same", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    spgPolyQuadCompress(...args) {
        return sqlFunction("spg_poly_quad_compress", [{ args: [(polygon$1)], ret: (box$1), isOperator: false }], [this, ...args]);
    }
    ["<->"](...args) {
        return sqlFunction("<->", [{ args: [(polygon$1), (circle$1)], ret: (default_1$6), isOperator: true }, { args: [(polygon$1), (point$1)], ret: (default_1$6), isOperator: true }, { args: [(polygon$1), (polygon$1)], ret: (default_1$6), isOperator: true }], [this, ...args]);
    }
    ["|>>"](...args) {
        return sqlFunction("|>>", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<|"](...args) {
        return sqlFunction("<<|", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [{ args: [(polygon$1), (point$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<<"](...args) {
        return sqlFunction("<<", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["|&>"](...args) {
        return sqlFunction("|&>", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&<|"](...args) {
        return sqlFunction("&<|", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&&"](...args) {
        return sqlFunction("&&", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&<"](...args) {
        return sqlFunction("&<", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&>"](...args) {
        return sqlFunction("&>", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">>"](...args) {
        return sqlFunction(">>", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~="](...args) {
        return sqlFunction("~=", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class PgRecord extends Any {
    static parse(v) { return v; }
    static typeString() { return "record"; }
    asAggregate() {
        return undefined;
    }
    btrecordcmp(...args) {
        return sqlFunction("btrecordcmp", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    btrecordimagecmp(...args) {
        return sqlFunction("btrecordimagecmp", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    hashRecord(...args) {
        return sqlFunction("hash_record", [({ R }) => ({ args: [Record.of(R)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    hashRecordExtended(...args) {
        return sqlFunction("hash_record_extended", [({ R }) => ({ args: [Record.of(R), (default_1$3)], ret: (default_1$3), isOperator: false })], [this, ...args]);
    }
    recordEq(...args) {
        return sqlFunction("record_eq", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordGe(...args) {
        return sqlFunction("record_ge", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordGt(...args) {
        return sqlFunction("record_gt", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordImageEq(...args) {
        return sqlFunction("record_image_eq", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordImageGe(...args) {
        return sqlFunction("record_image_ge", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordImageGt(...args) {
        return sqlFunction("record_image_gt", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordImageLe(...args) {
        return sqlFunction("record_image_le", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordImageLt(...args) {
        return sqlFunction("record_image_lt", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordImageNe(...args) {
        return sqlFunction("record_image_ne", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordLe(...args) {
        return sqlFunction("record_le", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordLt(...args) {
        return sqlFunction("record_lt", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    recordNe(...args) {
        return sqlFunction("record_ne", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    rowToJson(...args) {
        return sqlFunction("row_to_json", [({ R }) => ({ args: [Record.of(R)], ret: (json), isOperator: false }), ({ R }) => ({ args: [Record.of(R), (default_1$8)], ret: (json), isOperator: false })], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["*="](...args) {
        return sqlFunction("*=", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["*>="](...args) {
        return sqlFunction("*>=", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["*>"](...args) {
        return sqlFunction("*>", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["*<="](...args) {
        return sqlFunction("*<=", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["*<"](...args) {
        return sqlFunction("*<", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["*<>"](...args) {
        return sqlFunction("*<>", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
}

class refcursor extends Any {
    static new(v) { return new refcursor(v); }
    static parse(v) { return v; }
    static typeString() { return "refcursor"; }
    asAggregate() {
        return undefined;
    }
    cursorToXml(...args) {
        return sqlFunction("cursor_to_xml", [{ args: [(refcursor), (default_1$4), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    cursorToXmlschema(...args) {
        return sqlFunction("cursor_to_xmlschema", [{ args: [(refcursor), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
}

class regclass$1 extends Any {
    static new(v) { return new regclass$1(v); }
    static parse(v) { return v; }
    static typeString() { return "regclass"; }
    asAggregate() {
        return undefined;
    }
    brinDesummarizeRange(...args) {
        return sqlFunction("brin_desummarize_range", [{ args: [(regclass$1), (default_1$3)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    brinSummarizeNewValues(...args) {
        return sqlFunction("brin_summarize_new_values", [{ args: [(regclass$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    brinSummarizeRange(...args) {
        return sqlFunction("brin_summarize_range", [{ args: [(regclass$1), (default_1$3)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    currval(...args) {
        return sqlFunction("currval", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    ginCleanPendingList(...args) {
        return sqlFunction("gin_clean_pending_list", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    nextval(...args) {
        return sqlFunction("nextval", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgColumnIsUpdatable(...args) {
        return sqlFunction("pg_column_is_updatable", [{ args: [(regclass$1), (default_1$5), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgExtensionConfigDump(...args) {
        return sqlFunction("pg_extension_config_dump", [{ args: [(regclass$1), (default_1$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgGetReplicaIdentityIndex(...args) {
        return sqlFunction("pg_get_replica_identity_index", [{ args: [(regclass$1)], ret: (regclass$1), isOperator: false }], [this, ...args]);
    }
    pgIndexColumnHasProperty(...args) {
        return sqlFunction("pg_index_column_has_property", [{ args: [(regclass$1), (default_1$4), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgIndexHasProperty(...args) {
        return sqlFunction("pg_index_has_property", [{ args: [(regclass$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgIndexesSize(...args) {
        return sqlFunction("pg_indexes_size", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgNextoid(...args) {
        return sqlFunction("pg_nextoid", [{ args: [(regclass$1), (name$1), (regclass$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgPartitionAncestors(...args) {
        return sqlFunction("pg_partition_ancestors", [{ args: [(regclass$1)], ret: Setof.ofSchema({ relid: (regclass$1) }), isOperator: false }], [this, ...args]);
    }
    pgPartitionRoot(...args) {
        return sqlFunction("pg_partition_root", [{ args: [(regclass$1)], ret: (regclass$1), isOperator: false }], [this, ...args]);
    }
    pgPartitionTree(...args) {
        return sqlFunction("pg_partition_tree", [{ args: [(regclass$1)], ret: Setof.ofSchema({ relid: (regclass$1), parentrelid: (regclass$1), isleaf: (default_1$8), level: (default_1$4) }), isOperator: false }], [this, ...args]);
    }
    pgRelationFilenode(...args) {
        return sqlFunction("pg_relation_filenode", [{ args: [(regclass$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgRelationFilepath(...args) {
        return sqlFunction("pg_relation_filepath", [{ args: [(regclass$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgRelationIsPublishable(...args) {
        return sqlFunction("pg_relation_is_publishable", [{ args: [(regclass$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgRelationIsUpdatable(...args) {
        return sqlFunction("pg_relation_is_updatable", [{ args: [(regclass$1), (default_1$8)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgRelationSize(...args) {
        return sqlFunction("pg_relation_size", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }, { args: [(regclass$1), (default_1$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgSequenceLastValue(...args) {
        return sqlFunction("pg_sequence_last_value", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgTableSize(...args) {
        return sqlFunction("pg_table_size", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgTotalRelationSize(...args) {
        return sqlFunction("pg_total_relation_size", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    setval(...args) {
        return sqlFunction("setval", [{ args: [(regclass$1), (default_1$3)], ret: (default_1$3), isOperator: false }, { args: [(regclass$1), (default_1$3), (default_1$8)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    tableToXml(...args) {
        return sqlFunction("table_to_xml", [{ args: [(regclass$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    tableToXmlAndXmlschema(...args) {
        return sqlFunction("table_to_xml_and_xmlschema", [{ args: [(regclass$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    tableToXmlschema(...args) {
        return sqlFunction("table_to_xmlschema", [{ args: [(regclass$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
}

class regcollation extends Any {
    static new(v) { return new regcollation(v); }
    static parse(v) { return v; }
    static typeString() { return "regcollation"; }
    asAggregate() {
        return undefined;
    }
}

class regconfig extends Any {
    static new(v) { return new regconfig(v); }
    static parse(v) { return v; }
    static typeString() { return "regconfig"; }
    asAggregate() {
        return undefined;
    }
    jsonToTsvector(...args) {
        return sqlFunction("json_to_tsvector", [{ args: [(regconfig), (json), (jsonb)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    jsonbToTsvector(...args) {
        return sqlFunction("jsonb_to_tsvector", [{ args: [(regconfig), (jsonb), (jsonb)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    phrasetoTsquery(...args) {
        return sqlFunction("phraseto_tsquery", [{ args: [(regconfig), (default_1$1)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    plaintoTsquery(...args) {
        return sqlFunction("plainto_tsquery", [{ args: [(regconfig), (default_1$1)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    toTsquery(...args) {
        return sqlFunction("to_tsquery", [{ args: [(regconfig), (default_1$1)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    toTsvector(...args) {
        return sqlFunction("to_tsvector", [{ args: [(regconfig), (json)], ret: (tsvector), isOperator: false }, { args: [(regconfig), (jsonb)], ret: (tsvector), isOperator: false }, { args: [(regconfig), (default_1$1)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    tsDebug(...args) {
        return sqlFunction("ts_debug", [{ args: [(regconfig), (default_1$1)], ret: Setof.ofSchema({ alias: (default_1$1), description: (default_1$1), token: (default_1$1), dictionaries: Array$1.of((regdictionary)), dictionary: (regdictionary), lexemes: Array$1.of((default_1$1)) }), isOperator: false }], [this, ...args]);
    }
    tsHeadline(...args) {
        return sqlFunction("ts_headline", [{ args: [(regconfig), (json), (tsquery)], ret: (json), isOperator: false }, { args: [(regconfig), (json), (tsquery), (default_1$1)], ret: (json), isOperator: false }, { args: [(regconfig), (jsonb), (tsquery)], ret: (jsonb), isOperator: false }, { args: [(regconfig), (jsonb), (tsquery), (default_1$1)], ret: (jsonb), isOperator: false }, { args: [(regconfig), (default_1$1), (tsquery)], ret: (default_1$1), isOperator: false }, { args: [(regconfig), (default_1$1), (tsquery), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    websearchToTsquery(...args) {
        return sqlFunction("websearch_to_tsquery", [{ args: [(regconfig), (default_1$1)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
}

class regdictionary extends Any {
    static new(v) { return new regdictionary(v); }
    static parse(v) { return v; }
    static typeString() { return "regdictionary"; }
    asAggregate() {
        return undefined;
    }
    tsLexize(...args) {
        return sqlFunction("ts_lexize", [{ args: [(regdictionary), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], [this, ...args]);
    }
}

class regnamespace extends Any {
    static new(v) { return new regnamespace(v); }
    static parse(v) { return v; }
    static typeString() { return "regnamespace"; }
    asAggregate() {
        return undefined;
    }
    pgImportSystemCollations(...args) {
        return sqlFunction("pg_import_system_collations", [{ args: [(regnamespace)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
}

class regoper extends Any {
    static new(v) { return new regoper(v); }
    static parse(v) { return v; }
    static typeString() { return "regoper"; }
    asAggregate() {
        return undefined;
    }
}

class regoperator extends Any {
    static new(v) { return new regoperator(v); }
    static parse(v) { return v; }
    static typeString() { return "regoperator"; }
    asAggregate() {
        return undefined;
    }
}

class regproc extends Any {
    static new(v) { return new regproc(v); }
    static parse(v) { return v; }
    static typeString() { return "regproc"; }
    asAggregate() {
        return undefined;
    }
}

class regprocedure extends Any {
    static new(v) { return new regprocedure(v); }
    static parse(v) { return v; }
    static typeString() { return "regprocedure"; }
    asAggregate() {
        return undefined;
    }
}

class regrole extends Any {
    static new(v) { return new regrole(v); }
    static parse(v) { return v; }
    static typeString() { return "regrole"; }
    asAggregate() {
        return undefined;
    }
}

class regtype extends Any {
    static new(v) { return new regtype(v); }
    static parse(v) { return v; }
    static typeString() { return "regtype"; }
    asAggregate() {
        return undefined;
    }
    pgBasetype(...args) {
        return sqlFunction("pg_basetype", [{ args: [(regtype)], ret: (regtype), isOperator: false }], [this, ...args]);
    }
}

let default_1$1 = class default_1 extends Any {
    static new(v) { return new default_1$1(v); }
    static serializeParamTypes = undefined;
    static parse(v) { return typeMap["text"].parse(v); }
    static typeString() { return "text"; }
    asAggregate() {
        return undefined;
    }
    ascii(...args) {
        return sqlFunction("ascii", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeAddSubRelState(...args) {
        return sqlFunction("binary_upgrade_add_sub_rel_state", [{ args: [(default_1$1), (oid$1), (char$1), (pg_lsn)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeCreateEmptyExtension(...args) {
        return sqlFunction("binary_upgrade_create_empty_extension", [{ args: [(default_1$1), (default_1$1), (default_1$8), (default_1$1), Array$1.of((oid$1)), Array$1.of((default_1$1)), Array$1.of((default_1$1))], ret: (_void), isOperator: false }], [this, ...args]);
    }
    binaryUpgradeReploriginAdvance(...args) {
        return sqlFunction("binary_upgrade_replorigin_advance", [{ args: [(default_1$1), (pg_lsn)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    bitLength(...args) {
        return sqlFunction("bit_length", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    btrim(...args) {
        return sqlFunction("btrim", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    bttextPatternCmp(...args) {
        return sqlFunction("bttext_pattern_cmp", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    bttextcmp(...args) {
        return sqlFunction("bttextcmp", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    bttextnamecmp(...args) {
        return sqlFunction("bttextnamecmp", [{ args: [(default_1$1), (name$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    char(...args) {
        return sqlFunction("char", [{ args: [(default_1$1)], ret: (char$1), isOperator: false }], [this, ...args]);
    }
    charLength(...args) {
        return sqlFunction("char_length", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    characterLength(...args) {
        return sqlFunction("character_length", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    concatWs(...args) {
        return sqlFunction("concat_ws", [{ args: [(default_1$1), (Any)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    convertTo(...args) {
        return sqlFunction("convert_to", [{ args: [(default_1$1), (name$1)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    currentSetting(...args) {
        return sqlFunction("current_setting", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    currtid2(...args) {
        return sqlFunction("currtid2", [{ args: [(default_1$1), (tid)], ret: (tid), isOperator: false }], [this, ...args]);
    }
    datePart(...args) {
        return sqlFunction("date_part", [{ args: [(default_1$1), (date$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (interval$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (time$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (timestamp$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (timestamptz$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (timetz$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    dateTrunc(...args) {
        return sqlFunction("date_trunc", [{ args: [(default_1$1), (interval$1)], ret: (interval$1), isOperator: false }, { args: [(default_1$1), (timestamp$1)], ret: (timestamp$1), isOperator: false }, { args: [(default_1$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: false }, { args: [(default_1$1), (timestamptz$1), (default_1$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    decode(...args) {
        return sqlFunction("decode", [{ args: [(default_1$1), (default_1$1)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    extract(...args) {
        return sqlFunction("extract", [{ args: [(default_1$1), (date$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (interval$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (time$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (timestamp$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (timestamptz$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (timetz$1)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    format(...args) {
        return sqlFunction("format", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (Any)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    ginCmpTslexeme(...args) {
        return sqlFunction("gin_cmp_tslexeme", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    ginCompareJsonb(...args) {
        return sqlFunction("gin_compare_jsonb", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hasAnyColumnPrivilege(...args) {
        return sqlFunction("has_any_column_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasColumnPrivilege(...args) {
        return sqlFunction("has_column_privilege", [{ args: [(default_1$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasDatabasePrivilege(...args) {
        return sqlFunction("has_database_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasForeignDataWrapperPrivilege(...args) {
        return sqlFunction("has_foreign_data_wrapper_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasFunctionPrivilege(...args) {
        return sqlFunction("has_function_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasLanguagePrivilege(...args) {
        return sqlFunction("has_language_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasParameterPrivilege(...args) {
        return sqlFunction("has_parameter_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasSchemaPrivilege(...args) {
        return sqlFunction("has_schema_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasSequencePrivilege(...args) {
        return sqlFunction("has_sequence_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasServerPrivilege(...args) {
        return sqlFunction("has_server_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTablePrivilege(...args) {
        return sqlFunction("has_table_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTablespacePrivilege(...args) {
        return sqlFunction("has_tablespace_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hasTypePrivilege(...args) {
        return sqlFunction("has_type_privilege", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    hashtext(...args) {
        return sqlFunction("hashtext", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashtextextended(...args) {
        return sqlFunction("hashtextextended", [{ args: [(default_1$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    initcap(...args) {
        return sqlFunction("initcap", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    isNormalized(...args) {
        return sqlFunction("is_normalized", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    left(...args) {
        return sqlFunction("left", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    length(...args) {
        return sqlFunction("length", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    like(...args) {
        return sqlFunction("like", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    likeEscape(...args) {
        return sqlFunction("like_escape", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    loImport(...args) {
        return sqlFunction("lo_import", [{ args: [(default_1$1)], ret: (oid$1), isOperator: false }, { args: [(default_1$1), (oid$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    lower(...args) {
        return sqlFunction("lower", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    lpad(...args) {
        return sqlFunction("lpad", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    ltrim(...args) {
        return sqlFunction("ltrim", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    md5(...args) {
        return sqlFunction("md5", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    name(...args) {
        return sqlFunction("name", [{ args: [(default_1$1)], ret: (name$1), isOperator: false }], [this, ...args]);
    }
    normalize(...args) {
        return sqlFunction("normalize", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    notlike(...args) {
        return sqlFunction("notlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    octetLength(...args) {
        return sqlFunction("octet_length", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    overlay(...args) {
        return sqlFunction("overlay", [{ args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    parseIdent(...args) {
        return sqlFunction("parse_ident", [{ args: [(default_1$1), (default_1$8)], ret: Array$1.of((default_1$1)), isOperator: false }], [this, ...args]);
    }
    pgBackupStart(...args) {
        return sqlFunction("pg_backup_start", [{ args: [(default_1$1), (default_1$8)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgCreateRestorePoint(...args) {
        return sqlFunction("pg_create_restore_point", [{ args: [(default_1$1)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgCurrentLogfile(...args) {
        return sqlFunction("pg_current_logfile", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetObjectAddress(...args) {
        return sqlFunction("pg_get_object_address", [{ args: [(default_1$1), Array$1.of((default_1$1)), Array$1.of((default_1$1))], ret: Record.of({ classid: (oid$1), objid: (oid$1), objsubid: (default_1$4) }), isOperator: false }], [this, ...args]);
    }
    pgGetSerialSequence(...args) {
        return sqlFunction("pg_get_serial_sequence", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgGetViewdef(...args) {
        return sqlFunction("pg_get_viewdef", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgInputErrorInfo(...args) {
        return sqlFunction("pg_input_error_info", [{ args: [(default_1$1), (default_1$1)], ret: Record.of({ message: (default_1$1), detail: (default_1$1), hint: (default_1$1), sql_error_code: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    pgInputIsValid(...args) {
        return sqlFunction("pg_input_is_valid", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgLsDir(...args) {
        return sqlFunction("pg_ls_dir", [{ args: [(default_1$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$1), (default_1$8), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    pgLsReplslotdir(...args) {
        return sqlFunction("pg_ls_replslotdir", [{ args: [(default_1$1)], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], [this, ...args]);
    }
    pgNotify(...args) {
        return sqlFunction("pg_notify", [{ args: [(default_1$1), (default_1$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgReadBinaryFile(...args) {
        return sqlFunction("pg_read_binary_file", [{ args: [(default_1$1)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$3), (default_1$3)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$3), (default_1$3), (default_1$8)], ret: (bytea), isOperator: false }], [this, ...args]);
    }
    pgReadFile(...args) {
        return sqlFunction("pg_read_file", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$3), (default_1$3)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$3), (default_1$3), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    pgReplicationOriginAdvance(...args) {
        return sqlFunction("pg_replication_origin_advance", [{ args: [(default_1$1), (pg_lsn)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgReplicationOriginCreate(...args) {
        return sqlFunction("pg_replication_origin_create", [{ args: [(default_1$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgReplicationOriginDrop(...args) {
        return sqlFunction("pg_replication_origin_drop", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgReplicationOriginOid(...args) {
        return sqlFunction("pg_replication_origin_oid", [{ args: [(default_1$1)], ret: (oid$1), isOperator: false }], [this, ...args]);
    }
    pgReplicationOriginProgress(...args) {
        return sqlFunction("pg_replication_origin_progress", [{ args: [(default_1$1), (default_1$8)], ret: (pg_lsn), isOperator: false }], [this, ...args]);
    }
    pgReplicationOriginSessionSetup(...args) {
        return sqlFunction("pg_replication_origin_session_setup", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgSettingsGetFlags(...args) {
        return sqlFunction("pg_settings_get_flags", [{ args: [(default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], [this, ...args]);
    }
    pgSizeBytes(...args) {
        return sqlFunction("pg_size_bytes", [{ args: [(default_1$1)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    pgSplitWalfileName(...args) {
        return sqlFunction("pg_split_walfile_name", [{ args: [(default_1$1)], ret: Record.of({ segment_number: (default_1$2), timeline_id: (default_1$3) }), isOperator: false }], [this, ...args]);
    }
    pgStatFile(...args) {
        return sqlFunction("pg_stat_file", [{ args: [(default_1$1)], ret: Record.of({ size: (default_1$3), access: (timestamptz$1), modification: (timestamptz$1), change: (timestamptz$1), creation: (timestamptz$1), isdir: (default_1$8) }), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: Record.of({ size: (default_1$3), access: (timestamptz$1), modification: (timestamptz$1), change: (timestamptz$1), creation: (timestamptz$1), isdir: (default_1$8) }), isOperator: false }], [this, ...args]);
    }
    pgStatGetProgressInfo(...args) {
        return sqlFunction("pg_stat_get_progress_info", [{ args: [(default_1$1)], ret: Setof.ofSchema({ pid: (default_1$4), datid: (oid$1), relid: (oid$1), param1: (default_1$3), param2: (default_1$3), param3: (default_1$3), param4: (default_1$3), param5: (default_1$3), param6: (default_1$3), param7: (default_1$3), param8: (default_1$3), param9: (default_1$3), param10: (default_1$3), param11: (default_1$3), param12: (default_1$3), param13: (default_1$3), param14: (default_1$3), param15: (default_1$3), param16: (default_1$3), param17: (default_1$3), param18: (default_1$3), param19: (default_1$3), param20: (default_1$3) }), isOperator: false }], [this, ...args]);
    }
    pgStatGetReplicationSlot(...args) {
        return sqlFunction("pg_stat_get_replication_slot", [{ args: [(default_1$1)], ret: Record.of({ slot_name: (default_1$1), spill_txns: (default_1$3), spill_count: (default_1$3), spill_bytes: (default_1$3), stream_txns: (default_1$3), stream_count: (default_1$3), stream_bytes: (default_1$3), total_txns: (default_1$3), total_bytes: (default_1$3), stats_reset: (timestamptz$1) }), isOperator: false }], [this, ...args]);
    }
    pgStatHaveStats(...args) {
        return sqlFunction("pg_stat_have_stats", [{ args: [(default_1$1), (oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgStatResetReplicationSlot(...args) {
        return sqlFunction("pg_stat_reset_replication_slot", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgStatResetShared(...args) {
        return sqlFunction("pg_stat_reset_shared", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    pgStatResetSlru(...args) {
        return sqlFunction("pg_stat_reset_slru", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    phrasetoTsquery(...args) {
        return sqlFunction("phraseto_tsquery", [{ args: [(default_1$1)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    plaintoTsquery(...args) {
        return sqlFunction("plainto_tsquery", [{ args: [(default_1$1)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    position(...args) {
        return sqlFunction("position", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    queryToXml(...args) {
        return sqlFunction("query_to_xml", [{ args: [(default_1$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    queryToXmlAndXmlschema(...args) {
        return sqlFunction("query_to_xml_and_xmlschema", [{ args: [(default_1$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    queryToXmlschema(...args) {
        return sqlFunction("query_to_xmlschema", [{ args: [(default_1$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    quoteIdent(...args) {
        return sqlFunction("quote_ident", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    quoteLiteral(...args) {
        return sqlFunction("quote_literal", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    quoteNullable(...args) {
        return sqlFunction("quote_nullable", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    regclass(...args) {
        return sqlFunction("regclass", [{ args: [(default_1$1)], ret: (regclass$1), isOperator: false }], [this, ...args]);
    }
    regexpCount(...args) {
        return sqlFunction("regexp_count", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    regexpInstr(...args) {
        return sqlFunction("regexp_instr", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$4), (default_1$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$4), (default_1$1), (default_1$4)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    regexpLike(...args) {
        return sqlFunction("regexp_like", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    regexpMatch(...args) {
        return sqlFunction("regexp_match", [{ args: [(default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], [this, ...args]);
    }
    regexpMatches(...args) {
        return sqlFunction("regexp_matches", [{ args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    regexpReplace(...args) {
        return sqlFunction("regexp_replace", [{ args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    regexpSplitToArray(...args) {
        return sqlFunction("regexp_split_to_array", [{ args: [(default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], [this, ...args]);
    }
    regexpSplitToTable(...args) {
        return sqlFunction("regexp_split_to_table", [{ args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    regexpSubstr(...args) {
        return sqlFunction("regexp_substr", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    repeat(...args) {
        return sqlFunction("repeat", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    replace(...args) {
        return sqlFunction("replace", [{ args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    reverse(...args) {
        return sqlFunction("reverse", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    right(...args) {
        return sqlFunction("right", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    rowSecurityActive(...args) {
        return sqlFunction("row_security_active", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    rpad(...args) {
        return sqlFunction("rpad", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    rtrim(...args) {
        return sqlFunction("rtrim", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    setConfig(...args) {
        return sqlFunction("set_config", [{ args: [(default_1$1), (default_1$1), (default_1$8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    similarEscape(...args) {
        return sqlFunction("similar_escape", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    similarToEscape(...args) {
        return sqlFunction("similar_to_escape", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    splitPart(...args) {
        return sqlFunction("split_part", [{ args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    startsWith(...args) {
        return sqlFunction("starts_with", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    stringAgg(...args) {
        return sqlFunction("string_agg", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    stringToArray(...args) {
        return sqlFunction("string_to_array", [{ args: [(default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], [this, ...args]);
    }
    stringToTable(...args) {
        return sqlFunction("string_to_table", [{ args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    strpos(...args) {
        return sqlFunction("strpos", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    substr(...args) {
        return sqlFunction("substr", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    substring(...args) {
        return sqlFunction("substring", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    textGe(...args) {
        return sqlFunction("text_ge", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textGt(...args) {
        return sqlFunction("text_gt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textLarger(...args) {
        return sqlFunction("text_larger", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    textLe(...args) {
        return sqlFunction("text_le", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textLt(...args) {
        return sqlFunction("text_lt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textPatternGe(...args) {
        return sqlFunction("text_pattern_ge", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textPatternGt(...args) {
        return sqlFunction("text_pattern_gt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textPatternLe(...args) {
        return sqlFunction("text_pattern_le", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textPatternLt(...args) {
        return sqlFunction("text_pattern_lt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textSmaller(...args) {
        return sqlFunction("text_smaller", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    textanycat(...args) {
        return sqlFunction("textanycat", [({ T }) => ({ args: [(default_1$1), T], ret: (default_1$1), isOperator: false })], [this, ...args]);
    }
    textcat(...args) {
        return sqlFunction("textcat", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    texteq(...args) {
        return sqlFunction("texteq", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    texteqname(...args) {
        return sqlFunction("texteqname", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textgename(...args) {
        return sqlFunction("textgename", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textgtname(...args) {
        return sqlFunction("textgtname", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    texticlike(...args) {
        return sqlFunction("texticlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    texticnlike(...args) {
        return sqlFunction("texticnlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    texticregexeq(...args) {
        return sqlFunction("texticregexeq", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    texticregexne(...args) {
        return sqlFunction("texticregexne", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textlen(...args) {
        return sqlFunction("textlen", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    textlename(...args) {
        return sqlFunction("textlename", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textlike(...args) {
        return sqlFunction("textlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textltname(...args) {
        return sqlFunction("textltname", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textne(...args) {
        return sqlFunction("textne", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textnename(...args) {
        return sqlFunction("textnename", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textnlike(...args) {
        return sqlFunction("textnlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textregexeq(...args) {
        return sqlFunction("textregexeq", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    textregexne(...args) {
        return sqlFunction("textregexne", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timezone(...args) {
        return sqlFunction("timezone", [{ args: [(default_1$1), (timestamptz$1)], ret: (timestamp$1), isOperator: false }, { args: [(default_1$1), (timestamp$1)], ret: (timestamptz$1), isOperator: false }, { args: [(default_1$1), (timetz$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    toAscii(...args) {
        return sqlFunction("to_ascii", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (name$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    toDate(...args) {
        return sqlFunction("to_date", [{ args: [(default_1$1), (default_1$1)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    toNumber(...args) {
        return sqlFunction("to_number", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$2), isOperator: false }], [this, ...args]);
    }
    toRegclass(...args) {
        return sqlFunction("to_regclass", [{ args: [(default_1$1)], ret: (regclass$1), isOperator: false }], [this, ...args]);
    }
    toRegcollation(...args) {
        return sqlFunction("to_regcollation", [{ args: [(default_1$1)], ret: (regcollation), isOperator: false }], [this, ...args]);
    }
    toRegnamespace(...args) {
        return sqlFunction("to_regnamespace", [{ args: [(default_1$1)], ret: (regnamespace), isOperator: false }], [this, ...args]);
    }
    toRegoper(...args) {
        return sqlFunction("to_regoper", [{ args: [(default_1$1)], ret: (regoper), isOperator: false }], [this, ...args]);
    }
    toRegoperator(...args) {
        return sqlFunction("to_regoperator", [{ args: [(default_1$1)], ret: (regoperator), isOperator: false }], [this, ...args]);
    }
    toRegproc(...args) {
        return sqlFunction("to_regproc", [{ args: [(default_1$1)], ret: (regproc), isOperator: false }], [this, ...args]);
    }
    toRegprocedure(...args) {
        return sqlFunction("to_regprocedure", [{ args: [(default_1$1)], ret: (regprocedure), isOperator: false }], [this, ...args]);
    }
    toRegrole(...args) {
        return sqlFunction("to_regrole", [{ args: [(default_1$1)], ret: (regrole), isOperator: false }], [this, ...args]);
    }
    toRegtype(...args) {
        return sqlFunction("to_regtype", [{ args: [(default_1$1)], ret: (regtype), isOperator: false }], [this, ...args]);
    }
    toRegtypemod(...args) {
        return sqlFunction("to_regtypemod", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    toTimestamp(...args) {
        return sqlFunction("to_timestamp", [{ args: [(default_1$1), (default_1$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    toTsquery(...args) {
        return sqlFunction("to_tsquery", [{ args: [(default_1$1)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    toTsvector(...args) {
        return sqlFunction("to_tsvector", [{ args: [(default_1$1)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    translate(...args) {
        return sqlFunction("translate", [{ args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    tsDebug(...args) {
        return sqlFunction("ts_debug", [{ args: [(default_1$1)], ret: Setof.ofSchema({ alias: (default_1$1), description: (default_1$1), token: (default_1$1), dictionaries: Array$1.of((regdictionary)), dictionary: (regdictionary), lexemes: Array$1.of((default_1$1)) }), isOperator: false }], [this, ...args]);
    }
    tsHeadline(...args) {
        return sqlFunction("ts_headline", [{ args: [(default_1$1), (tsquery)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (tsquery), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    tsMatchTq(...args) {
        return sqlFunction("ts_match_tq", [{ args: [(default_1$1), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsMatchTt(...args) {
        return sqlFunction("ts_match_tt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsParse(...args) {
        return sqlFunction("ts_parse", [{ args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({ tokid: (default_1$4), token: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    tsStat(...args) {
        return sqlFunction("ts_stat", [{ args: [(default_1$1)], ret: Setof.ofSchema({ word: (default_1$1), ndoc: (default_1$4), nentry: (default_1$4) }), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({ word: (default_1$1), ndoc: (default_1$4), nentry: (default_1$4) }), isOperator: false }], [this, ...args]);
    }
    tsTokenType(...args) {
        return sqlFunction("ts_token_type", [{ args: [(default_1$1)], ret: Setof.ofSchema({ tokid: (default_1$4), alias: (default_1$1), description: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    unicodeAssigned(...args) {
        return sqlFunction("unicode_assigned", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    unistr(...args) {
        return sqlFunction("unistr", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    upper(...args) {
        return sqlFunction("upper", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    websearchToTsquery(...args) {
        return sqlFunction("websearch_to_tsquery", [{ args: [(default_1$1)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    xml(...args) {
        return sqlFunction("xml", [{ args: [(default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    xmlIsWellFormed(...args) {
        return sqlFunction("xml_is_well_formed", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xmlIsWellFormedContent(...args) {
        return sqlFunction("xml_is_well_formed_content", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xmlIsWellFormedDocument(...args) {
        return sqlFunction("xml_is_well_formed_document", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xmlcomment(...args) {
        return sqlFunction("xmlcomment", [{ args: [(default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    xmlexists(...args) {
        return sqlFunction("xmlexists", [{ args: [(default_1$1), (xml$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xmltext(...args) {
        return sqlFunction("xmltext", [{ args: [(default_1$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    xpath(...args) {
        return sqlFunction("xpath", [{ args: [(default_1$1), (xml$1)], ret: Array$1.of((xml$1)), isOperator: false }, { args: [(default_1$1), (xml$1), Array$1.of((default_1$1))], ret: Array$1.of((xml$1)), isOperator: false }], [this, ...args]);
    }
    xpathExists(...args) {
        return sqlFunction("xpath_exists", [{ args: [(default_1$1), (xml$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (xml$1), Array$1.of((default_1$1))], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["^@"](...args) {
        return sqlFunction("^@", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }, { args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }, { args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }, { args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }, { args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~>=~"](...args) {
        return sqlFunction("~>=~", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~>~"](...args) {
        return sqlFunction("~>~", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~<=~"](...args) {
        return sqlFunction("~<=~", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~<~"](...args) {
        return sqlFunction("~<~", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }, { args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~~*"](...args) {
        return sqlFunction("~~*", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~~*"](...args) {
        return sqlFunction("!~~*", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~*"](...args) {
        return sqlFunction("~*", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~*"](...args) {
        return sqlFunction("!~*", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~~"](...args) {
        return sqlFunction("~~", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }, { args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~~"](...args) {
        return sqlFunction("!~~", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["~"](...args) {
        return sqlFunction("~", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["!~"](...args) {
        return sqlFunction("!~", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@@"](...args) {
        return sqlFunction("@@", [{ args: [(default_1$1), (tsquery)], ret: (default_1$8), isOperator: true }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
};

class tid extends Any {
    static new(v) { return new tid(v); }
    static parse(v) { return v; }
    static typeString() { return "tid"; }
    asAggregate() {
        return undefined;
    }
    bttidcmp(...args) {
        return sqlFunction("bttidcmp", [{ args: [(tid), (tid)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashtid(...args) {
        return sqlFunction("hashtid", [{ args: [(tid)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    hashtidextended(...args) {
        return sqlFunction("hashtidextended", [{ args: [(tid), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(tid)], ret: (tid), isOperator: false }], [this, ...args]);
    }
    tideq(...args) {
        return sqlFunction("tideq", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tidge(...args) {
        return sqlFunction("tidge", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tidgt(...args) {
        return sqlFunction("tidgt", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tidlarger(...args) {
        return sqlFunction("tidlarger", [{ args: [(tid), (tid)], ret: (tid), isOperator: false }], [this, ...args]);
    }
    tidle(...args) {
        return sqlFunction("tidle", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tidlt(...args) {
        return sqlFunction("tidlt", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tidne(...args) {
        return sqlFunction("tidne", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tidsmaller(...args) {
        return sqlFunction("tidsmaller", [{ args: [(tid), (tid)], ret: (tid), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class time$1 extends Any {
    static new(v) { return new time$1(v); }
    static parse(v) { return v; }
    static typeString() { return "time"; }
    asAggregate() {
        return undefined;
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(time$1), (time$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    interval(...args) {
        return sqlFunction("interval", [{ args: [(time$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(time$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    overlaps(...args) {
        return sqlFunction("overlaps", [{ args: [(time$1), (interval$1), (time$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(time$1), (interval$1), (time$1), (time$1)], ret: (default_1$8), isOperator: false }, { args: [(time$1), (time$1), (time$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(time$1), (time$1), (time$1), (time$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    time(...args) {
        return sqlFunction("time", [{ args: [(time$1), (default_1$4)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timeCmp(...args) {
        return sqlFunction("time_cmp", [{ args: [(time$1), (time$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timeEq(...args) {
        return sqlFunction("time_eq", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timeGe(...args) {
        return sqlFunction("time_ge", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timeGt(...args) {
        return sqlFunction("time_gt", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timeHash(...args) {
        return sqlFunction("time_hash", [{ args: [(time$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timeHashExtended(...args) {
        return sqlFunction("time_hash_extended", [{ args: [(time$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    timeLarger(...args) {
        return sqlFunction("time_larger", [{ args: [(time$1), (time$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timeLe(...args) {
        return sqlFunction("time_le", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timeLt(...args) {
        return sqlFunction("time_lt", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timeMiInterval(...args) {
        return sqlFunction("time_mi_interval", [{ args: [(time$1), (interval$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timeMiTime(...args) {
        return sqlFunction("time_mi_time", [{ args: [(time$1), (time$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    timeNe(...args) {
        return sqlFunction("time_ne", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timePlInterval(...args) {
        return sqlFunction("time_pl_interval", [{ args: [(time$1), (interval$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timeSmaller(...args) {
        return sqlFunction("time_smaller", [{ args: [(time$1), (time$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timedatePl(...args) {
        return sqlFunction("timedate_pl", [{ args: [(time$1), (date$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    timetz(...args) {
        return sqlFunction("timetz", [{ args: [(time$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(time$1), (interval$1)], ret: (time$1), isOperator: true }, { args: [(time$1), (time$1)], ret: (interval$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(time$1), (interval$1)], ret: (time$1), isOperator: true }, { args: [(time$1), (date$1)], ret: (timestamp$1), isOperator: true }], [this, ...args]);
    }
}

class timestamp$1 extends Any {
    static new(v) { return new timestamp$1(v); }
    static parse(v) { return v; }
    static typeString() { return "timestamp"; }
    asAggregate() {
        return undefined;
    }
    age(...args) {
        return sqlFunction("age", [{ args: [(timestamp$1)], ret: (interval$1), isOperator: false }, { args: [(timestamp$1), (timestamp$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    date(...args) {
        return sqlFunction("date", [{ args: [(timestamp$1)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    generateSeries(...args) {
        return sqlFunction("generate_series", [{ args: [(timestamp$1), (timestamp$1), (interval$1)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(timestamp$1), (timestamp$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isfinite(...args) {
        return sqlFunction("isfinite", [{ args: [(timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(timestamp$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    overlaps(...args) {
        return sqlFunction("overlaps", [{ args: [(timestamp$1), (interval$1), (timestamp$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1), (interval$1), (timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1), (timestamp$1), (timestamp$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1), (timestamp$1), (timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    time(...args) {
        return sqlFunction("time", [{ args: [(timestamp$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timestamp(...args) {
        return sqlFunction("timestamp", [{ args: [(timestamp$1), (default_1$4)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    timestampCmp(...args) {
        return sqlFunction("timestamp_cmp", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timestampCmpDate(...args) {
        return sqlFunction("timestamp_cmp_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timestampCmpTimestamptz(...args) {
        return sqlFunction("timestamp_cmp_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timestampEq(...args) {
        return sqlFunction("timestamp_eq", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampEqDate(...args) {
        return sqlFunction("timestamp_eq_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampEqTimestamptz(...args) {
        return sqlFunction("timestamp_eq_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampGe(...args) {
        return sqlFunction("timestamp_ge", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampGeDate(...args) {
        return sqlFunction("timestamp_ge_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampGeTimestamptz(...args) {
        return sqlFunction("timestamp_ge_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampGt(...args) {
        return sqlFunction("timestamp_gt", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampGtDate(...args) {
        return sqlFunction("timestamp_gt_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampGtTimestamptz(...args) {
        return sqlFunction("timestamp_gt_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampHash(...args) {
        return sqlFunction("timestamp_hash", [{ args: [(timestamp$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timestampHashExtended(...args) {
        return sqlFunction("timestamp_hash_extended", [{ args: [(timestamp$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    timestampLarger(...args) {
        return sqlFunction("timestamp_larger", [{ args: [(timestamp$1), (timestamp$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    timestampLe(...args) {
        return sqlFunction("timestamp_le", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampLeDate(...args) {
        return sqlFunction("timestamp_le_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampLeTimestamptz(...args) {
        return sqlFunction("timestamp_le_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampLt(...args) {
        return sqlFunction("timestamp_lt", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampLtDate(...args) {
        return sqlFunction("timestamp_lt_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampLtTimestamptz(...args) {
        return sqlFunction("timestamp_lt_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampMi(...args) {
        return sqlFunction("timestamp_mi", [{ args: [(timestamp$1), (timestamp$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    timestampMiInterval(...args) {
        return sqlFunction("timestamp_mi_interval", [{ args: [(timestamp$1), (interval$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    timestampNe(...args) {
        return sqlFunction("timestamp_ne", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampNeDate(...args) {
        return sqlFunction("timestamp_ne_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampNeTimestamptz(...args) {
        return sqlFunction("timestamp_ne_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestampPlInterval(...args) {
        return sqlFunction("timestamp_pl_interval", [{ args: [(timestamp$1), (interval$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    timestampSmaller(...args) {
        return sqlFunction("timestamp_smaller", [{ args: [(timestamp$1), (timestamp$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    timestamptz(...args) {
        return sqlFunction("timestamptz", [{ args: [(timestamp$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    timezone(...args) {
        return sqlFunction("timezone", [{ args: [(timestamp$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    toChar(...args) {
        return sqlFunction("to_char", [{ args: [(timestamp$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    tsrange(...args) {
        return sqlFunction("tsrange", [{ args: [(timestamp$1), (timestamp$1)], ret: (tsrange$1), isOperator: false }, { args: [(timestamp$1), (timestamp$1), (default_1$1)], ret: (tsrange$1), isOperator: false }], [this, ...args]);
    }
    tsrangeSubdiff(...args) {
        return sqlFunction("tsrange_subdiff", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(timestamp$1), (timestamp$1)], ret: (interval$1), isOperator: true }, { args: [(timestamp$1), (interval$1)], ret: (timestamp$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(timestamp$1), (interval$1)], ret: (timestamp$1), isOperator: true }], [this, ...args]);
    }
}

class timestamptz$1 extends Any {
    static new(v) { return new timestamptz$1(v); }
    static parse(v) { return v; }
    static typeString() { return "timestamptz"; }
    asAggregate() {
        return undefined;
    }
    age(...args) {
        return sqlFunction("age", [{ args: [(timestamptz$1)], ret: (interval$1), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    date(...args) {
        return sqlFunction("date", [{ args: [(timestamptz$1)], ret: (date$1), isOperator: false }], [this, ...args]);
    }
    dateAdd(...args) {
        return sqlFunction("date_add", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: false }, { args: [(timestamptz$1), (interval$1), (default_1$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    dateSubtract(...args) {
        return sqlFunction("date_subtract", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: false }, { args: [(timestamptz$1), (interval$1), (default_1$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    generateSeries(...args) {
        return sqlFunction("generate_series", [{ args: [(timestamptz$1), (timestamptz$1), (interval$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (interval$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(timestamptz$1), (timestamptz$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    isfinite(...args) {
        return sqlFunction("isfinite", [{ args: [(timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(timestamptz$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    overlaps(...args) {
        return sqlFunction("overlaps", [{ args: [(timestamptz$1), (interval$1), (timestamptz$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1), (interval$1), (timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (timestamptz$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgSleepUntil(...args) {
        return sqlFunction("pg_sleep_until", [{ args: [(timestamptz$1)], ret: (_void), isOperator: false }], [this, ...args]);
    }
    time(...args) {
        return sqlFunction("time", [{ args: [(timestamptz$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timestamp(...args) {
        return sqlFunction("timestamp", [{ args: [(timestamptz$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    timestamptz(...args) {
        return sqlFunction("timestamptz", [{ args: [(timestamptz$1), (default_1$4)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    timestamptzCmp(...args) {
        return sqlFunction("timestamptz_cmp", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timestamptzCmpDate(...args) {
        return sqlFunction("timestamptz_cmp_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timestamptzCmpTimestamp(...args) {
        return sqlFunction("timestamptz_cmp_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timestamptzEq(...args) {
        return sqlFunction("timestamptz_eq", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzEqDate(...args) {
        return sqlFunction("timestamptz_eq_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzEqTimestamp(...args) {
        return sqlFunction("timestamptz_eq_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzGe(...args) {
        return sqlFunction("timestamptz_ge", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzGeDate(...args) {
        return sqlFunction("timestamptz_ge_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzGeTimestamp(...args) {
        return sqlFunction("timestamptz_ge_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzGt(...args) {
        return sqlFunction("timestamptz_gt", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzGtDate(...args) {
        return sqlFunction("timestamptz_gt_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzGtTimestamp(...args) {
        return sqlFunction("timestamptz_gt_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzLarger(...args) {
        return sqlFunction("timestamptz_larger", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    timestamptzLe(...args) {
        return sqlFunction("timestamptz_le", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzLeDate(...args) {
        return sqlFunction("timestamptz_le_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzLeTimestamp(...args) {
        return sqlFunction("timestamptz_le_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzLt(...args) {
        return sqlFunction("timestamptz_lt", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzLtDate(...args) {
        return sqlFunction("timestamptz_lt_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzLtTimestamp(...args) {
        return sqlFunction("timestamptz_lt_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzMi(...args) {
        return sqlFunction("timestamptz_mi", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (interval$1), isOperator: false }], [this, ...args]);
    }
    timestamptzMiInterval(...args) {
        return sqlFunction("timestamptz_mi_interval", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    timestamptzNe(...args) {
        return sqlFunction("timestamptz_ne", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzNeDate(...args) {
        return sqlFunction("timestamptz_ne_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzNeTimestamp(...args) {
        return sqlFunction("timestamptz_ne_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timestamptzPlInterval(...args) {
        return sqlFunction("timestamptz_pl_interval", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    timestamptzSmaller(...args) {
        return sqlFunction("timestamptz_smaller", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    timetz(...args) {
        return sqlFunction("timetz", [{ args: [(timestamptz$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    timezone(...args) {
        return sqlFunction("timezone", [{ args: [(timestamptz$1)], ret: (timestamp$1), isOperator: false }], [this, ...args]);
    }
    toChar(...args) {
        return sqlFunction("to_char", [{ args: [(timestamptz$1), (default_1$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    tstzrange(...args) {
        return sqlFunction("tstzrange", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (tstzrange$1), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (default_1$1)], ret: (tstzrange$1), isOperator: false }], [this, ...args]);
    }
    tstzrangeSubdiff(...args) {
        return sqlFunction("tstzrange_subdiff", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$6), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (interval$1), isOperator: true }, { args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: true }, { args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: true }], [this, ...args]);
    }
}

class timetz$1 extends Any {
    static new(v) { return new timetz$1(v); }
    static parse(v) { return v; }
    static typeString() { return "timetz"; }
    asAggregate() {
        return undefined;
    }
    inRange(...args) {
        return sqlFunction("in_range", [{ args: [(timetz$1), (timetz$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(timetz$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    overlaps(...args) {
        return sqlFunction("overlaps", [{ args: [(timetz$1), (timetz$1), (timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    time(...args) {
        return sqlFunction("time", [{ args: [(timetz$1)], ret: (time$1), isOperator: false }], [this, ...args]);
    }
    timetz(...args) {
        return sqlFunction("timetz", [{ args: [(timetz$1), (default_1$4)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    timetzCmp(...args) {
        return sqlFunction("timetz_cmp", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timetzEq(...args) {
        return sqlFunction("timetz_eq", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timetzGe(...args) {
        return sqlFunction("timetz_ge", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timetzGt(...args) {
        return sqlFunction("timetz_gt", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timetzHash(...args) {
        return sqlFunction("timetz_hash", [{ args: [(timetz$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    timetzHashExtended(...args) {
        return sqlFunction("timetz_hash_extended", [{ args: [(timetz$1), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    timetzLarger(...args) {
        return sqlFunction("timetz_larger", [{ args: [(timetz$1), (timetz$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    timetzLe(...args) {
        return sqlFunction("timetz_le", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timetzLt(...args) {
        return sqlFunction("timetz_lt", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timetzMiInterval(...args) {
        return sqlFunction("timetz_mi_interval", [{ args: [(timetz$1), (interval$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    timetzNe(...args) {
        return sqlFunction("timetz_ne", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    timetzPlInterval(...args) {
        return sqlFunction("timetz_pl_interval", [{ args: [(timetz$1), (interval$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    timetzSmaller(...args) {
        return sqlFunction("timetz_smaller", [{ args: [(timetz$1), (timetz$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    timetzdatePl(...args) {
        return sqlFunction("timetzdate_pl", [{ args: [(timetz$1), (date$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    timezone(...args) {
        return sqlFunction("timezone", [{ args: [(timetz$1)], ret: (timetz$1), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["-"](...args) {
        return sqlFunction("-", [{ args: [(timetz$1), (interval$1)], ret: (timetz$1), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["+"](...args) {
        return sqlFunction("+", [{ args: [(timetz$1), (interval$1)], ret: (timetz$1), isOperator: true }, { args: [(timetz$1), (date$1)], ret: (timestamptz$1), isOperator: true }], [this, ...args]);
    }
}

class trigger extends Any {
    static new(v) { return new trigger(v); }
    static parse(v) { return v; }
    static typeString() { return "trigger"; }
    asAggregate() {
        return undefined;
    }
}

class tsmultirange$1 extends Any {
    static new(v) { return new tsmultirange$1(v); }
    static parse(v) { return v; }
    static typeString() { return "tsmultirange"; }
    asAggregate() {
        return undefined;
    }
}

class tsquery extends Any {
    static new(v) { return new tsquery(v); }
    static parse(v) { return v; }
    static typeString() { return "tsquery"; }
    asAggregate() {
        return undefined;
    }
    numnode(...args) {
        return sqlFunction("numnode", [{ args: [(tsquery)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    querytree(...args) {
        return sqlFunction("querytree", [{ args: [(tsquery)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    tsMatchQv(...args) {
        return sqlFunction("ts_match_qv", [{ args: [(tsquery), (tsvector)], ret: (default_1$8), isOperator: false }, { args: [(tsquery), (tsvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsRewrite(...args) {
        return sqlFunction("ts_rewrite", [{ args: [(tsquery), (default_1$1)], ret: (tsquery), isOperator: false }, { args: [(tsquery), (tsquery), (tsquery)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    tsqMcontained(...args) {
        return sqlFunction("tsq_mcontained", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsqMcontains(...args) {
        return sqlFunction("tsq_mcontains", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsqueryAnd(...args) {
        return sqlFunction("tsquery_and", [{ args: [(tsquery), (tsquery)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    tsqueryCmp(...args) {
        return sqlFunction("tsquery_cmp", [{ args: [(tsquery), (tsquery)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    tsqueryEq(...args) {
        return sqlFunction("tsquery_eq", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsqueryGe(...args) {
        return sqlFunction("tsquery_ge", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsqueryGt(...args) {
        return sqlFunction("tsquery_gt", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsqueryLe(...args) {
        return sqlFunction("tsquery_le", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsqueryLt(...args) {
        return sqlFunction("tsquery_lt", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsqueryNe(...args) {
        return sqlFunction("tsquery_ne", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsqueryNot(...args) {
        return sqlFunction("tsquery_not", [{ args: [(tsquery)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    tsqueryOr(...args) {
        return sqlFunction("tsquery_or", [{ args: [(tsquery), (tsquery)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    tsqueryPhrase(...args) {
        return sqlFunction("tsquery_phrase", [{ args: [(tsquery), (tsquery)], ret: (tsquery), isOperator: false }, { args: [(tsquery), (tsquery), (default_1$4)], ret: (tsquery), isOperator: false }], [this, ...args]);
    }
    ["@@"](...args) {
        return sqlFunction("@@", [{ args: [(tsquery), (tsvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@@@"](...args) {
        return sqlFunction("@@@", [{ args: [(tsquery), (tsvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["&&"](...args) {
        return sqlFunction("&&", [{ args: [(tsquery), (tsquery)], ret: (tsquery), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<->"](...args) {
        return sqlFunction("<->", [{ args: [(tsquery), (tsquery)], ret: (tsquery), isOperator: true }], [this, ...args]);
    }
}

class tsrange$1 extends Any {
    static new(v) { return new tsrange$1(v); }
    static parse(v) { return v; }
    static typeString() { return "tsrange"; }
    asAggregate() {
        return undefined;
    }
    tsmultirange(...args) {
        return sqlFunction("tsmultirange", [{ args: [(tsrange$1)], ret: (tsmultirange$1), isOperator: false }], [this, ...args]);
    }
}

class tstzmultirange$1 extends Any {
    static new(v) { return new tstzmultirange$1(v); }
    static parse(v) { return v; }
    static typeString() { return "tstzmultirange"; }
    asAggregate() {
        return undefined;
    }
}

class tstzrange$1 extends Any {
    static new(v) { return new tstzrange$1(v); }
    static parse(v) { return v; }
    static typeString() { return "tstzrange"; }
    asAggregate() {
        return undefined;
    }
    tstzmultirange(...args) {
        return sqlFunction("tstzmultirange", [{ args: [(tstzrange$1)], ret: (tstzmultirange$1), isOperator: false }], [this, ...args]);
    }
}

class tsvector extends Any {
    static new(v) { return new tsvector(v); }
    static parse(v) { return v; }
    static typeString() { return "tsvector"; }
    asAggregate() {
        return undefined;
    }
    length(...args) {
        return sqlFunction("length", [{ args: [(tsvector)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    setweight(...args) {
        return sqlFunction("setweight", [{ args: [(tsvector), (char$1)], ret: (tsvector), isOperator: false }, { args: [(tsvector), (char$1), Array$1.of((default_1$1))], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    strip(...args) {
        return sqlFunction("strip", [{ args: [(tsvector)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    tsDelete(...args) {
        return sqlFunction("ts_delete", [{ args: [(tsvector), Array$1.of((default_1$1))], ret: (tsvector), isOperator: false }, { args: [(tsvector), (default_1$1)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    tsFilter(...args) {
        return sqlFunction("ts_filter", [{ args: [(tsvector), Array$1.of((char$1))], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    tsMatchVq(...args) {
        return sqlFunction("ts_match_vq", [{ args: [(tsvector), (tsquery)], ret: (default_1$8), isOperator: false }, { args: [(tsvector), (tsquery)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsRank(...args) {
        return sqlFunction("ts_rank", [{ args: [(tsvector), (tsquery)], ret: (default_1$7), isOperator: false }, { args: [(tsvector), (tsquery), (default_1$4)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    tsRankCd(...args) {
        return sqlFunction("ts_rank_cd", [{ args: [(tsvector), (tsquery)], ret: (default_1$7), isOperator: false }, { args: [(tsvector), (tsquery), (default_1$4)], ret: (default_1$7), isOperator: false }], [this, ...args]);
    }
    tsvectorCmp(...args) {
        return sqlFunction("tsvector_cmp", [{ args: [(tsvector), (tsvector)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    tsvectorConcat(...args) {
        return sqlFunction("tsvector_concat", [{ args: [(tsvector), (tsvector)], ret: (tsvector), isOperator: false }], [this, ...args]);
    }
    tsvectorEq(...args) {
        return sqlFunction("tsvector_eq", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsvectorGe(...args) {
        return sqlFunction("tsvector_ge", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsvectorGt(...args) {
        return sqlFunction("tsvector_gt", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsvectorLe(...args) {
        return sqlFunction("tsvector_le", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsvectorLt(...args) {
        return sqlFunction("tsvector_lt", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsvectorNe(...args) {
        return sqlFunction("tsvector_ne", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    tsvectorToArray(...args) {
        return sqlFunction("tsvector_to_array", [{ args: [(tsvector)], ret: Array$1.of((default_1$1)), isOperator: false }], [this, ...args]);
    }
    unnest(...args) {
        return sqlFunction("unnest", [{ args: [(tsvector)], ret: Setof.ofSchema({ lexeme: (default_1$1), positions: Array$1.of((default_1$5)), weights: Array$1.of((default_1$1)) }), isOperator: false }], [this, ...args]);
    }
    ["@@@"](...args) {
        return sqlFunction("@@@", [{ args: [(tsvector), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["@@"](...args) {
        return sqlFunction("@@", [{ args: [(tsvector), (tsquery)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class txid_snapshot extends Any {
    static new(v) { return new txid_snapshot(v); }
    static parse(v) { return v; }
    static typeString() { return "txid_snapshot"; }
    asAggregate() {
        return undefined;
    }
    txidSnapshotXip(...args) {
        return sqlFunction("txid_snapshot_xip", [{ args: [(txid_snapshot)], ret: Setof.ofSchema({}), isOperator: false }], [this, ...args]);
    }
    txidSnapshotXmax(...args) {
        return sqlFunction("txid_snapshot_xmax", [{ args: [(txid_snapshot)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
}

class uuid extends Any {
    static new(v) { return new uuid(v); }
    static parse(v) { return v; }
    static typeString() { return "uuid"; }
    asAggregate() {
        return undefined;
    }
    uuidCmp(...args) {
        return sqlFunction("uuid_cmp", [{ args: [(uuid), (uuid)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    uuidEq(...args) {
        return sqlFunction("uuid_eq", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    uuidExtractTimestamp(...args) {
        return sqlFunction("uuid_extract_timestamp", [{ args: [(uuid)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    uuidExtractVersion(...args) {
        return sqlFunction("uuid_extract_version", [{ args: [(uuid)], ret: (default_1$5), isOperator: false }], [this, ...args]);
    }
    uuidGe(...args) {
        return sqlFunction("uuid_ge", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    uuidGt(...args) {
        return sqlFunction("uuid_gt", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    uuidHash(...args) {
        return sqlFunction("uuid_hash", [{ args: [(uuid)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    uuidHashExtended(...args) {
        return sqlFunction("uuid_hash_extended", [{ args: [(uuid), (default_1$3)], ret: (default_1$3), isOperator: false }], [this, ...args]);
    }
    uuidLe(...args) {
        return sqlFunction("uuid_le", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    uuidLt(...args) {
        return sqlFunction("uuid_lt", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    uuidNe(...args) {
        return sqlFunction("uuid_ne", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class varbit$1 extends Any {
    static new(v) { return new varbit$1(v); }
    static parse(v) { return v; }
    static typeString() { return "varbit"; }
    asAggregate() {
        return undefined;
    }
    bitcat(...args) {
        return sqlFunction("bitcat", [{ args: [(varbit$1), (varbit$1)], ret: (varbit$1), isOperator: false }], [this, ...args]);
    }
    varbit(...args) {
        return sqlFunction("varbit", [{ args: [(varbit$1), (default_1$4), (default_1$8)], ret: (varbit$1), isOperator: false }], [this, ...args]);
    }
    varbitcmp(...args) {
        return sqlFunction("varbitcmp", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    varbiteq(...args) {
        return sqlFunction("varbiteq", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    varbitge(...args) {
        return sqlFunction("varbitge", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    varbitgt(...args) {
        return sqlFunction("varbitgt", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    varbitle(...args) {
        return sqlFunction("varbitle", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    varbitlt(...args) {
        return sqlFunction("varbitlt", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    varbitne(...args) {
        return sqlFunction("varbitne", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class varchar$1 extends Any {
    static new(v) { return new varchar$1(v); }
    static parse(v) { return v; }
    static typeString() { return "varchar"; }
    asAggregate() {
        return undefined;
    }
    name(...args) {
        return sqlFunction("name", [{ args: [(varchar$1)], ret: (name$1), isOperator: false }], [this, ...args]);
    }
    varchar(...args) {
        return sqlFunction("varchar", [{ args: [(varchar$1), (default_1$4), (default_1$8)], ret: (varchar$1), isOperator: false }], [this, ...args]);
    }
}

class _void extends Any {
    static new(v) { return new _void(v); }
    static parse(v) { return v; }
    static typeString() { return "void"; }
    asAggregate() {
        return undefined;
    }
}

class xid$1 extends Any {
    static new(v) { return new xid$1(v); }
    static parse(v) { return v; }
    static typeString() { return "xid"; }
    asAggregate() {
        return undefined;
    }
    age(...args) {
        return sqlFunction("age", [{ args: [(xid$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    mxidAge(...args) {
        return sqlFunction("mxid_age", [{ args: [(xid$1)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    pgGetMultixactMembers(...args) {
        return sqlFunction("pg_get_multixact_members", [{ args: [(xid$1)], ret: Setof.ofSchema({ xid: (xid$1), mode: (default_1$1) }), isOperator: false }], [this, ...args]);
    }
    pgXactCommitTimestamp(...args) {
        return sqlFunction("pg_xact_commit_timestamp", [{ args: [(xid$1)], ret: (timestamptz$1), isOperator: false }], [this, ...args]);
    }
    xideq(...args) {
        return sqlFunction("xideq", [{ args: [(xid$1), (xid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xideqint4(...args) {
        return sqlFunction("xideqint4", [{ args: [(xid$1), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xidneq(...args) {
        return sqlFunction("xidneq", [{ args: [(xid$1), (xid$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xidneqint4(...args) {
        return sqlFunction("xidneqint4", [{ args: [(xid$1), (default_1$4)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(xid$1), (xid$1)], ret: (default_1$8), isOperator: true }, { args: [(xid$1), (default_1$4)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(xid$1), (xid$1)], ret: (default_1$8), isOperator: true }, { args: [(xid$1), (default_1$4)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class xid8 extends Any {
    static new(v) { return new xid8(v); }
    static parse(v) { return v; }
    static typeString() { return "xid8"; }
    asAggregate() {
        return undefined;
    }
    max(...args) {
        return sqlFunction("max", [{ args: [(xid8)], ret: (xid8), isOperator: false }], [this, ...args]);
    }
    pgVisibleInSnapshot(...args) {
        return sqlFunction("pg_visible_in_snapshot", [{ args: [(xid8), (pg_snapshot)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    pgXactStatus(...args) {
        return sqlFunction("pg_xact_status", [{ args: [(xid8)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    xid(...args) {
        return sqlFunction("xid", [{ args: [(xid8)], ret: (xid$1), isOperator: false }], [this, ...args]);
    }
    xid8Larger(...args) {
        return sqlFunction("xid8_larger", [{ args: [(xid8), (xid8)], ret: (xid8), isOperator: false }], [this, ...args]);
    }
    xid8Smaller(...args) {
        return sqlFunction("xid8_smaller", [{ args: [(xid8), (xid8)], ret: (xid8), isOperator: false }], [this, ...args]);
    }
    xid8Cmp(...args) {
        return sqlFunction("xid8cmp", [{ args: [(xid8), (xid8)], ret: (default_1$4), isOperator: false }], [this, ...args]);
    }
    xid8Eq(...args) {
        return sqlFunction("xid8eq", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xid8Ge(...args) {
        return sqlFunction("xid8ge", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xid8Gt(...args) {
        return sqlFunction("xid8gt", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xid8Le(...args) {
        return sqlFunction("xid8le", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xid8Lt(...args) {
        return sqlFunction("xid8lt", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    xid8Ne(...args) {
        return sqlFunction("xid8ne", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: true }], [this, ...args]);
    }
}

class xml$1 extends Any {
    static new(v) { return new xml$1(v); }
    static parse(v) { return v; }
    static typeString() { return "xml"; }
    asAggregate() {
        return undefined;
    }
    text(...args) {
        return sqlFunction("text", [{ args: [(xml$1)], ret: (default_1$1), isOperator: false }], [this, ...args]);
    }
    xmlagg(...args) {
        return sqlFunction("xmlagg", [{ args: [(xml$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    xmlconcat2(...args) {
        return sqlFunction("xmlconcat2", [{ args: [(xml$1), (xml$1)], ret: (xml$1), isOperator: false }], [this, ...args]);
    }
    xmlvalidate(...args) {
        return sqlFunction("xmlvalidate", [{ args: [(xml$1), (default_1$1)], ret: (default_1$8), isOperator: false }], [this, ...args]);
    }
}

class PgArray extends Any {
    static parse(v) { return v; }
    static typeString() { return "array"; }
    asAggregate() {
        return undefined;
    }
    arrayAgg(...args) {
        return sqlFunction("array_agg", [({ T }) => ({ args: [Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arrayAppend(...args) {
        return sqlFunction("array_append", [({ T }) => ({ args: [Array$1.of(T), T], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arrayCat(...args) {
        return sqlFunction("array_cat", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arrayDims(...args) {
        return sqlFunction("array_dims", [({ T }) => ({ args: [Array$1.of(T)], ret: (default_1$1), isOperator: false })], [this, ...args]);
    }
    arrayEq(...args) {
        return sqlFunction("array_eq", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    arrayGe(...args) {
        return sqlFunction("array_ge", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    arrayGt(...args) {
        return sqlFunction("array_gt", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    arrayLarger(...args) {
        return sqlFunction("array_larger", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arrayLe(...args) {
        return sqlFunction("array_le", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    arrayLength(...args) {
        return sqlFunction("array_length", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    arrayLower(...args) {
        return sqlFunction("array_lower", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    arrayLt(...args) {
        return sqlFunction("array_lt", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    arrayNdims(...args) {
        return sqlFunction("array_ndims", [({ T }) => ({ args: [Array$1.of(T)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    arrayNe(...args) {
        return sqlFunction("array_ne", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    arrayPosition(...args) {
        return sqlFunction("array_position", [({ T }) => ({ args: [Array$1.of(T), T], ret: (default_1$4), isOperator: false }), ({ T }) => ({ args: [Array$1.of(T), T, (default_1$4)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    arrayPositions(...args) {
        return sqlFunction("array_positions", [({ T }) => ({ args: [Array$1.of(T), T], ret: Array$1.of((default_1$4)), isOperator: false })], [this, ...args]);
    }
    arrayRemove(...args) {
        return sqlFunction("array_remove", [({ T }) => ({ args: [Array$1.of(T), T], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arrayReplace(...args) {
        return sqlFunction("array_replace", [({ T }) => ({ args: [Array$1.of(T), T, T], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arraySample(...args) {
        return sqlFunction("array_sample", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arrayShuffle(...args) {
        return sqlFunction("array_shuffle", [({ T }) => ({ args: [Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arraySmaller(...args) {
        return sqlFunction("array_smaller", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    arrayToJson(...args) {
        return sqlFunction("array_to_json", [({ T }) => ({ args: [Array$1.of(T)], ret: (json), isOperator: false }), ({ T }) => ({ args: [Array$1.of(T), (default_1$8)], ret: (json), isOperator: false })], [this, ...args]);
    }
    arrayToString(...args) {
        return sqlFunction("array_to_string", [({ T }) => ({ args: [Array$1.of(T), (default_1$1)], ret: (default_1$1), isOperator: false }), ({ T }) => ({ args: [Array$1.of(T), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false })], [this, ...args]);
    }
    arrayUpper(...args) {
        return sqlFunction("array_upper", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    arraycontained(...args) {
        return sqlFunction("arraycontained", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    arraycontains(...args) {
        return sqlFunction("arraycontains", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    arrayoverlap(...args) {
        return sqlFunction("arrayoverlap", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], [this, ...args]);
    }
    btarraycmp(...args) {
        return sqlFunction("btarraycmp", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    cardinality(...args) {
        return sqlFunction("cardinality", [({ T }) => ({ args: [Array$1.of(T)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    generateSubscripts(...args) {
        return sqlFunction("generate_subscripts", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: Setof.ofSchema({}), isOperator: false }), ({ T }) => ({ args: [Array$1.of(T), (default_1$4), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false })], [this, ...args]);
    }
    hashArray(...args) {
        return sqlFunction("hash_array", [({ T }) => ({ args: [Array$1.of(T)], ret: (default_1$4), isOperator: false })], [this, ...args]);
    }
    hashArrayExtended(...args) {
        return sqlFunction("hash_array_extended", [({ T }) => ({ args: [Array$1.of(T), (default_1$3)], ret: (default_1$3), isOperator: false })], [this, ...args]);
    }
    max(...args) {
        return sqlFunction("max", [({ T }) => ({ args: [Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    trimArray(...args) {
        return sqlFunction("trim_array", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: Array$1.of(T), isOperator: false })], [this, ...args]);
    }
    unnest(...args) {
        return sqlFunction("unnest", [({ T }) => ({ args: [Array$1.of(T)], ret: Setof.ofSchema({}), isOperator: false })], [this, ...args]);
    }
    ["="](...args) {
        return sqlFunction("=", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    [">="](...args) {
        return sqlFunction(">=", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    [">"](...args) {
        return sqlFunction(">", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<="](...args) {
        return sqlFunction("<=", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<"](...args) {
        return sqlFunction("<", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["<>"](...args) {
        return sqlFunction("<>", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["@>"](...args) {
        return sqlFunction("@>", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
    ["&&"](...args) {
        return sqlFunction("&&", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: true })], [this, ...args]);
    }
}

let Array$1 = class Array extends PgArray {
    static of(subtype) {
        return class ArrayImpl extends Array {
            static resultType;
            static typeString() {
                return `${subtype.typeString()}[]`;
            }
            static subtype() {
                return {
                    subtype: subtype,
                    withSubtype: Array.of,
                };
            }
            static parse(v) {
                return array.parse(v, subtype.parse);
            }
            constructor(v) {
                super(v);
            }
            static new(v) {
                return new ArrayImpl(v);
            }
        };
    }
};

const maybePrimitiveToSqlType = (value) => {
    if (typeof value === "string") {
        return default_1$1.new(value);
    }
    else if (typeof value === "number") {
        return default_1$6.new(value);
    }
    else if (typeof value === "boolean") {
        return default_1$8.new(value);
    }
    else if (typeof value === "bigint") {
        return default_1$2.new(value);
    }
    if (value instanceof Any) {
        return value;
    }
    if (typeof value === "object" && value !== null) {
        return Object.fromEntries(Object.entries(value).map(([key, val]) => [
            key,
            maybePrimitiveToSqlType(val),
        ]));
    }
    throw new Error(`Unsupported type for maybePrimitiveToSqlType: ${typeof value}`);
};

class LiteralRecordExpression extends Expression {
    value;
    schema;
    constructor(value, schema) {
        if (value === null) {
            throw new Error("Cannot create a null literal record");
        }
        super();
        this.value = value;
        this.schema = schema;
    }
    compile() {
        if (this.value === null) {
            throw new Error("Cannot create a null literal record");
        }
        // 1. Pretend the value is an array and parse the parts
        const parts = array.parse(`{${this.value.slice(1, -1)}}`, (v) => v);
        // 2. Then each part corresponds to a k/v in the schema:
        return sql `ROW(${sql.join(Object.values(this.schema).map((type, i) => {
            const instantiated = type.new("");
            return instantiated instanceof Record
                ? new LiteralRecordExpression(parts[i], instantiated.schema).compile()
                : new LiteralExpression(parts[i], type.typeString()).compile();
        }), sql.raw(", "))})`;
    }
}
class RecordAccessExpression extends Expression {
    base;
    key;
    constructor(base, key) {
        super();
        this.base = base;
        this.key = key;
    }
    compile(ctx) {
        return sql `(${this.base.compile(ctx)}).${sql.ref(this.key)}`;
    }
}
class Record extends PgRecord {
    static of(schema) {
        return class RecordImpl extends Record {
            schema = schema;
            static resultType;
            static typeString() {
                return `(${Object.entries(schema)
                    .map(([key, value]) => `${key} ${value.typeString()}`)
                    .join(", ")})`;
            }
            static subtype() {
                return {
                    subtype: schema,
                    withSubtype: Record.of,
                };
            }
            static parse(v) {
                // 1. Pretend the value is an array and parse the parts
                const parts = array.parse(`{${v.slice(1, -1)}}`, (v) => v);
                // 2. Then each part corresponds to a k/v in the schema:
                return Object.fromEntries(Object.entries(schema).map(([key, value], i) => [
                    key,
                    value.parse(parts[i]),
                ]));
            }
            constructor(v) {
                super(v);
                for (const [key, value] of Object.entries(schema)) {
                    if (key in this) {
                        throw new Error(`Record constructor: ${key} already defined ${JSON.stringify(this)}, cannot redefine`);
                    }
                    this[key] = value.new(this.v instanceof TableReferenceExpression
                        ? // This is the case where we're using reference to a table, so we don't use
                            // parens around the expression to access the column:
                            new ColumnAliasExpression(this.v.table, key)
                        : new RecordAccessExpression(this.toExpression(), key));
                }
            }
            toExpression() {
                if (this.v instanceof Expression) {
                    return super.toExpression();
                }
                if (typeof this.v !== "string") {
                    throw new Error(`Record.toExpression: expected string, got ${typeof this.v}`);
                }
                return new LiteralRecordExpression(this.v, schema);
            }
            static new(v) {
                return new RecordImpl(v);
            }
        };
    }
}
const row = (row, expression) => {
    const rowLike = maybePrimitiveToSqlType(row);
    return Record.of(Object.fromEntries(Object.entries(rowLike).map(([key, value]) => [
        key,
        value.getClass(),
    ]))).new(expression);
};

const isScalar = (value) => {
    return value instanceof Any;
};
const isScalarRelaxed = (value) => {
    return (isScalar(value) ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "bigint");
};
class SelectableExpression extends Expression {
    schema;
    constructor(schema) {
        super();
        this.schema = schema;
    }
    tableColumnAlias() {
        const keys = Object.keys(this.schema)
            .toSorted((k1, k2) => k1.localeCompare(k2))
            .map((key) => sql.ref(key));
        return sql.join(keys);
    }
}
class TableReferenceExpression extends SelectableExpression {
    table;
    constructor(table, schema) {
        super(schema);
        this.table = table;
    }
    compile(ctx) {
        return sql.ref(ctx.getAlias(this.table));
    }
}
class ValuesExpression extends SelectableExpression {
    values;
    constructor(values) {
        super(values[0]);
        this.values = values;
    }
    compile(ctx) {
        return sql `(VALUES ${sql.join(this.values.map((value) => sql `(${sql.join(Object.entries(value)
            .toSorted(([k1], [k2]) => k1.localeCompare(k2))
            .map(([, value]) => sql `${value.toExpression().compile(ctx)}`))})`))})`;
    }
}
class SubqueryExpression extends SelectableExpression {
    subquery;
    constructor(subquery) {
        super(resultType(subquery.query));
        this.subquery = subquery;
    }
    compile(ctx) {
        return this.subquery.compile(ctx);
    }
}
const aliasRowLike = (queryAlias, row) => {
    return Object.fromEntries(Object.entries(row).map(([key, value]) => [
        key,
        value.getClass().new(new ColumnAliasExpression(queryAlias, key)),
    ]));
};
const aliasScalar = (queryAlias, scalar) => {
    return scalar.getClass().new(new ColumnAliasExpression(queryAlias, "value"));
};
class ColumnAliasExpression extends Expression {
    alias;
    column;
    constructor(alias, column) {
        super();
        this.alias = alias;
        this.column = column;
    }
    compile(ctx) {
        return sql.ref(`${ctx.getAlias(this.alias)}.${this.column}`);
    }
}
const parseRowLike = (rowLike, result) => {
    return Object.fromEntries(Object.entries(rowLike).map(([key, value]) => {
        const res = result[key];
        return [key, res === null ? res : value.getClass().parse(res)];
    }));
};
const resultType = (query) => {
    return (query.select ?? query.from);
};
class Setof extends Expression {
    rawFromExpr;
    fromAlias;
    joinAliases;
    query;
    db;
    fromRow;
    constructor(rawFromExpr, fromAlias, joinAliases, query, db, fromRow) {
        super();
        this.rawFromExpr = rawFromExpr;
        this.fromAlias = fromAlias;
        this.joinAliases = joinAliases;
        this.query = query;
        this.db = db;
        this.fromRow = fromRow;
    }
    static of(fromRow) {
        return class extends Setof {
            static new(fromExpr) {
                const alias = new QueryAlias("values");
                return new Setof(fromExpr, alias, {}, {
                    from: aliasRowLike(alias, fromRow),
                }, db$1, fromRow);
            }
        };
    }
    static ofSchema(fromRow) {
        return this.of(Object.fromEntries(Object.entries(fromRow).map(([k, Cls]) => [k, Cls.new("")])));
    }
    toSelectArgs() {
        return Array.isArray(this.query.groupBy)
            ? [this.query.from, this.query.groupBy]
            : [
                isScalar(this.query.from)
                    ? this.query.from
                    : row(this.query.from, new TableReferenceExpression(this.fromAlias, this.query.from)),
                this.joinTables(),
            ];
    }
    select(fn) {
        return new Setof(this.rawFromExpr, this.fromAlias, this.joinAliases, {
            ...this.query,
            select: maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
        }, this.db, this.fromRow);
    }
    where(fn) {
        return new Setof(this.rawFromExpr, this.fromAlias, this.joinAliases, {
            ...this.query,
            wheres: [
                ...(this.query.wheres ?? []),
                maybePrimitiveToSqlType(fn(...this.toSelectArgs())),
            ],
        }, this.db, this.fromRow);
    }
    groupBy(fn) {
        return new Setof(this.rawFromExpr, this.fromAlias, this.joinAliases, {
            ...this.query,
            groupBy: [...(this.query.groupBy ?? []), ...fn(this.query.from)],
        }, this.db, this.fromRow);
    }
    joinTables() {
        return Object.fromEntries(Object.entries({ ...this.query.joins }).map(([key, value]) => [
            key,
            value.row,
        ]));
    }
    join(j, as, on) {
        const alias = new QueryAlias(as);
        const row = aliasRowLike(alias, resultType(j.query));
        return new Setof(this.rawFromExpr, this.fromAlias, {
            ...this.joinAliases,
            [as]: alias,
        }, {
            ...this.query,
            joins: {
                ...this.query.joins,
                [as]: {
                    table: j,
                    on: maybePrimitiveToSqlType(on(this.query.from, {
                        ...this.joinTables(),
                        ...{ [as]: row },
                    })),
                    row,
                },
            },
        }, this.db, this.fromRow);
    }
    subquery() {
        const alias = new QueryAlias("subquery");
        const res = resultType(this.query);
        return new Setof(new SubqueryExpression(this), alias, this.joinAliases, {
            from: isScalar(res)
                ? aliasScalar(alias, res)
                : aliasRowLike(alias, res),
        }, this.db, res);
    }
    tableColumnAlias() {
        const keys = Object.keys(this.query.from)
            .toSorted((k1, k2) => k1.localeCompare(k2))
            .map((key) => sql.ref(key));
        return sql.join(keys);
    }
    compile(ctxIn) {
        const ctx = ctxIn.withAliases([
            this.fromAlias,
            ...Object.values(this.joinAliases),
        ]);
        const from = sql `FROM ${this.rawFromExpr.compile(ctxIn)} as ${sql.ref(ctx.getAlias(this.fromAlias))}${this.rawFromExpr instanceof ValuesExpression
            ? sql `(${this.tableColumnAlias()})`
            : sql ``}`;
        const joins = this.query.joins
            ? sql.join(Object.entries(this.query.joins ?? {}).map(([alias, join]) => {
                return sql `JOIN ${join.table.compile(ctx)} as ${sql.ref(ctx.getAlias(this.joinAliases[alias]))} ON ${join.on.toExpression().compile(ctx)}`;
            }), sql ` `)
            : sql ``;
        const selectEntries = this.query.select
            ? isScalar(this.query.select)
                ? { value: this.query.select }
                : this.query.select
            : {};
        const select = this.query.select
            ? sql `SELECT ${sql.join(Object.entries(selectEntries).map(([key, value]) => sql `${value.toExpression().compile(ctx)} AS ${sql.ref(key)}`))}`
            : sql `SELECT *`;
        const where = this.query.wheres
            ? sql `WHERE ${sql.join(this.query.wheres.map((w) => sql `(${w.toExpression().compile(ctx)})`), sql ` AND `)}`
            : sql ``;
        const groupBy = this.query.groupBy
            ? sql `GROUP BY ${sql.join(this.query.groupBy.map((g) => sql `${g.toExpression().compile(ctx)}`), sql `, `)}`
            : sql ``;
        return sql `(${select} ${from} ${where} ${joins} ${groupBy})`;
    }
    debug() {
        console.log("debug", this.compile(Context.new()).compile(this.db));
        return this;
    }
    async execute(db = this.db) {
        const kexpr = db.executeQuery(this.compile(Context.new()).compile(db));
        const resultRowLike = this.query.select
            ? this.query.select
            : this.query.from;
        try {
            const result = await kexpr;
            return result.rows.map((row) => isScalar(resultRowLike)
                ? resultRowLike
                    .getClass()
                    .parse(Object.values(row)[0])
                : parseRowLike(resultRowLike, row));
        }
        catch (err) {
            console.error("Error executing query:", this.compile(Context.new()).compile(db), err);
            throw err;
        }
    }
    scalar() {
        return this.query.select.getClass().new(this);
    }
}
const values = (...input) => {
    return Setof.of(input[0]).new(new ValuesExpression(input));
};

const Generated = Symbol("Generated");
// Like `TableReferenceExpression` but referencing a table directly (not an alias)
class RawTableReferenceExpression extends SelectableExpression {
    table;
    constructor(table, schema) {
        super(schema);
        this.table = table;
    }
    compile(_ctx) {
        return sql.ref(this.table);
    }
}
const table = (name, columns) => {
    const rowLike = Object.fromEntries(Object.entries(columns).map(([name, col]) => [name, col.new("")]));
    return Table.of(rowLike).new(new RawTableReferenceExpression(name, rowLike));
};
const database = (schema) => {
    return Object.fromEntries(Object.entries(schema).map(([name, columns]) => [
        name,
        table(name, columns),
    ]));
};
class Table extends Setof {
    rawFromExpr;
    fromAlias;
    joinAliases;
    query;
    db;
    fromRow;
    constructor(rawFromExpr, fromAlias, joinAliases, query, db, fromRow) {
        super(rawFromExpr, fromAlias, joinAliases, query, db, fromRow);
        this.rawFromExpr = rawFromExpr;
        this.fromAlias = fromAlias;
        this.joinAliases = joinAliases;
        this.query = query;
        this.db = db;
        this.fromRow = fromRow;
    }
    static of(fromRow) {
        return class extends Table {
            static new(fromExpr) {
                const alias = new QueryAlias(fromExpr.table);
                return new Table(fromExpr, alias, {}, {
                    from: aliasRowLike(alias, fromRow),
                }, db$1, fromRow);
            }
        };
    }
    insert(expr) {
        const keys = sql.join(Object.keys(expr.query.from).toSorted().map(sql.ref), sql.raw(", "));
        const statement = sql `
      INSERT INTO ${sql.ref(this.rawFromExpr.table)} (${keys})
      (${expr.compile(Context.new().withReference(this.rawFromExpr.table))})
      RETURNING *
    `;
        return {
            execute: async (db) => {
                try {
                    const res = await db.executeQuery(statement.compile(db));
                    return res.rows;
                }
                catch (e) {
                    console.error("Error executing insert:", e, statement.compile(db));
                    throw e;
                }
            },
        };
    }
    update(arg) {
        return new UpdateBuilder(this, arg);
    }
}
class UpdateBuilder {
    table;
    arg;
    constructor(table, arg) {
        this.table = table;
        this.arg = arg;
    }
    set(setCb) {
        const builder = this;
        return {
            async execute(db) {
                const alias = new QueryAlias(builder.table.rawFromExpr.table);
                const asAlias = aliasRowLike(alias, resultType(builder.table.query));
                const where = "where" in builder.arg ? builder.arg.where(asAlias) : undefined;
                const from = "from" in builder.arg && builder.arg.from
                    ? builder.arg.from(asAlias)
                    : undefined;
                const wheres = [where, ...(from?.query.wheres ?? [])].filter((where) => where !== undefined);
                const { wheres: _fromWheres, ...rest } = from?.query ?? {};
                const fromWithoutWheres = from &&
                    "from" in rest &&
                    new Setof(from.rawFromExpr, from.fromAlias, from.joinAliases, rest, from.db, from.fromRow);
                const set = setCb(asAlias, ...(builder.arg.from && from ? from.toSelectArgs() : []));
                const ctx = Context.new().withAliases([
                    alias,
                    ...(from ? [from.fromAlias, ...Object.values(from.joinAliases)] : []),
                ]);
                const statement = sql `
        UPDATE ${sql.ref(builder.table.rawFromExpr.table)}
        SET ${sql.join(Object.entries(set).map(([key, value]) => sql `${sql.ref(key)} = ${value.toExpression().compile(ctx)}`), sql.raw(", "))}
        ${fromWithoutWheres
                    ? sql `FROM ${fromWithoutWheres.compile(ctx)} AS ${sql.ref(from.fromAlias.name)}`
                    : sql ``}
        ${wheres.length
                    ? sql `WHERE ${sql.join(wheres.map((where) => where.toExpression().compile(ctx)), sql.raw(" AND "))}`
                    : sql ``}
        RETURNING ${sql.ref(builder.table.rawFromExpr.table)}.*
      `;
                try {
                    const res = await db.executeQuery(statement.compile(db));
                    return res.rows;
                }
                catch (e) {
                    console.error("Error executing update:", e, statement.compile(db));
                    throw e;
                }
            },
        };
    }
}

function riFKeyCascadeDel(...args) {
    return sqlFunction("RI_FKey_cascade_del", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeyCascadeUpd(...args) {
    return sqlFunction("RI_FKey_cascade_upd", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeyCheckIns(...args) {
    return sqlFunction("RI_FKey_check_ins", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeyCheckUpd(...args) {
    return sqlFunction("RI_FKey_check_upd", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeyNoactionDel(...args) {
    return sqlFunction("RI_FKey_noaction_del", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeyNoactionUpd(...args) {
    return sqlFunction("RI_FKey_noaction_upd", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeyRestrictDel(...args) {
    return sqlFunction("RI_FKey_restrict_del", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeyRestrictUpd(...args) {
    return sqlFunction("RI_FKey_restrict_upd", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeySetdefaultDel(...args) {
    return sqlFunction("RI_FKey_setdefault_del", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeySetdefaultUpd(...args) {
    return sqlFunction("RI_FKey_setdefault_upd", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeySetnullDel(...args) {
    return sqlFunction("RI_FKey_setnull_del", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function riFKeySetnullUpd(...args) {
    return sqlFunction("RI_FKey_setnull_upd", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function abbrev(...args) {
    return sqlFunction("abbrev", [{ args: [(cidr$1)], ret: (default_1$1), isOperator: false }, { args: [(inet)], ret: (default_1$1), isOperator: false }], args);
}
function abs(...args) {
    return sqlFunction("abs", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$5), isOperator: false }, { args: [(default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3)], ret: (default_1$3), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function aclcontains(...args) {
    return sqlFunction("aclcontains", [{ args: [Array$1.of((aclitem)), (aclitem)], ret: (default_1$8), isOperator: false }], args);
}
function acldefault(...args) {
    return sqlFunction("acldefault", [{ args: [(char$1), (oid$1)], ret: Array$1.of((aclitem)), isOperator: false }], args);
}
function aclexplode(...args) {
    return sqlFunction("aclexplode", [{ args: [Array$1.of((aclitem))], ret: Setof.ofSchema({ grantor: (oid$1), grantee: (oid$1), privilege_type: (default_1$1), is_grantable: (default_1$8) }), isOperator: false }], args);
}
function aclinsert(...args) {
    return sqlFunction("aclinsert", [{ args: [Array$1.of((aclitem)), (aclitem)], ret: Array$1.of((aclitem)), isOperator: false }], args);
}
function aclitemeq(...args) {
    return sqlFunction("aclitemeq", [{ args: [(aclitem), (aclitem)], ret: (default_1$8), isOperator: false }], args);
}
function aclremove(...args) {
    return sqlFunction("aclremove", [{ args: [Array$1.of((aclitem)), (aclitem)], ret: Array$1.of((aclitem)), isOperator: false }], args);
}
function acos(...args) {
    return sqlFunction("acos", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function acosd(...args) {
    return sqlFunction("acosd", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function acosh(...args) {
    return sqlFunction("acosh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function age(...args) {
    return sqlFunction("age", [{ args: [(xid$1)], ret: (default_1$4), isOperator: false }, { args: [(timestamp$1)], ret: (interval$1), isOperator: false }, { args: [(timestamp$1), (timestamp$1)], ret: (interval$1), isOperator: false }, { args: [(timestamptz$1)], ret: (interval$1), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1)], ret: (interval$1), isOperator: false }], args);
}
function amvalidate(...args) {
    return sqlFunction("amvalidate", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function anyValue(...args) {
    return sqlFunction("any_value", [({ T }) => ({ args: [T], ret: T, isOperator: false })], args);
}
function anyValueTransfn(...args) {
    return sqlFunction("any_value_transfn", [({ T }) => ({ args: [T, T], ret: T, isOperator: false })], args);
}
function anytextcat(...args) {
    return sqlFunction("anytextcat", [({ T }) => ({ args: [T, (default_1$1)], ret: (default_1$1), isOperator: false })], args);
}
function area(...args) {
    return sqlFunction("area", [{ args: [(box$1)], ret: (default_1$6), isOperator: false }, { args: [(circle$1)], ret: (default_1$6), isOperator: false }, { args: [(path$1)], ret: (default_1$6), isOperator: false }], args);
}
function arrayAgg(...args) {
    return sqlFunction("array_agg", [({ T }) => ({ args: [Array$1.of(T)], ret: Array$1.of(T), isOperator: false }), ({ T }) => ({ args: [T], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayAppend(...args) {
    return sqlFunction("array_append", [({ T }) => ({ args: [Array$1.of(T), T], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayCat(...args) {
    return sqlFunction("array_cat", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayDims(...args) {
    return sqlFunction("array_dims", [({ T }) => ({ args: [Array$1.of(T)], ret: (default_1$1), isOperator: false })], args);
}
function arrayEq(...args) {
    return sqlFunction("array_eq", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function arrayFill(...args) {
    return sqlFunction("array_fill", [({ T }) => ({ args: [T, Array$1.of((default_1$4))], ret: Array$1.of(T), isOperator: false }), ({ T }) => ({ args: [T, Array$1.of((default_1$4)), Array$1.of((default_1$4))], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayGe(...args) {
    return sqlFunction("array_ge", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function arrayGt(...args) {
    return sqlFunction("array_gt", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function arrayLarger(...args) {
    return sqlFunction("array_larger", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayLe(...args) {
    return sqlFunction("array_le", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function arrayLength(...args) {
    return sqlFunction("array_length", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: (default_1$4), isOperator: false })], args);
}
function arrayLower(...args) {
    return sqlFunction("array_lower", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: (default_1$4), isOperator: false })], args);
}
function arrayLt(...args) {
    return sqlFunction("array_lt", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function arrayNdims(...args) {
    return sqlFunction("array_ndims", [({ T }) => ({ args: [Array$1.of(T)], ret: (default_1$4), isOperator: false })], args);
}
function arrayNe(...args) {
    return sqlFunction("array_ne", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function arrayPosition(...args) {
    return sqlFunction("array_position", [({ T }) => ({ args: [Array$1.of(T), T], ret: (default_1$4), isOperator: false }), ({ T }) => ({ args: [Array$1.of(T), T, (default_1$4)], ret: (default_1$4), isOperator: false })], args);
}
function arrayPositions(...args) {
    return sqlFunction("array_positions", [({ T }) => ({ args: [Array$1.of(T), T], ret: Array$1.of((default_1$4)), isOperator: false })], args);
}
function arrayPrepend(...args) {
    return sqlFunction("array_prepend", [({ T }) => ({ args: [T, Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayRemove(...args) {
    return sqlFunction("array_remove", [({ T }) => ({ args: [Array$1.of(T), T], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayReplace(...args) {
    return sqlFunction("array_replace", [({ T }) => ({ args: [Array$1.of(T), T, T], ret: Array$1.of(T), isOperator: false })], args);
}
function arraySample(...args) {
    return sqlFunction("array_sample", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayShuffle(...args) {
    return sqlFunction("array_shuffle", [({ T }) => ({ args: [Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], args);
}
function arraySmaller(...args) {
    return sqlFunction("array_smaller", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: Array$1.of(T), isOperator: false })], args);
}
function arrayToJson(...args) {
    return sqlFunction("array_to_json", [({ T }) => ({ args: [Array$1.of(T)], ret: (json), isOperator: false }), ({ T }) => ({ args: [Array$1.of(T), (default_1$8)], ret: (json), isOperator: false })], args);
}
function arrayToString(...args) {
    return sqlFunction("array_to_string", [({ T }) => ({ args: [Array$1.of(T), (default_1$1)], ret: (default_1$1), isOperator: false }), ({ T }) => ({ args: [Array$1.of(T), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false })], args);
}
function arrayToTsvector(...args) {
    return sqlFunction("array_to_tsvector", [{ args: [Array$1.of((default_1$1))], ret: (tsvector), isOperator: false }], args);
}
function arrayUpper(...args) {
    return sqlFunction("array_upper", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: (default_1$4), isOperator: false })], args);
}
function arraycontained(...args) {
    return sqlFunction("arraycontained", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function arraycontains(...args) {
    return sqlFunction("arraycontains", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function arrayoverlap(...args) {
    return sqlFunction("arrayoverlap", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$8), isOperator: false })], args);
}
function ascii(...args) {
    return sqlFunction("ascii", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function asind(...args) {
    return sqlFunction("asind", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function asinh(...args) {
    return sqlFunction("asinh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function atan(...args) {
    return sqlFunction("atan", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function atan2(...args) {
    return sqlFunction("atan2", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function atan2D(...args) {
    return sqlFunction("atan2d", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function atand(...args) {
    return sqlFunction("atand", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function atanh(...args) {
    return sqlFunction("atanh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function avg(...args) {
    return sqlFunction("avg", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(interval$1)], ret: (interval$1), isOperator: false }, { args: [(default_1$5)], ret: (default_1$2), isOperator: false }, { args: [(default_1$4)], ret: (default_1$2), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function binaryUpgradeAddSubRelState(...args) {
    return sqlFunction("binary_upgrade_add_sub_rel_state", [{ args: [(default_1$1), (oid$1), (char$1), (pg_lsn)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeCreateEmptyExtension(...args) {
    return sqlFunction("binary_upgrade_create_empty_extension", [{ args: [(default_1$1), (default_1$1), (default_1$8), (default_1$1), Array$1.of((oid$1)), Array$1.of((default_1$1)), Array$1.of((default_1$1))], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeLogicalSlotHasCaughtUp(...args) {
    return sqlFunction("binary_upgrade_logical_slot_has_caught_up", [{ args: [(name$1)], ret: (default_1$8), isOperator: false }], args);
}
function binaryUpgradeReploriginAdvance(...args) {
    return sqlFunction("binary_upgrade_replorigin_advance", [{ args: [(default_1$1), (pg_lsn)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetMissingValue(...args) {
    return sqlFunction("binary_upgrade_set_missing_value", [{ args: [(oid$1), (default_1$1), (default_1$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextArrayPgTypeOid(...args) {
    return sqlFunction("binary_upgrade_set_next_array_pg_type_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextHeapPgClassOid(...args) {
    return sqlFunction("binary_upgrade_set_next_heap_pg_class_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextHeapRelfilenode(...args) {
    return sqlFunction("binary_upgrade_set_next_heap_relfilenode", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextIndexPgClassOid(...args) {
    return sqlFunction("binary_upgrade_set_next_index_pg_class_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextIndexRelfilenode(...args) {
    return sqlFunction("binary_upgrade_set_next_index_relfilenode", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextMultirangeArrayPgTypeOid(...args) {
    return sqlFunction("binary_upgrade_set_next_multirange_array_pg_type_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextMultirangePgTypeOid(...args) {
    return sqlFunction("binary_upgrade_set_next_multirange_pg_type_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextPgAuthidOid(...args) {
    return sqlFunction("binary_upgrade_set_next_pg_authid_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextPgEnumOid(...args) {
    return sqlFunction("binary_upgrade_set_next_pg_enum_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextPgTablespaceOid(...args) {
    return sqlFunction("binary_upgrade_set_next_pg_tablespace_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextPgTypeOid(...args) {
    return sqlFunction("binary_upgrade_set_next_pg_type_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextToastPgClassOid(...args) {
    return sqlFunction("binary_upgrade_set_next_toast_pg_class_oid", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetNextToastRelfilenode(...args) {
    return sqlFunction("binary_upgrade_set_next_toast_relfilenode", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function binaryUpgradeSetRecordInitPrivs(...args) {
    return sqlFunction("binary_upgrade_set_record_init_privs", [{ args: [(default_1$8)], ret: (_void), isOperator: false }], args);
}
function bit(...args) {
    return sqlFunction("bit", [{ args: [(bit$1), (default_1$4), (default_1$8)], ret: (bit$1), isOperator: false }, { args: [(default_1$4), (default_1$4)], ret: (bit$1), isOperator: false }, { args: [(default_1$3), (default_1$4)], ret: (bit$1), isOperator: false }], args);
}
function bitAnd(...args) {
    return sqlFunction("bit_and", [{ args: [(bit$1)], ret: (bit$1), isOperator: false }, { args: [(default_1$5)], ret: (default_1$5), isOperator: false }, { args: [(default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function bitCount(...args) {
    return sqlFunction("bit_count", [{ args: [(bit$1)], ret: (default_1$3), isOperator: false }, { args: [(bytea)], ret: (default_1$3), isOperator: false }], args);
}
function bitLength(...args) {
    return sqlFunction("bit_length", [{ args: [(bit$1)], ret: (default_1$4), isOperator: false }, { args: [(bytea)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function bitOr(...args) {
    return sqlFunction("bit_or", [{ args: [(bit$1)], ret: (bit$1), isOperator: false }, { args: [(default_1$5)], ret: (default_1$5), isOperator: false }, { args: [(default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function bitXor(...args) {
    return sqlFunction("bit_xor", [{ args: [(bit$1)], ret: (bit$1), isOperator: false }, { args: [(default_1$5)], ret: (default_1$5), isOperator: false }, { args: [(default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function bitand(...args) {
    return sqlFunction("bitand", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: false }], args);
}
function bitcat(...args) {
    return sqlFunction("bitcat", [{ args: [(varbit$1), (varbit$1)], ret: (varbit$1), isOperator: false }], args);
}
function bitcmp(...args) {
    return sqlFunction("bitcmp", [{ args: [(bit$1), (bit$1)], ret: (default_1$4), isOperator: false }], args);
}
function biteq(...args) {
    return sqlFunction("biteq", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], args);
}
function bitge(...args) {
    return sqlFunction("bitge", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], args);
}
function bitgt(...args) {
    return sqlFunction("bitgt", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], args);
}
function bitle(...args) {
    return sqlFunction("bitle", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], args);
}
function bitlt(...args) {
    return sqlFunction("bitlt", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], args);
}
function bitne(...args) {
    return sqlFunction("bitne", [{ args: [(bit$1), (bit$1)], ret: (default_1$8), isOperator: false }], args);
}
function bitnot(...args) {
    return sqlFunction("bitnot", [{ args: [(bit$1)], ret: (bit$1), isOperator: false }], args);
}
function bitor(...args) {
    return sqlFunction("bitor", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: false }], args);
}
function bitshiftleft(...args) {
    return sqlFunction("bitshiftleft", [{ args: [(bit$1), (default_1$4)], ret: (bit$1), isOperator: false }], args);
}
function bitshiftright(...args) {
    return sqlFunction("bitshiftright", [{ args: [(bit$1), (default_1$4)], ret: (bit$1), isOperator: false }], args);
}
function bitxor(...args) {
    return sqlFunction("bitxor", [{ args: [(bit$1), (bit$1)], ret: (bit$1), isOperator: false }], args);
}
function bool(...args) {
    return sqlFunction("bool", [{ args: [(default_1$4)], ret: (default_1$8), isOperator: false }, { args: [(jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function boolAnd(...args) {
    return sqlFunction("bool_and", [{ args: [(default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boolOr(...args) {
    return sqlFunction("bool_or", [{ args: [(default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boolandStatefunc(...args) {
    return sqlFunction("booland_statefunc", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function booleq(...args) {
    return sqlFunction("booleq", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boolge(...args) {
    return sqlFunction("boolge", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boolgt(...args) {
    return sqlFunction("boolgt", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boolle(...args) {
    return sqlFunction("boolle", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boollt(...args) {
    return sqlFunction("boollt", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boolne(...args) {
    return sqlFunction("boolne", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boolorStatefunc(...args) {
    return sqlFunction("boolor_statefunc", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function boundBox(...args) {
    return sqlFunction("bound_box", [{ args: [(box$1), (box$1)], ret: (box$1), isOperator: false }], args);
}
function box(...args) {
    return sqlFunction("box", [{ args: [(circle$1)], ret: (box$1), isOperator: false }, { args: [(point$1)], ret: (box$1), isOperator: false }, { args: [(point$1), (point$1)], ret: (box$1), isOperator: false }, { args: [(polygon$1)], ret: (box$1), isOperator: false }], args);
}
function boxAbove(...args) {
    return sqlFunction("box_above", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxAboveEq(...args) {
    return sqlFunction("box_above_eq", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxAdd(...args) {
    return sqlFunction("box_add", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: false }], args);
}
function boxBelow(...args) {
    return sqlFunction("box_below", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxBelowEq(...args) {
    return sqlFunction("box_below_eq", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxCenter(...args) {
    return sqlFunction("box_center", [{ args: [(box$1)], ret: (point$1), isOperator: false }], args);
}
function boxContainPt(...args) {
    return sqlFunction("box_contain_pt", [{ args: [(box$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxContained(...args) {
    return sqlFunction("box_contained", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxDistance(...args) {
    return sqlFunction("box_distance", [{ args: [(box$1), (box$1)], ret: (default_1$6), isOperator: false }], args);
}
function boxDiv(...args) {
    return sqlFunction("box_div", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: false }], args);
}
function boxEq(...args) {
    return sqlFunction("box_eq", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxGe(...args) {
    return sqlFunction("box_ge", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxGt(...args) {
    return sqlFunction("box_gt", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxIntersect(...args) {
    return sqlFunction("box_intersect", [{ args: [(box$1), (box$1)], ret: (box$1), isOperator: false }], args);
}
function boxLe(...args) {
    return sqlFunction("box_le", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxLeft(...args) {
    return sqlFunction("box_left", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxLt(...args) {
    return sqlFunction("box_lt", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxMul(...args) {
    return sqlFunction("box_mul", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: false }], args);
}
function boxOverabove(...args) {
    return sqlFunction("box_overabove", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxOverbelow(...args) {
    return sqlFunction("box_overbelow", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxOverlap(...args) {
    return sqlFunction("box_overlap", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }, { args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxOverleft(...args) {
    return sqlFunction("box_overleft", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxOverright(...args) {
    return sqlFunction("box_overright", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxRight(...args) {
    return sqlFunction("box_right", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxSame(...args) {
    return sqlFunction("box_same", [{ args: [(box$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function boxSub(...args) {
    return sqlFunction("box_sub", [{ args: [(box$1), (point$1)], ret: (box$1), isOperator: false }], args);
}
function bpchar(...args) {
    return sqlFunction("bpchar", [{ args: [(bpchar$1), (default_1$4), (default_1$8)], ret: (bpchar$1), isOperator: false }, { args: [(char$1)], ret: (bpchar$1), isOperator: false }, { args: [(name$1)], ret: (bpchar$1), isOperator: false }], args);
}
function bpcharLarger(...args) {
    return sqlFunction("bpchar_larger", [{ args: [(bpchar$1), (bpchar$1)], ret: (bpchar$1), isOperator: false }], args);
}
function bpcharPatternGe(...args) {
    return sqlFunction("bpchar_pattern_ge", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharPatternGt(...args) {
    return sqlFunction("bpchar_pattern_gt", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharPatternLe(...args) {
    return sqlFunction("bpchar_pattern_le", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharPatternLt(...args) {
    return sqlFunction("bpchar_pattern_lt", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharSmaller(...args) {
    return sqlFunction("bpchar_smaller", [{ args: [(bpchar$1), (bpchar$1)], ret: (bpchar$1), isOperator: false }], args);
}
function bpcharcmp(...args) {
    return sqlFunction("bpcharcmp", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$4), isOperator: false }], args);
}
function bpchareq(...args) {
    return sqlFunction("bpchareq", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharge(...args) {
    return sqlFunction("bpcharge", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpchargt(...args) {
    return sqlFunction("bpchargt", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpchariclike(...args) {
    return sqlFunction("bpchariclike", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharicnlike(...args) {
    return sqlFunction("bpcharicnlike", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharicregexeq(...args) {
    return sqlFunction("bpcharicregexeq", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharicregexne(...args) {
    return sqlFunction("bpcharicregexne", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharle(...args) {
    return sqlFunction("bpcharle", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharlike(...args) {
    return sqlFunction("bpcharlike", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharlt(...args) {
    return sqlFunction("bpcharlt", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharne(...args) {
    return sqlFunction("bpcharne", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharnlike(...args) {
    return sqlFunction("bpcharnlike", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharregexeq(...args) {
    return sqlFunction("bpcharregexeq", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function bpcharregexne(...args) {
    return sqlFunction("bpcharregexne", [{ args: [(bpchar$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function brinDesummarizeRange(...args) {
    return sqlFunction("brin_desummarize_range", [{ args: [(regclass$1), (default_1$3)], ret: (_void), isOperator: false }], args);
}
function brinSummarizeNewValues(...args) {
    return sqlFunction("brin_summarize_new_values", [{ args: [(regclass$1)], ret: (default_1$4), isOperator: false }], args);
}
function brinSummarizeRange(...args) {
    return sqlFunction("brin_summarize_range", [{ args: [(regclass$1), (default_1$3)], ret: (default_1$4), isOperator: false }], args);
}
function broadcast(...args) {
    return sqlFunction("broadcast", [{ args: [(inet)], ret: (inet), isOperator: false }], args);
}
function btarraycmp(...args) {
    return sqlFunction("btarraycmp", [({ T }) => ({ args: [Array$1.of(T), Array$1.of(T)], ret: (default_1$4), isOperator: false })], args);
}
function btboolcmp(...args) {
    return sqlFunction("btboolcmp", [{ args: [(default_1$8), (default_1$8)], ret: (default_1$4), isOperator: false }], args);
}
function btbpcharPatternCmp(...args) {
    return sqlFunction("btbpchar_pattern_cmp", [{ args: [(bpchar$1), (bpchar$1)], ret: (default_1$4), isOperator: false }], args);
}
function btcharcmp(...args) {
    return sqlFunction("btcharcmp", [{ args: [(char$1), (char$1)], ret: (default_1$4), isOperator: false }], args);
}
function btequalimage(...args) {
    return sqlFunction("btequalimage", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function btfloat48Cmp(...args) {
    return sqlFunction("btfloat48cmp", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$4), isOperator: false }], args);
}
function btfloat4Cmp(...args) {
    return sqlFunction("btfloat4cmp", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$4), isOperator: false }], args);
}
function btfloat84Cmp(...args) {
    return sqlFunction("btfloat84cmp", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$4), isOperator: false }], args);
}
function btfloat8Cmp(...args) {
    return sqlFunction("btfloat8cmp", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$4), isOperator: false }], args);
}
function btint24Cmp(...args) {
    return sqlFunction("btint24cmp", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function btint28Cmp(...args) {
    return sqlFunction("btint28cmp", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$4), isOperator: false }], args);
}
function btint2Cmp(...args) {
    return sqlFunction("btint2cmp", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$4), isOperator: false }], args);
}
function btint42Cmp(...args) {
    return sqlFunction("btint42cmp", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], args);
}
function btint48Cmp(...args) {
    return sqlFunction("btint48cmp", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$4), isOperator: false }], args);
}
function btint4Cmp(...args) {
    return sqlFunction("btint4cmp", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function btint82Cmp(...args) {
    return sqlFunction("btint82cmp", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$4), isOperator: false }], args);
}
function btint84Cmp(...args) {
    return sqlFunction("btint84cmp", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function btint8Cmp(...args) {
    return sqlFunction("btint8cmp", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$4), isOperator: false }], args);
}
function btnamecmp(...args) {
    return sqlFunction("btnamecmp", [{ args: [(name$1), (name$1)], ret: (default_1$4), isOperator: false }], args);
}
function btnametextcmp(...args) {
    return sqlFunction("btnametextcmp", [{ args: [(name$1), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function btoidcmp(...args) {
    return sqlFunction("btoidcmp", [{ args: [(oid$1), (oid$1)], ret: (default_1$4), isOperator: false }], args);
}
function btoidvectorcmp(...args) {
    return sqlFunction("btoidvectorcmp", [{ args: [(oidvector), (oidvector)], ret: (default_1$4), isOperator: false }], args);
}
function btrecordcmp(...args) {
    return sqlFunction("btrecordcmp", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$4), isOperator: false })], args);
}
function btrecordimagecmp(...args) {
    return sqlFunction("btrecordimagecmp", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$4), isOperator: false })], args);
}
function btrim(...args) {
    return sqlFunction("btrim", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }, { args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function bttextPatternCmp(...args) {
    return sqlFunction("bttext_pattern_cmp", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function bttextcmp(...args) {
    return sqlFunction("bttextcmp", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function bttextnamecmp(...args) {
    return sqlFunction("bttextnamecmp", [{ args: [(default_1$1), (name$1)], ret: (default_1$4), isOperator: false }], args);
}
function bttidcmp(...args) {
    return sqlFunction("bttidcmp", [{ args: [(tid), (tid)], ret: (default_1$4), isOperator: false }], args);
}
function btvarstrequalimage(...args) {
    return sqlFunction("btvarstrequalimage", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function byteacat(...args) {
    return sqlFunction("byteacat", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }], args);
}
function byteacmp(...args) {
    return sqlFunction("byteacmp", [{ args: [(bytea), (bytea)], ret: (default_1$4), isOperator: false }], args);
}
function byteaeq(...args) {
    return sqlFunction("byteaeq", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], args);
}
function byteage(...args) {
    return sqlFunction("byteage", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], args);
}
function byteagt(...args) {
    return sqlFunction("byteagt", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], args);
}
function byteale(...args) {
    return sqlFunction("byteale", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], args);
}
function bytealike(...args) {
    return sqlFunction("bytealike", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], args);
}
function bytealt(...args) {
    return sqlFunction("bytealt", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], args);
}
function byteane(...args) {
    return sqlFunction("byteane", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], args);
}
function byteanlike(...args) {
    return sqlFunction("byteanlike", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }], args);
}
function cardinality(...args) {
    return sqlFunction("cardinality", [({ T }) => ({ args: [Array$1.of(T)], ret: (default_1$4), isOperator: false })], args);
}
function cashCmp(...args) {
    return sqlFunction("cash_cmp", [{ args: [(money$1), (money$1)], ret: (default_1$4), isOperator: false }], args);
}
function cashDivCash(...args) {
    return sqlFunction("cash_div_cash", [{ args: [(money$1), (money$1)], ret: (default_1$6), isOperator: false }], args);
}
function cashDivFlt4(...args) {
    return sqlFunction("cash_div_flt4", [{ args: [(money$1), (default_1$7)], ret: (money$1), isOperator: false }], args);
}
function cashDivFlt8(...args) {
    return sqlFunction("cash_div_flt8", [{ args: [(money$1), (default_1$6)], ret: (money$1), isOperator: false }], args);
}
function cashDivInt2(...args) {
    return sqlFunction("cash_div_int2", [{ args: [(money$1), (default_1$5)], ret: (money$1), isOperator: false }], args);
}
function cashDivInt4(...args) {
    return sqlFunction("cash_div_int4", [{ args: [(money$1), (default_1$4)], ret: (money$1), isOperator: false }], args);
}
function cashDivInt8(...args) {
    return sqlFunction("cash_div_int8", [{ args: [(money$1), (default_1$3)], ret: (money$1), isOperator: false }], args);
}
function cashEq(...args) {
    return sqlFunction("cash_eq", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], args);
}
function cashGe(...args) {
    return sqlFunction("cash_ge", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], args);
}
function cashGt(...args) {
    return sqlFunction("cash_gt", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], args);
}
function cashLe(...args) {
    return sqlFunction("cash_le", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], args);
}
function cashLt(...args) {
    return sqlFunction("cash_lt", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], args);
}
function cashMi(...args) {
    return sqlFunction("cash_mi", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: false }], args);
}
function cashMulFlt4(...args) {
    return sqlFunction("cash_mul_flt4", [{ args: [(money$1), (default_1$7)], ret: (money$1), isOperator: false }], args);
}
function cashMulFlt8(...args) {
    return sqlFunction("cash_mul_flt8", [{ args: [(money$1), (default_1$6)], ret: (money$1), isOperator: false }], args);
}
function cashMulInt2(...args) {
    return sqlFunction("cash_mul_int2", [{ args: [(money$1), (default_1$5)], ret: (money$1), isOperator: false }], args);
}
function cashMulInt4(...args) {
    return sqlFunction("cash_mul_int4", [{ args: [(money$1), (default_1$4)], ret: (money$1), isOperator: false }], args);
}
function cashMulInt8(...args) {
    return sqlFunction("cash_mul_int8", [{ args: [(money$1), (default_1$3)], ret: (money$1), isOperator: false }], args);
}
function cashNe(...args) {
    return sqlFunction("cash_ne", [{ args: [(money$1), (money$1)], ret: (default_1$8), isOperator: false }], args);
}
function cashPl(...args) {
    return sqlFunction("cash_pl", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: false }], args);
}
function cashWords(...args) {
    return sqlFunction("cash_words", [{ args: [(money$1)], ret: (default_1$1), isOperator: false }], args);
}
function cashlarger(...args) {
    return sqlFunction("cashlarger", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: false }], args);
}
function cashsmaller(...args) {
    return sqlFunction("cashsmaller", [{ args: [(money$1), (money$1)], ret: (money$1), isOperator: false }], args);
}
function cbrt(...args) {
    return sqlFunction("cbrt", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function ceil(...args) {
    return sqlFunction("ceil", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function ceiling(...args) {
    return sqlFunction("ceiling", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function center(...args) {
    return sqlFunction("center", [{ args: [(box$1)], ret: (point$1), isOperator: false }, { args: [(circle$1)], ret: (point$1), isOperator: false }], args);
}
function char(...args) {
    return sqlFunction("char", [{ args: [(default_1$4)], ret: (char$1), isOperator: false }, { args: [(default_1$1)], ret: (char$1), isOperator: false }], args);
}
function charLength(...args) {
    return sqlFunction("char_length", [{ args: [(bpchar$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function characterLength(...args) {
    return sqlFunction("character_length", [{ args: [(bpchar$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function chareq(...args) {
    return sqlFunction("chareq", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], args);
}
function charge(...args) {
    return sqlFunction("charge", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], args);
}
function chargt(...args) {
    return sqlFunction("chargt", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], args);
}
function charle(...args) {
    return sqlFunction("charle", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], args);
}
function charlt(...args) {
    return sqlFunction("charlt", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], args);
}
function charne(...args) {
    return sqlFunction("charne", [{ args: [(char$1), (char$1)], ret: (default_1$8), isOperator: false }], args);
}
function chr(...args) {
    return sqlFunction("chr", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function cideq(...args) {
    return sqlFunction("cideq", [{ args: [(cid), (cid)], ret: (default_1$8), isOperator: false }], args);
}
function cidr(...args) {
    return sqlFunction("cidr", [{ args: [(inet)], ret: (cidr$1), isOperator: false }], args);
}
function circle(...args) {
    return sqlFunction("circle", [{ args: [(box$1)], ret: (circle$1), isOperator: false }, { args: [(point$1), (default_1$6)], ret: (circle$1), isOperator: false }, { args: [(polygon$1)], ret: (circle$1), isOperator: false }], args);
}
function circleAbove(...args) {
    return sqlFunction("circle_above", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleAddPt(...args) {
    return sqlFunction("circle_add_pt", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: false }], args);
}
function circleBelow(...args) {
    return sqlFunction("circle_below", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleCenter(...args) {
    return sqlFunction("circle_center", [{ args: [(circle$1)], ret: (point$1), isOperator: false }], args);
}
function circleContainPt(...args) {
    return sqlFunction("circle_contain_pt", [{ args: [(circle$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleContained(...args) {
    return sqlFunction("circle_contained", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleDistance(...args) {
    return sqlFunction("circle_distance", [{ args: [(circle$1), (circle$1)], ret: (default_1$6), isOperator: false }], args);
}
function circleDivPt(...args) {
    return sqlFunction("circle_div_pt", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: false }], args);
}
function circleEq(...args) {
    return sqlFunction("circle_eq", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleGe(...args) {
    return sqlFunction("circle_ge", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleGt(...args) {
    return sqlFunction("circle_gt", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleLe(...args) {
    return sqlFunction("circle_le", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleLeft(...args) {
    return sqlFunction("circle_left", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleLt(...args) {
    return sqlFunction("circle_lt", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleMulPt(...args) {
    return sqlFunction("circle_mul_pt", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: false }], args);
}
function circleNe(...args) {
    return sqlFunction("circle_ne", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleOverabove(...args) {
    return sqlFunction("circle_overabove", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleOverbelow(...args) {
    return sqlFunction("circle_overbelow", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleOverlap(...args) {
    return sqlFunction("circle_overlap", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleOverleft(...args) {
    return sqlFunction("circle_overleft", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleOverright(...args) {
    return sqlFunction("circle_overright", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleRight(...args) {
    return sqlFunction("circle_right", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleSame(...args) {
    return sqlFunction("circle_same", [{ args: [(circle$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function circleSubPt(...args) {
    return sqlFunction("circle_sub_pt", [{ args: [(circle$1), (point$1)], ret: (circle$1), isOperator: false }], args);
}
function clockTimestamp(...args) {
    return sqlFunction("clock_timestamp", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function closeLs(...args) {
    return sqlFunction("close_ls", [{ args: [(line$1), (lseg$1)], ret: (point$1), isOperator: false }], args);
}
function closeLseg(...args) {
    return sqlFunction("close_lseg", [{ args: [(lseg$1), (lseg$1)], ret: (point$1), isOperator: false }], args);
}
function closePb(...args) {
    return sqlFunction("close_pb", [{ args: [(point$1), (box$1)], ret: (point$1), isOperator: false }], args);
}
function closePl(...args) {
    return sqlFunction("close_pl", [{ args: [(point$1), (line$1)], ret: (point$1), isOperator: false }], args);
}
function closePs(...args) {
    return sqlFunction("close_ps", [{ args: [(point$1), (lseg$1)], ret: (point$1), isOperator: false }], args);
}
function closeSb(...args) {
    return sqlFunction("close_sb", [{ args: [(lseg$1), (box$1)], ret: (point$1), isOperator: false }], args);
}
function colDescription(...args) {
    return sqlFunction("col_description", [{ args: [(oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function concat(...args) {
    return sqlFunction("concat", [{ args: [(Any)], ret: (default_1$1), isOperator: false }], args);
}
function concatWs(...args) {
    return sqlFunction("concat_ws", [{ args: [(default_1$1), (Any)], ret: (default_1$1), isOperator: false }], args);
}
function convert(...args) {
    return sqlFunction("convert", [{ args: [(bytea), (name$1), (name$1)], ret: (bytea), isOperator: false }], args);
}
function convertFrom(...args) {
    return sqlFunction("convert_from", [{ args: [(bytea), (name$1)], ret: (default_1$1), isOperator: false }], args);
}
function convertTo(...args) {
    return sqlFunction("convert_to", [{ args: [(default_1$1), (name$1)], ret: (bytea), isOperator: false }], args);
}
function corr(...args) {
    return sqlFunction("corr", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function cos(...args) {
    return sqlFunction("cos", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function cosd(...args) {
    return sqlFunction("cosd", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function cosh(...args) {
    return sqlFunction("cosh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function cot(...args) {
    return sqlFunction("cot", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function cotd(...args) {
    return sqlFunction("cotd", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function count(...args) {
    return sqlFunction("count", [{ args: [], ret: (default_1$3), isOperator: false }, { args: [(Any)], ret: (default_1$3), isOperator: false }], args);
}
function covarPop(...args) {
    return sqlFunction("covar_pop", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function covarSamp(...args) {
    return sqlFunction("covar_samp", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function cumeDist(...args) {
    return sqlFunction("cume_dist", [{ args: [], ret: (default_1$6), isOperator: false }, { args: [(Any)], ret: (default_1$6), isOperator: false }], args);
}
function currentDatabase(...args) {
    return sqlFunction("current_database", [{ args: [], ret: (name$1), isOperator: false }], args);
}
function currentQuery(...args) {
    return sqlFunction("current_query", [{ args: [], ret: (default_1$1), isOperator: false }], args);
}
function currentSchema(...args) {
    return sqlFunction("current_schema", [{ args: [], ret: (name$1), isOperator: false }], args);
}
function currentSchemas(...args) {
    return sqlFunction("current_schemas", [{ args: [(default_1$8)], ret: Array$1.of((name$1)), isOperator: false }], args);
}
function currentSetting(...args) {
    return sqlFunction("current_setting", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function currentUser(...args) {
    return sqlFunction("current_user", [{ args: [], ret: (name$1), isOperator: false }], args);
}
function currtid2(...args) {
    return sqlFunction("currtid2", [{ args: [(default_1$1), (tid)], ret: (tid), isOperator: false }], args);
}
function currval(...args) {
    return sqlFunction("currval", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], args);
}
function cursorToXml(...args) {
    return sqlFunction("cursor_to_xml", [{ args: [(refcursor), (default_1$4), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function cursorToXmlschema(...args) {
    return sqlFunction("cursor_to_xmlschema", [{ args: [(refcursor), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function databaseToXml(...args) {
    return sqlFunction("database_to_xml", [{ args: [(default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function databaseToXmlAndXmlschema(...args) {
    return sqlFunction("database_to_xml_and_xmlschema", [{ args: [(default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function databaseToXmlschema(...args) {
    return sqlFunction("database_to_xmlschema", [{ args: [(default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function date(...args) {
    return sqlFunction("date", [{ args: [(timestamp$1)], ret: (date$1), isOperator: false }, { args: [(timestamptz$1)], ret: (date$1), isOperator: false }], args);
}
function dateAdd(...args) {
    return sqlFunction("date_add", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: false }, { args: [(timestamptz$1), (interval$1), (default_1$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function dateCmp(...args) {
    return sqlFunction("date_cmp", [{ args: [(date$1), (date$1)], ret: (default_1$4), isOperator: false }], args);
}
function dateCmpTimestamp(...args) {
    return sqlFunction("date_cmp_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$4), isOperator: false }], args);
}
function dateCmpTimestamptz(...args) {
    return sqlFunction("date_cmp_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$4), isOperator: false }], args);
}
function dateEq(...args) {
    return sqlFunction("date_eq", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateEqTimestamp(...args) {
    return sqlFunction("date_eq_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateEqTimestamptz(...args) {
    return sqlFunction("date_eq_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateGe(...args) {
    return sqlFunction("date_ge", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateGeTimestamp(...args) {
    return sqlFunction("date_ge_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateGeTimestamptz(...args) {
    return sqlFunction("date_ge_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateGt(...args) {
    return sqlFunction("date_gt", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateGtTimestamp(...args) {
    return sqlFunction("date_gt_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateGtTimestamptz(...args) {
    return sqlFunction("date_gt_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateLarger(...args) {
    return sqlFunction("date_larger", [{ args: [(date$1), (date$1)], ret: (date$1), isOperator: false }], args);
}
function dateLe(...args) {
    return sqlFunction("date_le", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateLeTimestamp(...args) {
    return sqlFunction("date_le_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateLeTimestamptz(...args) {
    return sqlFunction("date_le_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateLt(...args) {
    return sqlFunction("date_lt", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateLtTimestamp(...args) {
    return sqlFunction("date_lt_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateLtTimestamptz(...args) {
    return sqlFunction("date_lt_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateMi(...args) {
    return sqlFunction("date_mi", [{ args: [(date$1), (date$1)], ret: (default_1$4), isOperator: false }], args);
}
function dateMiInterval(...args) {
    return sqlFunction("date_mi_interval", [{ args: [(date$1), (interval$1)], ret: (timestamp$1), isOperator: false }], args);
}
function dateMii(...args) {
    return sqlFunction("date_mii", [{ args: [(date$1), (default_1$4)], ret: (date$1), isOperator: false }], args);
}
function dateNe(...args) {
    return sqlFunction("date_ne", [{ args: [(date$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateNeTimestamp(...args) {
    return sqlFunction("date_ne_timestamp", [{ args: [(date$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function dateNeTimestamptz(...args) {
    return sqlFunction("date_ne_timestamptz", [{ args: [(date$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function datePart(...args) {
    return sqlFunction("date_part", [{ args: [(default_1$1), (date$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (interval$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (time$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (timestamp$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (timestamptz$1)], ret: (default_1$6), isOperator: false }, { args: [(default_1$1), (timetz$1)], ret: (default_1$6), isOperator: false }], args);
}
function datePlInterval(...args) {
    return sqlFunction("date_pl_interval", [{ args: [(date$1), (interval$1)], ret: (timestamp$1), isOperator: false }], args);
}
function datePli(...args) {
    return sqlFunction("date_pli", [{ args: [(date$1), (default_1$4)], ret: (date$1), isOperator: false }], args);
}
function dateSmaller(...args) {
    return sqlFunction("date_smaller", [{ args: [(date$1), (date$1)], ret: (date$1), isOperator: false }], args);
}
function dateSubtract(...args) {
    return sqlFunction("date_subtract", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: false }, { args: [(timestamptz$1), (interval$1), (default_1$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function dateTrunc(...args) {
    return sqlFunction("date_trunc", [{ args: [(default_1$1), (interval$1)], ret: (interval$1), isOperator: false }, { args: [(default_1$1), (timestamp$1)], ret: (timestamp$1), isOperator: false }, { args: [(default_1$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: false }, { args: [(default_1$1), (timestamptz$1), (default_1$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function datemultirange(...args) {
    return sqlFunction("datemultirange", [{ args: [], ret: (datemultirange$1), isOperator: false }, { args: [Array$1.of((daterange$1))], ret: (datemultirange$1), isOperator: false }, { args: [(daterange$1)], ret: (datemultirange$1), isOperator: false }], args);
}
function daterange(...args) {
    return sqlFunction("daterange", [{ args: [(date$1), (date$1)], ret: (daterange$1), isOperator: false }, { args: [(date$1), (date$1), (default_1$1)], ret: (daterange$1), isOperator: false }], args);
}
function daterangeCanonical(...args) {
    return sqlFunction("daterange_canonical", [{ args: [(daterange$1)], ret: (daterange$1), isOperator: false }], args);
}
function daterangeSubdiff(...args) {
    return sqlFunction("daterange_subdiff", [{ args: [(date$1), (date$1)], ret: (default_1$6), isOperator: false }], args);
}
function datetimePl(...args) {
    return sqlFunction("datetime_pl", [{ args: [(date$1), (time$1)], ret: (timestamp$1), isOperator: false }], args);
}
function datetimetzPl(...args) {
    return sqlFunction("datetimetz_pl", [{ args: [(date$1), (timetz$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function dcbrt(...args) {
    return sqlFunction("dcbrt", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function decode(...args) {
    return sqlFunction("decode", [{ args: [(default_1$1), (default_1$1)], ret: (bytea), isOperator: false }], args);
}
function degrees(...args) {
    return sqlFunction("degrees", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function denseRank(...args) {
    return sqlFunction("dense_rank", [{ args: [], ret: (default_1$3), isOperator: false }, { args: [(Any)], ret: (default_1$3), isOperator: false }], args);
}
function dexp(...args) {
    return sqlFunction("dexp", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function diagonal(...args) {
    return sqlFunction("diagonal", [{ args: [(box$1)], ret: (lseg$1), isOperator: false }], args);
}
function diameter(...args) {
    return sqlFunction("diameter", [{ args: [(circle$1)], ret: (default_1$6), isOperator: false }], args);
}
function distBp(...args) {
    return sqlFunction("dist_bp", [{ args: [(box$1), (point$1)], ret: (default_1$6), isOperator: false }], args);
}
function distBs(...args) {
    return sqlFunction("dist_bs", [{ args: [(box$1), (lseg$1)], ret: (default_1$6), isOperator: false }], args);
}
function distCpoint(...args) {
    return sqlFunction("dist_cpoint", [{ args: [(circle$1), (point$1)], ret: (default_1$6), isOperator: false }], args);
}
function distCpoly(...args) {
    return sqlFunction("dist_cpoly", [{ args: [(circle$1), (polygon$1)], ret: (default_1$6), isOperator: false }], args);
}
function distLp(...args) {
    return sqlFunction("dist_lp", [{ args: [(line$1), (point$1)], ret: (default_1$6), isOperator: false }], args);
}
function distLs(...args) {
    return sqlFunction("dist_ls", [{ args: [(line$1), (lseg$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPathp(...args) {
    return sqlFunction("dist_pathp", [{ args: [(path$1), (point$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPb(...args) {
    return sqlFunction("dist_pb", [{ args: [(point$1), (box$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPc(...args) {
    return sqlFunction("dist_pc", [{ args: [(point$1), (circle$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPl(...args) {
    return sqlFunction("dist_pl", [{ args: [(point$1), (line$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPolyc(...args) {
    return sqlFunction("dist_polyc", [{ args: [(polygon$1), (circle$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPolyp(...args) {
    return sqlFunction("dist_polyp", [{ args: [(polygon$1), (point$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPpath(...args) {
    return sqlFunction("dist_ppath", [{ args: [(point$1), (path$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPpoly(...args) {
    return sqlFunction("dist_ppoly", [{ args: [(point$1), (polygon$1)], ret: (default_1$6), isOperator: false }], args);
}
function distPs(...args) {
    return sqlFunction("dist_ps", [{ args: [(point$1), (lseg$1)], ret: (default_1$6), isOperator: false }], args);
}
function distSb(...args) {
    return sqlFunction("dist_sb", [{ args: [(lseg$1), (box$1)], ret: (default_1$6), isOperator: false }], args);
}
function distSl(...args) {
    return sqlFunction("dist_sl", [{ args: [(lseg$1), (line$1)], ret: (default_1$6), isOperator: false }], args);
}
function distSp(...args) {
    return sqlFunction("dist_sp", [{ args: [(lseg$1), (point$1)], ret: (default_1$6), isOperator: false }], args);
}
function div(...args) {
    return sqlFunction("div", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function dlog1(...args) {
    return sqlFunction("dlog1", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function dlog10(...args) {
    return sqlFunction("dlog10", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function dpow(...args) {
    return sqlFunction("dpow", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function dround(...args) {
    return sqlFunction("dround", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function dsqrt(...args) {
    return sqlFunction("dsqrt", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function dtrunc(...args) {
    return sqlFunction("dtrunc", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function elemContainedByMultirange(...args) {
    return sqlFunction("elem_contained_by_multirange", [({ T }) => ({ args: [T, anymultirange], ret: (default_1$8), isOperator: false })], args);
}
function elemContainedByRange(...args) {
    return sqlFunction("elem_contained_by_range", [({ T }) => ({ args: [T, anyrange], ret: (default_1$8), isOperator: false })], args);
}
function encode(...args) {
    return sqlFunction("encode", [{ args: [(bytea), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function enumCmp(...args) {
    return sqlFunction("enum_cmp", [({ T }) => ({ args: [T, T], ret: (default_1$4), isOperator: false })], args);
}
function enumEq(...args) {
    return sqlFunction("enum_eq", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], args);
}
function enumFirst(...args) {
    return sqlFunction("enum_first", [({ T }) => ({ args: [T], ret: T, isOperator: false })], args);
}
function enumGe(...args) {
    return sqlFunction("enum_ge", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], args);
}
function enumGt(...args) {
    return sqlFunction("enum_gt", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], args);
}
function enumLarger(...args) {
    return sqlFunction("enum_larger", [({ T }) => ({ args: [T, T], ret: T, isOperator: false })], args);
}
function enumLast(...args) {
    return sqlFunction("enum_last", [({ T }) => ({ args: [T], ret: T, isOperator: false })], args);
}
function enumLe(...args) {
    return sqlFunction("enum_le", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], args);
}
function enumLt(...args) {
    return sqlFunction("enum_lt", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], args);
}
function enumNe(...args) {
    return sqlFunction("enum_ne", [({ T }) => ({ args: [T, T], ret: (default_1$8), isOperator: false })], args);
}
function enumRange(...args) {
    return sqlFunction("enum_range", [({ T }) => ({ args: [T], ret: Array$1.of(T), isOperator: false }), ({ T }) => ({ args: [T, T], ret: Array$1.of(T), isOperator: false })], args);
}
function enumSmaller(...args) {
    return sqlFunction("enum_smaller", [({ T }) => ({ args: [T, T], ret: T, isOperator: false })], args);
}
function erf(...args) {
    return sqlFunction("erf", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function erfc(...args) {
    return sqlFunction("erfc", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function every(...args) {
    return sqlFunction("every", [{ args: [(default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function exp(...args) {
    return sqlFunction("exp", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function extract(...args) {
    return sqlFunction("extract", [{ args: [(default_1$1), (date$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (interval$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (time$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (timestamp$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (timestamptz$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$1), (timetz$1)], ret: (default_1$2), isOperator: false }], args);
}
function factorial(...args) {
    return sqlFunction("factorial", [{ args: [(default_1$3)], ret: (default_1$2), isOperator: false }], args);
}
function family(...args) {
    return sqlFunction("family", [{ args: [(inet)], ret: (default_1$4), isOperator: false }], args);
}
function firstValue(...args) {
    return sqlFunction("first_value", [({ T }) => ({ args: [T], ret: T, isOperator: false })], args);
}
function float4(...args) {
    return sqlFunction("float4", [{ args: [(default_1$6)], ret: (default_1$7), isOperator: false }, { args: [(default_1$5)], ret: (default_1$7), isOperator: false }, { args: [(default_1$4)], ret: (default_1$7), isOperator: false }, { args: [(default_1$3)], ret: (default_1$7), isOperator: false }, { args: [(jsonb)], ret: (default_1$7), isOperator: false }, { args: [(default_1$2)], ret: (default_1$7), isOperator: false }], args);
}
function float48Div(...args) {
    return sqlFunction("float48div", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float48Eq(...args) {
    return sqlFunction("float48eq", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float48Ge(...args) {
    return sqlFunction("float48ge", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float48Gt(...args) {
    return sqlFunction("float48gt", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float48Le(...args) {
    return sqlFunction("float48le", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float48Lt(...args) {
    return sqlFunction("float48lt", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float48Mi(...args) {
    return sqlFunction("float48mi", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float48Mul(...args) {
    return sqlFunction("float48mul", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float48Ne(...args) {
    return sqlFunction("float48ne", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float48Pl(...args) {
    return sqlFunction("float48pl", [{ args: [(default_1$7), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float4Accum(...args) {
    return sqlFunction("float4_accum", [{ args: [Array$1.of((default_1$6)), (default_1$7)], ret: Array$1.of((default_1$6)), isOperator: false }], args);
}
function float4Abs(...args) {
    return sqlFunction("float4abs", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float4Div(...args) {
    return sqlFunction("float4div", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float4Eq(...args) {
    return sqlFunction("float4eq", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float4Ge(...args) {
    return sqlFunction("float4ge", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float4Gt(...args) {
    return sqlFunction("float4gt", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float4Larger(...args) {
    return sqlFunction("float4larger", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float4Le(...args) {
    return sqlFunction("float4le", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float4Lt(...args) {
    return sqlFunction("float4lt", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float4Mi(...args) {
    return sqlFunction("float4mi", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float4Mul(...args) {
    return sqlFunction("float4mul", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float4Ne(...args) {
    return sqlFunction("float4ne", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float4Pl(...args) {
    return sqlFunction("float4pl", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float4Smaller(...args) {
    return sqlFunction("float4smaller", [{ args: [(default_1$7), (default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float4Um(...args) {
    return sqlFunction("float4um", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float4Up(...args) {
    return sqlFunction("float4up", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }], args);
}
function float8(...args) {
    return sqlFunction("float8", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$6), isOperator: false }, { args: [(default_1$4)], ret: (default_1$6), isOperator: false }, { args: [(default_1$3)], ret: (default_1$6), isOperator: false }, { args: [(jsonb)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$6), isOperator: false }], args);
}
function float84Div(...args) {
    return sqlFunction("float84div", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: false }], args);
}
function float84Eq(...args) {
    return sqlFunction("float84eq", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float84Ge(...args) {
    return sqlFunction("float84ge", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float84Gt(...args) {
    return sqlFunction("float84gt", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float84Le(...args) {
    return sqlFunction("float84le", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float84Lt(...args) {
    return sqlFunction("float84lt", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float84Mi(...args) {
    return sqlFunction("float84mi", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: false }], args);
}
function float84Mul(...args) {
    return sqlFunction("float84mul", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: false }], args);
}
function float84Ne(...args) {
    return sqlFunction("float84ne", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$8), isOperator: false }], args);
}
function float84Pl(...args) {
    return sqlFunction("float84pl", [{ args: [(default_1$6), (default_1$7)], ret: (default_1$6), isOperator: false }], args);
}
function float8Accum(...args) {
    return sqlFunction("float8_accum", [{ args: [Array$1.of((default_1$6)), (default_1$6)], ret: Array$1.of((default_1$6)), isOperator: false }], args);
}
function float8Avg(...args) {
    return sqlFunction("float8_avg", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8Combine(...args) {
    return sqlFunction("float8_combine", [{ args: [Array$1.of((default_1$6)), Array$1.of((default_1$6))], ret: Array$1.of((default_1$6)), isOperator: false }], args);
}
function float8Corr(...args) {
    return sqlFunction("float8_corr", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8CovarPop(...args) {
    return sqlFunction("float8_covar_pop", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8CovarSamp(...args) {
    return sqlFunction("float8_covar_samp", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8RegrAccum(...args) {
    return sqlFunction("float8_regr_accum", [{ args: [Array$1.of((default_1$6)), (default_1$6), (default_1$6)], ret: Array$1.of((default_1$6)), isOperator: false }], args);
}
function float8RegrAvgx(...args) {
    return sqlFunction("float8_regr_avgx", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8RegrAvgy(...args) {
    return sqlFunction("float8_regr_avgy", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8RegrCombine(...args) {
    return sqlFunction("float8_regr_combine", [{ args: [Array$1.of((default_1$6)), Array$1.of((default_1$6))], ret: Array$1.of((default_1$6)), isOperator: false }], args);
}
function float8RegrIntercept(...args) {
    return sqlFunction("float8_regr_intercept", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8RegrR2(...args) {
    return sqlFunction("float8_regr_r2", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8RegrSlope(...args) {
    return sqlFunction("float8_regr_slope", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8RegrSxx(...args) {
    return sqlFunction("float8_regr_sxx", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8RegrSxy(...args) {
    return sqlFunction("float8_regr_sxy", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8RegrSyy(...args) {
    return sqlFunction("float8_regr_syy", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8StddevPop(...args) {
    return sqlFunction("float8_stddev_pop", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8StddevSamp(...args) {
    return sqlFunction("float8_stddev_samp", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8VarPop(...args) {
    return sqlFunction("float8_var_pop", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8VarSamp(...args) {
    return sqlFunction("float8_var_samp", [{ args: [Array$1.of((default_1$6))], ret: (default_1$6), isOperator: false }], args);
}
function float8Abs(...args) {
    return sqlFunction("float8abs", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float8Div(...args) {
    return sqlFunction("float8div", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float8Eq(...args) {
    return sqlFunction("float8eq", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float8Ge(...args) {
    return sqlFunction("float8ge", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float8Gt(...args) {
    return sqlFunction("float8gt", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float8Larger(...args) {
    return sqlFunction("float8larger", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float8Le(...args) {
    return sqlFunction("float8le", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float8Lt(...args) {
    return sqlFunction("float8lt", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float8Mi(...args) {
    return sqlFunction("float8mi", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float8Mul(...args) {
    return sqlFunction("float8mul", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float8Ne(...args) {
    return sqlFunction("float8ne", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$8), isOperator: false }], args);
}
function float8Pl(...args) {
    return sqlFunction("float8pl", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float8Smaller(...args) {
    return sqlFunction("float8smaller", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float8Um(...args) {
    return sqlFunction("float8um", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function float8Up(...args) {
    return sqlFunction("float8up", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function floor(...args) {
    return sqlFunction("floor", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function flt4MulCash(...args) {
    return sqlFunction("flt4_mul_cash", [{ args: [(default_1$7), (money$1)], ret: (money$1), isOperator: false }], args);
}
function flt8MulCash(...args) {
    return sqlFunction("flt8_mul_cash", [{ args: [(default_1$6), (money$1)], ret: (money$1), isOperator: false }], args);
}
function fmgrCValidator(...args) {
    return sqlFunction("fmgr_c_validator", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function fmgrInternalValidator(...args) {
    return sqlFunction("fmgr_internal_validator", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function fmgrSqlValidator(...args) {
    return sqlFunction("fmgr_sql_validator", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function format(...args) {
    return sqlFunction("format", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (Any)], ret: (default_1$1), isOperator: false }], args);
}
function formatType(...args) {
    return sqlFunction("format_type", [{ args: [(oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function gcd(...args) {
    return sqlFunction("gcd", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function genRandomUuid(...args) {
    return sqlFunction("gen_random_uuid", [{ args: [], ret: (uuid), isOperator: false }], args);
}
function generateSeries(...args) {
    return sqlFunction("generate_series", [{ args: [(default_1$4), (default_1$4)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$4)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$3), (default_1$3)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$3), (default_1$3), (default_1$3)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$2), (default_1$2), (default_1$2)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(timestamp$1), (timestamp$1), (interval$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (interval$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (interval$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function generateSubscripts(...args) {
    return sqlFunction("generate_subscripts", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: Setof.ofSchema({}), isOperator: false }), ({ T }) => ({ args: [Array$1.of(T), (default_1$4), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false })], args);
}
function getBit(...args) {
    return sqlFunction("get_bit", [{ args: [(bit$1), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(bytea), (default_1$3)], ret: (default_1$4), isOperator: false }], args);
}
function getByte(...args) {
    return sqlFunction("get_byte", [{ args: [(bytea), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function getCurrentTsConfig(...args) {
    return sqlFunction("get_current_ts_config", [{ args: [], ret: (regconfig), isOperator: false }], args);
}
function getdatabaseencoding(...args) {
    return sqlFunction("getdatabaseencoding", [{ args: [], ret: (name$1), isOperator: false }], args);
}
function getpgusername(...args) {
    return sqlFunction("getpgusername", [{ args: [], ret: (name$1), isOperator: false }], args);
}
function ginCleanPendingList(...args) {
    return sqlFunction("gin_clean_pending_list", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], args);
}
function ginCmpTslexeme(...args) {
    return sqlFunction("gin_cmp_tslexeme", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function ginCompareJsonb(...args) {
    return sqlFunction("gin_compare_jsonb", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function hasAnyColumnPrivilege(...args) {
    return sqlFunction("has_any_column_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasColumnPrivilege(...args) {
    return sqlFunction("has_column_privilege", [{ args: [(name$1), (oid$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$5), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasDatabasePrivilege(...args) {
    return sqlFunction("has_database_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasForeignDataWrapperPrivilege(...args) {
    return sqlFunction("has_foreign_data_wrapper_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasFunctionPrivilege(...args) {
    return sqlFunction("has_function_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasLanguagePrivilege(...args) {
    return sqlFunction("has_language_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasParameterPrivilege(...args) {
    return sqlFunction("has_parameter_privilege", [{ args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasSchemaPrivilege(...args) {
    return sqlFunction("has_schema_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasSequencePrivilege(...args) {
    return sqlFunction("has_sequence_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasServerPrivilege(...args) {
    return sqlFunction("has_server_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasTablePrivilege(...args) {
    return sqlFunction("has_table_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasTablespacePrivilege(...args) {
    return sqlFunction("has_tablespace_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hasTypePrivilege(...args) {
    return sqlFunction("has_type_privilege", [{ args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function hashAclitem(...args) {
    return sqlFunction("hash_aclitem", [{ args: [(aclitem)], ret: (default_1$4), isOperator: false }], args);
}
function hashAclitemExtended(...args) {
    return sqlFunction("hash_aclitem_extended", [{ args: [(aclitem), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashArray(...args) {
    return sqlFunction("hash_array", [({ T }) => ({ args: [Array$1.of(T)], ret: (default_1$4), isOperator: false })], args);
}
function hashArrayExtended(...args) {
    return sqlFunction("hash_array_extended", [({ T }) => ({ args: [Array$1.of(T), (default_1$3)], ret: (default_1$3), isOperator: false })], args);
}
function hashMultirange(...args) {
    return sqlFunction("hash_multirange", [{ args: [anymultirange], ret: (default_1$4), isOperator: false }], args);
}
function hashMultirangeExtended(...args) {
    return sqlFunction("hash_multirange_extended", [{ args: [anymultirange, (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashNumeric(...args) {
    return sqlFunction("hash_numeric", [{ args: [(default_1$2)], ret: (default_1$4), isOperator: false }], args);
}
function hashNumericExtended(...args) {
    return sqlFunction("hash_numeric_extended", [{ args: [(default_1$2), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashRange(...args) {
    return sqlFunction("hash_range", [{ args: [anyrange], ret: (default_1$4), isOperator: false }], args);
}
function hashRangeExtended(...args) {
    return sqlFunction("hash_range_extended", [{ args: [anyrange, (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashRecord(...args) {
    return sqlFunction("hash_record", [({ R }) => ({ args: [Record.of(R)], ret: (default_1$4), isOperator: false })], args);
}
function hashRecordExtended(...args) {
    return sqlFunction("hash_record_extended", [({ R }) => ({ args: [Record.of(R), (default_1$3)], ret: (default_1$3), isOperator: false })], args);
}
function hashbpchar(...args) {
    return sqlFunction("hashbpchar", [{ args: [(bpchar$1)], ret: (default_1$4), isOperator: false }], args);
}
function hashbpcharextended(...args) {
    return sqlFunction("hashbpcharextended", [{ args: [(bpchar$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashchar(...args) {
    return sqlFunction("hashchar", [{ args: [(char$1)], ret: (default_1$4), isOperator: false }], args);
}
function hashcharextended(...args) {
    return sqlFunction("hashcharextended", [{ args: [(char$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashenum(...args) {
    return sqlFunction("hashenum", [({ T }) => ({ args: [T], ret: (default_1$4), isOperator: false })], args);
}
function hashenumextended(...args) {
    return sqlFunction("hashenumextended", [({ T }) => ({ args: [T, (default_1$3)], ret: (default_1$3), isOperator: false })], args);
}
function hashfloat4(...args) {
    return sqlFunction("hashfloat4", [{ args: [(default_1$7)], ret: (default_1$4), isOperator: false }], args);
}
function hashfloat4Extended(...args) {
    return sqlFunction("hashfloat4extended", [{ args: [(default_1$7), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashfloat8(...args) {
    return sqlFunction("hashfloat8", [{ args: [(default_1$6)], ret: (default_1$4), isOperator: false }], args);
}
function hashfloat8Extended(...args) {
    return sqlFunction("hashfloat8extended", [{ args: [(default_1$6), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashinet(...args) {
    return sqlFunction("hashinet", [{ args: [(inet)], ret: (default_1$4), isOperator: false }], args);
}
function hashinetextended(...args) {
    return sqlFunction("hashinetextended", [{ args: [(inet), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashint2(...args) {
    return sqlFunction("hashint2", [{ args: [(default_1$5)], ret: (default_1$4), isOperator: false }], args);
}
function hashint2Extended(...args) {
    return sqlFunction("hashint2extended", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashint4(...args) {
    return sqlFunction("hashint4", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function hashint4Extended(...args) {
    return sqlFunction("hashint4extended", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashint8(...args) {
    return sqlFunction("hashint8", [{ args: [(default_1$3)], ret: (default_1$4), isOperator: false }], args);
}
function hashint8Extended(...args) {
    return sqlFunction("hashint8extended", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashmacaddr(...args) {
    return sqlFunction("hashmacaddr", [{ args: [(macaddr$1)], ret: (default_1$4), isOperator: false }], args);
}
function hashmacaddr8(...args) {
    return sqlFunction("hashmacaddr8", [{ args: [(macaddr8$1)], ret: (default_1$4), isOperator: false }], args);
}
function hashmacaddr8Extended(...args) {
    return sqlFunction("hashmacaddr8extended", [{ args: [(macaddr8$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashmacaddrextended(...args) {
    return sqlFunction("hashmacaddrextended", [{ args: [(macaddr$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashname(...args) {
    return sqlFunction("hashname", [{ args: [(name$1)], ret: (default_1$4), isOperator: false }], args);
}
function hashnameextended(...args) {
    return sqlFunction("hashnameextended", [{ args: [(name$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashoid(...args) {
    return sqlFunction("hashoid", [{ args: [(oid$1)], ret: (default_1$4), isOperator: false }], args);
}
function hashoidextended(...args) {
    return sqlFunction("hashoidextended", [{ args: [(oid$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashoidvector(...args) {
    return sqlFunction("hashoidvector", [{ args: [(oidvector)], ret: (default_1$4), isOperator: false }], args);
}
function hashoidvectorextended(...args) {
    return sqlFunction("hashoidvectorextended", [{ args: [(oidvector), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashtext(...args) {
    return sqlFunction("hashtext", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function hashtextextended(...args) {
    return sqlFunction("hashtextextended", [{ args: [(default_1$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function hashtid(...args) {
    return sqlFunction("hashtid", [{ args: [(tid)], ret: (default_1$4), isOperator: false }], args);
}
function hashtidextended(...args) {
    return sqlFunction("hashtidextended", [{ args: [(tid), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function height(...args) {
    return sqlFunction("height", [{ args: [(box$1)], ret: (default_1$6), isOperator: false }], args);
}
function host(...args) {
    return sqlFunction("host", [{ args: [(inet)], ret: (default_1$1), isOperator: false }], args);
}
function hostmask(...args) {
    return sqlFunction("hostmask", [{ args: [(inet)], ret: (inet), isOperator: false }], args);
}
function icuUnicodeVersion(...args) {
    return sqlFunction("icu_unicode_version", [{ args: [], ret: (default_1$1), isOperator: false }], args);
}
function inRange(...args) {
    return sqlFunction("in_range", [{ args: [(date$1), (date$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$7), (default_1$7), (default_1$6), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$6), (default_1$6), (default_1$6), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$5), (default_1$5), (default_1$5), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$5), (default_1$5), (default_1$4), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$5), (default_1$5), (default_1$3), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$5), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$4), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$3), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$3), (default_1$3), (default_1$3), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(interval$1), (interval$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(default_1$2), (default_1$2), (default_1$2), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(time$1), (time$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1), (timestamp$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }, { args: [(timetz$1), (timetz$1), (interval$1), (default_1$8), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function inetClientAddr(...args) {
    return sqlFunction("inet_client_addr", [{ args: [], ret: (inet), isOperator: false }], args);
}
function inetClientPort(...args) {
    return sqlFunction("inet_client_port", [{ args: [], ret: (default_1$4), isOperator: false }], args);
}
function inetMerge(...args) {
    return sqlFunction("inet_merge", [{ args: [(inet), (inet)], ret: (cidr$1), isOperator: false }], args);
}
function inetSameFamily(...args) {
    return sqlFunction("inet_same_family", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function inetServerAddr(...args) {
    return sqlFunction("inet_server_addr", [{ args: [], ret: (inet), isOperator: false }], args);
}
function inetServerPort(...args) {
    return sqlFunction("inet_server_port", [{ args: [], ret: (default_1$4), isOperator: false }], args);
}
function inetand(...args) {
    return sqlFunction("inetand", [{ args: [(inet), (inet)], ret: (inet), isOperator: false }], args);
}
function inetmi(...args) {
    return sqlFunction("inetmi", [{ args: [(inet), (inet)], ret: (default_1$3), isOperator: false }], args);
}
function inetmiInt8(...args) {
    return sqlFunction("inetmi_int8", [{ args: [(inet), (default_1$3)], ret: (inet), isOperator: false }], args);
}
function inetnot(...args) {
    return sqlFunction("inetnot", [{ args: [(inet)], ret: (inet), isOperator: false }], args);
}
function inetor(...args) {
    return sqlFunction("inetor", [{ args: [(inet), (inet)], ret: (inet), isOperator: false }], args);
}
function inetpl(...args) {
    return sqlFunction("inetpl", [{ args: [(inet), (default_1$3)], ret: (inet), isOperator: false }], args);
}
function initcap(...args) {
    return sqlFunction("initcap", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function int2(...args) {
    return sqlFunction("int2", [{ args: [(default_1$7)], ret: (default_1$5), isOperator: false }, { args: [(default_1$6)], ret: (default_1$5), isOperator: false }, { args: [(default_1$4)], ret: (default_1$5), isOperator: false }, { args: [(default_1$3)], ret: (default_1$5), isOperator: false }, { args: [(jsonb)], ret: (default_1$5), isOperator: false }, { args: [(default_1$2)], ret: (default_1$5), isOperator: false }], args);
}
function int24Div(...args) {
    return sqlFunction("int24div", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int24Eq(...args) {
    return sqlFunction("int24eq", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int24Ge(...args) {
    return sqlFunction("int24ge", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int24Gt(...args) {
    return sqlFunction("int24gt", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int24Le(...args) {
    return sqlFunction("int24le", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int24Lt(...args) {
    return sqlFunction("int24lt", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int24Mi(...args) {
    return sqlFunction("int24mi", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int24Mul(...args) {
    return sqlFunction("int24mul", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int24Ne(...args) {
    return sqlFunction("int24ne", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int24Pl(...args) {
    return sqlFunction("int24pl", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int28Div(...args) {
    return sqlFunction("int28div", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int28Eq(...args) {
    return sqlFunction("int28eq", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int28Ge(...args) {
    return sqlFunction("int28ge", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int28Gt(...args) {
    return sqlFunction("int28gt", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int28Le(...args) {
    return sqlFunction("int28le", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int28Lt(...args) {
    return sqlFunction("int28lt", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int28Mi(...args) {
    return sqlFunction("int28mi", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int28Mul(...args) {
    return sqlFunction("int28mul", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int28Ne(...args) {
    return sqlFunction("int28ne", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int28Pl(...args) {
    return sqlFunction("int28pl", [{ args: [(default_1$5), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int2AvgAccum(...args) {
    return sqlFunction("int2_avg_accum", [{ args: [Array$1.of((default_1$3)), (default_1$5)], ret: Array$1.of((default_1$3)), isOperator: false }], args);
}
function int2AvgAccumInv(...args) {
    return sqlFunction("int2_avg_accum_inv", [{ args: [Array$1.of((default_1$3)), (default_1$5)], ret: Array$1.of((default_1$3)), isOperator: false }], args);
}
function int2MulCash(...args) {
    return sqlFunction("int2_mul_cash", [{ args: [(default_1$5), (money$1)], ret: (money$1), isOperator: false }], args);
}
function int2Sum(...args) {
    return sqlFunction("int2_sum", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], args);
}
function int2Abs(...args) {
    return sqlFunction("int2abs", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2And(...args) {
    return sqlFunction("int2and", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Div(...args) {
    return sqlFunction("int2div", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Eq(...args) {
    return sqlFunction("int2eq", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int2Ge(...args) {
    return sqlFunction("int2ge", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int2Gt(...args) {
    return sqlFunction("int2gt", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int2Int4Sum(...args) {
    return sqlFunction("int2int4_sum", [{ args: [Array$1.of((default_1$3))], ret: (default_1$3), isOperator: false }], args);
}
function int2Larger(...args) {
    return sqlFunction("int2larger", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Le(...args) {
    return sqlFunction("int2le", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int2Lt(...args) {
    return sqlFunction("int2lt", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int2Mi(...args) {
    return sqlFunction("int2mi", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Mod(...args) {
    return sqlFunction("int2mod", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Mul(...args) {
    return sqlFunction("int2mul", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Ne(...args) {
    return sqlFunction("int2ne", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int2Not(...args) {
    return sqlFunction("int2not", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Or(...args) {
    return sqlFunction("int2or", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Pl(...args) {
    return sqlFunction("int2pl", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Shl(...args) {
    return sqlFunction("int2shl", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$5), isOperator: false }], args);
}
function int2Shr(...args) {
    return sqlFunction("int2shr", [{ args: [(default_1$5), (default_1$4)], ret: (default_1$5), isOperator: false }], args);
}
function int2Smaller(...args) {
    return sqlFunction("int2smaller", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Um(...args) {
    return sqlFunction("int2um", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Up(...args) {
    return sqlFunction("int2up", [{ args: [(default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int2Xor(...args) {
    return sqlFunction("int2xor", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }], args);
}
function int4(...args) {
    return sqlFunction("int4", [{ args: [(bit$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$8)], ret: (default_1$4), isOperator: false }, { args: [(char$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$7)], ret: (default_1$4), isOperator: false }, { args: [(default_1$6)], ret: (default_1$4), isOperator: false }, { args: [(default_1$5)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3)], ret: (default_1$4), isOperator: false }, { args: [(jsonb)], ret: (default_1$4), isOperator: false }, { args: [(default_1$2)], ret: (default_1$4), isOperator: false }], args);
}
function int42Div(...args) {
    return sqlFunction("int42div", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], args);
}
function int42Eq(...args) {
    return sqlFunction("int42eq", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int42Ge(...args) {
    return sqlFunction("int42ge", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int42Gt(...args) {
    return sqlFunction("int42gt", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int42Le(...args) {
    return sqlFunction("int42le", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int42Lt(...args) {
    return sqlFunction("int42lt", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int42Mi(...args) {
    return sqlFunction("int42mi", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], args);
}
function int42Mul(...args) {
    return sqlFunction("int42mul", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], args);
}
function int42Ne(...args) {
    return sqlFunction("int42ne", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int42Pl(...args) {
    return sqlFunction("int42pl", [{ args: [(default_1$4), (default_1$5)], ret: (default_1$4), isOperator: false }], args);
}
function int48Div(...args) {
    return sqlFunction("int48div", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int48Eq(...args) {
    return sqlFunction("int48eq", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int48Ge(...args) {
    return sqlFunction("int48ge", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int48Gt(...args) {
    return sqlFunction("int48gt", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int48Le(...args) {
    return sqlFunction("int48le", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int48Lt(...args) {
    return sqlFunction("int48lt", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int48Mi(...args) {
    return sqlFunction("int48mi", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int48Mul(...args) {
    return sqlFunction("int48mul", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int48Ne(...args) {
    return sqlFunction("int48ne", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int48Pl(...args) {
    return sqlFunction("int48pl", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int4AvgAccum(...args) {
    return sqlFunction("int4_avg_accum", [{ args: [Array$1.of((default_1$3)), (default_1$4)], ret: Array$1.of((default_1$3)), isOperator: false }], args);
}
function int4AvgAccumInv(...args) {
    return sqlFunction("int4_avg_accum_inv", [{ args: [Array$1.of((default_1$3)), (default_1$4)], ret: Array$1.of((default_1$3)), isOperator: false }], args);
}
function int4AvgCombine(...args) {
    return sqlFunction("int4_avg_combine", [{ args: [Array$1.of((default_1$3)), Array$1.of((default_1$3))], ret: Array$1.of((default_1$3)), isOperator: false }], args);
}
function int4MulCash(...args) {
    return sqlFunction("int4_mul_cash", [{ args: [(default_1$4), (money$1)], ret: (money$1), isOperator: false }], args);
}
function int4Sum(...args) {
    return sqlFunction("int4_sum", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function int4Abs(...args) {
    return sqlFunction("int4abs", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4And(...args) {
    return sqlFunction("int4and", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Div(...args) {
    return sqlFunction("int4div", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Eq(...args) {
    return sqlFunction("int4eq", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int4Ge(...args) {
    return sqlFunction("int4ge", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int4Gt(...args) {
    return sqlFunction("int4gt", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int4Inc(...args) {
    return sqlFunction("int4inc", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Larger(...args) {
    return sqlFunction("int4larger", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Le(...args) {
    return sqlFunction("int4le", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int4Lt(...args) {
    return sqlFunction("int4lt", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int4Mi(...args) {
    return sqlFunction("int4mi", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Mod(...args) {
    return sqlFunction("int4mod", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Mul(...args) {
    return sqlFunction("int4mul", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Multirange(...args) {
    return sqlFunction("int4multirange", [{ args: [], ret: (int4multirange), isOperator: false }, { args: [Array$1.of((int4range))], ret: (int4multirange), isOperator: false }, { args: [(int4range)], ret: (int4multirange), isOperator: false }], args);
}
function int4Ne(...args) {
    return sqlFunction("int4ne", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int4Not(...args) {
    return sqlFunction("int4not", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Or(...args) {
    return sqlFunction("int4or", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Pl(...args) {
    return sqlFunction("int4pl", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Range(...args) {
    return sqlFunction("int4range", [{ args: [(default_1$4), (default_1$4)], ret: (int4range), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$1)], ret: (int4range), isOperator: false }], args);
}
function int4RangeCanonical(...args) {
    return sqlFunction("int4range_canonical", [{ args: [(int4range)], ret: (int4range), isOperator: false }], args);
}
function int4RangeSubdiff(...args) {
    return sqlFunction("int4range_subdiff", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$6), isOperator: false }], args);
}
function int4Shl(...args) {
    return sqlFunction("int4shl", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Shr(...args) {
    return sqlFunction("int4shr", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Smaller(...args) {
    return sqlFunction("int4smaller", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Um(...args) {
    return sqlFunction("int4um", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Up(...args) {
    return sqlFunction("int4up", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int4Xor(...args) {
    return sqlFunction("int4xor", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function int8(...args) {
    return sqlFunction("int8", [{ args: [(bit$1)], ret: (default_1$3), isOperator: false }, { args: [(default_1$7)], ret: (default_1$3), isOperator: false }, { args: [(default_1$6)], ret: (default_1$3), isOperator: false }, { args: [(default_1$5)], ret: (default_1$3), isOperator: false }, { args: [(default_1$4)], ret: (default_1$3), isOperator: false }, { args: [(jsonb)], ret: (default_1$3), isOperator: false }, { args: [(default_1$2)], ret: (default_1$3), isOperator: false }, { args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function int82Div(...args) {
    return sqlFunction("int82div", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], args);
}
function int82Eq(...args) {
    return sqlFunction("int82eq", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int82Ge(...args) {
    return sqlFunction("int82ge", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int82Gt(...args) {
    return sqlFunction("int82gt", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int82Le(...args) {
    return sqlFunction("int82le", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int82Lt(...args) {
    return sqlFunction("int82lt", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int82Mi(...args) {
    return sqlFunction("int82mi", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], args);
}
function int82Mul(...args) {
    return sqlFunction("int82mul", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], args);
}
function int82Ne(...args) {
    return sqlFunction("int82ne", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$8), isOperator: false }], args);
}
function int82Pl(...args) {
    return sqlFunction("int82pl", [{ args: [(default_1$3), (default_1$5)], ret: (default_1$3), isOperator: false }], args);
}
function int84Div(...args) {
    return sqlFunction("int84div", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function int84Eq(...args) {
    return sqlFunction("int84eq", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int84Ge(...args) {
    return sqlFunction("int84ge", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int84Gt(...args) {
    return sqlFunction("int84gt", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int84Le(...args) {
    return sqlFunction("int84le", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int84Lt(...args) {
    return sqlFunction("int84lt", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int84Mi(...args) {
    return sqlFunction("int84mi", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function int84Mul(...args) {
    return sqlFunction("int84mul", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function int84Ne(...args) {
    return sqlFunction("int84ne", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function int84Pl(...args) {
    return sqlFunction("int84pl", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function int8Avg(...args) {
    return sqlFunction("int8_avg", [{ args: [Array$1.of((default_1$3))], ret: (default_1$2), isOperator: false }], args);
}
function int8MulCash(...args) {
    return sqlFunction("int8_mul_cash", [{ args: [(default_1$3), (money$1)], ret: (money$1), isOperator: false }], args);
}
function int8Sum(...args) {
    return sqlFunction("int8_sum", [{ args: [(default_1$2), (default_1$3)], ret: (default_1$2), isOperator: false }], args);
}
function int8Abs(...args) {
    return sqlFunction("int8abs", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8And(...args) {
    return sqlFunction("int8and", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Dec(...args) {
    return sqlFunction("int8dec", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8DecAny(...args) {
    return sqlFunction("int8dec_any", [{ args: [(default_1$3), (Any)], ret: (default_1$3), isOperator: false }], args);
}
function int8Div(...args) {
    return sqlFunction("int8div", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Eq(...args) {
    return sqlFunction("int8eq", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int8Ge(...args) {
    return sqlFunction("int8ge", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int8Gt(...args) {
    return sqlFunction("int8gt", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int8Inc(...args) {
    return sqlFunction("int8inc", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8IncAny(...args) {
    return sqlFunction("int8inc_any", [{ args: [(default_1$3), (Any)], ret: (default_1$3), isOperator: false }], args);
}
function int8IncFloat8Float8(...args) {
    return sqlFunction("int8inc_float8_float8", [{ args: [(default_1$3), (default_1$6), (default_1$6)], ret: (default_1$3), isOperator: false }], args);
}
function int8Larger(...args) {
    return sqlFunction("int8larger", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Le(...args) {
    return sqlFunction("int8le", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int8Lt(...args) {
    return sqlFunction("int8lt", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int8Mi(...args) {
    return sqlFunction("int8mi", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Mod(...args) {
    return sqlFunction("int8mod", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Mul(...args) {
    return sqlFunction("int8mul", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Multirange(...args) {
    return sqlFunction("int8multirange", [{ args: [], ret: (int8multirange), isOperator: false }, { args: [Array$1.of((int8range))], ret: (int8multirange), isOperator: false }, { args: [(int8range)], ret: (int8multirange), isOperator: false }], args);
}
function int8Ne(...args) {
    return sqlFunction("int8ne", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function int8Not(...args) {
    return sqlFunction("int8not", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Or(...args) {
    return sqlFunction("int8or", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Pl(...args) {
    return sqlFunction("int8pl", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8PlInet(...args) {
    return sqlFunction("int8pl_inet", [{ args: [(default_1$3), (inet)], ret: (inet), isOperator: false }], args);
}
function int8Range(...args) {
    return sqlFunction("int8range", [{ args: [(default_1$3), (default_1$3)], ret: (int8range), isOperator: false }, { args: [(default_1$3), (default_1$3), (default_1$1)], ret: (int8range), isOperator: false }], args);
}
function int8RangeCanonical(...args) {
    return sqlFunction("int8range_canonical", [{ args: [(int8range)], ret: (int8range), isOperator: false }], args);
}
function int8RangeSubdiff(...args) {
    return sqlFunction("int8range_subdiff", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$6), isOperator: false }], args);
}
function int8Shl(...args) {
    return sqlFunction("int8shl", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function int8Shr(...args) {
    return sqlFunction("int8shr", [{ args: [(default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function int8Smaller(...args) {
    return sqlFunction("int8smaller", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Um(...args) {
    return sqlFunction("int8um", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Up(...args) {
    return sqlFunction("int8up", [{ args: [(default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function int8Xor(...args) {
    return sqlFunction("int8xor", [{ args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function integerPlDate(...args) {
    return sqlFunction("integer_pl_date", [{ args: [(default_1$4), (date$1)], ret: (date$1), isOperator: false }], args);
}
function interLb(...args) {
    return sqlFunction("inter_lb", [{ args: [(line$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function interSb(...args) {
    return sqlFunction("inter_sb", [{ args: [(lseg$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function interSl(...args) {
    return sqlFunction("inter_sl", [{ args: [(lseg$1), (line$1)], ret: (default_1$8), isOperator: false }], args);
}
function interval(...args) {
    return sqlFunction("interval", [{ args: [(interval$1), (default_1$4)], ret: (interval$1), isOperator: false }, { args: [(time$1)], ret: (interval$1), isOperator: false }], args);
}
function intervalCmp(...args) {
    return sqlFunction("interval_cmp", [{ args: [(interval$1), (interval$1)], ret: (default_1$4), isOperator: false }], args);
}
function intervalDiv(...args) {
    return sqlFunction("interval_div", [{ args: [(interval$1), (default_1$6)], ret: (interval$1), isOperator: false }], args);
}
function intervalEq(...args) {
    return sqlFunction("interval_eq", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], args);
}
function intervalGe(...args) {
    return sqlFunction("interval_ge", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], args);
}
function intervalGt(...args) {
    return sqlFunction("interval_gt", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], args);
}
function intervalHash(...args) {
    return sqlFunction("interval_hash", [{ args: [(interval$1)], ret: (default_1$4), isOperator: false }], args);
}
function intervalHashExtended(...args) {
    return sqlFunction("interval_hash_extended", [{ args: [(interval$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function intervalLarger(...args) {
    return sqlFunction("interval_larger", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: false }], args);
}
function intervalLe(...args) {
    return sqlFunction("interval_le", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], args);
}
function intervalLt(...args) {
    return sqlFunction("interval_lt", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], args);
}
function intervalMi(...args) {
    return sqlFunction("interval_mi", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: false }], args);
}
function intervalMul(...args) {
    return sqlFunction("interval_mul", [{ args: [(interval$1), (default_1$6)], ret: (interval$1), isOperator: false }], args);
}
function intervalNe(...args) {
    return sqlFunction("interval_ne", [{ args: [(interval$1), (interval$1)], ret: (default_1$8), isOperator: false }], args);
}
function intervalPl(...args) {
    return sqlFunction("interval_pl", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: false }], args);
}
function intervalPlDate(...args) {
    return sqlFunction("interval_pl_date", [{ args: [(interval$1), (date$1)], ret: (timestamp$1), isOperator: false }], args);
}
function intervalPlTime(...args) {
    return sqlFunction("interval_pl_time", [{ args: [(interval$1), (time$1)], ret: (time$1), isOperator: false }], args);
}
function intervalPlTimestamp(...args) {
    return sqlFunction("interval_pl_timestamp", [{ args: [(interval$1), (timestamp$1)], ret: (timestamp$1), isOperator: false }], args);
}
function intervalPlTimestamptz(...args) {
    return sqlFunction("interval_pl_timestamptz", [{ args: [(interval$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function intervalPlTimetz(...args) {
    return sqlFunction("interval_pl_timetz", [{ args: [(interval$1), (timetz$1)], ret: (timetz$1), isOperator: false }], args);
}
function intervalSmaller(...args) {
    return sqlFunction("interval_smaller", [{ args: [(interval$1), (interval$1)], ret: (interval$1), isOperator: false }], args);
}
function intervalUm(...args) {
    return sqlFunction("interval_um", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], args);
}
function isNormalized(...args) {
    return sqlFunction("is_normalized", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function isclosed(...args) {
    return sqlFunction("isclosed", [{ args: [(path$1)], ret: (default_1$8), isOperator: false }], args);
}
function isempty(...args) {
    return sqlFunction("isempty", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }, { args: [anyrange], ret: (default_1$8), isOperator: false }], args);
}
function isfinite(...args) {
    return sqlFunction("isfinite", [{ args: [(date$1)], ret: (default_1$8), isOperator: false }, { args: [(interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function ishorizontal(...args) {
    return sqlFunction("ishorizontal", [{ args: [(line$1)], ret: (default_1$8), isOperator: false }, { args: [(lseg$1)], ret: (default_1$8), isOperator: false }, { args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function isopen(...args) {
    return sqlFunction("isopen", [{ args: [(path$1)], ret: (default_1$8), isOperator: false }], args);
}
function isparallel(...args) {
    return sqlFunction("isparallel", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }, { args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function isperp(...args) {
    return sqlFunction("isperp", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }, { args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function isvertical(...args) {
    return sqlFunction("isvertical", [{ args: [(line$1)], ret: (default_1$8), isOperator: false }, { args: [(lseg$1)], ret: (default_1$8), isOperator: false }, { args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function jsonAgg(...args) {
    return sqlFunction("json_agg", [({ T }) => ({ args: [T], ret: (json), isOperator: false })], args);
}
function jsonAggStrict(...args) {
    return sqlFunction("json_agg_strict", [({ T }) => ({ args: [T], ret: (json), isOperator: false })], args);
}
function jsonArrayElement(...args) {
    return sqlFunction("json_array_element", [{ args: [(json), (default_1$4)], ret: (json), isOperator: false }], args);
}
function jsonArrayElementText(...args) {
    return sqlFunction("json_array_element_text", [{ args: [(json), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function jsonArrayElements(...args) {
    return sqlFunction("json_array_elements", [{ args: [(json)], ret: Setof.ofSchema({ value: (json) }), isOperator: false }], args);
}
function jsonArrayElementsText(...args) {
    return sqlFunction("json_array_elements_text", [{ args: [(json)], ret: Setof.ofSchema({ value: (default_1$1) }), isOperator: false }], args);
}
function jsonArrayLength(...args) {
    return sqlFunction("json_array_length", [{ args: [(json)], ret: (default_1$4), isOperator: false }], args);
}
function jsonBuildArray(...args) {
    return sqlFunction("json_build_array", [{ args: [], ret: (json), isOperator: false }, { args: [(Any)], ret: (json), isOperator: false }], args);
}
function jsonBuildObject(...args) {
    return sqlFunction("json_build_object", [{ args: [], ret: (json), isOperator: false }, { args: [(Any)], ret: (json), isOperator: false }], args);
}
function jsonEach(...args) {
    return sqlFunction("json_each", [{ args: [(json)], ret: Setof.ofSchema({ key: (default_1$1), value: (json) }), isOperator: false }], args);
}
function jsonEachText(...args) {
    return sqlFunction("json_each_text", [{ args: [(json)], ret: Setof.ofSchema({ key: (default_1$1), value: (default_1$1) }), isOperator: false }], args);
}
function jsonExtractPath(...args) {
    return sqlFunction("json_extract_path", [{ args: [(json), Array$1.of((default_1$1))], ret: (json), isOperator: false }], args);
}
function jsonExtractPathText(...args) {
    return sqlFunction("json_extract_path_text", [{ args: [(json), Array$1.of((default_1$1))], ret: (default_1$1), isOperator: false }], args);
}
function jsonObject(...args) {
    return sqlFunction("json_object", [{ args: [Array$1.of((default_1$1))], ret: (json), isOperator: false }, { args: [Array$1.of((default_1$1)), Array$1.of((default_1$1))], ret: (json), isOperator: false }], args);
}
function jsonObjectAgg(...args) {
    return sqlFunction("json_object_agg", [{ args: [(Any), (Any)], ret: (json), isOperator: false }], args);
}
function jsonObjectAggStrict(...args) {
    return sqlFunction("json_object_agg_strict", [{ args: [(Any), (Any)], ret: (json), isOperator: false }], args);
}
function jsonObjectAggUnique(...args) {
    return sqlFunction("json_object_agg_unique", [{ args: [(Any), (Any)], ret: (json), isOperator: false }], args);
}
function jsonObjectAggUniqueStrict(...args) {
    return sqlFunction("json_object_agg_unique_strict", [{ args: [(Any), (Any)], ret: (json), isOperator: false }], args);
}
function jsonObjectField(...args) {
    return sqlFunction("json_object_field", [{ args: [(json), (default_1$1)], ret: (json), isOperator: false }], args);
}
function jsonObjectFieldText(...args) {
    return sqlFunction("json_object_field_text", [{ args: [(json), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function jsonObjectKeys(...args) {
    return sqlFunction("json_object_keys", [{ args: [(json)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function jsonPopulateRecord(...args) {
    return sqlFunction("json_populate_record", [({ T }) => ({ args: [T, (json), (default_1$8)], ret: T, isOperator: false })], args);
}
function jsonPopulateRecordset(...args) {
    return sqlFunction("json_populate_recordset", [({ T }) => ({ args: [T, (json), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false })], args);
}
function jsonStripNulls(...args) {
    return sqlFunction("json_strip_nulls", [{ args: [(json)], ret: (json), isOperator: false }], args);
}
function jsonToRecord(...args) {
    return sqlFunction("json_to_record", [({ R }) => ({ args: [(json)], ret: Record.of(R), isOperator: false })], args);
}
function jsonToRecordset(...args) {
    return sqlFunction("json_to_recordset", [{ args: [(json)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function jsonToTsvector(...args) {
    return sqlFunction("json_to_tsvector", [{ args: [(json), (jsonb)], ret: (tsvector), isOperator: false }, { args: [(regconfig), (json), (jsonb)], ret: (tsvector), isOperator: false }], args);
}
function jsonTypeof(...args) {
    return sqlFunction("json_typeof", [{ args: [(json)], ret: (default_1$1), isOperator: false }], args);
}
function jsonbAgg(...args) {
    return sqlFunction("jsonb_agg", [({ T }) => ({ args: [T], ret: (jsonb), isOperator: false })], args);
}
function jsonbAggStrict(...args) {
    return sqlFunction("jsonb_agg_strict", [({ T }) => ({ args: [T], ret: (jsonb), isOperator: false })], args);
}
function jsonbArrayElement(...args) {
    return sqlFunction("jsonb_array_element", [{ args: [(jsonb), (default_1$4)], ret: (jsonb), isOperator: false }], args);
}
function jsonbArrayElementText(...args) {
    return sqlFunction("jsonb_array_element_text", [{ args: [(jsonb), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function jsonbArrayElements(...args) {
    return sqlFunction("jsonb_array_elements", [{ args: [(jsonb)], ret: Setof.ofSchema({ value: (jsonb) }), isOperator: false }], args);
}
function jsonbArrayElementsText(...args) {
    return sqlFunction("jsonb_array_elements_text", [{ args: [(jsonb)], ret: Setof.ofSchema({ value: (default_1$1) }), isOperator: false }], args);
}
function jsonbArrayLength(...args) {
    return sqlFunction("jsonb_array_length", [{ args: [(jsonb)], ret: (default_1$4), isOperator: false }], args);
}
function jsonbBuildArray(...args) {
    return sqlFunction("jsonb_build_array", [{ args: [], ret: (jsonb), isOperator: false }, { args: [(Any)], ret: (jsonb), isOperator: false }], args);
}
function jsonbBuildObject(...args) {
    return sqlFunction("jsonb_build_object", [{ args: [], ret: (jsonb), isOperator: false }, { args: [(Any)], ret: (jsonb), isOperator: false }], args);
}
function jsonbCmp(...args) {
    return sqlFunction("jsonb_cmp", [{ args: [(jsonb), (jsonb)], ret: (default_1$4), isOperator: false }], args);
}
function jsonbConcat(...args) {
    return sqlFunction("jsonb_concat", [{ args: [(jsonb), (jsonb)], ret: (jsonb), isOperator: false }], args);
}
function jsonbContained(...args) {
    return sqlFunction("jsonb_contained", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbContains(...args) {
    return sqlFunction("jsonb_contains", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbDelete(...args) {
    return sqlFunction("jsonb_delete", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: false }, { args: [(jsonb), (default_1$4)], ret: (jsonb), isOperator: false }, { args: [(jsonb), (default_1$1)], ret: (jsonb), isOperator: false }], args);
}
function jsonbDeletePath(...args) {
    return sqlFunction("jsonb_delete_path", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: false }], args);
}
function jsonbEach(...args) {
    return sqlFunction("jsonb_each", [{ args: [(jsonb)], ret: Setof.ofSchema({ key: (default_1$1), value: (jsonb) }), isOperator: false }], args);
}
function jsonbEachText(...args) {
    return sqlFunction("jsonb_each_text", [{ args: [(jsonb)], ret: Setof.ofSchema({ key: (default_1$1), value: (default_1$1) }), isOperator: false }], args);
}
function jsonbEq(...args) {
    return sqlFunction("jsonb_eq", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbExists(...args) {
    return sqlFunction("jsonb_exists", [{ args: [(jsonb), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbExistsAll(...args) {
    return sqlFunction("jsonb_exists_all", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$8), isOperator: false }], args);
}
function jsonbExistsAny(...args) {
    return sqlFunction("jsonb_exists_any", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$8), isOperator: false }], args);
}
function jsonbExtractPath(...args) {
    return sqlFunction("jsonb_extract_path", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (jsonb), isOperator: false }], args);
}
function jsonbExtractPathText(...args) {
    return sqlFunction("jsonb_extract_path_text", [{ args: [(jsonb), Array$1.of((default_1$1))], ret: (default_1$1), isOperator: false }], args);
}
function jsonbGe(...args) {
    return sqlFunction("jsonb_ge", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbGt(...args) {
    return sqlFunction("jsonb_gt", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbHash(...args) {
    return sqlFunction("jsonb_hash", [{ args: [(jsonb)], ret: (default_1$4), isOperator: false }], args);
}
function jsonbHashExtended(...args) {
    return sqlFunction("jsonb_hash_extended", [{ args: [(jsonb), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function jsonbInsert(...args) {
    return sqlFunction("jsonb_insert", [{ args: [(jsonb), Array$1.of((default_1$1)), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], args);
}
function jsonbLe(...args) {
    return sqlFunction("jsonb_le", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbLt(...args) {
    return sqlFunction("jsonb_lt", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbNe(...args) {
    return sqlFunction("jsonb_ne", [{ args: [(jsonb), (jsonb)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbObject(...args) {
    return sqlFunction("jsonb_object", [{ args: [Array$1.of((default_1$1))], ret: (jsonb), isOperator: false }, { args: [Array$1.of((default_1$1)), Array$1.of((default_1$1))], ret: (jsonb), isOperator: false }], args);
}
function jsonbObjectAgg(...args) {
    return sqlFunction("jsonb_object_agg", [{ args: [(Any), (Any)], ret: (jsonb), isOperator: false }], args);
}
function jsonbObjectAggStrict(...args) {
    return sqlFunction("jsonb_object_agg_strict", [{ args: [(Any), (Any)], ret: (jsonb), isOperator: false }], args);
}
function jsonbObjectAggUnique(...args) {
    return sqlFunction("jsonb_object_agg_unique", [{ args: [(Any), (Any)], ret: (jsonb), isOperator: false }], args);
}
function jsonbObjectAggUniqueStrict(...args) {
    return sqlFunction("jsonb_object_agg_unique_strict", [{ args: [(Any), (Any)], ret: (jsonb), isOperator: false }], args);
}
function jsonbObjectField(...args) {
    return sqlFunction("jsonb_object_field", [{ args: [(jsonb), (default_1$1)], ret: (jsonb), isOperator: false }], args);
}
function jsonbObjectFieldText(...args) {
    return sqlFunction("jsonb_object_field_text", [{ args: [(jsonb), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function jsonbObjectKeys(...args) {
    return sqlFunction("jsonb_object_keys", [{ args: [(jsonb)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function jsonbPathExists(...args) {
    return sqlFunction("jsonb_path_exists", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbPathExistsOpr(...args) {
    return sqlFunction("jsonb_path_exists_opr", [{ args: [(jsonb), (jsonpath)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbPathExistsTz(...args) {
    return sqlFunction("jsonb_path_exists_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbPathMatch(...args) {
    return sqlFunction("jsonb_path_match", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbPathMatchOpr(...args) {
    return sqlFunction("jsonb_path_match_opr", [{ args: [(jsonb), (jsonpath)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbPathMatchTz(...args) {
    return sqlFunction("jsonb_path_match_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function jsonbPathQuery(...args) {
    return sqlFunction("jsonb_path_query", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function jsonbPathQueryArray(...args) {
    return sqlFunction("jsonb_path_query_array", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], args);
}
function jsonbPathQueryArrayTz(...args) {
    return sqlFunction("jsonb_path_query_array_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], args);
}
function jsonbPathQueryFirst(...args) {
    return sqlFunction("jsonb_path_query_first", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], args);
}
function jsonbPathQueryFirstTz(...args) {
    return sqlFunction("jsonb_path_query_first_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], args);
}
function jsonbPathQueryTz(...args) {
    return sqlFunction("jsonb_path_query_tz", [{ args: [(jsonb), (jsonpath), (jsonb), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function jsonbPopulateRecord(...args) {
    return sqlFunction("jsonb_populate_record", [({ T }) => ({ args: [T, (jsonb)], ret: T, isOperator: false })], args);
}
function jsonbPopulateRecordValid(...args) {
    return sqlFunction("jsonb_populate_record_valid", [({ T }) => ({ args: [T, (jsonb)], ret: (default_1$8), isOperator: false })], args);
}
function jsonbPopulateRecordset(...args) {
    return sqlFunction("jsonb_populate_recordset", [({ T }) => ({ args: [T, (jsonb)], ret: Setof.ofSchema({}), isOperator: false })], args);
}
function jsonbPretty(...args) {
    return sqlFunction("jsonb_pretty", [{ args: [(jsonb)], ret: (default_1$1), isOperator: false }], args);
}
function jsonbSet(...args) {
    return sqlFunction("jsonb_set", [{ args: [(jsonb), Array$1.of((default_1$1)), (jsonb), (default_1$8)], ret: (jsonb), isOperator: false }], args);
}
function jsonbSetLax(...args) {
    return sqlFunction("jsonb_set_lax", [{ args: [(jsonb), Array$1.of((default_1$1)), (jsonb), (default_1$8), (default_1$1)], ret: (jsonb), isOperator: false }], args);
}
function jsonbStripNulls(...args) {
    return sqlFunction("jsonb_strip_nulls", [{ args: [(jsonb)], ret: (jsonb), isOperator: false }], args);
}
function jsonbToRecord(...args) {
    return sqlFunction("jsonb_to_record", [({ R }) => ({ args: [(jsonb)], ret: Record.of(R), isOperator: false })], args);
}
function jsonbToRecordset(...args) {
    return sqlFunction("jsonb_to_recordset", [{ args: [(jsonb)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function jsonbToTsvector(...args) {
    return sqlFunction("jsonb_to_tsvector", [{ args: [(jsonb), (jsonb)], ret: (tsvector), isOperator: false }, { args: [(regconfig), (jsonb), (jsonb)], ret: (tsvector), isOperator: false }], args);
}
function jsonbTypeof(...args) {
    return sqlFunction("jsonb_typeof", [{ args: [(jsonb)], ret: (default_1$1), isOperator: false }], args);
}
function justifyDays(...args) {
    return sqlFunction("justify_days", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], args);
}
function justifyHours(...args) {
    return sqlFunction("justify_hours", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], args);
}
function justifyInterval(...args) {
    return sqlFunction("justify_interval", [{ args: [(interval$1)], ret: (interval$1), isOperator: false }], args);
}
function lag(...args) {
    return sqlFunction("lag", [({ T }) => ({ args: [T, (default_1$4), T], ret: T, isOperator: false }), ({ T }) => ({ args: [T], ret: T, isOperator: false }), ({ T }) => ({ args: [T, (default_1$4)], ret: T, isOperator: false })], args);
}
function lastValue(...args) {
    return sqlFunction("last_value", [({ T }) => ({ args: [T], ret: T, isOperator: false })], args);
}
function lastval(...args) {
    return sqlFunction("lastval", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function lcm(...args) {
    return sqlFunction("lcm", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function lead(...args) {
    return sqlFunction("lead", [({ T }) => ({ args: [T, (default_1$4), T], ret: T, isOperator: false }), ({ T }) => ({ args: [T], ret: T, isOperator: false }), ({ T }) => ({ args: [T, (default_1$4)], ret: T, isOperator: false })], args);
}
function left(...args) {
    return sqlFunction("left", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function length(...args) {
    return sqlFunction("length", [{ args: [(lseg$1)], ret: (default_1$6), isOperator: false }, { args: [(path$1)], ret: (default_1$6), isOperator: false }, { args: [(bit$1)], ret: (default_1$4), isOperator: false }, { args: [(bpchar$1)], ret: (default_1$4), isOperator: false }, { args: [(bytea)], ret: (default_1$4), isOperator: false }, { args: [(bytea), (name$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1)], ret: (default_1$4), isOperator: false }, { args: [(tsvector)], ret: (default_1$4), isOperator: false }], args);
}
function like(...args) {
    return sqlFunction("like", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function likeEscape(...args) {
    return sqlFunction("like_escape", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function line(...args) {
    return sqlFunction("line", [{ args: [(point$1), (point$1)], ret: (line$1), isOperator: false }], args);
}
function lineDistance(...args) {
    return sqlFunction("line_distance", [{ args: [(line$1), (line$1)], ret: (default_1$6), isOperator: false }], args);
}
function lineEq(...args) {
    return sqlFunction("line_eq", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], args);
}
function lineHorizontal(...args) {
    return sqlFunction("line_horizontal", [{ args: [(line$1)], ret: (default_1$8), isOperator: false }], args);
}
function lineInterpt(...args) {
    return sqlFunction("line_interpt", [{ args: [(line$1), (line$1)], ret: (point$1), isOperator: false }], args);
}
function lineIntersect(...args) {
    return sqlFunction("line_intersect", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], args);
}
function lineParallel(...args) {
    return sqlFunction("line_parallel", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], args);
}
function linePerp(...args) {
    return sqlFunction("line_perp", [{ args: [(line$1), (line$1)], ret: (default_1$8), isOperator: false }], args);
}
function lineVertical(...args) {
    return sqlFunction("line_vertical", [{ args: [(line$1)], ret: (default_1$8), isOperator: false }], args);
}
function ln(...args) {
    return sqlFunction("ln", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function loClose(...args) {
    return sqlFunction("lo_close", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function loCreat(...args) {
    return sqlFunction("lo_creat", [{ args: [(default_1$4)], ret: (oid$1), isOperator: false }], args);
}
function loCreate(...args) {
    return sqlFunction("lo_create", [{ args: [(oid$1)], ret: (oid$1), isOperator: false }], args);
}
function loExport(...args) {
    return sqlFunction("lo_export", [{ args: [(oid$1), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function loFromBytea(...args) {
    return sqlFunction("lo_from_bytea", [{ args: [(oid$1), (bytea)], ret: (oid$1), isOperator: false }], args);
}
function loGet(...args) {
    return sqlFunction("lo_get", [{ args: [(oid$1)], ret: (bytea), isOperator: false }, { args: [(oid$1), (default_1$3), (default_1$4)], ret: (bytea), isOperator: false }], args);
}
function loImport(...args) {
    return sqlFunction("lo_import", [{ args: [(default_1$1)], ret: (oid$1), isOperator: false }, { args: [(default_1$1), (oid$1)], ret: (oid$1), isOperator: false }], args);
}
function loLseek(...args) {
    return sqlFunction("lo_lseek", [{ args: [(default_1$4), (default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function loLseek64(...args) {
    return sqlFunction("lo_lseek64", [{ args: [(default_1$4), (default_1$3), (default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function loOpen(...args) {
    return sqlFunction("lo_open", [{ args: [(oid$1), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function loPut(...args) {
    return sqlFunction("lo_put", [{ args: [(oid$1), (default_1$3), (bytea)], ret: (_void), isOperator: false }], args);
}
function loTell(...args) {
    return sqlFunction("lo_tell", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function loTell64(...args) {
    return sqlFunction("lo_tell64", [{ args: [(default_1$4)], ret: (default_1$3), isOperator: false }], args);
}
function loTruncate(...args) {
    return sqlFunction("lo_truncate", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function loTruncate64(...args) {
    return sqlFunction("lo_truncate64", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$4), isOperator: false }], args);
}
function loUnlink(...args) {
    return sqlFunction("lo_unlink", [{ args: [(oid$1)], ret: (default_1$4), isOperator: false }], args);
}
function log(...args) {
    return sqlFunction("log", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function log10(...args) {
    return sqlFunction("log10", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function loread(...args) {
    return sqlFunction("loread", [{ args: [(default_1$4), (default_1$4)], ret: (bytea), isOperator: false }], args);
}
function lower(...args) {
    return sqlFunction("lower", [({ T }) => ({ args: [anymultirange], ret: T, isOperator: false }), ({ T }) => ({ args: [anyrange], ret: T, isOperator: false }), { args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function lowerInc(...args) {
    return sqlFunction("lower_inc", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }, { args: [anyrange], ret: (default_1$8), isOperator: false }], args);
}
function lowerInf(...args) {
    return sqlFunction("lower_inf", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }, { args: [anyrange], ret: (default_1$8), isOperator: false }], args);
}
function lowrite(...args) {
    return sqlFunction("lowrite", [{ args: [(default_1$4), (bytea)], ret: (default_1$4), isOperator: false }], args);
}
function lpad(...args) {
    return sqlFunction("lpad", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function lseg(...args) {
    return sqlFunction("lseg", [{ args: [(box$1)], ret: (lseg$1), isOperator: false }, { args: [(point$1), (point$1)], ret: (lseg$1), isOperator: false }], args);
}
function lsegCenter(...args) {
    return sqlFunction("lseg_center", [{ args: [(lseg$1)], ret: (point$1), isOperator: false }], args);
}
function lsegDistance(...args) {
    return sqlFunction("lseg_distance", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$6), isOperator: false }], args);
}
function lsegEq(...args) {
    return sqlFunction("lseg_eq", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegGe(...args) {
    return sqlFunction("lseg_ge", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegGt(...args) {
    return sqlFunction("lseg_gt", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegHorizontal(...args) {
    return sqlFunction("lseg_horizontal", [{ args: [(lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegInterpt(...args) {
    return sqlFunction("lseg_interpt", [{ args: [(lseg$1), (lseg$1)], ret: (point$1), isOperator: false }], args);
}
function lsegIntersect(...args) {
    return sqlFunction("lseg_intersect", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegLe(...args) {
    return sqlFunction("lseg_le", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegLength(...args) {
    return sqlFunction("lseg_length", [{ args: [(lseg$1)], ret: (default_1$6), isOperator: false }], args);
}
function lsegLt(...args) {
    return sqlFunction("lseg_lt", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegNe(...args) {
    return sqlFunction("lseg_ne", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegParallel(...args) {
    return sqlFunction("lseg_parallel", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegPerp(...args) {
    return sqlFunction("lseg_perp", [{ args: [(lseg$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function lsegVertical(...args) {
    return sqlFunction("lseg_vertical", [{ args: [(lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function ltrim(...args) {
    return sqlFunction("ltrim", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }, { args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function macaddr(...args) {
    return sqlFunction("macaddr", [{ args: [(macaddr8$1)], ret: (macaddr$1), isOperator: false }], args);
}
function macaddr8(...args) {
    return sqlFunction("macaddr8", [{ args: [(macaddr$1)], ret: (macaddr8$1), isOperator: false }], args);
}
function macaddr8And(...args) {
    return sqlFunction("macaddr8_and", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (macaddr8$1), isOperator: false }], args);
}
function macaddr8Cmp(...args) {
    return sqlFunction("macaddr8_cmp", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$4), isOperator: false }], args);
}
function macaddr8Eq(...args) {
    return sqlFunction("macaddr8_eq", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddr8Ge(...args) {
    return sqlFunction("macaddr8_ge", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddr8Gt(...args) {
    return sqlFunction("macaddr8_gt", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddr8Le(...args) {
    return sqlFunction("macaddr8_le", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddr8Lt(...args) {
    return sqlFunction("macaddr8_lt", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddr8Ne(...args) {
    return sqlFunction("macaddr8_ne", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddr8Not(...args) {
    return sqlFunction("macaddr8_not", [{ args: [(macaddr8$1)], ret: (macaddr8$1), isOperator: false }], args);
}
function macaddr8Or(...args) {
    return sqlFunction("macaddr8_or", [{ args: [(macaddr8$1), (macaddr8$1)], ret: (macaddr8$1), isOperator: false }], args);
}
function macaddr8Set7Bit(...args) {
    return sqlFunction("macaddr8_set7bit", [{ args: [(macaddr8$1)], ret: (macaddr8$1), isOperator: false }], args);
}
function macaddrAnd(...args) {
    return sqlFunction("macaddr_and", [{ args: [(macaddr$1), (macaddr$1)], ret: (macaddr$1), isOperator: false }], args);
}
function macaddrCmp(...args) {
    return sqlFunction("macaddr_cmp", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$4), isOperator: false }], args);
}
function macaddrEq(...args) {
    return sqlFunction("macaddr_eq", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddrGe(...args) {
    return sqlFunction("macaddr_ge", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddrGt(...args) {
    return sqlFunction("macaddr_gt", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddrLe(...args) {
    return sqlFunction("macaddr_le", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddrLt(...args) {
    return sqlFunction("macaddr_lt", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddrNe(...args) {
    return sqlFunction("macaddr_ne", [{ args: [(macaddr$1), (macaddr$1)], ret: (default_1$8), isOperator: false }], args);
}
function macaddrNot(...args) {
    return sqlFunction("macaddr_not", [{ args: [(macaddr$1)], ret: (macaddr$1), isOperator: false }], args);
}
function macaddrOr(...args) {
    return sqlFunction("macaddr_or", [{ args: [(macaddr$1), (macaddr$1)], ret: (macaddr$1), isOperator: false }], args);
}
function makeDate(...args) {
    return sqlFunction("make_date", [{ args: [(default_1$4), (default_1$4), (default_1$4)], ret: (date$1), isOperator: false }], args);
}
function makeInterval(...args) {
    return sqlFunction("make_interval", [{ args: [(default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$6)], ret: (interval$1), isOperator: false }], args);
}
function makeTime(...args) {
    return sqlFunction("make_time", [{ args: [(default_1$4), (default_1$4), (default_1$6)], ret: (time$1), isOperator: false }], args);
}
function makeTimestamp(...args) {
    return sqlFunction("make_timestamp", [{ args: [(default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$6)], ret: (timestamp$1), isOperator: false }], args);
}
function makeTimestamptz(...args) {
    return sqlFunction("make_timestamptz", [{ args: [(default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$6)], ret: (timestamptz$1), isOperator: false }, { args: [(default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$4), (default_1$6), (default_1$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function makeaclitem(...args) {
    return sqlFunction("makeaclitem", [{ args: [(oid$1), (oid$1), (default_1$1), (default_1$8)], ret: (aclitem), isOperator: false }], args);
}
function masklen(...args) {
    return sqlFunction("masklen", [{ args: [(inet)], ret: (default_1$4), isOperator: false }], args);
}
function max(...args) {
    return sqlFunction("max", [({ T }) => ({ args: [Array$1.of(T)], ret: Array$1.of(T), isOperator: false }), ({ T }) => ({ args: [T], ret: T, isOperator: false }), { args: [(bpchar$1)], ret: (bpchar$1), isOperator: false }, { args: [(date$1)], ret: (date$1), isOperator: false }, { args: [(default_1$7)], ret: (default_1$7), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(inet)], ret: (inet), isOperator: false }, { args: [(default_1$5)], ret: (default_1$5), isOperator: false }, { args: [(default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3)], ret: (default_1$3), isOperator: false }, { args: [(interval$1)], ret: (interval$1), isOperator: false }, { args: [(money$1)], ret: (money$1), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }, { args: [(oid$1)], ret: (oid$1), isOperator: false }, { args: [(pg_lsn)], ret: (pg_lsn), isOperator: false }, { args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(tid)], ret: (tid), isOperator: false }, { args: [(time$1)], ret: (time$1), isOperator: false }, { args: [(timestamp$1)], ret: (timestamp$1), isOperator: false }, { args: [(timestamptz$1)], ret: (timestamptz$1), isOperator: false }, { args: [(timetz$1)], ret: (timetz$1), isOperator: false }, { args: [(xid8)], ret: (xid8), isOperator: false }], args);
}
function md5(...args) {
    return sqlFunction("md5", [{ args: [(bytea)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function minScale(...args) {
    return sqlFunction("min_scale", [{ args: [(default_1$2)], ret: (default_1$4), isOperator: false }], args);
}
function mod(...args) {
    return sqlFunction("mod", [{ args: [(default_1$5), (default_1$5)], ret: (default_1$5), isOperator: false }, { args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function mode(...args) {
    return sqlFunction("mode", [({ T }) => ({ args: [T], ret: T, isOperator: false })], args);
}
function money(...args) {
    return sqlFunction("money", [{ args: [(default_1$4)], ret: (money$1), isOperator: false }, { args: [(default_1$3)], ret: (money$1), isOperator: false }, { args: [(default_1$2)], ret: (money$1), isOperator: false }], args);
}
function mulDInterval(...args) {
    return sqlFunction("mul_d_interval", [{ args: [(default_1$6), (interval$1)], ret: (interval$1), isOperator: false }], args);
}
function multirange(...args) {
    return sqlFunction("multirange", [{ args: [anyrange], ret: anymultirange, isOperator: false }], args);
}
function multirangeAdjacentMultirange(...args) {
    return sqlFunction("multirange_adjacent_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeAdjacentRange(...args) {
    return sqlFunction("multirange_adjacent_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeAfterMultirange(...args) {
    return sqlFunction("multirange_after_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeAfterRange(...args) {
    return sqlFunction("multirange_after_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeBeforeMultirange(...args) {
    return sqlFunction("multirange_before_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeBeforeRange(...args) {
    return sqlFunction("multirange_before_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeCmp(...args) {
    return sqlFunction("multirange_cmp", [{ args: [anymultirange, anymultirange], ret: (default_1$4), isOperator: false }], args);
}
function multirangeContainedByMultirange(...args) {
    return sqlFunction("multirange_contained_by_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeContainedByRange(...args) {
    return sqlFunction("multirange_contained_by_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeContainsElem(...args) {
    return sqlFunction("multirange_contains_elem", [({ T }) => ({ args: [anymultirange, T], ret: (default_1$8), isOperator: false })], args);
}
function multirangeContainsMultirange(...args) {
    return sqlFunction("multirange_contains_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeContainsRange(...args) {
    return sqlFunction("multirange_contains_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeEq(...args) {
    return sqlFunction("multirange_eq", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeGe(...args) {
    return sqlFunction("multirange_ge", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeGt(...args) {
    return sqlFunction("multirange_gt", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeIntersect(...args) {
    return sqlFunction("multirange_intersect", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: false }], args);
}
function multirangeIntersectAggTransfn(...args) {
    return sqlFunction("multirange_intersect_agg_transfn", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: false }], args);
}
function multirangeLe(...args) {
    return sqlFunction("multirange_le", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeLt(...args) {
    return sqlFunction("multirange_lt", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeMinus(...args) {
    return sqlFunction("multirange_minus", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: false }], args);
}
function multirangeNe(...args) {
    return sqlFunction("multirange_ne", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeOverlapsMultirange(...args) {
    return sqlFunction("multirange_overlaps_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeOverlapsRange(...args) {
    return sqlFunction("multirange_overlaps_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeOverleftMultirange(...args) {
    return sqlFunction("multirange_overleft_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeOverleftRange(...args) {
    return sqlFunction("multirange_overleft_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeOverrightMultirange(...args) {
    return sqlFunction("multirange_overright_multirange", [{ args: [anymultirange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeOverrightRange(...args) {
    return sqlFunction("multirange_overright_range", [{ args: [anymultirange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function multirangeUnion(...args) {
    return sqlFunction("multirange_union", [{ args: [anymultirange, anymultirange], ret: anymultirange, isOperator: false }], args);
}
function mxidAge(...args) {
    return sqlFunction("mxid_age", [{ args: [(xid$1)], ret: (default_1$4), isOperator: false }], args);
}
function name(...args) {
    return sqlFunction("name", [{ args: [(bpchar$1)], ret: (name$1), isOperator: false }, { args: [(default_1$1)], ret: (name$1), isOperator: false }, { args: [(varchar$1)], ret: (name$1), isOperator: false }], args);
}
function nameconcatoid(...args) {
    return sqlFunction("nameconcatoid", [{ args: [(name$1), (oid$1)], ret: (name$1), isOperator: false }], args);
}
function nameeq(...args) {
    return sqlFunction("nameeq", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function nameeqtext(...args) {
    return sqlFunction("nameeqtext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function namege(...args) {
    return sqlFunction("namege", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function namegetext(...args) {
    return sqlFunction("namegetext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function namegt(...args) {
    return sqlFunction("namegt", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function namegttext(...args) {
    return sqlFunction("namegttext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function nameiclike(...args) {
    return sqlFunction("nameiclike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function nameicnlike(...args) {
    return sqlFunction("nameicnlike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function nameicregexeq(...args) {
    return sqlFunction("nameicregexeq", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function nameicregexne(...args) {
    return sqlFunction("nameicregexne", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function namele(...args) {
    return sqlFunction("namele", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function nameletext(...args) {
    return sqlFunction("nameletext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function namelike(...args) {
    return sqlFunction("namelike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function namelt(...args) {
    return sqlFunction("namelt", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function namelttext(...args) {
    return sqlFunction("namelttext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function namene(...args) {
    return sqlFunction("namene", [{ args: [(name$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function namenetext(...args) {
    return sqlFunction("namenetext", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function namenlike(...args) {
    return sqlFunction("namenlike", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function nameregexeq(...args) {
    return sqlFunction("nameregexeq", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function nameregexne(...args) {
    return sqlFunction("nameregexne", [{ args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function netmask(...args) {
    return sqlFunction("netmask", [{ args: [(inet)], ret: (inet), isOperator: false }], args);
}
function network(...args) {
    return sqlFunction("network", [{ args: [(inet)], ret: (cidr$1), isOperator: false }], args);
}
function networkCmp(...args) {
    return sqlFunction("network_cmp", [{ args: [(inet), (inet)], ret: (default_1$4), isOperator: false }], args);
}
function networkEq(...args) {
    return sqlFunction("network_eq", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkGe(...args) {
    return sqlFunction("network_ge", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkGt(...args) {
    return sqlFunction("network_gt", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkLarger(...args) {
    return sqlFunction("network_larger", [{ args: [(inet), (inet)], ret: (inet), isOperator: false }], args);
}
function networkLe(...args) {
    return sqlFunction("network_le", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkLt(...args) {
    return sqlFunction("network_lt", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkNe(...args) {
    return sqlFunction("network_ne", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkOverlap(...args) {
    return sqlFunction("network_overlap", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkSmaller(...args) {
    return sqlFunction("network_smaller", [{ args: [(inet), (inet)], ret: (inet), isOperator: false }], args);
}
function networkSub(...args) {
    return sqlFunction("network_sub", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkSubeq(...args) {
    return sqlFunction("network_subeq", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkSup(...args) {
    return sqlFunction("network_sup", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function networkSupeq(...args) {
    return sqlFunction("network_supeq", [{ args: [(inet), (inet)], ret: (default_1$8), isOperator: false }], args);
}
function nextval(...args) {
    return sqlFunction("nextval", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], args);
}
function normalize(...args) {
    return sqlFunction("normalize", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function notlike(...args) {
    return sqlFunction("notlike", [{ args: [(bytea), (bytea)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function now(...args) {
    return sqlFunction("now", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function npoints(...args) {
    return sqlFunction("npoints", [{ args: [(path$1)], ret: (default_1$4), isOperator: false }, { args: [(polygon$1)], ret: (default_1$4), isOperator: false }], args);
}
function nthValue(...args) {
    return sqlFunction("nth_value", [({ T }) => ({ args: [T, (default_1$4)], ret: T, isOperator: false })], args);
}
function ntile(...args) {
    return sqlFunction("ntile", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function numNonnulls(...args) {
    return sqlFunction("num_nonnulls", [{ args: [(Any)], ret: (default_1$4), isOperator: false }], args);
}
function numNulls(...args) {
    return sqlFunction("num_nulls", [{ args: [(Any)], ret: (default_1$4), isOperator: false }], args);
}
function numeric(...args) {
    return sqlFunction("numeric", [{ args: [(default_1$7)], ret: (default_1$2), isOperator: false }, { args: [(default_1$6)], ret: (default_1$2), isOperator: false }, { args: [(default_1$5)], ret: (default_1$2), isOperator: false }, { args: [(default_1$4)], ret: (default_1$2), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(jsonb)], ret: (default_1$2), isOperator: false }, { args: [(money$1)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2), (default_1$4)], ret: (default_1$2), isOperator: false }], args);
}
function numericAbs(...args) {
    return sqlFunction("numeric_abs", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericAdd(...args) {
    return sqlFunction("numeric_add", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericCmp(...args) {
    return sqlFunction("numeric_cmp", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$4), isOperator: false }], args);
}
function numericDiv(...args) {
    return sqlFunction("numeric_div", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericDivTrunc(...args) {
    return sqlFunction("numeric_div_trunc", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericEq(...args) {
    return sqlFunction("numeric_eq", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], args);
}
function numericExp(...args) {
    return sqlFunction("numeric_exp", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericGe(...args) {
    return sqlFunction("numeric_ge", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], args);
}
function numericGt(...args) {
    return sqlFunction("numeric_gt", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], args);
}
function numericInc(...args) {
    return sqlFunction("numeric_inc", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericLarger(...args) {
    return sqlFunction("numeric_larger", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericLe(...args) {
    return sqlFunction("numeric_le", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], args);
}
function numericLn(...args) {
    return sqlFunction("numeric_ln", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericLog(...args) {
    return sqlFunction("numeric_log", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericLt(...args) {
    return sqlFunction("numeric_lt", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], args);
}
function numericMod(...args) {
    return sqlFunction("numeric_mod", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericMul(...args) {
    return sqlFunction("numeric_mul", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericNe(...args) {
    return sqlFunction("numeric_ne", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$8), isOperator: false }], args);
}
function numericPlPgLsn(...args) {
    return sqlFunction("numeric_pl_pg_lsn", [{ args: [(default_1$2), (pg_lsn)], ret: (pg_lsn), isOperator: false }], args);
}
function numericPower(...args) {
    return sqlFunction("numeric_power", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericSmaller(...args) {
    return sqlFunction("numeric_smaller", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericSqrt(...args) {
    return sqlFunction("numeric_sqrt", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericSub(...args) {
    return sqlFunction("numeric_sub", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericUminus(...args) {
    return sqlFunction("numeric_uminus", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function numericUplus(...args) {
    return sqlFunction("numeric_uplus", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function nummultirange(...args) {
    return sqlFunction("nummultirange", [{ args: [], ret: (nummultirange$1), isOperator: false }, { args: [Array$1.of((numrange$1))], ret: (nummultirange$1), isOperator: false }, { args: [(numrange$1)], ret: (nummultirange$1), isOperator: false }], args);
}
function numnode(...args) {
    return sqlFunction("numnode", [{ args: [(tsquery)], ret: (default_1$4), isOperator: false }], args);
}
function numrange(...args) {
    return sqlFunction("numrange", [{ args: [(default_1$2), (default_1$2)], ret: (numrange$1), isOperator: false }, { args: [(default_1$2), (default_1$2), (default_1$1)], ret: (numrange$1), isOperator: false }], args);
}
function numrangeSubdiff(...args) {
    return sqlFunction("numrange_subdiff", [{ args: [(default_1$2), (default_1$2)], ret: (default_1$6), isOperator: false }], args);
}
function objDescription(...args) {
    return sqlFunction("obj_description", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (name$1)], ret: (default_1$1), isOperator: false }], args);
}
function octetLength(...args) {
    return sqlFunction("octet_length", [{ args: [(bit$1)], ret: (default_1$4), isOperator: false }, { args: [(bpchar$1)], ret: (default_1$4), isOperator: false }, { args: [(bytea)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function oid(...args) {
    return sqlFunction("oid", [{ args: [(default_1$3)], ret: (oid$1), isOperator: false }], args);
}
function oideq(...args) {
    return sqlFunction("oideq", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function oidge(...args) {
    return sqlFunction("oidge", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function oidgt(...args) {
    return sqlFunction("oidgt", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function oidlarger(...args) {
    return sqlFunction("oidlarger", [{ args: [(oid$1), (oid$1)], ret: (oid$1), isOperator: false }], args);
}
function oidle(...args) {
    return sqlFunction("oidle", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function oidlt(...args) {
    return sqlFunction("oidlt", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function oidne(...args) {
    return sqlFunction("oidne", [{ args: [(oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function oidsmaller(...args) {
    return sqlFunction("oidsmaller", [{ args: [(oid$1), (oid$1)], ret: (oid$1), isOperator: false }], args);
}
function oidvectoreq(...args) {
    return sqlFunction("oidvectoreq", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], args);
}
function oidvectorge(...args) {
    return sqlFunction("oidvectorge", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], args);
}
function oidvectorgt(...args) {
    return sqlFunction("oidvectorgt", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], args);
}
function oidvectorle(...args) {
    return sqlFunction("oidvectorle", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], args);
}
function oidvectorlt(...args) {
    return sqlFunction("oidvectorlt", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], args);
}
function oidvectorne(...args) {
    return sqlFunction("oidvectorne", [{ args: [(oidvector), (oidvector)], ret: (default_1$8), isOperator: false }], args);
}
function oidvectortypes(...args) {
    return sqlFunction("oidvectortypes", [{ args: [(oidvector)], ret: (default_1$1), isOperator: false }], args);
}
function onPb(...args) {
    return sqlFunction("on_pb", [{ args: [(point$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function onPl(...args) {
    return sqlFunction("on_pl", [{ args: [(point$1), (line$1)], ret: (default_1$8), isOperator: false }], args);
}
function onPpath(...args) {
    return sqlFunction("on_ppath", [{ args: [(point$1), (path$1)], ret: (default_1$8), isOperator: false }], args);
}
function onPs(...args) {
    return sqlFunction("on_ps", [{ args: [(point$1), (lseg$1)], ret: (default_1$8), isOperator: false }], args);
}
function onSb(...args) {
    return sqlFunction("on_sb", [{ args: [(lseg$1), (box$1)], ret: (default_1$8), isOperator: false }], args);
}
function onSl(...args) {
    return sqlFunction("on_sl", [{ args: [(lseg$1), (line$1)], ret: (default_1$8), isOperator: false }], args);
}
function overlaps(...args) {
    return sqlFunction("overlaps", [{ args: [(time$1), (interval$1), (time$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(time$1), (interval$1), (time$1), (time$1)], ret: (default_1$8), isOperator: false }, { args: [(time$1), (time$1), (time$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(time$1), (time$1), (time$1), (time$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1), (interval$1), (timestamp$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1), (interval$1), (timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1), (timestamp$1), (timestamp$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamp$1), (timestamp$1), (timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1), (interval$1), (timestamptz$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1), (interval$1), (timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (timestamptz$1), (interval$1)], ret: (default_1$8), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }, { args: [(timetz$1), (timetz$1), (timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], args);
}
function overlay(...args) {
    return sqlFunction("overlay", [{ args: [(bit$1), (bit$1), (default_1$4)], ret: (bit$1), isOperator: false }, { args: [(bit$1), (bit$1), (default_1$4), (default_1$4)], ret: (bit$1), isOperator: false }, { args: [(bytea), (bytea), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(bytea), (bytea), (default_1$4), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function parseIdent(...args) {
    return sqlFunction("parse_ident", [{ args: [(default_1$1), (default_1$8)], ret: Array$1.of((default_1$1)), isOperator: false }], args);
}
function path(...args) {
    return sqlFunction("path", [{ args: [(polygon$1)], ret: (path$1), isOperator: false }], args);
}
function pathAdd(...args) {
    return sqlFunction("path_add", [{ args: [(path$1), (path$1)], ret: (path$1), isOperator: false }], args);
}
function pathAddPt(...args) {
    return sqlFunction("path_add_pt", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: false }], args);
}
function pathContainPt(...args) {
    return sqlFunction("path_contain_pt", [{ args: [(path$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function pathDistance(...args) {
    return sqlFunction("path_distance", [{ args: [(path$1), (path$1)], ret: (default_1$6), isOperator: false }], args);
}
function pathDivPt(...args) {
    return sqlFunction("path_div_pt", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: false }], args);
}
function pathInter(...args) {
    return sqlFunction("path_inter", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], args);
}
function pathLength(...args) {
    return sqlFunction("path_length", [{ args: [(path$1)], ret: (default_1$6), isOperator: false }], args);
}
function pathMulPt(...args) {
    return sqlFunction("path_mul_pt", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: false }], args);
}
function pathNEq(...args) {
    return sqlFunction("path_n_eq", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], args);
}
function pathNGe(...args) {
    return sqlFunction("path_n_ge", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], args);
}
function pathNGt(...args) {
    return sqlFunction("path_n_gt", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], args);
}
function pathNLe(...args) {
    return sqlFunction("path_n_le", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], args);
}
function pathNLt(...args) {
    return sqlFunction("path_n_lt", [{ args: [(path$1), (path$1)], ret: (default_1$8), isOperator: false }], args);
}
function pathNpoints(...args) {
    return sqlFunction("path_npoints", [{ args: [(path$1)], ret: (default_1$4), isOperator: false }], args);
}
function pathSubPt(...args) {
    return sqlFunction("path_sub_pt", [{ args: [(path$1), (point$1)], ret: (path$1), isOperator: false }], args);
}
function pclose(...args) {
    return sqlFunction("pclose", [{ args: [(path$1)], ret: (path$1), isOperator: false }], args);
}
function percentRank(...args) {
    return sqlFunction("percent_rank", [{ args: [], ret: (default_1$6), isOperator: false }, { args: [(Any)], ret: (default_1$6), isOperator: false }], args);
}
function percentileCont(...args) {
    return sqlFunction("percentile_cont", [{ args: [Array$1.of((default_1$6)), (default_1$6)], ret: Array$1.of((default_1$6)), isOperator: false }, { args: [Array$1.of((default_1$6)), (interval$1)], ret: Array$1.of((interval$1)), isOperator: false }, { args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6), (interval$1)], ret: (interval$1), isOperator: false }], args);
}
function percentileDisc(...args) {
    return sqlFunction("percentile_disc", [({ T }) => ({ args: [Array$1.of((default_1$6)), T], ret: Array$1.of(T), isOperator: false }), ({ T }) => ({ args: [(default_1$6), T], ret: T, isOperator: false })], args);
}
function pgAdvisoryLock(...args) {
    return sqlFunction("pg_advisory_lock", [{ args: [(default_1$4), (default_1$4)], ret: (_void), isOperator: false }, { args: [(default_1$3)], ret: (_void), isOperator: false }], args);
}
function pgAdvisoryLockShared(...args) {
    return sqlFunction("pg_advisory_lock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (_void), isOperator: false }, { args: [(default_1$3)], ret: (_void), isOperator: false }], args);
}
function pgAdvisoryUnlock(...args) {
    return sqlFunction("pg_advisory_unlock", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }, { args: [(default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function pgAdvisoryUnlockAll(...args) {
    return sqlFunction("pg_advisory_unlock_all", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgAdvisoryUnlockShared(...args) {
    return sqlFunction("pg_advisory_unlock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }, { args: [(default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function pgAdvisoryXactLock(...args) {
    return sqlFunction("pg_advisory_xact_lock", [{ args: [(default_1$4), (default_1$4)], ret: (_void), isOperator: false }, { args: [(default_1$3)], ret: (_void), isOperator: false }], args);
}
function pgAdvisoryXactLockShared(...args) {
    return sqlFunction("pg_advisory_xact_lock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (_void), isOperator: false }, { args: [(default_1$3)], ret: (_void), isOperator: false }], args);
}
function pgAvailableExtensionVersions(...args) {
    return sqlFunction("pg_available_extension_versions", [{ args: [], ret: Setof.ofSchema({ name: (name$1), version: (default_1$1), superuser: (default_1$8), trusted: (default_1$8), relocatable: (default_1$8), schema: (name$1), requires: Array$1.of((name$1)), comment: (default_1$1) }), isOperator: false }], args);
}
function pgAvailableExtensions(...args) {
    return sqlFunction("pg_available_extensions", [{ args: [], ret: Setof.ofSchema({ name: (name$1), default_version: (default_1$1), comment: (default_1$1) }), isOperator: false }], args);
}
function pgAvailableWalSummaries(...args) {
    return sqlFunction("pg_available_wal_summaries", [{ args: [], ret: Setof.ofSchema({ tli: (default_1$3), start_lsn: (pg_lsn), end_lsn: (pg_lsn) }), isOperator: false }], args);
}
function pgBackendPid(...args) {
    return sqlFunction("pg_backend_pid", [{ args: [], ret: (default_1$4), isOperator: false }], args);
}
function pgBackupStart(...args) {
    return sqlFunction("pg_backup_start", [{ args: [(default_1$1), (default_1$8)], ret: (pg_lsn), isOperator: false }], args);
}
function pgBackupStop(...args) {
    return sqlFunction("pg_backup_stop", [{ args: [(default_1$8)], ret: Record.of({ lsn: (pg_lsn), labelfile: (default_1$1), spcmapfile: (default_1$1) }), isOperator: false }], args);
}
function pgBasetype(...args) {
    return sqlFunction("pg_basetype", [{ args: [(regtype)], ret: (regtype), isOperator: false }], args);
}
function pgBlockingPids(...args) {
    return sqlFunction("pg_blocking_pids", [{ args: [(default_1$4)], ret: Array$1.of((default_1$4)), isOperator: false }], args);
}
function pgCancelBackend(...args) {
    return sqlFunction("pg_cancel_backend", [{ args: [(default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function pgCharToEncoding(...args) {
    return sqlFunction("pg_char_to_encoding", [{ args: [(name$1)], ret: (default_1$4), isOperator: false }], args);
}
function pgClientEncoding(...args) {
    return sqlFunction("pg_client_encoding", [{ args: [], ret: (name$1), isOperator: false }], args);
}
function pgCollationActualVersion(...args) {
    return sqlFunction("pg_collation_actual_version", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgCollationFor(...args) {
    return sqlFunction("pg_collation_for", [{ args: [(Any)], ret: (default_1$1), isOperator: false }], args);
}
function pgCollationIsVisible(...args) {
    return sqlFunction("pg_collation_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgColumnCompression(...args) {
    return sqlFunction("pg_column_compression", [{ args: [(Any)], ret: (default_1$1), isOperator: false }], args);
}
function pgColumnIsUpdatable(...args) {
    return sqlFunction("pg_column_is_updatable", [{ args: [(regclass$1), (default_1$5), (default_1$8)], ret: (default_1$8), isOperator: false }], args);
}
function pgColumnSize(...args) {
    return sqlFunction("pg_column_size", [{ args: [(Any)], ret: (default_1$4), isOperator: false }], args);
}
function pgColumnToastChunkId(...args) {
    return sqlFunction("pg_column_toast_chunk_id", [{ args: [(Any)], ret: (oid$1), isOperator: false }], args);
}
function pgConfLoadTime(...args) {
    return sqlFunction("pg_conf_load_time", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function pgConfig(...args) {
    return sqlFunction("pg_config", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), setting: (default_1$1) }), isOperator: false }], args);
}
function pgControlCheckpoint(...args) {
    return sqlFunction("pg_control_checkpoint", [{ args: [], ret: Record.of({ checkpoint_lsn: (pg_lsn), redo_lsn: (pg_lsn), redo_wal_file: (default_1$1), timeline_id: (default_1$4), prev_timeline_id: (default_1$4), full_page_writes: (default_1$8), next_xid: (default_1$1), next_oid: (oid$1), next_multixact_id: (xid$1), next_multi_offset: (xid$1), oldest_xid: (xid$1), oldest_xid_dbid: (oid$1), oldest_active_xid: (xid$1), oldest_multi_xid: (xid$1), oldest_multi_dbid: (oid$1), oldest_commit_ts_xid: (xid$1), newest_commit_ts_xid: (xid$1), checkpoint_time: (timestamptz$1) }), isOperator: false }], args);
}
function pgControlInit(...args) {
    return sqlFunction("pg_control_init", [{ args: [], ret: Record.of({ max_data_alignment: (default_1$4), database_block_size: (default_1$4), blocks_per_segment: (default_1$4), wal_block_size: (default_1$4), bytes_per_wal_segment: (default_1$4), max_identifier_length: (default_1$4), max_index_columns: (default_1$4), max_toast_chunk_size: (default_1$4), large_object_chunk_size: (default_1$4), float8_pass_by_value: (default_1$8), data_page_checksum_version: (default_1$4) }), isOperator: false }], args);
}
function pgControlRecovery(...args) {
    return sqlFunction("pg_control_recovery", [{ args: [], ret: Record.of({ min_recovery_end_lsn: (pg_lsn), min_recovery_end_timeline: (default_1$4), backup_start_lsn: (pg_lsn), backup_end_lsn: (pg_lsn), end_of_backup_record_required: (default_1$8) }), isOperator: false }], args);
}
function pgControlSystem(...args) {
    return sqlFunction("pg_control_system", [{ args: [], ret: Record.of({ pg_control_version: (default_1$4), catalog_version_no: (default_1$4), system_identifier: (default_1$3), pg_control_last_modified: (timestamptz$1) }), isOperator: false }], args);
}
function pgConversionIsVisible(...args) {
    return sqlFunction("pg_conversion_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgCopyLogicalReplicationSlot(...args) {
    return sqlFunction("pg_copy_logical_replication_slot", [{ args: [(name$1), (name$1)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }, { args: [(name$1), (name$1), (default_1$8)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }, { args: [(name$1), (name$1), (default_1$8), (name$1)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }], args);
}
function pgCopyPhysicalReplicationSlot(...args) {
    return sqlFunction("pg_copy_physical_replication_slot", [{ args: [(name$1), (name$1)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }, { args: [(name$1), (name$1), (default_1$8)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }], args);
}
function pgCreateLogicalReplicationSlot(...args) {
    return sqlFunction("pg_create_logical_replication_slot", [{ args: [(name$1), (name$1), (default_1$8), (default_1$8), (default_1$8)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }], args);
}
function pgCreatePhysicalReplicationSlot(...args) {
    return sqlFunction("pg_create_physical_replication_slot", [{ args: [(name$1), (default_1$8), (default_1$8)], ret: Record.of({ slot_name: (name$1), lsn: (pg_lsn) }), isOperator: false }], args);
}
function pgCreateRestorePoint(...args) {
    return sqlFunction("pg_create_restore_point", [{ args: [(default_1$1)], ret: (pg_lsn), isOperator: false }], args);
}
function pgCurrentLogfile(...args) {
    return sqlFunction("pg_current_logfile", [{ args: [], ret: (default_1$1), isOperator: false }, { args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgCurrentSnapshot(...args) {
    return sqlFunction("pg_current_snapshot", [{ args: [], ret: (pg_snapshot), isOperator: false }], args);
}
function pgCurrentWalFlushLsn(...args) {
    return sqlFunction("pg_current_wal_flush_lsn", [{ args: [], ret: (pg_lsn), isOperator: false }], args);
}
function pgCurrentWalInsertLsn(...args) {
    return sqlFunction("pg_current_wal_insert_lsn", [{ args: [], ret: (pg_lsn), isOperator: false }], args);
}
function pgCurrentWalLsn(...args) {
    return sqlFunction("pg_current_wal_lsn", [{ args: [], ret: (pg_lsn), isOperator: false }], args);
}
function pgCurrentXactId(...args) {
    return sqlFunction("pg_current_xact_id", [{ args: [], ret: (xid8), isOperator: false }], args);
}
function pgCurrentXactIdIfAssigned(...args) {
    return sqlFunction("pg_current_xact_id_if_assigned", [{ args: [], ret: (xid8), isOperator: false }], args);
}
function pgCursor(...args) {
    return sqlFunction("pg_cursor", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), statement: (default_1$1), is_holdable: (default_1$8), is_binary: (default_1$8), is_scrollable: (default_1$8), creation_time: (timestamptz$1) }), isOperator: false }], args);
}
function pgDatabaseCollationActualVersion(...args) {
    return sqlFunction("pg_database_collation_actual_version", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgDatabaseSize(...args) {
    return sqlFunction("pg_database_size", [{ args: [(name$1)], ret: (default_1$3), isOperator: false }, { args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgDescribeObject(...args) {
    return sqlFunction("pg_describe_object", [{ args: [(oid$1), (oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function pgDropReplicationSlot(...args) {
    return sqlFunction("pg_drop_replication_slot", [{ args: [(name$1)], ret: (_void), isOperator: false }], args);
}
function pgEncodingMaxLength(...args) {
    return sqlFunction("pg_encoding_max_length", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function pgEncodingToChar(...args) {
    return sqlFunction("pg_encoding_to_char", [{ args: [(default_1$4)], ret: (name$1), isOperator: false }], args);
}
function pgEventTriggerDdlCommands(...args) {
    return sqlFunction("pg_event_trigger_ddl_commands", [{ args: [], ret: Setof.ofSchema({ classid: (oid$1), objid: (oid$1), objsubid: (default_1$4), command_tag: (default_1$1), object_type: (default_1$1), schema_name: (default_1$1), object_identity: (default_1$1), in_extension: (default_1$8), command: (pg_ddl_command) }), isOperator: false }], args);
}
function pgEventTriggerDroppedObjects(...args) {
    return sqlFunction("pg_event_trigger_dropped_objects", [{ args: [], ret: Setof.ofSchema({ classid: (oid$1), objid: (oid$1), objsubid: (default_1$4), original: (default_1$8), normal: (default_1$8), is_temporary: (default_1$8), object_type: (default_1$1), schema_name: (default_1$1), object_name: (default_1$1), object_identity: (default_1$1), address_names: Array$1.of((default_1$1)), address_args: Array$1.of((default_1$1)) }), isOperator: false }], args);
}
function pgEventTriggerTableRewriteOid(...args) {
    return sqlFunction("pg_event_trigger_table_rewrite_oid", [{ args: [], ret: (oid$1), isOperator: false }], args);
}
function pgEventTriggerTableRewriteReason(...args) {
    return sqlFunction("pg_event_trigger_table_rewrite_reason", [{ args: [], ret: (default_1$4), isOperator: false }], args);
}
function pgExportSnapshot(...args) {
    return sqlFunction("pg_export_snapshot", [{ args: [], ret: (default_1$1), isOperator: false }], args);
}
function pgExtensionConfigDump(...args) {
    return sqlFunction("pg_extension_config_dump", [{ args: [(regclass$1), (default_1$1)], ret: (_void), isOperator: false }], args);
}
function pgExtensionUpdatePaths(...args) {
    return sqlFunction("pg_extension_update_paths", [{ args: [(name$1)], ret: Setof.ofSchema({ source: (default_1$1), target: (default_1$1), path: (default_1$1) }), isOperator: false }], args);
}
function pgFilenodeRelation(...args) {
    return sqlFunction("pg_filenode_relation", [{ args: [(oid$1), (oid$1)], ret: (regclass$1), isOperator: false }], args);
}
function pgFunctionIsVisible(...args) {
    return sqlFunction("pg_function_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgGetBackendMemoryContexts(...args) {
    return sqlFunction("pg_get_backend_memory_contexts", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), ident: (default_1$1), parent: (default_1$1), level: (default_1$4), total_bytes: (default_1$3), total_nblocks: (default_1$3), free_bytes: (default_1$3), free_chunks: (default_1$3), used_bytes: (default_1$3) }), isOperator: false }], args);
}
function pgGetCatalogForeignKeys(...args) {
    return sqlFunction("pg_get_catalog_foreign_keys", [{ args: [], ret: Setof.ofSchema({ fktable: (regclass$1), fkcols: Array$1.of((default_1$1)), pktable: (regclass$1), pkcols: Array$1.of((default_1$1)), is_array: (default_1$8), is_opt: (default_1$8) }), isOperator: false }], args);
}
function pgGetConstraintdef(...args) {
    return sqlFunction("pg_get_constraintdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetExpr(...args) {
    return sqlFunction("pg_get_expr", [{ args: [(pg_node_tree), (oid$1)], ret: (default_1$1), isOperator: false }, { args: [(pg_node_tree), (oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetFunctionArgDefault(...args) {
    return sqlFunction("pg_get_function_arg_default", [{ args: [(oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetFunctionArguments(...args) {
    return sqlFunction("pg_get_function_arguments", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetFunctionIdentityArguments(...args) {
    return sqlFunction("pg_get_function_identity_arguments", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetFunctionResult(...args) {
    return sqlFunction("pg_get_function_result", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetFunctionSqlbody(...args) {
    return sqlFunction("pg_get_function_sqlbody", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetFunctiondef(...args) {
    return sqlFunction("pg_get_functiondef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetIndexdef(...args) {
    return sqlFunction("pg_get_indexdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$4), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetKeywords(...args) {
    return sqlFunction("pg_get_keywords", [{ args: [], ret: Setof.ofSchema({ word: (default_1$1), catcode: (char$1), barelabel: (default_1$8), catdesc: (default_1$1), baredesc: (default_1$1) }), isOperator: false }], args);
}
function pgGetMultixactMembers(...args) {
    return sqlFunction("pg_get_multixact_members", [{ args: [(xid$1)], ret: Setof.ofSchema({ xid: (xid$1), mode: (default_1$1) }), isOperator: false }], args);
}
function pgGetObjectAddress(...args) {
    return sqlFunction("pg_get_object_address", [{ args: [(default_1$1), Array$1.of((default_1$1)), Array$1.of((default_1$1))], ret: Record.of({ classid: (oid$1), objid: (oid$1), objsubid: (default_1$4) }), isOperator: false }], args);
}
function pgGetPartitionConstraintdef(...args) {
    return sqlFunction("pg_get_partition_constraintdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetPartkeydef(...args) {
    return sqlFunction("pg_get_partkeydef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetPublicationTables(...args) {
    return sqlFunction("pg_get_publication_tables", [{ args: [Array$1.of((default_1$1))], ret: Setof.ofSchema({ pubid: (oid$1), relid: (oid$1), attrs: (int2vector), qual: (pg_node_tree) }), isOperator: false }], args);
}
function pgGetReplicaIdentityIndex(...args) {
    return sqlFunction("pg_get_replica_identity_index", [{ args: [(regclass$1)], ret: (regclass$1), isOperator: false }], args);
}
function pgGetReplicationSlots(...args) {
    return sqlFunction("pg_get_replication_slots", [{ args: [], ret: Setof.ofSchema({ slot_name: (name$1), plugin: (name$1), slot_type: (default_1$1), datoid: (oid$1), temporary: (default_1$8), active: (default_1$8), active_pid: (default_1$4), xmin: (xid$1), catalog_xmin: (xid$1), restart_lsn: (pg_lsn), confirmed_flush_lsn: (pg_lsn), wal_status: (default_1$1), safe_wal_size: (default_1$3), two_phase: (default_1$8), inactive_since: (timestamptz$1), conflicting: (default_1$8), invalidation_reason: (default_1$1), failover: (default_1$8), synced: (default_1$8) }), isOperator: false }], args);
}
function pgGetRuledef(...args) {
    return sqlFunction("pg_get_ruledef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetSerialSequence(...args) {
    return sqlFunction("pg_get_serial_sequence", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetShmemAllocations(...args) {
    return sqlFunction("pg_get_shmem_allocations", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), off: (default_1$3), size: (default_1$3), allocated_size: (default_1$3) }), isOperator: false }], args);
}
function pgGetStatisticsobjdef(...args) {
    return sqlFunction("pg_get_statisticsobjdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetStatisticsobjdefColumns(...args) {
    return sqlFunction("pg_get_statisticsobjdef_columns", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetStatisticsobjdefExpressions(...args) {
    return sqlFunction("pg_get_statisticsobjdef_expressions", [{ args: [(oid$1)], ret: Array$1.of((default_1$1)), isOperator: false }], args);
}
function pgGetTriggerdef(...args) {
    return sqlFunction("pg_get_triggerdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetUserbyid(...args) {
    return sqlFunction("pg_get_userbyid", [{ args: [(oid$1)], ret: (name$1), isOperator: false }], args);
}
function pgGetViewdef(...args) {
    return sqlFunction("pg_get_viewdef", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$8)], ret: (default_1$1), isOperator: false }, { args: [(oid$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function pgGetWaitEvents(...args) {
    return sqlFunction("pg_get_wait_events", [{ args: [], ret: Setof.ofSchema({ type: (default_1$1), name: (default_1$1), description: (default_1$1) }), isOperator: false }], args);
}
function pgGetWalReplayPauseState(...args) {
    return sqlFunction("pg_get_wal_replay_pause_state", [{ args: [], ret: (default_1$1), isOperator: false }], args);
}
function pgGetWalResourceManagers(...args) {
    return sqlFunction("pg_get_wal_resource_managers", [{ args: [], ret: Setof.ofSchema({ rm_id: (default_1$4), rm_name: (default_1$1), rm_builtin: (default_1$8) }), isOperator: false }], args);
}
function pgGetWalSummarizerState(...args) {
    return sqlFunction("pg_get_wal_summarizer_state", [{ args: [], ret: Record.of({ summarized_tli: (default_1$3), summarized_lsn: (pg_lsn), pending_lsn: (pg_lsn), summarizer_pid: (default_1$4) }), isOperator: false }], args);
}
function pgHasRole(...args) {
    return sqlFunction("pg_has_role", [{ args: [(name$1), (name$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(name$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (name$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgHbaFileRules(...args) {
    return sqlFunction("pg_hba_file_rules", [{ args: [], ret: Setof.ofSchema({ rule_number: (default_1$4), file_name: (default_1$1), line_number: (default_1$4), type: (default_1$1), database: Array$1.of((default_1$1)), user_name: Array$1.of((default_1$1)), address: (default_1$1), netmask: (default_1$1), auth_method: (default_1$1), options: Array$1.of((default_1$1)), error: (default_1$1) }), isOperator: false }], args);
}
function pgIdentFileMappings(...args) {
    return sqlFunction("pg_ident_file_mappings", [{ args: [], ret: Setof.ofSchema({ map_number: (default_1$4), file_name: (default_1$1), line_number: (default_1$4), map_name: (default_1$1), sys_name: (default_1$1), pg_username: (default_1$1), error: (default_1$1) }), isOperator: false }], args);
}
function pgIdentifyObject(...args) {
    return sqlFunction("pg_identify_object", [{ args: [(oid$1), (oid$1), (default_1$4)], ret: Record.of({ type: (default_1$1), schema: (default_1$1), name: (default_1$1), identity: (default_1$1) }), isOperator: false }], args);
}
function pgIdentifyObjectAsAddress(...args) {
    return sqlFunction("pg_identify_object_as_address", [{ args: [(oid$1), (oid$1), (default_1$4)], ret: Record.of({ type: (default_1$1), object_names: Array$1.of((default_1$1)), object_args: Array$1.of((default_1$1)) }), isOperator: false }], args);
}
function pgImportSystemCollations(...args) {
    return sqlFunction("pg_import_system_collations", [{ args: [(regnamespace)], ret: (default_1$4), isOperator: false }], args);
}
function pgIndexColumnHasProperty(...args) {
    return sqlFunction("pg_index_column_has_property", [{ args: [(regclass$1), (default_1$4), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgIndexHasProperty(...args) {
    return sqlFunction("pg_index_has_property", [{ args: [(regclass$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgIndexamHasProperty(...args) {
    return sqlFunction("pg_indexam_has_property", [{ args: [(oid$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgIndexamProgressPhasename(...args) {
    return sqlFunction("pg_indexam_progress_phasename", [{ args: [(oid$1), (default_1$3)], ret: (default_1$1), isOperator: false }], args);
}
function pgIndexesSize(...args) {
    return sqlFunction("pg_indexes_size", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgInputErrorInfo(...args) {
    return sqlFunction("pg_input_error_info", [{ args: [(default_1$1), (default_1$1)], ret: Record.of({ message: (default_1$1), detail: (default_1$1), hint: (default_1$1), sql_error_code: (default_1$1) }), isOperator: false }], args);
}
function pgInputIsValid(...args) {
    return sqlFunction("pg_input_is_valid", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgIsInRecovery(...args) {
    return sqlFunction("pg_is_in_recovery", [{ args: [], ret: (default_1$8), isOperator: false }], args);
}
function pgIsOtherTempSchema(...args) {
    return sqlFunction("pg_is_other_temp_schema", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgIsWalReplayPaused(...args) {
    return sqlFunction("pg_is_wal_replay_paused", [{ args: [], ret: (default_1$8), isOperator: false }], args);
}
function pgIsolationTestSessionIsBlocked(...args) {
    return sqlFunction("pg_isolation_test_session_is_blocked", [{ args: [(default_1$4), Array$1.of((default_1$4))], ret: (default_1$8), isOperator: false }], args);
}
function pgJitAvailable(...args) {
    return sqlFunction("pg_jit_available", [{ args: [], ret: (default_1$8), isOperator: false }], args);
}
function pgLastCommittedXact(...args) {
    return sqlFunction("pg_last_committed_xact", [{ args: [], ret: Record.of({ xid: (xid$1), timestamp: (timestamptz$1), roident: (oid$1) }), isOperator: false }], args);
}
function pgLastWalReceiveLsn(...args) {
    return sqlFunction("pg_last_wal_receive_lsn", [{ args: [], ret: (pg_lsn), isOperator: false }], args);
}
function pgLastWalReplayLsn(...args) {
    return sqlFunction("pg_last_wal_replay_lsn", [{ args: [], ret: (pg_lsn), isOperator: false }], args);
}
function pgLastXactReplayTimestamp(...args) {
    return sqlFunction("pg_last_xact_replay_timestamp", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function pgListeningChannels(...args) {
    return sqlFunction("pg_listening_channels", [{ args: [], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function pgLockStatus(...args) {
    return sqlFunction("pg_lock_status", [{ args: [], ret: Setof.ofSchema({ locktype: (default_1$1), database: (oid$1), relation: (oid$1), page: (default_1$4), tuple: (default_1$5), virtualxid: (default_1$1), transactionid: (xid$1), classid: (oid$1), objid: (oid$1), objsubid: (default_1$5), virtualtransaction: (default_1$1), pid: (default_1$4), mode: (default_1$1), granted: (default_1$8), fastpath: (default_1$8), waitstart: (timestamptz$1) }), isOperator: false }], args);
}
function pgLogBackendMemoryContexts(...args) {
    return sqlFunction("pg_log_backend_memory_contexts", [{ args: [(default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function pgLogStandbySnapshot(...args) {
    return sqlFunction("pg_log_standby_snapshot", [{ args: [], ret: (pg_lsn), isOperator: false }], args);
}
function pgLogicalEmitMessage(...args) {
    return sqlFunction("pg_logical_emit_message", [{ args: [(default_1$8), (default_1$1), (bytea), (default_1$8)], ret: (pg_lsn), isOperator: false }, { args: [(default_1$8), (default_1$1), (default_1$1), (default_1$8)], ret: (pg_lsn), isOperator: false }], args);
}
function pgLogicalSlotGetBinaryChanges(...args) {
    return sqlFunction("pg_logical_slot_get_binary_changes", [{ args: [(name$1), (pg_lsn), (default_1$4), Array$1.of((default_1$1))], ret: Setof.ofSchema({ lsn: (pg_lsn), xid: (xid$1), data: (bytea) }), isOperator: false }], args);
}
function pgLogicalSlotGetChanges(...args) {
    return sqlFunction("pg_logical_slot_get_changes", [{ args: [(name$1), (pg_lsn), (default_1$4), Array$1.of((default_1$1))], ret: Setof.ofSchema({ lsn: (pg_lsn), xid: (xid$1), data: (default_1$1) }), isOperator: false }], args);
}
function pgLogicalSlotPeekBinaryChanges(...args) {
    return sqlFunction("pg_logical_slot_peek_binary_changes", [{ args: [(name$1), (pg_lsn), (default_1$4), Array$1.of((default_1$1))], ret: Setof.ofSchema({ lsn: (pg_lsn), xid: (xid$1), data: (bytea) }), isOperator: false }], args);
}
function pgLogicalSlotPeekChanges(...args) {
    return sqlFunction("pg_logical_slot_peek_changes", [{ args: [(name$1), (pg_lsn), (default_1$4), Array$1.of((default_1$1))], ret: Setof.ofSchema({ lsn: (pg_lsn), xid: (xid$1), data: (default_1$1) }), isOperator: false }], args);
}
function pgLsArchiveStatusdir(...args) {
    return sqlFunction("pg_ls_archive_statusdir", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], args);
}
function pgLsDir(...args) {
    return sqlFunction("pg_ls_dir", [{ args: [(default_1$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$1), (default_1$8), (default_1$8)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function pgLsLogdir(...args) {
    return sqlFunction("pg_ls_logdir", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], args);
}
function pgLsLogicalmapdir(...args) {
    return sqlFunction("pg_ls_logicalmapdir", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], args);
}
function pgLsLogicalsnapdir(...args) {
    return sqlFunction("pg_ls_logicalsnapdir", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], args);
}
function pgLsReplslotdir(...args) {
    return sqlFunction("pg_ls_replslotdir", [{ args: [(default_1$1)], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], args);
}
function pgLsTmpdir(...args) {
    return sqlFunction("pg_ls_tmpdir", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }, { args: [(oid$1)], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], args);
}
function pgLsWaldir(...args) {
    return sqlFunction("pg_ls_waldir", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), size: (default_1$3), modification: (timestamptz$1) }), isOperator: false }], args);
}
function pgLsn(...args) {
    return sqlFunction("pg_lsn", [{ args: [(default_1$2)], ret: (pg_lsn), isOperator: false }], args);
}
function pgLsnCmp(...args) {
    return sqlFunction("pg_lsn_cmp", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$4), isOperator: false }], args);
}
function pgLsnEq(...args) {
    return sqlFunction("pg_lsn_eq", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], args);
}
function pgLsnGe(...args) {
    return sqlFunction("pg_lsn_ge", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], args);
}
function pgLsnGt(...args) {
    return sqlFunction("pg_lsn_gt", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], args);
}
function pgLsnHash(...args) {
    return sqlFunction("pg_lsn_hash", [{ args: [(pg_lsn)], ret: (default_1$4), isOperator: false }], args);
}
function pgLsnHashExtended(...args) {
    return sqlFunction("pg_lsn_hash_extended", [{ args: [(pg_lsn), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function pgLsnLarger(...args) {
    return sqlFunction("pg_lsn_larger", [{ args: [(pg_lsn), (pg_lsn)], ret: (pg_lsn), isOperator: false }], args);
}
function pgLsnLe(...args) {
    return sqlFunction("pg_lsn_le", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], args);
}
function pgLsnLt(...args) {
    return sqlFunction("pg_lsn_lt", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], args);
}
function pgLsnMi(...args) {
    return sqlFunction("pg_lsn_mi", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$2), isOperator: false }], args);
}
function pgLsnMii(...args) {
    return sqlFunction("pg_lsn_mii", [{ args: [(pg_lsn), (default_1$2)], ret: (pg_lsn), isOperator: false }], args);
}
function pgLsnNe(...args) {
    return sqlFunction("pg_lsn_ne", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$8), isOperator: false }], args);
}
function pgLsnPli(...args) {
    return sqlFunction("pg_lsn_pli", [{ args: [(pg_lsn), (default_1$2)], ret: (pg_lsn), isOperator: false }], args);
}
function pgLsnSmaller(...args) {
    return sqlFunction("pg_lsn_smaller", [{ args: [(pg_lsn), (pg_lsn)], ret: (pg_lsn), isOperator: false }], args);
}
function pgMcvListItems(...args) {
    return sqlFunction("pg_mcv_list_items", [{ args: [(pg_mcv_list)], ret: Setof.ofSchema({ index: (default_1$4), values: Array$1.of((default_1$1)), nulls: Array$1.of((default_1$8)), frequency: (default_1$6), base_frequency: (default_1$6) }), isOperator: false }], args);
}
function pgMyTempSchema(...args) {
    return sqlFunction("pg_my_temp_schema", [{ args: [], ret: (oid$1), isOperator: false }], args);
}
function pgNextoid(...args) {
    return sqlFunction("pg_nextoid", [{ args: [(regclass$1), (name$1), (regclass$1)], ret: (oid$1), isOperator: false }], args);
}
function pgNotificationQueueUsage(...args) {
    return sqlFunction("pg_notification_queue_usage", [{ args: [], ret: (default_1$6), isOperator: false }], args);
}
function pgNotify(...args) {
    return sqlFunction("pg_notify", [{ args: [(default_1$1), (default_1$1)], ret: (_void), isOperator: false }], args);
}
function pgOpclassIsVisible(...args) {
    return sqlFunction("pg_opclass_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgOperatorIsVisible(...args) {
    return sqlFunction("pg_operator_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgOpfamilyIsVisible(...args) {
    return sqlFunction("pg_opfamily_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgOptionsToTable(...args) {
    return sqlFunction("pg_options_to_table", [{ args: [Array$1.of((default_1$1))], ret: Setof.ofSchema({ option_name: (default_1$1), option_value: (default_1$1) }), isOperator: false }], args);
}
function pgPartitionAncestors(...args) {
    return sqlFunction("pg_partition_ancestors", [{ args: [(regclass$1)], ret: Setof.ofSchema({ relid: (regclass$1) }), isOperator: false }], args);
}
function pgPartitionRoot(...args) {
    return sqlFunction("pg_partition_root", [{ args: [(regclass$1)], ret: (regclass$1), isOperator: false }], args);
}
function pgPartitionTree(...args) {
    return sqlFunction("pg_partition_tree", [{ args: [(regclass$1)], ret: Setof.ofSchema({ relid: (regclass$1), parentrelid: (regclass$1), isleaf: (default_1$8), level: (default_1$4) }), isOperator: false }], args);
}
function pgPostmasterStartTime(...args) {
    return sqlFunction("pg_postmaster_start_time", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function pgPreparedStatement(...args) {
    return sqlFunction("pg_prepared_statement", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), statement: (default_1$1), prepare_time: (timestamptz$1), parameter_types: Array$1.of((regtype)), result_types: Array$1.of((regtype)), from_sql: (default_1$8), generic_plans: (default_1$3), custom_plans: (default_1$3) }), isOperator: false }], args);
}
function pgPreparedXact(...args) {
    return sqlFunction("pg_prepared_xact", [{ args: [], ret: Setof.ofSchema({ transaction: (xid$1), gid: (default_1$1), prepared: (timestamptz$1), ownerid: (oid$1), dbid: (oid$1) }), isOperator: false }], args);
}
function pgPromote(...args) {
    return sqlFunction("pg_promote", [{ args: [(default_1$8), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function pgReadBinaryFile(...args) {
    return sqlFunction("pg_read_binary_file", [{ args: [(default_1$1)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$3), (default_1$3)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$3), (default_1$3), (default_1$8)], ret: (bytea), isOperator: false }], args);
}
function pgReadFile(...args) {
    return sqlFunction("pg_read_file", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$3), (default_1$3)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$3), (default_1$3), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function pgRelationFilenode(...args) {
    return sqlFunction("pg_relation_filenode", [{ args: [(regclass$1)], ret: (oid$1), isOperator: false }], args);
}
function pgRelationFilepath(...args) {
    return sqlFunction("pg_relation_filepath", [{ args: [(regclass$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgRelationIsPublishable(...args) {
    return sqlFunction("pg_relation_is_publishable", [{ args: [(regclass$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgRelationIsUpdatable(...args) {
    return sqlFunction("pg_relation_is_updatable", [{ args: [(regclass$1), (default_1$8)], ret: (default_1$4), isOperator: false }], args);
}
function pgRelationSize(...args) {
    return sqlFunction("pg_relation_size", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }, { args: [(regclass$1), (default_1$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgReloadConf(...args) {
    return sqlFunction("pg_reload_conf", [{ args: [], ret: (default_1$8), isOperator: false }], args);
}
function pgReplicationOriginAdvance(...args) {
    return sqlFunction("pg_replication_origin_advance", [{ args: [(default_1$1), (pg_lsn)], ret: (_void), isOperator: false }], args);
}
function pgReplicationOriginCreate(...args) {
    return sqlFunction("pg_replication_origin_create", [{ args: [(default_1$1)], ret: (oid$1), isOperator: false }], args);
}
function pgReplicationOriginDrop(...args) {
    return sqlFunction("pg_replication_origin_drop", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], args);
}
function pgReplicationOriginOid(...args) {
    return sqlFunction("pg_replication_origin_oid", [{ args: [(default_1$1)], ret: (oid$1), isOperator: false }], args);
}
function pgReplicationOriginProgress(...args) {
    return sqlFunction("pg_replication_origin_progress", [{ args: [(default_1$1), (default_1$8)], ret: (pg_lsn), isOperator: false }], args);
}
function pgReplicationOriginSessionIsSetup(...args) {
    return sqlFunction("pg_replication_origin_session_is_setup", [{ args: [], ret: (default_1$8), isOperator: false }], args);
}
function pgReplicationOriginSessionProgress(...args) {
    return sqlFunction("pg_replication_origin_session_progress", [{ args: [(default_1$8)], ret: (pg_lsn), isOperator: false }], args);
}
function pgReplicationOriginSessionReset(...args) {
    return sqlFunction("pg_replication_origin_session_reset", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgReplicationOriginSessionSetup(...args) {
    return sqlFunction("pg_replication_origin_session_setup", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], args);
}
function pgReplicationOriginXactReset(...args) {
    return sqlFunction("pg_replication_origin_xact_reset", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgReplicationOriginXactSetup(...args) {
    return sqlFunction("pg_replication_origin_xact_setup", [{ args: [(pg_lsn), (timestamptz$1)], ret: (_void), isOperator: false }], args);
}
function pgReplicationSlotAdvance(...args) {
    return sqlFunction("pg_replication_slot_advance", [{ args: [(name$1), (pg_lsn)], ret: Record.of({ slot_name: (name$1), end_lsn: (pg_lsn) }), isOperator: false }], args);
}
function pgRotateLogfile(...args) {
    return sqlFunction("pg_rotate_logfile", [{ args: [], ret: (default_1$8), isOperator: false }], args);
}
function pgSafeSnapshotBlockingPids(...args) {
    return sqlFunction("pg_safe_snapshot_blocking_pids", [{ args: [(default_1$4)], ret: Array$1.of((default_1$4)), isOperator: false }], args);
}
function pgSequenceLastValue(...args) {
    return sqlFunction("pg_sequence_last_value", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgSequenceParameters(...args) {
    return sqlFunction("pg_sequence_parameters", [{ args: [(oid$1)], ret: Record.of({ start_value: (default_1$3), minimum_value: (default_1$3), maximum_value: (default_1$3), increment: (default_1$3), cycle_option: (default_1$8), cache_size: (default_1$3), data_type: (oid$1) }), isOperator: false }], args);
}
function pgSettingsGetFlags(...args) {
    return sqlFunction("pg_settings_get_flags", [{ args: [(default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], args);
}
function pgShowAllFileSettings(...args) {
    return sqlFunction("pg_show_all_file_settings", [{ args: [], ret: Setof.ofSchema({ sourcefile: (default_1$1), sourceline: (default_1$4), seqno: (default_1$4), name: (default_1$1), setting: (default_1$1), applied: (default_1$8), error: (default_1$1) }), isOperator: false }], args);
}
function pgShowAllSettings(...args) {
    return sqlFunction("pg_show_all_settings", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), setting: (default_1$1), unit: (default_1$1), category: (default_1$1), short_desc: (default_1$1), extra_desc: (default_1$1), context: (default_1$1), vartype: (default_1$1), source: (default_1$1), min_val: (default_1$1), max_val: (default_1$1), enumvals: Array$1.of((default_1$1)), boot_val: (default_1$1), reset_val: (default_1$1), sourcefile: (default_1$1), sourceline: (default_1$4), pending_restart: (default_1$8) }), isOperator: false }], args);
}
function pgShowReplicationOriginStatus(...args) {
    return sqlFunction("pg_show_replication_origin_status", [{ args: [], ret: Setof.ofSchema({ local_id: (oid$1), external_id: (default_1$1), remote_lsn: (pg_lsn), local_lsn: (pg_lsn) }), isOperator: false }], args);
}
function pgSizeBytes(...args) {
    return sqlFunction("pg_size_bytes", [{ args: [(default_1$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgSizePretty(...args) {
    return sqlFunction("pg_size_pretty", [{ args: [(default_1$3)], ret: (default_1$1), isOperator: false }, { args: [(default_1$2)], ret: (default_1$1), isOperator: false }], args);
}
function pgSleep(...args) {
    return sqlFunction("pg_sleep", [{ args: [(default_1$6)], ret: (_void), isOperator: false }], args);
}
function pgSleepFor(...args) {
    return sqlFunction("pg_sleep_for", [{ args: [(interval$1)], ret: (_void), isOperator: false }], args);
}
function pgSleepUntil(...args) {
    return sqlFunction("pg_sleep_until", [{ args: [(timestamptz$1)], ret: (_void), isOperator: false }], args);
}
function pgSnapshotXip(...args) {
    return sqlFunction("pg_snapshot_xip", [{ args: [(pg_snapshot)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function pgSnapshotXmax(...args) {
    return sqlFunction("pg_snapshot_xmax", [{ args: [(pg_snapshot)], ret: (xid8), isOperator: false }], args);
}
function pgSplitWalfileName(...args) {
    return sqlFunction("pg_split_walfile_name", [{ args: [(default_1$1)], ret: Record.of({ segment_number: (default_1$2), timeline_id: (default_1$3) }), isOperator: false }], args);
}
function pgStatClearSnapshot(...args) {
    return sqlFunction("pg_stat_clear_snapshot", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgStatFile(...args) {
    return sqlFunction("pg_stat_file", [{ args: [(default_1$1)], ret: Record.of({ size: (default_1$3), access: (timestamptz$1), modification: (timestamptz$1), change: (timestamptz$1), creation: (timestamptz$1), isdir: (default_1$8) }), isOperator: false }, { args: [(default_1$1), (default_1$8)], ret: Record.of({ size: (default_1$3), access: (timestamptz$1), modification: (timestamptz$1), change: (timestamptz$1), creation: (timestamptz$1), isdir: (default_1$8) }), isOperator: false }], args);
}
function pgStatForceNextFlush(...args) {
    return sqlFunction("pg_stat_force_next_flush", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgStatGetActivity(...args) {
    return sqlFunction("pg_stat_get_activity", [{ args: [(default_1$4)], ret: Setof.ofSchema({ datid: (oid$1), pid: (default_1$4), usesysid: (oid$1), application_name: (default_1$1), state: (default_1$1), query: (default_1$1), wait_event_type: (default_1$1), wait_event: (default_1$1), xact_start: (timestamptz$1), query_start: (timestamptz$1), backend_start: (timestamptz$1), state_change: (timestamptz$1), client_addr: (inet), client_hostname: (default_1$1), client_port: (default_1$4), backend_xid: (xid$1), backend_xmin: (xid$1), backend_type: (default_1$1), ssl: (default_1$8), sslversion: (default_1$1), sslcipher: (default_1$1), sslbits: (default_1$4), ssl_client_dn: (default_1$1), ssl_client_serial: (default_1$2), ssl_issuer_dn: (default_1$1), gss_auth: (default_1$8), gss_princ: (default_1$1), gss_enc: (default_1$8), gss_delegation: (default_1$8), leader_pid: (default_1$4), query_id: (default_1$3) }), isOperator: false }], args);
}
function pgStatGetAnalyzeCount(...args) {
    return sqlFunction("pg_stat_get_analyze_count", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetArchiver(...args) {
    return sqlFunction("pg_stat_get_archiver", [{ args: [], ret: Record.of({ archived_count: (default_1$3), last_archived_wal: (default_1$1), last_archived_time: (timestamptz$1), failed_count: (default_1$3), last_failed_wal: (default_1$1), last_failed_time: (timestamptz$1), stats_reset: (timestamptz$1) }), isOperator: false }], args);
}
function pgStatGetAutoanalyzeCount(...args) {
    return sqlFunction("pg_stat_get_autoanalyze_count", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetAutovacuumCount(...args) {
    return sqlFunction("pg_stat_get_autovacuum_count", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetBackendActivity(...args) {
    return sqlFunction("pg_stat_get_backend_activity", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function pgStatGetBackendActivityStart(...args) {
    return sqlFunction("pg_stat_get_backend_activity_start", [{ args: [(default_1$4)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetBackendClientAddr(...args) {
    return sqlFunction("pg_stat_get_backend_client_addr", [{ args: [(default_1$4)], ret: (inet), isOperator: false }], args);
}
function pgStatGetBackendClientPort(...args) {
    return sqlFunction("pg_stat_get_backend_client_port", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function pgStatGetBackendDbid(...args) {
    return sqlFunction("pg_stat_get_backend_dbid", [{ args: [(default_1$4)], ret: (oid$1), isOperator: false }], args);
}
function pgStatGetBackendIdset(...args) {
    return sqlFunction("pg_stat_get_backend_idset", [{ args: [], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function pgStatGetBackendPid(...args) {
    return sqlFunction("pg_stat_get_backend_pid", [{ args: [(default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function pgStatGetBackendStart(...args) {
    return sqlFunction("pg_stat_get_backend_start", [{ args: [(default_1$4)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetBackendSubxact(...args) {
    return sqlFunction("pg_stat_get_backend_subxact", [{ args: [(default_1$4)], ret: Record.of({ subxact_count: (default_1$4), subxact_overflowed: (default_1$8) }), isOperator: false }], args);
}
function pgStatGetBackendUserid(...args) {
    return sqlFunction("pg_stat_get_backend_userid", [{ args: [(default_1$4)], ret: (oid$1), isOperator: false }], args);
}
function pgStatGetBackendWaitEvent(...args) {
    return sqlFunction("pg_stat_get_backend_wait_event", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function pgStatGetBackendWaitEventType(...args) {
    return sqlFunction("pg_stat_get_backend_wait_event_type", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function pgStatGetBackendXactStart(...args) {
    return sqlFunction("pg_stat_get_backend_xact_start", [{ args: [(default_1$4)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetBgwriterBufWrittenClean(...args) {
    return sqlFunction("pg_stat_get_bgwriter_buf_written_clean", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetBgwriterMaxwrittenClean(...args) {
    return sqlFunction("pg_stat_get_bgwriter_maxwritten_clean", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetBgwriterStatResetTime(...args) {
    return sqlFunction("pg_stat_get_bgwriter_stat_reset_time", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetBlocksFetched(...args) {
    return sqlFunction("pg_stat_get_blocks_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetBlocksHit(...args) {
    return sqlFunction("pg_stat_get_blocks_hit", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetBufAlloc(...args) {
    return sqlFunction("pg_stat_get_buf_alloc", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetCheckpointerBuffersWritten(...args) {
    return sqlFunction("pg_stat_get_checkpointer_buffers_written", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetCheckpointerNumRequested(...args) {
    return sqlFunction("pg_stat_get_checkpointer_num_requested", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetCheckpointerNumTimed(...args) {
    return sqlFunction("pg_stat_get_checkpointer_num_timed", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetCheckpointerRestartpointsPerformed(...args) {
    return sqlFunction("pg_stat_get_checkpointer_restartpoints_performed", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetCheckpointerRestartpointsRequested(...args) {
    return sqlFunction("pg_stat_get_checkpointer_restartpoints_requested", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetCheckpointerRestartpointsTimed(...args) {
    return sqlFunction("pg_stat_get_checkpointer_restartpoints_timed", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetCheckpointerStatResetTime(...args) {
    return sqlFunction("pg_stat_get_checkpointer_stat_reset_time", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetCheckpointerSyncTime(...args) {
    return sqlFunction("pg_stat_get_checkpointer_sync_time", [{ args: [], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetCheckpointerWriteTime(...args) {
    return sqlFunction("pg_stat_get_checkpointer_write_time", [{ args: [], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetDbActiveTime(...args) {
    return sqlFunction("pg_stat_get_db_active_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetDbBlkReadTime(...args) {
    return sqlFunction("pg_stat_get_db_blk_read_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetDbBlkWriteTime(...args) {
    return sqlFunction("pg_stat_get_db_blk_write_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetDbBlocksFetched(...args) {
    return sqlFunction("pg_stat_get_db_blocks_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbBlocksHit(...args) {
    return sqlFunction("pg_stat_get_db_blocks_hit", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbChecksumFailures(...args) {
    return sqlFunction("pg_stat_get_db_checksum_failures", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbChecksumLastFailure(...args) {
    return sqlFunction("pg_stat_get_db_checksum_last_failure", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetDbConflictAll(...args) {
    return sqlFunction("pg_stat_get_db_conflict_all", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbConflictLock(...args) {
    return sqlFunction("pg_stat_get_db_conflict_lock", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbConflictLogicalslot(...args) {
    return sqlFunction("pg_stat_get_db_conflict_logicalslot", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbConflictSnapshot(...args) {
    return sqlFunction("pg_stat_get_db_conflict_snapshot", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbConflictStartupDeadlock(...args) {
    return sqlFunction("pg_stat_get_db_conflict_startup_deadlock", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbConflictTablespace(...args) {
    return sqlFunction("pg_stat_get_db_conflict_tablespace", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbDeadlocks(...args) {
    return sqlFunction("pg_stat_get_db_deadlocks", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbIdleInTransactionTime(...args) {
    return sqlFunction("pg_stat_get_db_idle_in_transaction_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetDbNumbackends(...args) {
    return sqlFunction("pg_stat_get_db_numbackends", [{ args: [(oid$1)], ret: (default_1$4), isOperator: false }], args);
}
function pgStatGetDbSessionTime(...args) {
    return sqlFunction("pg_stat_get_db_session_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetDbSessions(...args) {
    return sqlFunction("pg_stat_get_db_sessions", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbSessionsAbandoned(...args) {
    return sqlFunction("pg_stat_get_db_sessions_abandoned", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbSessionsFatal(...args) {
    return sqlFunction("pg_stat_get_db_sessions_fatal", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbSessionsKilled(...args) {
    return sqlFunction("pg_stat_get_db_sessions_killed", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbStatResetTime(...args) {
    return sqlFunction("pg_stat_get_db_stat_reset_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetDbTempBytes(...args) {
    return sqlFunction("pg_stat_get_db_temp_bytes", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbTempFiles(...args) {
    return sqlFunction("pg_stat_get_db_temp_files", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbTuplesDeleted(...args) {
    return sqlFunction("pg_stat_get_db_tuples_deleted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbTuplesFetched(...args) {
    return sqlFunction("pg_stat_get_db_tuples_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbTuplesInserted(...args) {
    return sqlFunction("pg_stat_get_db_tuples_inserted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbTuplesReturned(...args) {
    return sqlFunction("pg_stat_get_db_tuples_returned", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbTuplesUpdated(...args) {
    return sqlFunction("pg_stat_get_db_tuples_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbXactCommit(...args) {
    return sqlFunction("pg_stat_get_db_xact_commit", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDbXactRollback(...args) {
    return sqlFunction("pg_stat_get_db_xact_rollback", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetDeadTuples(...args) {
    return sqlFunction("pg_stat_get_dead_tuples", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetFunctionCalls(...args) {
    return sqlFunction("pg_stat_get_function_calls", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetFunctionSelfTime(...args) {
    return sqlFunction("pg_stat_get_function_self_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetFunctionTotalTime(...args) {
    return sqlFunction("pg_stat_get_function_total_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetInsSinceVacuum(...args) {
    return sqlFunction("pg_stat_get_ins_since_vacuum", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetIo(...args) {
    return sqlFunction("pg_stat_get_io", [{ args: [], ret: Setof.ofSchema({ backend_type: (default_1$1), object: (default_1$1), context: (default_1$1), reads: (default_1$3), read_time: (default_1$6), writes: (default_1$3), write_time: (default_1$6), writebacks: (default_1$3), writeback_time: (default_1$6), extends: (default_1$3), extend_time: (default_1$6), op_bytes: (default_1$3), hits: (default_1$3), evictions: (default_1$3), reuses: (default_1$3), fsyncs: (default_1$3), fsync_time: (default_1$6), stats_reset: (timestamptz$1) }), isOperator: false }], args);
}
function pgStatGetLastAnalyzeTime(...args) {
    return sqlFunction("pg_stat_get_last_analyze_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetLastAutoanalyzeTime(...args) {
    return sqlFunction("pg_stat_get_last_autoanalyze_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetLastAutovacuumTime(...args) {
    return sqlFunction("pg_stat_get_last_autovacuum_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetLastVacuumTime(...args) {
    return sqlFunction("pg_stat_get_last_vacuum_time", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetLastscan(...args) {
    return sqlFunction("pg_stat_get_lastscan", [{ args: [(oid$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetLiveTuples(...args) {
    return sqlFunction("pg_stat_get_live_tuples", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetModSinceAnalyze(...args) {
    return sqlFunction("pg_stat_get_mod_since_analyze", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetNumscans(...args) {
    return sqlFunction("pg_stat_get_numscans", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetProgressInfo(...args) {
    return sqlFunction("pg_stat_get_progress_info", [{ args: [(default_1$1)], ret: Setof.ofSchema({ pid: (default_1$4), datid: (oid$1), relid: (oid$1), param1: (default_1$3), param2: (default_1$3), param3: (default_1$3), param4: (default_1$3), param5: (default_1$3), param6: (default_1$3), param7: (default_1$3), param8: (default_1$3), param9: (default_1$3), param10: (default_1$3), param11: (default_1$3), param12: (default_1$3), param13: (default_1$3), param14: (default_1$3), param15: (default_1$3), param16: (default_1$3), param17: (default_1$3), param18: (default_1$3), param19: (default_1$3), param20: (default_1$3) }), isOperator: false }], args);
}
function pgStatGetRecoveryPrefetch(...args) {
    return sqlFunction("pg_stat_get_recovery_prefetch", [{ args: [], ret: Setof.ofSchema({ stats_reset: (timestamptz$1), prefetch: (default_1$3), hit: (default_1$3), skip_init: (default_1$3), skip_new: (default_1$3), skip_fpw: (default_1$3), skip_rep: (default_1$3), wal_distance: (default_1$4), block_distance: (default_1$4), io_depth: (default_1$4) }), isOperator: false }], args);
}
function pgStatGetReplicationSlot(...args) {
    return sqlFunction("pg_stat_get_replication_slot", [{ args: [(default_1$1)], ret: Record.of({ slot_name: (default_1$1), spill_txns: (default_1$3), spill_count: (default_1$3), spill_bytes: (default_1$3), stream_txns: (default_1$3), stream_count: (default_1$3), stream_bytes: (default_1$3), total_txns: (default_1$3), total_bytes: (default_1$3), stats_reset: (timestamptz$1) }), isOperator: false }], args);
}
function pgStatGetSlru(...args) {
    return sqlFunction("pg_stat_get_slru", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), blks_zeroed: (default_1$3), blks_hit: (default_1$3), blks_read: (default_1$3), blks_written: (default_1$3), blks_exists: (default_1$3), flushes: (default_1$3), truncates: (default_1$3), stats_reset: (timestamptz$1) }), isOperator: false }], args);
}
function pgStatGetSnapshotTimestamp(...args) {
    return sqlFunction("pg_stat_get_snapshot_timestamp", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function pgStatGetSubscription(...args) {
    return sqlFunction("pg_stat_get_subscription", [{ args: [(oid$1)], ret: Setof.ofSchema({ subid: (oid$1), relid: (oid$1), pid: (default_1$4), leader_pid: (default_1$4), received_lsn: (pg_lsn), last_msg_send_time: (timestamptz$1), last_msg_receipt_time: (timestamptz$1), latest_end_lsn: (pg_lsn), latest_end_time: (timestamptz$1), worker_type: (default_1$1) }), isOperator: false }], args);
}
function pgStatGetSubscriptionStats(...args) {
    return sqlFunction("pg_stat_get_subscription_stats", [{ args: [(oid$1)], ret: Record.of({ subid: (oid$1), apply_error_count: (default_1$3), sync_error_count: (default_1$3), stats_reset: (timestamptz$1) }), isOperator: false }], args);
}
function pgStatGetTuplesDeleted(...args) {
    return sqlFunction("pg_stat_get_tuples_deleted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetTuplesFetched(...args) {
    return sqlFunction("pg_stat_get_tuples_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetTuplesHotUpdated(...args) {
    return sqlFunction("pg_stat_get_tuples_hot_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetTuplesInserted(...args) {
    return sqlFunction("pg_stat_get_tuples_inserted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetTuplesNewpageUpdated(...args) {
    return sqlFunction("pg_stat_get_tuples_newpage_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetTuplesReturned(...args) {
    return sqlFunction("pg_stat_get_tuples_returned", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetTuplesUpdated(...args) {
    return sqlFunction("pg_stat_get_tuples_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetVacuumCount(...args) {
    return sqlFunction("pg_stat_get_vacuum_count", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetWal(...args) {
    return sqlFunction("pg_stat_get_wal", [{ args: [], ret: Record.of({ wal_records: (default_1$3), wal_fpi: (default_1$3), wal_bytes: (default_1$2), wal_buffers_full: (default_1$3), wal_write: (default_1$3), wal_sync: (default_1$3), wal_write_time: (default_1$6), wal_sync_time: (default_1$6), stats_reset: (timestamptz$1) }), isOperator: false }], args);
}
function pgStatGetWalReceiver(...args) {
    return sqlFunction("pg_stat_get_wal_receiver", [{ args: [], ret: Record.of({ pid: (default_1$4), status: (default_1$1), receive_start_lsn: (pg_lsn), receive_start_tli: (default_1$4), written_lsn: (pg_lsn), flushed_lsn: (pg_lsn), received_tli: (default_1$4), last_msg_send_time: (timestamptz$1), last_msg_receipt_time: (timestamptz$1), latest_end_lsn: (pg_lsn), latest_end_time: (timestamptz$1), slot_name: (default_1$1), sender_host: (default_1$1), sender_port: (default_1$4), conninfo: (default_1$1) }), isOperator: false }], args);
}
function pgStatGetWalSenders(...args) {
    return sqlFunction("pg_stat_get_wal_senders", [{ args: [], ret: Setof.ofSchema({ pid: (default_1$4), state: (default_1$1), sent_lsn: (pg_lsn), write_lsn: (pg_lsn), flush_lsn: (pg_lsn), replay_lsn: (pg_lsn), write_lag: (interval$1), flush_lag: (interval$1), replay_lag: (interval$1), sync_priority: (default_1$4), sync_state: (default_1$1), reply_time: (timestamptz$1) }), isOperator: false }], args);
}
function pgStatGetXactBlocksFetched(...args) {
    return sqlFunction("pg_stat_get_xact_blocks_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactBlocksHit(...args) {
    return sqlFunction("pg_stat_get_xact_blocks_hit", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactFunctionCalls(...args) {
    return sqlFunction("pg_stat_get_xact_function_calls", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactFunctionSelfTime(...args) {
    return sqlFunction("pg_stat_get_xact_function_self_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetXactFunctionTotalTime(...args) {
    return sqlFunction("pg_stat_get_xact_function_total_time", [{ args: [(oid$1)], ret: (default_1$6), isOperator: false }], args);
}
function pgStatGetXactNumscans(...args) {
    return sqlFunction("pg_stat_get_xact_numscans", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactTuplesDeleted(...args) {
    return sqlFunction("pg_stat_get_xact_tuples_deleted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactTuplesFetched(...args) {
    return sqlFunction("pg_stat_get_xact_tuples_fetched", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactTuplesHotUpdated(...args) {
    return sqlFunction("pg_stat_get_xact_tuples_hot_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactTuplesInserted(...args) {
    return sqlFunction("pg_stat_get_xact_tuples_inserted", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactTuplesNewpageUpdated(...args) {
    return sqlFunction("pg_stat_get_xact_tuples_newpage_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactTuplesReturned(...args) {
    return sqlFunction("pg_stat_get_xact_tuples_returned", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatGetXactTuplesUpdated(...args) {
    return sqlFunction("pg_stat_get_xact_tuples_updated", [{ args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgStatHaveStats(...args) {
    return sqlFunction("pg_stat_have_stats", [{ args: [(default_1$1), (oid$1), (oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgStatReset(...args) {
    return sqlFunction("pg_stat_reset", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgStatResetReplicationSlot(...args) {
    return sqlFunction("pg_stat_reset_replication_slot", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], args);
}
function pgStatResetShared(...args) {
    return sqlFunction("pg_stat_reset_shared", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], args);
}
function pgStatResetSingleFunctionCounters(...args) {
    return sqlFunction("pg_stat_reset_single_function_counters", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function pgStatResetSingleTableCounters(...args) {
    return sqlFunction("pg_stat_reset_single_table_counters", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function pgStatResetSlru(...args) {
    return sqlFunction("pg_stat_reset_slru", [{ args: [(default_1$1)], ret: (_void), isOperator: false }], args);
}
function pgStatResetSubscriptionStats(...args) {
    return sqlFunction("pg_stat_reset_subscription_stats", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function pgStatisticsObjIsVisible(...args) {
    return sqlFunction("pg_statistics_obj_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgStopMakingPinnedObjects(...args) {
    return sqlFunction("pg_stop_making_pinned_objects", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgSwitchWal(...args) {
    return sqlFunction("pg_switch_wal", [{ args: [], ret: (pg_lsn), isOperator: false }], args);
}
function pgSyncReplicationSlots(...args) {
    return sqlFunction("pg_sync_replication_slots", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgTableIsVisible(...args) {
    return sqlFunction("pg_table_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgTableSize(...args) {
    return sqlFunction("pg_table_size", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgTablespaceDatabases(...args) {
    return sqlFunction("pg_tablespace_databases", [{ args: [(oid$1)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function pgTablespaceLocation(...args) {
    return sqlFunction("pg_tablespace_location", [{ args: [(oid$1)], ret: (default_1$1), isOperator: false }], args);
}
function pgTablespaceSize(...args) {
    return sqlFunction("pg_tablespace_size", [{ args: [(name$1)], ret: (default_1$3), isOperator: false }, { args: [(oid$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgTerminateBackend(...args) {
    return sqlFunction("pg_terminate_backend", [{ args: [(default_1$4), (default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function pgTimezoneAbbrevs(...args) {
    return sqlFunction("pg_timezone_abbrevs", [{ args: [], ret: Setof.ofSchema({ abbrev: (default_1$1), utc_offset: (interval$1), is_dst: (default_1$8) }), isOperator: false }], args);
}
function pgTimezoneNames(...args) {
    return sqlFunction("pg_timezone_names", [{ args: [], ret: Setof.ofSchema({ name: (default_1$1), abbrev: (default_1$1), utc_offset: (interval$1), is_dst: (default_1$8) }), isOperator: false }], args);
}
function pgTotalRelationSize(...args) {
    return sqlFunction("pg_total_relation_size", [{ args: [(regclass$1)], ret: (default_1$3), isOperator: false }], args);
}
function pgTriggerDepth(...args) {
    return sqlFunction("pg_trigger_depth", [{ args: [], ret: (default_1$4), isOperator: false }], args);
}
function pgTryAdvisoryLock(...args) {
    return sqlFunction("pg_try_advisory_lock", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }, { args: [(default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function pgTryAdvisoryLockShared(...args) {
    return sqlFunction("pg_try_advisory_lock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }, { args: [(default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function pgTryAdvisoryXactLock(...args) {
    return sqlFunction("pg_try_advisory_xact_lock", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }, { args: [(default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function pgTryAdvisoryXactLockShared(...args) {
    return sqlFunction("pg_try_advisory_xact_lock_shared", [{ args: [(default_1$4), (default_1$4)], ret: (default_1$8), isOperator: false }, { args: [(default_1$3)], ret: (default_1$8), isOperator: false }], args);
}
function pgTsConfigIsVisible(...args) {
    return sqlFunction("pg_ts_config_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgTsDictIsVisible(...args) {
    return sqlFunction("pg_ts_dict_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgTsParserIsVisible(...args) {
    return sqlFunction("pg_ts_parser_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgTsTemplateIsVisible(...args) {
    return sqlFunction("pg_ts_template_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgTypeIsVisible(...args) {
    return sqlFunction("pg_type_is_visible", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pgTypeof(...args) {
    return sqlFunction("pg_typeof", [{ args: [(Any)], ret: (regtype), isOperator: false }], args);
}
function pgVisibleInSnapshot(...args) {
    return sqlFunction("pg_visible_in_snapshot", [{ args: [(xid8), (pg_snapshot)], ret: (default_1$8), isOperator: false }], args);
}
function pgWalLsnDiff(...args) {
    return sqlFunction("pg_wal_lsn_diff", [{ args: [(pg_lsn), (pg_lsn)], ret: (default_1$2), isOperator: false }], args);
}
function pgWalReplayPause(...args) {
    return sqlFunction("pg_wal_replay_pause", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgWalReplayResume(...args) {
    return sqlFunction("pg_wal_replay_resume", [{ args: [], ret: (_void), isOperator: false }], args);
}
function pgWalSummaryContents(...args) {
    return sqlFunction("pg_wal_summary_contents", [{ args: [(default_1$3), (pg_lsn), (pg_lsn)], ret: Setof.ofSchema({ relfilenode: (oid$1), reltablespace: (oid$1), reldatabase: (oid$1), relforknumber: (default_1$5), relblocknumber: (default_1$3), is_limit_block: (default_1$8) }), isOperator: false }], args);
}
function pgWalfileName(...args) {
    return sqlFunction("pg_walfile_name", [{ args: [(pg_lsn)], ret: (default_1$1), isOperator: false }], args);
}
function pgWalfileNameOffset(...args) {
    return sqlFunction("pg_walfile_name_offset", [{ args: [(pg_lsn)], ret: Record.of({ file_name: (default_1$1), file_offset: (default_1$4) }), isOperator: false }], args);
}
function pgXactCommitTimestamp(...args) {
    return sqlFunction("pg_xact_commit_timestamp", [{ args: [(xid$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function pgXactStatus(...args) {
    return sqlFunction("pg_xact_status", [{ args: [(xid8)], ret: (default_1$1), isOperator: false }], args);
}
function phrasetoTsquery(...args) {
    return sqlFunction("phraseto_tsquery", [{ args: [(regconfig), (default_1$1)], ret: (tsquery), isOperator: false }, { args: [(default_1$1)], ret: (tsquery), isOperator: false }], args);
}
function pi(...args) {
    return sqlFunction("pi", [{ args: [], ret: (default_1$6), isOperator: false }], args);
}
function plaintoTsquery(...args) {
    return sqlFunction("plainto_tsquery", [{ args: [(regconfig), (default_1$1)], ret: (tsquery), isOperator: false }, { args: [(default_1$1)], ret: (tsquery), isOperator: false }], args);
}
function plpgsqlCallHandler(...args) {
    return sqlFunction("plpgsql_call_handler", [{ args: [], ret: (language_handler), isOperator: false }], args);
}
function plpgsqlValidator(...args) {
    return sqlFunction("plpgsql_validator", [{ args: [(oid$1)], ret: (_void), isOperator: false }], args);
}
function point(...args) {
    return sqlFunction("point", [{ args: [(box$1)], ret: (point$1), isOperator: false }, { args: [(circle$1)], ret: (point$1), isOperator: false }, { args: [(default_1$6), (default_1$6)], ret: (point$1), isOperator: false }, { args: [(lseg$1)], ret: (point$1), isOperator: false }, { args: [(polygon$1)], ret: (point$1), isOperator: false }], args);
}
function pointAbove(...args) {
    return sqlFunction("point_above", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }, { args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function pointAdd(...args) {
    return sqlFunction("point_add", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: false }], args);
}
function pointBelow(...args) {
    return sqlFunction("point_below", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }, { args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function pointDistance(...args) {
    return sqlFunction("point_distance", [{ args: [(point$1), (point$1)], ret: (default_1$6), isOperator: false }], args);
}
function pointDiv(...args) {
    return sqlFunction("point_div", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: false }], args);
}
function pointEq(...args) {
    return sqlFunction("point_eq", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function pointHoriz(...args) {
    return sqlFunction("point_horiz", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function pointLeft(...args) {
    return sqlFunction("point_left", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function pointMul(...args) {
    return sqlFunction("point_mul", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: false }], args);
}
function pointNe(...args) {
    return sqlFunction("point_ne", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function pointRight(...args) {
    return sqlFunction("point_right", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function pointSub(...args) {
    return sqlFunction("point_sub", [{ args: [(point$1), (point$1)], ret: (point$1), isOperator: false }], args);
}
function pointVert(...args) {
    return sqlFunction("point_vert", [{ args: [(point$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyAbove(...args) {
    return sqlFunction("poly_above", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyBelow(...args) {
    return sqlFunction("poly_below", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyCenter(...args) {
    return sqlFunction("poly_center", [{ args: [(polygon$1)], ret: (point$1), isOperator: false }], args);
}
function polyContainPt(...args) {
    return sqlFunction("poly_contain_pt", [{ args: [(polygon$1), (point$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyContained(...args) {
    return sqlFunction("poly_contained", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyDistance(...args) {
    return sqlFunction("poly_distance", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$6), isOperator: false }], args);
}
function polyLeft(...args) {
    return sqlFunction("poly_left", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyNpoints(...args) {
    return sqlFunction("poly_npoints", [{ args: [(polygon$1)], ret: (default_1$4), isOperator: false }], args);
}
function polyOverabove(...args) {
    return sqlFunction("poly_overabove", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyOverbelow(...args) {
    return sqlFunction("poly_overbelow", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyOverlap(...args) {
    return sqlFunction("poly_overlap", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyOverleft(...args) {
    return sqlFunction("poly_overleft", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyOverright(...args) {
    return sqlFunction("poly_overright", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polyRight(...args) {
    return sqlFunction("poly_right", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polySame(...args) {
    return sqlFunction("poly_same", [{ args: [(polygon$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function polygon(...args) {
    return sqlFunction("polygon", [{ args: [(box$1)], ret: (polygon$1), isOperator: false }, { args: [(circle$1)], ret: (polygon$1), isOperator: false }, { args: [(default_1$4), (circle$1)], ret: (polygon$1), isOperator: false }, { args: [(path$1)], ret: (polygon$1), isOperator: false }], args);
}
function popen(...args) {
    return sqlFunction("popen", [{ args: [(path$1)], ret: (path$1), isOperator: false }], args);
}
function position(...args) {
    return sqlFunction("position", [{ args: [(bit$1), (bit$1)], ret: (default_1$4), isOperator: false }, { args: [(bytea), (bytea)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function postgresqlFdwValidator(...args) {
    return sqlFunction("postgresql_fdw_validator", [{ args: [Array$1.of((default_1$1)), (oid$1)], ret: (default_1$8), isOperator: false }], args);
}
function pow(...args) {
    return sqlFunction("pow", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function power(...args) {
    return sqlFunction("power", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function ptContainedCircle(...args) {
    return sqlFunction("pt_contained_circle", [{ args: [(point$1), (circle$1)], ret: (default_1$8), isOperator: false }], args);
}
function ptContainedPoly(...args) {
    return sqlFunction("pt_contained_poly", [{ args: [(point$1), (polygon$1)], ret: (default_1$8), isOperator: false }], args);
}
function queryToXml(...args) {
    return sqlFunction("query_to_xml", [{ args: [(default_1$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function queryToXmlAndXmlschema(...args) {
    return sqlFunction("query_to_xml_and_xmlschema", [{ args: [(default_1$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function queryToXmlschema(...args) {
    return sqlFunction("query_to_xmlschema", [{ args: [(default_1$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function querytree(...args) {
    return sqlFunction("querytree", [{ args: [(tsquery)], ret: (default_1$1), isOperator: false }], args);
}
function quoteIdent(...args) {
    return sqlFunction("quote_ident", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function quoteLiteral(...args) {
    return sqlFunction("quote_literal", [({ T }) => ({ args: [T], ret: (default_1$1), isOperator: false }), { args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function quoteNullable(...args) {
    return sqlFunction("quote_nullable", [({ T }) => ({ args: [T], ret: (default_1$1), isOperator: false }), { args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function radians(...args) {
    return sqlFunction("radians", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function radius(...args) {
    return sqlFunction("radius", [{ args: [(circle$1)], ret: (default_1$6), isOperator: false }], args);
}
function random(...args) {
    return sqlFunction("random", [{ args: [], ret: (default_1$6), isOperator: false }, { args: [(default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$3), (default_1$3)], ret: (default_1$3), isOperator: false }, { args: [(default_1$2), (default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function randomNormal(...args) {
    return sqlFunction("random_normal", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function rangeAdjacent(...args) {
    return sqlFunction("range_adjacent", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeAdjacentMultirange(...args) {
    return sqlFunction("range_adjacent_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function rangeAfter(...args) {
    return sqlFunction("range_after", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeAfterMultirange(...args) {
    return sqlFunction("range_after_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function rangeAgg(...args) {
    return sqlFunction("range_agg", [{ args: [anymultirange], ret: anymultirange, isOperator: false }, { args: [anyrange], ret: anymultirange, isOperator: false }], args);
}
function rangeBefore(...args) {
    return sqlFunction("range_before", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeBeforeMultirange(...args) {
    return sqlFunction("range_before_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function rangeCmp(...args) {
    return sqlFunction("range_cmp", [{ args: [anyrange, anyrange], ret: (default_1$4), isOperator: false }], args);
}
function rangeContainedBy(...args) {
    return sqlFunction("range_contained_by", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeContainedByMultirange(...args) {
    return sqlFunction("range_contained_by_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function rangeContains(...args) {
    return sqlFunction("range_contains", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeContainsElem(...args) {
    return sqlFunction("range_contains_elem", [({ T }) => ({ args: [anyrange, T], ret: (default_1$8), isOperator: false })], args);
}
function rangeContainsMultirange(...args) {
    return sqlFunction("range_contains_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function rangeEq(...args) {
    return sqlFunction("range_eq", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeGe(...args) {
    return sqlFunction("range_ge", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeGt(...args) {
    return sqlFunction("range_gt", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeIntersect(...args) {
    return sqlFunction("range_intersect", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], args);
}
function rangeIntersectAgg(...args) {
    return sqlFunction("range_intersect_agg", [{ args: [anymultirange], ret: anymultirange, isOperator: false }, { args: [anyrange], ret: anyrange, isOperator: false }], args);
}
function rangeIntersectAggTransfn(...args) {
    return sqlFunction("range_intersect_agg_transfn", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], args);
}
function rangeLe(...args) {
    return sqlFunction("range_le", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeLt(...args) {
    return sqlFunction("range_lt", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeMerge(...args) {
    return sqlFunction("range_merge", [{ args: [anymultirange], ret: anyrange, isOperator: false }, { args: [anyrange, anyrange], ret: anyrange, isOperator: false }], args);
}
function rangeMinus(...args) {
    return sqlFunction("range_minus", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], args);
}
function rangeNe(...args) {
    return sqlFunction("range_ne", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeOverlaps(...args) {
    return sqlFunction("range_overlaps", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeOverlapsMultirange(...args) {
    return sqlFunction("range_overlaps_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function rangeOverleft(...args) {
    return sqlFunction("range_overleft", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeOverleftMultirange(...args) {
    return sqlFunction("range_overleft_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function rangeOverright(...args) {
    return sqlFunction("range_overright", [{ args: [anyrange, anyrange], ret: (default_1$8), isOperator: false }], args);
}
function rangeOverrightMultirange(...args) {
    return sqlFunction("range_overright_multirange", [{ args: [anyrange, anymultirange], ret: (default_1$8), isOperator: false }], args);
}
function rangeUnion(...args) {
    return sqlFunction("range_union", [{ args: [anyrange, anyrange], ret: anyrange, isOperator: false }], args);
}
function rank(...args) {
    return sqlFunction("rank", [{ args: [], ret: (default_1$3), isOperator: false }, { args: [(Any)], ret: (default_1$3), isOperator: false }], args);
}
function recordEq(...args) {
    return sqlFunction("record_eq", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordGe(...args) {
    return sqlFunction("record_ge", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordGt(...args) {
    return sqlFunction("record_gt", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordImageEq(...args) {
    return sqlFunction("record_image_eq", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordImageGe(...args) {
    return sqlFunction("record_image_ge", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordImageGt(...args) {
    return sqlFunction("record_image_gt", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordImageLe(...args) {
    return sqlFunction("record_image_le", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordImageLt(...args) {
    return sqlFunction("record_image_lt", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordImageNe(...args) {
    return sqlFunction("record_image_ne", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordLe(...args) {
    return sqlFunction("record_le", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordLt(...args) {
    return sqlFunction("record_lt", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function recordNe(...args) {
    return sqlFunction("record_ne", [({ R }) => ({ args: [Record.of(R), Record.of(R)], ret: (default_1$8), isOperator: false })], args);
}
function regclass(...args) {
    return sqlFunction("regclass", [{ args: [(default_1$1)], ret: (regclass$1), isOperator: false }], args);
}
function regexpCount(...args) {
    return sqlFunction("regexp_count", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function regexpInstr(...args) {
    return sqlFunction("regexp_instr", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$4), (default_1$1)], ret: (default_1$4), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$4), (default_1$1), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function regexpLike(...args) {
    return sqlFunction("regexp_like", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function regexpMatch(...args) {
    return sqlFunction("regexp_match", [{ args: [(default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], args);
}
function regexpMatches(...args) {
    return sqlFunction("regexp_matches", [{ args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function regexpReplace(...args) {
    return sqlFunction("regexp_replace", [{ args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function regexpSplitToArray(...args) {
    return sqlFunction("regexp_split_to_array", [{ args: [(default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], args);
}
function regexpSplitToTable(...args) {
    return sqlFunction("regexp_split_to_table", [{ args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function regexpSubstr(...args) {
    return sqlFunction("regexp_substr", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$4), (default_1$4), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function regrAvgx(...args) {
    return sqlFunction("regr_avgx", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function regrAvgy(...args) {
    return sqlFunction("regr_avgy", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function regrCount(...args) {
    return sqlFunction("regr_count", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$3), isOperator: false }], args);
}
function regrIntercept(...args) {
    return sqlFunction("regr_intercept", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function regrR2(...args) {
    return sqlFunction("regr_r2", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function regrSlope(...args) {
    return sqlFunction("regr_slope", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function regrSxx(...args) {
    return sqlFunction("regr_sxx", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function regrSxy(...args) {
    return sqlFunction("regr_sxy", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function regrSyy(...args) {
    return sqlFunction("regr_syy", [{ args: [(default_1$6), (default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function repeat(...args) {
    return sqlFunction("repeat", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function replace(...args) {
    return sqlFunction("replace", [{ args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function reverse(...args) {
    return sqlFunction("reverse", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function right(...args) {
    return sqlFunction("right", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function round(...args) {
    return sqlFunction("round", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2), (default_1$4)], ret: (default_1$2), isOperator: false }], args);
}
function rowNumber(...args) {
    return sqlFunction("row_number", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function rowSecurityActive(...args) {
    return sqlFunction("row_security_active", [{ args: [(oid$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function rowToJson(...args) {
    return sqlFunction("row_to_json", [({ R }) => ({ args: [Record.of(R)], ret: (json), isOperator: false }), ({ R }) => ({ args: [Record.of(R), (default_1$8)], ret: (json), isOperator: false })], args);
}
function rpad(...args) {
    return sqlFunction("rpad", [{ args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function rtrim(...args) {
    return sqlFunction("rtrim", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }, { args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function satisfiesHashPartition(...args) {
    return sqlFunction("satisfies_hash_partition", [{ args: [(oid$1), (default_1$4), (default_1$4), (Any)], ret: (default_1$8), isOperator: false }], args);
}
function scale(...args) {
    return sqlFunction("scale", [{ args: [(default_1$2)], ret: (default_1$4), isOperator: false }], args);
}
function schemaToXml(...args) {
    return sqlFunction("schema_to_xml", [{ args: [(name$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function schemaToXmlAndXmlschema(...args) {
    return sqlFunction("schema_to_xml_and_xmlschema", [{ args: [(name$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function schemaToXmlschema(...args) {
    return sqlFunction("schema_to_xmlschema", [{ args: [(name$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function sessionUser(...args) {
    return sqlFunction("session_user", [{ args: [], ret: (name$1), isOperator: false }], args);
}
function setBit(...args) {
    return sqlFunction("set_bit", [{ args: [(bit$1), (default_1$4), (default_1$4)], ret: (bit$1), isOperator: false }, { args: [(bytea), (default_1$3), (default_1$4)], ret: (bytea), isOperator: false }], args);
}
function setByte(...args) {
    return sqlFunction("set_byte", [{ args: [(bytea), (default_1$4), (default_1$4)], ret: (bytea), isOperator: false }], args);
}
function setConfig(...args) {
    return sqlFunction("set_config", [{ args: [(default_1$1), (default_1$1), (default_1$8)], ret: (default_1$1), isOperator: false }], args);
}
function setMasklen(...args) {
    return sqlFunction("set_masklen", [{ args: [(cidr$1), (default_1$4)], ret: (cidr$1), isOperator: false }, { args: [(inet), (default_1$4)], ret: (inet), isOperator: false }], args);
}
function setseed(...args) {
    return sqlFunction("setseed", [{ args: [(default_1$6)], ret: (_void), isOperator: false }], args);
}
function setval(...args) {
    return sqlFunction("setval", [{ args: [(regclass$1), (default_1$3)], ret: (default_1$3), isOperator: false }, { args: [(regclass$1), (default_1$3), (default_1$8)], ret: (default_1$3), isOperator: false }], args);
}
function setweight(...args) {
    return sqlFunction("setweight", [{ args: [(tsvector), (char$1)], ret: (tsvector), isOperator: false }, { args: [(tsvector), (char$1), Array$1.of((default_1$1))], ret: (tsvector), isOperator: false }], args);
}
function sha224(...args) {
    return sqlFunction("sha224", [{ args: [(bytea)], ret: (bytea), isOperator: false }], args);
}
function sha256(...args) {
    return sqlFunction("sha256", [{ args: [(bytea)], ret: (bytea), isOperator: false }], args);
}
function sha384(...args) {
    return sqlFunction("sha384", [{ args: [(bytea)], ret: (bytea), isOperator: false }], args);
}
function sha512(...args) {
    return sqlFunction("sha512", [{ args: [(bytea)], ret: (bytea), isOperator: false }], args);
}
function shobjDescription(...args) {
    return sqlFunction("shobj_description", [{ args: [(oid$1), (name$1)], ret: (default_1$1), isOperator: false }], args);
}
function sign(...args) {
    return sqlFunction("sign", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function similarEscape(...args) {
    return sqlFunction("similar_escape", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function similarToEscape(...args) {
    return sqlFunction("similar_to_escape", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function sind(...args) {
    return sqlFunction("sind", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function sinh(...args) {
    return sqlFunction("sinh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function slope(...args) {
    return sqlFunction("slope", [{ args: [(point$1), (point$1)], ret: (default_1$6), isOperator: false }], args);
}
function spgPolyQuadCompress(...args) {
    return sqlFunction("spg_poly_quad_compress", [{ args: [(polygon$1)], ret: (box$1), isOperator: false }], args);
}
function splitPart(...args) {
    return sqlFunction("split_part", [{ args: [(default_1$1), (default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function sqrt(...args) {
    return sqlFunction("sqrt", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function startsWith(...args) {
    return sqlFunction("starts_with", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function statementTimestamp(...args) {
    return sqlFunction("statement_timestamp", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function stddev(...args) {
    return sqlFunction("stddev", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$2), isOperator: false }, { args: [(default_1$4)], ret: (default_1$2), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function stddevPop(...args) {
    return sqlFunction("stddev_pop", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$2), isOperator: false }, { args: [(default_1$4)], ret: (default_1$2), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function stddevSamp(...args) {
    return sqlFunction("stddev_samp", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$2), isOperator: false }, { args: [(default_1$4)], ret: (default_1$2), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function stringAgg(...args) {
    return sqlFunction("string_agg", [{ args: [(bytea), (bytea)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function stringToArray(...args) {
    return sqlFunction("string_to_array", [{ args: [(default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], args);
}
function stringToTable(...args) {
    return sqlFunction("string_to_table", [{ args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function strip(...args) {
    return sqlFunction("strip", [{ args: [(tsvector)], ret: (tsvector), isOperator: false }], args);
}
function strpos(...args) {
    return sqlFunction("strpos", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function substr(...args) {
    return sqlFunction("substr", [{ args: [(bytea), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(bytea), (default_1$4), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }], args);
}
function substring(...args) {
    return sqlFunction("substring", [{ args: [(bit$1), (default_1$4)], ret: (bit$1), isOperator: false }, { args: [(bit$1), (default_1$4), (default_1$4)], ret: (bit$1), isOperator: false }, { args: [(bytea), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(bytea), (default_1$4), (default_1$4)], ret: (bytea), isOperator: false }, { args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function sum(...args) {
    return sqlFunction("sum", [{ args: [(default_1$7)], ret: (default_1$7), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$3), isOperator: false }, { args: [(default_1$4)], ret: (default_1$3), isOperator: false }, { args: [(interval$1)], ret: (interval$1), isOperator: false }, { args: [(money$1)], ret: (money$1), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function suppressRedundantUpdatesTrigger(...args) {
    return sqlFunction("suppress_redundant_updates_trigger", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function systemUser(...args) {
    return sqlFunction("system_user", [{ args: [], ret: (default_1$1), isOperator: false }], args);
}
function tableToXml(...args) {
    return sqlFunction("table_to_xml", [{ args: [(regclass$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function tableToXmlAndXmlschema(...args) {
    return sqlFunction("table_to_xml_and_xmlschema", [{ args: [(regclass$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function tableToXmlschema(...args) {
    return sqlFunction("table_to_xmlschema", [{ args: [(regclass$1), (default_1$8), (default_1$8), (default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function tan(...args) {
    return sqlFunction("tan", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function tand(...args) {
    return sqlFunction("tand", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function tanh(...args) {
    return sqlFunction("tanh", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }], args);
}
function text(...args) {
    return sqlFunction("text", [{ args: [(default_1$8)], ret: (default_1$1), isOperator: false }, { args: [(bpchar$1)], ret: (default_1$1), isOperator: false }, { args: [(char$1)], ret: (default_1$1), isOperator: false }, { args: [(inet)], ret: (default_1$1), isOperator: false }, { args: [(name$1)], ret: (default_1$1), isOperator: false }, { args: [(xml$1)], ret: (default_1$1), isOperator: false }], args);
}
function textGe(...args) {
    return sqlFunction("text_ge", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textGt(...args) {
    return sqlFunction("text_gt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textLarger(...args) {
    return sqlFunction("text_larger", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function textLe(...args) {
    return sqlFunction("text_le", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textLt(...args) {
    return sqlFunction("text_lt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textPatternGe(...args) {
    return sqlFunction("text_pattern_ge", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textPatternGt(...args) {
    return sqlFunction("text_pattern_gt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textPatternLe(...args) {
    return sqlFunction("text_pattern_le", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textPatternLt(...args) {
    return sqlFunction("text_pattern_lt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textSmaller(...args) {
    return sqlFunction("text_smaller", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function textanycat(...args) {
    return sqlFunction("textanycat", [({ T }) => ({ args: [(default_1$1), T], ret: (default_1$1), isOperator: false })], args);
}
function textcat(...args) {
    return sqlFunction("textcat", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function texteq(...args) {
    return sqlFunction("texteq", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function texteqname(...args) {
    return sqlFunction("texteqname", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function textgename(...args) {
    return sqlFunction("textgename", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function textgtname(...args) {
    return sqlFunction("textgtname", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function texticlike(...args) {
    return sqlFunction("texticlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function texticnlike(...args) {
    return sqlFunction("texticnlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function texticregexeq(...args) {
    return sqlFunction("texticregexeq", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function texticregexne(...args) {
    return sqlFunction("texticregexne", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textlen(...args) {
    return sqlFunction("textlen", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function textlename(...args) {
    return sqlFunction("textlename", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function textlike(...args) {
    return sqlFunction("textlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textltname(...args) {
    return sqlFunction("textltname", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function textne(...args) {
    return sqlFunction("textne", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textnename(...args) {
    return sqlFunction("textnename", [{ args: [(default_1$1), (name$1)], ret: (default_1$8), isOperator: false }], args);
}
function textnlike(...args) {
    return sqlFunction("textnlike", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textregexeq(...args) {
    return sqlFunction("textregexeq", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function textregexne(...args) {
    return sqlFunction("textregexne", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function tideq(...args) {
    return sqlFunction("tideq", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], args);
}
function tidge(...args) {
    return sqlFunction("tidge", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], args);
}
function tidgt(...args) {
    return sqlFunction("tidgt", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], args);
}
function tidlarger(...args) {
    return sqlFunction("tidlarger", [{ args: [(tid), (tid)], ret: (tid), isOperator: false }], args);
}
function tidle(...args) {
    return sqlFunction("tidle", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], args);
}
function tidlt(...args) {
    return sqlFunction("tidlt", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], args);
}
function tidne(...args) {
    return sqlFunction("tidne", [{ args: [(tid), (tid)], ret: (default_1$8), isOperator: false }], args);
}
function tidsmaller(...args) {
    return sqlFunction("tidsmaller", [{ args: [(tid), (tid)], ret: (tid), isOperator: false }], args);
}
function time(...args) {
    return sqlFunction("time", [{ args: [(interval$1)], ret: (time$1), isOperator: false }, { args: [(time$1), (default_1$4)], ret: (time$1), isOperator: false }, { args: [(timestamp$1)], ret: (time$1), isOperator: false }, { args: [(timestamptz$1)], ret: (time$1), isOperator: false }, { args: [(timetz$1)], ret: (time$1), isOperator: false }], args);
}
function timeCmp(...args) {
    return sqlFunction("time_cmp", [{ args: [(time$1), (time$1)], ret: (default_1$4), isOperator: false }], args);
}
function timeEq(...args) {
    return sqlFunction("time_eq", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], args);
}
function timeGe(...args) {
    return sqlFunction("time_ge", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], args);
}
function timeGt(...args) {
    return sqlFunction("time_gt", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], args);
}
function timeHash(...args) {
    return sqlFunction("time_hash", [{ args: [(time$1)], ret: (default_1$4), isOperator: false }], args);
}
function timeHashExtended(...args) {
    return sqlFunction("time_hash_extended", [{ args: [(time$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function timeLarger(...args) {
    return sqlFunction("time_larger", [{ args: [(time$1), (time$1)], ret: (time$1), isOperator: false }], args);
}
function timeLe(...args) {
    return sqlFunction("time_le", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], args);
}
function timeLt(...args) {
    return sqlFunction("time_lt", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], args);
}
function timeMiInterval(...args) {
    return sqlFunction("time_mi_interval", [{ args: [(time$1), (interval$1)], ret: (time$1), isOperator: false }], args);
}
function timeMiTime(...args) {
    return sqlFunction("time_mi_time", [{ args: [(time$1), (time$1)], ret: (interval$1), isOperator: false }], args);
}
function timeNe(...args) {
    return sqlFunction("time_ne", [{ args: [(time$1), (time$1)], ret: (default_1$8), isOperator: false }], args);
}
function timePlInterval(...args) {
    return sqlFunction("time_pl_interval", [{ args: [(time$1), (interval$1)], ret: (time$1), isOperator: false }], args);
}
function timeSmaller(...args) {
    return sqlFunction("time_smaller", [{ args: [(time$1), (time$1)], ret: (time$1), isOperator: false }], args);
}
function timedatePl(...args) {
    return sqlFunction("timedate_pl", [{ args: [(time$1), (date$1)], ret: (timestamp$1), isOperator: false }], args);
}
function timeofday(...args) {
    return sqlFunction("timeofday", [{ args: [], ret: (default_1$1), isOperator: false }], args);
}
function timestamp(...args) {
    return sqlFunction("timestamp", [{ args: [(date$1)], ret: (timestamp$1), isOperator: false }, { args: [(date$1), (time$1)], ret: (timestamp$1), isOperator: false }, { args: [(timestamp$1), (default_1$4)], ret: (timestamp$1), isOperator: false }, { args: [(timestamptz$1)], ret: (timestamp$1), isOperator: false }], args);
}
function timestampCmp(...args) {
    return sqlFunction("timestamp_cmp", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$4), isOperator: false }], args);
}
function timestampCmpDate(...args) {
    return sqlFunction("timestamp_cmp_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$4), isOperator: false }], args);
}
function timestampCmpTimestamptz(...args) {
    return sqlFunction("timestamp_cmp_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$4), isOperator: false }], args);
}
function timestampEq(...args) {
    return sqlFunction("timestamp_eq", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampEqDate(...args) {
    return sqlFunction("timestamp_eq_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampEqTimestamptz(...args) {
    return sqlFunction("timestamp_eq_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampGe(...args) {
    return sqlFunction("timestamp_ge", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampGeDate(...args) {
    return sqlFunction("timestamp_ge_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampGeTimestamptz(...args) {
    return sqlFunction("timestamp_ge_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampGt(...args) {
    return sqlFunction("timestamp_gt", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampGtDate(...args) {
    return sqlFunction("timestamp_gt_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampGtTimestamptz(...args) {
    return sqlFunction("timestamp_gt_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampHash(...args) {
    return sqlFunction("timestamp_hash", [{ args: [(timestamp$1)], ret: (default_1$4), isOperator: false }], args);
}
function timestampHashExtended(...args) {
    return sqlFunction("timestamp_hash_extended", [{ args: [(timestamp$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function timestampLarger(...args) {
    return sqlFunction("timestamp_larger", [{ args: [(timestamp$1), (timestamp$1)], ret: (timestamp$1), isOperator: false }], args);
}
function timestampLe(...args) {
    return sqlFunction("timestamp_le", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampLeDate(...args) {
    return sqlFunction("timestamp_le_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampLeTimestamptz(...args) {
    return sqlFunction("timestamp_le_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampLt(...args) {
    return sqlFunction("timestamp_lt", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampLtDate(...args) {
    return sqlFunction("timestamp_lt_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampLtTimestamptz(...args) {
    return sqlFunction("timestamp_lt_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampMi(...args) {
    return sqlFunction("timestamp_mi", [{ args: [(timestamp$1), (timestamp$1)], ret: (interval$1), isOperator: false }], args);
}
function timestampMiInterval(...args) {
    return sqlFunction("timestamp_mi_interval", [{ args: [(timestamp$1), (interval$1)], ret: (timestamp$1), isOperator: false }], args);
}
function timestampNe(...args) {
    return sqlFunction("timestamp_ne", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampNeDate(...args) {
    return sqlFunction("timestamp_ne_date", [{ args: [(timestamp$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampNeTimestamptz(...args) {
    return sqlFunction("timestamp_ne_timestamptz", [{ args: [(timestamp$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestampPlInterval(...args) {
    return sqlFunction("timestamp_pl_interval", [{ args: [(timestamp$1), (interval$1)], ret: (timestamp$1), isOperator: false }], args);
}
function timestampSmaller(...args) {
    return sqlFunction("timestamp_smaller", [{ args: [(timestamp$1), (timestamp$1)], ret: (timestamp$1), isOperator: false }], args);
}
function timestamptz(...args) {
    return sqlFunction("timestamptz", [{ args: [(date$1)], ret: (timestamptz$1), isOperator: false }, { args: [(date$1), (time$1)], ret: (timestamptz$1), isOperator: false }, { args: [(date$1), (timetz$1)], ret: (timestamptz$1), isOperator: false }, { args: [(timestamp$1)], ret: (timestamptz$1), isOperator: false }, { args: [(timestamptz$1), (default_1$4)], ret: (timestamptz$1), isOperator: false }], args);
}
function timestamptzCmp(...args) {
    return sqlFunction("timestamptz_cmp", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$4), isOperator: false }], args);
}
function timestamptzCmpDate(...args) {
    return sqlFunction("timestamptz_cmp_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$4), isOperator: false }], args);
}
function timestamptzCmpTimestamp(...args) {
    return sqlFunction("timestamptz_cmp_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$4), isOperator: false }], args);
}
function timestamptzEq(...args) {
    return sqlFunction("timestamptz_eq", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzEqDate(...args) {
    return sqlFunction("timestamptz_eq_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzEqTimestamp(...args) {
    return sqlFunction("timestamptz_eq_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzGe(...args) {
    return sqlFunction("timestamptz_ge", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzGeDate(...args) {
    return sqlFunction("timestamptz_ge_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzGeTimestamp(...args) {
    return sqlFunction("timestamptz_ge_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzGt(...args) {
    return sqlFunction("timestamptz_gt", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzGtDate(...args) {
    return sqlFunction("timestamptz_gt_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzGtTimestamp(...args) {
    return sqlFunction("timestamptz_gt_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzLarger(...args) {
    return sqlFunction("timestamptz_larger", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function timestamptzLe(...args) {
    return sqlFunction("timestamptz_le", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzLeDate(...args) {
    return sqlFunction("timestamptz_le_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzLeTimestamp(...args) {
    return sqlFunction("timestamptz_le_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzLt(...args) {
    return sqlFunction("timestamptz_lt", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzLtDate(...args) {
    return sqlFunction("timestamptz_lt_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzLtTimestamp(...args) {
    return sqlFunction("timestamptz_lt_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzMi(...args) {
    return sqlFunction("timestamptz_mi", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (interval$1), isOperator: false }], args);
}
function timestamptzMiInterval(...args) {
    return sqlFunction("timestamptz_mi_interval", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function timestamptzNe(...args) {
    return sqlFunction("timestamptz_ne", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzNeDate(...args) {
    return sqlFunction("timestamptz_ne_date", [{ args: [(timestamptz$1), (date$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzNeTimestamp(...args) {
    return sqlFunction("timestamptz_ne_timestamp", [{ args: [(timestamptz$1), (timestamp$1)], ret: (default_1$8), isOperator: false }], args);
}
function timestamptzPlInterval(...args) {
    return sqlFunction("timestamptz_pl_interval", [{ args: [(timestamptz$1), (interval$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function timestamptzSmaller(...args) {
    return sqlFunction("timestamptz_smaller", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function timetz(...args) {
    return sqlFunction("timetz", [{ args: [(time$1)], ret: (timetz$1), isOperator: false }, { args: [(timestamptz$1)], ret: (timetz$1), isOperator: false }, { args: [(timetz$1), (default_1$4)], ret: (timetz$1), isOperator: false }], args);
}
function timetzCmp(...args) {
    return sqlFunction("timetz_cmp", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$4), isOperator: false }], args);
}
function timetzEq(...args) {
    return sqlFunction("timetz_eq", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timetzGe(...args) {
    return sqlFunction("timetz_ge", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timetzGt(...args) {
    return sqlFunction("timetz_gt", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timetzHash(...args) {
    return sqlFunction("timetz_hash", [{ args: [(timetz$1)], ret: (default_1$4), isOperator: false }], args);
}
function timetzHashExtended(...args) {
    return sqlFunction("timetz_hash_extended", [{ args: [(timetz$1), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function timetzLarger(...args) {
    return sqlFunction("timetz_larger", [{ args: [(timetz$1), (timetz$1)], ret: (timetz$1), isOperator: false }], args);
}
function timetzLe(...args) {
    return sqlFunction("timetz_le", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timetzLt(...args) {
    return sqlFunction("timetz_lt", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timetzMiInterval(...args) {
    return sqlFunction("timetz_mi_interval", [{ args: [(timetz$1), (interval$1)], ret: (timetz$1), isOperator: false }], args);
}
function timetzNe(...args) {
    return sqlFunction("timetz_ne", [{ args: [(timetz$1), (timetz$1)], ret: (default_1$8), isOperator: false }], args);
}
function timetzPlInterval(...args) {
    return sqlFunction("timetz_pl_interval", [{ args: [(timetz$1), (interval$1)], ret: (timetz$1), isOperator: false }], args);
}
function timetzSmaller(...args) {
    return sqlFunction("timetz_smaller", [{ args: [(timetz$1), (timetz$1)], ret: (timetz$1), isOperator: false }], args);
}
function timetzdatePl(...args) {
    return sqlFunction("timetzdate_pl", [{ args: [(timetz$1), (date$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function timezone(...args) {
    return sqlFunction("timezone", [{ args: [(interval$1), (timestamptz$1)], ret: (timestamp$1), isOperator: false }, { args: [(default_1$1), (timestamptz$1)], ret: (timestamp$1), isOperator: false }, { args: [(timestamptz$1)], ret: (timestamp$1), isOperator: false }, { args: [(interval$1), (timestamp$1)], ret: (timestamptz$1), isOperator: false }, { args: [(default_1$1), (timestamp$1)], ret: (timestamptz$1), isOperator: false }, { args: [(timestamp$1)], ret: (timestamptz$1), isOperator: false }, { args: [(interval$1), (timetz$1)], ret: (timetz$1), isOperator: false }, { args: [(default_1$1), (timetz$1)], ret: (timetz$1), isOperator: false }, { args: [(timetz$1)], ret: (timetz$1), isOperator: false }], args);
}
function toAscii(...args) {
    return sqlFunction("to_ascii", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (name$1)], ret: (default_1$1), isOperator: false }], args);
}
function toChar(...args) {
    return sqlFunction("to_char", [{ args: [(default_1$7), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$6), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$4), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$3), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(interval$1), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$2), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(timestamp$1), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(timestamptz$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function toDate(...args) {
    return sqlFunction("to_date", [{ args: [(default_1$1), (default_1$1)], ret: (date$1), isOperator: false }], args);
}
function toHex(...args) {
    return sqlFunction("to_hex", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$3)], ret: (default_1$1), isOperator: false }], args);
}
function toJson(...args) {
    return sqlFunction("to_json", [({ T }) => ({ args: [T], ret: (json), isOperator: false })], args);
}
function toJsonb(...args) {
    return sqlFunction("to_jsonb", [({ T }) => ({ args: [T], ret: (jsonb), isOperator: false })], args);
}
function toNumber(...args) {
    return sqlFunction("to_number", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$2), isOperator: false }], args);
}
function toOct(...args) {
    return sqlFunction("to_oct", [{ args: [(default_1$4)], ret: (default_1$1), isOperator: false }, { args: [(default_1$3)], ret: (default_1$1), isOperator: false }], args);
}
function toRegclass(...args) {
    return sqlFunction("to_regclass", [{ args: [(default_1$1)], ret: (regclass$1), isOperator: false }], args);
}
function toRegcollation(...args) {
    return sqlFunction("to_regcollation", [{ args: [(default_1$1)], ret: (regcollation), isOperator: false }], args);
}
function toRegnamespace(...args) {
    return sqlFunction("to_regnamespace", [{ args: [(default_1$1)], ret: (regnamespace), isOperator: false }], args);
}
function toRegoper(...args) {
    return sqlFunction("to_regoper", [{ args: [(default_1$1)], ret: (regoper), isOperator: false }], args);
}
function toRegoperator(...args) {
    return sqlFunction("to_regoperator", [{ args: [(default_1$1)], ret: (regoperator), isOperator: false }], args);
}
function toRegproc(...args) {
    return sqlFunction("to_regproc", [{ args: [(default_1$1)], ret: (regproc), isOperator: false }], args);
}
function toRegprocedure(...args) {
    return sqlFunction("to_regprocedure", [{ args: [(default_1$1)], ret: (regprocedure), isOperator: false }], args);
}
function toRegrole(...args) {
    return sqlFunction("to_regrole", [{ args: [(default_1$1)], ret: (regrole), isOperator: false }], args);
}
function toRegtype(...args) {
    return sqlFunction("to_regtype", [{ args: [(default_1$1)], ret: (regtype), isOperator: false }], args);
}
function toRegtypemod(...args) {
    return sqlFunction("to_regtypemod", [{ args: [(default_1$1)], ret: (default_1$4), isOperator: false }], args);
}
function toTimestamp(...args) {
    return sqlFunction("to_timestamp", [{ args: [(default_1$6)], ret: (timestamptz$1), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: (timestamptz$1), isOperator: false }], args);
}
function toTsquery(...args) {
    return sqlFunction("to_tsquery", [{ args: [(regconfig), (default_1$1)], ret: (tsquery), isOperator: false }, { args: [(default_1$1)], ret: (tsquery), isOperator: false }], args);
}
function toTsvector(...args) {
    return sqlFunction("to_tsvector", [{ args: [(json)], ret: (tsvector), isOperator: false }, { args: [(jsonb)], ret: (tsvector), isOperator: false }, { args: [(regconfig), (json)], ret: (tsvector), isOperator: false }, { args: [(regconfig), (jsonb)], ret: (tsvector), isOperator: false }, { args: [(regconfig), (default_1$1)], ret: (tsvector), isOperator: false }, { args: [(default_1$1)], ret: (tsvector), isOperator: false }], args);
}
function transactionTimestamp(...args) {
    return sqlFunction("transaction_timestamp", [{ args: [], ret: (timestamptz$1), isOperator: false }], args);
}
function translate(...args) {
    return sqlFunction("translate", [{ args: [(default_1$1), (default_1$1), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function trimArray(...args) {
    return sqlFunction("trim_array", [({ T }) => ({ args: [Array$1.of(T), (default_1$4)], ret: Array$1.of(T), isOperator: false })], args);
}
function trimScale(...args) {
    return sqlFunction("trim_scale", [{ args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function trunc(...args) {
    return sqlFunction("trunc", [{ args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(macaddr$1)], ret: (macaddr$1), isOperator: false }, { args: [(macaddr8$1)], ret: (macaddr8$1), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2), (default_1$4)], ret: (default_1$2), isOperator: false }], args);
}
function tsDebug(...args) {
    return sqlFunction("ts_debug", [{ args: [(regconfig), (default_1$1)], ret: Setof.ofSchema({ alias: (default_1$1), description: (default_1$1), token: (default_1$1), dictionaries: Array$1.of((regdictionary)), dictionary: (regdictionary), lexemes: Array$1.of((default_1$1)) }), isOperator: false }, { args: [(default_1$1)], ret: Setof.ofSchema({ alias: (default_1$1), description: (default_1$1), token: (default_1$1), dictionaries: Array$1.of((regdictionary)), dictionary: (regdictionary), lexemes: Array$1.of((default_1$1)) }), isOperator: false }], args);
}
function tsDelete(...args) {
    return sqlFunction("ts_delete", [{ args: [(tsvector), Array$1.of((default_1$1))], ret: (tsvector), isOperator: false }, { args: [(tsvector), (default_1$1)], ret: (tsvector), isOperator: false }], args);
}
function tsFilter(...args) {
    return sqlFunction("ts_filter", [{ args: [(tsvector), Array$1.of((char$1))], ret: (tsvector), isOperator: false }], args);
}
function tsHeadline(...args) {
    return sqlFunction("ts_headline", [{ args: [(json), (tsquery)], ret: (json), isOperator: false }, { args: [(json), (tsquery), (default_1$1)], ret: (json), isOperator: false }, { args: [(regconfig), (json), (tsquery)], ret: (json), isOperator: false }, { args: [(regconfig), (json), (tsquery), (default_1$1)], ret: (json), isOperator: false }, { args: [(jsonb), (tsquery)], ret: (jsonb), isOperator: false }, { args: [(jsonb), (tsquery), (default_1$1)], ret: (jsonb), isOperator: false }, { args: [(regconfig), (jsonb), (tsquery)], ret: (jsonb), isOperator: false }, { args: [(regconfig), (jsonb), (tsquery), (default_1$1)], ret: (jsonb), isOperator: false }, { args: [(regconfig), (default_1$1), (tsquery)], ret: (default_1$1), isOperator: false }, { args: [(regconfig), (default_1$1), (tsquery), (default_1$1)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (tsquery)], ret: (default_1$1), isOperator: false }, { args: [(default_1$1), (tsquery), (default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function tsLexize(...args) {
    return sqlFunction("ts_lexize", [{ args: [(regdictionary), (default_1$1)], ret: Array$1.of((default_1$1)), isOperator: false }], args);
}
function tsMatchQv(...args) {
    return sqlFunction("ts_match_qv", [{ args: [(tsquery), (tsvector)], ret: (default_1$8), isOperator: false }, { args: [(tsquery), (tsvector)], ret: (default_1$8), isOperator: false }], args);
}
function tsMatchTq(...args) {
    return sqlFunction("ts_match_tq", [{ args: [(default_1$1), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsMatchTt(...args) {
    return sqlFunction("ts_match_tt", [{ args: [(default_1$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function tsMatchVq(...args) {
    return sqlFunction("ts_match_vq", [{ args: [(tsvector), (tsquery)], ret: (default_1$8), isOperator: false }, { args: [(tsvector), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsParse(...args) {
    return sqlFunction("ts_parse", [{ args: [(oid$1), (default_1$1)], ret: Setof.ofSchema({ tokid: (default_1$4), token: (default_1$1) }), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({ tokid: (default_1$4), token: (default_1$1) }), isOperator: false }], args);
}
function tsRank(...args) {
    return sqlFunction("ts_rank", [{ args: [Array$1.of((default_1$7)), (tsvector), (tsquery)], ret: (default_1$7), isOperator: false }, { args: [Array$1.of((default_1$7)), (tsvector), (tsquery), (default_1$4)], ret: (default_1$7), isOperator: false }, { args: [(tsvector), (tsquery)], ret: (default_1$7), isOperator: false }, { args: [(tsvector), (tsquery), (default_1$4)], ret: (default_1$7), isOperator: false }], args);
}
function tsRankCd(...args) {
    return sqlFunction("ts_rank_cd", [{ args: [Array$1.of((default_1$7)), (tsvector), (tsquery)], ret: (default_1$7), isOperator: false }, { args: [Array$1.of((default_1$7)), (tsvector), (tsquery), (default_1$4)], ret: (default_1$7), isOperator: false }, { args: [(tsvector), (tsquery)], ret: (default_1$7), isOperator: false }, { args: [(tsvector), (tsquery), (default_1$4)], ret: (default_1$7), isOperator: false }], args);
}
function tsRewrite(...args) {
    return sqlFunction("ts_rewrite", [{ args: [(tsquery), (default_1$1)], ret: (tsquery), isOperator: false }, { args: [(tsquery), (tsquery), (tsquery)], ret: (tsquery), isOperator: false }], args);
}
function tsStat(...args) {
    return sqlFunction("ts_stat", [{ args: [(default_1$1)], ret: Setof.ofSchema({ word: (default_1$1), ndoc: (default_1$4), nentry: (default_1$4) }), isOperator: false }, { args: [(default_1$1), (default_1$1)], ret: Setof.ofSchema({ word: (default_1$1), ndoc: (default_1$4), nentry: (default_1$4) }), isOperator: false }], args);
}
function tsTokenType(...args) {
    return sqlFunction("ts_token_type", [{ args: [(oid$1)], ret: Setof.ofSchema({ tokid: (default_1$4), alias: (default_1$1), description: (default_1$1) }), isOperator: false }, { args: [(default_1$1)], ret: Setof.ofSchema({ tokid: (default_1$4), alias: (default_1$1), description: (default_1$1) }), isOperator: false }], args);
}
function tsmultirange(...args) {
    return sqlFunction("tsmultirange", [{ args: [], ret: (tsmultirange$1), isOperator: false }, { args: [Array$1.of((tsrange$1))], ret: (tsmultirange$1), isOperator: false }, { args: [(tsrange$1)], ret: (tsmultirange$1), isOperator: false }], args);
}
function tsqMcontained(...args) {
    return sqlFunction("tsq_mcontained", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsqMcontains(...args) {
    return sqlFunction("tsq_mcontains", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsqueryAnd(...args) {
    return sqlFunction("tsquery_and", [{ args: [(tsquery), (tsquery)], ret: (tsquery), isOperator: false }], args);
}
function tsqueryCmp(...args) {
    return sqlFunction("tsquery_cmp", [{ args: [(tsquery), (tsquery)], ret: (default_1$4), isOperator: false }], args);
}
function tsqueryEq(...args) {
    return sqlFunction("tsquery_eq", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsqueryGe(...args) {
    return sqlFunction("tsquery_ge", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsqueryGt(...args) {
    return sqlFunction("tsquery_gt", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsqueryLe(...args) {
    return sqlFunction("tsquery_le", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsqueryLt(...args) {
    return sqlFunction("tsquery_lt", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsqueryNe(...args) {
    return sqlFunction("tsquery_ne", [{ args: [(tsquery), (tsquery)], ret: (default_1$8), isOperator: false }], args);
}
function tsqueryNot(...args) {
    return sqlFunction("tsquery_not", [{ args: [(tsquery)], ret: (tsquery), isOperator: false }], args);
}
function tsqueryOr(...args) {
    return sqlFunction("tsquery_or", [{ args: [(tsquery), (tsquery)], ret: (tsquery), isOperator: false }], args);
}
function tsqueryPhrase(...args) {
    return sqlFunction("tsquery_phrase", [{ args: [(tsquery), (tsquery)], ret: (tsquery), isOperator: false }, { args: [(tsquery), (tsquery), (default_1$4)], ret: (tsquery), isOperator: false }], args);
}
function tsrange(...args) {
    return sqlFunction("tsrange", [{ args: [(timestamp$1), (timestamp$1)], ret: (tsrange$1), isOperator: false }, { args: [(timestamp$1), (timestamp$1), (default_1$1)], ret: (tsrange$1), isOperator: false }], args);
}
function tsrangeSubdiff(...args) {
    return sqlFunction("tsrange_subdiff", [{ args: [(timestamp$1), (timestamp$1)], ret: (default_1$6), isOperator: false }], args);
}
function tstzmultirange(...args) {
    return sqlFunction("tstzmultirange", [{ args: [], ret: (tstzmultirange$1), isOperator: false }, { args: [Array$1.of((tstzrange$1))], ret: (tstzmultirange$1), isOperator: false }, { args: [(tstzrange$1)], ret: (tstzmultirange$1), isOperator: false }], args);
}
function tstzrange(...args) {
    return sqlFunction("tstzrange", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (tstzrange$1), isOperator: false }, { args: [(timestamptz$1), (timestamptz$1), (default_1$1)], ret: (tstzrange$1), isOperator: false }], args);
}
function tstzrangeSubdiff(...args) {
    return sqlFunction("tstzrange_subdiff", [{ args: [(timestamptz$1), (timestamptz$1)], ret: (default_1$6), isOperator: false }], args);
}
function tsvectorCmp(...args) {
    return sqlFunction("tsvector_cmp", [{ args: [(tsvector), (tsvector)], ret: (default_1$4), isOperator: false }], args);
}
function tsvectorConcat(...args) {
    return sqlFunction("tsvector_concat", [{ args: [(tsvector), (tsvector)], ret: (tsvector), isOperator: false }], args);
}
function tsvectorEq(...args) {
    return sqlFunction("tsvector_eq", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], args);
}
function tsvectorGe(...args) {
    return sqlFunction("tsvector_ge", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], args);
}
function tsvectorGt(...args) {
    return sqlFunction("tsvector_gt", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], args);
}
function tsvectorLe(...args) {
    return sqlFunction("tsvector_le", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], args);
}
function tsvectorLt(...args) {
    return sqlFunction("tsvector_lt", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], args);
}
function tsvectorNe(...args) {
    return sqlFunction("tsvector_ne", [{ args: [(tsvector), (tsvector)], ret: (default_1$8), isOperator: false }], args);
}
function tsvectorToArray(...args) {
    return sqlFunction("tsvector_to_array", [{ args: [(tsvector)], ret: Array$1.of((default_1$1)), isOperator: false }], args);
}
function tsvectorUpdateTrigger(...args) {
    return sqlFunction("tsvector_update_trigger", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function tsvectorUpdateTriggerColumn(...args) {
    return sqlFunction("tsvector_update_trigger_column", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function txidCurrent(...args) {
    return sqlFunction("txid_current", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function txidCurrentIfAssigned(...args) {
    return sqlFunction("txid_current_if_assigned", [{ args: [], ret: (default_1$3), isOperator: false }], args);
}
function txidCurrentSnapshot(...args) {
    return sqlFunction("txid_current_snapshot", [{ args: [], ret: (txid_snapshot), isOperator: false }], args);
}
function txidSnapshotXip(...args) {
    return sqlFunction("txid_snapshot_xip", [{ args: [(txid_snapshot)], ret: Setof.ofSchema({}), isOperator: false }], args);
}
function txidSnapshotXmax(...args) {
    return sqlFunction("txid_snapshot_xmax", [{ args: [(txid_snapshot)], ret: (default_1$3), isOperator: false }], args);
}
function txidStatus(...args) {
    return sqlFunction("txid_status", [{ args: [(default_1$3)], ret: (default_1$1), isOperator: false }], args);
}
function txidVisibleInSnapshot(...args) {
    return sqlFunction("txid_visible_in_snapshot", [{ args: [(default_1$3), (txid_snapshot)], ret: (default_1$8), isOperator: false }], args);
}
function unicodeAssigned(...args) {
    return sqlFunction("unicode_assigned", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function unicodeVersion(...args) {
    return sqlFunction("unicode_version", [{ args: [], ret: (default_1$1), isOperator: false }], args);
}
function uniqueKeyRecheck(...args) {
    return sqlFunction("unique_key_recheck", [{ args: [], ret: (trigger), isOperator: false }], args);
}
function unistr(...args) {
    return sqlFunction("unistr", [{ args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function unnest(...args) {
    return sqlFunction("unnest", [({ T }) => ({ args: [Array$1.of(T)], ret: Setof.ofSchema({}), isOperator: false }), { args: [anymultirange], ret: Setof.ofSchema({}), isOperator: false }, { args: [(tsvector)], ret: Setof.ofSchema({ lexeme: (default_1$1), positions: Array$1.of((default_1$5)), weights: Array$1.of((default_1$1)) }), isOperator: false }], args);
}
function upper(...args) {
    return sqlFunction("upper", [({ T }) => ({ args: [anymultirange], ret: T, isOperator: false }), ({ T }) => ({ args: [anyrange], ret: T, isOperator: false }), { args: [(default_1$1)], ret: (default_1$1), isOperator: false }], args);
}
function upperInc(...args) {
    return sqlFunction("upper_inc", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }, { args: [anyrange], ret: (default_1$8), isOperator: false }], args);
}
function upperInf(...args) {
    return sqlFunction("upper_inf", [{ args: [anymultirange], ret: (default_1$8), isOperator: false }, { args: [anyrange], ret: (default_1$8), isOperator: false }], args);
}
function uuidCmp(...args) {
    return sqlFunction("uuid_cmp", [{ args: [(uuid), (uuid)], ret: (default_1$4), isOperator: false }], args);
}
function uuidEq(...args) {
    return sqlFunction("uuid_eq", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], args);
}
function uuidExtractTimestamp(...args) {
    return sqlFunction("uuid_extract_timestamp", [{ args: [(uuid)], ret: (timestamptz$1), isOperator: false }], args);
}
function uuidExtractVersion(...args) {
    return sqlFunction("uuid_extract_version", [{ args: [(uuid)], ret: (default_1$5), isOperator: false }], args);
}
function uuidGe(...args) {
    return sqlFunction("uuid_ge", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], args);
}
function uuidGt(...args) {
    return sqlFunction("uuid_gt", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], args);
}
function uuidHash(...args) {
    return sqlFunction("uuid_hash", [{ args: [(uuid)], ret: (default_1$4), isOperator: false }], args);
}
function uuidHashExtended(...args) {
    return sqlFunction("uuid_hash_extended", [{ args: [(uuid), (default_1$3)], ret: (default_1$3), isOperator: false }], args);
}
function uuidLe(...args) {
    return sqlFunction("uuid_le", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], args);
}
function uuidLt(...args) {
    return sqlFunction("uuid_lt", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], args);
}
function uuidNe(...args) {
    return sqlFunction("uuid_ne", [{ args: [(uuid), (uuid)], ret: (default_1$8), isOperator: false }], args);
}
function varPop(...args) {
    return sqlFunction("var_pop", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$2), isOperator: false }, { args: [(default_1$4)], ret: (default_1$2), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function varSamp(...args) {
    return sqlFunction("var_samp", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$2), isOperator: false }, { args: [(default_1$4)], ret: (default_1$2), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function varbit(...args) {
    return sqlFunction("varbit", [{ args: [(varbit$1), (default_1$4), (default_1$8)], ret: (varbit$1), isOperator: false }], args);
}
function varbitcmp(...args) {
    return sqlFunction("varbitcmp", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$4), isOperator: false }], args);
}
function varbiteq(...args) {
    return sqlFunction("varbiteq", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], args);
}
function varbitge(...args) {
    return sqlFunction("varbitge", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], args);
}
function varbitgt(...args) {
    return sqlFunction("varbitgt", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], args);
}
function varbitle(...args) {
    return sqlFunction("varbitle", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], args);
}
function varbitlt(...args) {
    return sqlFunction("varbitlt", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], args);
}
function varbitne(...args) {
    return sqlFunction("varbitne", [{ args: [(varbit$1), (varbit$1)], ret: (default_1$8), isOperator: false }], args);
}
function varchar(...args) {
    return sqlFunction("varchar", [{ args: [(name$1)], ret: (varchar$1), isOperator: false }, { args: [(varchar$1), (default_1$4), (default_1$8)], ret: (varchar$1), isOperator: false }], args);
}
function variance(...args) {
    return sqlFunction("variance", [{ args: [(default_1$7)], ret: (default_1$6), isOperator: false }, { args: [(default_1$6)], ret: (default_1$6), isOperator: false }, { args: [(default_1$5)], ret: (default_1$2), isOperator: false }, { args: [(default_1$4)], ret: (default_1$2), isOperator: false }, { args: [(default_1$3)], ret: (default_1$2), isOperator: false }, { args: [(default_1$2)], ret: (default_1$2), isOperator: false }], args);
}
function version(...args) {
    return sqlFunction("version", [{ args: [], ret: (default_1$1), isOperator: false }], args);
}
function websearchToTsquery(...args) {
    return sqlFunction("websearch_to_tsquery", [{ args: [(regconfig), (default_1$1)], ret: (tsquery), isOperator: false }, { args: [(default_1$1)], ret: (tsquery), isOperator: false }], args);
}
function width(...args) {
    return sqlFunction("width", [{ args: [(box$1)], ret: (default_1$6), isOperator: false }], args);
}
function widthBucket(...args) {
    return sqlFunction("width_bucket", [({ T }) => ({ args: [T, Array$1.of(T)], ret: (default_1$4), isOperator: false }), { args: [(default_1$6), (default_1$6), (default_1$6), (default_1$4)], ret: (default_1$4), isOperator: false }, { args: [(default_1$2), (default_1$2), (default_1$2), (default_1$4)], ret: (default_1$4), isOperator: false }], args);
}
function xid(...args) {
    return sqlFunction("xid", [{ args: [(xid8)], ret: (xid$1), isOperator: false }], args);
}
function xid8Larger(...args) {
    return sqlFunction("xid8_larger", [{ args: [(xid8), (xid8)], ret: (xid8), isOperator: false }], args);
}
function xid8Smaller(...args) {
    return sqlFunction("xid8_smaller", [{ args: [(xid8), (xid8)], ret: (xid8), isOperator: false }], args);
}
function xid8Cmp(...args) {
    return sqlFunction("xid8cmp", [{ args: [(xid8), (xid8)], ret: (default_1$4), isOperator: false }], args);
}
function xid8Eq(...args) {
    return sqlFunction("xid8eq", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], args);
}
function xid8Ge(...args) {
    return sqlFunction("xid8ge", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], args);
}
function xid8Gt(...args) {
    return sqlFunction("xid8gt", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], args);
}
function xid8Le(...args) {
    return sqlFunction("xid8le", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], args);
}
function xid8Lt(...args) {
    return sqlFunction("xid8lt", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], args);
}
function xid8Ne(...args) {
    return sqlFunction("xid8ne", [{ args: [(xid8), (xid8)], ret: (default_1$8), isOperator: false }], args);
}
function xideq(...args) {
    return sqlFunction("xideq", [{ args: [(xid$1), (xid$1)], ret: (default_1$8), isOperator: false }], args);
}
function xideqint4(...args) {
    return sqlFunction("xideqint4", [{ args: [(xid$1), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function xidneq(...args) {
    return sqlFunction("xidneq", [{ args: [(xid$1), (xid$1)], ret: (default_1$8), isOperator: false }], args);
}
function xidneqint4(...args) {
    return sqlFunction("xidneqint4", [{ args: [(xid$1), (default_1$4)], ret: (default_1$8), isOperator: false }], args);
}
function xml(...args) {
    return sqlFunction("xml", [{ args: [(default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function xmlIsWellFormed(...args) {
    return sqlFunction("xml_is_well_formed", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function xmlIsWellFormedContent(...args) {
    return sqlFunction("xml_is_well_formed_content", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function xmlIsWellFormedDocument(...args) {
    return sqlFunction("xml_is_well_formed_document", [{ args: [(default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function xmlagg(...args) {
    return sqlFunction("xmlagg", [{ args: [(xml$1)], ret: (xml$1), isOperator: false }], args);
}
function xmlcomment(...args) {
    return sqlFunction("xmlcomment", [{ args: [(default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function xmlconcat2(...args) {
    return sqlFunction("xmlconcat2", [{ args: [(xml$1), (xml$1)], ret: (xml$1), isOperator: false }], args);
}
function xmlexists(...args) {
    return sqlFunction("xmlexists", [{ args: [(default_1$1), (xml$1)], ret: (default_1$8), isOperator: false }], args);
}
function xmltext(...args) {
    return sqlFunction("xmltext", [{ args: [(default_1$1)], ret: (xml$1), isOperator: false }], args);
}
function xmlvalidate(...args) {
    return sqlFunction("xmlvalidate", [{ args: [(xml$1), (default_1$1)], ret: (default_1$8), isOperator: false }], args);
}
function xpath(...args) {
    return sqlFunction("xpath", [{ args: [(default_1$1), (xml$1)], ret: Array$1.of((xml$1)), isOperator: false }, { args: [(default_1$1), (xml$1), Array$1.of((default_1$1))], ret: Array$1.of((xml$1)), isOperator: false }], args);
}
function xpathExists(...args) {
    return sqlFunction("xpath_exists", [{ args: [(default_1$1), (xml$1)], ret: (default_1$8), isOperator: false }, { args: [(default_1$1), (xml$1), Array$1.of((default_1$1))], ret: (default_1$8), isOperator: false }], args);
}

const db = database({
    person: {
        firstName: (default_1$1),
        lastName: (default_1$1),
        gender: (default_1$1),
        id: (default_1$4),
        createdAt: (timestamp$1),
    },
    kysely_migration: {
        name: (default_1$1),
        timestamp: (default_1$1),
    },
    pet: {
        name: (default_1$1),
        ownerId: (default_1$4),
        species: (default_1$1),
        age: (default_1$4),
        id: (default_1$4),
    },
    kysely_migration_lock: {
        id: (default_1$1),
        is_locked: (default_1$4),
    },
});

export { aclitem as Aclitem, Any, anyenum as Anyenum, anymultirange as Anymultirange, anynonarray as Anynonarray, anyrange as Anyrange, Array$1 as Array, BinaryOperatorExpression, bit$1 as Bit, default_1$8 as Bool, box$1 as Box, bpchar$1 as Bpchar, bytea as Bytea, char$1 as Char, cid as Cid, cidr$1 as Cidr, circle$1 as Circle, ColumnAliasExpression, Context, date$1 as Date, datemultirange$1 as Datemultirange, daterange$1 as Daterange, Expression, default_1$7 as Float4, default_1$6 as Float8, FunctionExpression, Generated, inet as Inet, default_1$5 as Int2, int2vector as Int2Vector, default_1$4 as Int4, int4multirange as Int4Multirange, int4range as Int4Range, default_1$3 as Int8, int8multirange as Int8Multirange, int8range as Int8Range, interval$1 as Interval, json as Json, jsonb as Jsonb, jsonpath as Jsonpath, language_handler as LanguageHandler, line$1 as Line, LiteralExpression, LiteralUnknownExpression, lseg$1 as Lseg, macaddr$1 as Macaddr, macaddr8$1 as Macaddr8, money$1 as Money, name$1 as Name, default_1$2 as Numeric, nummultirange$1 as Nummultirange, numrange$1 as Numrange, oid$1 as Oid, oidvector as Oidvector, path$1 as Path, pg_ddl_command as PgDdlCommand, pg_lsn as PgLsn, pg_mcv_list as PgMcvList, pg_node_tree as PgNodeTree, pg_snapshot as PgSnapshot, point$1 as Point, polygon$1 as Polygon, QueryAlias, RawTableReferenceExpression, Record, refcursor as Refcursor, regclass$1 as Regclass, regcollation as Regcollation, regconfig as Regconfig, regdictionary as Regdictionary, regnamespace as Regnamespace, regoper as Regoper, regoperator as Regoperator, regproc as Regproc, regprocedure as Regprocedure, regrole as Regrole, regtype as Regtype, SelectableExpression, SelectableFunctionExpression, Setof, SubqueryExpression, TableReferenceExpression, default_1$1 as Text, tid as Tid, time$1 as Time, timestamp$1 as Timestamp, timestamptz$1 as Timestamptz, timetz$1 as Timetz, trigger as Trigger, tsmultirange$1 as Tsmultirange, tsquery as Tsquery, tsrange$1 as Tsrange, tstzmultirange$1 as Tstzmultirange, tstzrange$1 as Tstzrange, tsvector as Tsvector, txid_snapshot as TxidSnapshot, uuid as Uuid, ValuesExpression, varbit$1 as Varbit, varchar$1 as Varchar, _void as Void, xid$1 as Xid, xid8 as Xid8, xml$1 as Xml, abbrev, abs, aclcontains, acldefault, aclexplode, aclinsert, aclitemeq, aclremove, acos, acosd, acosh, age, aliasRowLike, aliasScalar, amvalidate, anyValue, anyValueTransfn, anytextcat, area, arrayAgg, arrayAppend, arrayCat, arrayDims, arrayEq, arrayFill, arrayGe, arrayGt, arrayLarger, arrayLe, arrayLength, arrayLower, arrayLt, arrayNdims, arrayNe, arrayPosition, arrayPositions, arrayPrepend, arrayRemove, arrayReplace, arraySample, arrayShuffle, arraySmaller, arrayToJson, arrayToString, arrayToTsvector, arrayUpper, arraycontained, arraycontains, arrayoverlap, ascii, asind, asinh, atan, atan2, atan2D, atand, atanh, avg, binaryUpgradeAddSubRelState, binaryUpgradeCreateEmptyExtension, binaryUpgradeLogicalSlotHasCaughtUp, binaryUpgradeReploriginAdvance, binaryUpgradeSetMissingValue, binaryUpgradeSetNextArrayPgTypeOid, binaryUpgradeSetNextHeapPgClassOid, binaryUpgradeSetNextHeapRelfilenode, binaryUpgradeSetNextIndexPgClassOid, binaryUpgradeSetNextIndexRelfilenode, binaryUpgradeSetNextMultirangeArrayPgTypeOid, binaryUpgradeSetNextMultirangePgTypeOid, binaryUpgradeSetNextPgAuthidOid, binaryUpgradeSetNextPgEnumOid, binaryUpgradeSetNextPgTablespaceOid, binaryUpgradeSetNextPgTypeOid, binaryUpgradeSetNextToastPgClassOid, binaryUpgradeSetNextToastRelfilenode, binaryUpgradeSetRecordInitPrivs, bit, bitAnd, bitCount, bitLength, bitOr, bitXor, bitand, bitcat, bitcmp, biteq, bitge, bitgt, bitle, bitlt, bitne, bitnot, bitor, bitshiftleft, bitshiftright, bitxor, bool, boolAnd, boolOr, boolandStatefunc, booleq, boolge, boolgt, boolle, boollt, boolne, boolorStatefunc, boundBox, box, boxAbove, boxAboveEq, boxAdd, boxBelow, boxBelowEq, boxCenter, boxContainPt, boxContained, boxDistance, boxDiv, boxEq, boxGe, boxGt, boxIntersect, boxLe, boxLeft, boxLt, boxMul, boxOverabove, boxOverbelow, boxOverlap, boxOverleft, boxOverright, boxRight, boxSame, boxSub, bpchar, bpcharLarger, bpcharPatternGe, bpcharPatternGt, bpcharPatternLe, bpcharPatternLt, bpcharSmaller, bpcharcmp, bpchareq, bpcharge, bpchargt, bpchariclike, bpcharicnlike, bpcharicregexeq, bpcharicregexne, bpcharle, bpcharlike, bpcharlt, bpcharne, bpcharnlike, bpcharregexeq, bpcharregexne, brinDesummarizeRange, brinSummarizeNewValues, brinSummarizeRange, broadcast, btarraycmp, btboolcmp, btbpcharPatternCmp, btcharcmp, btequalimage, btfloat48Cmp, btfloat4Cmp, btfloat84Cmp, btfloat8Cmp, btint24Cmp, btint28Cmp, btint2Cmp, btint42Cmp, btint48Cmp, btint4Cmp, btint82Cmp, btint84Cmp, btint8Cmp, btnamecmp, btnametextcmp, btoidcmp, btoidvectorcmp, btrecordcmp, btrecordimagecmp, btrim, bttextPatternCmp, bttextcmp, bttextnamecmp, bttidcmp, btvarstrequalimage, byteacat, byteacmp, byteaeq, byteage, byteagt, byteale, bytealike, bytealt, byteane, byteanlike, cardinality, cashCmp, cashDivCash, cashDivFlt4, cashDivFlt8, cashDivInt2, cashDivInt4, cashDivInt8, cashEq, cashGe, cashGt, cashLe, cashLt, cashMi, cashMulFlt4, cashMulFlt8, cashMulInt2, cashMulInt4, cashMulInt8, cashNe, cashPl, cashWords, cashlarger, cashsmaller, cbrt, ceil, ceiling, center, char, charLength, characterLength, chareq, charge, chargt, charle, charlt, charne, chr, cideq, cidr, circle, circleAbove, circleAddPt, circleBelow, circleCenter, circleContainPt, circleContained, circleDistance, circleDivPt, circleEq, circleGe, circleGt, circleLe, circleLeft, circleLt, circleMulPt, circleNe, circleOverabove, circleOverbelow, circleOverlap, circleOverleft, circleOverright, circleRight, circleSame, circleSubPt, clockTimestamp, closeLs, closeLseg, closePb, closePl, closePs, closeSb, colDescription, concat, concatWs, convert, convertFrom, convertTo, corr, cos, cosd, cosh, cot, cotd, count, covarPop, covarSamp, cumeDist, currentDatabase, currentQuery, currentSchema, currentSchemas, currentSetting, currentUser, currtid2, currval, cursorToXml, cursorToXmlschema, database, databaseToXml, databaseToXmlAndXmlschema, databaseToXmlschema, date, dateAdd, dateCmp, dateCmpTimestamp, dateCmpTimestamptz, dateEq, dateEqTimestamp, dateEqTimestamptz, dateGe, dateGeTimestamp, dateGeTimestamptz, dateGt, dateGtTimestamp, dateGtTimestamptz, dateLarger, dateLe, dateLeTimestamp, dateLeTimestamptz, dateLt, dateLtTimestamp, dateLtTimestamptz, dateMi, dateMiInterval, dateMii, dateNe, dateNeTimestamp, dateNeTimestamptz, datePart, datePlInterval, datePli, dateSmaller, dateSubtract, dateTrunc, datemultirange, daterange, daterangeCanonical, daterangeSubdiff, datetimePl, datetimetzPl, db, dcbrt, decode, degrees, denseRank, dexp, diagonal, diameter, distBp, distBs, distCpoint, distCpoly, distLp, distLs, distPathp, distPb, distPc, distPl, distPolyc, distPolyp, distPpath, distPpoly, distPs, distSb, distSl, distSp, div, dlog1, dlog10, dpow, dround, dsqrt, dtrunc, elemContainedByMultirange, elemContainedByRange, encode, enumCmp, enumEq, enumFirst, enumGe, enumGt, enumLarger, enumLast, enumLe, enumLt, enumNe, enumRange, enumSmaller, erf, erfc, every, exp, extract, factorial, family, firstValue, float4, float48Div, float48Eq, float48Ge, float48Gt, float48Le, float48Lt, float48Mi, float48Mul, float48Ne, float48Pl, float4Abs, float4Accum, float4Div, float4Eq, float4Ge, float4Gt, float4Larger, float4Le, float4Lt, float4Mi, float4Mul, float4Ne, float4Pl, float4Smaller, float4Um, float4Up, float8, float84Div, float84Eq, float84Ge, float84Gt, float84Le, float84Lt, float84Mi, float84Mul, float84Ne, float84Pl, float8Abs, float8Accum, float8Avg, float8Combine, float8Corr, float8CovarPop, float8CovarSamp, float8Div, float8Eq, float8Ge, float8Gt, float8Larger, float8Le, float8Lt, float8Mi, float8Mul, float8Ne, float8Pl, float8RegrAccum, float8RegrAvgx, float8RegrAvgy, float8RegrCombine, float8RegrIntercept, float8RegrR2, float8RegrSlope, float8RegrSxx, float8RegrSxy, float8RegrSyy, float8Smaller, float8StddevPop, float8StddevSamp, float8Um, float8Up, float8VarPop, float8VarSamp, floor, flt4MulCash, flt8MulCash, fmgrCValidator, fmgrInternalValidator, fmgrSqlValidator, format, formatType, gcd, genRandomUuid, generateSeries, generateSubscripts, getBit, getByte, getCurrentTsConfig, getdatabaseencoding, getpgusername, ginCleanPendingList, ginCmpTslexeme, ginCompareJsonb, hasAnyColumnPrivilege, hasColumnPrivilege, hasDatabasePrivilege, hasForeignDataWrapperPrivilege, hasFunctionPrivilege, hasLanguagePrivilege, hasParameterPrivilege, hasSchemaPrivilege, hasSequencePrivilege, hasServerPrivilege, hasTablePrivilege, hasTablespacePrivilege, hasTypePrivilege, hashAclitem, hashAclitemExtended, hashArray, hashArrayExtended, hashMultirange, hashMultirangeExtended, hashNumeric, hashNumericExtended, hashRange, hashRangeExtended, hashRecord, hashRecordExtended, hashbpchar, hashbpcharextended, hashchar, hashcharextended, hashenum, hashenumextended, hashfloat4, hashfloat4Extended, hashfloat8, hashfloat8Extended, hashinet, hashinetextended, hashint2, hashint2Extended, hashint4, hashint4Extended, hashint8, hashint8Extended, hashmacaddr, hashmacaddr8, hashmacaddr8Extended, hashmacaddrextended, hashname, hashnameextended, hashoid, hashoidextended, hashoidvector, hashoidvectorextended, hashtext, hashtextextended, hashtid, hashtidextended, height, host, hostmask, icuUnicodeVersion, inRange, inetClientAddr, inetClientPort, inetMerge, inetSameFamily, inetServerAddr, inetServerPort, inetand, inetmi, inetmiInt8, inetnot, inetor, inetpl, initcap, int2, int24Div, int24Eq, int24Ge, int24Gt, int24Le, int24Lt, int24Mi, int24Mul, int24Ne, int24Pl, int28Div, int28Eq, int28Ge, int28Gt, int28Le, int28Lt, int28Mi, int28Mul, int28Ne, int28Pl, int2Abs, int2And, int2AvgAccum, int2AvgAccumInv, int2Div, int2Eq, int2Ge, int2Gt, int2Int4Sum, int2Larger, int2Le, int2Lt, int2Mi, int2Mod, int2Mul, int2MulCash, int2Ne, int2Not, int2Or, int2Pl, int2Shl, int2Shr, int2Smaller, int2Sum, int2Um, int2Up, int2Xor, int4, int42Div, int42Eq, int42Ge, int42Gt, int42Le, int42Lt, int42Mi, int42Mul, int42Ne, int42Pl, int48Div, int48Eq, int48Ge, int48Gt, int48Le, int48Lt, int48Mi, int48Mul, int48Ne, int48Pl, int4Abs, int4And, int4AvgAccum, int4AvgAccumInv, int4AvgCombine, int4Div, int4Eq, int4Ge, int4Gt, int4Inc, int4Larger, int4Le, int4Lt, int4Mi, int4Mod, int4Mul, int4MulCash, int4Multirange, int4Ne, int4Not, int4Or, int4Pl, int4Range, int4RangeCanonical, int4RangeSubdiff, int4Shl, int4Shr, int4Smaller, int4Sum, int4Um, int4Up, int4Xor, int8, int82Div, int82Eq, int82Ge, int82Gt, int82Le, int82Lt, int82Mi, int82Mul, int82Ne, int82Pl, int84Div, int84Eq, int84Ge, int84Gt, int84Le, int84Lt, int84Mi, int84Mul, int84Ne, int84Pl, int8Abs, int8And, int8Avg, int8Dec, int8DecAny, int8Div, int8Eq, int8Ge, int8Gt, int8Inc, int8IncAny, int8IncFloat8Float8, int8Larger, int8Le, int8Lt, int8Mi, int8Mod, int8Mul, int8MulCash, int8Multirange, int8Ne, int8Not, int8Or, int8Pl, int8PlInet, int8Range, int8RangeCanonical, int8RangeSubdiff, int8Shl, int8Shr, int8Smaller, int8Sum, int8Um, int8Up, int8Xor, integerPlDate, interLb, interSb, interSl, interval, intervalCmp, intervalDiv, intervalEq, intervalGe, intervalGt, intervalHash, intervalHashExtended, intervalLarger, intervalLe, intervalLt, intervalMi, intervalMul, intervalNe, intervalPl, intervalPlDate, intervalPlTime, intervalPlTimestamp, intervalPlTimestamptz, intervalPlTimetz, intervalSmaller, intervalUm, isNormalized, isScalar, isScalarRelaxed, isclosed, isempty, isfinite, ishorizontal, isopen, isparallel, isperp, isvertical, jsonAgg, jsonAggStrict, jsonArrayElement, jsonArrayElementText, jsonArrayElements, jsonArrayElementsText, jsonArrayLength, jsonBuildArray, jsonBuildObject, jsonEach, jsonEachText, jsonExtractPath, jsonExtractPathText, jsonObject, jsonObjectAgg, jsonObjectAggStrict, jsonObjectAggUnique, jsonObjectAggUniqueStrict, jsonObjectField, jsonObjectFieldText, jsonObjectKeys, jsonPopulateRecord, jsonPopulateRecordset, jsonStripNulls, jsonToRecord, jsonToRecordset, jsonToTsvector, jsonTypeof, jsonbAgg, jsonbAggStrict, jsonbArrayElement, jsonbArrayElementText, jsonbArrayElements, jsonbArrayElementsText, jsonbArrayLength, jsonbBuildArray, jsonbBuildObject, jsonbCmp, jsonbConcat, jsonbContained, jsonbContains, jsonbDelete, jsonbDeletePath, jsonbEach, jsonbEachText, jsonbEq, jsonbExists, jsonbExistsAll, jsonbExistsAny, jsonbExtractPath, jsonbExtractPathText, jsonbGe, jsonbGt, jsonbHash, jsonbHashExtended, jsonbInsert, jsonbLe, jsonbLt, jsonbNe, jsonbObject, jsonbObjectAgg, jsonbObjectAggStrict, jsonbObjectAggUnique, jsonbObjectAggUniqueStrict, jsonbObjectField, jsonbObjectFieldText, jsonbObjectKeys, jsonbPathExists, jsonbPathExistsOpr, jsonbPathExistsTz, jsonbPathMatch, jsonbPathMatchOpr, jsonbPathMatchTz, jsonbPathQuery, jsonbPathQueryArray, jsonbPathQueryArrayTz, jsonbPathQueryFirst, jsonbPathQueryFirstTz, jsonbPathQueryTz, jsonbPopulateRecord, jsonbPopulateRecordValid, jsonbPopulateRecordset, jsonbPretty, jsonbSet, jsonbSetLax, jsonbStripNulls, jsonbToRecord, jsonbToRecordset, jsonbToTsvector, jsonbTypeof, justifyDays, justifyHours, justifyInterval, lag, lastValue, lastval, lcm, lead, left, length, like, likeEscape, line, lineDistance, lineEq, lineHorizontal, lineInterpt, lineIntersect, lineParallel, linePerp, lineVertical, ln, loClose, loCreat, loCreate, loExport, loFromBytea, loGet, loImport, loLseek, loLseek64, loOpen, loPut, loTell, loTell64, loTruncate, loTruncate64, loUnlink, log, log10, loread, lower, lowerInc, lowerInf, lowrite, lpad, lseg, lsegCenter, lsegDistance, lsegEq, lsegGe, lsegGt, lsegHorizontal, lsegInterpt, lsegIntersect, lsegLe, lsegLength, lsegLt, lsegNe, lsegParallel, lsegPerp, lsegVertical, ltrim, macaddr, macaddr8, macaddr8And, macaddr8Cmp, macaddr8Eq, macaddr8Ge, macaddr8Gt, macaddr8Le, macaddr8Lt, macaddr8Ne, macaddr8Not, macaddr8Or, macaddr8Set7Bit, macaddrAnd, macaddrCmp, macaddrEq, macaddrGe, macaddrGt, macaddrLe, macaddrLt, macaddrNe, macaddrNot, macaddrOr, makeDate, makeInterval, makeTime, makeTimestamp, makeTimestamptz, makeaclitem, masklen, max, md5, minScale, mod, mode, money, mulDInterval, multirange, multirangeAdjacentMultirange, multirangeAdjacentRange, multirangeAfterMultirange, multirangeAfterRange, multirangeBeforeMultirange, multirangeBeforeRange, multirangeCmp, multirangeContainedByMultirange, multirangeContainedByRange, multirangeContainsElem, multirangeContainsMultirange, multirangeContainsRange, multirangeEq, multirangeGe, multirangeGt, multirangeIntersect, multirangeIntersectAggTransfn, multirangeLe, multirangeLt, multirangeMinus, multirangeNe, multirangeOverlapsMultirange, multirangeOverlapsRange, multirangeOverleftMultirange, multirangeOverleftRange, multirangeOverrightMultirange, multirangeOverrightRange, multirangeUnion, mxidAge, name, nameconcatoid, nameeq, nameeqtext, namege, namegetext, namegt, namegttext, nameiclike, nameicnlike, nameicregexeq, nameicregexne, namele, nameletext, namelike, namelt, namelttext, namene, namenetext, namenlike, nameregexeq, nameregexne, netmask, network, networkCmp, networkEq, networkGe, networkGt, networkLarger, networkLe, networkLt, networkNe, networkOverlap, networkSmaller, networkSub, networkSubeq, networkSup, networkSupeq, nextval, normalize, notlike, now, npoints, nthValue, ntile, numNonnulls, numNulls, numeric, numericAbs, numericAdd, numericCmp, numericDiv, numericDivTrunc, numericEq, numericExp, numericGe, numericGt, numericInc, numericLarger, numericLe, numericLn, numericLog, numericLt, numericMod, numericMul, numericNe, numericPlPgLsn, numericPower, numericSmaller, numericSqrt, numericSub, numericUminus, numericUplus, nummultirange, numnode, numrange, numrangeSubdiff, objDescription, octetLength, oid, oideq, oidge, oidgt, oidlarger, oidle, oidlt, oidne, oidsmaller, oidvectoreq, oidvectorge, oidvectorgt, oidvectorle, oidvectorlt, oidvectorne, oidvectortypes, onPb, onPl, onPpath, onPs, onSb, onSl, overlaps, overlay, parseIdent, path, pathAdd, pathAddPt, pathContainPt, pathDistance, pathDivPt, pathInter, pathLength, pathMulPt, pathNEq, pathNGe, pathNGt, pathNLe, pathNLt, pathNpoints, pathSubPt, pclose, percentRank, percentileCont, percentileDisc, pgAdvisoryLock, pgAdvisoryLockShared, pgAdvisoryUnlock, pgAdvisoryUnlockAll, pgAdvisoryUnlockShared, pgAdvisoryXactLock, pgAdvisoryXactLockShared, pgAvailableExtensionVersions, pgAvailableExtensions, pgAvailableWalSummaries, pgBackendPid, pgBackupStart, pgBackupStop, pgBasetype, pgBlockingPids, pgCancelBackend, pgCharToEncoding, pgClientEncoding, pgCollationActualVersion, pgCollationFor, pgCollationIsVisible, pgColumnCompression, pgColumnIsUpdatable, pgColumnSize, pgColumnToastChunkId, pgConfLoadTime, pgConfig, pgControlCheckpoint, pgControlInit, pgControlRecovery, pgControlSystem, pgConversionIsVisible, pgCopyLogicalReplicationSlot, pgCopyPhysicalReplicationSlot, pgCreateLogicalReplicationSlot, pgCreatePhysicalReplicationSlot, pgCreateRestorePoint, pgCurrentLogfile, pgCurrentSnapshot, pgCurrentWalFlushLsn, pgCurrentWalInsertLsn, pgCurrentWalLsn, pgCurrentXactId, pgCurrentXactIdIfAssigned, pgCursor, pgDatabaseCollationActualVersion, pgDatabaseSize, pgDescribeObject, pgDropReplicationSlot, pgEncodingMaxLength, pgEncodingToChar, pgEventTriggerDdlCommands, pgEventTriggerDroppedObjects, pgEventTriggerTableRewriteOid, pgEventTriggerTableRewriteReason, pgExportSnapshot, pgExtensionConfigDump, pgExtensionUpdatePaths, pgFilenodeRelation, pgFunctionIsVisible, pgGetBackendMemoryContexts, pgGetCatalogForeignKeys, pgGetConstraintdef, pgGetExpr, pgGetFunctionArgDefault, pgGetFunctionArguments, pgGetFunctionIdentityArguments, pgGetFunctionResult, pgGetFunctionSqlbody, pgGetFunctiondef, pgGetIndexdef, pgGetKeywords, pgGetMultixactMembers, pgGetObjectAddress, pgGetPartitionConstraintdef, pgGetPartkeydef, pgGetPublicationTables, pgGetReplicaIdentityIndex, pgGetReplicationSlots, pgGetRuledef, pgGetSerialSequence, pgGetShmemAllocations, pgGetStatisticsobjdef, pgGetStatisticsobjdefColumns, pgGetStatisticsobjdefExpressions, pgGetTriggerdef, pgGetUserbyid, pgGetViewdef, pgGetWaitEvents, pgGetWalReplayPauseState, pgGetWalResourceManagers, pgGetWalSummarizerState, pgHasRole, pgHbaFileRules, pgIdentFileMappings, pgIdentifyObject, pgIdentifyObjectAsAddress, pgImportSystemCollations, pgIndexColumnHasProperty, pgIndexHasProperty, pgIndexamHasProperty, pgIndexamProgressPhasename, pgIndexesSize, pgInputErrorInfo, pgInputIsValid, pgIsInRecovery, pgIsOtherTempSchema, pgIsWalReplayPaused, pgIsolationTestSessionIsBlocked, pgJitAvailable, pgLastCommittedXact, pgLastWalReceiveLsn, pgLastWalReplayLsn, pgLastXactReplayTimestamp, pgListeningChannels, pgLockStatus, pgLogBackendMemoryContexts, pgLogStandbySnapshot, pgLogicalEmitMessage, pgLogicalSlotGetBinaryChanges, pgLogicalSlotGetChanges, pgLogicalSlotPeekBinaryChanges, pgLogicalSlotPeekChanges, pgLsArchiveStatusdir, pgLsDir, pgLsLogdir, pgLsLogicalmapdir, pgLsLogicalsnapdir, pgLsReplslotdir, pgLsTmpdir, pgLsWaldir, pgLsn, pgLsnCmp, pgLsnEq, pgLsnGe, pgLsnGt, pgLsnHash, pgLsnHashExtended, pgLsnLarger, pgLsnLe, pgLsnLt, pgLsnMi, pgLsnMii, pgLsnNe, pgLsnPli, pgLsnSmaller, pgMcvListItems, pgMyTempSchema, pgNextoid, pgNotificationQueueUsage, pgNotify, pgOpclassIsVisible, pgOperatorIsVisible, pgOpfamilyIsVisible, pgOptionsToTable, pgPartitionAncestors, pgPartitionRoot, pgPartitionTree, pgPostmasterStartTime, pgPreparedStatement, pgPreparedXact, pgPromote, pgReadBinaryFile, pgReadFile, pgRelationFilenode, pgRelationFilepath, pgRelationIsPublishable, pgRelationIsUpdatable, pgRelationSize, pgReloadConf, pgReplicationOriginAdvance, pgReplicationOriginCreate, pgReplicationOriginDrop, pgReplicationOriginOid, pgReplicationOriginProgress, pgReplicationOriginSessionIsSetup, pgReplicationOriginSessionProgress, pgReplicationOriginSessionReset, pgReplicationOriginSessionSetup, pgReplicationOriginXactReset, pgReplicationOriginXactSetup, pgReplicationSlotAdvance, pgRotateLogfile, pgSafeSnapshotBlockingPids, pgSequenceLastValue, pgSequenceParameters, pgSettingsGetFlags, pgShowAllFileSettings, pgShowAllSettings, pgShowReplicationOriginStatus, pgSizeBytes, pgSizePretty, pgSleep, pgSleepFor, pgSleepUntil, pgSnapshotXip, pgSnapshotXmax, pgSplitWalfileName, pgStatClearSnapshot, pgStatFile, pgStatForceNextFlush, pgStatGetActivity, pgStatGetAnalyzeCount, pgStatGetArchiver, pgStatGetAutoanalyzeCount, pgStatGetAutovacuumCount, pgStatGetBackendActivity, pgStatGetBackendActivityStart, pgStatGetBackendClientAddr, pgStatGetBackendClientPort, pgStatGetBackendDbid, pgStatGetBackendIdset, pgStatGetBackendPid, pgStatGetBackendStart, pgStatGetBackendSubxact, pgStatGetBackendUserid, pgStatGetBackendWaitEvent, pgStatGetBackendWaitEventType, pgStatGetBackendXactStart, pgStatGetBgwriterBufWrittenClean, pgStatGetBgwriterMaxwrittenClean, pgStatGetBgwriterStatResetTime, pgStatGetBlocksFetched, pgStatGetBlocksHit, pgStatGetBufAlloc, pgStatGetCheckpointerBuffersWritten, pgStatGetCheckpointerNumRequested, pgStatGetCheckpointerNumTimed, pgStatGetCheckpointerRestartpointsPerformed, pgStatGetCheckpointerRestartpointsRequested, pgStatGetCheckpointerRestartpointsTimed, pgStatGetCheckpointerStatResetTime, pgStatGetCheckpointerSyncTime, pgStatGetCheckpointerWriteTime, pgStatGetDbActiveTime, pgStatGetDbBlkReadTime, pgStatGetDbBlkWriteTime, pgStatGetDbBlocksFetched, pgStatGetDbBlocksHit, pgStatGetDbChecksumFailures, pgStatGetDbChecksumLastFailure, pgStatGetDbConflictAll, pgStatGetDbConflictLock, pgStatGetDbConflictLogicalslot, pgStatGetDbConflictSnapshot, pgStatGetDbConflictStartupDeadlock, pgStatGetDbConflictTablespace, pgStatGetDbDeadlocks, pgStatGetDbIdleInTransactionTime, pgStatGetDbNumbackends, pgStatGetDbSessionTime, pgStatGetDbSessions, pgStatGetDbSessionsAbandoned, pgStatGetDbSessionsFatal, pgStatGetDbSessionsKilled, pgStatGetDbStatResetTime, pgStatGetDbTempBytes, pgStatGetDbTempFiles, pgStatGetDbTuplesDeleted, pgStatGetDbTuplesFetched, pgStatGetDbTuplesInserted, pgStatGetDbTuplesReturned, pgStatGetDbTuplesUpdated, pgStatGetDbXactCommit, pgStatGetDbXactRollback, pgStatGetDeadTuples, pgStatGetFunctionCalls, pgStatGetFunctionSelfTime, pgStatGetFunctionTotalTime, pgStatGetInsSinceVacuum, pgStatGetIo, pgStatGetLastAnalyzeTime, pgStatGetLastAutoanalyzeTime, pgStatGetLastAutovacuumTime, pgStatGetLastVacuumTime, pgStatGetLastscan, pgStatGetLiveTuples, pgStatGetModSinceAnalyze, pgStatGetNumscans, pgStatGetProgressInfo, pgStatGetRecoveryPrefetch, pgStatGetReplicationSlot, pgStatGetSlru, pgStatGetSnapshotTimestamp, pgStatGetSubscription, pgStatGetSubscriptionStats, pgStatGetTuplesDeleted, pgStatGetTuplesFetched, pgStatGetTuplesHotUpdated, pgStatGetTuplesInserted, pgStatGetTuplesNewpageUpdated, pgStatGetTuplesReturned, pgStatGetTuplesUpdated, pgStatGetVacuumCount, pgStatGetWal, pgStatGetWalReceiver, pgStatGetWalSenders, pgStatGetXactBlocksFetched, pgStatGetXactBlocksHit, pgStatGetXactFunctionCalls, pgStatGetXactFunctionSelfTime, pgStatGetXactFunctionTotalTime, pgStatGetXactNumscans, pgStatGetXactTuplesDeleted, pgStatGetXactTuplesFetched, pgStatGetXactTuplesHotUpdated, pgStatGetXactTuplesInserted, pgStatGetXactTuplesNewpageUpdated, pgStatGetXactTuplesReturned, pgStatGetXactTuplesUpdated, pgStatHaveStats, pgStatReset, pgStatResetReplicationSlot, pgStatResetShared, pgStatResetSingleFunctionCounters, pgStatResetSingleTableCounters, pgStatResetSlru, pgStatResetSubscriptionStats, pgStatisticsObjIsVisible, pgStopMakingPinnedObjects, pgSwitchWal, pgSyncReplicationSlots, pgTableIsVisible, pgTableSize, pgTablespaceDatabases, pgTablespaceLocation, pgTablespaceSize, pgTerminateBackend, pgTimezoneAbbrevs, pgTimezoneNames, pgTotalRelationSize, pgTriggerDepth, pgTryAdvisoryLock, pgTryAdvisoryLockShared, pgTryAdvisoryXactLock, pgTryAdvisoryXactLockShared, pgTsConfigIsVisible, pgTsDictIsVisible, pgTsParserIsVisible, pgTsTemplateIsVisible, pgTypeIsVisible, pgTypeof, pgVisibleInSnapshot, pgWalLsnDiff, pgWalReplayPause, pgWalReplayResume, pgWalSummaryContents, pgWalfileName, pgWalfileNameOffset, pgXactCommitTimestamp, pgXactStatus, phrasetoTsquery, pi, plaintoTsquery, plpgsqlCallHandler, plpgsqlValidator, point, pointAbove, pointAdd, pointBelow, pointDistance, pointDiv, pointEq, pointHoriz, pointLeft, pointMul, pointNe, pointRight, pointSub, pointVert, polyAbove, polyBelow, polyCenter, polyContainPt, polyContained, polyDistance, polyLeft, polyNpoints, polyOverabove, polyOverbelow, polyOverlap, polyOverleft, polyOverright, polyRight, polySame, polygon, popen, position, postgresqlFdwValidator, pow, power, ptContainedCircle, ptContainedPoly, queryToXml, queryToXmlAndXmlschema, queryToXmlschema, querytree, quoteIdent, quoteLiteral, quoteNullable, radians, radius, random, randomNormal, rangeAdjacent, rangeAdjacentMultirange, rangeAfter, rangeAfterMultirange, rangeAgg, rangeBefore, rangeBeforeMultirange, rangeCmp, rangeContainedBy, rangeContainedByMultirange, rangeContains, rangeContainsElem, rangeContainsMultirange, rangeEq, rangeGe, rangeGt, rangeIntersect, rangeIntersectAgg, rangeIntersectAggTransfn, rangeLe, rangeLt, rangeMerge, rangeMinus, rangeNe, rangeOverlaps, rangeOverlapsMultirange, rangeOverleft, rangeOverleftMultirange, rangeOverright, rangeOverrightMultirange, rangeUnion, rank, recordEq, recordGe, recordGt, recordImageEq, recordImageGe, recordImageGt, recordImageLe, recordImageLt, recordImageNe, recordLe, recordLt, recordNe, regclass, regexpCount, regexpInstr, regexpLike, regexpMatch, regexpMatches, regexpReplace, regexpSplitToArray, regexpSplitToTable, regexpSubstr, regrAvgx, regrAvgy, regrCount, regrIntercept, regrR2, regrSlope, regrSxx, regrSxy, regrSyy, repeat, replace, resultType, reverse, riFKeyCascadeDel, riFKeyCascadeUpd, riFKeyCheckIns, riFKeyCheckUpd, riFKeyNoactionDel, riFKeyNoactionUpd, riFKeyRestrictDel, riFKeyRestrictUpd, riFKeySetdefaultDel, riFKeySetdefaultUpd, riFKeySetnullDel, riFKeySetnullUpd, right, round, rowNumber, rowSecurityActive, rowToJson, rpad, rtrim, satisfiesHashPartition, scale, schemaToXml, schemaToXmlAndXmlschema, schemaToXmlschema, sessionUser, setBit, setByte, setConfig, setMasklen, setseed, setval, setweight, sha224, sha256, sha384, sha512, shobjDescription, sign, similarEscape, similarToEscape, sind, sinh, slope, spgPolyQuadCompress, splitPart, sqlFunction, sqrt, startsWith, statementTimestamp, stddev, stddevPop, stddevSamp, stringAgg, stringToArray, stringToTable, strip, strpos, substr, substring, sum, suppressRedundantUpdatesTrigger, systemUser, tableToXml, tableToXmlAndXmlschema, tableToXmlschema, tan, tand, tanh, text, textGe, textGt, textLarger, textLe, textLt, textPatternGe, textPatternGt, textPatternLe, textPatternLt, textSmaller, textanycat, textcat, texteq, texteqname, textgename, textgtname, texticlike, texticnlike, texticregexeq, texticregexne, textlen, textlename, textlike, textltname, textne, textnename, textnlike, textregexeq, textregexne, tideq, tidge, tidgt, tidlarger, tidle, tidlt, tidne, tidsmaller, time, timeCmp, timeEq, timeGe, timeGt, timeHash, timeHashExtended, timeLarger, timeLe, timeLt, timeMiInterval, timeMiTime, timeNe, timePlInterval, timeSmaller, timedatePl, timeofday, timestamp, timestampCmp, timestampCmpDate, timestampCmpTimestamptz, timestampEq, timestampEqDate, timestampEqTimestamptz, timestampGe, timestampGeDate, timestampGeTimestamptz, timestampGt, timestampGtDate, timestampGtTimestamptz, timestampHash, timestampHashExtended, timestampLarger, timestampLe, timestampLeDate, timestampLeTimestamptz, timestampLt, timestampLtDate, timestampLtTimestamptz, timestampMi, timestampMiInterval, timestampNe, timestampNeDate, timestampNeTimestamptz, timestampPlInterval, timestampSmaller, timestamptz, timestamptzCmp, timestamptzCmpDate, timestamptzCmpTimestamp, timestamptzEq, timestamptzEqDate, timestamptzEqTimestamp, timestamptzGe, timestamptzGeDate, timestamptzGeTimestamp, timestamptzGt, timestamptzGtDate, timestamptzGtTimestamp, timestamptzLarger, timestamptzLe, timestamptzLeDate, timestamptzLeTimestamp, timestamptzLt, timestamptzLtDate, timestamptzLtTimestamp, timestamptzMi, timestamptzMiInterval, timestamptzNe, timestamptzNeDate, timestamptzNeTimestamp, timestamptzPlInterval, timestamptzSmaller, timetz, timetzCmp, timetzEq, timetzGe, timetzGt, timetzHash, timetzHashExtended, timetzLarger, timetzLe, timetzLt, timetzMiInterval, timetzNe, timetzPlInterval, timetzSmaller, timetzdatePl, timezone, toAscii, toChar, toDate, toHex, toJson, toJsonb, toNumber, toOct, toRegclass, toRegcollation, toRegnamespace, toRegoper, toRegoperator, toRegproc, toRegprocedure, toRegrole, toRegtype, toRegtypemod, toTimestamp, toTsquery, toTsvector, transactionTimestamp, translate, trimArray, trimScale, trunc, tsDebug, tsDelete, tsFilter, tsHeadline, tsLexize, tsMatchQv, tsMatchTq, tsMatchTt, tsMatchVq, tsParse, tsRank, tsRankCd, tsRewrite, tsStat, tsTokenType, tsmultirange, tsqMcontained, tsqMcontains, tsqueryAnd, tsqueryCmp, tsqueryEq, tsqueryGe, tsqueryGt, tsqueryLe, tsqueryLt, tsqueryNe, tsqueryNot, tsqueryOr, tsqueryPhrase, tsrange, tsrangeSubdiff, tstzmultirange, tstzrange, tstzrangeSubdiff, tsvectorCmp, tsvectorConcat, tsvectorEq, tsvectorGe, tsvectorGt, tsvectorLe, tsvectorLt, tsvectorNe, tsvectorToArray, tsvectorUpdateTrigger, tsvectorUpdateTriggerColumn, txidCurrent, txidCurrentIfAssigned, txidCurrentSnapshot, txidSnapshotXip, txidSnapshotXmax, txidStatus, txidVisibleInSnapshot, unicodeAssigned, unicodeVersion, uniqueKeyRecheck, unistr, unnest, upper, upperInc, upperInf, uuidCmp, uuidEq, uuidExtractTimestamp, uuidExtractVersion, uuidGe, uuidGt, uuidHash, uuidHashExtended, uuidLe, uuidLt, uuidNe, values, varPop, varSamp, varbit, varbitcmp, varbiteq, varbitge, varbitgt, varbitle, varbitlt, varbitne, varchar, variance, version, websearchToTsquery, width, widthBucket, xid, xid8Cmp, xid8Eq, xid8Ge, xid8Gt, xid8Larger, xid8Le, xid8Lt, xid8Ne, xid8Smaller, xideq, xideqint4, xidneq, xidneqint4, xml, xmlIsWellFormed, xmlIsWellFormedContent, xmlIsWellFormedDocument, xmlagg, xmlcomment, xmlconcat2, xmlexists, xmltext, xmlvalidate, xpath, xpathExists };
//# sourceMappingURL=typegres.js.map

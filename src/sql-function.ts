import { BinaryOperatorExpression, Expression, FunctionExpression, LiteralUnknownExpression } from "./expression";
import type { RowLike } from "./query/values";
import { Any } from "./types";
import { Schema } from "./types/any";
import { Context, SelectableExpression } from "./expression";
import type { FromItem, FromItemFromExpressionClass } from "./query/from-item";

const Sentinel = class Sentinel {
  static typeString() {
    return "sentinel";
  }
} as unknown as typeof Any & { [k in string]: typeof Any };

const genericArgs = { T: Sentinel, R: Sentinel };

const getRetType = (args: unknown[], defn: TypedFunctionDefinition) => {
  const { args: params, ret, isVariadic } = typeof defn === "function" ? defn(genericArgs) : defn;
  
  console.log("DBG getRetType: args.length:", args.length);
  console.log("DBG getRetType: params.length:", params.length);
  console.log("DBG getRetType: isVariadic:", isVariadic);

  if (args.length !== params.length && (!isVariadic || params.length > args.length)) {
    console.log("DBG getRetType: returning false because args length mismatch");
    return false;
  }

  let genericBindsTo;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const param = params[i] ?? params[params.length - 1];
    
    console.log(`DBG getRetType: arg[${i}]:`, arg);
    console.log(`DBG getRetType: param[${i}]:`, param);
    console.log(`DBG getRetType: arg instanceof Any:`, arg instanceof Any);
    console.log(`DBG getRetType: arg.constructor.name:`, arg?.constructor?.name);

    if (param === Sentinel) {
      if (arg instanceof Any) {
        genericBindsTo = arg.getClass();
      }

      continue;
    }

    const subtype = param.subtype();
    const argSubtype = arg instanceof Any ? arg.getClass().subtype() : null;
    console.log(`DBG getRetType: subtype:`, subtype);
    console.log(`DBG getRetType: argSubtype:`, argSubtype);
    
    if (argSubtype != null && subtype?.subtype === Sentinel) {
      // If the argument is a subtype of the parameter, we can bind it
      // to the generic type.
      genericBindsTo = argSubtype.subtype;
      continue;
    }
    if (arg instanceof Any && arg.getClass().typeString() !== param.typeString() && !(arg instanceof param)) {
      // If the argument is not an instance of the parameter, we can't bind it.
      // Note that if the argument type is not an `Any` (i.e., its a primitive type),
      //  we assume it matches -- it shouldn't matter because we assert that primitive
      //  types will only be passed if all return types are the same.
      console.log(`DBG getRetType: returning false because type mismatch`);
      console.log(`DBG getRetType: arg.getClass().typeString():`, arg.getClass().typeString());
      console.log(`DBG getRetType: param.typeString():`, param.typeString());
      console.log(`DBG getRetType: arg instanceof param:`, arg instanceof param);
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
    return { ret: genericBindsTo as typeof Any, genericBindsTo };
  }
  const retSubtype = "subtype" in ret && ret.subtype();
  if (retSubtype && retSubtype?.subtype === Sentinel) {
    return { ret: retSubtype.withSubtype(genericBindsTo), genericBindsTo };
  }
  return { ret, genericBindsTo };
};

export class SelectableFunctionExpression extends SelectableExpression {
  constructor(
    public fnExpr: FunctionExpression,
    schema: RowLike,
  ) {
    super(schema);
  }

  compile(ctx: Context) {
    return this.fnExpr.compile(ctx);
  }
}

type TypedFunctionDefinition =
  | {
      ret: typeof Any<unknown, number> | FromItemFromExpressionClass;
      args: (typeof Any<unknown>)[];
      isOperator: boolean;
      isReserved?: boolean;
      isVariadic?: boolean;
    }
  | ((args: { T: typeof Any<unknown, 0 | 1>; R: Schema }) => {
      ret: typeof Any<unknown, number> | FromItemFromExpressionClass;
      args: (typeof Any<unknown, number>)[];
      isOperator: boolean;
      isReserved?: boolean;
      isVariadic?: boolean;
    });

export const sqlFunction = (name: string, defn: TypedFunctionDefinition[], args: unknown[]): Any | FromItem<any> => {
  console.log("DBG sqlFunction called with name:", name);
  console.log("DBG sqlFunction defn:", defn);
  console.log("DBG sqlFunction args:", args);
  const flatMapped = defn.flatMap((def) => {
    const RetType = getRetType(args, def);
    console.log("DBG sqlFunction getRetType returned:", RetType);
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
  console.log("DBG sqlFunction flatMapped:", flatMapped);
  const [{ matchingDef, RetType }] = flatMapped;
  if (!RetType) {
    console.error(
      `No matching function found for ${name}`,
      args,
      defn.map((d) => (typeof d === "function" ? d(genericArgs).args : d.args)),
    );
    throw new Error(
      `No matching function found for ${name} with args ${JSON.stringify(
        args,
      )} / ${JSON.stringify(defn)} / ${JSON.stringify(
        defn.map((d) => (typeof d === "function" ? d(genericArgs).args : d.args)),
      )}`,
    );
  }

  const argsAsExpressions = args.map((arg) => {
    if (arg instanceof Any) {
      return arg.toExpression();
    }
    // Rely on postgres to determine what the input type should be:
    return new LiteralUnknownExpression(arg);
  });

  return RetType.new(
    matchingDef.isOperator
      ? new BinaryOperatorExpression(name, argsAsExpressions as [Expression, Expression])
      : new FunctionExpression(name, argsAsExpressions, matchingDef.isReserved || false),
  );
};

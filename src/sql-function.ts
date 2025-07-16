import {
  BinaryOperatorExpression,
  Expression,
  FunctionExpression,
  LiteralUnknownExpression,
} from "./expression";
import type { BindedSetof, RowLike } from "./query/values";
import { Any, Setof } from "./types";
import { Schema } from "./types/any";
import { Context, SelectableExpression } from "./expression";
import invariant from "tiny-invariant";

const Sentinel = class Sentinel {
  static typeString() {
    return "sentinel";
  }
} as unknown as typeof Any & { [k in string]: typeof Any };

const genericArgs = { T: Sentinel, R: Sentinel };

const getRetType = (args: unknown[], defn: TypedFunctionDefinition) => {
  const { args: params, ret } =
    typeof defn === "function" ? defn(genericArgs) : defn;
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

    invariant(param, `Parameter at index ${i} should exist`);
    const subtype = param.subtype();
    const argSubtype = arg instanceof Any ? arg.getClass().subtype() : null;
    if (argSubtype != null && subtype?.subtype === Sentinel) {
      // If the argument is a subtype of the parameter, we can bind it
      // to the generic type.
      genericBindsTo = argSubtype.subtype;
      continue;
    }
    if (
      arg instanceof Any &&
      arg.getClass().typeString() !== param.typeString() &&
      !(arg instanceof (param as any))
    ) {
      // If the argument is not an instance of the parameter, we can't bind it.
      // Note that if the argument type is not an `Any` (i.e., its a primitive type),
      //  we assume it matches -- it shouldn't matter because we assert that primitive
      //  types will only be passed if all return types are the same.
      return false;
    }
  }
  if (!genericBindsTo) {
    if (ret === Sentinel) {
      throw new Error(
        `Cannot determine return type for function ${defn} with args ${args}`,
      );
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
      ret: typeof Any<unknown, number> | BindedSetof<any>;
      args: (typeof Any<unknown>)[];
      isOperator: boolean;
      isReserved?: boolean;
    }
  | ((args: { T: typeof Any<unknown, number>; R: Schema }) => {
      ret: typeof Any<unknown, number> | BindedSetof<any>;
      args: (typeof Any<unknown, number>)[];
      isOperator: boolean;
      isReserved?: boolean;
    });

export const sqlFunction = (
  name: string,
  defn: TypedFunctionDefinition[],
  args: unknown[],
): Any | Setof<any> => {
  const matches = defn.flatMap((def) => {
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
  
  invariant(matches.length > 0, `No matching function found for ${name}`);
  const match = matches[0];
  invariant(match, `First match should exist`);
  const { matchingDef, RetType } = match;
  
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
        defn.map((d) =>
          typeof d === "function" ? d(genericArgs).args : d.args,
        ),
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
      ? new BinaryOperatorExpression(
          name,
          argsAsExpressions as [Expression, Expression],
        )
      : new FunctionExpression(name, argsAsExpressions, matchingDef.isReserved || false),
  );
};

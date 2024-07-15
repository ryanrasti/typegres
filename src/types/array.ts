import Any, { UseSubtype } from "./any";
import { default as PgArray } from "../gen/types/array";
import array from "postgres-array";
import { Expression } from "../expression";

export type ClassType<T> = {
  typeString(): string | undefined;
  subtype(): UseSubtype | undefined;
  parse(v: string): unknown;
  prototype: T;
};

export type ArrayClass<T extends Any> = {
  new (v: string): Array<number, T>;
  ["new"](v: string): Array<1, T>;
  ["new"](v: null): Array<0, T>;
  ["new"](v: Expression): Array<0 | 1, T>;

  typeString(): string | undefined;
  subtype(): UseSubtype | undefined;
  parse(v: string): T["resultType"][];
};

export default class Array<N extends number, T extends Any> extends PgArray<
  N,
  T
> {
  static of<C extends ClassType<Any>>(subtype: C): ArrayClass<C["prototype"]> {
    return class ArrayImpl<N extends number> extends Array<N, C["prototype"]> {
      static resultType: C["prototype"]["resultType"][];
      static typeString(): string {
        return `${subtype.typeString()}[]`;
      }
      static subtype(): UseSubtype {
        return {
          subtype: subtype as unknown as typeof Any,
          withSubtype: Array.of as any,
        };
      }

      static parse(v: string): C["prototype"]["resultType"][] {
        return array.parse(v, subtype.parse);
      }

      constructor(v: string) {
        super(v);
      }

      static new<T extends Any>(v: string): Array<1, T>;
      static new<T extends Any>(v: null): Array<0, T>;
      static new<T extends Any>(v: Expression): Array<0 | 1, T>;
      static new(v: unknown) {
        return new ArrayImpl(v as unknown as string);
      }
    };
  }
}

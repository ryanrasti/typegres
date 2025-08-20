import Any, { UseSubtype } from "./any";
import { Array as PgArray } from "../gen/types/array";
import array from "postgres-array";
import { Expression } from "../expression";

export type ClassType<T> = {
  typeString(): string | undefined;
  subtype(): UseSubtype | undefined;
  parse(v: string): unknown;
  prototype: T;
};

export type ArrayClass<N extends number, T extends Any> = {
  new (v: string): Array<N, T>;
  ["new"](v: string): Array<1, T>;
  ["new"](v: null): Array<0, T>;
  ["new"](v: Expression): Array<0 | 1, T>;

  typeString(): string | undefined;
  subtype(): UseSubtype | undefined;
  parse(v: string): T["resultType"][];
};

export default class Array<N extends number, T extends Any> extends PgArray<N, T> {
  static of<C extends typeof Any<unknown, 0 | 1>>(subtype: C): ArrayClass<0 | 1, InstanceType<C>> {
    return class ArrayImpl<N extends number> extends Array<N, InstanceType<C>> {
      static resultType: InstanceType<C>["resultType"][];
      static typeString(): string {
        return `${subtype.typeString()}[]`;
      }
      static subtype(): UseSubtype {
        return {
          subtype: subtype as unknown as typeof Any,
          withSubtype: Array.of as any,
        };
      }

      static parse(v: string): InstanceType<C>["resultType"][] {
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

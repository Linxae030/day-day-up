// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<GreaterThan<1, 0>, true>>,
    Expect<Equal<GreaterThan<5, 4>, true>>,
    Expect<Equal<GreaterThan<4, 5>, false>>,
    Expect<Equal<GreaterThan<0, 0>, false>>,
    Expect<Equal<GreaterThan<20, 20>, false>>,
    Expect<Equal<GreaterThan<10, 100>, false>>,
    Expect<Equal<GreaterThan<111, 11>, true>>
];

// ============= Your Code Here =============
type MakeTuple<Number, Temp extends any[] = []> = Temp["length"] extends Number
    ? Temp
    : MakeTuple<Number, [any, ...Temp]>;
type MinusOne<Number> = MakeTuple<Number> extends [infer First, ...infer Rest] ? Rest["length"] : 0;
type GreaterThan<T extends number, U extends number> = T extends U
    ? false
    : T extends 0
    ? false
    : U extends 0
    ? true
    : GreaterThan<MinusOne<T>, MinusOne<U>>;

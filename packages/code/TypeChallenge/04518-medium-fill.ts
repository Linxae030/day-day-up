// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<Fill<[], 0>, []>>,
    Expect<Equal<Fill<[], 0, 0, 3>, []>>,
    Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
    Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

// ============= Your Code Here =============
type Len<T extends any[]> = T["length"];
type MakeTuple<N extends number, Temp extends any[] = []> = Temp["length"] extends N
    ? Temp
    : MakeTuple<N, [any, ...Temp]>;
type MinusOne<N extends number> = MakeTuple<N> extends [infer First, ...infer R] ? R["length"] : 0;
type AddOne<N extends number> = [any, ...MakeTuple<N>]["length"];
type BiggerThan<A extends number, B extends number> = A extends 0
    ? B extends 0
        ? false
        : false
    : B extends 0
    ? true
    : BiggerThan<MinusOne<A>, MinusOne<B>>;
type Fill<
    T extends unknown[],
    N,
    Start extends number = 0,
    End extends number = T["length"]
> = BiggerThan<Start, T["length"]> extends true
    ? T
    : T extends [infer Pre, any, infer Rest]
    ? 1
    : 2;

type test<T extends any[]> = T extends [infer Pre, any, infer Rest] ? Pre | Rest : [];

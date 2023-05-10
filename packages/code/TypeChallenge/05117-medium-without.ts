// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<Without<[1, 2], 1>, [2]>>,
    Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
    Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

// ============= Your Code Here =============
type MayBeArr<T> = T | T[];
type Include<T extends any[], U> = U extends T[number] ? true : false;
type Without<T extends any[], U extends MayBeArr<number>, Temp extends any[] = []> = T extends [
    infer First,
    ...infer Rest
]
    ? U extends number
        ? Without<Rest, [U], Temp>
        : Include<U & number[], First> extends true
        ? Without<Rest, U, Temp>
        : Without<Rest, U, [...Temp, First]>
    : Temp;

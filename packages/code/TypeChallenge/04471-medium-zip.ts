// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<Zip<[], []>, []>>,
    Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
    Expect<Equal<Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
    Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
    Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];

// ============= Your Code Here =============
type Params = number | string | boolean | any[];
type Shift<Arr extends any[]> = Arr extends [infer First, ...infer Rest] ? Rest : [];
type Zip<T extends any[], U extends any[], Temp extends any[] = []> = T[0] extends Params
    ? U[0] extends Params
        ? Zip<Shift<T>, Shift<U>, [...Temp, [T[0], U[0]]]>
        : Temp
    : Temp;

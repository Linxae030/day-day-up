// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<FlattenDepth<[]>, []>>,
    Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
    Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
    Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
    Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
    Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>
];

// ============= Your Code Here =============
type FlattenDepth<Arr, Count extends number = 1, Temp extends any[] = []> = Arr extends [
    infer F,
    ...infer Rest
]
    ? Temp["length"] extends Count
        ? Arr
        : F extends any[]
        ? [...FlattenDepth<F, Count, [...Temp, any]>, ...FlattenDepth<Rest, Count, Temp>]
        : [F, ...FlattenDepth<Rest, Count, Temp>]
    : [];

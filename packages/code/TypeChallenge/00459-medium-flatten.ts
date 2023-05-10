// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<Flatten<[]>, []>>,
    Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
    Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
    Expect<Equal<Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>, [{ foo: "bar"; 2: 10 }, "foobar"]>>
];

// ============= Your Code Here =============
type Flatten<Arr extends any[]> = Arr extends [infer First, ...infer Rest]
    ? First extends any[]
        ? [...Flatten<First>, ...Flatten<Rest>]
        : [First, ...Flatten<Rest>]
    : Arr;

type res = Flatten<[1, [2]]>;

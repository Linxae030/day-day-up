// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>>,
    Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
    Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
    Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
    Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>>,
    Expect<Equal<AnyOf<[0, "", false, [], {}, undefined, null]>, false>>,
    Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============
// type IsEmpty<T> = T extends Record<string, unknown>
//     ? [keyof T] extends [never]
//         ? true
//         : false
//     : T extends any[]
//     ? T["length"] extends 0
//         ? true
//         : false
//     : T extends null | undefined | "" | 0 | false
//     ? true
//     : false;
// type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest]
//     ? First extends true | 1
//         ? true
//         : IsEmpty<First> extends true
//         ? AnyOf<Rest>
//         : true
//     : false;

type Falsy = 0 | "" | null | undefined | [] | Record<string, never> | false;
type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest]
    ? First extends Falsy
        ? AnyOf<Rest>
        : true
    : false;

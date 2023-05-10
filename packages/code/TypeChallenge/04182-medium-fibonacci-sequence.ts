// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<Fibonacci<1>, 1>>,
    Expect<Equal<Fibonacci<2>, 1>>,
    Expect<Equal<Fibonacci<3>, 2>>,
    Expect<Equal<Fibonacci<8>, 21>>
];

// ============= Your Code Here =============
type MakeTuple<N, T extends any[] = []> = T["length"] extends N ? T : MakeTuple<N, [any, ...T]>;
type Add<A, B> = [...MakeTuple<A>, ...MakeTuple<B>]["length"];
type MinusOne<N> = MakeTuple<N> extends [infer F, ...infer Rest] ? Rest["length"] : 0;
type Fibonacci<T extends number> = T extends 0
    ? 0
    : T extends 1
    ? 1
    : Add<Fibonacci<MinusOne<MinusOne<T>>>, Fibonacci<MinusOne<T>>>;

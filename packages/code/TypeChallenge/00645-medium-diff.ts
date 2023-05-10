// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
    name: string;
    age: string;
};
type Bar = {
    name: string;
    age: string;
    gender: number;
};
type Coo = {
    name: string;
    gender: number;
};

type cases = [
    Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
    Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
    Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
    Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// ============= Your Code Here =============
// type Temp<O, O1> = {
//     [K in keyof O | keyof O1]: K extends keyof O
//         ? K extends keyof O1
//             ? never
//             : O[K]
//         : K extends keyof O1
//         ? O1[K]
//         : never;
// };

// type OmitByValueType<T, ValueType> = {
//     [K in keyof T]: T[K] extends ValueType ? never : K;
// }[keyof T];

// type Diff<O, O1> = Pick<O & O1, OmitByValueType<Temp<O, O1>, never>>;
type Difference<A, B> = A extends B ? never : A;

type Diff<O, O1> = Pick<O & O1, Difference<keyof O, keyof O1> | Difference<keyof O1, keyof O>>;

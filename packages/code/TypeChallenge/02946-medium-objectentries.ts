// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Model {
    name: string;
    age: number;
    locations: string[] | null;
}

type ModelEntries = ["name", string] | ["age", number] | ["locations", string[] | null];

type cases = [
    Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
    Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
    Expect<Equal<ObjectEntries<{ key?: undefined }>, ["key", undefined]>>,
    Expect<Equal<ObjectEntries<{ key: undefined }>, ["key", undefined]>>
];

// ============= Your Code Here =============
// type ObjectEntries<T> = Required<{
//     [Key in keyof T]: undefined extends T[Key]
//         ? T[Key] extends undefined
//             ? [Key, undefined]
//             : [Key, Exclude<T[Key], undefined>]
//         : [Key, T[Key]];
// }>[keyof T];

// your answers
type ObjectEntries<T, K = keyof T> = K extends keyof T
    ? [K, T[K] extends undefined | infer Type ? Type : undefined]
    : never;

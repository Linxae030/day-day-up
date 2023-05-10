// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Model {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
}

type cases = [
    Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
    Expect<
        Equal<OmitByType<Model, string>, { count: number; isReadonly: boolean; isEnable: boolean }>
    >,
    Expect<
        Equal<OmitByType<Model, number>, { name: string; isReadonly: boolean; isEnable: boolean }>
    >
];

// ============= Your Code Here =============
type FilterType<T, ValueType> = {
    [Key in keyof T]: T[Key] extends ValueType ? never : Key;
}[keyof T];
type OmitByType<T, U> = Pick<T, FilterType<T, U>>;

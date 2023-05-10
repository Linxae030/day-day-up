// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<BEM<"btn", ["price"], []>, "btn__price">>,
    Expect<
        Equal<
            BEM<"btn", ["price"], ["warning", "success"]>,
            "btn__price--warning" | "btn__price--success"
        >
    >,
    Expect<
        Equal<
            BEM<"btn", [], ["small", "medium", "large"]>,
            "btn--small" | "btn--medium" | "btn--large"
        >
    >
];

// ============= Your Code Here =============
// type AddModifier<T extends string, M extends string> = [M] extends [never] ? T : `${T}--${M}`;
// type BEM<B extends string, E extends string[], M extends string[]> = E extends []
//     ? AddModifier<B, M[number]>
//     : AddModifier<`${B}__${E[0]}`, M[number]>;
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${E extends []
    ? ""
    : `__${E[0]}`}${M extends [] ? "" : `--${M[number]}`}`;

// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
    Expect<Equal<AllCombinations<"">, "">>,
    Expect<Equal<AllCombinations<"A">, "" | "A">>,
    Expect<Equal<AllCombinations<"AB">, "" | "A" | "B" | "AB" | "BA">>,
    Expect<
        Equal<
            AllCombinations<"ABC">,
            | ""
            | "A"
            | "B"
            | "C"
            | "AB"
            | "AC"
            | "BA"
            | "BC"
            | "CA"
            | "CB"
            | "ABC"
            | "ACB"
            | "BAC"
            | "BCA"
            | "CAB"
            | "CBA"
        >
    >,
    Expect<
        Equal<
            AllCombinations<"ABCD">,
            | ""
            | "A"
            | "B"
            | "C"
            | "D"
            | "AB"
            | "AC"
            | "AD"
            | "BA"
            | "BC"
            | "BD"
            | "CA"
            | "CB"
            | "CD"
            | "DA"
            | "DB"
            | "DC"
            | "ABC"
            | "ABD"
            | "ACB"
            | "ACD"
            | "ADB"
            | "ADC"
            | "BAC"
            | "BAD"
            | "BCA"
            | "BCD"
            | "BDA"
            | "BDC"
            | "CAB"
            | "CAD"
            | "CBA"
            | "CBD"
            | "CDA"
            | "CDB"
            | "DAB"
            | "DAC"
            | "DBA"
            | "DBC"
            | "DCA"
            | "DCB"
            | "ABCD"
            | "ABDC"
            | "ACBD"
            | "ACDB"
            | "ADBC"
            | "ADCB"
            | "BACD"
            | "BADC"
            | "BCAD"
            | "BCDA"
            | "BDAC"
            | "BDCA"
            | "CABD"
            | "CADB"
            | "CBAD"
            | "CBDA"
            | "CDAB"
            | "CDBA"
            | "DABC"
            | "DACB"
            | "DBAC"
            | "DBCA"
            | "DCAB"
            | "DCBA"
        >
    >
];

// ============= Your Code Here =============
type Split<T> = T extends `${infer F}${infer Rest}` ? F | Split<Rest> : "";
type Delete<S, T extends string> = S extends `${infer F}${T}${infer R}` ? `${F}${R}` : S;

type temp<S extends string, Origin extends string> = S extends S
    ? S extends ""
        ? ""
        : S | `${S}${temp<Split<Delete<Origin, S>>, Delete<Origin, S>>}`
    : "";

type AllCombinations<S extends string> = temp<Split<S>, S>;

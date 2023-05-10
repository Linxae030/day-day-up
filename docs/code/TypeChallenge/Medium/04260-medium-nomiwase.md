# AllCombinations
---

Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

For example:

```ts
type AllCombinations_ABC = AllCombinations<'ABC'>;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/4260/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/4260/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 你的代码

```ts
type Split<T> = T extends `${infer F}${infer Rest}` ? F | Split<Rest> : "";
type Delete<S, T extends string> = S extends `${infer F}${T}${infer R}` ? `${F}${R}` : S;

type temp<S extends string, Origin extends string> = S extends S
    ? S extends ""
        ? ""
        : S | `${S}${temp<Split<Delete<Origin, S>>, Delete<Origin, S>>}`
    : "";

type AllCombinations<S extends string> = temp<Split<S>, S>;
```
## 总结

>全排列变种，可以参考 [第 296 题 permutation](./00296-medium-permutation.md) ，换成了字符串，核心思想就是：
>
>1. 先拆分字符串为 **联合类型**
>2. 借助`Temp`以泛型传入拆分后的联合类型，使用 `S extends S` 触发分布式
>3. `Delete` 代替 `Exclude`删去本次递归已经使用过的字符
>
>其实有更简单的做法，但我目前还没搞明白，之后再更新吧

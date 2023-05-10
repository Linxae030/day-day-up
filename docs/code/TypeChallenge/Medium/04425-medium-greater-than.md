# Greater Than
---

In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

Negative numbers do not need to be considered.

For example

```ts
GreaterThan<2, 1> //should be true
GreaterThan<1, 1> //should be false
GreaterThan<10, 100> //should be false
GreaterThan<111, 11> //should be true
```

Good Luck!

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/4425/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/4425/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 你的代码

```ts
type MakeTuple<Number, Temp extends any[] = []> = Temp["length"] extends Number
    ? Temp
    : MakeTuple<Number, [any, ...Temp]>;
type MinusOne<Number> = MakeTuple<Number> extends [infer First, ...infer Rest] ? Rest["length"] : 0;
type GreaterThan<T extends number, U extends number> = T extends U
    ? false
    : T extends 0
    ? false
    : U extends 0
    ? true
    : GreaterThan<MinusOne<T>, MinusOne<U>>;
```
## 总结

>1. 两个 number 依次减 1，先减到 0 的就是大的一方。
>2. 这里借助 `MakeTuple` 构造元组来实现的减一，不难。
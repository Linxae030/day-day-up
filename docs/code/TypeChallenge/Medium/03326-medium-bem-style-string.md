# BEM style string
---

The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS. 

For example, the block component would be represented as `btn`, element that depends upon the block would be represented as `btn__price`, modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.

Implement `BEM<B, E, M>` which generate string union from these three parameters. Where `B` is a string literal, `E` and `M` are string arrays (can be empty).

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/3326/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/3326/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 你的代码

```ts
type AddModifier<T extends string, M extends string> = [M] extends [never] ? T : `${T}--${M}`;
type BEM<B extends string, E extends string[], M extends string[]> = E extends []
    ? AddModifier<B, M[number]>
    : AddModifier<`${B}__${E[0]}`, M[number]>;
```
## 总结

>就是模板字符串拼接，关于 `M` 元组我第一时间想到的是用分布式，所以写出了 `AddModifier` 用 `M[number]` 取出元组中每一项组合成联合类型，然后以 **泛型参数** 的形式传入，就可以遍历 `M` 去在末尾添加 modifier，但后来想了想，其实这样写也可以，虽然比较难读。
>
>```ts
>type BEM<B extends string, E extends string[], M extends string[]> = `${B}${E extends []
>    ? ""
>    : `__${E[0]}`}${M extends [] ? "" : `--${M[number]}`}`;
>```
>
>`M[number]` 本身就是个联合类型，所以放在，模板字符串里自然就能遍历每种情况各生成一次。
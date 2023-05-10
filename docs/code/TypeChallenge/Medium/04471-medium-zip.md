# Zip
---

In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
```ts
type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/4471/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/4471/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 你的代码

```ts
type Params = number | string | boolean | any[];
type Shift<Arr extends any[]> = Arr extends [infer First, ...infer Rest] ? Rest : [];
type Zip<T extends any[], U extends any[], Temp extends any[] = []> = T[0] extends Params
    ? U[0] extends Params
        ? Zip<Shift<T>, Shift<U>, [...Temp, [T[0], U[0]]]>
        : Temp
    : Temp;
```
## 总结

>1. 只有在 `T` 和 `U` 两个元组第一个元素都存在的时候才能进行 'zip' 压缩操作，也就是结合到一个数组里。
>2. `Temp` 用于保存最终的答案，并在以下情况之一返回：
>    - `T` 第一个元素不存在
>    - `U` 第一个元素不存在
>3. 当 `T` `U` 两个元组第一个元素都存在时，把当前两个第一元素的 zip组合 存入 `Temp`，再用 `Shift` 推出 第一个元素，递归传入 `Zip` 以原本的第二个元素作为作为新的第一元素继续判断。
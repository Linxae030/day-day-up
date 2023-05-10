# 斐波那契序列
---

Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

The sequence starts:
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

For example
```js
type Result1 = Fibonacci<3> // 2
type Result2 = Fibonacci<8> // 21
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/4182/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/4182/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 你的代码

```ts
type MakeTuple<N, T extends any[] = []> = T["length"] extends N ? T : MakeTuple<N, [any, ...T]>;
type Add<A, B> = [...MakeTuple<A>, ...MakeTuple<B>]["length"];
type MinusOne<N> = MakeTuple<N> extends [infer F, ...infer Rest] ? Rest["length"] : 0;
type Fibonacci<T extends number> = T extends 0
    ? 0
    : T extends 1
    ? 1
    : Add<Fibonacci<MinusOne<MinusOne<T>>>, Fibonacci<MinusOne<T>>>;

```
## 总结

>知道正经算法怎么做就行，无非就是求出斐波那契数列的第n项。
>
>1. `MakeTuple` 生成 `length` 属性为 `N` 的元组。
>
>2. `Add` 借助 `MakeTuple` 分别生成长度为 A/B 的元组，再解构到一起就是加法了。 
>
>3. `MinusOne` 减一，还是比较简单的。
>
>剩下的就是用以上三个工具函数组合起来实现斐波那契数列第n项了。
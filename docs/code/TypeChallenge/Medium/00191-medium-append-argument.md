# 追加参数
---

> 由 @antfu 翻译

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// 期望是 (a: number, b: string, x: boolean) => number
```

> 本挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 在 Dev.io 上的[文章](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c)

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/191/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/191/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
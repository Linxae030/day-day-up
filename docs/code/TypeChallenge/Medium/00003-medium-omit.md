# 实现 Omit
---

不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/3/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/3/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md" target="_blank"><img src="https://img.shields.io/badge/-4%E3%83%BBPick-7aad0c" alt="4・Pick"/></a> <!--info-footer-end-->

## 你的代码

```ts
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```
## 总结

>借助 `Pick` 实现的 `Omit`
>
>1. `Exclude<keyof T, K>` 选出把 T 的键筛除掉传入的 K，其中 K 是一个联合类型，并且是 `keyof T`，也就是必定是 T 的键，此时筛去后，这个表达式的值就是 **除去不需要的键后需要的键**。
>2. `Pick<T, Exclude<keyof T, K>>`，把第一步筛除后的键作为 `Pick` 的参数，再从 T 中提取出来即可。
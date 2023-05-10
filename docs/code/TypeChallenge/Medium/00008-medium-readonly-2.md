# Readonly 2
---

> 由谷歌自动翻译，欢迎 PR 改进翻译质量。

实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

`K`指定应设置为Readonly的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

例如

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
```

## 测试用例
```ts
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/8/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/8/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md" target="_blank"><img src="https://img.shields.io/badge/-7%E3%83%BBReadonly-7aad0c" alt="7・Readonly"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md" target="_blank"><img src="https://img.shields.io/badge/-9%E3%83%BBDeep%20Readonly-d9901a" alt="9・Deep Readonly"/></a> <!--info-footer-end-->

## 你的代码

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
    readonly [P in K]: T[P];
} & {
    [P in Exclude<keyof T, K>]: T[P];
};
```
## 总结

>在 [Easy 第 7 题](../Easy/00007-easy-readonly.md) 的基础上的变种，这道题是部分添加 `readonly`
>
>1. 拆分成两部分，需要 `readonly` 的一部分，不需要的一部分
>2. 需要的那一部分就是 `readonly [P in K]: T[P]` ，K 就是需要 `readonly` 的键，使用 `[P in K]` 依次取出
>3. 不需要的那一部分就是 `[P in Exclude<keyof T, K>]: T[P]` 使用 `Exclude` 将 K 从 T 的键中排出再依次取出即可
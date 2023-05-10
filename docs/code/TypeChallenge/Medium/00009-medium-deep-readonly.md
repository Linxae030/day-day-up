# 深度 Readonly
---

> 由谷歌自动翻译，欢迎 PR 改进翻译质量。

实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/9/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/9/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md" target="_blank"><img src="https://img.shields.io/badge/-7%E3%83%BBReadonly-7aad0c" alt="7・Readonly"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.md" target="_blank"><img src="https://img.shields.io/badge/-8%E3%83%BBReadonly%202-d9901a" alt="8・Readonly 2"/></a> <!--info-footer-end-->

## 你的代码

```ts
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends Record<string, any>
        ? T[P] extends Function
            ? T[P]
            : DeepReadonly<T[P]>
        : T[P];
};
```
## 总结

>虽然就是 [Easy 第 7 题](../Easy/00007-easy-readonly.md)的升级版，但这里有两个注意的点
>
>1. Function 也就是函数的属性是不可变的，对其属性进行 `readonly` 操作是错误的，所以要对 Function 类型进行额外判断，当类型为 Function 的时候直接返回类型即可。
>2. `Record<string, any>` 不可以替换成 `Record<string, unknown>`，暂时还不太明白为啥，再看看。
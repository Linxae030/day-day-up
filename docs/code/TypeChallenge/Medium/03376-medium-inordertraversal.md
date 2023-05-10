# InorderTraversal
---

Implement the type version of binary tree inorder traversal.

For example:

```typescript
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

type A = InorderTraversal<typeof tree1> // [1, 3, 2]
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/3376/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/3376/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 你的代码

```ts
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
    ? [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>]
    : [];
```
## 总结

>一开始并没有做出来，我写的是下面这个版本，而它虽然能正确解题，却会导致递归过深。
>
>```tsx
>type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
>    ? [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>]
>    : [];
>```
>
>```ts
>type InorderTraversal<
>    T extends TreeNode | null,
>    NT extends TreeNode = NonNullable<T>
>> = T extends null
>    ? []
>    : [...InorderTraversal<NT["left"]>, NT["val"], ...InorderTraversal<NT["right"]>];
>```
>
>
# FlattenDepth
---

Recursively flatten array up to depth times.

For example:

```typescript
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
```

If the depth is provided, it's guaranteed to be positive integer.

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/3243/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/3243/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00459-medium-flatten/README.md" target="_blank"><img src="https://img.shields.io/badge/-459%E3%83%BBFlatten-d9901a" alt="459・Flatten"/></a> <!--info-footer-end-->

## 你的代码

```ts
type FlattenDepth<Arr, Count extends number = 1, Temp extends any[] = []> = Arr extends [
    infer F,
    ...infer Rest
]
    ? Temp["length"] extends Count
        ? Arr
        : F extends any[]
		// 若 F 是数组，则向下递归一层，并把 F 和 Rest 分别递归传入再合并到一个元组里
        ? [...FlattenDepth<F, Count, [...Temp, any]>, ...FlattenDepth<Rest, Count, Temp>]
        // 若 F 不是数组，则直接把 F 加入元组，把 Rest 递归传入并结构
        : [F, ...FlattenDepth<Rest, Count, Temp>]
    : [];
type res = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>;

```
## 总结

>考察 **递归** 和 **元组做计数** ，核心想法就是 `F extends any[]` 代表这一层需要结构，所以通过向 `T` 追加 `any` 使计数元组长度 +1，每次执行会先判断 `Temp["length"] extends Count` 意思就是 计数元组长度是否等于需要解构的层数，如果能满足则说明已经到达需要的深度了，直接返回这一层对应的 `Arr` 即可，若不到达则递归。
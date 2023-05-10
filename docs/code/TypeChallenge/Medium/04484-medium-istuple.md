# IsTuple
---

Implement a type ```IsTuple```, which takes an input type ```T``` and returns whether ```T``` is tuple type.

For example:

```typescript
type case1 = IsTuple<[number]> // true
type case2 = IsTuple<readonly [number]> // true
type case3 = IsTuple<number[]> // false
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/4484/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/4484/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/README.md" target="_blank"><img src="https://img.shields.io/badge/-1042%E3%83%BBIsNever-d9901a" alt="1042・IsNever"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/01097-medium-isunion/README.md" target="_blank"><img src="https://img.shields.io/badge/-1097%E3%83%BBIsUnion-d9901a" alt="1097・IsUnion"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00223-hard-isany/README.md" target="_blank"><img src="https://img.shields.io/badge/-223%E3%83%BBIsAny-de3d37" alt="223・IsAny"/></a> <!--info-footer-end-->

## 你的代码

```ts
type IsTuple<T> = [T] extends [never] ? false : T extends readonly [infer P] | [] ? true : false;
```
## 总结

>没有太理解，感觉就是枚举的了一下各个情况，唯一有点困惑的是 `T extends readonly [infer P]` 并不能用 `T extends readonly [...infer P]`来替代，我最开始是想通过后者表示任意数量的参数，但这让 `number[]` 被判定为了 true，这一点需要后续再看一下。
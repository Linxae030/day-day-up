# IsUnion
---

Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

For example:
  
  ```ts
  type case1 = IsUnion<string>  // false
  type case2 = IsUnion<string|number>  // true
  type case3 = IsUnion<[string|number]>  // false
  ```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/1097/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/1097/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/README.md" target="_blank"><img src="https://img.shields.io/badge/-1042%E3%83%BBIsNever-d9901a" alt="1042・IsNever"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00223-hard-isany/README.md" target="_blank"><img src="https://img.shields.io/badge/-223%E3%83%BBIsAny-de3d37" alt="223・IsAny"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/04484-medium-istuple/README.md" target="_blank"><img src="https://img.shields.io/badge/-4484%E3%83%BBIsTuple-d9901a" alt="4484・IsTuple"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
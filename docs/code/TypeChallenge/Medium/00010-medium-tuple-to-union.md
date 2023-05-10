# 元组转合集
---

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

例如

```ts
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/10/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/10/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.md" target="_blank"><img src="https://img.shields.io/badge/-11%E3%83%BBTuple%20to%20Object-7aad0c" alt="11・Tuple to Object"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00472-hard-tuple-to-enum-object/README.md" target="_blank"><img src="https://img.shields.io/badge/-472%E3%83%BBTuple%20to%20Enum%20Object-de3d37" alt="472・Tuple to Enum Object"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00730-hard-union-to-tuple/README.md" target="_blank"><img src="https://img.shields.io/badge/-730%E3%83%BBUnion%20to%20Tuple-de3d37" alt="730・Union to Tuple"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/03188-medium-tuple-to-nested-object/README.md" target="_blank"><img src="https://img.shields.io/badge/-3188%E3%83%BBTuple%20to%20Nested%20Object-d9901a" alt="3188・Tuple to Nested Object"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
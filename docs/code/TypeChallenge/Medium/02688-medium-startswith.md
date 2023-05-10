# StartsWith
---

实现`StartsWith<T, U>`,接收两个string类型参数,然后判断`T`是否以`U`开头,根据结果返回`true`或`false`

例如:

```typescript
type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/2688/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2688/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/02693-medium-endswith/README.md" target="_blank"><img src="https://img.shields.io/badge/-2693%E3%83%BBEndsWith-d9901a" alt="2693・EndsWith"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
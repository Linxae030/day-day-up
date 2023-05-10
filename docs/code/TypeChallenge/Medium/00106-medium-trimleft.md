# Trim Left
---

实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

例如

```ts
type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/106/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/106/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md" target="_blank"><img src="https://img.shields.io/badge/-108%E3%83%BBTrim-d9901a" alt="108・Trim"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/04803-medium-trim-right/README.md" target="_blank"><img src="https://img.shields.io/badge/-4803%E3%83%BBTrim%20Right-d9901a" alt="4803・Trim Right"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
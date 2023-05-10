# Trim
---

实现`Trim<T>`，它是一个字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

例如

```ts
type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/108/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/108/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md" target="_blank"><img src="https://img.shields.io/badge/-106%E3%83%BBTrim%20Left-d9901a" alt="106・Trim Left"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/04803-medium-trim-right/README.md" target="_blank"><img src="https://img.shields.io/badge/-4803%E3%83%BBTrim%20Right-d9901a" alt="4803・Trim Right"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
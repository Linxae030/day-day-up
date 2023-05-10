# Drop Char
---

从字符串中剔除指定字符。

例如：

```ts
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/2070/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2070/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/02059-hard-drop-string/README.md" target="_blank"><img src="https://img.shields.io/badge/-2059%E3%83%BBDrop%20String-de3d37" alt="2059・Drop String"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
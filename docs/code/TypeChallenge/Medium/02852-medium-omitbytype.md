# OmitByType
---

From ```T```, pick a set of properties whose type are not assignable to ```U```.

For Example

```typescript
type OmitBoolean = OmitByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { name: string; count: number }
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<Equal<OmitByType<Model, string>, { count: number; isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<OmitByType<Model, number>, { name: string; isReadonly: boolean; isEnable: boolean }>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/2852/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2852/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/02595-medium-pickbytype/README.md" target="_blank"><img src="https://img.shields.io/badge/-2595%E3%83%BBPickByType-d9901a" alt="2595・PickByType"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
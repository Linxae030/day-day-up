# PickByType
---

From `T`, pick a set of properties whose type are assignable to `U`.

For Example

```typescript
type OnlyBoolean = PickByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { isReadonly: boolean; isEnable: boolean; }
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
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/2595/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2595/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/02852-medium-omitbytype/README.md" target="_blank"><img src="https://img.shields.io/badge/-2852%E3%83%BBOmitByType-d9901a" alt="2852・OmitByType"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
# Unshift
---

实现类型版本的 ```Array.unshift```。

例如：

```typescript
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/3060/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/3060/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md" target="_blank"><img src="https://img.shields.io/badge/-533%E3%83%BBConcat-7aad0c" alt="533・Concat"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.md" target="_blank"><img src="https://img.shields.io/badge/-3057%E3%83%BBPush-7aad0c" alt="3057・Push"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
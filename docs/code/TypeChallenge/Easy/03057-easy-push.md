# Push
---

在类型系统里实现通用的 ```Array.push``` 。

例如：

```typescript
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/3057/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/3057/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md" target="_blank"><img src="https://img.shields.io/badge/-533%E3%83%BBConcat-7aad0c" alt="533・Concat"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.md" target="_blank"><img src="https://img.shields.io/badge/-3060%E3%83%BBUnshift-7aad0c" alt="3060・Unshift"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
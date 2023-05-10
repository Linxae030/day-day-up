# Flip Arguments
---

Implement the type version of lodash's ```_.flip```.

Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

For example:

```typescript
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
// (arg0: boolean, arg1: number, arg2: string) => void
```

## 测试用例
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

```
<!--info-footer-start--><br> <a href="https://tsch.js.org/3196/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/3196/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&amp;logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.md" target="_blank"><img src="https://img.shields.io/badge/-3192%E3%83%BBReverse-d9901a" alt="3192・Reverse"/></a> <!--info-footer-end-->

## 你的代码

```ts

```
## 总结

>
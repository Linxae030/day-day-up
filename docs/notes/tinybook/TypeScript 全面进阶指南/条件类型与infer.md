# 条件类型与infer

---

## 1. 条件类型基础

---

条件类型的语法类似于我们平时常用的三元表达式，它的基本语法如下（伪代码）：

```typescript
ValueA === ValueB ? Result1 : Result2;
TypeA extends TypeB ? Result1 : Result2;
```

但需要注意的是，条件类型中使用 extends 判断类型的兼容性，而非判断类型的全等性。这是因为在类型层面中，对于能够进行赋值操作的两个变量，我们**并不需要它们的类型完全相等，只需要具有兼容性**，而两个完全相同的类型，其 extends 自然也是成立的。

条件类型绝大部分场景下会和泛型一起使用，我们知道，泛型参数的实际类型会在实际调用时才被填充（类型别名中显式传入，或者函数中隐式提取），而条件类型在这一基础上，可以基于填充后的泛型参数做进一步的类型操作，比如这个例子：

```typescript
type LiteralType<T> = T extends string ? "string" : "other";

type Res1 = LiteralType<"linbudu">; // "string"
type Res2 = LiteralType<599>; // "other"
```

同三元表达式可以嵌套一样，条件类型中也常见多层嵌套，如：

```typescript
export type LiteralType<T> = T extends string
	? "string"
	: T extends number
	? "number"
	: T extends boolean
	? "boolean"
	: T extends null
	? "null"
	: T extends undefined
	? "undefined"
	: never;

type Res1 = LiteralType<"linbudu">; // "string"
type Res2 = LiteralType<599>; // "number"
type Res3 = LiteralType<true>; // "boolean"
```

而在函数中，条件类型与泛型的搭配同样很常见。考考你，以下这个函数，我们应该如何标注它的返回值类型？

```typescript
function universalAdd<T extends number | bigint | string>(x: T, y: T) {
    return x + (y as any);
}
```

当我们调用这个函数时，由于两个参数都引用了泛型参数 T ，因此泛型会被填充为一个 **联合类型**：

```typescript
universalAdd(599, 1); // T 填充为 599 | 1
universalAdd("linbudu", "599"); // T 填充为 linbudu | 599
```

因此，我们可以使用嵌套的条件类型来进行字面量类型到基础类型地提取：

```typescript
function _universalAdd<T extends UniversalPrama>(x: T, y: T): LiteralToPrimitive<T> {
    return x + (y as any);
}
type UniversalPrama = number | bigint | string;
export type LiteralToPrimitive<T extends UniversalPrama> = T extends number
    ? number
    : T extends bigint
    ? bigint
    : T extends string
    ? string
    : never;

universalAdd("linxae", "599"); // string
universalAdd(599, 1); // number
universalAdd(10n, 10n); // bigint
```

> **个人理解：**这里讲的就是类型层级那一篇里的，同一类型的字面量的联合类型 < 该类型，在这里的表现就是 599 | 1 extends number , 'linxae' | '599' extends string 这样的，所以可以封装一个工具类型函数来约束返回值。

## 2. 引入infer

---

条件类型还可以用来对更复杂的类型进行比较，比如函数类型：

```typescript
type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (...args: any[]) => string
    ? "A string return func!"
    : "A non-string return func!";

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;
```

在这里，我们的条件类型用于判断两个函数类型是否具有兼容性，而条件中并不限制参数类型，仅比较二者的返回值类型。

与此同时，存在泛型约束和条件类型两个 extends 可能会让你感到疑惑，但它们产生作用的时机完全不同，泛型约束要求你传入符合结构的类型参数，相当于**参数校验**。而条件类型使用类型参数进行条件判断（就像 if else），相当于**实际内部逻辑**。

我们上面讲到的这些条件类型，本质上就是在泛型基于调用填充类型信息的基础上，新增了**基于类型信息的条件判断**。看起来很不错，但你可能也发现了一个无法满足的场景：

**提取传入的类型信息。**

## 3. infer关键字

---

在上面的例子中，假如我们不再比较填充的函数类型是否是 `(...args: any[]) => string` 的子类型，而是要拿到其返回值类型呢？或者说，我们希望拿到填充的类型信息的一部分，而不是只是用它来做条件呢？

TypeScript 中支持通过 infer 关键字来**在条件类型中提取类型的某一部分信息**，比如上面我们要提取函数返回值类型的话，可以这么放：

```typescript
type FunctionReturnType<T extends Func> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;
```

看起来是新朋友，其实还是老伙计。上面的代码其实表达了，当传入的类型参数满足 `T extends (...args: any[] ) => infer R` 这样一个结构（不用管 `infer R`，当它是 any 就行），返回 `infer R `位置的值，即 R。否则，返回 never。

> **人话翻译: **传进来的 T 满足 `(...args: any[]) => infer R` 这么一个结构吗，如果满足，就把infer R那个地方的东西 R 给返回，不然就返回never
>
> 比如 `FunctionConditionType<() => string>` 满足 `(...args: any[]) => infer R` 这么一个结构，infer R 那个地方是 string，那么 R 就是 string
>
> 所以 `FunctionConditionType<() => string>` 返回的类型就是 string



**下面讲的太精彩了，我就直接全复制了**



这里的**类型结构**当然并不局限于函数类型结构，还可以是数组：

```typescript
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]
```

由于我们声明的结构是一个仅有两个元素的元组，因此三个元素的元组就被认为是不符合类型结构了。但我们可以使用 rest 操作符来处理任意长度的情况：

```typescript
// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;
```

是的，infer 甚至可以和 rest 操作符一样同时提取一组不定长的类型，而 `...any[]` 的用法是否也让你直呼神奇？上面的输入输出仍然都是数组，而实际上我们完全可以进行结构层面的转换。比如从数组到联合类型：

```typescript
type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number
```

原理即是这里的 `[string, number]` 实际上等价于 `(string | number)[]`。

除了数组，infer 结构也可以是接口：

```typescript
// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

// 反转键名与键值
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V> ? Record<V & string, K> : never

type ReverseKeyValueResult1 = ReverseKeyValue<{ "key": "value" }>; // { "value": "key" }
```

在这里，为了体现 infer 作为类型工具的属性，我们结合了索引类型与映射类型，以及使用 `& string` 来确保属性名为 string 类型的小技巧。

为什么需要这个小技巧，如果不使用又会有什么问题呢？

```typescript
// 类型“V”不满足约束“string | number | symbol”。
type ReverseKeyValue<T extends Record<string, string>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V, K>
  : never;
```

明明约束已经声明了 V 的类型是 string，为什么还是报错了？

这是因为，泛型参数 V 的来源是从键值类型推导出来的，TypeScript 中这样对键值类型进行 infer 推导，将导致类型信息丢失，而不满足索引签名类型只允许 `string | number | symbol` 的要求。

还记得映射类型的判断条件吗？需要同时满足其两端的类型，我们使用 `V & string` 这一形式，就确保了最终符合条件的类型参数 V 一定会满足 `string | never` 这个类型，因此可以被视为合法的索引签名类型。

infer 结构还可以是 Promise 结构！

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? V : T;

type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取
```

就像条件类型可以嵌套一样，infer 关键字也经常被使用在嵌套的场景中，包括对类型结构深层信息地提取，以及对提取到类型信息的筛选等。比如上面的 PromiseValue，如果传入了一个嵌套的 Promise 类型就失效了：

```typescript
type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>>; // Promise<boolean>，只提取了一层
```

这种时候我们就需要进行嵌套地提取了：

```typescript
type PromiseValue<T> = T extends Promise<infer V>
  ? V extends Promise<infer N>
    ? N
    : V
  : T;
```

当然，在这时应该使用递归来处理任意嵌套深度：

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
```

条件类型在泛型的基础上支持了基于类型信息的动态条件判断，但无法直接消费填充类型信息，而 infer 关键字则为它补上了这一部分的能力，让我们可以进行更多奇妙的类型操作。TypeScript 内置的工具类型中还有一些基于 infer 关键字的应用，我们会在内置工具类型讲解一章中了解它们的具体实现。而我们上面了解的 rest infer（`...infer Left`），结合其他类型工具、递归 infer 等，都是日常比较常用的操作，这些例子应当能让你再一次意识到“类型编程”的真谛。

## 4. 分布式条件类型

----

分布式条件类型听起来真的很高级，但这里和分布式和分布式服务并不是一回事。**分布式条件类型（\*Distributive Conditional Type\*），也称条件类型的分布式特性**，只不过是条件类型在满足一定情况下会执行的逻辑而已。我们来看一个例子：

- **是否通过泛型传入**

```typescript
type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 1 | 2 | 3
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;
```

- 是否被包裹

```typescript
type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Res3 = Naked<number | boolean>;

// "N"
type Res4 = Wrapped<number | boolean>; // 只接收一个元素为boolean类型的元组，number | boolean不满足
```

同时，你会发现在 Res3 的判断中，其联合类型的两个分支，恰好对应于分别使用 number 和 boolean 去作为条件类型判断时的结果。

而条件类型分布式特性会产生的效果也很明显了，即将这个联合类型拆开来，每个分支分别进行一次条件类型判断，再将最后的结果合并起来（如 Naked 中）。如果再严谨一些，其实我们就得到了官方的解释：

**对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上。**（***Conditional types in which the checked type is a naked type parameter are called distributive conditional types. Distributive conditional types are automatically distributed over union types during instantiation.***）

>**个人理解：**其实就是三个条件触发分布式
>
>1. 是 **泛型** 参数
>2. 参数是 **联合类型**
>3. 是 **裸参数**
>
>裸参数其实在下面也有讲到过，泛型参数不能被另一个工具函数或者是数组等包裹住。

这里的自动分发，我们可以这么理解：

```typescript
type Naked<T> = T extends boolean ? "Y" : "N";

// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// "N" | "Y"
type Res3 = Naked<number | boolean>;
```

写成伪代码其实就是这样的：

```typescript
const Res3 = [];

for(const input of [number, boolean]){
  if(input extends boolean){
    Res3.push("Y");
  } else {
    Res.push("N");
  }
}
```

需要注意的是，我们并不是只会通过裸露泛型参数，来确保分布式特性能够发生。在某些情况下，我们也会需要包裹泛型参数来 **禁用掉分布式特性** 。最常见的场景也许还是联合类型的判断，即我们不希望进行联合类型成员的分布判断，而是希望直接判断这两个联合类型的兼容性判断，就像在最初的 Res2 中那样：

```typescript
type CompareUnion<T, U> = [T] extends [U] ? true : false;

type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false
```

> 这里是为了精确地比较 `1 | 2` 是否能赋值给 `1 | 2 | 3` ，也就是是否是子类型，如果这里不包裹会 **触发分布式**，情况如下

```typescript
type CompareUnion<T, U> = T extends U ? true : false;

type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
// 1 extends 1 | 2 | 3 true
// 2 extends 1 | 2 | 3 true

type CompareRes2 = CompareUnion<1 | 2, 1>; // boolean
// 1 extends 1 true
// 2 extends 1 false
// true | false = boolean
```

通过将参数与条件都包裹起来的方式，我们对联合类型的比较就变成了数组成员类型的比较，在此时就会严格遵守类型层级一文中联合类型的类型判断了（子集为其子类型）。

另外一种情况则是，当我们想判断一个类型是否为 never 时，也可以通过类似的手段：

```typescript
type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<"linbudu">; // false
```

这里的原因其实并不是因为分布式条件类型。我们此前在类型层级中了解过，当条件类型的判断参数为 any，会直接返回条件类型两个结果的联合类型。而在这里其实类似，当通过泛型传入的参数为 never，则会直接返回 never。

需要注意的是这里的 never 与 any 的情况并不完全相同，any 在直接**作为判断参数时**、**作为泛型参数时**都会产生这一效果：

```typescript
// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2;  // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2

// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2; // 1
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>; // 1
```

而 never 仅在 **作为泛型参数** 时才会产生：

```typescript
// 直接使用，仍然会进行判断
type Tmp3 = never extends string ? 1 : 2; // 1

type Tmp4<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，会跳过判断
type Tmp4Res = Tmp4<never>; // never

// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2; // 1
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never
```

> **个人总结: **
>
> 1. any会在作为 **条件类型的判断参数** 或者 **泛型参数** 时直接跳过判断，返回联合类型
> 2. never仅会在作为 **泛型参数** 时才会跳过返回never，其他时候正常判断

之所以分布式条件类型要这么设计，我个人理解主要是为了处理联合类型这种情况。就像我们到现在为止的伪代码都一直使用数组来表达联合类型一样，在类型世界中联合类型就像是一个集合一样。通过使用分布式条件类型，我们能轻易地进行集合之间的运算，比如交集：

```typescript
type Intersection<A, B> = A extends B ? A : never;

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3
```

## 5. 扩展阅读

---

### IsAny

直接上结果

```typescript
type IsAny<T> = 0 extends 1 & T ? true : false

type res1 = isAny<any>; // true
type res2 = isAny<number>; // false
type res3 = isAny<boolean>; // false
```

看上去非常奇怪, 因为 0 字面量无论如何都可能是 1 字面量的子类，我们先回顾一下 1 & T 的这个 `&` 交叉类型的判断方式，在学习交叉类型的时候我们就了解了，对于 1 这样的字面量类型，只有传入 **其本身** 、**对应的原始类型**、**包含其本身的联合类型**，才能得到一个有意义的值，并且这个值一定只可能是它本身：

```typescript
type Tmp1 = 1 & (0 | 1); // 1
type Tmp2 = 1 & number; // 1
type Tmp3 = 1 & 1; // 1
```

>**个人理解：**这里是因为，交叉类型在判断时是 **短板效应** ，也就是在交叉类型中哪一个类型最细分，就取哪一个类型，1 字面量能够赋值给 number 类型，那么就会取 1，但作为代表任意类型的 any 是顶层类型，当他存在在交叉类型中，**短板效应就失效了**，最终的类型必然会变成 any ，所以 `0 extends 1 & T` 这个式子里面的 T ，当且仅当 T 为 any 时才成立。

### IsUnknown

而对于 unknown 并不能享受到这个待遇，因为它并不是“身化万千”的：

```typescript
type Tmp5 = 1 & unknown; // 1
```

所以实现 IsUnknown 会稍微复杂一点，这里利用的是 `unknown extends T` 有且仅有 any 和 unknown 类型能判断通过来实现的

```typescript
type IsUnknown<T> = unknown extends T ? (IsAny<T> extends true ? false : true) : false;
```

> **踩坑：**`(IsAny<T> extends true ? false : true)` 这一句不能写成 `(IsAny<T> ? false : true)`，因为在类型判断里拿到类型 `true` 是不起到判断作用的

```typescript
type res4 = IsUnknown<unknown>; // true
type res5 = IsUnknown<any>; // false
type res6 = IsUnknown<boolean>; // false
```


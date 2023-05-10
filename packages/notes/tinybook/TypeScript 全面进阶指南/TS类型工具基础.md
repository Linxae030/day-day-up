# TS 类型工具基础

---

### 1. 类型守卫

---

TypeScript 中提供了非常强大的类型推导能力，它会随着你的代码逻辑不断尝试收窄类型，这一能力称之为**类型的控制流分析**（也可以简单理解为类型推导）。

但有一种情况，比如我将 if 条件中的表达式提取出来:

```tsx
function isString(input: string | number): boolean {
    return typeof input === "number";
}

function foo(input: string | number) {
    if (isString(input)) {
        // 类型“string | number”上不存在属性“replace”。
        input.replace("lin", "linxae");
    }
    if (typeof input === "number") {
    }
    // ...
}
```

可以看到，在这种情况下 `isString(input)` 处并不能正确的推断出类型，因为 `isString` 这个函数在另外一个地方，内部的判断逻辑并不在函数 `foo` 中。这里的类型控制流分析做不到**跨函数上下文**来进行类型的信息收集。但实际上将判断逻辑封装是十分常见的，为了实现复用，TS 引入了 **is** 关键字来显式地提供类型信息：

```tsx
function isString(input: string | number): input is string {
    return typeof input === "number";
}

function foo(input: string | number) {
    if (isString(input)) {
        // 正确了
        input.replace("lin", "linxae");
    }
    if (typeof input === "number") {
    }
    // ...
}
```

`isString` 函数称为类型守卫，在它的返回值中，我们不再使用 `boolean` 作为类型标注，而是使用 `input is string` 拆开来看它是这样的：

-   input 是函数的某个参数，也是类型守卫断言类型后可以向下传递的参数类型。
-   `is string`，即 **is 关键字 + 预期类型**，即如果这个函数成功返回为 true，那么 is 关键字前这个入参的类型，就会**被这个类型守卫调用方后续的类型控制流分析收集到**。
-   ！！！必须经过**控制流收窄**才有效！！！

> **个人理解: **这里的 **is 关键字 + 预期类型** 取决于的函数并不是 `isString` 函数本身，而是取决于 `input is string` 这一表达式是否成立，也就是说只要 string 类型可以赋值给 input，那么调用 `isString` 处的后续类型控制流都将认定 input 为 string 类型，而不取决于 `isString` 实际调用时的返回结果。

> **二编：**也可以把 `input is string` 看做 `isString` 函数的返回值，相当于函数正常返回后，之后的控制流就会接受到 `input is string` 这一类型断言，所以在该分支中的 input 就是 string 类型。

### 2. 基于 in 与 instanceof 的类型保护

---

[`in` 操作符](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fin) 并不是 TypeScript 中新增的概念，而是 JavaScript 中已有的部分，它可以通过 `key in object` 的方式来判断 key 是否存在于 object 或其原型链上（返回 true 说明存在）。

既然能起到区分作用，那么 TypeScript 中自然也可以用它来保护类型：

```tsx
interface Foo {
    foo: string;
    fooOnly: boolean;
    shared: number;
}

interface Bar {
    bar: string;
    barOnly: boolean;
    shared: number;
}

function handle(input: Foo | Bar) {
    if ("foo" in input) {
        input.fooOnly;
    } else {
        input.barOnly;
    }
}
```

但值得注意的是，只有各个类型独有的属性才能作为区分条件，比如

-   两个类型中，**互不相同**的属性名
-   两个类型中，相同属性名但**不同的字面量**
-   两个类型中，一方存在一方**不存在**的属性名

当然 instanceof 也可以作为类型守卫使用

```tsx
class FooBase {}

class BarBase {}

class Foo extends FooBase {
    fooOnly() {}
}
class Bar extends BarBase {
    barOnly() {}
}

function handle(input: Foo | Bar) {
    if (input instanceof FooBase) {
        input.fooOnly();
    } else {
        input.barOnly();
    }
}
```

### 3. 类型断言守卫

---

如果你写过测试用例或者使用过 NodeJS 的 assert 模块，那对断言这个概念应该不陌生：

```typescript
import assert from "assert";

let name: any = "linxae";

assert(typeof name === "number");

// number 类型
name.toFixed();
```

上面这段代码在运行时会抛出一个错误，因为 assert 接收到的表达式执行结果为 false。这其实也类似类型守卫的场景：如果断言**不成立**，比如在这里意味着值的类型不为 number，那么在断言下方的代码就执行不到（相当于 Dead Code）。如果断言通过了，不管你最开始是什么类型，断言后的代码中就**一定是符合断言的类型**，比如在这里就是 number。

**但断言守卫和类型守卫最大的不同点在于，在判断条件不通过时，断言守卫需要抛出一个错误，类型守卫只需要剔除掉预期的类型。** 这里的抛出错误可能让你想到了 never 类型，但实际情况要更复杂一些，断言守卫并不会始终都抛出错误，所以它的返回值类型并不能简单地使用 never 类型。为此，TypeScript 3.7 版本专门引入了 asserts 关键字来进行断言场景下的**类型守卫**，比如前面 assert 方法的签名可以是这样的：

```typescript
function _assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new Error(msg);
    }
}
```

优化一下，结合 is 关键字提供进一步的类型守卫能力：

```typescript
function assertIsNumber(val: any): asserts val is number {
    if (typeof val !== "number") {
        throw new Error("Not a number!");
    }
}

assertIsNumber(name);

// number 类型！
name.toFixed();
```

> **个人理解: **asserts 断言类型守卫和普通的守卫区别在于 **一个作用于后续，一个作用域当前类型控制流分支**

# 关于 Ts 类型约束为数字范围的尝试

---

最近在小册里深入学习 Ts 的过程中，发现了这个一个问题:

> 如果要定义一个比较精准的 number 范围类型，需要怎么定义，比如我需要一个 number 的值在 4-400 的范围之间

虽然在这个问题的下面就有大佬给出了回答，如下：

> Enumerate 类型是一个递归类型，它用来创建一个长度为 N 的数字数组。它的第一个参数 N 是数字类型，表示数组的长度。它的第二个参数 Acc 是数字数组类型，表示当前递归中数组的值。当 Acc 的长度等于 N 时，这个递归类型会停止递归，并返回 Acc 数组中的每一项。如果 Acc 的长度小于 N，那么递归类型会将当前的长度添加到 Acc 数组中，并继续递归。IntRange 是一个由两个数字类型参数 F 和 T 组成的类型，它表示从 F 到 T 的一个整数范围。它通过使用 Exclude 类型来排除由 Enumerate 类型生成的数组中的所有小于 F 的元素,从而实现 F 到 T。

```typescript
type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type T = IntRange<4, 400>;

let value: T = 40; // OK
```

关于这段代码确实能实现范围约束，分解如下：

```typescript
type MinRange = Enumerate<4>; // 0 | 1 | 2 | 3
type MaxRange = Enumerate<400>; // 0 | 1 | .... |399

type T = Exclude<MaxRange, MinRange>; // 4 | 5 | ... |399
```

可以看到确实实现了把 **小于 4** 的部分从大范围 `Enumerate<400>` 中剔除了，但这有一个问题就是 `Enumerate<400>` 本身生产的类型是 **小于 399** 的，也正如注释所写，最终的类型实际上缺少了 400 这一项。

```typescript
let value: T = 400; // 不能将类型“400”分配给类型“T”
```

正好最近在写类型体操，于是自己琢磨怎么能把这个 400 给补上

## 一、 最简单粗暴的，修改入参

---

最简单的方法，不是右开区间吗，那我直接传参的时候多加 1 就行了，如下：

```diff
- 	type T = IntRange<4, 400>;
+	type T = IntRange<4, 401>;
	let value: T = 400 // OK
```

## 二、 修改 IntRange

---

觉得直接修改参数不太优雅，那我们可以把 +1 的这个逻辑放到 `IntRange` 类型工具里面去，也就是把 `Enumerate<T>` 这里面的泛型 T +1，但想在字面量类型上+1 肯定不能简简单单的直接写成 `Enumerate<T + 1>`，这就需要用到 `Add` 类型工具，具体实现可以参考 [三水青禾](https://juejin.cn/user/659362706626839) 大佬的这篇文章 [玩转 TS 类型体操](https://juejin.cn/post/7050893279818317854#heading-8)，在这里我直接给出具体定义

```typescript
type MakeTuple<
    Target extends number,
    CurTuple extends any[] = []
> = CurTuple["length"] extends Target ? CurTuple : MakeTuple<Target, [...CurTuple, any]>;

// 两数相加
type Add<T1 extends number, T2 extends number> = [...MakeTuple<T1>, ...MakeTuple<T2>]["length"];

type res1 = Add<1, 2>; // 3
```

改写如下：

```diff
-	type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
+	type IntRange<F extends number, T extends number> = Exclude<Enumerate<Add<T,1> & number>, Enumerate<F>>;
```

## 三、 自己尝试着写一个新的

---

当然，除了在大佬的基础上做修改，我也有一些自己的思考来完成这样一个类型工具，具体思路如下：

1. 基本定义：对于整个工具，我有如下基本定义框架，接受 `Min` 和 `Max` 两个泛型分别代表左端值和右端值

```typescript
type Limit<Min extends number, Max extends number> = Min | .... | Max

type res1 = Limit<1, 1>; // 1
type res2 = Limit<2, 1>; // never
type res3 = Limit<1, 5>; // 1 | 2 | 3 | 4 |5
```

2. 构造两个长度分别为 `Min`、`Max` 的元组类型和一个 **递归类型工具**，这个工具接受两个 any[] 类型的泛型，在每次进入时，比较两个元组的长度
    - 若 Min 元组 长度> Max 元组 则返回 never
    - 若 Min 元组 长度<= Max 元组 则将 Max 元组 的当前长度字面量并入总联合类型，然后删去 Max 元组 的最后一个元素使它长度-1，并重新将两个元组传入自身递归调用

```typescript
type Recurrence<TupleA extends any[], TupleB extends any[]> = Compare<
    TupleA["length"],
    TupleB["length"]
> extends 1 | 0
    ? TupleB["length"] | Recurrence<TupleA, SliceLast<TupleB>>
    : never;

type Limit<Min extends number, Max extends number> = Recurrence<MakeTuple<Min>, MakeTuple<Max>>;
```

在上述模板中，我们用到了额外的几个类型工具

-   `MakeTuple` 构造一个大小为传入的 number 字面量的元组，这在第二个方法中已经出现过
-   `SliceLast` 删除元组最后一个元素，并返回删除后的元组
-   `Compare` 比较两个 number 字面量的大小
    -   A > B 返回 -1
    -   A = B 返回 0
    -   A < B 返回 1

这三个类型工具都算比较常见，所以我直接给出最终整合版:

```typescript
// 构造一个 长 Target 的元组类型
type MakeTuple<
    Target extends number,
    CurTuple extends any[] = []
> = CurTuple["length"] extends Target ? CurTuple : MakeTuple<Target, [...CurTuple, any]>;

// 删除元组类型最后一个元素,返回删除后的元组类型
type SliceLast<T extends any[]> = T extends [...infer Rest, any] ? [...Rest] : [];

// Compare递归工具
type CompareTuple<TA extends any[], TB extends any[]> = IsEqualLen<TA, TB> extends false
    ? TA["length"] extends 0
        ? 1
        : TB["length"] extends 0
        ? -1
        : CompareTuple<SliceLast<TA>, SliceLast<TB>>
    : 0;

// 比较两数大小
type Compare<T1 extends number, T2 extends number> = CompareTuple<MakeTuple<T1>, MakeTuple<T2>>;

// Limit递归工具
type Recurrence<TupleA extends any[], TupleB extends any[]> = Compare<
    TupleA["length"],
    TupleB["length"]
> extends 1 | 0
    ? TupleB["length"] | Recurrence<TupleA, SliceLast<TupleB>>
    : never;

// 构造number范围的联合类型
type Limit<Min extends number, Max extends number> = Recurrence<MakeTuple<Min>, MakeTuple<Max>>;

type res1 = Limit<1, 1>; // 1
type res2 = Limit<2, 1>; // never
type res3 = Limit<1, 5>; // 1 | 2 | 3 | 4 |5
```

至此我自己的想法实现完成，也算完成了目标。

当然以上实现肯定是写复杂了，事实上我觉得在原本的基础上稍作改动就好，我这个算舍近求远，但写这个的初衷在于对自己近期所学尽量都用一下，所以写出了这么一篇水文，还望大家多多指点！谢谢！

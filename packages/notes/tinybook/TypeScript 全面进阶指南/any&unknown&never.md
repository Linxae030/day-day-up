# any&unknown&never

---

### 1. never 检查分支完整性

`never`类型被称为 **Bottom Type**，是**整个类型系统层级中最底层的类型**。和`null`、`undefined` 一样，它是所有类型的子类型，但只有`never`类型的变量能够赋值给另一个 `never`类型变量。利用这个特性我们可以检查分支判断的完整性。

现有如下类型定义

```tsx
declare const strOrNumOrBool: string | number | boolean;
```

如果我们希望这个变量的每一种类型都需要得到妥善处理，在最后可以抛出一个错误，但这是**运行时**才会生效的措施，是否能在**类型检查时**就分析出来？

```tsx
if (typeof strOrNumOrBool === "string") {
    strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
    strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
    strOrNumOrBool === true;
} else {
    throw new Error(`Unknown input type: ${strOrNumOrBool}`);
}
```

实际上 TypeScript 的类型分析会在每一个 if 语句后分支都会**减少一个**，所以到最后一个 else 时，分支类型只剩下了 `never` 即空类型，我们可以利用 `never` 仅能赋值给 `never` 这一点来实现这个需求。

```tsx
if (typeof strOrNumOrBool === "string") {
    strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === "number") {
    strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === "boolean") {
    strOrNumOrBool === true;
} else {
    const _typeCheck: never = strOrNumOrBool; // 在最后的分支中新增一个类型为never的变量，当分支没有全部处理时会报错
    throw new Error(`Unknown input type: ${strOrNumOrBool}`);
}
```

switch 同理

```tsx
switch (typeof strOrNumOrBool) {
    case "string":
        console.log(1);
        break;
    case "number":
        console.log(1);
        break;
    case "boolean":
        console.log(1);
        break;
    default:
        const _typeCheck: never = strOrNumOrBool;
        throw new Error(`Unknown input type: ${strOrNumOrBool}`);
}
```

### 2. 类型断言实现不完整的对象赋值

对于以下这个稍微复杂的接口，假设想要基于这个结构随便实现一个对象，可使用类型标注：

```tsx
interface IStruct {
    foo: string;
    bar: {
        barPropA: string;
        barPropB: number;
        barMethod: () => void;
        baz: {
            handler: () => Promise<void>;
        };
    };
}
const obj: IStruct = {}; // 此时会有很多的类型报错
```

为避免报错且在保留类型检查提示的情况下，我们使用类型断言

```tsx
const obj: IStruct = <IStruct>{}; // 不再报错
```

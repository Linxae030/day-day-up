// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
    a: number;
    b: string;
};
type Bar = {
    b: number;
    c: boolean;
};

type cases = [
    Expect<
        Equal<
            Merge<Foo, Bar>,
            {
                a: number;
                b: number;
                c: boolean;
            }
        >
    >
];

// ============= Your Code Here =============
type Merge<F, S> = {
    [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
};

// 定义 Rate 组件的响应式数据类型
interface RateData {
    value: number;
}

// 如果 allow-half 属性为 false，则将数据类型限制为整数
let data1: RateData = { value: 2 }; // 正确
let data2: RateData = { value: 1.5 }; // 错误，因为 value 必须是整数

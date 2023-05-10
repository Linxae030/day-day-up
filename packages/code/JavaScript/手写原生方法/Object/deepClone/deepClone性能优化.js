/**
 * 1、用WeakMap替代map,克隆大对象时节省性能
 * 2、用While替代for...in
 *
 */
import { obj2 } from "./data.js";
// 自身引用赋值
obj2.temp = obj2;
// while封装forEach(arr,cb)
/**
 *
 * @param {*} arr 待遍历数组(数组是本身，对象则是keys)
 * @param {*} cb 回调函数
 */
function forEach(arr, cb) {
    let index = -1;
    const len = arr.length;
    while (++index < len) {
        cb(arr[index], index);
    }
    return arr;
}
function deepClone(target, map = new WeakMap()) {
    if (typeof target === "object") {
        // 判断传入的是否是数组
        const isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};
        // 若已经将对象和地址的键值对添加到map中，则取出直接返回
        if (map.has(target)) return map.get(target);
        map.set(target, cloneTarget);

        // 若是数组则传入数组本身
        const iterates = isArray ? undefined : Object.keys(target);
        forEach(iterates ?? target, (value, index) => {
            // 若遍历的是对象，则value是key
            if (!isArray) index = value;
            cloneTarget[index] = deepClone(target[index], map);
        });
        return cloneTarget;
    } else {
        return target;
    }
}
// function deepClone(obj, map = new WeakMap()) {
//     // 对于 null、undefined 和简单类型的值，直接返回
//     if (obj === null || obj === undefined || typeof obj !== "object") {
//         return obj;
//     }

//     // 如果已经拷贝过该对象，则直接返回
//     if (map.has(obj)) {
//         return map.get(obj);
//     }

//     let cloneTarget;

//     // 根据对象类型创建对应的空对象或数组
//     if (Array.isArray(obj)) {
//         cloneTarget = [];
//     } else {
//         cloneTarget = Object.create(Object.getPrototypeOf(obj));
//     }

//     // 将当前对象引用存储到 map 中
//     map.set(obj, cloneTarget);

//     // 处理对象的属性
//     const keys = [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];

//     for (const key of keys) {
//         // 如果属性值为普通对象，则递归调用 deepClone 函数进行拷贝
//         if (typeof obj[key] === "object" && obj[key] !== null) {
//             cloneTarget[key] = deepClone(obj[key], map);
//         } else {
//             // 否则直接赋值给新对象
//             cloneTarget[key] = obj[key];
//         }
//     }

//     return cloneTarget;
// }

console.log(obj2); // 正常打印，无限展开
// console.log(deepClonePre(obj2)); // 爆栈
console.log(deepClone(obj2)); // 正常打印
function Person(name) {
    this.name = name;
}

// Person.prototype.sayHello = function () {
//     console.log(`Hello, my name is ${this.name}.`);
// };
// const john = new Person("John");
// const johnCopy = deepClone(john);
// johnCopy.sayHello();

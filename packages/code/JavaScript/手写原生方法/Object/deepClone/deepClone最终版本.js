export const obj = {
    name: "gg",
    friends: ["1", "2", "3", "4"],
    age: 21,
    [Symbol("666")]: 123,
};
// 要做到能克隆 Symbol 、能继承原型链、也有性能优化
function deepClone(obj, map = new WeakMap()) {
    // 若是 null、undefined、基础数据类型其中之一则直接返回
    if (obj === null || obj === undefined || typeof obj !== "object") {
        return obj;
    }

    // 若 map 中已经存在对象对应的引用则直接返回
    if (map.has(obj)) return map.get(obj);

    // 构造拷贝根对象
    // 若是对象则使用 Object.create 继承 obj 的原型链避免错误
    let targetObj = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
    map.set(obj, targetObj);

    // 先取出 keys 再使用 for of 遍历提高效率
    // 使用 getOwnPropertyNames 只获取对象本身的属性而不考虑原型链
    // 使用 getOwnPropertySymbols 获取不可遍历的属性，比如 symbol
    // const keys1 = [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
    const keys = Reflect.ownKeys(obj);

    for (const key of keys) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            targetObj[key] = deepClone(obj[key], map);
        } else {
            targetObj[key] = obj[key];
        }
    }

    return targetObj;
}

const objClone = deepClone(obj);
objClone.friends.push(6);
console.log(obj);
console.log(objClone);
// {
//     name: 'gg',
//     friends: [ '1', '2', '3', '4' ],
//     age: 21,
//     [Symbol(666)]: 123
//   }
//   {
//     name: 'gg',
//     friends: [ '1', '2', '3', '4', 6 ],
//     age: 21,
//     [Symbol(666)]: 123
//   }
function Person(name) {
    this.name = name;
}
Person.prototype.sayHello = function () {
    console.log(`hello ${this.name}`);
};
const GG = new Person("GG");
const GGClone = deepClone(GG);
GGClone.sayHello(); // hello GG

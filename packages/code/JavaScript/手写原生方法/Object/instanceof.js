/**
 * name:instance of实现
 */
/**
 *
 * @param {*} src 源对象
 * @param {*} target 待查找对象
 * @returns  是否存在
 */
// function myInstance(src, target) {
// 	while (target.__proto__) {
// 		if (src.__proto__ === target.prototype) return true;
// 		target = target.__proto__;
// 	}
// 	return false;
// }

function myInstance(left, right) {
    let proto = Object.getPrototypeOf(left);
    const prototype = right.prototype;

    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const gg = new Person("gg", 18);
console.log(myInstance("123", String)); // true
console.log(myInstance(gg, Person)); // true
console.log(myInstance(123, Number)); // true
console.log(myInstance("123", Number)); // false

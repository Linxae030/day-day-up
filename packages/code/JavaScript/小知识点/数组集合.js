// 定义一个构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 向 Person 的原型添加一个属性
Person.prototype.gender = "male";

// 创建一个 Person 实例
var person = new Person("Tom", 25);
console.log(Reflect.ownKeys(person)); // [ 'name', 'age' ]
// 使用 for...in 循环遍历 person 对象的属性
for (let prop in person) {
    console.log(prop + " = " + person[prop]);
}
/**
 * name = Tom
 * age = 25
 * gender = male
 */

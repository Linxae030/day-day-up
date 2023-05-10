/**
 * @description keepalive的LRU算法
 * @author Linxae
 * @date 2023/3/24
 */

class LRUCache {
    capacity: number;
    cache: Map<number, number | null>;
    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: number): number {
        if (this.cache.has(key)) {
            let temp = this.cache.get(key) as number;
            this.cache.delete(key);
            this.cache.set(key, temp);
            return temp;
        } else return -1;
    }

    put(key: number, value: number) {
        if (this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size >= this.capacity) {
            console.log(this.cache.keys());

            this.cache.delete(this.cache.keys().next().value);
            console.log(`refresh: key:${key} , value:${value}`);
        }
        this.cache.set(key, value);
    }
    toString() {
        console.log("capacity", this.capacity);
        console.table(this.cache);
    }
}
const list = new LRUCache(4);
// list.put(2, 2); // 入 2，剩余容量3
// list.put(3, 3); // 入 3，剩余容量2
// list.put(4, 4); // 入 4，剩余容量1
// list.put(5, 5); // 入 5，已满    从头至尾         2-3-4-5
// list.put(4, 4); // 入4，已存在 ——> 置队尾         2-3-5-4
// list.put(1, 1); // 入1，不存在 ——> 删除队首 插入1  3-5-4-1
// list.get(3); // 获取3，刷新3——> 置队尾         5-4-1-3
// list.toString();

const map = new Map();

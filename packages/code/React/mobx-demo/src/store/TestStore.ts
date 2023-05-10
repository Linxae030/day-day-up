import { makeAutoObservable, runInAction } from "mobx";

const store = makeAutoObservable({
    count: 0,
    get double() {
        return this.count * 2;
    },
    increment() {
        this.count += 1;
    },
    decrement() {
        this.count -= 1;
    },
    async initData() {
        const res = await new Promise<number>((_) => {
            setTimeout(() => {
                _(10);
            }, 2000);
        });
        runInAction(() => {
            this.count = res;
        });
    },
});

export default store;

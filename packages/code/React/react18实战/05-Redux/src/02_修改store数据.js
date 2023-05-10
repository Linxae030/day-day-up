const store = require("./store");

// 必须通过 action 来修改 store 中的数据

const nameAction = { type: "changeName", payload: "Linxae222" };
store.dispatch(nameAction);
console.log(store.getState());

const { createStore } = require("redux");

const initialState = {
    name: "Linxae",
    age: 21,
};

// 定义 reducer 纯函数
// 两个参数
// 参数一：state，当前的状态
// 参数二：action，动作
// 返回值：新的 state
const reducer = (state = initialState, action) => {
    console.log("reducer-state", state);
    console.log("reducer-action", action);
    console.log("----------");
    // 有新数据进行更新，返回新的 state，没有新数据，返回原来的 state
    switch (action.type) {
        case "changeName":
            return { ...state, name: action.payload };
        default:
            return state;
    }
};

const store = createStore(reducer);
module.exports = store;

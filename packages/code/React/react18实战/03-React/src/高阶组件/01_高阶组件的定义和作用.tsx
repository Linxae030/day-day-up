import React, { PureComponent } from "react";

// 定义高阶组件
function hoc(Cpn: any) {
    // 1. 类组件
    class NewCpn extends PureComponent {
        render(): React.ReactNode {
            return <Cpn></Cpn>;
        }
    }
    return NewCpn;
    // 2. 函数组件
    // function NewCpn2(props: any) {}
    // return NewCpn2;
}

class HelloWorld extends PureComponent {
    render() {
        return <div>Hello!World!</div>;
    }
}

const HelloWorldHOC = hoc(HelloWorld);

export class App extends PureComponent {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <HelloWorldHOC></HelloWorldHOC>
            </div>
        );
    }
}

export default App;

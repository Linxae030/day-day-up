import React, { Component, Fragment } from "react";
import HelloWorld from "./HelloWorld";
import Test from "./test";
class App extends Component<
    {},
    {
        count: number;
        isShow: boolean;
    }
> {
    constructor(props: any) {
        super(props);
        console.log("cons");
        this.state = {
            count: 0,
            isShow: true,
        };
    }
    render() {
        console.log("render");
        const { count, isShow } = this.state;
        return (
            <div>
                <span
                    onClick={() => {
                        this.setState({
                            count: this.state.count + 1,
                        });
                    }}
                >
                    {count}
                </span>
                {/* <HelloWorld></HelloWorld> */}
                {isShow && <Test></Test>}
                <button onClick={() => this.setState({ isShow: !isShow })}>change Test</button>
            </div>
        );
    }

    componentDidMount(): void {
        console.log("didMount");
    }

    componentWillUnmount(): void {
        console.log("unMount");
    }
}
export default App;

import React, { Component } from "react";

export class App_Class extends Component<
    {},
    {
        name: string;
        age: number;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "Linxae",
            age: 20,
        };
    }
    changeName = (arg: any) => {
        console.log(arg);
        this.setState({ name: "gg" });
        // console.log(this);
    };
    render() {
        const { name, age } = this.state;
        return [
            <div key={1} onClick={this.changeName}>
                {name}
            </div>,
            <div key={2}>{age}</div>,
            <div key={3}>App_Class</div>,
        ];
    }
}

export default App_Class;

import React, { Component } from "react";

export class Test extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            text: "my test text",
        };
    }
    render() {
        const { text } = this.state;
        return (
            <div>
                {text}
                <button onClick={this.changeText}>change Text</button>
            </div>
        );
    }
    changeText = () => {
        this.setState({ text: "new Text" });
    };
    componentDidMount(): void {
        console.log("test mount");
    }
    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log("test updated");
    }
    componentWillUnmount(): void {
        console.log("test unMount");
    }
    shouldComponentUpdate() {
        console.log("should update?");

        return false;
    }
}

export default Test;

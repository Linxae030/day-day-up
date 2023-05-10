import React, { Component } from "react";

export class Header extends Component<{ banners: string[] }> {
    constructor(props: any) {
        super(props);
        console.log("Header Props", props);
    }

    render() {
        return (
            <div>
                <h1>header</h1>
                {this.props.banners.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </div>
        );
    }
}

export default Header;

import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";

export class Main extends Component<
    {},
    {
        banners: string[];
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            banners: ["新歌曲", "新MV"],
        };
    }

    handleFooterClick = (arg: any) => {
        console.log("handleFooterClick 被回调", arg);
    };
    render() {
        return (
            <div>
                <Header banners={this.state.banners}></Header>
                <Footer footerClick={this.handleFooterClick}></Footer>
            </div>
        );
    }
}

export default Main;

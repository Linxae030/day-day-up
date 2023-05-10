import React, { Component } from "react";

export class Footer extends Component {
    render() {
        const { footerClick } = this.props;
        return <div onClick={() => footerClick(6)}>Main Footer</div>;
    }
}

export default Footer;

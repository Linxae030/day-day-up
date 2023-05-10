function enhanceUserInfo(Cpn: any) {
    const userInfo = {
        name: "Linxae",
        age: 21,
    };
    // class newCpn extends PureComponent {
    //     constructor(props: any) {
    //         super(props);

    //         this.state = {
    //             userInfo: {
    //                 name: "Linxae",
    //                 age: 21,
    //             },
    //         };
    //     }

    //     render(): React.ReactNode {
    //         return <Cpn {...this.state.userInfo}></Cpn>;
    //     }
    // }
    // return newCpn;
    return (props: any) => <Cpn {...props} {...userInfo}></Cpn>;
}
export default enhanceUserInfo;

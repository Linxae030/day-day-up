import React, { PureComponent } from "react";
import enhanceUserInfo from "./hoc/enhanceUserInfo";

const Home = enhanceUserInfo(function (props: any) {
    return (
        <h1>
            {props.name}-{props.banner}
        </h1>
    );
});

function Profile(props: any) {
    return <h1>Profile</h1>;
}

export class App extends PureComponent {
    render() {
        return (
            <div>
                <Home banner={[1, 2, 3]}></Home>
                <Profile></Profile>
            </div>
        );
    }
}

export default App;

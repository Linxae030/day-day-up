import React, { PureComponent } from "react";
import ThemeContext from "./context/theme_context";
import Hello from "./pages/Hello";
export class App extends PureComponent {
    render() {
        return (
            <div>
                <ThemeContext.Provider value={{ color: "red" }}>
                    <Hello />
                </ThemeContext.Provider>
            </div>
        );
    }
}

export default App;

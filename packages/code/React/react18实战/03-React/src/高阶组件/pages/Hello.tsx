import React, { memo } from "react";
import ThemeContext from "../context/theme_context";
import { withTheme } from "../hoc/with_theme";
const Hello = memo((props) => {
    return (
        <div>
            <h2>{props.color}</h2>
        </div>
    );
});

export default withTheme(Hello);

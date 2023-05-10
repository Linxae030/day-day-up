import ThemeContext from "../context/theme_context";
export const withTheme = (Cpn: any) => {
    return (props: any) => (
        <ThemeContext.Consumer>
            {(value) => <Cpn {...props} {...value}></Cpn>}
        </ThemeContext.Consumer>
    );
};

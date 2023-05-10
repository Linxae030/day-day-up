import TypescriptPlugin from "@rollup/plugin-typescript";
import CommonjsPlugin from "@rollup/plugin-commonjs";
import NodeResolvePlugin from "@rollup/plugin-node-resolve";
import DtsPlugin from "rollup-plugin-dts";

import { cleandir as CleandirPlugin } from "rollup-plugin-cleandir";
import { terser as TerserPlugin } from "rollup-plugin-terser";

const PLUGINS = [
    TypescriptPlugin(),
    CommonjsPlugin(),
    NodeResolvePlugin(),
    TerserPlugin({
        compress: { drop_console: false },
        format: { comments: false },
    }),
    CleandirPlugin("dist"),
];

export default {
    input: "./index.ts",
    output: {
        file: "dist/index.js",
        format: "esm",
    },
    plugins: PLUGINS,
};

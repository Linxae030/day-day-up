import { defineConfig } from "vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    server: {
        port: 1999,
    },
    resolve: {
        alias: {
            "@day-day-up/": path.resolve(__dirname, "../packages/"),
        },
    },
});

import { defineConfig } from "vite";
// @ts-ignore
import sass from "vite-plugin-sass";

export default defineConfig({
    plugins: [sass()]
});
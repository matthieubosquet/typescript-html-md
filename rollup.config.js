import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";

export default [
    {
        input: "./src/index.ts",
        output: [
            {
                file: pkg.main,
                format: "cjs",
                exports: "named",
                sourcemap: true
            },
            {
                file: pkg.module,
                format: "esm",
                exports: "named"
            }
        ],
        plugins: [
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true,
                        module: "ES2015",
                        strict: true,
                        target: "ES2017"
                    }
                },
                typescript: require("typescript")
            })
        ]
    }
];

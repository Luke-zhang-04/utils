import {dirname} from "path"
import {fileURLToPath} from "url"
import fs from "fs/promises"
import glob from "glob"
import util from "util"

const __dirname = dirname(fileURLToPath(import.meta.url))

const src = (await util.promisify(glob)(`${__dirname}/../dist/src/**/*.ts`)).map((file) =>
    file.replace(/^.*\/src\//u, "").replace(/\.ts$/u, ""),
)

const exports = {}

for (const file of src) {
    if (file === "index") {
        exports["."] = {
            require: "./cjs/index.js",
            import: "./index.js",
        }

        exports["./index"] = {
            require: "./cjs/index.js",
            import: "./index.js",
        }
    } else if (file.endsWith("index")) {
        exports[`./${file.replace(/\/index$/u, "")}`] = {
            require: `./cjs/${file}.js`,
            import: `./${file}.js`,
        }

        exports[`./${file}`] = {
            require: `./cjs/${file}.js`,
            import: `./${file}.js`,
        }
    } else {
        exports[`./${file}`] = {
            require: `./cjs/${file}.js`,
            import: `./${file}.js`,
        }
    }
}

const packagejson = JSON.parse(await fs.readFile(`${__dirname}/../dist/package.json`, "utf-8"))

packagejson.exports = exports

await fs.writeFile(`${__dirname}/../dist/package.json`, JSON.stringify(packagejson, null, 2))

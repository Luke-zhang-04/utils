import * as utils from "../lib"
import Benchmark from "benchmark"

const data = {
    filterMap: {
        array: new Array(1_000_000).fill(undefined).map((_, index) => index),
    },
}

const cases = {
    filterMap: {
        util: () => {
            utils.filterMap(data.filterMap.array, (val) => ({
                shouldInclude: val % 2 === 0,
                value: val,
            }))
        },
        native: () => {
            data.filterMap.array.filter((val) => val % 2 === 0).map((val) => val)
        },
    },
}

const suite = new Benchmark.Suite()

for (const [name, functions] of Object.entries(cases)) {
    for (const [subname, callback] of Object.entries(functions)) {
        suite.add(`${name} - ${subname}`, callback)
    }
}

suite
    .on("cycle", (event) => {
        console.log(event.target.toString())
    })
    .run()

console.log("DONE")

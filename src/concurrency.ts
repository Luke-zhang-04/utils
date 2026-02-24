/**
 * A semaphore is needed because Github has a concurrent request limit of 100. A JS implementation
 * is easy because everything in JS is thread-safe (JS is single threaded, Promises are fake
 * concurrency).
 *
 * @param promises - Array of functions that return a promise
 * @param limit - Max number of concurrent promises that may run
 * @returns Array of results, with no guarantees for ordering
 */
export const semaphore = <T>(promises: (() => Promise<T>)[], limit: number) =>
    new Promise((resolve, reject) => {
        const results: T[] = []
        const running = new Array(limit)
        let inputIndex = 0 // Index from the input array
        let runningCount = 0
        let didReject = false

        const thenFunc = (index: number) => (result: T) => {
            results.push(result)

            if (inputIndex >= promises.length) {
                runningCount--
                delete running[index]

                if (runningCount === 0) {
                    resolve(results)
                }
            } else if (!didReject) {
                running[index] = promises[inputIndex]!()
                    .then(thenFunc(inputIndex))
                    .catch((err) => {
                        didReject = true
                        reject(err)
                    })

                inputIndex++
            }

            return result
        }

        for (; inputIndex < limit && inputIndex < promises.length - 1; inputIndex++) {
            runningCount++
            running[inputIndex] = promises[inputIndex]!()
                .then(thenFunc(inputIndex))
                .catch((err) => {
                    didReject = true
                    reject(err)
                })
        }
    })

/**
 * Test suite for uility functions
 *
 * 0BSD License
 */

import {fetchWithTimeout} from "../../../lib/browser/fetch"
import {inlineTryPromise} from "../../../lib/try"

describe("fetch", () => {
    describe("fetchWithTimeout", () => {
        it("should fetch normally", async () => {
            const response = await fetchWithTimeout(
                "https://api.spacexdata.com/v4/launches/latest",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )

            expect(response.status).toBe(200)

            const body = await response.json()

            expect(Object.keys(body).length).toBeGreaterThan(0)
        })

        it("should not throw error if request returns in time", async () => {
            const response = await fetchWithTimeout(
                "https://api.spacexdata.com/v4/launches/latest",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 10_000,
                },
            )

            expect(response.status).toBe(200)

            const body = await response.json()

            expect(Object.keys(body).length).toBeGreaterThan(0)
        })

        it("should abort fetch", async () => {
            const response = await inlineTryPromise(() =>
                fetchWithTimeout("https://fakeresponse.com/api/?sleep=100", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 0,
                }),
            )

            expect(response).toBeInstanceOf(Error)
            expect((response as Error).name).toBe("AbortError")
        })
    })
})

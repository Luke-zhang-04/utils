import {Crypto} from "@peculiar/webcrypto"
import {JSDOM} from "jsdom"
import fetch from "node-fetch"

export const registerDOM = (): void => {
    const crypto = new Crypto()
    const dom = new JSDOM("<!DOCTYPE html><html></html>")

    Object.defineProperties(global, {
        window: {value: dom.window},
        crypto: {value: crypto},
        fetch: {value: fetch},
        AbortController: {value: dom.window.AbortController},
    })
}

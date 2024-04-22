/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @internal
 */

const bitsPerByte = 8

// istanbul ignore next
export const getKeyLengthFromAlgo = (algo: string): number | undefined => {
    const length = algo.match(/aes-(?<length>[0-9]{3})-[A-z]{3}/u)?.groups?.length

    return length === undefined ? undefined : Number(length) / bitsPerByte
}

/* eslint-disable */
export const unescapeBase64 = (str: string) =>
    (str + "===".slice((str.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/")

export const escapeBase64 = (str: string) =>
    str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
/* eslint-enable */

/* eslint-disable prefer-arrow/prefer-arrow-functions */

export function stringToBuffer(data: Buffer, enc: "raw"): Buffer
export function stringToBuffer(data: string, enc: BufferEncoding): Buffer
export function stringToBuffer(data: string | Buffer, enc: BufferEncoding | "raw"): Buffer

export function stringToBuffer(data: string | Buffer, enc: BufferEncoding | "raw"): Buffer {
    if (enc === "raw") {
        return data as Buffer
    } else if (enc === "base64url") {
        return Buffer.from(unescapeBase64(data as string), "base64")
    }

    return Buffer.from(data as string, enc)
}

export function bufferToString(data: Buffer, enc: "raw"): Buffer
export function bufferToString(data: Buffer, enc: BufferEncoding): string
export function bufferToString(data: Buffer, enc: BufferEncoding | "raw"): string | Buffer

export function bufferToString(data: Buffer, enc: BufferEncoding | "raw"): string | Buffer {
    if (enc === "raw") {
        return data
    } else if (enc === "base64url") {
        return escapeBase64(data.toString("base64"))
    }

    return data.toString(enc)
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */

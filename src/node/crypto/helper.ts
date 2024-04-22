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

/* eslint-disable prefer-arrow/prefer-arrow-functions */

export function stringToBuffer(data: Buffer, enc: "raw"): Buffer
export function stringToBuffer(data: string, enc: BufferEncoding): Buffer
export function stringToBuffer(data: string | Buffer, enc: BufferEncoding | "raw"): Buffer

export function stringToBuffer(data: string | Buffer, enc: BufferEncoding | "raw"): Buffer {
    if (enc === "raw") {
        return data as Buffer
    }

    return Buffer.from(data as string, enc)
}

export function bufferToString(data: Buffer, enc: "raw"): Buffer
export function bufferToString(data: Buffer, enc: BufferEncoding): string
export function bufferToString(data: Buffer, enc: BufferEncoding | "raw"): string | Buffer

export function bufferToString(data: Buffer, enc: BufferEncoding | "raw"): string | Buffer {
    if (enc === "raw") {
        return data
    }

    return data.toString(enc)
}

/* eslint-enable prefer-arrow/prefer-arrow-functions */

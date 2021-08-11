/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 * @internal
 */
/// <reference types="node" />
export declare const getKeyLengthFromAlgo: (algo: string) => number | undefined;
export declare const unescapeBase64: (str: string) => string;
export declare const escapeBase64: (str: string) => string;
export declare function stringToBuffer(data: Buffer, enc: "raw"): Buffer;
export declare function stringToBuffer(data: string, enc: BufferEncoding | "base64url"): Buffer;
export declare function stringToBuffer(data: string | Buffer, enc: BufferEncoding | "base64url" | "raw"): Buffer;
export declare function bufferToString(data: Buffer, enc: "raw"): Buffer;
export declare function bufferToString(data: Buffer, enc: BufferEncoding | "base64url"): string;
export declare function bufferToString(data: Buffer, enc: BufferEncoding | "base64url" | "raw"): string | Buffer;

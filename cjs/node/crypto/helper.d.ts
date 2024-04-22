/**
 * Cryptography related utils
 *
 * Wraps the existing Node Crypto API
 *
 * @internal
 */
/// <reference types="node" />
export declare const getKeyLengthFromAlgo: (algo: string) => number | undefined;
export declare function stringToBuffer(data: Buffer, enc: "raw"): Buffer;
export declare function stringToBuffer(data: string, enc: BufferEncoding): Buffer;
export declare function stringToBuffer(data: string | Buffer, enc: BufferEncoding | "raw"): Buffer;
export declare function bufferToString(data: Buffer, enc: "raw"): Buffer;
export declare function bufferToString(data: Buffer, enc: BufferEncoding): string;
export declare function bufferToString(data: Buffer, enc: BufferEncoding | "raw"): string | Buffer;

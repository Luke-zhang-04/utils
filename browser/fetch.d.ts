/**
 * Fetch utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
/// <reference types="typescript/lib/lib.dom" />
declare type FetchOptions = Exclude<RequestInit, "signal"> & {
    /**
     * Timeout in ms
     */
    timeout?: number;
};
/**
 * Fetch API with timeout
 *
 * @param resource - Resource to fetch
 * @param param1 - Fetch parameters + an optional timeout to abort the fetch after time
 * @param timeout - Timeout in ms
 * @returns Response
 */
export declare const fetchWithTimeout: (resource: RequestInfo, { timeout, ...options }?: FetchOptions) => Promise<Response>;
export {};
/**
 * Fetch utils
 *
 * @module
 */
import { RequestInfo, RequestInit, Response } from "node-fetch";
type FetchOptions = Exclude<RequestInit, "signal"> & {
    /** Timeout in ms */
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

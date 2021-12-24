/**
 * Fetch utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */
import fetch from "node-fetch";
import { AbortController } from "node-abort-controller";
/**
 * Fetch API with timeout
 *
 * @param resource - Resource to fetch
 * @param param1 - Fetch parameters + an optional timeout to abort the fetch after time
 * @param timeout - Timeout in ms
 * @returns Response
 */
export const fetchWithTimeout = async (resource, 
// istanbul ignore next
{ timeout, ...options } = {}) => {
    if (timeout === undefined) {
        return await fetch(resource, options);
    }
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
    });
    clearTimeout(id);
    return response;
};
//# sourceMappingURL=fetch.js.map
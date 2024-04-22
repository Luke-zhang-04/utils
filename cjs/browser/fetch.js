"use strict";
/**
 * Fetch utils
 *
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWithTimeout = void 0;
/**
 * Fetch API with timeout
 *
 * @param resource - Resource to fetch
 * @param param1 - Fetch parameters + an optional timeout to abort the fetch after time
 * @param timeout - Timeout in ms
 * @returns Response
 */
const fetchWithTimeout = async (resource, 
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
exports.fetchWithTimeout = fetchWithTimeout;
//# sourceMappingURL=fetch.js.map
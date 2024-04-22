"use strict";
/**
 * Fetch utils
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWithTimeout = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_abort_controller_1 = require("node-abort-controller");
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
        return await (0, node_fetch_1.default)(resource, options);
    }
    const controller = new node_abort_controller_1.AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await (0, node_fetch_1.default)(resource, {
        ...options,
        signal: controller.signal,
    });
    clearTimeout(id);
    return response;
};
exports.fetchWithTimeout = fetchWithTimeout;
//# sourceMappingURL=fetch.js.map
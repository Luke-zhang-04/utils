/**
 * Fetch utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

import fetch, {RequestInfo, RequestInit, Response} from "node-fetch"
import {AbortController} from "node-abort-controller"

type FetchOptions = Exclude<RequestInit, "signal"> & {
    /** Timeout in ms */
    timeout?: number
}

/**
 * Fetch API with timeout
 *
 * @param resource - Resource to fetch
 * @param param1 - Fetch parameters + an optional timeout to abort the fetch after time
 * @param timeout - Timeout in ms
 * @returns Response
 */
export const fetchWithTimeout = async (
    resource: RequestInfo,
    // istanbul ignore next
    {timeout, ...options}: FetchOptions = {},
): Promise<Response> => {
    if (timeout === undefined) {
        return await fetch(resource, options)
    }

    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
    })

    clearTimeout(id)

    return response
}

/**
 * Fetch utils
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 */

/**
 * Fetch API with timeout
 *
 * @param resource - Resource to fetch
 * @param param1 - Fetch parameters + an optional timeout to abort the fetch after time
 * @returns Response
 */
export const fetchWithTimeout = async (
    resource: RequestInfo,
    {timeout, ...options}: Exclude<RequestInit, "signal"> & {timeout?: number} = {},
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

/**
 * Utility functions
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 * @file HTTP Status codes and their names exported as a const enum, an object, and named exports
 */

/* eslint-disable max-lines, no-shadow, no-irregular-whitespace */
// tsdoc/syntax throws errors when a closing code backtick is on a newline
/* eslint-disable tsdoc/syntax */

/**
 * ## Hypertext Transfer Protocol (HTTP) response status codes
 *
 * HTTP response status codes indicate whether a specific HTTP request has been successfully
 * completed. Responses are grouped in five classes:
 *
 * 1. Informational responses (100–199)
 * 2. Successful responses (200–299)
 * 3. Redirects (300–399)
 * 4. Client errors (400–499)
 * 5. Server errors (500–599)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}
 */
export const enum Status {
    /**
     * ## 100 Continue
     *
     * The HTTP **`100 Continue`** informational status response code indicates that everything so
     * far is OK and that the client should continue with the request or ignore it if it is already
     * finished.
     *
     * To have a server check the request's headers, a client must send
     * [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect)`: 100-continue` as a header in its initial
     * request and receive a `100 Continue` status code in response before sending the body.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100}
     */
    Continue = 100,

    /**
     * ## 101 Switching Protocols
     *
     * The HTTP **`101 Switching Protocols`** response code indicates the protocol the server is
     * switching to as requested by a client which sent the message including the
     * [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) request header.
     *
     * The server includes in this response an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade)
     * response header to indicate the protocol it switched to. The process is described in detail
     * in the article [Protocol upgrade mechanism](/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101}
     */
    SwitchingProtocols = 101,

    /**
     * ## Processing
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * A WebDAV request may contain many sub-requests involving file operations, requiring a long
     * time to complete the request.
     *
     * This code indicates that the server has received and is processing the request, but no
     * response is available yet.
     *
     * This prevents the client from timing out and assuming the request was lost.
     */
    Processing = 102,

    /**
     * ## 103 Early Hints
     *
     * This page is not complete.
     *
     * The HTTP **`103 Early Hints`** information response status code is primarily intended to be
     * used with the [`Link`](/en-US/docs/Web/HTTP/Headers/Link) header to allow the user agent to
     * start preloading resources while the server is still preparing a response.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103}
     */
    EarlyHints = 103,

    /**
     * ## 200 OK
     *
     * The HTTP **`200 OK`** success status response code indicates that the request has succeeded.
     * A 200 response is cacheable by default.
     *
     * The meaning of a success depends on the HTTP request method:
     *
     * The successful result of a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or a
     * [`DELETE`](/en-US/docs/Web/HTTP/Methods/DELETE) is often not a `200` `OK` but a
     * [`204`](/en-US/docs/Web/HTTP/Status/204) `No Content` (or a
     * [`201`](/en-US/docs/Web/HTTP/Status/201) `Created` when the resource is uploaded for the first time).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200}
     */
    Ok = 200,

    /**
     * ## 201 Created
     *
     * The HTTP **`201 Created`** success status response code indicates that the request has
     * succeeded and has led to the creation of a resource. The new resource is effectively created
     * before this response is sent back and the new resource is returned in the body of the
     * message, its location being either the URL of the request, or the content of the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
     *
     * The common use case of this status code is as the result of a
     * [`POST`](/en-US/docs/Web/HTTP/Methods/POST) request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201}
     */
    Created = 201,

    /**
     * ## 202 Accepted
     *
     * The HyperText Transfer Protocol (HTTP) **`202 Accepted`** response status code indicates
     * that the request has been accepted for processing, but the processing has not been
     * completed; in fact, processing may not have started yet. The request might or might not
     * eventually be acted upon, as it might be disallowed when processing actually takes place.
     *
     * 202 is non-committal, meaning that there is no way for the HTTP to later send an
     * asynchronous response indicating the outcome of processing the request. It is intended for
     * cases where another process or server handles the request, or for batch processing.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202}
     */
    Accepted = 202,

    /**
     * ## 203 Non-Authoritative Information
     *
     * The HTTP **`203 Non-Authoritative Information`** response status indicates that the request
     * was successful but the enclosed payload has been modified by a transforming
     * [proxy](/en-US/docs/Glossary/Proxy_server) from that of the origin server's
     * [`200`](/en-US/docs/Web/HTTP/Status/200) (`OK`) response .
     *
     * The `203` response is similar to the value
     * [`214`](/en-US/docs/Web/HTTP/Headers/Warning#warning_codes), meaning `Transformation
     * Applied`, of the [`Warning`](/en-US/docs/Web/HTTP/Headers/Warning) header code, which has
     * the additional advantage of being applicable to responses with any status code.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203}
     */
    NonAuthoritativeInformation = 203,

    /**
     * ## 204 No Content
     *
     * The HTTP **`204 No Content`** success status response code indicates that a request has
     * succeeded, but that the client doesn't need to navigate away from its current page.
     *
     * This might be used, for example, when implementing "save and continue editing" functionality
     * for a wiki site. In this case a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request would be
     * used to save the page, and the `204 No Content` response would be sent to indicate that the
     * editor should not be replaced by some other page.
     *
     * A 204 response is cacheable by default (an [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag)
     * header is included in such a response).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204}
     */
    NoContent = 204,

    /**
     * ## 205 Reset Content
     *
     * The HTTP **`205 Reset Content`** response status tells the client to reset the document
     * view, so for example to clear the content of a form, reset a canvas state, or to refresh the UI.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205}
     */
    ResetContent = 205,

    /**
     * ## 206 Partial Content
     *
     * The HTTP **`206 Partial Content`** success status response code indicates that the request
     * has succeeded and the body contains the requested ranges of data, as described in the
     * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header of the request.
     *
     * If there is only one range, the [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type)
     * of the whole response is set to the type of the document, and a
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) is provided.
     *
     * If several ranges are sent back, the
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) is set to `multipart/byteranges`
     * and each fragment covers one range, with
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) and
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) describing it.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206}
     */
    PartialContent = 206,

    /**
     * ## Multi-Status
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The message body that follows is an XML message and can contain a number of separate
     * response codes, depending on how many sub-requests were made.
     */
    MultiStatus = 207,

    /**
     * ## Already Reported
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The members of a DAV binding have already been enumerated in a preceding part of the
     * (multistatus) response, and are not being included again.
     */
    AlreadyReported = 208,

    /**
     * ## IM Used
     *
     * **[HTTP Delta encoding](https://datatracker.ietf.org/doc/html/rfc3229)**
     *
     * The server has fulfilled a `GET` request for the resource, and the response is a
     * representation of the result of one or more instance-manipulations applied to the current instance.
     */
    IMUsed = 226,

    /**
     * ## 300 Multiple Choices
     *
     * The HTTP **`300 Multiple Choices`** redirect status response code indicates that the request
     * has more than one possible responses. The user-agent or the user should choose one of them.
     * As there is no standardized way of choosing one of the responses, this response code is very
     * rarely used.
     *
     * If the server has a preferred choice, it should generate a
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300}
     */
    MultipleChoices = 300,

    /**
     * ## 301 Moved Permanently
     *
     * The HyperText Transfer Protocol (HTTP) **`301 Moved Permanently`** redirect status response
     * code indicates that the resource requested has been definitively moved to the URL given by
     * the [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this
     * page and search engines update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is sent to the new URL).
     *
     * Even if the specification requires the method (and the body) not to be altered when the
     * redirection is performed, not all user-agents align with it - you can still find this type
     * of bugged software out there. It is therefore recommended to use the `301` code only as a
     * response for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) methods and to use the [`308 Permanent
     * Redirect`](/en-US/docs/Web/HTTP/Status/308) for [`POST`](/en-US/docs/Web/HTTP/Methods/POST)
     * methods instead, as the method change is explicitly prohibited with this status.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301}
     */
    MovedPermanently = 301,

    /**
     * ## 302 Found
     *
     * The HyperText Transfer Protocol (HTTP) **`302 Found`** redirect status response code
     * indicates that the resource requested has been temporarily moved to the URL given by the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header. A browser redirects to this page
     * but search engines don't update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is not sent to the new URL).
     *
     * Even if the specification requires the method (and the body) not to be altered when the
     * redirection is performed, not all user-agents conform here - you can still find this type of
     * bugged software out there. It is therefore recommended to set the `302` code only as a
     * response for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) methods and to use [`307 Temporary
     * Redirect`](/en-US/docs/Web/HTTP/Status/307) instead, as the method change is explicitly
     * prohibited in that case.
     *
     * In the cases where you want the method used to be changed to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
     * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give a
     * response to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded
     * resource but a confirmation message such as: 'you successfully uploaded XYZ'.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302}
     */
    Found = 302,

    /**
     * ## 303 See Other
     *
     * The HyperText Transfer Protocol (HTTP) **`303 See Other`** redirect status response code
     * indicates that the redirects don't link to the newly uploaded resources, but to another page
     * (such as a confirmation page or an upload progress page). This response code is usually sent
     * back as a result of [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or
     * [`POST`](/en-US/docs/Web/HTTP/Methods/POST). The method used to display this redirected page
     * is always [`GET`](/en-US/docs/Web/HTTP/Methods/GET).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303}
     */
    SeeOther = 303,

    /**
     * ## 304 Not Modified
     *
     * The HTTP **`304 Not Modified`** client redirection response code indicates that there is no
     * need to retransmit the requested resources. It is an implicit redirection to a cached
     * resource. This happens when the request method is [safe](/en-US/docs/Glossary/Safe/HTTP),
     * like a [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or a
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) request, or when the request is conditional and
     * uses a [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) or a
     * [`If-Modified-Since`](/en-US/docs/Web/HTTP/Headers/If-Modified-Since) header.
     *
     * The equivalent [`200`](/en-US/docs/Web/HTTP/Status/200) `OK` response would have included
     * the headers [`Cache-Control`](/en-US/docs/Web/HTTP/Headers/Cache-Control),
     * [`Content-Location`](/en-US/docs/Web/HTTP/Headers/Content-Location),
     * [`Date`](/en-US/docs/Web/HTTP/Headers/Date), [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag),
     * [`Expires`](/en-US/docs/Web/HTTP/Headers/Expires), and [`Vary`](/en-US/docs/Web/HTTP/Headers/Vary).
     *
     * **Note:** Many [developer tools' network panels](/en-US/docs/Tools/Network_Monitor) of
     * browsers create extraneous requests leading to `304` responses, so that access to the local
     * cache is visible to developers.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304}
     */
    NotModified = 304,

    /**
     * ## Use Proxy
     *
     * The requested resource is available only through a proxy, the address for which is provided
     * in the response.
     *
     * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses
     * with this status code, primarily for security reasons.
     *
     * @deprecated Due to security concerns regarding in-band configuration of a proxy
     * @since HTTP/1.1
     */
    UseProxy = 305,

    /**
     * ## Switch Proxy
     *
     * Originally meant "Subsequent requests should use the specified proxy".
     *
     * @deprecated No longer used
     * @since HTTP/1.1
     */
    SwitchProxy = 306,

    /**
     * ## 307 Temporary Redirect
     *
     * [HTTP](/en-US/docs/Glossary/HTTP) **`307 Temporary Redirect`** redirect status response code
     * indicates that the resource requested has been temporarily moved to the URL given by the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers.
     *
     * The method and the body of the original request are reused to perform the redirected
     * request. In the cases where you want the method used to be changed to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
     * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give an
     * answer to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded
     * resources, but a confirmation message (like "You successfully uploaded XYZ").
     *
     * The only difference between `307` and [`302`](/en-US/docs/Web/HTTP/Status/302) is that `307`
     * guarantees that the method and the body will not be changed when the redirected request is
     * made. With `302`, some old clients were incorrectly changing the method to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET): the behavior with non-`GET` methods and `302` is
     * then unpredictable on the Web, whereas the behavior with `307` is predictable. For `GET`
     * requests, their behavior is identical.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307}
     */
    TemporaryRedirect = 307,

    /**
     * ## 308 Permanent Redirect
     *
     * The HyperText Transfer Protocol (HTTP) **`308 Permanent Redirect`** redirect status response
     * code indicates that the resource requested has been definitively moved to the URL given by
     * the [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this
     * page and search engines update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is sent to the new URL).
     *
     * The request method and the body will not be altered, whereas
     * [`301`](/en-US/docs/Web/HTTP/Status/301) may incorrectly sometimes be changed to a
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) method.
     *
     * **Note:** Some Web applications may use the `308 Permanent Redirect` in a non-standard way
     * and for other purposes. For example, Google Drive uses a `308 Resume Incomplete` response to
     * indicate to the client when an incomplete upload stalled. (See [Perform a resumable
     * download](https://developers.google.com/drive/v3/web/manage-uploads#resumable) on Google
     * Drive documentation.)
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308}
     */
    PermanentRedirect = 308,

    /**
     * ## 400 Bad Request
     *
     * The HyperText Transfer Protocol (HTTP) **`400 Bad Request`** response status code indicates
     * that the server cannot or will not process the request due to something that is perceived to
     * be a client error (e.g., malformed request syntax, invalid request message framing, or
     * deceptive request routing).
     *
     * **Warning:** The client should not repeat this request without modification.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400}
     */
    BadRequest = 400,

    /**
     * ## 401 Unauthorized
     *
     * The HTTP **`401 Unauthorized`** client error status response code indicates that the request
     * has not been applied because it lacks valid authentication credentials for the target resource.
     *
     * This status is sent with a
     * [`WWW-Authenticate`](/en-US/docs/Web/HTTP/Headers/WWW-Authenticate) header that contains
     * information on how to authorize correctly.
     *
     * This status is similar to [`403`](/en-US/docs/Web/HTTP/Status/403), but in this case,
     * authentication is possible.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401}
     */
    Unauthorized = 401,

    /**
     * ## 402 Payment Required
     *
     * **This is an [experimental
     * technology](/en-US/docs/MDN/Guidelines/Conventions_definitions#experimental)** Check the
     * [Browser compatibility table](#browser_compatibility) carefully before using this in production.
     *
     * The HTTP **`402 Payment Required`** is a nonstandard client error status response code that
     * is reserved for future use.
     *
     * Sometimes, this code indicates that the request can not be processed until the client makes
     * a payment. Originally it was created to enable digital cash or (micro) payment systems and
     * would indicate that the requested content is not available until the client makes a payment.
     * However, no standard use convention exists and different entities use it in different contexts.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402}
     */
    PaymentRequired = 402,

    /**
     * ## 403 Forbidden
     *
     * The HTTP **`403 Forbidden`** client error status response code indicates that the server
     * understood the request but refuses to authorize it.
     *
     * This status is similar to [`401`](/en-US/docs/Web/HTTP/Status/401), but in this case,
     * re-authenticating will make no difference. The access is permanently forbidden and tied to
     * the application logic, such as insufficient rights to a resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403}
     */
    Forbidden = 403,

    /**
     * ## 404 Not Found
     *
     * The HTTP **`404 Not Found`** client error response code indicates that the server can't find
     * the requested resource. Links that lead to a 404 page are often called broken or dead links
     * and can be subject to [link rot](https://en.wikipedia.org/wiki/Link_rot).
     *
     * A 404 status code does not indicate whether the resource is temporarily or permanently
     * missing. But if a resource is permanently removed, a
     * [`410`](/en-US/docs/Web/HTTP/Status/410) (Gone) should be used instead of a 404 status.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404}
     */
    NotFound = 404,

    /**
     * ## 405 Method Not Allowed
     *
     * The HyperText Transfer Protocol (HTTP) **`405 Method Not Allowed`** response status code
     * indicates that the request method is known by the server but is not supported by the target resource.
     *
     * The server **must** generate an **`Allow`** header field in a 405 response containing a list
     * of the target resource's currently supported methods.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405}
     */
    MethodNotAllowed = 405,

    /**
     * ## 406 Not Acceptable
     *
     * The HyperText Transfer Protocol (HTTP) **`406 Not Acceptable`** client error response code
     * indicates that the server cannot produce a response matching the list of acceptable values
     * defined in the request's proactive [content
     * negotiation](/en-US/docs/Web/HTTP/Content_negotiation) headers, and that the server is
     * unwilling to supply a default representation.
     *
     * Proactive content negotiation headers include:
     *
     * In practice, this error is very rarely used. Instead of responding using this error code,
     * which would be cryptic for the end user and difficult to fix, servers ignore the relevant
     * header and serve an actual page to the user. It is assumed that even if the user won't be
     * completely happy, they will prefer this to an error code.
     *
     * If a server returns such an error status, the body of the message should contain the list of
     * the available representations of the resources, allowing the user to choose among them.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406}
     */
    NotAcceptable = 406,

    /**
     * ## 407 Proxy Authentication Required
     *
     * The HTTP **`407 Proxy Authentication Required`** client error status response code indicates
     * that the request has not been applied because it lacks valid authentication credentials for
     * a [proxy server](/en-US/docs/Glossary/Proxy_server) that is between the browser and the
     * server that can access the requested resource.
     *
     * This status is sent with a
     * [`Proxy-Authenticate`](/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate) header that contains
     * information on how to authorize correctly.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407}
     */
    ProxyAuthenticationRequired = 407,

    /**
     * ## 408 Request Timeout
     *
     * The HyperText Transfer Protocol (HTTP) **`408 Request Timeout`** response status code means
     * that the server would like to shut down this unused connection. It is sent on an idle
     * connection by some servers, *even without any previous request by the client*.
     *
     * A server should send the "close" [`Connection`](/en-US/docs/Web/HTTP/Headers/Connection)
     * header field in the response, since `408` implies that the server has decided to close the
     * connection rather than continue waiting.
     *
     * This response is used much more since some browsers, like Chrome, Firefox 27+, and IE9, use
     * HTTP pre-connection mechanisms to speed up surfing.
     *
     * **Note:** some servers merely shut down the connection without sending this message.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408}
     */
    RequestTimeout = 408,

    /**
     * ## 409 Conflict
     *
     * The HTTP **`409 Conflict`** response status code indicates a request conflict with current
     * state of the target resource.
     *
     * Conflicts are most likely to occur in response to a
     * [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request. For example, you may get a 409 response
     * when uploading a file which is older than the one already on the server resulting in a
     * version control conflict.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409}
     */
    Conflict = 409,

    /**
     * ## 410 Gone
     *
     * The HyperText Transfer Protocol (HTTP) **`410 Gone`** client error response code indicates
     * that access to the target resource is no longer available at the origin server and that this
     * condition is likely to be permanent.
     *
     * If you don't know whether this condition is temporary or permanent, a
     * [`404`](/en-US/docs/Web/HTTP/Status/404) status code should be used instead.
     *
     * **Note:** A 410 response is cacheable by default.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410}
     */
    Gone = 410,

    /**
     * ## 411 Length Required
     *
     * The HyperText Transfer Protocol (HTTP) **`411 Length Required`** client error response code
     * indicates that the server refuses to accept the request without a defined
     * [`Content-Length`](/en-US/docs/Web/HTTP/Headers/Content-Length) header.
     *
     * **Note:** by specification, when sending data in a series of chunks, the `Content-Length`
     * header is omitted and at the beginning of each chunk you need to add the length of the
     * current chunk in hexadecimal format. See
     * [`Transfer-Encoding`](/en-US/docs/Web/HTTP/Headers/Transfer-Encoding) for more details.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411}
     */
    LengthRequired = 411,

    /**
     * ## 412 Precondition Failed
     *
     * The HyperText Transfer Protocol (HTTP) **`412 Precondition Failed`** client error response
     * code indicates that access to the target resource has been denied. This happens with
     * conditional requests on methods other than [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) when the condition defined by the
     * [`If-Unmodified-Since`](/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since) or
     * [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) headers is not fulfilled. In
     * that case, the request, usually an upload or a modification of a resource, cannot be made
     * and this error response is sent back.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412}
     */
    PreconditionFailed = 412,

    /**
     * ## 413 Payload Too Large
     *
     * The HTTP **`413 Payload Too Large`** response status code indicates that the request entity
     * is larger than limits defined by server; the server might close the connection or return a
     * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header field.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413}
     */
    PayloadTooLarge = 413,

    /**
     * ## 414 URI Too Long
     *
     * The HTTP **`414 URI Too Long`** response status code indicates that the URI requested by the
     * client is longer than the server is willing to interpret.
     *
     * There are a few rare conditions when this might occur:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414}
     */
    URITooLong = 414,

    /**
     * ## 415 Unsupported Media Type
     *
     * The HTTP **`415 Unsupported Media Type`** client error response code indicates that the
     * server refuses to accept the request because the payload format is in an unsupported format.
     *
     * The format problem might be due to the request's indicated
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) or
     * [`Content-Encoding`](/en-US/docs/Web/HTTP/Headers/Content-Encoding), or as a result of
     * inspecting the data directly.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415}
     */
    UnsupportedMediaType = 415,

    /**
     * ## 416 Range Not Satisfiable
     *
     * The HyperText Transfer Protocol (HTTP) **`416 Range Not Satisfiable`** error response code
     * indicates that a server cannot serve the requested ranges. The most likely reason is that
     * the document doesn't contain such ranges, or that the
     * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header value, though syntactically correct,
     * doesn't make sense.
     *
     * The `416` response message contains a
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) indicating an unsatisfied
     * range (that is a `'*'`) followed by a `'/'` and the current length of the resource. E.g.
     * `Content-Range: bytes *​/12777`
     *
     * Faced with this error, browsers usually either abort the operation (for example, a download
     * will be considered as non-resumable) or ask for the whole document again.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416}
     */
    RangeNotSatisfiable = 416,

    /**
     * ## 417 Expectation Failed
     *
     * The HTTP **`417 Expectation Failed`** client error response code indicates that the
     * expectation given in the request's [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header
     * could not be met.
     *
     * See the [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header for more details.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417}
     */
    ExpectationFailed = 417,

    /**
     * ## 418 I'm a teapot
     *
     * The HTTP **`418 I'm a teapot`** client error response code indicates that the server refuses
     * to brew coffee because it is, permanently, a teapot. A combined coffee/tea pot that is
     * temporarily out of coffee should instead return 503. This error is a reference to Hyper Text
     * Coffee Pot Control Protocol defined in April Fools' jokes in 1998 and 2014.
     *
     * Some websites use this response for requests they do not wish to handle, such as automated queries.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418}
     */
    ImATeapot = 418,

    /**
     * ## Misdirected Request
     *
     * The request was directed at a server that is not able to produce a response. This can be
     * sent by a server that is not configured to produce responses for the combination of scheme
     * and authority that are included in the request URI.
     */
    MisdirectedRequest = 421,

    /**
     * ## 422 Unprocessable Entity
     *
     * The HyperText Transfer Protocol (HTTP) **`422 Unprocessable Entity`** response status code
     * indicates that the server understands the content type of the request entity, and the syntax
     * of the request entity is correct, but it was unable to process the contained instructions.
     *
     * **Warning:** The client should not repeat this request without modification.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422}
     */
    UnprocessableEntity = 422,

    /**
     * ## Locked
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The resource that is being accessed is locked.
     */
    Locked = 423,

    /**
     * ## Failed Dependency
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The request failed due to failure of a previous request.
     */
    FailedDependency = 424,

    /**
     * ## 426 Upgrade Required
     *
     * The HTTP **`426 Upgrade Required`** client error response code indicates that the server
     * refuses to perform the request using the current protocol but might be willing to do so
     * after the client upgrades to a different protocol.
     *
     * The server sends an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) header with this
     * response to indicate the required protocol(s).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426}
     */
    UpgradeRequired = 426,

    /**
     * ## 428 Precondition Required
     *
     * The HTTP **`428 Precondition Required`** response status code indicates that the server
     * requires the request to be [conditional](/en-US/docs/Web/HTTP/Conditional_requests).
     *
     * Typically, this means that a required precondition header, such as
     * [`If-Match`](/en-US/docs/Web/HTTP/Headers/If-Match), **is missing**.
     *
     * When a precondition header is **not matching** the server side state, the response should be
     * [`412`](/en-US/docs/Web/HTTP/Status/412) `Precondition Failed`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428}
     */
    PreconditionRequired = 428,

    /**
     * ## 429 Too Many Requests
     *
     * The HTTP **`429 Too Many Requests`** response status code indicates the user has sent too
     * many requests in a given amount of time ("rate limiting").
     *
     * A [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header might be included to this
     * response indicating how long to wait before making a new request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429}
     */
    TooManyRequests = 429,

    /**
     * ## 431 Request Header Fields Too Large
     *
     * The HTTP **`431 Request Header Fields Too Large`** response status code indicates that the
     * server refuses to process the request because the request's [HTTP
     * headers](/en-US/docs/Web/HTTP/Headers) are too long. The request *may* be resubmitted after
     * reducing the size of the request headers.
     *
     * 431 can be used when the **total size** of request headers is too large, or when a
     * **single** header field is too large. To help those running into this error, indicate which
     * of the two is the problem in the response body — ideally, also include which headers are too
     * large. This lets users attempt to fix the problem, such as by clearing their cookies.
     *
     * Servers will often produce this status if:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431}
     */
    RequestHeaderFieldsTooLarge = 431,

    /**
     * ## 451 Unavailable For Legal Reasons
     *
     * The HyperText Transfer Protocol (HTTP) **`451 Unavailable For Legal Reasons`** client error
     * response code indicates that the user requested a resource that is not available due to
     * legal reasons, such as a web page for which a legal action has been issued.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451}
     */
    UnavailableForLegalReasons = 451,

    /**
     * ## 500 Internal Server Error
     *
     * The HyperText Transfer Protocol (HTTP) **`500 Internal Server Error`** server error response
     * code indicates that the server encountered an unexpected condition that prevented it from
     * fulfilling the request.
     *
     * This error response is a generic "catch-all" response. Usually, this indicates the server
     * cannot find a better 5xx error code to response. Sometimes, server administrators log error
     * responses like the 500 status code with more details about the request to prevent the error
     * from happening again in the future.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
     */
    InternalError = 500,

    /**
     * ## 500 Internal Server Error
     *
     * The HyperText Transfer Protocol (HTTP) **`500 Internal Server Error`** server error response
     * code indicates that the server encountered an unexpected condition that prevented it from
     * fulfilling the request.
     *
     * This error response is a generic "catch-all" response. Usually, this indicates the server
     * cannot find a better 5xx error code to response. Sometimes, server administrators log error
     * responses like the 500 status code with more details about the request to prevent the error
     * from happening again in the future.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
     */
    InternalServerError = 500,

    /**
     * ## 501 Not Implemented
     *
     * The HyperText Transfer Protocol (HTTP) **`501 Not Implemented`** server error response code
     * means that **the server does not support the functionality required to fulfill the request**.
     *
     * This status can also send a [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After)
     * header, telling the requester when to check back to see if the functionality is supported by then.
     *
     * `501` is the appropriate response when the server does not recognize the request method and
     * is incapable of supporting it for any resource. The only methods that servers are required
     * to support (and therefore that must not return `501`) are
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) and [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD).
     *
     * If the server *does* recognize the method, but intentionally does not support it, the
     * appropriate response is [`405 Method Not Allowed`](/en-US/docs/Web/HTTP/Status/405).
     *
     * **Note:**
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501}
     */
    NotImplemented = 501,

    /**
     * ## 502 Bad Gateway
     *
     * The HyperText Transfer Protocol (HTTP) **`502 Bad Gateway`** server error response code
     * indicates that the server, while acting as a gateway or proxy, received an invalid response
     * from the upstream server.
     *
     * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might
     * refer to different things in networking and a 502 error is usually not something you can
     * fix, but requires a fix by the web server or the proxies you are trying to get access through.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502}
     */
    BadGateway = 502,

    /**
     * ## 503 Service Unavailable
     *
     * The HyperText Transfer Protocol (HTTP) **`503 Service Unavailable`** server error response
     * code indicates that the server is not ready to handle the request.
     *
     * Common causes are a server that is down for maintenance or that is overloaded. This response
     * should be used for temporary conditions and the
     * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) HTTP header should, if possible,
     * contain the estimated time for the recovery of the service.
     *
     * **Note:** together with this response, a user-friendly page explaining the problem should be sent.
     *
     * Caching-related headers that are sent along with this response should be taken care of, as a
     * 503 status is often a temporary condition and responses shouldn't usually be cached.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503}
     */
    ServiceUnavailable = 503,

    /**
     * ## 504 Gateway Timeout
     *
     * The HyperText Transfer Protocol (HTTP) **`504 Gateway Timeout`** server error response code
     * indicates that the server, while acting as a gateway or proxy, did not get a response in
     * time from the upstream server that it needed in order to complete the request.
     *
     * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might
     * refer to different things in networking and a 504 error is usually not something you can
     * fix, but requires a fix by the web server or the proxies you are trying to get access through.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504}
     */
    GatewayTimeout = 504,

    /**
     * ## 505 HTTP Version Not Supported
     *
     * The HyperText Transfer Protocol (HTTP) **`505 HTTP Version Not Supported`** response status
     * code indicates that the HTTP version used in the request is not supported by the server.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505}
     */
    HTTPVersionNotSupported = 505,

    /**
     * ## 506 Variant Also Negotiates
     *
     * The HyperText Transfer Protocol (HTTP) **`506 Variant Also Negotiates`** response status
     * code may be given in the context of Transparent Content Negotiation (see [RFC
     * 2295](https://datatracker.ietf.org/doc/html/rfc2295)). This protocol enables a client to
     * retrieve the best variant of a given resource, where the server supports multiple variants.
     *
     * The **`Variant Also Negotiates`** status code indicates an internal server configuration
     * error in which the chosen variant is itself configured to engage in content negotiation, so
     * is not a proper negotiation endpoint.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506}
     */
    VariantAlsoNegotiates = 506,

    /**
     * ## 507 Insufficient Storage
     *
     * The HyperText Transfer Protocol (HTTP) **`507 Insufficient Storage`** response status code
     * may be given in the context of the Web Distributed Authoring and Versioning (WebDAV)
     * protocol (see [RFC 4918](https://datatracker.ietf.org/doc/html/rfc4918)).
     *
     * It indicates that a method could not be performed because the server cannot store the
     * representation needed to successfully complete the request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507}
     */
    InsufficientStorage = 507,

    /**
     * ## 508 Loop Detected
     *
     * The HyperText Transfer Protocol (HTTP) **`508 Loop Detected`** response status code may be
     * given in the context of the Web Distributed Authoring and Versioning (WebDAV) protocol.
     *
     * It indicates that the server terminated an operation because it encountered an infinite loop
     * while processing a request with "Depth: infinity". This status indicates that the entire
     * operation failed.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508}
     */
    LoopDetected = 508,

    /**
     * ## 510 Not Extended
     *
     * The HyperText Transfer Protocol (HTTP) **`510 Not Extended`** response status code is sent
     * in the context of the HTTP Extension Framework, defined in [RFC
     * 2774](https://datatracker.ietf.org/doc/html/rfc2774).
     *
     * In that specification a client may send a request that contains an extension declaration,
     * that describes the extension to be used. If the server receives such a request, but any
     * described extensions are not supported for the request, then the server responds with the
     * 510 status code.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510}
     */
    NotExtended = 510,

    /**
     * ## 511 Network Authentication Required
     *
     * The HTTP **`511 Network Authentication Required`** response status code indicates that the
     * client needs to authenticate to gain network access.
     *
     * This status is not generated by origin servers, but by intercepting proxies that control
     * access to the network.
     *
     * Network operators sometimes require some authentication, acceptance of terms, or other user
     * interaction before granting access (for example in an internet café or at an airport). They
     * often identify clients who have not done so using their Media Access Control (MAC) addresses.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511}
     */
    NetworkAuthenticationRequired = 511,
}

/**
 * ## Hypertext Transfer Protocol (HTTP) response status codes
 *
 * HTTP response status codes indicate whether a specific HTTP request has been successfully
 * completed. Responses are grouped in five classes:
 *
 * 1. Informational responses (100–199)
 * 2. Successful responses (200–299)
 * 3. Redirects (300–399)
 * 4. Client errors (400–499)
 * 5. Server errors (500–599)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}
 */
export const status = {
    /**
     * ## 100 Continue
     *
     * The HTTP **`100 Continue`** informational status response code indicates that everything so
     * far is OK and that the client should continue with the request or ignore it if it is already
     * finished.
     *
     * To have a server check the request's headers, a client must send
     * [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect)`: 100-continue` as a header in its initial
     * request and receive a `100 Continue` status code in response before sending the body.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100}
     */
    continue: 100,

    /**
     * ## 100 Continue
     *
     * The HTTP **`100 Continue`** informational status response code indicates that everything so
     * far is OK and that the client should continue with the request or ignore it if it is already
     * finished.
     *
     * To have a server check the request's headers, a client must send
     * [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect)`: 100-continue` as a header in its initial
     * request and receive a `100 Continue` status code in response before sending the body.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100}
     */
    100: "continue",

    /**
     * ## 101 Switching Protocols
     *
     * The HTTP **`101 Switching Protocols`** response code indicates the protocol the server is
     * switching to as requested by a client which sent the message including the
     * [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) request header.
     *
     * The server includes in this response an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade)
     * response header to indicate the protocol it switched to. The process is described in detail
     * in the article [Protocol upgrade mechanism](/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101}
     */
    switchingProtocols: 101,

    /**
     * ## 101 Switching Protocols
     *
     * The HTTP **`101 Switching Protocols`** response code indicates the protocol the server is
     * switching to as requested by a client which sent the message including the
     * [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) request header.
     *
     * The server includes in this response an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade)
     * response header to indicate the protocol it switched to. The process is described in detail
     * in the article [Protocol upgrade mechanism](/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101}
     */
    101: "switchingProtocols",

    /**
     * ## Processing
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * A WebDAV request may contain many sub-requests involving file operations, requiring a long
     * time to complete the request.
     *
     * This code indicates that the server has received and is processing the request, but no
     * response is available yet.
     *
     * This prevents the client from timing out and assuming the request was lost.
     */
    processing: 102,

    /**
     * ## Processing
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * A WebDAV request may contain many sub-requests involving file operations, requiring a long
     * time to complete the request.
     *
     * This code indicates that the server has received and is processing the request, but no
     * response is available yet.
     *
     * This prevents the client from timing out and assuming the request was lost.
     */
    102: "processing",

    /**
     * ## 103 Early Hints
     *
     * This page is not complete.
     *
     * The HTTP **`103 Early Hints`** information response status code is primarily intended to be
     * used with the [`Link`](/en-US/docs/Web/HTTP/Headers/Link) header to allow the user agent to
     * start preloading resources while the server is still preparing a response.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103}
     */
    earlyHints: 103,

    /**
     * ## 103 Early Hints
     *
     * This page is not complete.
     *
     * The HTTP **`103 Early Hints`** information response status code is primarily intended to be
     * used with the [`Link`](/en-US/docs/Web/HTTP/Headers/Link) header to allow the user agent to
     * start preloading resources while the server is still preparing a response.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103}
     */
    103: "earlyHints",

    /**
     * ## 200 OK
     *
     * The HTTP **`200 OK`** success status response code indicates that the request has succeeded.
     * A 200 response is cacheable by default.
     *
     * The meaning of a success depends on the HTTP request method:
     *
     * The successful result of a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or a
     * [`DELETE`](/en-US/docs/Web/HTTP/Methods/DELETE) is often not a `200` `OK` but a
     * [`204`](/en-US/docs/Web/HTTP/Status/204) `No Content` (or a
     * [`201`](/en-US/docs/Web/HTTP/Status/201) `Created` when the resource is uploaded for the first time).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200}
     */
    ok: 200,

    /**
     * ## 200 OK
     *
     * The HTTP **`200 OK`** success status response code indicates that the request has succeeded.
     * A 200 response is cacheable by default.
     *
     * The meaning of a success depends on the HTTP request method:
     *
     * The successful result of a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or a
     * [`DELETE`](/en-US/docs/Web/HTTP/Methods/DELETE) is often not a `200` `OK` but a
     * [`204`](/en-US/docs/Web/HTTP/Status/204) `No Content` (or a
     * [`201`](/en-US/docs/Web/HTTP/Status/201) `Created` when the resource is uploaded for the first time).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200}
     */
    200: "ok",

    /**
     * ## 201 Created
     *
     * The HTTP **`201 Created`** success status response code indicates that the request has
     * succeeded and has led to the creation of a resource. The new resource is effectively created
     * before this response is sent back and the new resource is returned in the body of the
     * message, its location being either the URL of the request, or the content of the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
     *
     * The common use case of this status code is as the result of a
     * [`POST`](/en-US/docs/Web/HTTP/Methods/POST) request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201}
     */
    created: 201,

    /**
     * ## 201 Created
     *
     * The HTTP **`201 Created`** success status response code indicates that the request has
     * succeeded and has led to the creation of a resource. The new resource is effectively created
     * before this response is sent back and the new resource is returned in the body of the
     * message, its location being either the URL of the request, or the content of the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
     *
     * The common use case of this status code is as the result of a
     * [`POST`](/en-US/docs/Web/HTTP/Methods/POST) request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201}
     */
    201: "created",

    /**
     * ## 202 Accepted
     *
     * The HyperText Transfer Protocol (HTTP) **`202 Accepted`** response status code indicates
     * that the request has been accepted for processing, but the processing has not been
     * completed; in fact, processing may not have started yet. The request might or might not
     * eventually be acted upon, as it might be disallowed when processing actually takes place.
     *
     * 202 is non-committal, meaning that there is no way for the HTTP to later send an
     * asynchronous response indicating the outcome of processing the request. It is intended for
     * cases where another process or server handles the request, or for batch processing.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202}
     */
    accepted: 202,

    /**
     * ## 202 Accepted
     *
     * The HyperText Transfer Protocol (HTTP) **`202 Accepted`** response status code indicates
     * that the request has been accepted for processing, but the processing has not been
     * completed; in fact, processing may not have started yet. The request might or might not
     * eventually be acted upon, as it might be disallowed when processing actually takes place.
     *
     * 202 is non-committal, meaning that there is no way for the HTTP to later send an
     * asynchronous response indicating the outcome of processing the request. It is intended for
     * cases where another process or server handles the request, or for batch processing.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202}
     */
    202: "accepted",

    /**
     * ## 203 Non-Authoritative Information
     *
     * The HTTP **`203 Non-Authoritative Information`** response status indicates that the request
     * was successful but the enclosed payload has been modified by a transforming
     * [proxy](/en-US/docs/Glossary/Proxy_server) from that of the origin server's
     * [`200`](/en-US/docs/Web/HTTP/Status/200) (`OK`) response .
     *
     * The `203` response is similar to the value
     * [`214`](/en-US/docs/Web/HTTP/Headers/Warning#warning_codes), meaning `Transformation
     * Applied`, of the [`Warning`](/en-US/docs/Web/HTTP/Headers/Warning) header code, which has
     * the additional advantage of being applicable to responses with any status code.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203}
     */
    nonAuthoritativeInformation: 203,

    /**
     * ## 203 Non-Authoritative Information
     *
     * The HTTP **`203 Non-Authoritative Information`** response status indicates that the request
     * was successful but the enclosed payload has been modified by a transforming
     * [proxy](/en-US/docs/Glossary/Proxy_server) from that of the origin server's
     * [`200`](/en-US/docs/Web/HTTP/Status/200) (`OK`) response .
     *
     * The `203` response is similar to the value
     * [`214`](/en-US/docs/Web/HTTP/Headers/Warning#warning_codes), meaning `Transformation
     * Applied`, of the [`Warning`](/en-US/docs/Web/HTTP/Headers/Warning) header code, which has
     * the additional advantage of being applicable to responses with any status code.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203}
     */
    203: "nonAuthoritativeInformation",

    /**
     * ## 204 No Content
     *
     * The HTTP **`204 No Content`** success status response code indicates that a request has
     * succeeded, but that the client doesn't need to navigate away from its current page.
     *
     * This might be used, for example, when implementing "save and continue editing" functionality
     * for a wiki site. In this case a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request would be
     * used to save the page, and the `204 No Content` response would be sent to indicate that the
     * editor should not be replaced by some other page.
     *
     * A 204 response is cacheable by default (an [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag)
     * header is included in such a response).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204}
     */
    noContent: 204,

    /**
     * ## 204 No Content
     *
     * The HTTP **`204 No Content`** success status response code indicates that a request has
     * succeeded, but that the client doesn't need to navigate away from its current page.
     *
     * This might be used, for example, when implementing "save and continue editing" functionality
     * for a wiki site. In this case a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request would be
     * used to save the page, and the `204 No Content` response would be sent to indicate that the
     * editor should not be replaced by some other page.
     *
     * A 204 response is cacheable by default (an [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag)
     * header is included in such a response).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204}
     */
    204: "noContent",

    /**
     * ## 205 Reset Content
     *
     * The HTTP **`205 Reset Content`** response status tells the client to reset the document
     * view, so for example to clear the content of a form, reset a canvas state, or to refresh the UI.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205}
     */
    resetContent: 205,

    /**
     * ## 205 Reset Content
     *
     * The HTTP **`205 Reset Content`** response status tells the client to reset the document
     * view, so for example to clear the content of a form, reset a canvas state, or to refresh the UI.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205}
     */
    205: "resetContent",

    /**
     * ## 206 Partial Content
     *
     * The HTTP **`206 Partial Content`** success status response code indicates that the request
     * has succeeded and the body contains the requested ranges of data, as described in the
     * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header of the request.
     *
     * If there is only one range, the [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type)
     * of the whole response is set to the type of the document, and a
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) is provided.
     *
     * If several ranges are sent back, the
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) is set to `multipart/byteranges`
     * and each fragment covers one range, with
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) and
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) describing it.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206}
     */
    partialContent: 206,

    /**
     * ## 206 Partial Content
     *
     * The HTTP **`206 Partial Content`** success status response code indicates that the request
     * has succeeded and the body contains the requested ranges of data, as described in the
     * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header of the request.
     *
     * If there is only one range, the [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type)
     * of the whole response is set to the type of the document, and a
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) is provided.
     *
     * If several ranges are sent back, the
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) is set to `multipart/byteranges`
     * and each fragment covers one range, with
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) and
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) describing it.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206}
     */
    206: "partialContent",

    /**
     * ## Multi-Status
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The message body that follows is an XML message and can contain a number of separate
     * response codes, depending on how many sub-requests were made.
     */
    multiStatus: 207,

    /**
     * ## Multi-Status
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The message body that follows is an XML message and can contain a number of separate
     * response codes, depending on how many sub-requests were made.
     */
    207: "multiStatus",

    /**
     * ## Already Reported
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The members of a DAV binding have already been enumerated in a preceding part of the
     * (multistatus) response, and are not being included again.
     */
    alreadyReported: 208,

    /**
     * ## Already Reported
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The members of a DAV binding have already been enumerated in a preceding part of the
     * (multistatus) response, and are not being included again.
     */
    208: "alreadyReported",

    /**
     * ## IM Used
     *
     * **[HTTP Delta encoding](https://datatracker.ietf.org/doc/html/rfc3229)**
     *
     * The server has fulfilled a `GET` request for the resource, and the response is a
     * representation of the result of one or more instance-manipulations applied to the current instance.
     */
    imUsed: 226,

    /**
     * ## IM Used
     *
     * **[HTTP Delta encoding](https://datatracker.ietf.org/doc/html/rfc3229)**
     *
     * The server has fulfilled a `GET` request for the resource, and the response is a
     * representation of the result of one or more instance-manipulations applied to the current instance.
     */
    226: "imUsed",

    /**
     * ## 300 Multiple Choices
     *
     * The HTTP **`300 Multiple Choices`** redirect status response code indicates that the request
     * has more than one possible responses. The user-agent or the user should choose one of them.
     * As there is no standardized way of choosing one of the responses, this response code is very
     * rarely used.
     *
     * If the server has a preferred choice, it should generate a
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300}
     */
    multipleChoices: 300,

    /**
     * ## 300 Multiple Choices
     *
     * The HTTP **`300 Multiple Choices`** redirect status response code indicates that the request
     * has more than one possible responses. The user-agent or the user should choose one of them.
     * As there is no standardized way of choosing one of the responses, this response code is very
     * rarely used.
     *
     * If the server has a preferred choice, it should generate a
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300}
     */
    300: "multipleChoices",

    /**
     * ## 301 Moved Permanently
     *
     * The HyperText Transfer Protocol (HTTP) **`301 Moved Permanently`** redirect status response
     * code indicates that the resource requested has been definitively moved to the URL given by
     * the [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this
     * page and search engines update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is sent to the new URL).
     *
     * Even if the specification requires the method (and the body) not to be altered when the
     * redirection is performed, not all user-agents align with it - you can still find this type
     * of bugged software out there. It is therefore recommended to use the `301` code only as a
     * response for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) methods and to use the [`308 Permanent
     * Redirect`](/en-US/docs/Web/HTTP/Status/308) for [`POST`](/en-US/docs/Web/HTTP/Methods/POST)
     * methods instead, as the method change is explicitly prohibited with this status.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301}
     */
    movedPermanently: 301,

    /**
     * ## 301 Moved Permanently
     *
     * The HyperText Transfer Protocol (HTTP) **`301 Moved Permanently`** redirect status response
     * code indicates that the resource requested has been definitively moved to the URL given by
     * the [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this
     * page and search engines update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is sent to the new URL).
     *
     * Even if the specification requires the method (and the body) not to be altered when the
     * redirection is performed, not all user-agents align with it - you can still find this type
     * of bugged software out there. It is therefore recommended to use the `301` code only as a
     * response for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) methods and to use the [`308 Permanent
     * Redirect`](/en-US/docs/Web/HTTP/Status/308) for [`POST`](/en-US/docs/Web/HTTP/Methods/POST)
     * methods instead, as the method change is explicitly prohibited with this status.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301}
     */
    301: "movedPermanently",

    /**
     * ## 302 Found
     *
     * The HyperText Transfer Protocol (HTTP) **`302 Found`** redirect status response code
     * indicates that the resource requested has been temporarily moved to the URL given by the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header. A browser redirects to this page
     * but search engines don't update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is not sent to the new URL).
     *
     * Even if the specification requires the method (and the body) not to be altered when the
     * redirection is performed, not all user-agents conform here - you can still find this type of
     * bugged software out there. It is therefore recommended to set the `302` code only as a
     * response for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) methods and to use [`307 Temporary
     * Redirect`](/en-US/docs/Web/HTTP/Status/307) instead, as the method change is explicitly
     * prohibited in that case.
     *
     * In the cases where you want the method used to be changed to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
     * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give a
     * response to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded
     * resource but a confirmation message such as: 'you successfully uploaded XYZ'.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302}
     */
    found: 302,

    /**
     * ## 302 Found
     *
     * The HyperText Transfer Protocol (HTTP) **`302 Found`** redirect status response code
     * indicates that the resource requested has been temporarily moved to the URL given by the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header. A browser redirects to this page
     * but search engines don't update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is not sent to the new URL).
     *
     * Even if the specification requires the method (and the body) not to be altered when the
     * redirection is performed, not all user-agents conform here - you can still find this type of
     * bugged software out there. It is therefore recommended to set the `302` code only as a
     * response for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) methods and to use [`307 Temporary
     * Redirect`](/en-US/docs/Web/HTTP/Status/307) instead, as the method change is explicitly
     * prohibited in that case.
     *
     * In the cases where you want the method used to be changed to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
     * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give a
     * response to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded
     * resource but a confirmation message such as: 'you successfully uploaded XYZ'.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302}
     */
    302: "found",

    /**
     * ## 303 See Other
     *
     * The HyperText Transfer Protocol (HTTP) **`303 See Other`** redirect status response code
     * indicates that the redirects don't link to the newly uploaded resources, but to another page
     * (such as a confirmation page or an upload progress page). This response code is usually sent
     * back as a result of [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or
     * [`POST`](/en-US/docs/Web/HTTP/Methods/POST). The method used to display this redirected page
     * is always [`GET`](/en-US/docs/Web/HTTP/Methods/GET).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303}
     */
    seeOther: 303,

    /**
     * ## 303 See Other
     *
     * The HyperText Transfer Protocol (HTTP) **`303 See Other`** redirect status response code
     * indicates that the redirects don't link to the newly uploaded resources, but to another page
     * (such as a confirmation page or an upload progress page). This response code is usually sent
     * back as a result of [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or
     * [`POST`](/en-US/docs/Web/HTTP/Methods/POST). The method used to display this redirected page
     * is always [`GET`](/en-US/docs/Web/HTTP/Methods/GET).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303}
     */
    303: "seeOther",

    /**
     * ## 304 Not Modified
     *
     * The HTTP **`304 Not Modified`** client redirection response code indicates that there is no
     * need to retransmit the requested resources. It is an implicit redirection to a cached
     * resource. This happens when the request method is [safe](/en-US/docs/Glossary/Safe/HTTP),
     * like a [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or a
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) request, or when the request is conditional and
     * uses a [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) or a
     * [`If-Modified-Since`](/en-US/docs/Web/HTTP/Headers/If-Modified-Since) header.
     *
     * The equivalent [`200`](/en-US/docs/Web/HTTP/Status/200) `OK` response would have included
     * the headers [`Cache-Control`](/en-US/docs/Web/HTTP/Headers/Cache-Control),
     * [`Content-Location`](/en-US/docs/Web/HTTP/Headers/Content-Location),
     * [`Date`](/en-US/docs/Web/HTTP/Headers/Date), [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag),
     * [`Expires`](/en-US/docs/Web/HTTP/Headers/Expires), and [`Vary`](/en-US/docs/Web/HTTP/Headers/Vary).
     *
     * **Note:** Many [developer tools' network panels](/en-US/docs/Tools/Network_Monitor) of
     * browsers create extraneous requests leading to `304` responses, so that access to the local
     * cache is visible to developers.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304}
     */
    notModified: 304,

    /**
     * ## 304 Not Modified
     *
     * The HTTP **`304 Not Modified`** client redirection response code indicates that there is no
     * need to retransmit the requested resources. It is an implicit redirection to a cached
     * resource. This happens when the request method is [safe](/en-US/docs/Glossary/Safe/HTTP),
     * like a [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or a
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) request, or when the request is conditional and
     * uses a [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) or a
     * [`If-Modified-Since`](/en-US/docs/Web/HTTP/Headers/If-Modified-Since) header.
     *
     * The equivalent [`200`](/en-US/docs/Web/HTTP/Status/200) `OK` response would have included
     * the headers [`Cache-Control`](/en-US/docs/Web/HTTP/Headers/Cache-Control),
     * [`Content-Location`](/en-US/docs/Web/HTTP/Headers/Content-Location),
     * [`Date`](/en-US/docs/Web/HTTP/Headers/Date), [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag),
     * [`Expires`](/en-US/docs/Web/HTTP/Headers/Expires), and [`Vary`](/en-US/docs/Web/HTTP/Headers/Vary).
     *
     * **Note:** Many [developer tools' network panels](/en-US/docs/Tools/Network_Monitor) of
     * browsers create extraneous requests leading to `304` responses, so that access to the local
     * cache is visible to developers.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304}
     */
    304: "notModified",

    /**
     * ## Use Proxy
     *
     * The requested resource is available only through a proxy, the address for which is provided
     * in the response.
     *
     * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses
     * with this status code, primarily for security reasons.
     *
     * @deprecated Due to security concerns regarding in-band configuration of a proxy
     * @since HTTP/1.1
     */
    useProxy: 305,

    /**
     * ## Use Proxy
     *
     * The requested resource is available only through a proxy, the address for which is provided
     * in the response.
     *
     * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses
     * with this status code, primarily for security reasons.
     *
     * @deprecated Due to security concerns regarding in-band configuration of a proxy
     * @since HTTP/1.1
     */
    305: "useProxy",

    /**
     * ## Switch Proxy
     *
     * Originally meant "Subsequent requests should use the specified proxy".
     *
     * @deprecated No longer used
     * @since HTTP/1.1
     */
    switchProxy: 306,

    /**
     * ## Switch Proxy
     *
     * Originally meant "Subsequent requests should use the specified proxy".
     *
     * @deprecated No longer used
     * @since HTTP/1.1
     */
    306: "switchProxy",

    /**
     * ## 307 Temporary Redirect
     *
     * [HTTP](/en-US/docs/Glossary/HTTP) **`307 Temporary Redirect`** redirect status response code
     * indicates that the resource requested has been temporarily moved to the URL given by the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers.
     *
     * The method and the body of the original request are reused to perform the redirected
     * request. In the cases where you want the method used to be changed to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
     * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give an
     * answer to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded
     * resources, but a confirmation message (like "You successfully uploaded XYZ").
     *
     * The only difference between `307` and [`302`](/en-US/docs/Web/HTTP/Status/302) is that `307`
     * guarantees that the method and the body will not be changed when the redirected request is
     * made. With `302`, some old clients were incorrectly changing the method to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET): the behavior with non-`GET` methods and `302` is
     * then unpredictable on the Web, whereas the behavior with `307` is predictable. For `GET`
     * requests, their behavior is identical.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307}
     */
    temporaryRedirect: 307,

    /**
     * ## 307 Temporary Redirect
     *
     * [HTTP](/en-US/docs/Glossary/HTTP) **`307 Temporary Redirect`** redirect status response code
     * indicates that the resource requested has been temporarily moved to the URL given by the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers.
     *
     * The method and the body of the original request are reused to perform the redirected
     * request. In the cases where you want the method used to be changed to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
     * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give an
     * answer to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded
     * resources, but a confirmation message (like "You successfully uploaded XYZ").
     *
     * The only difference between `307` and [`302`](/en-US/docs/Web/HTTP/Status/302) is that `307`
     * guarantees that the method and the body will not be changed when the redirected request is
     * made. With `302`, some old clients were incorrectly changing the method to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET): the behavior with non-`GET` methods and `302` is
     * then unpredictable on the Web, whereas the behavior with `307` is predictable. For `GET`
     * requests, their behavior is identical.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307}
     */
    307: "temporaryRedirect",

    /**
     * ## 308 Permanent Redirect
     *
     * The HyperText Transfer Protocol (HTTP) **`308 Permanent Redirect`** redirect status response
     * code indicates that the resource requested has been definitively moved to the URL given by
     * the [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this
     * page and search engines update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is sent to the new URL).
     *
     * The request method and the body will not be altered, whereas
     * [`301`](/en-US/docs/Web/HTTP/Status/301) may incorrectly sometimes be changed to a
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) method.
     *
     * **Note:** Some Web applications may use the `308 Permanent Redirect` in a non-standard way
     * and for other purposes. For example, Google Drive uses a `308 Resume Incomplete` response to
     * indicate to the client when an incomplete upload stalled. (See [Perform a resumable
     * download](https://developers.google.com/drive/v3/web/manage-uploads#resumable) on Google
     * Drive documentation.)
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308}
     */
    permanentRedirect: 308,

    /**
     * ## 308 Permanent Redirect
     *
     * The HyperText Transfer Protocol (HTTP) **`308 Permanent Redirect`** redirect status response
     * code indicates that the resource requested has been definitively moved to the URL given by
     * the [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this
     * page and search engines update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is sent to the new URL).
     *
     * The request method and the body will not be altered, whereas
     * [`301`](/en-US/docs/Web/HTTP/Status/301) may incorrectly sometimes be changed to a
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) method.
     *
     * **Note:** Some Web applications may use the `308 Permanent Redirect` in a non-standard way
     * and for other purposes. For example, Google Drive uses a `308 Resume Incomplete` response to
     * indicate to the client when an incomplete upload stalled. (See [Perform a resumable
     * download](https://developers.google.com/drive/v3/web/manage-uploads#resumable) on Google
     * Drive documentation.)
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308}
     */
    308: "permanentRedirect",

    /**
     * ## 400 Bad Request
     *
     * The HyperText Transfer Protocol (HTTP) **`400 Bad Request`** response status code indicates
     * that the server cannot or will not process the request due to something that is perceived to
     * be a client error (e.g., malformed request syntax, invalid request message framing, or
     * deceptive request routing).
     *
     * **Warning:** The client should not repeat this request without modification.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400}
     */
    badRequest: 400,

    /**
     * ## 400 Bad Request
     *
     * The HyperText Transfer Protocol (HTTP) **`400 Bad Request`** response status code indicates
     * that the server cannot or will not process the request due to something that is perceived to
     * be a client error (e.g., malformed request syntax, invalid request message framing, or
     * deceptive request routing).
     *
     * **Warning:** The client should not repeat this request without modification.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400}
     */
    400: "badRequest",

    /**
     * ## 401 Unauthorized
     *
     * The HTTP **`401 Unauthorized`** client error status response code indicates that the request
     * has not been applied because it lacks valid authentication credentials for the target resource.
     *
     * This status is sent with a
     * [`WWW-Authenticate`](/en-US/docs/Web/HTTP/Headers/WWW-Authenticate) header that contains
     * information on how to authorize correctly.
     *
     * This status is similar to [`403`](/en-US/docs/Web/HTTP/Status/403), but in this case,
     * authentication is possible.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401}
     */
    unauthorized: 401,

    /**
     * ## 401 Unauthorized
     *
     * The HTTP **`401 Unauthorized`** client error status response code indicates that the request
     * has not been applied because it lacks valid authentication credentials for the target resource.
     *
     * This status is sent with a
     * [`WWW-Authenticate`](/en-US/docs/Web/HTTP/Headers/WWW-Authenticate) header that contains
     * information on how to authorize correctly.
     *
     * This status is similar to [`403`](/en-US/docs/Web/HTTP/Status/403), but in this case,
     * authentication is possible.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401}
     */
    401: "unauthorized",

    /**
     * ## 402 Payment Required
     *
     * **This is an [experimental
     * technology](/en-US/docs/MDN/Guidelines/Conventions_definitions#experimental)** Check the
     * [Browser compatibility table](#browser_compatibility) carefully before using this in production.
     *
     * The HTTP **`402 Payment Required`** is a nonstandard client error status response code that
     * is reserved for future use.
     *
     * Sometimes, this code indicates that the request can not be processed until the client makes
     * a payment. Originally it was created to enable digital cash or (micro) payment systems and
     * would indicate that the requested content is not available until the client makes a payment.
     * However, no standard use convention exists and different entities use it in different contexts.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402}
     */
    paymentRequired: 402,

    /**
     * ## 402 Payment Required
     *
     * **This is an [experimental
     * technology](/en-US/docs/MDN/Guidelines/Conventions_definitions#experimental)** Check the
     * [Browser compatibility table](#browser_compatibility) carefully before using this in production.
     *
     * The HTTP **`402 Payment Required`** is a nonstandard client error status response code that
     * is reserved for future use.
     *
     * Sometimes, this code indicates that the request can not be processed until the client makes
     * a payment. Originally it was created to enable digital cash or (micro) payment systems and
     * would indicate that the requested content is not available until the client makes a payment.
     * However, no standard use convention exists and different entities use it in different contexts.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402}
     */
    402: "paymentRequired",

    /**
     * ## 403 Forbidden
     *
     * The HTTP **`403 Forbidden`** client error status response code indicates that the server
     * understood the request but refuses to authorize it.
     *
     * This status is similar to [`401`](/en-US/docs/Web/HTTP/Status/401), but in this case,
     * re-authenticating will make no difference. The access is permanently forbidden and tied to
     * the application logic, such as insufficient rights to a resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403}
     */
    forbidden: 403,

    /**
     * ## 403 Forbidden
     *
     * The HTTP **`403 Forbidden`** client error status response code indicates that the server
     * understood the request but refuses to authorize it.
     *
     * This status is similar to [`401`](/en-US/docs/Web/HTTP/Status/401), but in this case,
     * re-authenticating will make no difference. The access is permanently forbidden and tied to
     * the application logic, such as insufficient rights to a resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403}
     */
    403: "forbidden",

    /**
     * ## 404 Not Found
     *
     * The HTTP **`404 Not Found`** client error response code indicates that the server can't find
     * the requested resource. Links that lead to a 404 page are often called broken or dead links
     * and can be subject to [link rot](https://en.wikipedia.org/wiki/Link_rot).
     *
     * A 404 status code does not indicate whether the resource is temporarily or permanently
     * missing. But if a resource is permanently removed, a
     * [`410`](/en-US/docs/Web/HTTP/Status/410) (Gone) should be used instead of a 404 status.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404}
     */
    notFound: 404,

    /**
     * ## 404 Not Found
     *
     * The HTTP **`404 Not Found`** client error response code indicates that the server can't find
     * the requested resource. Links that lead to a 404 page are often called broken or dead links
     * and can be subject to [link rot](https://en.wikipedia.org/wiki/Link_rot).
     *
     * A 404 status code does not indicate whether the resource is temporarily or permanently
     * missing. But if a resource is permanently removed, a
     * [`410`](/en-US/docs/Web/HTTP/Status/410) (Gone) should be used instead of a 404 status.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404}
     */
    404: "notFound",

    /**
     * ## 405 Method Not Allowed
     *
     * The HyperText Transfer Protocol (HTTP) **`405 Method Not Allowed`** response status code
     * indicates that the request method is known by the server but is not supported by the target resource.
     *
     * The server **must** generate an **`Allow`** header field in a 405 response containing a list
     * of the target resource's currently supported methods.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405}
     */
    methodNotAllowed: 405,

    /**
     * ## 405 Method Not Allowed
     *
     * The HyperText Transfer Protocol (HTTP) **`405 Method Not Allowed`** response status code
     * indicates that the request method is known by the server but is not supported by the target resource.
     *
     * The server **must** generate an **`Allow`** header field in a 405 response containing a list
     * of the target resource's currently supported methods.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405}
     */
    405: "methodNotAllowed",

    /**
     * ## 406 Not Acceptable
     *
     * The HyperText Transfer Protocol (HTTP) **`406 Not Acceptable`** client error response code
     * indicates that the server cannot produce a response matching the list of acceptable values
     * defined in the request's proactive [content
     * negotiation](/en-US/docs/Web/HTTP/Content_negotiation) headers, and that the server is
     * unwilling to supply a default representation.
     *
     * Proactive content negotiation headers include:
     *
     * In practice, this error is very rarely used. Instead of responding using this error code,
     * which would be cryptic for the end user and difficult to fix, servers ignore the relevant
     * header and serve an actual page to the user. It is assumed that even if the user won't be
     * completely happy, they will prefer this to an error code.
     *
     * If a server returns such an error status, the body of the message should contain the list of
     * the available representations of the resources, allowing the user to choose among them.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406}
     */
    notAcceptable: 406,

    /**
     * ## 406 Not Acceptable
     *
     * The HyperText Transfer Protocol (HTTP) **`406 Not Acceptable`** client error response code
     * indicates that the server cannot produce a response matching the list of acceptable values
     * defined in the request's proactive [content
     * negotiation](/en-US/docs/Web/HTTP/Content_negotiation) headers, and that the server is
     * unwilling to supply a default representation.
     *
     * Proactive content negotiation headers include:
     *
     * In practice, this error is very rarely used. Instead of responding using this error code,
     * which would be cryptic for the end user and difficult to fix, servers ignore the relevant
     * header and serve an actual page to the user. It is assumed that even if the user won't be
     * completely happy, they will prefer this to an error code.
     *
     * If a server returns such an error status, the body of the message should contain the list of
     * the available representations of the resources, allowing the user to choose among them.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406}
     */
    406: "notAcceptable",

    /**
     * ## 407 Proxy Authentication Required
     *
     * The HTTP **`407 Proxy Authentication Required`** client error status response code indicates
     * that the request has not been applied because it lacks valid authentication credentials for
     * a [proxy server](/en-US/docs/Glossary/Proxy_server) that is between the browser and the
     * server that can access the requested resource.
     *
     * This status is sent with a
     * [`Proxy-Authenticate`](/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate) header that contains
     * information on how to authorize correctly.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407}
     */
    proxyAuthenticationRequired: 407,

    /**
     * ## 407 Proxy Authentication Required
     *
     * The HTTP **`407 Proxy Authentication Required`** client error status response code indicates
     * that the request has not been applied because it lacks valid authentication credentials for
     * a [proxy server](/en-US/docs/Glossary/Proxy_server) that is between the browser and the
     * server that can access the requested resource.
     *
     * This status is sent with a
     * [`Proxy-Authenticate`](/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate) header that contains
     * information on how to authorize correctly.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407}
     */
    407: "proxyAuthenticationRequired",

    /**
     * ## 408 Request Timeout
     *
     * The HyperText Transfer Protocol (HTTP) **`408 Request Timeout`** response status code means
     * that the server would like to shut down this unused connection. It is sent on an idle
     * connection by some servers, *even without any previous request by the client*.
     *
     * A server should send the "close" [`Connection`](/en-US/docs/Web/HTTP/Headers/Connection)
     * header field in the response, since `408` implies that the server has decided to close the
     * connection rather than continue waiting.
     *
     * This response is used much more since some browsers, like Chrome, Firefox 27+, and IE9, use
     * HTTP pre-connection mechanisms to speed up surfing.
     *
     * **Note:** some servers merely shut down the connection without sending this message.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408}
     */
    requestTimeout: 408,

    /**
     * ## 408 Request Timeout
     *
     * The HyperText Transfer Protocol (HTTP) **`408 Request Timeout`** response status code means
     * that the server would like to shut down this unused connection. It is sent on an idle
     * connection by some servers, *even without any previous request by the client*.
     *
     * A server should send the "close" [`Connection`](/en-US/docs/Web/HTTP/Headers/Connection)
     * header field in the response, since `408` implies that the server has decided to close the
     * connection rather than continue waiting.
     *
     * This response is used much more since some browsers, like Chrome, Firefox 27+, and IE9, use
     * HTTP pre-connection mechanisms to speed up surfing.
     *
     * **Note:** some servers merely shut down the connection without sending this message.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408}
     */
    408: "requestTimeout",

    /**
     * ## 409 Conflict
     *
     * The HTTP **`409 Conflict`** response status code indicates a request conflict with current
     * state of the target resource.
     *
     * Conflicts are most likely to occur in response to a
     * [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request. For example, you may get a 409 response
     * when uploading a file which is older than the one already on the server resulting in a
     * version control conflict.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409}
     */
    conflict: 409,

    /**
     * ## 409 Conflict
     *
     * The HTTP **`409 Conflict`** response status code indicates a request conflict with current
     * state of the target resource.
     *
     * Conflicts are most likely to occur in response to a
     * [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request. For example, you may get a 409 response
     * when uploading a file which is older than the one already on the server resulting in a
     * version control conflict.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409}
     */
    409: "conflict",

    /**
     * ## 410 Gone
     *
     * The HyperText Transfer Protocol (HTTP) **`410 Gone`** client error response code indicates
     * that access to the target resource is no longer available at the origin server and that this
     * condition is likely to be permanent.
     *
     * If you don't know whether this condition is temporary or permanent, a
     * [`404`](/en-US/docs/Web/HTTP/Status/404) status code should be used instead.
     *
     * **Note:** A 410 response is cacheable by default.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410}
     */
    gone: 410,

    /**
     * ## 410 Gone
     *
     * The HyperText Transfer Protocol (HTTP) **`410 Gone`** client error response code indicates
     * that access to the target resource is no longer available at the origin server and that this
     * condition is likely to be permanent.
     *
     * If you don't know whether this condition is temporary or permanent, a
     * [`404`](/en-US/docs/Web/HTTP/Status/404) status code should be used instead.
     *
     * **Note:** A 410 response is cacheable by default.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410}
     */
    410: "gone",

    /**
     * ## 411 Length Required
     *
     * The HyperText Transfer Protocol (HTTP) **`411 Length Required`** client error response code
     * indicates that the server refuses to accept the request without a defined
     * [`Content-Length`](/en-US/docs/Web/HTTP/Headers/Content-Length) header.
     *
     * **Note:** by specification, when sending data in a series of chunks, the `Content-Length`
     * header is omitted and at the beginning of each chunk you need to add the length of the
     * current chunk in hexadecimal format. See
     * [`Transfer-Encoding`](/en-US/docs/Web/HTTP/Headers/Transfer-Encoding) for more details.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411}
     */
    lengthRequired: 411,

    /**
     * ## 411 Length Required
     *
     * The HyperText Transfer Protocol (HTTP) **`411 Length Required`** client error response code
     * indicates that the server refuses to accept the request without a defined
     * [`Content-Length`](/en-US/docs/Web/HTTP/Headers/Content-Length) header.
     *
     * **Note:** by specification, when sending data in a series of chunks, the `Content-Length`
     * header is omitted and at the beginning of each chunk you need to add the length of the
     * current chunk in hexadecimal format. See
     * [`Transfer-Encoding`](/en-US/docs/Web/HTTP/Headers/Transfer-Encoding) for more details.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411}
     */
    411: "lengthRequired",

    /**
     * ## 412 Precondition Failed
     *
     * The HyperText Transfer Protocol (HTTP) **`412 Precondition Failed`** client error response
     * code indicates that access to the target resource has been denied. This happens with
     * conditional requests on methods other than [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) when the condition defined by the
     * [`If-Unmodified-Since`](/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since) or
     * [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) headers is not fulfilled. In
     * that case, the request, usually an upload or a modification of a resource, cannot be made
     * and this error response is sent back.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412}
     */
    preconditionFailed: 412,

    /**
     * ## 412 Precondition Failed
     *
     * The HyperText Transfer Protocol (HTTP) **`412 Precondition Failed`** client error response
     * code indicates that access to the target resource has been denied. This happens with
     * conditional requests on methods other than [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) when the condition defined by the
     * [`If-Unmodified-Since`](/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since) or
     * [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) headers is not fulfilled. In
     * that case, the request, usually an upload or a modification of a resource, cannot be made
     * and this error response is sent back.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412}
     */
    412: "preconditionFailed",

    /**
     * ## 413 Payload Too Large
     *
     * The HTTP **`413 Payload Too Large`** response status code indicates that the request entity
     * is larger than limits defined by server; the server might close the connection or return a
     * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header field.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413}
     */
    payloadTooLarge: 413,

    /**
     * ## 413 Payload Too Large
     *
     * The HTTP **`413 Payload Too Large`** response status code indicates that the request entity
     * is larger than limits defined by server; the server might close the connection or return a
     * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header field.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413}
     */
    413: "payloadTooLarge",

    /**
     * ## 414 URI Too Long
     *
     * The HTTP **`414 URI Too Long`** response status code indicates that the URI requested by the
     * client is longer than the server is willing to interpret.
     *
     * There are a few rare conditions when this might occur:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414}
     */
    uriTooLong: 414,

    /**
     * ## 414 URI Too Long
     *
     * The HTTP **`414 URI Too Long`** response status code indicates that the URI requested by the
     * client is longer than the server is willing to interpret.
     *
     * There are a few rare conditions when this might occur:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414}
     */
    414: "uriTooLong",

    /**
     * ## 415 Unsupported Media Type
     *
     * The HTTP **`415 Unsupported Media Type`** client error response code indicates that the
     * server refuses to accept the request because the payload format is in an unsupported format.
     *
     * The format problem might be due to the request's indicated
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) or
     * [`Content-Encoding`](/en-US/docs/Web/HTTP/Headers/Content-Encoding), or as a result of
     * inspecting the data directly.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415}
     */
    unsupportedMediaType: 415,

    /**
     * ## 415 Unsupported Media Type
     *
     * The HTTP **`415 Unsupported Media Type`** client error response code indicates that the
     * server refuses to accept the request because the payload format is in an unsupported format.
     *
     * The format problem might be due to the request's indicated
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) or
     * [`Content-Encoding`](/en-US/docs/Web/HTTP/Headers/Content-Encoding), or as a result of
     * inspecting the data directly.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415}
     */
    415: "unsupportedMediaType",

    /**
     * ## 416 Range Not Satisfiable
     *
     * The HyperText Transfer Protocol (HTTP) **`416 Range Not Satisfiable`** error response code
     * indicates that a server cannot serve the requested ranges. The most likely reason is that
     * the document doesn't contain such ranges, or that the
     * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header value, though syntactically correct,
     * doesn't make sense.
     *
     * The `416` response message contains a
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) indicating an unsatisfied
     * range (that is a `'*'`) followed by a `'/'` and the current length of the resource. E.g.
     * `Content-Range: bytes *​/12777`
     *
     * Faced with this error, browsers usually either abort the operation (for example, a download
     * will be considered as non-resumable) or ask for the whole document again.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416}
     */
    rangeNotSatisfiable: 416,

    /**
     * ## 416 Range Not Satisfiable
     *
     * The HyperText Transfer Protocol (HTTP) **`416 Range Not Satisfiable`** error response code
     * indicates that a server cannot serve the requested ranges. The most likely reason is that
     * the document doesn't contain such ranges, or that the
     * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header value, though syntactically correct,
     * doesn't make sense.
     *
     * The `416` response message contains a
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) indicating an unsatisfied
     * range (that is a `'*'`) followed by a `'/'` and the current length of the resource. E.g.
     * `Content-Range: bytes *​/12777`
     *
     * Faced with this error, browsers usually either abort the operation (for example, a download
     * will be considered as non-resumable) or ask for the whole document again.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416}
     */
    416: "rangeNotSatisfiable",

    /**
     * ## 417 Expectation Failed
     *
     * The HTTP **`417 Expectation Failed`** client error response code indicates that the
     * expectation given in the request's [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header
     * could not be met.
     *
     * See the [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header for more details.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417}
     */
    expectationFailed: 417,

    /**
     * ## 417 Expectation Failed
     *
     * The HTTP **`417 Expectation Failed`** client error response code indicates that the
     * expectation given in the request's [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header
     * could not be met.
     *
     * See the [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header for more details.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417}
     */
    417: "expectationFailed",

    /**
     * ## 418 I'm a teapot
     *
     * The HTTP **`418 I'm a teapot`** client error response code indicates that the server refuses
     * to brew coffee because it is, permanently, a teapot. A combined coffee/tea pot that is
     * temporarily out of coffee should instead return 503. This error is a reference to Hyper Text
     * Coffee Pot Control Protocol defined in April Fools' jokes in 1998 and 2014.
     *
     * Some websites use this response for requests they do not wish to handle, such as automated queries.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418}
     */
    imATeapot: 418,

    /**
     * ## 418 I'm a teapot
     *
     * The HTTP **`418 I'm a teapot`** client error response code indicates that the server refuses
     * to brew coffee because it is, permanently, a teapot. A combined coffee/tea pot that is
     * temporarily out of coffee should instead return 503. This error is a reference to Hyper Text
     * Coffee Pot Control Protocol defined in April Fools' jokes in 1998 and 2014.
     *
     * Some websites use this response for requests they do not wish to handle, such as automated queries.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418}
     */
    418: "imATeapot",

    /**
     * ## Misdirected Request
     *
     * The request was directed at a server that is not able to produce a response. This can be
     * sent by a server that is not configured to produce responses for the combination of scheme
     * and authority that are included in the request URI.
     */
    misdirectedRequest: 421,

    /**
     * ## Misdirected Request
     *
     * The request was directed at a server that is not able to produce a response. This can be
     * sent by a server that is not configured to produce responses for the combination of scheme
     * and authority that are included in the request URI.
     */
    421: "misdirectedRequest",

    /**
     * ## 422 Unprocessable Entity
     *
     * The HyperText Transfer Protocol (HTTP) **`422 Unprocessable Entity`** response status code
     * indicates that the server understands the content type of the request entity, and the syntax
     * of the request entity is correct, but it was unable to process the contained instructions.
     *
     * **Warning:** The client should not repeat this request without modification.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422}
     */
    unprocessableEntity: 422,

    /**
     * ## 422 Unprocessable Entity
     *
     * The HyperText Transfer Protocol (HTTP) **`422 Unprocessable Entity`** response status code
     * indicates that the server understands the content type of the request entity, and the syntax
     * of the request entity is correct, but it was unable to process the contained instructions.
     *
     * **Warning:** The client should not repeat this request without modification.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422}
     */
    422: "unprocessableEntity",

    /**
     * ## Locked
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The resource that is being accessed is locked.
     */
    locked: 423,

    /**
     * ## Locked
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The resource that is being accessed is locked.
     */
    423: "locked",

    /**
     * ## Failed Dependency
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The request failed due to failure of a previous request.
     */
    failedDependency: 424,

    /**
     * ## Failed Dependency
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The request failed due to failure of a previous request.
     */
    424: "failedDependency",

    /**
     * ## 426 Upgrade Required
     *
     * The HTTP **`426 Upgrade Required`** client error response code indicates that the server
     * refuses to perform the request using the current protocol but might be willing to do so
     * after the client upgrades to a different protocol.
     *
     * The server sends an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) header with this
     * response to indicate the required protocol(s).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426}
     */
    upgradeRequired: 426,

    /**
     * ## 426 Upgrade Required
     *
     * The HTTP **`426 Upgrade Required`** client error response code indicates that the server
     * refuses to perform the request using the current protocol but might be willing to do so
     * after the client upgrades to a different protocol.
     *
     * The server sends an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) header with this
     * response to indicate the required protocol(s).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426}
     */
    426: "upgradeRequired",

    /**
     * ## 428 Precondition Required
     *
     * The HTTP **`428 Precondition Required`** response status code indicates that the server
     * requires the request to be [conditional](/en-US/docs/Web/HTTP/Conditional_requests).
     *
     * Typically, this means that a required precondition header, such as
     * [`If-Match`](/en-US/docs/Web/HTTP/Headers/If-Match), **is missing**.
     *
     * When a precondition header is **not matching** the server side state, the response should be
     * [`412`](/en-US/docs/Web/HTTP/Status/412) `Precondition Failed`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428}
     */
    preconditionRequired: 428,

    /**
     * ## 428 Precondition Required
     *
     * The HTTP **`428 Precondition Required`** response status code indicates that the server
     * requires the request to be [conditional](/en-US/docs/Web/HTTP/Conditional_requests).
     *
     * Typically, this means that a required precondition header, such as
     * [`If-Match`](/en-US/docs/Web/HTTP/Headers/If-Match), **is missing**.
     *
     * When a precondition header is **not matching** the server side state, the response should be
     * [`412`](/en-US/docs/Web/HTTP/Status/412) `Precondition Failed`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428}
     */
    428: "preconditionRequired",

    /**
     * ## 429 Too Many Requests
     *
     * The HTTP **`429 Too Many Requests`** response status code indicates the user has sent too
     * many requests in a given amount of time ("rate limiting").
     *
     * A [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header might be included to this
     * response indicating how long to wait before making a new request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429}
     */
    tooManyRequests: 429,

    /**
     * ## 429 Too Many Requests
     *
     * The HTTP **`429 Too Many Requests`** response status code indicates the user has sent too
     * many requests in a given amount of time ("rate limiting").
     *
     * A [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header might be included to this
     * response indicating how long to wait before making a new request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429}
     */
    429: "tooManyRequests",

    /**
     * ## 431 Request Header Fields Too Large
     *
     * The HTTP **`431 Request Header Fields Too Large`** response status code indicates that the
     * server refuses to process the request because the request's [HTTP
     * headers](/en-US/docs/Web/HTTP/Headers) are too long. The request *may* be resubmitted after
     * reducing the size of the request headers.
     *
     * 431 can be used when the **total size** of request headers is too large, or when a
     * **single** header field is too large. To help those running into this error, indicate which
     * of the two is the problem in the response body — ideally, also include which headers are too
     * large. This lets users attempt to fix the problem, such as by clearing their cookies.
     *
     * Servers will often produce this status if:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431}
     */
    requestHeaderFieldsTooLarge: 431,

    /**
     * ## 431 Request Header Fields Too Large
     *
     * The HTTP **`431 Request Header Fields Too Large`** response status code indicates that the
     * server refuses to process the request because the request's [HTTP
     * headers](/en-US/docs/Web/HTTP/Headers) are too long. The request *may* be resubmitted after
     * reducing the size of the request headers.
     *
     * 431 can be used when the **total size** of request headers is too large, or when a
     * **single** header field is too large. To help those running into this error, indicate which
     * of the two is the problem in the response body — ideally, also include which headers are too
     * large. This lets users attempt to fix the problem, such as by clearing their cookies.
     *
     * Servers will often produce this status if:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431}
     */
    431: "requestHeaderFieldsTooLarge",

    /**
     * ## 451 Unavailable For Legal Reasons
     *
     * The HyperText Transfer Protocol (HTTP) **`451 Unavailable For Legal Reasons`** client error
     * response code indicates that the user requested a resource that is not available due to
     * legal reasons, such as a web page for which a legal action has been issued.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451}
     */
    unavailableForLegalReasons: 451,

    /**
     * ## 451 Unavailable For Legal Reasons
     *
     * The HyperText Transfer Protocol (HTTP) **`451 Unavailable For Legal Reasons`** client error
     * response code indicates that the user requested a resource that is not available due to
     * legal reasons, such as a web page for which a legal action has been issued.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451}
     */
    451: "unavailableForLegalReasons",

    /**
     * ## 500 Internal Server Error
     *
     * The HyperText Transfer Protocol (HTTP) **`500 Internal Server Error`** server error response
     * code indicates that the server encountered an unexpected condition that prevented it from
     * fulfilling the request.
     *
     * This error response is a generic "catch-all" response. Usually, this indicates the server
     * cannot find a better 5xx error code to response. Sometimes, server administrators log error
     * responses like the 500 status code with more details about the request to prevent the error
     * from happening again in the future.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
     */
    internalError: 500,

    /**
     * ## 500 Internal Server Error
     *
     * The HyperText Transfer Protocol (HTTP) **`500 Internal Server Error`** server error response
     * code indicates that the server encountered an unexpected condition that prevented it from
     * fulfilling the request.
     *
     * This error response is a generic "catch-all" response. Usually, this indicates the server
     * cannot find a better 5xx error code to response. Sometimes, server administrators log error
     * responses like the 500 status code with more details about the request to prevent the error
     * from happening again in the future.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
     */
    internalServerError: 500,

    /**
     * ## 500 Internal Server Error
     *
     * The HyperText Transfer Protocol (HTTP) **`500 Internal Server Error`** server error response
     * code indicates that the server encountered an unexpected condition that prevented it from
     * fulfilling the request.
     *
     * This error response is a generic "catch-all" response. Usually, this indicates the server
     * cannot find a better 5xx error code to response. Sometimes, server administrators log error
     * responses like the 500 status code with more details about the request to prevent the error
     * from happening again in the future.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
     */
    500: "internalServerError",

    /**
     * ## 501 Not Implemented
     *
     * The HyperText Transfer Protocol (HTTP) **`501 Not Implemented`** server error response code
     * means that **the server does not support the functionality required to fulfill the request**.
     *
     * This status can also send a [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After)
     * header, telling the requester when to check back to see if the functionality is supported by then.
     *
     * `501` is the appropriate response when the server does not recognize the request method and
     * is incapable of supporting it for any resource. The only methods that servers are required
     * to support (and therefore that must not return `501`) are
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) and [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD).
     *
     * If the server *does* recognize the method, but intentionally does not support it, the
     * appropriate response is [`405 Method Not Allowed`](/en-US/docs/Web/HTTP/Status/405).
     *
     * **Note:**
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501}
     */
    notImplemented: 501,

    /**
     * ## 501 Not Implemented
     *
     * The HyperText Transfer Protocol (HTTP) **`501 Not Implemented`** server error response code
     * means that **the server does not support the functionality required to fulfill the request**.
     *
     * This status can also send a [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After)
     * header, telling the requester when to check back to see if the functionality is supported by then.
     *
     * `501` is the appropriate response when the server does not recognize the request method and
     * is incapable of supporting it for any resource. The only methods that servers are required
     * to support (and therefore that must not return `501`) are
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) and [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD).
     *
     * If the server *does* recognize the method, but intentionally does not support it, the
     * appropriate response is [`405 Method Not Allowed`](/en-US/docs/Web/HTTP/Status/405).
     *
     * **Note:**
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501}
     */
    501: "notImplemented",

    /**
     * ## 502 Bad Gateway
     *
     * The HyperText Transfer Protocol (HTTP) **`502 Bad Gateway`** server error response code
     * indicates that the server, while acting as a gateway or proxy, received an invalid response
     * from the upstream server.
     *
     * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might
     * refer to different things in networking and a 502 error is usually not something you can
     * fix, but requires a fix by the web server or the proxies you are trying to get access through.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502}
     */
    badGateway: 502,

    /**
     * ## 502 Bad Gateway
     *
     * The HyperText Transfer Protocol (HTTP) **`502 Bad Gateway`** server error response code
     * indicates that the server, while acting as a gateway or proxy, received an invalid response
     * from the upstream server.
     *
     * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might
     * refer to different things in networking and a 502 error is usually not something you can
     * fix, but requires a fix by the web server or the proxies you are trying to get access through.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502}
     */
    502: "badGateway",

    /**
     * ## 503 Service Unavailable
     *
     * The HyperText Transfer Protocol (HTTP) **`503 Service Unavailable`** server error response
     * code indicates that the server is not ready to handle the request.
     *
     * Common causes are a server that is down for maintenance or that is overloaded. This response
     * should be used for temporary conditions and the
     * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) HTTP header should, if possible,
     * contain the estimated time for the recovery of the service.
     *
     * **Note:** together with this response, a user-friendly page explaining the problem should be sent.
     *
     * Caching-related headers that are sent along with this response should be taken care of, as a
     * 503 status is often a temporary condition and responses shouldn't usually be cached.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503}
     */
    serviceUnavailable: 503,

    /**
     * ## 503 Service Unavailable
     *
     * The HyperText Transfer Protocol (HTTP) **`503 Service Unavailable`** server error response
     * code indicates that the server is not ready to handle the request.
     *
     * Common causes are a server that is down for maintenance or that is overloaded. This response
     * should be used for temporary conditions and the
     * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) HTTP header should, if possible,
     * contain the estimated time for the recovery of the service.
     *
     * **Note:** together with this response, a user-friendly page explaining the problem should be sent.
     *
     * Caching-related headers that are sent along with this response should be taken care of, as a
     * 503 status is often a temporary condition and responses shouldn't usually be cached.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503}
     */
    503: "serviceUnavailable",

    /**
     * ## 504 Gateway Timeout
     *
     * The HyperText Transfer Protocol (HTTP) **`504 Gateway Timeout`** server error response code
     * indicates that the server, while acting as a gateway or proxy, did not get a response in
     * time from the upstream server that it needed in order to complete the request.
     *
     * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might
     * refer to different things in networking and a 504 error is usually not something you can
     * fix, but requires a fix by the web server or the proxies you are trying to get access through.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504}
     */
    gatewayTimeout: 504,

    /**
     * ## 504 Gateway Timeout
     *
     * The HyperText Transfer Protocol (HTTP) **`504 Gateway Timeout`** server error response code
     * indicates that the server, while acting as a gateway or proxy, did not get a response in
     * time from the upstream server that it needed in order to complete the request.
     *
     * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might
     * refer to different things in networking and a 504 error is usually not something you can
     * fix, but requires a fix by the web server or the proxies you are trying to get access through.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504}
     */
    504: "gatewayTimeout",

    /**
     * ## 505 HTTP Version Not Supported
     *
     * The HyperText Transfer Protocol (HTTP) **`505 HTTP Version Not Supported`** response status
     * code indicates that the HTTP version used in the request is not supported by the server.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505}
     */
    httpVersionNotSupported: 505,

    /**
     * ## 505 HTTP Version Not Supported
     *
     * The HyperText Transfer Protocol (HTTP) **`505 HTTP Version Not Supported`** response status
     * code indicates that the HTTP version used in the request is not supported by the server.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505}
     */
    505: "httpVersionNotSupported",

    /**
     * ## 506 Variant Also Negotiates
     *
     * The HyperText Transfer Protocol (HTTP) **`506 Variant Also Negotiates`** response status
     * code may be given in the context of Transparent Content Negotiation (see [RFC
     * 2295](https://datatracker.ietf.org/doc/html/rfc2295)). This protocol enables a client to
     * retrieve the best variant of a given resource, where the server supports multiple variants.
     *
     * The **`Variant Also Negotiates`** status code indicates an internal server configuration
     * error in which the chosen variant is itself configured to engage in content negotiation, so
     * is not a proper negotiation endpoint.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506}
     */
    variantAlsoNegotiates: 506,

    /**
     * ## 506 Variant Also Negotiates
     *
     * The HyperText Transfer Protocol (HTTP) **`506 Variant Also Negotiates`** response status
     * code may be given in the context of Transparent Content Negotiation (see [RFC
     * 2295](https://datatracker.ietf.org/doc/html/rfc2295)). This protocol enables a client to
     * retrieve the best variant of a given resource, where the server supports multiple variants.
     *
     * The **`Variant Also Negotiates`** status code indicates an internal server configuration
     * error in which the chosen variant is itself configured to engage in content negotiation, so
     * is not a proper negotiation endpoint.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506}
     */
    506: "variantAlsoNegotiates",

    /**
     * ## 507 Insufficient Storage
     *
     * The HyperText Transfer Protocol (HTTP) **`507 Insufficient Storage`** response status code
     * may be given in the context of the Web Distributed Authoring and Versioning (WebDAV)
     * protocol (see [RFC 4918](https://datatracker.ietf.org/doc/html/rfc4918)).
     *
     * It indicates that a method could not be performed because the server cannot store the
     * representation needed to successfully complete the request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507}
     */
    insufficientStorage: 507,

    /**
     * ## 507 Insufficient Storage
     *
     * The HyperText Transfer Protocol (HTTP) **`507 Insufficient Storage`** response status code
     * may be given in the context of the Web Distributed Authoring and Versioning (WebDAV)
     * protocol (see [RFC 4918](https://datatracker.ietf.org/doc/html/rfc4918)).
     *
     * It indicates that a method could not be performed because the server cannot store the
     * representation needed to successfully complete the request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507}
     */
    507: "insufficientStorage",

    /**
     * ## 508 Loop Detected
     *
     * The HyperText Transfer Protocol (HTTP) **`508 Loop Detected`** response status code may be
     * given in the context of the Web Distributed Authoring and Versioning (WebDAV) protocol.
     *
     * It indicates that the server terminated an operation because it encountered an infinite loop
     * while processing a request with "Depth: infinity". This status indicates that the entire
     * operation failed.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508}
     */
    loopDetected: 508,

    /**
     * ## 508 Loop Detected
     *
     * The HyperText Transfer Protocol (HTTP) **`508 Loop Detected`** response status code may be
     * given in the context of the Web Distributed Authoring and Versioning (WebDAV) protocol.
     *
     * It indicates that the server terminated an operation because it encountered an infinite loop
     * while processing a request with "Depth: infinity". This status indicates that the entire
     * operation failed.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508}
     */
    508: "loopDetected",

    /**
     * ## 510 Not Extended
     *
     * The HyperText Transfer Protocol (HTTP) **`510 Not Extended`** response status code is sent
     * in the context of the HTTP Extension Framework, defined in [RFC
     * 2774](https://datatracker.ietf.org/doc/html/rfc2774).
     *
     * In that specification a client may send a request that contains an extension declaration,
     * that describes the extension to be used. If the server receives such a request, but any
     * described extensions are not supported for the request, then the server responds with the
     * 510 status code.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510}
     */
    notExtended: 510,

    /**
     * ## 510 Not Extended
     *
     * The HyperText Transfer Protocol (HTTP) **`510 Not Extended`** response status code is sent
     * in the context of the HTTP Extension Framework, defined in [RFC
     * 2774](https://datatracker.ietf.org/doc/html/rfc2774).
     *
     * In that specification a client may send a request that contains an extension declaration,
     * that describes the extension to be used. If the server receives such a request, but any
     * described extensions are not supported for the request, then the server responds with the
     * 510 status code.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510}
     */
    510: "notExtended",

    /**
     * ## 511 Network Authentication Required
     *
     * The HTTP **`511 Network Authentication Required`** response status code indicates that the
     * client needs to authenticate to gain network access.
     *
     * This status is not generated by origin servers, but by intercepting proxies that control
     * access to the network.
     *
     * Network operators sometimes require some authentication, acceptance of terms, or other user
     * interaction before granting access (for example in an internet café or at an airport). They
     * often identify clients who have not done so using their Media Access Control (MAC) addresses.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511}
     */
    networkAuthenticationRequired: 511,

    /**
     * ## 511 Network Authentication Required
     *
     * The HTTP **`511 Network Authentication Required`** response status code indicates that the
     * client needs to authenticate to gain network access.
     *
     * This status is not generated by origin servers, but by intercepting proxies that control
     * access to the network.
     *
     * Network operators sometimes require some authentication, acceptance of terms, or other user
     * interaction before granting access (for example in an internet café or at an airport). They
     * often identify clients who have not done so using their Media Access Control (MAC) addresses.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511}
     */
    511: "networkAuthenticationRequired",
} as const

/**
 * ## Hypertext Transfer Protocol (HTTP) response status codes
 *
 * HTTP response status codes indicate whether a specific HTTP request has been successfully
 * completed. Responses are grouped in five classes:
 *
 * 1. Informational responses (100–199)
 * 2. Successful responses (200–299)
 * 3. Redirects (300–399)
 * 4. Client errors (400–499)
 * 5. Server errors (500–599)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}
 */
export const phraseStatus = {
    /**
     * ## 100 Continue
     *
     * The HTTP **`100 Continue`** informational status response code indicates that everything so
     * far is OK and that the client should continue with the request or ignore it if it is already
     * finished.
     *
     * To have a server check the request's headers, a client must send
     * [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect)`: 100-continue` as a header in its initial
     * request and receive a `100 Continue` status code in response before sending the body.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100}
     */
    100: "Continue",

    /**
     * ## 101 Switching Protocols
     *
     * The HTTP **`101 Switching Protocols`** response code indicates the protocol the server is
     * switching to as requested by a client which sent the message including the
     * [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) request header.
     *
     * The server includes in this response an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade)
     * response header to indicate the protocol it switched to. The process is described in detail
     * in the article [Protocol upgrade mechanism](/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101}
     */
    101: "Switching Protocols",

    /**
     * ## Processing
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * A WebDAV request may contain many sub-requests involving file operations, requiring a long
     * time to complete the request.
     *
     * This code indicates that the server has received and is processing the request, but no
     * response is available yet.
     *
     * This prevents the client from timing out and assuming the request was lost.
     */
    102: "Processing",

    /**
     * ## 103 Early Hints
     *
     * This page is not complete.
     *
     * The HTTP **`103 Early Hints`** information response status code is primarily intended to be
     * used with the [`Link`](/en-US/docs/Web/HTTP/Headers/Link) header to allow the user agent to
     * start preloading resources while the server is still preparing a response.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103}
     */
    103: "Early Hints",

    /**
     * ## 200 OK
     *
     * The HTTP **`200 OK`** success status response code indicates that the request has succeeded.
     * A 200 response is cacheable by default.
     *
     * The meaning of a success depends on the HTTP request method:
     *
     * The successful result of a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or a
     * [`DELETE`](/en-US/docs/Web/HTTP/Methods/DELETE) is often not a `200` `OK` but a
     * [`204`](/en-US/docs/Web/HTTP/Status/204) `No Content` (or a
     * [`201`](/en-US/docs/Web/HTTP/Status/201) `Created` when the resource is uploaded for the first time).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200}
     */
    200: "Ok",

    /**
     * ## 201 Created
     *
     * The HTTP **`201 Created`** success status response code indicates that the request has
     * succeeded and has led to the creation of a resource. The new resource is effectively created
     * before this response is sent back and the new resource is returned in the body of the
     * message, its location being either the URL of the request, or the content of the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
     *
     * The common use case of this status code is as the result of a
     * [`POST`](/en-US/docs/Web/HTTP/Methods/POST) request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201}
     */
    201: "Created",

    /**
     * ## 202 Accepted
     *
     * The HyperText Transfer Protocol (HTTP) **`202 Accepted`** response status code indicates
     * that the request has been accepted for processing, but the processing has not been
     * completed; in fact, processing may not have started yet. The request might or might not
     * eventually be acted upon, as it might be disallowed when processing actually takes place.
     *
     * 202 is non-committal, meaning that there is no way for the HTTP to later send an
     * asynchronous response indicating the outcome of processing the request. It is intended for
     * cases where another process or server handles the request, or for batch processing.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202}
     */
    202: "Accepted",

    /**
     * ## 203 Non-Authoritative Information
     *
     * The HTTP **`203 Non-Authoritative Information`** response status indicates that the request
     * was successful but the enclosed payload has been modified by a transforming
     * [proxy](/en-US/docs/Glossary/Proxy_server) from that of the origin server's
     * [`200`](/en-US/docs/Web/HTTP/Status/200) (`OK`) response .
     *
     * The `203` response is similar to the value
     * [`214`](/en-US/docs/Web/HTTP/Headers/Warning#warning_codes), meaning `Transformation
     * Applied`, of the [`Warning`](/en-US/docs/Web/HTTP/Headers/Warning) header code, which has
     * the additional advantage of being applicable to responses with any status code.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203}
     */
    203: "Non-Authoritative Information",

    /**
     * ## 204 No Content
     *
     * The HTTP **`204 No Content`** success status response code indicates that a request has
     * succeeded, but that the client doesn't need to navigate away from its current page.
     *
     * This might be used, for example, when implementing "save and continue editing" functionality
     * for a wiki site. In this case a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request would be
     * used to save the page, and the `204 No Content` response would be sent to indicate that the
     * editor should not be replaced by some other page.
     *
     * A 204 response is cacheable by default (an [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag)
     * header is included in such a response).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204}
     */
    204: "No Content",

    /**
     * ## 205 Reset Content
     *
     * The HTTP **`205 Reset Content`** response status tells the client to reset the document
     * view, so for example to clear the content of a form, reset a canvas state, or to refresh the UI.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205}
     */
    205: "Reset Content",

    /**
     * ## 206 Partial Content
     *
     * The HTTP **`206 Partial Content`** success status response code indicates that the request
     * has succeeded and the body contains the requested ranges of data, as described in the
     * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header of the request.
     *
     * If there is only one range, the [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type)
     * of the whole response is set to the type of the document, and a
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) is provided.
     *
     * If several ranges are sent back, the
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) is set to `multipart/byteranges`
     * and each fragment covers one range, with
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) and
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) describing it.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206}
     */
    206: "Partial Content",

    /**
     * ## Multi-Status
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The message body that follows is an XML message and can contain a number of separate
     * response codes, depending on how many sub-requests were made.
     */
    207: "Multi Status",

    /**
     * ## Already Reported
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The members of a DAV binding have already been enumerated in a preceding part of the
     * (multistatus) response, and are not being included again.
     */
    208: "Already Reported",

    /**
     * ## IM Used
     *
     * **[HTTP Delta encoding](https://datatracker.ietf.org/doc/html/rfc3229)**
     *
     * The server has fulfilled a `GET` request for the resource, and the response is a
     * representation of the result of one or more instance-manipulations applied to the current instance.
     */
    226: "IM Used",

    /**
     * ## 300 Multiple Choices
     *
     * The HTTP **`300 Multiple Choices`** redirect status response code indicates that the request
     * has more than one possible responses. The user-agent or the user should choose one of them.
     * As there is no standardized way of choosing one of the responses, this response code is very
     * rarely used.
     *
     * If the server has a preferred choice, it should generate a
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300}
     */
    300: "Multiple Choices",

    /**
     * ## 301 Moved Permanently
     *
     * The HyperText Transfer Protocol (HTTP) **`301 Moved Permanently`** redirect status response
     * code indicates that the resource requested has been definitively moved to the URL given by
     * the [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this
     * page and search engines update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is sent to the new URL).
     *
     * Even if the specification requires the method (and the body) not to be altered when the
     * redirection is performed, not all user-agents align with it - you can still find this type
     * of bugged software out there. It is therefore recommended to use the `301` code only as a
     * response for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) methods and to use the [`308 Permanent
     * Redirect`](/en-US/docs/Web/HTTP/Status/308) for [`POST`](/en-US/docs/Web/HTTP/Methods/POST)
     * methods instead, as the method change is explicitly prohibited with this status.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301}
     */
    301: "Moved Permanently",

    /**
     * ## 302 Found
     *
     * The HyperText Transfer Protocol (HTTP) **`302 Found`** redirect status response code
     * indicates that the resource requested has been temporarily moved to the URL given by the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header. A browser redirects to this page
     * but search engines don't update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is not sent to the new URL).
     *
     * Even if the specification requires the method (and the body) not to be altered when the
     * redirection is performed, not all user-agents conform here - you can still find this type of
     * bugged software out there. It is therefore recommended to set the `302` code only as a
     * response for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) methods and to use [`307 Temporary
     * Redirect`](/en-US/docs/Web/HTTP/Status/307) instead, as the method change is explicitly
     * prohibited in that case.
     *
     * In the cases where you want the method used to be changed to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
     * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give a
     * response to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded
     * resource but a confirmation message such as: 'you successfully uploaded XYZ'.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302}
     */
    302: "Found",

    /**
     * ## 303 See Other
     *
     * The HyperText Transfer Protocol (HTTP) **`303 See Other`** redirect status response code
     * indicates that the redirects don't link to the newly uploaded resources, but to another page
     * (such as a confirmation page or an upload progress page). This response code is usually sent
     * back as a result of [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or
     * [`POST`](/en-US/docs/Web/HTTP/Methods/POST). The method used to display this redirected page
     * is always [`GET`](/en-US/docs/Web/HTTP/Methods/GET).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303}
     */
    303: "See Other",

    /**
     * ## 304 Not Modified
     *
     * The HTTP **`304 Not Modified`** client redirection response code indicates that there is no
     * need to retransmit the requested resources. It is an implicit redirection to a cached
     * resource. This happens when the request method is [safe](/en-US/docs/Glossary/Safe/HTTP),
     * like a [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or a
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) request, or when the request is conditional and
     * uses a [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) or a
     * [`If-Modified-Since`](/en-US/docs/Web/HTTP/Headers/If-Modified-Since) header.
     *
     * The equivalent [`200`](/en-US/docs/Web/HTTP/Status/200) `OK` response would have included
     * the headers [`Cache-Control`](/en-US/docs/Web/HTTP/Headers/Cache-Control),
     * [`Content-Location`](/en-US/docs/Web/HTTP/Headers/Content-Location),
     * [`Date`](/en-US/docs/Web/HTTP/Headers/Date), [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag),
     * [`Expires`](/en-US/docs/Web/HTTP/Headers/Expires), and [`Vary`](/en-US/docs/Web/HTTP/Headers/Vary).
     *
     * **Note:** Many [developer tools' network panels](/en-US/docs/Tools/Network_Monitor) of
     * browsers create extraneous requests leading to `304` responses, so that access to the local
     * cache is visible to developers.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304}
     */
    304: "Not Modified",

    /**
     * ## Use Proxy
     *
     * The requested resource is available only through a proxy, the address for which is provided
     * in the response.
     *
     * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses
     * with this status code, primarily for security reasons.
     *
     * @deprecated Due to security concerns regarding in-band configuration of a proxy
     * @since HTTP/1.1
     */
    305: "Use Proxy",

    /**
     * ## Switch Proxy
     *
     * Originally meant "Subsequent requests should use the specified proxy".
     *
     * @deprecated No longer used
     * @since HTTP/1.1
     */
    306: "Switch Proxy",

    /**
     * ## 307 Temporary Redirect
     *
     * [HTTP](/en-US/docs/Glossary/HTTP) **`307 Temporary Redirect`** redirect status response code
     * indicates that the resource requested has been temporarily moved to the URL given by the
     * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers.
     *
     * The method and the body of the original request are reused to perform the redirected
     * request. In the cases where you want the method used to be changed to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
     * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give an
     * answer to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded
     * resources, but a confirmation message (like "You successfully uploaded XYZ").
     *
     * The only difference between `307` and [`302`](/en-US/docs/Web/HTTP/Status/302) is that `307`
     * guarantees that the method and the body will not be changed when the redirected request is
     * made. With `302`, some old clients were incorrectly changing the method to
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET): the behavior with non-`GET` methods and `302` is
     * then unpredictable on the Web, whereas the behavior with `307` is predictable. For `GET`
     * requests, their behavior is identical.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307}
     */
    307: "Temporary Redirect",

    /**
     * ## 308 Permanent Redirect
     *
     * The HyperText Transfer Protocol (HTTP) **`308 Permanent Redirect`** redirect status response
     * code indicates that the resource requested has been definitively moved to the URL given by
     * the [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this
     * page and search engines update their links to the resource (in 'SEO-speak', it is said that
     * the 'link-juice' is sent to the new URL).
     *
     * The request method and the body will not be altered, whereas
     * [`301`](/en-US/docs/Web/HTTP/Status/301) may incorrectly sometimes be changed to a
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) method.
     *
     * **Note:** Some Web applications may use the `308 Permanent Redirect` in a non-standard way
     * and for other purposes. For example, Google Drive uses a `308 Resume Incomplete` response to
     * indicate to the client when an incomplete upload stalled. (See [Perform a resumable
     * download](https://developers.google.com/drive/v3/web/manage-uploads#resumable) on Google
     * Drive documentation.)
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308}
     */
    308: "Permanent Redirect",

    /**
     * ## 400 Bad Request
     *
     * The HyperText Transfer Protocol (HTTP) **`400 Bad Request`** response status code indicates
     * that the server cannot or will not process the request due to something that is perceived to
     * be a client error (e.g., malformed request syntax, invalid request message framing, or
     * deceptive request routing).
     *
     * **Warning:** The client should not repeat this request without modification.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400}
     */
    400: "Bad Request",

    /**
     * ## 401 Unauthorized
     *
     * The HTTP **`401 Unauthorized`** client error status response code indicates that the request
     * has not been applied because it lacks valid authentication credentials for the target resource.
     *
     * This status is sent with a
     * [`WWW-Authenticate`](/en-US/docs/Web/HTTP/Headers/WWW-Authenticate) header that contains
     * information on how to authorize correctly.
     *
     * This status is similar to [`403`](/en-US/docs/Web/HTTP/Status/403), but in this case,
     * authentication is possible.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401}
     */
    401: "Unauthorized",

    /**
     * ## 402 Payment Required
     *
     * **This is an [experimental
     * technology](/en-US/docs/MDN/Guidelines/Conventions_definitions#experimental)** Check the
     * [Browser compatibility table](#browser_compatibility) carefully before using this in production.
     *
     * The HTTP **`402 Payment Required`** is a nonstandard client error status response code that
     * is reserved for future use.
     *
     * Sometimes, this code indicates that the request can not be processed until the client makes
     * a payment. Originally it was created to enable digital cash or (micro) payment systems and
     * would indicate that the requested content is not available until the client makes a payment.
     * However, no standard use convention exists and different entities use it in different contexts.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402}
     */
    402: "Payment Required",

    /**
     * ## 403 Forbidden
     *
     * The HTTP **`403 Forbidden`** client error status response code indicates that the server
     * understood the request but refuses to authorize it.
     *
     * This status is similar to [`401`](/en-US/docs/Web/HTTP/Status/401), but in this case,
     * re-authenticating will make no difference. The access is permanently forbidden and tied to
     * the application logic, such as insufficient rights to a resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403}
     */
    403: "Forbidden",

    /**
     * ## 404 Not Found
     *
     * The HTTP **`404 Not Found`** client error response code indicates that the server can't find
     * the requested resource. Links that lead to a 404 page are often called broken or dead links
     * and can be subject to [link rot](https://en.wikipedia.org/wiki/Link_rot).
     *
     * A 404 status code does not indicate whether the resource is temporarily or permanently
     * missing. But if a resource is permanently removed, a
     * [`410`](/en-US/docs/Web/HTTP/Status/410) (Gone) should be used instead of a 404 status.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404}
     */
    404: "Not Found",

    /**
     * ## 405 Method Not Allowed
     *
     * The HyperText Transfer Protocol (HTTP) **`405 Method Not Allowed`** response status code
     * indicates that the request method is known by the server but is not supported by the target resource.
     *
     * The server **must** generate an **`Allow`** header field in a 405 response containing a list
     * of the target resource's currently supported methods.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405}
     */
    405: "Method Not Allowed",

    /**
     * ## 406 Not Acceptable
     *
     * The HyperText Transfer Protocol (HTTP) **`406 Not Acceptable`** client error response code
     * indicates that the server cannot produce a response matching the list of acceptable values
     * defined in the request's proactive [content
     * negotiation](/en-US/docs/Web/HTTP/Content_negotiation) headers, and that the server is
     * unwilling to supply a default representation.
     *
     * Proactive content negotiation headers include:
     *
     * In practice, this error is very rarely used. Instead of responding using this error code,
     * which would be cryptic for the end user and difficult to fix, servers ignore the relevant
     * header and serve an actual page to the user. It is assumed that even if the user won't be
     * completely happy, they will prefer this to an error code.
     *
     * If a server returns such an error status, the body of the message should contain the list of
     * the available representations of the resources, allowing the user to choose among them.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406}
     */
    406: "Not Acceptable",

    /**
     * ## 407 Proxy Authentication Required
     *
     * The HTTP **`407 Proxy Authentication Required`** client error status response code indicates
     * that the request has not been applied because it lacks valid authentication credentials for
     * a [proxy server](/en-US/docs/Glossary/Proxy_server) that is between the browser and the
     * server that can access the requested resource.
     *
     * This status is sent with a
     * [`Proxy-Authenticate`](/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate) header that contains
     * information on how to authorize correctly.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407}
     */
    407: "Proxy Authentication Required",

    /**
     * ## 408 Request Timeout
     *
     * The HyperText Transfer Protocol (HTTP) **`408 Request Timeout`** response status code means
     * that the server would like to shut down this unused connection. It is sent on an idle
     * connection by some servers, *even without any previous request by the client*.
     *
     * A server should send the "close" [`Connection`](/en-US/docs/Web/HTTP/Headers/Connection)
     * header field in the response, since `408` implies that the server has decided to close the
     * connection rather than continue waiting.
     *
     * This response is used much more since some browsers, like Chrome, Firefox 27+, and IE9, use
     * HTTP pre-connection mechanisms to speed up surfing.
     *
     * **Note:** some servers merely shut down the connection without sending this message.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408}
     */
    408: "Request Timeout",

    /**
     * ## 409 Conflict
     *
     * The HTTP **`409 Conflict`** response status code indicates a request conflict with current
     * state of the target resource.
     *
     * Conflicts are most likely to occur in response to a
     * [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request. For example, you may get a 409 response
     * when uploading a file which is older than the one already on the server resulting in a
     * version control conflict.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409}
     */
    409: "Conflict",

    /**
     * ## 410 Gone
     *
     * The HyperText Transfer Protocol (HTTP) **`410 Gone`** client error response code indicates
     * that access to the target resource is no longer available at the origin server and that this
     * condition is likely to be permanent.
     *
     * If you don't know whether this condition is temporary or permanent, a
     * [`404`](/en-US/docs/Web/HTTP/Status/404) status code should be used instead.
     *
     * **Note:** A 410 response is cacheable by default.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410}
     */
    410: "Gone",

    /**
     * ## 411 Length Required
     *
     * The HyperText Transfer Protocol (HTTP) **`411 Length Required`** client error response code
     * indicates that the server refuses to accept the request without a defined
     * [`Content-Length`](/en-US/docs/Web/HTTP/Headers/Content-Length) header.
     *
     * **Note:** by specification, when sending data in a series of chunks, the `Content-Length`
     * header is omitted and at the beginning of each chunk you need to add the length of the
     * current chunk in hexadecimal format. See
     * [`Transfer-Encoding`](/en-US/docs/Web/HTTP/Headers/Transfer-Encoding) for more details.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411}
     */
    411: "Length Required",

    /**
     * ## 412 Precondition Failed
     *
     * The HyperText Transfer Protocol (HTTP) **`412 Precondition Failed`** client error response
     * code indicates that access to the target resource has been denied. This happens with
     * conditional requests on methods other than [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
     * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) when the condition defined by the
     * [`If-Unmodified-Since`](/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since) or
     * [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) headers is not fulfilled. In
     * that case, the request, usually an upload or a modification of a resource, cannot be made
     * and this error response is sent back.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412}
     */
    412: "Precondition Failed",

    /**
     * ## 413 Payload Too Large
     *
     * The HTTP **`413 Payload Too Large`** response status code indicates that the request entity
     * is larger than limits defined by server; the server might close the connection or return a
     * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header field.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413}
     */
    413: "Payload Too Large",

    /**
     * ## 414 URI Too Long
     *
     * The HTTP **`414 URI Too Long`** response status code indicates that the URI requested by the
     * client is longer than the server is willing to interpret.
     *
     * There are a few rare conditions when this might occur:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414}
     */
    414: "URI Too Long",

    /**
     * ## 415 Unsupported Media Type
     *
     * The HTTP **`415 Unsupported Media Type`** client error response code indicates that the
     * server refuses to accept the request because the payload format is in an unsupported format.
     *
     * The format problem might be due to the request's indicated
     * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) or
     * [`Content-Encoding`](/en-US/docs/Web/HTTP/Headers/Content-Encoding), or as a result of
     * inspecting the data directly.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415}
     */
    415: "Unsupported Media Type",

    /**
     * ## 416 Range Not Satisfiable
     *
     * The HyperText Transfer Protocol (HTTP) **`416 Range Not Satisfiable`** error response code
     * indicates that a server cannot serve the requested ranges. The most likely reason is that
     * the document doesn't contain such ranges, or that the
     * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header value, though syntactically correct,
     * doesn't make sense.
     *
     * The `416` response message contains a
     * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) indicating an unsatisfied
     * range (that is a `'*'`) followed by a `'/'` and the current length of the resource. E.g.
     * `Content-Range: bytes *​/12777`
     *
     * Faced with this error, browsers usually either abort the operation (for example, a download
     * will be considered as non-resumable) or ask for the whole document again.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416}
     */
    416: "Range Not Satisfiable",

    /**
     * ## 417 Expectation Failed
     *
     * The HTTP **`417 Expectation Failed`** client error response code indicates that the
     * expectation given in the request's [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header
     * could not be met.
     *
     * See the [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header for more details.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417}
     */
    417: "Expectation Failed",

    /**
     * ## 418 I'm a teapot
     *
     * The HTTP **`418 I'm a teapot`** client error response code indicates that the server refuses
     * to brew coffee because it is, permanently, a teapot. A combined coffee/tea pot that is
     * temporarily out of coffee should instead return 503. This error is a reference to Hyper Text
     * Coffee Pot Control Protocol defined in April Fools' jokes in 1998 and 2014.
     *
     * Some websites use this response for requests they do not wish to handle, such as automated queries.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418}
     */
    418: "I'm A Teapot",

    /**
     * ## Misdirected Request
     *
     * The request was directed at a server that is not able to produce a response. This can be
     * sent by a server that is not configured to produce responses for the combination of scheme
     * and authority that are included in the request URI.
     */
    421: "Misdirected Request",

    /**
     * ## 422 Unprocessable Entity
     *
     * The HyperText Transfer Protocol (HTTP) **`422 Unprocessable Entity`** response status code
     * indicates that the server understands the content type of the request entity, and the syntax
     * of the request entity is correct, but it was unable to process the contained instructions.
     *
     * **Warning:** The client should not repeat this request without modification.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422}
     */
    422: "Unprocessable Entity",

    /**
     * ## Locked
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The resource that is being accessed is locked.
     */
    423: "Locked",

    /**
     * ## Failed Dependency
     *
     * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
     *
     * The request failed due to failure of a previous request.
     */
    424: "Failed Dependency",

    /**
     * ## 426 Upgrade Required
     *
     * The HTTP **`426 Upgrade Required`** client error response code indicates that the server
     * refuses to perform the request using the current protocol but might be willing to do so
     * after the client upgrades to a different protocol.
     *
     * The server sends an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) header with this
     * response to indicate the required protocol(s).
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426}
     */
    426: "Upgrade Required",

    /**
     * ## 428 Precondition Required
     *
     * The HTTP **`428 Precondition Required`** response status code indicates that the server
     * requires the request to be [conditional](/en-US/docs/Web/HTTP/Conditional_requests).
     *
     * Typically, this means that a required precondition header, such as
     * [`If-Match`](/en-US/docs/Web/HTTP/Headers/If-Match), **is missing**.
     *
     * When a precondition header is **not matching** the server side state, the response should be
     * [`412`](/en-US/docs/Web/HTTP/Status/412) `Precondition Failed`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428}
     */
    428: "Precondition Required",

    /**
     * ## 429 Too Many Requests
     *
     * The HTTP **`429 Too Many Requests`** response status code indicates the user has sent too
     * many requests in a given amount of time ("rate limiting").
     *
     * A [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header might be included to this
     * response indicating how long to wait before making a new request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429}
     */
    429: "Too Many Requests",

    /**
     * ## 431 Request Header Fields Too Large
     *
     * The HTTP **`431 Request Header Fields Too Large`** response status code indicates that the
     * server refuses to process the request because the request's [HTTP
     * headers](/en-US/docs/Web/HTTP/Headers) are too long. The request *may* be resubmitted after
     * reducing the size of the request headers.
     *
     * 431 can be used when the **total size** of request headers is too large, or when a
     * **single** header field is too large. To help those running into this error, indicate which
     * of the two is the problem in the response body — ideally, also include which headers are too
     * large. This lets users attempt to fix the problem, such as by clearing their cookies.
     *
     * Servers will often produce this status if:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431}
     */
    431: "Request Header Fields Too Large",

    /**
     * ## 451 Unavailable For Legal Reasons
     *
     * The HyperText Transfer Protocol (HTTP) **`451 Unavailable For Legal Reasons`** client error
     * response code indicates that the user requested a resource that is not available due to
     * legal reasons, such as a web page for which a legal action has been issued.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451}
     */
    451: "Unavailable For Legal Reasons",

    /**
     * ## 500 Internal Server Error
     *
     * The HyperText Transfer Protocol (HTTP) **`500 Internal Server Error`** server error response
     * code indicates that the server encountered an unexpected condition that prevented it from
     * fulfilling the request.
     *
     * This error response is a generic "catch-all" response. Usually, this indicates the server
     * cannot find a better 5xx error code to response. Sometimes, server administrators log error
     * responses like the 500 status code with more details about the request to prevent the error
     * from happening again in the future.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
     */
    500: "Internal Server Error",

    /**
     * ## 501 Not Implemented
     *
     * The HyperText Transfer Protocol (HTTP) **`501 Not Implemented`** server error response code
     * means that **the server does not support the functionality required to fulfill the request**.
     *
     * This status can also send a [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After)
     * header, telling the requester when to check back to see if the functionality is supported by then.
     *
     * `501` is the appropriate response when the server does not recognize the request method and
     * is incapable of supporting it for any resource. The only methods that servers are required
     * to support (and therefore that must not return `501`) are
     * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) and [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD).
     *
     * If the server *does* recognize the method, but intentionally does not support it, the
     * appropriate response is [`405 Method Not Allowed`](/en-US/docs/Web/HTTP/Status/405).
     *
     * **Note:**
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501}
     */
    501: "Not Implemented",

    /**
     * ## 502 Bad Gateway
     *
     * The HyperText Transfer Protocol (HTTP) **`502 Bad Gateway`** server error response code
     * indicates that the server, while acting as a gateway or proxy, received an invalid response
     * from the upstream server.
     *
     * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might
     * refer to different things in networking and a 502 error is usually not something you can
     * fix, but requires a fix by the web server or the proxies you are trying to get access through.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502}
     */
    502: "Bad Gateway",

    /**
     * ## 503 Service Unavailable
     *
     * The HyperText Transfer Protocol (HTTP) **`503 Service Unavailable`** server error response
     * code indicates that the server is not ready to handle the request.
     *
     * Common causes are a server that is down for maintenance or that is overloaded. This response
     * should be used for temporary conditions and the
     * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) HTTP header should, if possible,
     * contain the estimated time for the recovery of the service.
     *
     * **Note:** together with this response, a user-friendly page explaining the problem should be sent.
     *
     * Caching-related headers that are sent along with this response should be taken care of, as a
     * 503 status is often a temporary condition and responses shouldn't usually be cached.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503}
     */
    503: "Service Unavailable",

    /**
     * ## 504 Gateway Timeout
     *
     * The HyperText Transfer Protocol (HTTP) **`504 Gateway Timeout`** server error response code
     * indicates that the server, while acting as a gateway or proxy, did not get a response in
     * time from the upstream server that it needed in order to complete the request.
     *
     * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might
     * refer to different things in networking and a 504 error is usually not something you can
     * fix, but requires a fix by the web server or the proxies you are trying to get access through.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504}
     */
    504: "Gateway Timeout",

    /**
     * ## 505 HTTP Version Not Supported
     *
     * The HyperText Transfer Protocol (HTTP) **`505 HTTP Version Not Supported`** response status
     * code indicates that the HTTP version used in the request is not supported by the server.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505}
     */
    505: "HTTP Version Not Supported",

    /**
     * ## 506 Variant Also Negotiates
     *
     * The HyperText Transfer Protocol (HTTP) **`506 Variant Also Negotiates`** response status
     * code may be given in the context of Transparent Content Negotiation (see [RFC
     * 2295](https://datatracker.ietf.org/doc/html/rfc2295)). This protocol enables a client to
     * retrieve the best variant of a given resource, where the server supports multiple variants.
     *
     * The **`Variant Also Negotiates`** status code indicates an internal server configuration
     * error in which the chosen variant is itself configured to engage in content negotiation, so
     * is not a proper negotiation endpoint.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506}
     */
    506: "Variant Also Negotiates",

    /**
     * ## 507 Insufficient Storage
     *
     * The HyperText Transfer Protocol (HTTP) **`507 Insufficient Storage`** response status code
     * may be given in the context of the Web Distributed Authoring and Versioning (WebDAV)
     * protocol (see [RFC 4918](https://datatracker.ietf.org/doc/html/rfc4918)).
     *
     * It indicates that a method could not be performed because the server cannot store the
     * representation needed to successfully complete the request.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507}
     */
    507: "Insufficient Storage",

    /**
     * ## 508 Loop Detected
     *
     * The HyperText Transfer Protocol (HTTP) **`508 Loop Detected`** response status code may be
     * given in the context of the Web Distributed Authoring and Versioning (WebDAV) protocol.
     *
     * It indicates that the server terminated an operation because it encountered an infinite loop
     * while processing a request with "Depth: infinity". This status indicates that the entire
     * operation failed.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508}
     */
    508: "Loop Detected",

    /**
     * ## 510 Not Extended
     *
     * The HyperText Transfer Protocol (HTTP) **`510 Not Extended`** response status code is sent
     * in the context of the HTTP Extension Framework, defined in [RFC
     * 2774](https://datatracker.ietf.org/doc/html/rfc2774).
     *
     * In that specification a client may send a request that contains an extension declaration,
     * that describes the extension to be used. If the server receives such a request, but any
     * described extensions are not supported for the request, then the server responds with the
     * 510 status code.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510}
     */
    510: "Not Extended",

    /**
     * ## 511 Network Authentication Required
     *
     * The HTTP **`511 Network Authentication Required`** response status code indicates that the
     * client needs to authenticate to gain network access.
     *
     * This status is not generated by origin servers, but by intercepting proxies that control
     * access to the network.
     *
     * Network operators sometimes require some authentication, acceptance of terms, or other user
     * interaction before granting access (for example in an internet café or at an airport). They
     * often identify clients who have not done so using their Media Access Control (MAC) addresses.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511}
     */
    511: "Network Authentication Required",
} as const
/**
 * ## 100 Continue
 *
 * The HTTP **`100 Continue`** informational status response code indicates that everything so far
 * is OK and that the client should continue with the request or ignore it if it is already finished.
 *
 * To have a server check the request's headers, a client must send
 * [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect)`: 100-continue` as a header in its initial
 * request and receive a `100 Continue` status code in response before sending the body.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100}
 */
export const httpContinue = 100

/**
 * ## 101 Switching Protocols
 *
 * The HTTP **`101 Switching Protocols`** response code indicates the protocol the server is
 * switching to as requested by a client which sent the message including the
 * [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) request header.
 *
 * The server includes in this response an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade)
 * response header to indicate the protocol it switched to. The process is described in detail in
 * the article [Protocol upgrade mechanism](/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101}
 */
export const switchingProtocols = 101

/**
 * ## Processing
 *
 * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
 *
 * A WebDAV request may contain many sub-requests involving file operations, requiring a long time
 * to complete the request.
 *
 * This code indicates that the server has received and is processing the request, but no response
 * is available yet.
 *
 * This prevents the client from timing out and assuming the request was lost.
 */
export const processing = 102

/**
 * ## 103 Early Hints
 *
 * This page is not complete.
 *
 * The HTTP **`103 Early Hints`** information response status code is primarily intended to be used
 * with the [`Link`](/en-US/docs/Web/HTTP/Headers/Link) header to allow the user agent to start
 * preloading resources while the server is still preparing a response.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103}
 */
export const earlyHints = 103

/**
 * ## 200 OK
 *
 * The HTTP **`200 OK`** success status response code indicates that the request has succeeded. A
 * 200 response is cacheable by default.
 *
 * The meaning of a success depends on the HTTP request method:
 *
 * The successful result of a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or a
 * [`DELETE`](/en-US/docs/Web/HTTP/Methods/DELETE) is often not a `200` `OK` but a
 * [`204`](/en-US/docs/Web/HTTP/Status/204) `No Content` (or a
 * [`201`](/en-US/docs/Web/HTTP/Status/201) `Created` when the resource is uploaded for the first time).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200}
 */
export const ok = 200

/**
 * ## 201 Created
 *
 * The HTTP **`201 Created`** success status response code indicates that the request has succeeded
 * and has led to the creation of a resource. The new resource is effectively created before this
 * response is sent back and the new resource is returned in the body of the message, its location
 * being either the URL of the request, or the content of the
 * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
 *
 * The common use case of this status code is as the result of a
 * [`POST`](/en-US/docs/Web/HTTP/Methods/POST) request.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201}
 */
export const created = 201

/**
 * ## 202 Accepted
 *
 * The HyperText Transfer Protocol (HTTP) **`202 Accepted`** response status code indicates that
 * the request has been accepted for processing, but the processing has not been completed; in
 * fact, processing may not have started yet. The request might or might not eventually be acted
 * upon, as it might be disallowed when processing actually takes place.
 *
 * 202 is non-committal, meaning that there is no way for the HTTP to later send an asynchronous
 * response indicating the outcome of processing the request. It is intended for cases where
 * another process or server handles the request, or for batch processing.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202}
 */
export const accepted = 202

/**
 * ## 203 Non-Authoritative Information
 *
 * The HTTP **`203 Non-Authoritative Information`** response status indicates that the request was
 * successful but the enclosed payload has been modified by a transforming
 * [proxy](/en-US/docs/Glossary/Proxy_server) from that of the origin server's
 * [`200`](/en-US/docs/Web/HTTP/Status/200) (`OK`) response .
 *
 * The `203` response is similar to the value
 * [`214`](/en-US/docs/Web/HTTP/Headers/Warning#warning_codes), meaning `Transformation Applied`,
 * of the [`Warning`](/en-US/docs/Web/HTTP/Headers/Warning) header code, which has the additional
 * advantage of being applicable to responses with any status code.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203}
 */
export const nonAuthoritativeInformation = 203

/**
 * ## 204 No Content
 *
 * The HTTP **`204 No Content`** success status response code indicates that a request has
 * succeeded, but that the client doesn't need to navigate away from its current page.
 *
 * This might be used, for example, when implementing "save and continue editing" functionality for
 * a wiki site. In this case a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) request would be used to
 * save the page, and the `204 No Content` response would be sent to indicate that the editor
 * should not be replaced by some other page.
 *
 * A 204 response is cacheable by default (an [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag) header is
 * included in such a response).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204}
 */
export const noContent = 204

/**
 * ## 205 Reset Content
 *
 * The HTTP **`205 Reset Content`** response status tells the client to reset the document view, so
 * for example to clear the content of a form, reset a canvas state, or to refresh the UI.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205}
 */
export const resetContent = 205

/**
 * ## 206 Partial Content
 *
 * The HTTP **`206 Partial Content`** success status response code indicates that the request has
 * succeeded and the body contains the requested ranges of data, as described in the
 * [`Range`](/en-US/docs/Web/HTTP/Headers/Range) header of the request.
 *
 * If there is only one range, the [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) of
 * the whole response is set to the type of the document, and a
 * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) is provided.
 *
 * If several ranges are sent back, the [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type)
 * is set to `multipart/byteranges` and each fragment covers one range, with
 * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) and
 * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) describing it.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206}
 */
export const partialContent = 206

/**
 * ## Multi-Status
 *
 * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
 *
 * The message body that follows is an XML message and can contain a number of separate response
 * codes, depending on how many sub-requests were made.
 */
export const multiStatus = 207

/**
 * ## Already Reported
 *
 * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
 *
 * The members of a DAV binding have already been enumerated in a preceding part of the
 * (multistatus) response, and are not being included again.
 */
export const alreadyReported = 208

/**
 * ## IM Used
 *
 * **[HTTP Delta encoding](https://datatracker.ietf.org/doc/html/rfc3229)**
 *
 * The server has fulfilled a `GET` request for the resource, and the response is a representation
 * of the result of one or more instance-manipulations applied to the current instance.
 */
export const imUsed = 226

/**
 * ## 300 Multiple Choices
 *
 * The HTTP **`300 Multiple Choices`** redirect status response code indicates that the request has
 * more than one possible responses. The user-agent or the user should choose one of them. As there
 * is no standardized way of choosing one of the responses, this response code is very rarely used.
 *
 * If the server has a preferred choice, it should generate a
 * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300}
 */
export const multipleChoices = 300

/**
 * ## 301 Moved Permanently
 *
 * The HyperText Transfer Protocol (HTTP) **`301 Moved Permanently`** redirect status response code
 * indicates that the resource requested has been definitively moved to the URL given by the
 * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this page
 * and search engines update their links to the resource (in 'SEO-speak', it is said that the
 * 'link-juice' is sent to the new URL).
 *
 * Even if the specification requires the method (and the body) not to be altered when the
 * redirection is performed, not all user-agents align with it - you can still find this type of
 * bugged software out there. It is therefore recommended to use the `301` code only as a response
 * for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD)
 * methods and to use the [`308 Permanent Redirect`](/en-US/docs/Web/HTTP/Status/308) for
 * [`POST`](/en-US/docs/Web/HTTP/Methods/POST) methods instead, as the method change is explicitly
 * prohibited with this status.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301}
 */
export const movedPermanently = 301

/**
 * ## 302 Found
 *
 * The HyperText Transfer Protocol (HTTP) **`302 Found`** redirect status response code indicates
 * that the resource requested has been temporarily moved to the URL given by the
 * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) header. A browser redirects to this page but
 * search engines don't update their links to the resource (in 'SEO-speak', it is said that the
 * 'link-juice' is not sent to the new URL).
 *
 * Even if the specification requires the method (and the body) not to be altered when the
 * redirection is performed, not all user-agents conform here - you can still find this type of
 * bugged software out there. It is therefore recommended to set the `302` code only as a response
 * for [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD)
 * methods and to use [`307 Temporary Redirect`](/en-US/docs/Web/HTTP/Status/307) instead, as the
 * method change is explicitly prohibited in that case.
 *
 * In the cases where you want the method used to be changed to
 * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
 * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give a
 * response to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded resource
 * but a confirmation message such as: 'you successfully uploaded XYZ'.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302}
 */
export const found = 302

/**
 * ## 303 See Other
 *
 * The HyperText Transfer Protocol (HTTP) **`303 See Other`** redirect status response code
 * indicates that the redirects don't link to the newly uploaded resources, but to another page
 * (such as a confirmation page or an upload progress page). This response code is usually sent
 * back as a result of [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) or
 * [`POST`](/en-US/docs/Web/HTTP/Methods/POST). The method used to display this redirected page is
 * always [`GET`](/en-US/docs/Web/HTTP/Methods/GET).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303}
 */
export const seeOther = 303

/**
 * ## 304 Not Modified
 *
 * The HTTP **`304 Not Modified`** client redirection response code indicates that there is no need
 * to retransmit the requested resources. It is an implicit redirection to a cached resource. This
 * happens when the request method is [safe](/en-US/docs/Glossary/Safe/HTTP), like a
 * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or a [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD)
 * request, or when the request is conditional and uses a
 * [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) or a
 * [`If-Modified-Since`](/en-US/docs/Web/HTTP/Headers/If-Modified-Since) header.
 *
 * The equivalent [`200`](/en-US/docs/Web/HTTP/Status/200) `OK` response would have included the
 * headers [`Cache-Control`](/en-US/docs/Web/HTTP/Headers/Cache-Control),
 * [`Content-Location`](/en-US/docs/Web/HTTP/Headers/Content-Location),
 * [`Date`](/en-US/docs/Web/HTTP/Headers/Date), [`ETag`](/en-US/docs/Web/HTTP/Headers/ETag),
 * [`Expires`](/en-US/docs/Web/HTTP/Headers/Expires), and [`Vary`](/en-US/docs/Web/HTTP/Headers/Vary).
 *
 * **Note:** Many [developer tools' network panels](/en-US/docs/Tools/Network_Monitor) of browsers
 * create extraneous requests leading to `304` responses, so that access to the local cache is
 * visible to developers.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304}
 */
export const notModified = 304

/**
 * ## Use Proxy
 *
 * The requested resource is available only through a proxy, the address for which is provided in
 * the response.
 *
 * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with
 * this status code, primarily for security reasons.
 *
 * @deprecated Due to security concerns regarding in-band configuration of a proxy
 * @since HTTP/1.1
 */
export const useProxy = 305

/**
 * ## Switch Proxy
 *
 * Originally meant "Subsequent requests should use the specified proxy".
 *
 * @deprecated No longer used
 * @since HTTP/1.1
 */
export const switchProxy = 306

/**
 * ## 307 Temporary Redirect
 *
 * [HTTP](/en-US/docs/Glossary/HTTP) **`307 Temporary Redirect`** redirect status response code
 * indicates that the resource requested has been temporarily moved to the URL given by the
 * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers.
 *
 * The method and the body of the original request are reused to perform the redirected request. In
 * the cases where you want the method used to be changed to
 * [`GET`](/en-US/docs/Web/HTTP/Methods/GET), use [`303 See
 * Other`](/en-US/docs/Web/HTTP/Status/303) instead. This is useful when you want to give an answer
 * to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT) method that is not the uploaded resources, but a
 * confirmation message (like "You successfully uploaded XYZ").
 *
 * The only difference between `307` and [`302`](/en-US/docs/Web/HTTP/Status/302) is that `307`
 * guarantees that the method and the body will not be changed when the redirected request is made.
 * With `302`, some old clients were incorrectly changing the method to
 * [`GET`](/en-US/docs/Web/HTTP/Methods/GET): the behavior with non-`GET` methods and `302` is then
 * unpredictable on the Web, whereas the behavior with `307` is predictable. For `GET` requests,
 * their behavior is identical.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307}
 */
export const temporaryRedirect = 307

/**
 * ## 308 Permanent Redirect
 *
 * The HyperText Transfer Protocol (HTTP) **`308 Permanent Redirect`** redirect status response
 * code indicates that the resource requested has been definitively moved to the URL given by the
 * [`Location`](/en-US/docs/Web/HTTP/Headers/Location) headers. A browser redirects to this page
 * and search engines update their links to the resource (in 'SEO-speak', it is said that the
 * 'link-juice' is sent to the new URL).
 *
 * The request method and the body will not be altered, whereas
 * [`301`](/en-US/docs/Web/HTTP/Status/301) may incorrectly sometimes be changed to a
 * [`GET`](/en-US/docs/Web/HTTP/Methods/GET) method.
 *
 * **Note:** Some Web applications may use the `308 Permanent Redirect` in a non-standard way and
 * for other purposes. For example, Google Drive uses a `308 Resume Incomplete` response to
 * indicate to the client when an incomplete upload stalled. (See [Perform a resumable
 * download](https://developers.google.com/drive/v3/web/manage-uploads#resumable) on Google Drive
 * documentation.)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308}
 */
export const permanentRedirect = 308

/**
 * ## 400 Bad Request
 *
 * The HyperText Transfer Protocol (HTTP) **`400 Bad Request`** response status code indicates that
 * the server cannot or will not process the request due to something that is perceived to be a
 * client error (e.g., malformed request syntax, invalid request message framing, or deceptive
 * request routing).
 *
 * **Warning:** The client should not repeat this request without modification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400}
 */
export const badRequest = 400

/**
 * ## 401 Unauthorized
 *
 * The HTTP **`401 Unauthorized`** client error status response code indicates that the request has
 * not been applied because it lacks valid authentication credentials for the target resource.
 *
 * This status is sent with a [`WWW-Authenticate`](/en-US/docs/Web/HTTP/Headers/WWW-Authenticate)
 * header that contains information on how to authorize correctly.
 *
 * This status is similar to [`403`](/en-US/docs/Web/HTTP/Status/403), but in this case,
 * authentication is possible.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401}
 */
export const unauthorized = 401

/**
 * ## 402 Payment Required
 *
 * **This is an [experimental
 * technology](/en-US/docs/MDN/Guidelines/Conventions_definitions#experimental)** Check the
 * [Browser compatibility table](#browser_compatibility) carefully before using this in production.
 *
 * The HTTP **`402 Payment Required`** is a nonstandard client error status response code that is
 * reserved for future use.
 *
 * Sometimes, this code indicates that the request can not be processed until the client makes a
 * payment. Originally it was created to enable digital cash or (micro) payment systems and would
 * indicate that the requested content is not available until the client makes a payment. However,
 * no standard use convention exists and different entities use it in different contexts.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402}
 */
export const paymentRequired = 402

/**
 * ## 403 Forbidden
 *
 * The HTTP **`403 Forbidden`** client error status response code indicates that the server
 * understood the request but refuses to authorize it.
 *
 * This status is similar to [`401`](/en-US/docs/Web/HTTP/Status/401), but in this case,
 * re-authenticating will make no difference. The access is permanently forbidden and tied to the
 * application logic, such as insufficient rights to a resource.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403}
 */
export const forbidden = 403

/**
 * ## 404 Not Found
 *
 * The HTTP **`404 Not Found`** client error response code indicates that the server can't find the
 * requested resource. Links that lead to a 404 page are often called broken or dead links and can
 * be subject to [link rot](https://en.wikipedia.org/wiki/Link_rot).
 *
 * A 404 status code does not indicate whether the resource is temporarily or permanently missing.
 * But if a resource is permanently removed, a [`410`](/en-US/docs/Web/HTTP/Status/410) (Gone)
 * should be used instead of a 404 status.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404}
 */
export const notFound = 404

/**
 * ## 405 Method Not Allowed
 *
 * The HyperText Transfer Protocol (HTTP) **`405 Method Not Allowed`** response status code
 * indicates that the request method is known by the server but is not supported by the target resource.
 *
 * The server **must** generate an **`Allow`** header field in a 405 response containing a list of
 * the target resource's currently supported methods.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405}
 */
export const methodNotAllowed = 405

/**
 * ## 406 Not Acceptable
 *
 * The HyperText Transfer Protocol (HTTP) **`406 Not Acceptable`** client error response code
 * indicates that the server cannot produce a response matching the list of acceptable values
 * defined in the request's proactive [content
 * negotiation](/en-US/docs/Web/HTTP/Content_negotiation) headers, and that the server is unwilling
 * to supply a default representation.
 *
 * Proactive content negotiation headers include:
 *
 * In practice, this error is very rarely used. Instead of responding using this error code, which
 * would be cryptic for the end user and difficult to fix, servers ignore the relevant header and
 * serve an actual page to the user. It is assumed that even if the user won't be completely happy,
 * they will prefer this to an error code.
 *
 * If a server returns such an error status, the body of the message should contain the list of the
 * available representations of the resources, allowing the user to choose among them.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406}
 */
export const notAcceptable = 406

/**
 * ## 407 Proxy Authentication Required
 *
 * The HTTP **`407 Proxy Authentication Required`** client error status response code indicates
 * that the request has not been applied because it lacks valid authentication credentials for a
 * [proxy server](/en-US/docs/Glossary/Proxy_server) that is between the browser and the server
 * that can access the requested resource.
 *
 * This status is sent with a
 * [`Proxy-Authenticate`](/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate) header that contains
 * information on how to authorize correctly.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407}
 */
export const proxyAuthenticationRequired = 407

/**
 * ## 408 Request Timeout
 *
 * The HyperText Transfer Protocol (HTTP) **`408 Request Timeout`** response status code means that
 * the server would like to shut down this unused connection. It is sent on an idle connection by
 * some servers, *even without any previous request by the client*.
 *
 * A server should send the "close" [`Connection`](/en-US/docs/Web/HTTP/Headers/Connection) header
 * field in the response, since `408` implies that the server has decided to close the connection
 * rather than continue waiting.
 *
 * This response is used much more since some browsers, like Chrome, Firefox 27+, and IE9, use HTTP
 * pre-connection mechanisms to speed up surfing.
 *
 * **Note:** some servers merely shut down the connection without sending this message.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408}
 */
export const requestTimeout = 408

/**
 * ## 409 Conflict
 *
 * The HTTP **`409 Conflict`** response status code indicates a request conflict with current state
 * of the target resource.
 *
 * Conflicts are most likely to occur in response to a [`PUT`](/en-US/docs/Web/HTTP/Methods/PUT)
 * request. For example, you may get a 409 response when uploading a file which is older than the
 * one already on the server resulting in a version control conflict.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409}
 */
export const conflict = 409

/**
 * ## 410 Gone
 *
 * The HyperText Transfer Protocol (HTTP) **`410 Gone`** client error response code indicates that
 * access to the target resource is no longer available at the origin server and that this
 * condition is likely to be permanent.
 *
 * If you don't know whether this condition is temporary or permanent, a
 * [`404`](/en-US/docs/Web/HTTP/Status/404) status code should be used instead.
 *
 * **Note:** A 410 response is cacheable by default.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410}
 */
export const gone = 410

/**
 * ## 411 Length Required
 *
 * The HyperText Transfer Protocol (HTTP) **`411 Length Required`** client error response code
 * indicates that the server refuses to accept the request without a defined
 * [`Content-Length`](/en-US/docs/Web/HTTP/Headers/Content-Length) header.
 *
 * **Note:** by specification, when sending data in a series of chunks, the `Content-Length` header
 * is omitted and at the beginning of each chunk you need to add the length of the current chunk in
 * hexadecimal format. See [`Transfer-Encoding`](/en-US/docs/Web/HTTP/Headers/Transfer-Encoding)
 * for more details.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411}
 */
export const lengthRequired = 411

/**
 * ## 412 Precondition Failed
 *
 * The HyperText Transfer Protocol (HTTP) **`412 Precondition Failed`** client error response code
 * indicates that access to the target resource has been denied. This happens with conditional
 * requests on methods other than [`GET`](/en-US/docs/Web/HTTP/Methods/GET) or
 * [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD) when the condition defined by the
 * [`If-Unmodified-Since`](/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since) or
 * [`If-None-Match`](/en-US/docs/Web/HTTP/Headers/If-None-Match) headers is not fulfilled. In that
 * case, the request, usually an upload or a modification of a resource, cannot be made and this
 * error response is sent back.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412}
 */
export const preconditionFailed = 412

/**
 * ## 413 Payload Too Large
 *
 * The HTTP **`413 Payload Too Large`** response status code indicates that the request entity is
 * larger than limits defined by server; the server might close the connection or return a
 * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header field.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413}
 */
export const payloadTooLarge = 413

/**
 * ## 414 URI Too Long
 *
 * The HTTP **`414 URI Too Long`** response status code indicates that the URI requested by the
 * client is longer than the server is willing to interpret.
 *
 * There are a few rare conditions when this might occur:
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414}
 */
export const uriTooLong = 414

/**
 * ## 415 Unsupported Media Type
 *
 * The HTTP **`415 Unsupported Media Type`** client error response code indicates that the server
 * refuses to accept the request because the payload format is in an unsupported format.
 *
 * The format problem might be due to the request's indicated
 * [`Content-Type`](/en-US/docs/Web/HTTP/Headers/Content-Type) or
 * [`Content-Encoding`](/en-US/docs/Web/HTTP/Headers/Content-Encoding), or as a result of
 * inspecting the data directly.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415}
 */
export const unsupportedMediaType = 415

/**
 * ## 416 Range Not Satisfiable
 *
 * The HyperText Transfer Protocol (HTTP) **`416 Range Not Satisfiable`** error response code
 * indicates that a server cannot serve the requested ranges. The most likely reason is that the
 * document doesn't contain such ranges, or that the [`Range`](/en-US/docs/Web/HTTP/Headers/Range)
 * header value, though syntactically correct, doesn't make sense.
 *
 * The `416` response message contains a
 * [`Content-Range`](/en-US/docs/Web/HTTP/Headers/Content-Range) indicating an unsatisfied range
 * (that is a `'*'`) followed by a `'/'` and the current length of the resource. E.g.
 * `Content-Range: bytes *​/12777`
 *
 * Faced with this error, browsers usually either abort the operation (for example, a download will
 * be considered as non-resumable) or ask for the whole document again.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416}
 */
export const rangeNotSatisfiable = 416

/**
 * ## 417 Expectation Failed
 *
 * The HTTP **`417 Expectation Failed`** client error response code indicates that the expectation
 * given in the request's [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header could not be met.
 *
 * See the [`Expect`](/en-US/docs/Web/HTTP/Headers/Expect) header for more details.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417}
 */
export const expectationFailed = 417

/**
 * ## 418 I'm a teapot
 *
 * The HTTP **`418 I'm a teapot`** client error response code indicates that the server refuses to
 * brew coffee because it is, permanently, a teapot. A combined coffee/tea pot that is temporarily
 * out of coffee should instead return 503. This error is a reference to Hyper Text Coffee Pot
 * Control Protocol defined in April Fools' jokes in 1998 and 2014.
 *
 * Some websites use this response for requests they do not wish to handle, such as automated queries.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418}
 */
export const imATeapot = 418

/**
 * ## Misdirected Request
 *
 * The request was directed at a server that is not able to produce a response. This can be sent by
 * a server that is not configured to produce responses for the combination of scheme and authority
 * that are included in the request URI.
 */
export const misdirectedRequest = 421

/**
 * ## 422 Unprocessable Entity
 *
 * The HyperText Transfer Protocol (HTTP) **`422 Unprocessable Entity`** response status code
 * indicates that the server understands the content type of the request entity, and the syntax of
 * the request entity is correct, but it was unable to process the contained instructions.
 *
 * **Warning:** The client should not repeat this request without modification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422}
 */
export const unprocessableEntity = 422

/**
 * ## Locked
 *
 * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
 *
 * The resource that is being accessed is locked.
 */
export const locked = 423

/**
 * ## Failed Dependency
 *
 * **[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)**
 *
 * The request failed due to failure of a previous request.
 */
export const failedDependency = 424

/**
 * ## 426 Upgrade Required
 *
 * The HTTP **`426 Upgrade Required`** client error response code indicates that the server refuses
 * to perform the request using the current protocol but might be willing to do so after the client
 * upgrades to a different protocol.
 *
 * The server sends an [`Upgrade`](/en-US/docs/Web/HTTP/Headers/Upgrade) header with this response
 * to indicate the required protocol(s).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426}
 */
export const upgradeRequired = 426

/**
 * ## 428 Precondition Required
 *
 * The HTTP **`428 Precondition Required`** response status code indicates that the server requires
 * the request to be [conditional](/en-US/docs/Web/HTTP/Conditional_requests).
 *
 * Typically, this means that a required precondition header, such as
 * [`If-Match`](/en-US/docs/Web/HTTP/Headers/If-Match), **is missing**.
 *
 * When a precondition header is **not matching** the server side state, the response should be
 * [`412`](/en-US/docs/Web/HTTP/Status/412) `Precondition Failed`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428}
 */
export const preconditionRequired = 428

/**
 * ## 429 Too Many Requests
 *
 * The HTTP **`429 Too Many Requests`** response status code indicates the user has sent too many
 * requests in a given amount of time ("rate limiting").
 *
 * A [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header might be included to this
 * response indicating how long to wait before making a new request.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429}
 */
export const tooManyRequests = 429

/**
 * ## 431 Request Header Fields Too Large
 *
 * The HTTP **`431 Request Header Fields Too Large`** response status code indicates that the
 * server refuses to process the request because the request's [HTTP
 * headers](/en-US/docs/Web/HTTP/Headers) are too long. The request *may* be resubmitted after
 * reducing the size of the request headers.
 *
 * 431 can be used when the **total size** of request headers is too large, or when a **single**
 * header field is too large. To help those running into this error, indicate which of the two is
 * the problem in the response body — ideally, also include which headers are too large. This lets
 * users attempt to fix the problem, such as by clearing their cookies.
 *
 * Servers will often produce this status if:
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431}
 */
export const requestHeaderFieldsTooLarge = 431

/**
 * ## 451 Unavailable For Legal Reasons
 *
 * The HyperText Transfer Protocol (HTTP) **`451 Unavailable For Legal Reasons`** client error
 * response code indicates that the user requested a resource that is not available due to legal
 * reasons, such as a web page for which a legal action has been issued.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451}
 */
export const unavailableForLegalReasons = 451

/**
 * ## 500 Internal Server Error
 *
 * The HyperText Transfer Protocol (HTTP) **`500 Internal Server Error`** server error response
 * code indicates that the server encountered an unexpected condition that prevented it from
 * fulfilling the request.
 *
 * This error response is a generic "catch-all" response. Usually, this indicates the server cannot
 * find a better 5xx error code to response. Sometimes, server administrators log error responses
 * like the 500 status code with more details about the request to prevent the error from happening
 * again in the future.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
 */
export const internalError = 500

/**
 * ## 500 Internal Server Error
 *
 * The HyperText Transfer Protocol (HTTP) **`500 Internal Server Error`** server error response
 * code indicates that the server encountered an unexpected condition that prevented it from
 * fulfilling the request.
 *
 * This error response is a generic "catch-all" response. Usually, this indicates the server cannot
 * find a better 5xx error code to response. Sometimes, server administrators log error responses
 * like the 500 status code with more details about the request to prevent the error from happening
 * again in the future.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
 */
export const internalServerError = 500

/**
 * ## 501 Not Implemented
 *
 * The HyperText Transfer Protocol (HTTP) **`501 Not Implemented`** server error response code
 * means that **the server does not support the functionality required to fulfill the request**.
 *
 * This status can also send a [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) header,
 * telling the requester when to check back to see if the functionality is supported by then.
 *
 * `501` is the appropriate response when the server does not recognize the request method and is
 * incapable of supporting it for any resource. The only methods that servers are required to
 * support (and therefore that must not return `501`) are [`GET`](/en-US/docs/Web/HTTP/Methods/GET)
 * and [`HEAD`](/en-US/docs/Web/HTTP/Methods/HEAD).
 *
 * If the server *does* recognize the method, but intentionally does not support it, the
 * appropriate response is [`405 Method Not Allowed`](/en-US/docs/Web/HTTP/Status/405).
 *
 * **Note:**
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501}
 */
export const notImplemented = 501

/**
 * ## 502 Bad Gateway
 *
 * The HyperText Transfer Protocol (HTTP) **`502 Bad Gateway`** server error response code
 * indicates that the server, while acting as a gateway or proxy, received an invalid response from
 * the upstream server.
 *
 * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might refer to
 * different things in networking and a 502 error is usually not something you can fix, but
 * requires a fix by the web server or the proxies you are trying to get access through.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502}
 */
export const badGateway = 502

/**
 * ## 503 Service Unavailable
 *
 * The HyperText Transfer Protocol (HTTP) **`503 Service Unavailable`** server error response code
 * indicates that the server is not ready to handle the request.
 *
 * Common causes are a server that is down for maintenance or that is overloaded. This response
 * should be used for temporary conditions and the
 * [`Retry-After`](/en-US/docs/Web/HTTP/Headers/Retry-After) HTTP header should, if possible,
 * contain the estimated time for the recovery of the service.
 *
 * **Note:** together with this response, a user-friendly page explaining the problem should be sent.
 *
 * Caching-related headers that are sent along with this response should be taken care of, as a 503
 * status is often a temporary condition and responses shouldn't usually be cached.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503}
 */
export const serviceUnavailable = 503

/**
 * ## 504 Gateway Timeout
 *
 * The HyperText Transfer Protocol (HTTP) **`504 Gateway Timeout`** server error response code
 * indicates that the server, while acting as a gateway or proxy, did not get a response in time
 * from the upstream server that it needed in order to complete the request.
 *
 * **Note:** A [Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)) might refer to
 * different things in networking and a 504 error is usually not something you can fix, but
 * requires a fix by the web server or the proxies you are trying to get access through.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504}
 */
export const gatewayTimeout = 504

/**
 * ## 505 HTTP Version Not Supported
 *
 * The HyperText Transfer Protocol (HTTP) **`505 HTTP Version Not Supported`** response status code
 * indicates that the HTTP version used in the request is not supported by the server.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505}
 */
export const httpVersionNotSupported = 505

/**
 * ## 506 Variant Also Negotiates
 *
 * The HyperText Transfer Protocol (HTTP) **`506 Variant Also Negotiates`** response status code
 * may be given in the context of Transparent Content Negotiation (see [RFC
 * 2295](https://datatracker.ietf.org/doc/html/rfc2295)). This protocol enables a client to
 * retrieve the best variant of a given resource, where the server supports multiple variants.
 *
 * The **`Variant Also Negotiates`** status code indicates an internal server configuration error
 * in which the chosen variant is itself configured to engage in content negotiation, so is not a
 * proper negotiation endpoint.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506}
 */
export const variantAlsoNegotiates = 506

/**
 * ## 507 Insufficient Storage
 *
 * The HyperText Transfer Protocol (HTTP) **`507 Insufficient Storage`** response status code may
 * be given in the context of the Web Distributed Authoring and Versioning (WebDAV) protocol (see
 * [RFC 4918](https://datatracker.ietf.org/doc/html/rfc4918)).
 *
 * It indicates that a method could not be performed because the server cannot store the
 * representation needed to successfully complete the request.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507}
 */
export const insufficientStorage = 507

/**
 * ## 508 Loop Detected
 *
 * The HyperText Transfer Protocol (HTTP) **`508 Loop Detected`** response status code may be given
 * in the context of the Web Distributed Authoring and Versioning (WebDAV) protocol.
 *
 * It indicates that the server terminated an operation because it encountered an infinite loop
 * while processing a request with "Depth: infinity". This status indicates that the entire
 * operation failed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508}
 */
export const loopDetected = 508

/**
 * ## 510 Not Extended
 *
 * The HyperText Transfer Protocol (HTTP) **`510 Not Extended`** response status code is sent in
 * the context of the HTTP Extension Framework, defined in [RFC
 * 2774](https://datatracker.ietf.org/doc/html/rfc2774).
 *
 * In that specification a client may send a request that contains an extension declaration, that
 * describes the extension to be used. If the server receives such a request, but any described
 * extensions are not supported for the request, then the server responds with the 510 status code.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510}
 */
export const notExtended = 510

/**
 * ## 511 Network Authentication Required
 *
 * The HTTP **`511 Network Authentication Required`** response status code indicates that the
 * client needs to authenticate to gain network access.
 *
 * This status is not generated by origin servers, but by intercepting proxies that control access
 * to the network.
 *
 * Network operators sometimes require some authentication, acceptance of terms, or other user
 * interaction before granting access (for example in an internet café or at an airport). They
 * often identify clients who have not done so using their Media Access Control (MAC) addresses.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511}
 */
export const networkAuthenticationRequired = 511

export {Status as Statuses, phraseStatus as phraseStatuses, status as statuses}

export default status

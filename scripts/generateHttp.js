import Case from "case"
import {JSDOM} from "jsdom"
import {dirname} from "path"
import fetch from "node-fetch"
import {fileURLToPath} from "url"
import prettier from "prettier"
import {promises as fs} from "fs"
import TurndownService from "turndown"

const td = new TurndownService({
    strongDelimiter: "__", // Avoid stars for JSDoc formatting. Will be converted by prettier later.
})

const __dirname = dirname(fileURLToPath(import.meta.url))

const header = `/**
 * Utility functions
 *
 * @module
 * @license 0BSD
 * @author Luke Zhang (https://luke-zhang-04.github.io)
 * @file HTTP status codes and their names exported as a const enum, an object, and named exports
 */

/* eslint-disable max-lines, no-shadow, no-irregular-whitespace */
// tsdoc/syntax throws errors when a closing code backtick is on a newline
/* eslint-disable tsdoc/syntax */
`

const objectHeader = `/**
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
 */`

const statuses = [
    100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304,
    305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
    415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505,
    506, 507, 508, 510, 511,
]

const aliases = {
    internalServerError: "internalError",
}

const zeroWidthCharacter = "\u200B"

const replaceHTML = (html) =>
    td
        .turndown(html)
        .replace(/\*\//gu, `*${zeroWidthCharacter}/`)
        .trim()
        .replace(/[ \t]+\n/gu, "\n")

const extraCodes = {
    102: [
        "Processing",
        `__[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)__

A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request.

This code indicates that the server has received and is processing the request, but no response is available yet.

This prevents the client from timing out and assuming the request was lost.`,
    ],
    207: [
        "Multi-Status",
        `__[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)__

The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.`,
    ],
    208: [
        "Already Reported",
        `__[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)__

The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.`,
    ],
    226: [
        "IM Used",
        `__[HTTP Delta encoding](https://datatracker.ietf.org/doc/html/rfc3229)__

The server has fulfilled a \`GET\` request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.`,
    ],
    305: [
        "Use Proxy",
        `The requested resource is available only through a proxy, the address for which is provided in the response.

Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.

@since HTTP/1.1
@deprecated due to security concerns regarding in-band configuration of a proxy`,
    ],
    306: [
        "Switch Proxy",
        `Originally meant "Subsequent requests should use the specified proxy".

@since HTTP/1.1
@deprecated No longer used`,
    ],
    421: [
        "Misdirected Request",
        `The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.`,
    ],
    423: [
        "Locked",
        `__[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)__

The resource that is being accessed is locked.`,
    ],
    424: [
        "Failed Dependency",
        `__[WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV)__

The request failed due to failure of a previous request.`,
    ],
}

const camelCaseName = (name) => {
    if (name.startsWith("URI")) {
        return `uri${Case.pascal(name.slice(3))}`
    } else if (name.startsWith("IM")) {
        return `im${Case.pascal(name.slice(2))}`
    } else if (name.startsWith("HTTP")) {
        return `http${Case.pascal(name.slice(4))}`
    }

    return Case.camel(name)
}

const getDocsForPage = async (statusCode) => {
    if (statusCode in extraCodes) {
        const data = extraCodes[statusCode]

        return [data[0], `## ${data[0]}\n\n${data[1]}`]
    }

    const response = await fetch(
        `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${statusCode}`,
    )

    if (response.status === 404) {
        return ""
    }

    const {
        window: {document},
    } = new JSDOM(await response.text())

    const text = Array.from(
        document.querySelector(".main-page-content > div").getElementsByTagName("p"),
    )
        .map((para) => replaceHTML(para.innerHTML.replace(/\n( )*/gu, " ")))
        .join("\n\n * ")
    const title = document.querySelector(".main-page-content h1").innerHTML
    const name = title.slice(4)

    return [
        name,
        `## ${title}

 * ${text}

 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${statusCode}}`,
    ]
}

const generateConstEnum = (docs) => `\n${objectHeader}
export const enum Status {
${Object.entries(docs)
    .map(([code, [name, doc]]) => {
        const possibleAlias = aliases[Case.camel(name)]
        const possibleAliasEntry = possibleAlias
            ? `/** ${doc} */\n${Case.pascal(possibleAlias)} = ${code},\n\n`
            : ""

        return `${possibleAliasEntry}/** ${doc} */\n${Case.pascal(name)} = ${code},`
    })
    .join("\n\n")}
}
`

const generateObject = (docs) => `\n${objectHeader}
export const status = {
${Object.entries(docs)
    .map(([code, [name, doc]]) => {
        const camelName = camelCaseName(name)
        const possibleAlias = aliases[camelName]
        const possibleAliasEntry = possibleAlias
            ? `/** ${doc} */\n${Case.camel(possibleAlias)}: ${code},\n\n`
            : ""

        return `${possibleAliasEntry}/** ${doc} */\n${camelName}: ${code},\n\n/** ${doc} */\n${code}: ${JSON.stringify(
            camelName,
        )},`
    })
    .join("\n\n")}
} as const
`

const generatePhraseObject = (docs) => `\n${objectHeader}
export const phraseStatus = {
${Object.entries(docs)
    .map(([code, [name, doc]]) => `/** ${doc} */\n${code}: ${JSON.stringify(Case.capital(name))},`)
    .join("\n\n")}
} as const`

const generateNamedExports = (docs) =>
    Object.entries(docs)
        .map(([code, [name, doc]]) => {
            const camelName = camelCaseName(name)
            const possibleAlias = aliases[camelName]
            const possibleAliasEntry = possibleAlias
                ? `/** ${doc} */\nexport const ${Case.camel(possibleAlias)} = ${code}\n\n`
                : ""

            return `\n${possibleAliasEntry}/** ${doc} */\nexport const ${
                camelName === "continue" ? "httpContinue" : camelName
            } = ${code}`
        })
        .join("\n")

const docs = Object.fromEntries(
    await Promise.all(statuses.map(async (status) => [status, await getDocsForPage(status)])),
)

console.log(`Got ${statuses.length} statuses`)

const output =
    header +
    generateConstEnum(docs) +
    generateObject(docs) +
    generatePhraseObject(docs) +
    generateNamedExports(docs) +
    "\n\nexport {Status as Statuses, phraseStatus as phraseStatuses, status as statuses}\n\nexport default status" +
    "\n"

const prettierConfig = {
    ...(await prettier.resolveConfig(`${__dirname}/..`)),
    parser: "typescript",
}

fs.writeFile(
    `${__dirname}/../src/http.ts`,
    prettier.format(prettier.format(output, prettierConfig), prettierConfig),
    "utf8",
)

console.log("done")

const bitsPerByte = 8

// istanbul ignore next
export const getKeyLengthFromAlgo = (algo: string): number | undefined => {
    const length = algo.match(/aes-(?<length>[0-9]{3})-[A-z]{3}/u)?.groups?.length

    return length === undefined ? undefined : Number(length) / bitsPerByte
}

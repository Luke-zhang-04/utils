export {}

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeEqualArray(array: unknown[]): CustomMatcherResult
        }
    }
}

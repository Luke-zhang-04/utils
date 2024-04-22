expect.extend({
    toBeEqualArray: (act: unknown[], exp: unknown[]): jest.CustomMatcherResult => {
        return {
            message: () =>
                `expected that ${JSON.stringify(act, null, 2)} equals ${JSON.stringify(
                    exp,
                    null,
                    2,
                )}`,
            pass: (() => {
                if (act.length !== exp.length) {
                    return false
                }

                for (let i = 0; i < act.length; i++) {
                    if (act[i] !== exp[i]) {
                        return false
                    }
                }

                return true
            })(),
        }
    },
})

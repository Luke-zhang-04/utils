# Utilities

[![Test Coverage](https://api.codeclimate.com/v1/badges/fcd61de6806fd794213c/test_coverage)](https://codeclimate.com/github/Luke-zhang-04/utils/test_coverage)
[![Tests](https://img.shields.io/github/workflow/status/luke-zhang-04/utils/Node.js%20CI?label=tests&logo=github)](https://github.com/Luke-zhang-04/utils/actions/workflows/CI.yml)

Useful utility functions without the bloat of Lodash. Lodash contains many unecessary functions, and have functions which rely on eachother, creating massive bundles even if you only used one function. These utilities are tree-shakeable, independent (some exceptions), pure functions and are built with performance in mind. I use these functions in my own projects.

Even though most of these functions are trivial to write, it becomes annoying to have to write them over and over again, so I put them into a repo that can be installed with a package manager.

Included are also wrappers around existing APIs. For example, the Node Crypto API is hard to use, and requires many steps. The functions in `node/crypto` allow for easy hashing and encryption.

## Installation

Install directly from Github.

**To install with semver:**

```
npm i Luke-zhang-04/utils#semver:<semver>
pnpm add Luke-zhang-04/utils#semver:<semver>
yarn add Luke-zhang-04/utils#semver:<semver>
```

E.g

```
npm i Luke-zhang-04/utils#semver:^1.0.0
```

**To install a specific version:**

```
npm i Luke-zhang-04/utils#v<version>
pnpm add Luke-zhang-04/utils#v<version>
yarn add Luke-zhang-04/utils#v<version>
```

Or

```
npm i https://github.com/Luke-zhang-04/utils/releases/download/v<version>utils.tar.gz
pnpm add https://github.com/Luke-zhang-04/utils/releases/download/v<version>utils.tar.gz
yarn add https://github.com/Luke-zhang-04/utils/releases/download/v<version>utils.tar.gz
```

**"Rolling release"**

```
npm i Luke-zhang-04/utils#dist
pnpm add Luke-zhang-04/utils#dist
yarn add Luke-zhang-04/utils#dist
```

**To install a specific commit:**

```
npm i Luke-zhang-04/utils#<Commit hash>
pnpm add Luke-zhang-04/utils#<Commit hash>
yarn add Luke-zhang-04/utils#<Commit hash>
```

Make sure the commits are specifically from the dist branch.

## Usage

Visit the [wiki](https://github.com/Luke-zhang-04/utils/wiki) for documentation

### Importing

It is recommened that either named or star imports are used. Default imports may not be tree-shaken properly.

Imports from the `cjs` directory do not work. Node will automatically map imports to cjs or mjs based on the running program.

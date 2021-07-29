# Utilities

Useful utility functions without the bloat of Lodash. Lodash contains many unecessary functions, and have functions which rely on eachother, creating massive bundles even if you only used one function. These utilities are tree-shakeable, independent (some exceptions), pure functions and are built with performance in mind. I use these functions in my own projects.

Even though most of these functions are trivial to write, it becomes annoying to have to write them over and over again, so I put them into a repo that can be installed with a package manager.

Included are also wrappers around existing APIs. For example, the Node Crypto API is hard to use, and requires many steps. The functions in `node/crypto` allow for easy hashing and encryption.

## Installation

Install directly from Github.

"Rolling release"

```
npm i Luke-zhang-04/utilities#dist
pnpm add Luke-zhang-04/utilities#dist
yarn add Luke-zhang-04/utilities#dist
```

To install a specific commit:

```
npm i Luke-zhang-04/utilities#<Commit hash>
pnpm add Luke-zhang-04/utilities#<Commit hash>
yarn add Luke-zhang-04/utilities#<Commit hash>
```

Make sure the commits are specifically from the dist branch.

## Usage

Visit the [wiki](https://github.com/Luke-zhang-04/utils/wiki) for documentation

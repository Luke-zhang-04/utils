# Utilities

Useful utility functions without the bloat of Lodash. Ladash contains many unecessary functions, and have functions which rely on eachother. These utilities are tree-shakeable, independent, and are built with performance in mind. I find myself using these functions often.

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

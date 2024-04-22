#!/bin/sh

__dirname="$(dirname "$0")"

rm -rf "$__dirname/dist"
mkdir "$__dirname/dist"

"$__dirname/node_modules/.bin/tsc" -p "$__dirname/tsconfig.json" --outDir "$__dirname/dist" --incremental false --tsBuildInfoFile null
"$__dirname/node_modules/.bin/tsc" -p "$__dirname/tsconfig.json" --outDir "$__dirname/dist/cjs" --module commonjs --moduleResolution node --incremental false --tsBuildInfoFile null

# for f in dist/cjs/*.js; do
#     mv -- "$f" "${f%.js}.cjs"
# done

cp -v "$__dirname/LICENSE" "$__dirname/package".json "$__dirname/README".md "$__dirname/dist"
echo '{"private": false, "type": "commonjs"}' > "$__dirname/dist/cjs/package.json"

node "$__dirname/scripts/generatePackageExports.mjs"

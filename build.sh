#!/bin/sh

tsc --outDir dist --incremental false --tsBuildInfoFile null
tsc --outDir dist/cjs --module commonjs --incremental false --tsBuildInfoFile null --sourceMap false

# for f in dist/cjs/*.js; do
#     mv -- "$f" "${f%.js}.cjs"
# done

cp LICENSE package.json README.md dist
echo '{"private": false, "type": "commonjs"}' > dist/cjs/package.json

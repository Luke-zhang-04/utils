#!/bin/sh

tsc --outDir dist --incremental false --tsBuildInfoFile null
tsc --outDir dist/cjs --module commonjs --incremental false --tsBuildInfoFile null
cp LICENSE package.json README.md dist
node -e "console.log(JSON.stringify({...$(cat package.json), type: \"commonjs\"}, null, 2))" > dist/cjs/package.json

#!/usr/bin/bash
# This script requires jq, perl, sed
cd dist || exit
wasmbestand="$(echo *.wasm)"
sed -i 's/new Worker([^.)]*.[^+)]*+"bundle.worker.js")/new Worker(window.URL.createObjectURL(new Blob(['"$(
	jq  -n --arg content "$(cat bundle.worker.js )" '{ tc : $content }' | jq '.tc'|sed -e 's!\\!\\\\!g' -e 's!/!\\/!g' -e 's!&!\\\&!g'
)"'])));/g' bundle.js
perl ../wasminject.pl "${wasmbestand}" bundle.js
rm bundle.worker.js "${wasmbestand}"
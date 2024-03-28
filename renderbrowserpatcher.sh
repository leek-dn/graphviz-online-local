#!/bin/bash
# a small script to patch the render.browser.js function to allow wasm
cp src/render.browser.js src/render.browser.js.orig
sed 's@WebAssembly\.instantiateStreaming\(||.*\)||"function"!=typeof fetch?\(.*\):fetch(\(.*\),{credentials:"same-origin"})\.then(.*WebAssembly\.instantiateStreaming(\(.*\),\(.*\))\.then(e,(function(\(.*\)){return \(.*\)(["`]wasm streaming compile failed: \(.*\)),\7("falling back to ArrayBuffer instantiation"),\2}))))@'\
'WebAssembly.instantiate\1?\2:WebAssembly.instantiate(new Uint8Array([55834]),\5).then(e,(function(n){return l("wasm streaming compile failed: "+n),l("falling back to ArrayBuffer instantiation"),\2}))@' src/render.browser.js.orig > src/render.browser.js
rm src/render.browser.js.orig
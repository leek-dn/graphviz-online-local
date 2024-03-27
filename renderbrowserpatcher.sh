#!/bin/bash
# a small script to patch the render.browser.js function to allow wasm
cp src/render.browser.js src/render.browser.js.orig
sed 's@WebAssembly\.instantiateStreaming||I()||"function"!=typeof fetch?a(e):fetch(O,{credentials:"same-origin"})\.then((function(n){return WebAssembly\.instantiateStreaming(n,i)\.then(e,(function(n){return l("wasm streaming compile failed: "+n),l("falling back to ArrayBuffer instantiation"),a(e)}))}))@WebAssembly.instantiate||I()?a(e):WebAssembly.instantiate(new Uint8Array([55834]),i).then(e,(function(n){return l("wasm streaming compile failed: "+n),l("falling back to ArrayBuffer instantiation"),a(e)}))@' src/render.browser.js.orig > src/render.browser.js
rm src/render.browser.js.orig
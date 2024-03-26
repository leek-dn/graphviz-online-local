import loadWASM from "./render.browser.js";
import wasmLocation from "./render.wasm";

loadWASM({
  locateFile: () => wasmLocation,
});

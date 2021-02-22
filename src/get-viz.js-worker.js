import loadWASM from "@aduh95/viz.js/worker";
import wasmLocation from "file-loader!@aduh95/viz.js/wasm";

loadWASM({
  locateFile: () => wasmLocation,
});

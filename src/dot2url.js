import Viz from "@aduh95/viz.js";
import VizWorker from "worker-loader!./get-viz.js-worker.js";

let viz, previousURL;
export default (dot, options) => {
  if (viz === undefined) {
    viz = new Viz({ worker: new VizWorker() });
  }
  return viz.renderString(dot, options).then((svg) => {
    const file = new File([svg], "diagram.svg", {
      type: "image/svg+xml",
    });
    URL.revokeObjectURL(previousURL);
    previousURL = URL.createObjectURL(file);
    return previousURL;
  });
};

import Viz from "@aduh95/viz.js";
import { text } from "@fortawesome/fontawesome-svg-core";
import VizWorker from "worker-loader!./get-viz.js-worker.js";
import svgPanZoom from "./svg-pan-zoom.min.js";

let viz, previousURL;
export default (dot, options) => {
  if (viz === undefined) {
    viz = new Viz({ worker: new VizWorker() });
  }
  return viz.renderString(dot, options).then((svg) => {
	var format = document.getElementsByName("format")[0].value;
	var rawOutput = document.getElementsByName("isRawOutput")[0].checked;
	if ((format=="svg"||format=="")&&!rawOutput) {
		document.getElementsByClassName("element")[0].innerHTML = svg;
		var theSVG = document.getElementsByClassName("element")[0].children[0]
		theSVG.id = "theSVG"
		theSVG.style.width = "100%"
		theSVG.style.height = "inherit"
		document.getElementById("downloadTheDiagram").href = "data:image/svg+xml;charset=utf8," + encodeURIComponent(theSVG.outerHTML)
		document.getElementById("download").href = "data:image/svg+xml;charset=utf8," + encodeURIComponent(theSVG.outerHTML)
		var spz = svgPanZoom("#theSVG", {
			zoomEnabled: true,
			controlIconsEnabled: true,
			fit: true,
			center: true,
			onZoom: function (a) {panAndZoom.zoom=a},
			onPan: function (a) {panAndZoom.pan=a},
		});
		if (!isEmptyObject(panAndZoom)) {
			if (typeof panAndZoom.zoom!="undefined")spz.zoom(panAndZoom.zoom);
			if (typeof panAndZoom.pan!="undefined")spz.pan(panAndZoom.pan);
		}
		// console.log(spz);
	} else {
		var text = document.createElement("div");
		text.id = "text";
		text.innerText = svg;
		document.getElementsByClassName("element")[0].innerHTML = text.outerHTML;
		// TODO
		var mime = ""
		document.getElementById("downloadTheDiagram").href = "data:image/svg+xml;charset=utf8," + encodeURIComponent(text.outerHTML)
	}
	  //return theSVG;
    /*const file = new File([svg], "diagram.svg", {
      type: "image/svg+xml",
    });
    URL.revokeObjectURL(previousURL);
    previousURL = URL.createObjectURL(file);
    return previousURL;
	*/
	return "";
  });
};

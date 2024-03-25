import { h, Component, createRef } from "preact";
import renderString2URL from "./dot2url.js";
import ExportOptions from "./ExportOptions.js";
var huidigeError = "";

class Graph extends Component {
  state = { src: null };
  diagramElement = createRef();

  requestFullScreen = () => document.getElementById('theSVG').requestFullscreen();
  getText = () =>
    fetch(this.state.src).then((r) =>
      r.ok ? r.text() : Promise.reject(r.status)
    );

  updateOutput() {
    const { src, isDark, isRawOutput, engine, format } = this.props;

    // If the input is empty (or only whitespace) (or during prerendering), render nothing.
    if (!src.match(/\S+/) || typeof PRERENDER !== "undefined") {
      this.setState({ element: null, error: null });
      return;
    }
	window.clearTimeout(giveError);
    renderString2URL(src, { isDark, isRawOutput, engine: engine, format})
      .then((url) => {
        location.hash = encodeURI(src);
		console.log(url)
		nError = 0;
        this.setState({ src: url, error: null });
      })
      .catch((error) => {
		
		document.getElementsByClassName("error")[0].style.display = "none";
		console.log(error);
		error.message = error.toString()
		var s = document.createElement("script")
		nError++;
		s.innerHTML = "setTimeout(function(){if (nError==" + nError +")giveError()}, 1000);"
		document.body.appendChild(s)
		this.setState({error});
      });
  }


  componentDidMount() {
    this.updateOutput();
  }

  componentDidUpdate(prevProps, prevState) {
    const { src, isDark, isRawOutput, engine, format } = this.props;

    // Only update output if input the relevant props changed.

    if (src !== prevProps.src || isDark !== prevProps.isDark || isRawOutput !== prevProps.isRawOutput || engine !== prevProps.engine || format !== prevProps.format) {
      this.updateOutput();
    }
  }

  render() {
    const displayMode = "graph-light";

    return (
      <div className={"graph " + displayMode}>
        <div className="error">
          {this.state.error ? this.state.error.message : []}
        </div>
        <div className="element">
          {this.state.src ? (
            <img alt="diagram" src={this.state.src} ref={this.diagramElement} />
          ) : (
            []
          )}
        </div>
        <ExportOptions
          fileName="diagram.svg"
          getText={this.getText}
          href={this.state.src}
          requestFullscreen={this.requestFullScreen}
        />
      </div>
    );
  }
}

export default Graph;

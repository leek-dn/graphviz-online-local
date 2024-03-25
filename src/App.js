import { h, Component } from "preact";
import Editor from "./Editor.js";
import Options from "./Options.js";
import Graph from "./Graph.js";

const STORAGE_ENTRY = "viz.js";
const defaultSrc = "digraph { 1 -> 2 }";

let beforeUnloadMessage = null;

window.addEventListener("beforeunload", function (e) {
  return beforeUnloadMessage;
});

class App extends Component {
  state = {
    src:
      this.getHashDiagram() ||
      localStorage.getItem(STORAGE_ENTRY) ||
      defaultSrc,
	  isDark: true,
	  isRawOutput: false,
	  engine: "dot",
  };

  handleOptionChange = this.handleOptionChange.bind(this);
  handleAceEditorChange = this.handleAceEditorChange.bind(this);

  hashChangeListener = this.hashChangeListener.bind(this);

  hashChangeListener(e) {
    const src = this.getHashDiagram();
    if (src !== this.state.src) {
      this.setState({ src });
    }
  }

  getHashDiagram() {
    return decodeURI(location.hash.replace(/^#/, ""));
  }

  handleOptionChange(name, value) {
    this.setState({ [name]: value });
  }

  handleAceEditorChange(src) {
    this.setState({ src });
    localStorage.setItem(STORAGE_ENTRY, src);
  }

  componentDidUpdate(prevProps, prevState) {
    const { src } = this.state;

    if (src !== prevState.src) {
      beforeUnloadMessage = `Your changes will not be saved.`;
    }
  }

  componentDidMount() {
    addEventListener("hashchange", this.hashChangeListener);
  }
  componentWillUnmount() {
    removeEventListener("hashchange", this.hashChangeListener);
  }

  render() {
    return (
      <div id={this.props.id}>


        <Editor
          value={this.state.src}
          onChange={this.handleAceEditorChange}
          isDark={this.state.isDark}
        />

        <Options
          isDark={this.state.isDark}
          engine={this.state.engine}
          format={this.state.format}
          isRawOutput={this.state.isRawOutput}
          onOptionChange={this.handleOptionChange}
        />
        <Graph src={this.state.src} isDark={this.state.isDark} isRawOutput={this.state.isRawOutput} engine={this.state.engine} format={this.state.format} />
      </div>
    );
  }
}

export default App;

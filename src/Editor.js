import { h, Component, createRef } from "preact";
import ExportOptions from "./ExportOptions.js";

class Editor extends Component {
  elementRef = createRef();

  requestFullScreen = () =>
    document.fullscreenElement
      ? document.exitFullscreen()
      : this.elementRef.current.requestFullscreen();
  getText = () => Promise.resolve(this.props.value);

  componentDidMount() {
    const loadingPreview = document.createElement("span");
    loadingPreview.textContent = "Loading…";
    this.elementRef.current.append(loadingPreview);

    if (typeof PRERENDER === "undefined") {
      import("./ace.js")
        .then((ace) => {
          loadingPreview.remove();

          this.editor = ace.default.edit(this.elementRef.current);
          this.editor.on("change", this.aceChanged.bind(this));
		  editor = this.editor
          const session = this.editor.getSession();
          session.setMode("ace/mode/dot");

			this.editor.setOptions({
				enableBasicAutocompletion: true
			});
          session.setUseWrapMode(true);
          session.getDocument().setValue(this.props.value || "");
        })
        .catch(console.error);
    }
  }

  componentDidUpdate() {
    if (this.editor) {
      const editorDocument = this.editor.getSession().getDocument();

      if (this.props.value !== editorDocument.getValue()) {
        editorDocument.setValue(this.props.value);
      }
    }
  }

  aceChanged(data) {
    const editorDocument = this.editor.getSession().getDocument();

    if (this.props.onChange) {
      this.props.onChange(editorDocument.getValue(), data);
    }
  }

  render() {
	console.log(this.editor)
    if (this.editor) {
      this.editor.setTheme(
        `ace/theme/${this.props.isDark ? "twilight" : "github"}`
      );
    }
    return (
      <main className="editor" ref={this.elementRef}>
      </main>
    );
  }
}

export default Editor;

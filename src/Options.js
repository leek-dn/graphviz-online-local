import { h, Component } from "preact";

class Options extends Component {
	handleChange = this.handleChange.bind(this);
	handleShare = this.handleShare.bind(this);
	engineChange = this.engineChange.bind(this);
	formatChange = this.formatChange.bind(this);
	focusOutShareField = this.focusOutShareField.bind(this);

  togglePreviewOnMobile(e) {
    document.documentElement.style.setProperty(
      "--preview",
      e.target.checked ? '"graph"' : ""
    );
    document.documentElement.style.setProperty(
      "--graph-preview",
      e.target.checked ? "block" : "none"
    );
    document.documentElement.style.setProperty(
      "--editor-preview",
      e.target.checked ? "none" : "block"
    );
  }
  

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.props.onOptionChange(name, value);
  }

  handleShare({ target }) {
	var content = encodeURIComponent(editor.getSession().getDocument().getValue());
	var inhoud = [location.protocol, '//', location.host, location.pathname].join('') + "#" + content;
	var shareField = document.getElementById('shareField');
	shareField.style.display = "initial";
	shareField.value = inhoud;
	shareField.select();
	document.execCommand('copy')
  }

  engineChange({ target }) {
	document.getElementsByName("engine")[0].value = target.selectedOptions[0].innerText
    this.props.onOptionChange("engine", target.selectedOptions[0].innerText);
  }

  formatChange({ target }) {
	document.getElementsByName("format")[0].value = target.selectedOptions[0].innerText
    this.props.onOptionChange("format", target.selectedOptions[0].innerText);
  }

  focusOutShareField() {
    document.getElementById('shareField').style.display = "none";
  }

  render() {
    return (
      <div className="options">
	  <label>
		Engine:{" "}
		<select onChange={this.engineChange}>
            <option>circo</option>
            <option selected="true">dot</option>
            <option>fdp</option>
            <option>neato</option>
            <option>osage</option>
            <option>twopi</option>
        </select>
		<input
            name="engine"
            type="hidden"
            onChange={this.handleChange}
          />
	  </label>
        <label className="mobile-only">
          <input
            name="isPreview"
            type="checkbox"
            value={this.props.isPreview}
            onChange={this.togglePreviewOnMobile}
          />{" "}
          Preview
        </label>
        <label>
		Format:{" "}
			<select onChange={this.formatChange}>
				<option selected="">svg</option>
				{//<option>png-image-element</option>
				}
				<option>png-image-element</option>
				<option>json</option>
				<option>xdot</option>
				<option>plain</option>
				<option>ps</option>
			</select>
		<input
            name="format"
            type="hidden"
            onChange={this.handleChange}
          />
        </label>
        <label>
          <input
            name="isRawOutput"
            type="checkbox"
            checked={this.props.isRawOutput}
            onChange={this.handleChange}
          />{" "}
          Show raw output
        </label>
		<label><a id="download" href="to fill in" target="_blank" download="graphviz.svg">Download</a></label>
		<input type="button" value="Share" id="share" onClick={this.handleShare} />
		<input id="shareField" onfocusout={this.focusOutShareField}/>
        <label>
          <input
            name="isDark"
            type="checkbox"
            checked={this.props.isDark}
            onChange={this.handleChange}
          />{" "}
          Dark mode
        </label>
      </div>
    );
  }
}

export default Options;

import { h, Component } from "preact";

class IconButton extends Component {
  state = { error: false };
  onClick = this.props.onClick
    ? (e) => {
        e.preventDefault();

        this.props.onClick().catch((e) => {
          console.error(e);
          this.setState({ error: true });
        });
      }
    : Function.prototype;

  render() {
    return (
      <a
        title={this.props.title}
        onClick={this.onClick}
        className={this.state.error ? "failed" : ""}
        href={this.props.href || "#"}
        download={this.props.download}
        id={this.props.id}
        target={this.props.target || "_self"}
      >
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-expand "><path fill="currentColor" d={this.props.svgPath}></path></svg>
      </a>
    );
  }
}

export default class ExportOptions extends Component {
  state = { downloadLink: null };

  copyToClipboard = () => navigator.clipboard.writeText(document.getElementById("theSVG").outerHTML);

  render() {
    return (
      <div className="export-options">
        {document.fullscreenEnabled ? (
          <IconButton
            svgPath="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"
            title="Toggle fullscreen"
            onClick={this.props.requestFullscreen}
          />
        ) : null}
        <IconButton
          svgPath="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
          title="Copy to clipboard"
          onClick={this.copyToClipboard}
        />
      </div>
    );
  }
}

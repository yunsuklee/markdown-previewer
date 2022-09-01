import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { marked } from 'marked';
import Prism from 'prismjs';

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textarea: '',
      editorWidth: '60%',
      editorHeight: '20%',
      editorDisplay: '',
      previewWidth: '80%',
      previewHeight: '30%',
      previewDisplay: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickEditor = this.handleClickEditor.bind(this);
    this.handleClickPreview = this.handleClickPreview.bind(this);
  }

  handleChange(event) {
    event.preventDefault();

    this.setState({
      textarea: event.target.value
    });
  }

  handleClickEditor(event) {
    event.preventDefault();

    if (this.state.editorWidth === '90%') {
      this.setState({
        textarea: this.state.textarea,
        editorWidth: '60%',
        editorHeight: '20%',
        previewDisplay: ''
      });
    } else {
      this.setState({
        textarea: this.state.textarea,
        editorWidth: '90%',
        editorHeight: '90vh',
        previewDisplay: 'none'
      });
    }
  }

  handleClickPreview(event) {
    event.preventDefault();

    if (this.state.previewWidth === '90%') {
      this.setState({
        textarea: this.state.textarea,
        previewWidth: '80%',
        previewHeight: '30%',
        editorDisplay: ''
      });
    } else {
      this.setState({
        textarea: this.state.textarea,
        previewWidth: '90%',
        previewHeight: '90vh',
        editorDisplay: 'none'
      });
    }
  }

  render() {
    return (
      <div id="container">
        <div 
          className="editor-container"
          style={{ 
            width: this.state.editorWidth, 
            height: this.state.editorHeight, 
            display: this.state.editorDisplay
          }}
        >
          <h2 className="container-title">
            <i className="fa fa-free-code-camp"></i>
            Editor
            <i 
              className="fa-solid fa-expand" 
              onClick={this.handleClickEditor}
            >
            </i>
          </h2>
          <textarea 
            id="editor" 
            onChange={this.handleChange}
          >
          </textarea>
        </div>
        <div 
          className="preview-container"
          style={{ 
            width: this.state.previewWidth, 
            minHeight: this.state.previewHeight,
            display: this.state.previewDisplay,
            height: 'auto'
          }}
        >
          <h2 className="container-title">
            <i className="fa fa-free-code-camp"></i>
            Preview
            <i 
              className="fa-solid fa-expand" 
              onClick={this.handleClickPreview}
            >
            </i>
          </h2>
          <div 
            id="preview"
            dangerouslySetInnerHTML={{
              __html: marked(this.state.textarea, { renderer: renderer })
            }}
            style={{
              height: this.state.previewHeight
            }}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
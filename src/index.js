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
      textarea: placeholder,
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
            type='text'
            value={this.state.textarea}
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

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

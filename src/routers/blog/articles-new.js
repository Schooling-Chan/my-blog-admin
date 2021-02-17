import React from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
// css
// 导入样式
import "@S/less/main-content.less";
import "@S/less/markdown.less";
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

class ArticlesNew extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      md: "",
    };
  }

  handle = (e) => {
    this.setState({
      md: marked(e.target.value).replace(/\<pre\>/g, "<pre class='hljs'>"),
    });
  };

  render() {
    let { isShowMenu } = this.props;
    return (
      <section className="routerBox flexBox">
        <div className="leftBox">
          <Input.TextArea
            allowClear
            autoSize={{
              minRows: 30,
            }}
            onChange={this.handle}
          />
        </div>
        <div
          className="rightBox mdBox "
          dangerouslySetInnerHTML={{ __html: this.state.md }}
        ></div>
      </section>
    );
  }
}
export default connect((state) => ({ ...state.menu }))(ArticlesNew);

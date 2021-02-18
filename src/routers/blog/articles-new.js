import React from "react";
import { connect } from "react-redux";
import { Input, Button, message } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
// css
// 导入样式
import "@S/less/main-content.less";
import "@S/less/markdown.less";
// 导入请求
import request from "@Q/index";

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
      title: "",
    };
  }

  handle = (e) => {
    this.setState({
      md: marked(e.target.value).replace(/\<pre\>/g, "<pre class='hljs'>"),
    });
  };

  handleSave = () => {
    request.articlesApi
      .saveMD({ ...this.state })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.err(err);
        message.error(err.msg);
      });
  };

  render() {
    return (
      <>
        <div
          className="routerBox"
          style={{
            background: "transparent",
          }}
        >
          <Input
            placeholder="请输入题目"
            size="large"
            style={{
              marginBottom: "1rem",
            }}
            onChange={(e) => {
              this.setState({
                title: e.target.value,
              });
            }}
          ></Input>
          <section className="flexBox">
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
          <footer
            style={{
              textAlign: "center",
            }}
          >
            <Button
              type="primary"
              style={{
                margin: "1rem auto",
              }}
              onClick={this.handleSave}
            >
              保存
            </Button>
          </footer>
        </div>
      </>
    );
  }
}
export default connect((state) => ({ ...state.menu }))(ArticlesNew);

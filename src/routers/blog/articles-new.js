import React from "react";
import { connect } from "react-redux";
import { Input, Button, message } from "antd";
import { withRouter } from "react-router-dom";
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
      rawData: "",
    };
  }
  // 更新md显示
  handle = (e) => {
    this.setState({
      md: marked(e.target.value).replace(/\<pre\>/g, "<pre class='hljs'>"),
      rawData: e.target.value,
    });
  };
  // 保存函数
  handleSave = () => {
    if (this.props.location.search) {
      const search = this.props.location.search.match(/(?![=]{1})(\w)+/g);
      request.articlesApi
        .saveEditMD({ ...this.state, id: search[3] })
        .then((res) => {
          message.success(res.msg);
        })
        .catch((err) => {
          console.error(err);
          message.error(err.msg);
        });
      return;
    }
    request.articlesApi
      .saveMD({ ...this.state })
      .then((res) => {
        message.success(res.msg);
      })
      .catch((err) => {
        console.error(err);
        message.error(err.msg);
      });
  };
  // 返回函数
  goBack = (e) => {
    const search = this.props.location.search.match(/(?![=]{1})(\w)+/g);
    if (!search) return;
    this.props.history.push("/blog/articles");
  };

  componentDidMount() {
    const search = this.props.location.search.match(/(?![=]{1})(\w)+/g);
    if (!search) return;
    const [, type, , id] = search;
    request.articlesApi
      .editMD(id)
      .then((res) => {
        const item = res.data[0];
        this.setState({
          md: item.contents,
          rawData: item.rawData,
          title: item.title,
        });
      })
      .catch((err) => {
        console.error(err);
        message.error(err.msg);
      });
  }

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
            value={this.state.title}
          ></Input>
          <section className="flexBox">
            <div className="leftBox">
              <Input.TextArea
                allowClear
                autoSize={{
                  minRows: 30,
                }}
                onChange={this.handle}
                value={this.state.rawData}
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
              style={{
                marginRight: "1rem",
              }}
              onClick={this.goBack}
            >
              返回
            </Button>
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
export default withRouter(connect((state) => ({ ...state.menu }))(ArticlesNew));

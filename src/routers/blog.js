import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// 导入组件
import Articles from "./blog/articles-classify";
import Message from "./blog/message-center";

// css
import "@S/less/head-nav.less";

class Blog extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (document.cookie === "") this.props.history.push("/login");
  }
  render() {
    let { isShowMenu } = this.props;
    return (
      <section
        className="contentBox"
        style={{ left: isShowMenu ? "220px" : "0" }}
      >
        <Switch>
          <Route path="/blog/articles" component={Articles} />
          <Route path="/blog/message" component={Message} />

          {/* 非法页面 */}
          <Redirect from="/blog" to="/blog/articles" />
        </Switch>
      </section>
    );
  }
}

export default connect((state) => ({ ...state.menu }))(Blog);

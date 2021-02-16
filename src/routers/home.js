import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Spin } from "antd";
// css
import "@S/less/head-nav.less";
import { childRouter } from "@U/router.config.js";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { isShowMenu } = this.props;
    return (
      <Suspense fallback={<Spin tip="Loading..." />}>
        <section
          className="contentBox"
          style={{
            left: isShowMenu ? "220px" : "0",
          }}
        >
          {childRouter.map((item) => (
            <Route exact path={item.path} component={item.component} />
          ))}
        </section>
      </Suspense>
    );
  }
}
export default connect((state) => ({ ...state.menu }))(Home);

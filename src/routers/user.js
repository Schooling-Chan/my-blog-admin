import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// 自定义组件
import Administrators from "./user/user-administrators";
import Role from "./user/user-role";

// css
import "@S/less/head-nav.less";

class User extends React.Component {
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
          <Route path="/user/role" exact component={Role} />
          <Route path="/user/administrators" exact component={Administrators} />

          {/* 非法页面 */}
          <Redirect from="/user" exact to="/user/role" />
        </Switch>
      </section>
    );
  }
}

export default connect((state) => ({ ...state.menu }))(User);

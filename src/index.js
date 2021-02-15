import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Spin } from "antd";

//css
import "@S/less/reset.css";

// reducer
import store from "@Redux";

// 自定义组件
import Login from "@C/login";
const Head = lazy(() => import(/* webpackPrefetch: true */ "@C/head"));
const LeftNav = lazy(() => import(/* webpackPrefetch: true */ "@C/left-nav"));

// 路由
const Sets = lazy(() => import("@R/sets"));
const User = lazy(() => import("@R/user"));
const Home = lazy(() => import("@R/home"));
const Blog = lazy(() => import("@R/blog"));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Spin tip="Loading..." />
          </div>
        }
      >
        {/* 公共头部 */}
        <Head></Head>
        {/* 左边菜单 */}
        <LeftNav></LeftNav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" component={User} />
          <Route path="/blog" component={Blog} />
          <Route path="/login" exact component={Login} />
          <Route path="/sets" component={Sets} />

          {/* 非法页面 */}
          <Redirect to={document.cookie !== "" ? "/?type=unsafe" : "/login"} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

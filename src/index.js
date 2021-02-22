import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Spin, ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
//css
import "@S/less/reset.css";

// reducer
import store from "@Redux";
// 路由
import FrontendAuth from "@C/FrontendAuth";
import routerMap from "@U/router.config.js";

// 自定义组件
// import Login from "@C/login";
import Head from "@C/head";
import LeftNav from "@C/left-nav";
// const Head = lazy(() => import(/* webpackPrefetch: true */ "@C/head"));
// const LeftNav = lazy(() => import(/* webpackPrefetch: true */ "@C/left-nav"));
const logined = (
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
);

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <BrowserRouter>
        {/* 公共头部 */}
        <Head></Head>
        {/* 左边菜单 */}
        <LeftNav></LeftNav>
        <Suspense fallback={logined}>
          <Switch>
            <FrontendAuth routerConfig={routerMap} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);

//FrontendAuth.js
import { Route, Redirect } from "react-router-dom";
// css
import "@S/less/head-nav.less";
import { connect } from "react-redux";
function FrontendAuth(props) {
  const { routerConfig, location, isShowMenu } = props;
  const { pathname } = location;
  const isLogin = !!document.cookie;
  // 如果该路由不用进行权限校验，登录状态下登陆页除外
  // 因为登陆后，无法跳转到登陆页
  // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
  const targetRouterConfig = routerConfig.find(
    (item) =>
      // new RegExp(`^${item.path}`).test(pathname)
      item.path === pathname
  );
  if (pathname === "/") {
    return <Redirect to="/home" />;
  }
  if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
    const { component } = targetRouterConfig;
    if (pathname !== "/404" && pathname !== "/home" && pathname !== "/login") {
      return (
        <section
          className="contentBox"
          style={{
            left: isShowMenu ? "220px" : "0",
          }}
        >
          <Route exact path={pathname} component={component} />
        </section>
      );
    }
    return <Route exact path={pathname} component={component} />;
  }
  if (isLogin) {
    // 如果是登陆状态，想要跳转到登陆，重定向到主页
    if (pathname === "/login") {
      return <Redirect to="/home" />;
    } else {
      // 如果路由合法，就跳转到相应的路由
      if (targetRouterConfig) {
        if (
          pathname !== "/404" &&
          pathname !== "/home" &&
          pathname !== "/login"
        ) {
          return (
            <section
              className="contentBox"
              style={{
                left: isShowMenu ? "220px" : "0",
              }}
            >
              <Route
                exact
                path={pathname}
                component={targetRouterConfig.component}
              />
            </section>
          );
        }
        return (
          <Route
            exact
            path={pathname}
            component={targetRouterConfig.component}
          />
        );
      } else {
        // 如果路由不合法，重定向到 404 页面
        return <Redirect to="/404" />;
      }
    }
  } else {
    // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
    console.log(targetRouterConfig);
    if (targetRouterConfig && targetRouterConfig.auth) {
      return <Redirect to="/login" />;
    } else {
      // 非登陆状态下，路由不合法时，重定向至 404
      return <Redirect to="/404" />;
    }
  }
}
export default connect((state) => ({ ...state.menu }))(FrontendAuth);

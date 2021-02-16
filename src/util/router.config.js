import { lazy } from "react";
import Login from "@C/login";
import ErrorPage from "@C/error";
// 路由
const Home = lazy(() => import("@R/home"));

export default [
  { path: "/", name: "Home", component: Home, auth: true },
  { path: "/login", name: "Login", component: Login },
  { path: "/404", name: "404", component: ErrorPage },
];

// 自定义组件
const Info = lazy(() => import("@R/sets/my-info"));
const Password = lazy(() => import("@R/sets/password"));
const Articles = lazy(() => import("@R/blog/articles-classify"));
const Message = lazy(() => import("@R/blog/message-center"));
const Administrators = lazy(() => import("@R/user/user-administrators"));
const Role = lazy(() => import("@R/user/user-role"));

export const childRouter = [
  { path: "/sets/basic", name: "Info", component: Info },
  { path: "/sets/password", component: Password },
  { path: "/blog/articles", component: Articles },
  { path: "/blog/message", component: Message },
  { path: "/user/role", component: Role },
  { path: "/user/administrators", component: Administrators },
];

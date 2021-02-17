import { lazy } from "react";
import Login from "@C/login";
import ErrorPage from "@C/error";
// 路由
const Home = lazy(() => import("@R/home"));
// 自定义组件
const Info = lazy(() => import("@R/sets/my-info"));
const Password = lazy(() => import("@R/sets/password"));
const Articles = lazy(() => import("@R/blog/articles-classify"));
const Message = lazy(() => import("@R/blog/message-center"));
const Administrators = lazy(() => import("@R/user/user-administrators"));
const Role = lazy(() => import("@R/user/user-role"));
const Articles_New = lazy(() => import("@R/blog/articles-new"));

export default [
  { path: "/home", name: "Home", component: Home, auth: true },
  { path: "/sets/basic", name: "Info", component: Info, auth: true },
  { path: "/sets/password", component: Password, name: "Password", auth: true },
  { path: "/blog/articles", component: Articles, name: "Articles", auth: true },
  { path: "/blog/message", component: Message, name: "Message", auth: true },
  {
    path: "/blog/new",
    component: Articles_New,
    name: "ArticlesNew",
    auth: true,
  },
  { path: "/user/role", component: Role, name: "Role", auth: true },
  {
    path: "/user/administrators",
    component: Administrators,
    name: "Administrators",
    auth: true,
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/404", name: "404", component: ErrorPage },
];

export const childRouter = [
  { path: "/", name: "Home", component: Home, auth: true },
  { path: "/sets/basic", name: "Info", component: Info, auth: true },
  { path: "/sets/password", component: Password, name: "Password", auth: true },
  { path: "/blog/articles", component: Articles, name: "Articles", auth: true },
  { path: "/blog/message", component: Message, name: "Message", auth: true },
  { path: "/user/role", component: Role, name: "Role", auth: true },
  {
    path: "/user/administrators",
    component: Administrators,
    name: "Administrators",
    auth: true,
  },
];

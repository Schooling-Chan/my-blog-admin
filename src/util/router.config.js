import { lazy } from "react";
import Login from "@C/login";
import ErrorPage from "@C/error";
// 路由
const Sets = lazy(() => import("@R/sets"));
const User = lazy(() => import("@R/user"));
const Home = lazy(() => import("@R/home"));
const Blog = lazy(() => import("@R/blog"));

export default [
  { path: "/", name: "Home", component: Home, auth: true },
  { path: "/user", name: "User", component: User, auth: true },
  { path: "/sets", name: "Sets", component: Sets, auth: true },
  { path: "/blog", name: "Blog", component: Blog, auth: true },
  { path: "/login", name: "Login", component: Login },
  { path: "/404", name: "404", component: ErrorPage },
];

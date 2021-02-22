import React, { useState, useEffect } from "react";

// 导入组件
// import {NavLink, Switch, Route, Redirect} from 'react-router-dom';
// 导入自定义
import CommonComponent from "@C/common-content";
import { message } from "antd";

// 导入样式
import "@S/less/main-content.less";
// 导入请求
import request from "@Q/index";

export default function Articles() {
  const [state, setState] = useState({});
  useEffect(() => {
    request.articlesApi
      .mdList()
      .then((res) => {
        // console.log(res);
        setState((state) => res);
      })
      .catch((err) => {
        console.err(err);
        message.error(err.msg);
      });
  }, []);
  return (
    <section
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      {/* 主体内容 */}
      <div className="routerBox">
        <CommonComponent
          thead={{ id: "文章ID", title: "文章标题", time: "上传时间" }}
          data={state.data}
          count={state.count}
          setState={setState}
        />
      </div>
    </section>
  );
}

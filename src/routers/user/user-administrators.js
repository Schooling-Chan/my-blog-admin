// 基本样式
import React, { useState } from "react";
import { connect } from "react-redux";

// 导入自定义
import CommonComponent from "@C/common-content";

// 导入样式
import "@S/less/main-content.less";

function User() {
  return (
    <section className="routerBox">
      <CommonComponent
        thead={{
          id: "ID",
          title: "用户名",
          time: "加入时间",
          operation: "操作",
        }}
        articlesType="后台管理员"
        menuType="用户管理"
      />
    </section>
  );
}
export default connect((state) => ({ ...state.login }))(User);

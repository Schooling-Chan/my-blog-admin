// 基本样式
import React, { useState } from "react";
import { Input, Form, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

// 导入请求
import request from "@Q/index";

// 加密
import { createHash } from "crypto";
import cryptoJS from "crypto-js";

// 导入样式
import "@S/less/main-content.less";

// 反抖函数
function debounce(fn, interval = 300) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}

function Password(props) {
  const [form] = Form.useForm(); //初始化表单

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    // const { oldPassword, newPassword } = values;
    // password = this.encrytion(password);//密码加密
    // const reqHead = cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(`username=${username}&&password=${password}`));
  };

  return (
    <section className="routerBox">
      {/* 头部 */}
      <div className="routerBox-head">修改密码</div>

      {/* 内容 */}
      <Form
        form={form}
        className="routerBox-form"
        name="reset-password"
        onFinish={onFinish}
      >
        <div className="routerBox-form-item">
          <label>用户名:</label>
          <div style={{ width: "100%" }}>
            <Input
              placeholder="用户名"
              prefix={<UserOutlined />}
              disabled
              style={{ width: "50%" }}
              value={props.userData?.username || document.cookie.slice(5)}
            />
          </div>
        </div>
        <Form.Item
          label="原密码"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "请输入原密码",
            },
          ]}
        >
          <Input.Password
            placeholder="输入你的密码"
            style={{ width: "50%" }}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "请输入新密码",
            },
          ]}
        >
          <Input.Password
            placeholder="输入你的新密码"
            style={{ width: "50%" }}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="checkPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "请确认新密码",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("两次输入的密码不一致!");
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="确认你的新密码"
            style={{ width: "50%" }}
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default connect((state) => ({ ...state.login }))(Password);

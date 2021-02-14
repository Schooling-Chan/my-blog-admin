import React, { useState } from "react";

// 导入组件
import { NavLink } from "react-router-dom";
import { Checkbox, Pagination, Button, Breadcrumb, Table, Space } from "antd";

// 导入样式
import "@S/less/main-content.less";

//表格数据
const data = [
  {
    id: "1",
    key: "1",
    title: "js继承js继承js继承js继承js继承js继承js继承js继承js继承js继承",
    updateTime: "2020-12-20",
  },
  {
    id: "2",
    key: "2",
    title: "js继承js继承js继承js继承js继承js继承js继承js继承js继承js继承",
    updateTime: "2020-12-20",
  },
  {
    id: "3",
    key: "3",
    title: "Joe Black",
    updateTime: "2020-12-20",
  },
  {
    id: "4",
    key: "4",
    title: "Disabled User",
    updateTime: "2020-12-20",
  },
];

export default function Articles(props) {
  // 判断哪个页面
  const {
    type,
    buttonType = "编辑",
    articlesType = "文章分类",
    thead: { id, title, time, operation },
    menuType = "博客管理",
  } = props;

  // 表格头部
  const columns = [
    {
      title: id,
      dataIndex: "id",
    },
    {
      title: title,
      dataIndex: "title",
    },
    {
      title: time,
      dataIndex: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: () => (
        <Space size="middle">
          <a>删除</a>
          <a>{buttonType}</a>
        </Space>
      ),
    },
  ];

  return (
    <section style={{ width: "100%", overflowX: "hidden" }}>
      {/* 头部 */}
      <Breadcrumb className="content-head-box">
        <Breadcrumb.Item>
          <NavLink to="/blog/">{menuType}</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{articlesType}</Breadcrumb.Item>
        <Breadcrumb.Item>{type}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 按钮 */}
      <div className="content-button-box">
        <Button>批量删除</Button>
      </div>

      {/* 内容 */}
      <div className="content-main-box">
        <Table
          rowSelection={{
            onChange: function (selectedRowKeys, selectedRows) {
              console.log("====================================");
              console.log(selectedRowKeys, selectedRows);
              console.log("====================================");
            },
          }}
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 10,
            onChange: function (page, pageSize) {
              console.log("====================================");
              console.log((page, pageSize));
              console.log("====================================");
            },
            pageSizeOptions: [10, 15, 30, 50],
          }}
          bordered
        />
      </div>
    </section>
  );
}

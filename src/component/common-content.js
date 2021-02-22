import React, { useState } from "react";

// 导入组件
import { NavLink, withRouter } from "react-router-dom";
import { Checkbox, Pagination, Button, message, Table, Space } from "antd";

// 导入样式
import "@S/less/main-content.less";
// 导入请求
import request from "@Q/index";

//表格数据
const defaultData = [
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

function Articles(props) {
  // 判断哪个页面
  const {
    type,
    buttonType = "编辑",
    articlesType = "文章分类",
    thead: { id, title, time, operation },
    menuType = "博客管理",
    data = defaultData,
    count = 10,
    setState,
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
      dataIndex: "time",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                request.articlesApi
                  .deleteMD(record.id)
                  .then((res) => {
                    message.success(res.msg);
                  })
                  .catch((err) => {
                    console.error(err);
                    message.error(err.msg);
                  });
              }}
            >
              删除
            </a>
            <a
              onClick={() => {
                props.history.push({
                  pathname: "/blog/new",
                  search: "type=edit&id=" + record.id,
                });
              }}
            >
              {buttonType}
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <section style={{ width: "100%", overflowX: "hidden" }}>
      {/* 头部 */}
      {/* <Breadcrumb className="content-head-box">
        <Breadcrumb.Item>
          <NavLink to="/blog/">{menuType}</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{articlesType}</Breadcrumb.Item>
        <Breadcrumb.Item>{type}</Breadcrumb.Item>
      </Breadcrumb> */}

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
            defaultCurrent: 1, // 默认在哪页
            defaultPageSize: 10,
            showTotal: (total, range) => `共${count}条记录`,
            showSizeChanger: true,
            onShowSizeChange: function (page, pageSize) {
              this.defaultCurrent = page;
              this.defaultPageSize = pageSize;
              request.articlesApi
                .mdList({
                  num: page,
                  size: pageSize,
                })
                .then((res) => {
                  // console.log(res);
                  setState((state) => res);
                })
                .catch((err) => {
                  console.err(err);
                  message.error(err.msg);
                });
            },
            onChange: function (page, pageSize) {
              // console.log("====================================");
              // console.log(page, pageSize, this);
              // console.log("====================================");
              this.defaultCurrent = page;
              this.defaultPageSize = pageSize;
              request.articlesApi
                .mdList({
                  num: page,
                  size: pageSize,
                })
                .then((res) => {
                  // console.log(res);
                  setState((state) => res);
                })
                .catch((err) => {
                  console.err(err);
                  message.error(err.msg);
                });
            },
            pageSizeOptions: [10, 15, 30, 50],
            total: count,
          }}
          bordered
        />
      </div>
    </section>
  );
}
export default withRouter(Articles);

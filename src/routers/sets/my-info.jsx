// 基本样式
import React, { useState } from 'react';
import { Dropdown, Button, Menu, Input, Radio} from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';

// 导入样式
import '../../static/less/main-content.less';

// 下拉菜单
const menu = (
    <Menu >
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
);

// 提取组件
const { TextArea } = Input;

function Info(props) {
    const [genderState, setState] = useState(0);//性别
    // console.log(props);
    return <section className="routerBox">
        {/* 头部 */}
        <div className="routerBox-head">
            设置我的资料
        </div>

        {/* 内容 */}
        <div className="routerBox-form">
            <div className="routerBox-form-item">
                <label>我的角色</label>
                <Dropdown overlay={menu}>
                    <Button>
                        Button <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div className="routerBox-form-item">
                <label>用户名</label>
                <Input placeholder="用户名" prefix={<UserOutlined />} disabled  style={{width: '80%'}} value={props.userData.username}/>
            </div>
            <div className="routerBox-form-item">
                <label>手机</label>
                <Input  placeholder="输入你的手机号" style={{width: '80%'}}/>
            </div>
            <div className="routerBox-form-item">
                <label>性别</label>
                <Radio.Group onChange={e => setState(e.target.value)} value={genderState}>
                    <Radio value={0}>男</Radio>
                    <Radio value={1}>女</Radio>
                </Radio.Group>
            </div>
            <div className="routerBox-form-item">
                <label>邮箱</label>
                <Input  placeholder="输入你的邮箱" style={{width: '80%'}}/>
            </div>
            <div className="routerBox-form-item">
                <label>签名</label>
                <TextArea placeholder="输入你的签名" allowClear  style={{width: '80%', minHeight: '100px'}} allowClear/>
            </div>
        </div>

        <Button style={{margin: "35px 40px"}} type="primary">确认修改</Button>
    </section>
}

export default connect(state => ({...state.login}))(Info);
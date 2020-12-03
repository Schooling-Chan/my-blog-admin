// 基本样式
import React, { useState } from 'react';
import { Input, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

// 导入请求
import request from '../../request/index';

// 导入样式
import '../../static/less/main-content.less';

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
    const [newPassword, setPass] = useState(null);
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const checkPass = () => {
        // request.checkPass().catch(err => console.error(err))
    }

    return <section className="routerBox">
        {/* 头部 */}
        <div className="routerBox-head">
            修改密码
        </div>

        {/* 内容 */}
        <Form form={form} className="routerBox-form"
            onFinish={onFinish}>
            <Form.Item label="用户名">
                <Input placeholder="用户名" prefix={<UserOutlined />} disabled style={{ width: '50%' }} value={props.userData.username || document.cookie.slice(5)} />
            </Form.Item>
            <Form.Item label="原密码" rules={[
                {
                    required: true,
                    message: '请输入原密码',
                },
            ]}>
                <Input placeholder="输入你的密码" style={{ width: '50%' }} onChange={debounce(checkPass)} />
            </Form.Item>
            <Form.Item label="新密码" rules={[
                {
                    required: true,
                    message: '请输入新密码',
                },
            ]}>
                <Input placeholder="输入你的新密码" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item label="新密码" rules={[
                {
                    required: true,
                    message: '请确认新密码',
                },
            ]}>
                <Input placeholder="输入你的新密码" style={{ width: '50%' }} />
            </Form.Item>

            <Form.Item className="content-button-box">
                <button onClick={() => {
                    // 确认修改

                }}>确认修改</button>
            </Form.Item>
        </Form>


    </section>
}

export default connect(state => ({ ...state.login }))(Password);
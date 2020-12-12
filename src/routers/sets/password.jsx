// 基本样式
import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';
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

    const checkPass = (e) => {
        console.log('====================================');
        console.log(e.target);
        console.log('====================================');
        // request.checkPass().catch(err => console.error(err))
    }

    return <section className="routerBox">
        {/* 头部 */}
        <div className="routerBox-head">
            修改密码
        </div>

        {/* 内容 */}
        <Form form={form} className="routerBox-form" name="reset-password"
            onFinish={onFinish}>
            <div className="routerBox-form-item">
                <label>用户名</label>
                <Input placeholder="用户名" prefix={<UserOutlined />} disabled style={{ width: '50%' }} value={props.userData?.username || document.cookie.slice(5)} />
            </div>
            <Form.Item label="原密码" name="oldPassword" rules={[
                {
                    required: true,
                    message: '请输入原密码',
                },
            ]}>
                <Input.Password placeholder="输入你的密码" style={{ width: '50%' }} autoComplete="off" />
            </Form.Item>
            <Form.Item label="新密码" name="newPassword" rules={[
                {
                    required: true,
                    message: '请输入新密码',
                },
            ]}>
                <Input.Password placeholder="输入你的新密码" style={{ width: '50%' }} autoComplete="off" />
            </Form.Item>
            <Form.Item label="新密码" name="checkPassword" rules={[
                {
                    required: true,
                    message: '请确认新密码',
                },
            ]}>
                <Input.Password placeholder="输入你的新密码" style={{ width: '50%' }} autoComplete="off" />
            </Form.Item>

            <Form.Item >
                <Button style={{ margin: "35px 40px" }} type="primary" htmlType="submit">确认修改</Button>
            </Form.Item>
        </Form>


    </section>
}

export default connect(state => ({ ...state.login }))(Password);
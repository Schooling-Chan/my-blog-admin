// 基本样式
import React, { useState } from 'react';
import { Input, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

// 引入ajax
import ajax from '../../util/axios-init';

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

    return <section className="routerBox">
        {/* 头部 */}
        <div className="routerBox-head">
            修改密码
        </div>

        {/* 内容 */}
        <Form form={form} className="routerBox-form">
            <Form.Item label="用户名">
                <Input placeholder="用户名" prefix={<UserOutlined />} disabled style={{ width: '50%' }} value={props.userData.username} />
            </Form.Item>
            <Form.Item label="原密码" rules={[
                {
                    required: true,
                    message: '请输入原密码',
                },
            ]}>
                <Input placeholder="输入你的密码" style={{ width: '50%' }} onChange={debounce(() => {
                    ajax.put({
                        url: '/api/user/password'
                    }).then(res => {

                    }).catch(err => console.error(err))
                })} />
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
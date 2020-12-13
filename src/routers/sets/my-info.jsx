// 基本样式
import React, { useState } from 'react';
import { Button, Input, Radio, Select, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

// 导入样式
import '../../static/less/main-content.less';
const { Option } = Select;

// 提取组件
const { TextArea } = Input;

function Info(props) {

    const [form] = Form.useForm();//初始化表单

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };


    // console.log(props);
    return <section className="routerBox">
        {/* 头部 */}
        <div className="routerBox-head">
            设置我的资料
        </div>

        {/* 内容 */}
        <Form form={form} className="routerBox-form" name="set-user"
            onFinish={onFinish} >
            <Form.Item name="select" label="角色" >
                <Select placeholder="请选择" style={{ width: '50%' }}>
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
                </Select>
            </Form.Item>

            <Form.Item label="手机" name="phone" >
                <Input placeholder="输入你的手机号" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item label="性别" name="gender" >
                <Radio.Group>
                    <Radio value={0}>男</Radio>
                    <Radio value={1}>女</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[
                {
                    type: 'email',
                    message: '邮箱格式不正确!',
                },
            ]}>
                <Input placeholder="输入你的邮箱" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item label="签名" name="remark" >
                <TextArea placeholder="输入你的签名" allowClear style={{ width: '50%', minHeight: '100px' }} />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">确认修改</Button>
            </Form.Item>
        </Form>

    </section>
}

export default connect(state => ({ ...state.login }))(Info);
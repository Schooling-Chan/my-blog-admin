import React from 'react';
import { connect } from 'react-redux';

// antd
import { Input, Button, message, Form } from 'antd';
import { UserOutlined, UnlockOutlined, CheckCircleOutlined } from '@ant-design/icons';

// 加密
import { createHash } from 'crypto';
import cryptoJS from 'crypto-js';



// 导入样式
import '../static/less/head-nav.less';
import action from '../store/action';

// 导入请求
import request from '../request/index';


class Login extends React.Component {
    constructor(props, context, ref) {
        super(props, context, ref);
        this.formRef = React.createRef();
        this.state = {
            type: "login",//判断点击按钮类型
        }
    }



    /**
     * @msg: 退出登录
     * @param {*}
     * @return {*}
     */
    logout = () => {
        if (localStorage.getItem("isLogin") === "false") return;
        request.loginApi.logout().then(res => {
            message.success('退出登录成功');
            localStorage.setItem("isLogin", false);
            localStorage.setItem("shahsxpb", "");
        }).catch(err => {
            // message.error(err.msg);
            console.error(err);
        })
    }

    /**
     * 注册和登录函数
     * @param values object 表单提交传入的数据
     * @memberof Login
     */
    Finish = (values) => {
        // console.log('====================================');
        // console.log(values, this.state.type);
        // console.log('====================================');
        let { username, password } = values;
        // 提交事件
        password = this.encrytion(password);//密码加密
        const reqHead = cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(`username=${username}&&password=${password}`));
        if (this.state.type === 'login') {
            request.loginApi.login(reqHead).then(res => {
                message.success('登录成功');
                this.props.login({ username });
                this.props.history.push({
                    pathname: '/',
                    state: {
                        user: username
                    }
                });
                localStorage.setItem("isLogin", true);
                localStorage.setItem("shahsxpb", res.shshshfpa);
            }).catch(err => {
                message.error(err.msg);
                console.error(err);
            })
        } else {
            request.loginApi.register(reqHead).then(res => {
                console.log(this.props.history);
                message.success('注册成功');
                this.props.login({ username });
                this.props.history.push({
                    pathname: '/',
                    state: {
                        user: username
                    }
                });
                localStorage.setItem("isLogin", true);
                localStorage.setItem("shahsxpb", res.shshshfpa);
            }).catch(err => {
                message.error(err.msg);
                console.error(err);
            })
        }
    }

    // 加密函数
    encrytion = (password) => {
        let hash = createHash("md5");
        hash.update(password);
        const hashVal = hash.digest('hex'),
            pass = hashVal.slice(3, hashVal.length - 5);
        return pass
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.logout();
        }
    }

    shouldComponentUpdate() {//不需要再次render
        return false;
    }

    render() {
        return (<section className="loginBox">
            <Form className="loginBox-user" ref={this.formRef} name="control-ref" onFinish={this.Finish}>
                <h2>登录界面</h2>


                <div className="loginBox-user-form">
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的用户名!'
                            },
                        ]}
                    >
                        <Input placeholder="请输入用户名" prefix={<UserOutlined className="site-form-item-icon" />} allowClear autoComplete="off" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的密码!'
                            },
                        ]}
                    >

                        <Input placeholder="请输入密码" prefix={<UnlockOutlined className="site-form-item-icon" />} allowClear type="password" />
                    </Form.Item>
                    {/* <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的密码!'
                            },
                        ]}
                    ></Form.Item> */}
                    <div style={{ display: "flex" }}>
                        <Input placeholder="输入验证码" prefix={<CheckCircleOutlined className="site-form-item-icon" />} />
                        <img src="https://www.oschina.net/action/user/captcha" alt="验证码" />
                    </div>
                </div>

                <Form.Item>
                    <Button type="primary" block size="large" htmlType="submit" >登 录</Button>
                    <div style={{ padding: "10px 0", fontSize: "16px" }}>or</div>
                    <Button block size="large" htmlType="submit" onClick={() => {
                        this.setState({
                            type: "register"
                        })
                    }}>
                        注册
                    </Button>
                </Form.Item>

            </Form>


            <div className="loginBox-user-footer">
                Copyright&nbsp;&nbsp; &copy;&nbsp;&nbsp;Joseph
            </div>
        </section>)
    }
}

export default connect(state => ({ ...state.login }), action.login)(Login);
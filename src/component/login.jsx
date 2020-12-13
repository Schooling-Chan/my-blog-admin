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

/**
 *  @msg 验证码生成函数
 *  @param canvas的Dom元素
 */
function setCode(target) {
    // 随机数生成函数
    function rn(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    // 随机生成颜色
    function rc(min, max) {
        var r = rn(min, max);
        var g = rn(min, max);
        var b = rn(min, max);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // 生成背景颜色
    let w = 120,
        h = 30,
        ctx = target.getContext('2d'),
        str = "";

    //绘制背景颜色
    ctx.fillStyle = rc(180, 230);
    ctx.fillRect(0, 0, w, h);

    //随机字符串
    let pool = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ1234567890';

    for (let i = 0; i < 4; i++) {
        // 取出随机数
        const ele = pool[rn(0, pool.length)];
        str += ele;
        // 随机字体大小
        const fs = rn(18, 30);
        // 随机数字旋转
        let deg = rn(-30, 30);
        ctx.font = fs + 'px Simhei';
        ctx.textBaseline = 'top';//文字基线
        // 设置填充颜色
        ctx.fillStyle = rc(80, 150);
        ctx.save();
        ctx.translate(30 * i + 15, 5);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(ele, 0, 0);
        ctx.restore();
    }

    // 随机生成干扰线
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(rn(0, w), rn(0, h));
        ctx.lineTo(rn(0, w), rn(0, h));
        ctx.strokeStyle = rc(180, 230);
        ctx.closePath();
        ctx.stroke();
    }

    return str;
}


class Login extends React.Component {
    constructor(props, context, ref) {
        super(props, context, ref);
        this.formRef = React.createRef();
        this.state = {
            type: "login",//判断点击按钮类型
            code: null,//验证码
        }
        this.canvas = React.createRef();
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
        const canvas = this.canvas.current;
        this.setState({
            code: setCode(canvas)
        })
    }

    render() {
        let { code } = this.state;
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

                        <Input.Password placeholder="请输入密码" prefix={<UnlockOutlined className="site-form-item-icon" />} allowClear autoComplete="off" />
                    </Form.Item>
                    <div style={{ position: "relative" }}>
                        <Form.Item name="code"
                            style={{
                                width: '60%'
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的验证码!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || code === value || code.toLowerCase() === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('验证码错误!');
                                    },
                                }),
                            ]}>
                            <Input placeholder="输入验证码" prefix={<CheckCircleOutlined className="site-form-item-icon" />} style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                            }} allowClear />
                        </Form.Item>
                        <canvas ref={this.canvas} width="120" height="30" style={{
                            position: 'absolute',
                            right: 0,
                            top: 0
                        }}>
                            您的浏览器不支持canvas，请更换浏览器.
                        </canvas>
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
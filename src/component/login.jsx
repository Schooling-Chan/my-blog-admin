import React from 'react';
import { connect } from 'react-redux';

// antd
import { Input, Button, message } from 'antd';
import { UserOutlined, UnlockOutlined, CheckCircleOutlined } from '@ant-design/icons';

// 加密
import { createHash } from 'crypto';

// 引入axios
import ajax from '../util/axios-init';

// 导入样式
import '../static/less/head-nav.less';
import action from '../store/action';

// get()('/blog/articles').then(res => console.log(res));
class Login extends React.Component {
    constructor(props, context, ref) {
        super(props, context, ref);

        this.state = {
            username: null,
            password: null,
        }
    }

    // 获取value
    /* 
        失焦获取输入框值事件
        根据状态获取值
        @params / @return: null
    */
    getValue = e => {
        let type = e.target.getAttribute("data-input"),
            val = e.target.value;
        if (val === "") {
            type === "username" ? this.setState({
                username: null
            }) : this.setState({
                password: null
            });
            return;
        }

        if (type === "username" && val !== null) {
            this.setState({
                username: val
            })
            return;
        }

        this.setState({
            password: val
        })
    }




    // 注册
    /* 
        注册事件
        根据状态获取值
        @params / @return: null
    */
    register = () => {
        let { username, password } = this.state,
            { getUser } = this.props;

        if (username === null || password === null) {
            message.error('用户名和密码不能为空')
            return;
        }

        // 提交事件
        password = this.encrytion();

        ajax.post({
            url: "/api/register",
            headers: {
                "Set-User": `username=${username}&&password=${password}`
            }
        }).then(res => {
            if (res.code === 0) {
                message.success('注册成功');
                getUser();
                this.props.login({ username });
                this.props.history.push({
                    path: '/',
                    state: {
                        user: username
                    }
                });
            } else {
                throw res;
            }
        }).catch(err => {
            message.error(err.msg);
            console.error(err);
        })
    }

    // 登录
    login = () => {
        let { username, password } = this.state,
            { getUser } = this.props;
        if (username === null || password === null) {
            message.error('用户名和密码不能为空')
            return;
        }
        // 提交事件
        password = this.encrytion();//密码加密
        ajax.post({
            url: "/api/login",
            headers: {
                "Set-User": `username=${username}&&password=${password}`
            }
        }).then(res => {
            if (res.code === 0) {
                message.success('登录成功');
                getUser();
                this.props.login({ username });
                this.props.history.push({
                    pathname: '/',
                    state: {
                        user: username
                    }
                });
            } else {
                throw res;
            }
        }).catch(err => {
            message.error(err.msg);
            console.error(err);
        })
    }

    // 加密函数
    encrytion = () => {
        let { password } = this.state,
            // hash.update("451512")//加密
            // console.log(hash.digest('hex'));//显示生成的hash码
            hash = createHash("md5");
        hash.update(password);
        const hashVal = hash.digest('hex'),
            pass = hashVal.slice(3, hashVal.length - 5);
        return pass
    }

    shouldComponentUpdate() {//不需要再次render
        return false;
    }

    render() {
        return (<section className="loginBox">
            <div className="loginBox-user">
                <h2>loginAdmin</h2>


                <div className="loginBox-user-form">
                    <Input placeholder="用户名" prefix={<UserOutlined />} size="large" allowClear onBlur={this.getValue} data-input="username" />
                    <Input.Password placeholder="密码" prefix={<UnlockOutlined />} size="large" allowClear onBlur={this.getValue} data-input="password" />
                    <div style={{ display: "flex" }}>
                        <Input placeholder="输入验证码" prefix={<CheckCircleOutlined />} />
                        <img src="https://www.oschina.net/action/user/captcha" alt="验证码" />
                    </div>
                </div>

                <button className="loginBox-user-btn" onClick={this.login}>登 录</button>
                <div style={{ padding: "10px 0", fontSize: "16px" }}>or</div>
                <Button type="primary" block size="large" onClick={this.register}>
                    注册
                </Button>
            </div>


            <div className="loginBox-user-footer">
                Copyright&nbsp;&nbsp; &copy;&nbsp;&nbsp;Joseph
            </div>
        </section>)
    }
}

export default connect(state => ({ ...state.login }), action.login)(Login);
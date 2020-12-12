// 头部模块
import { NavLink } from 'react-router-dom';
import React from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import action from '../store/action/index';
import { Input, message } from 'antd';

// 头部样式
import '../static/less/head-nav.less';
// 导入请求
import request from '../request/index';


const { Search } = Input;

class Head extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let { userData } = this.props;

        if (!Object.keys(userData).length && localStorage.getItem("isLogin") !== "false") {
            request.loginApi.isLogout().catch(err => {
                message.error(err.msg);
                // window.history.pushState({ type: "logout" }, "", "/#/login");
                window.history.pushState(null, "", "/#/login");
                // 通过history.state来获取history.pushState state
                console.error(err);
            })
        }
    }

    render() {
        let { isShowMenu, userData: { username } } = this.props;
        return <section className="headBox">
            {/* 基本导航栏 */}
            <ul className="headBox-nav" style={{ transform: isShowMenu ? "translateX(220px)" : "translateX(0)" }}>
                <li onClick={() => this.props.init()}>
                    <MenuFoldOutlined style={{ fontSize: "16px" }} />
                </li>
                <li className="min-box">
                    <Search placeholder="搜索" onSearch={value => console.log(value)} enterButton style={{ verticalAlign: "middle" }} />
                </li>
            </ul>

            {/* 用户模块 */}
            <div className="headBox-user min-box">
                <span>{username || document.cookie.slice(5)}</span>
                <dl className="headBox-user-dl">
                    <dd>
                        <NavLink to={"/sets/basic"}>{"基本资料"}</NavLink>
                    </dd>
                    <dd>
                        <NavLink to={"/sets/password"}>{"修改密码"}</NavLink>
                    </dd>
                    <dd>
                        <NavLink to={{
                            pathname: "/login",
                            state: {
                                type: "logout"
                            }
                        }}>{"退出"}</NavLink>
                    </dd>
                </dl>
            </div>
        </section>
    }
}


export default connect(state => ({ ...state.menu, ...state.login }), { ...action.menu, ...action.login })(Head);
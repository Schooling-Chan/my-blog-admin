// 头部模块
import { NavLink, withRouter } from 'react-router-dom';
import React from 'react';
import { MenuFoldOutlined, ReloadOutlined, GlobalOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import action from '../store/action/index';
import { Input } from 'antd';

// 头部样式
import '../static/less/head-nav.less';

// 请求
import ajax from '../static/request/axios-init';

const { Search } = Input;

class Head extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: this.props.userData.username || document.cookie.slice(5)
        }
    }

    /* 
        @params: e事件对象

        @return: undefined

        事件委托，实现不同功能
    */
    clickChange = async e => {
        // let value = e.target.getAttribute("data-icon");
        // if (!value) return;
        // switch (value) {
        //     case "menu-fold":
        //         await this.props.init();
        //         break;
        //     case "import":

        //         break;
        //     case "reload":

        //         break;
        // }
    }

    /* 
        获取user名字
    */
    componentDidMount() {

    }

    /**
     * @msg: 获取用户信息
     * @param {*}
     * @return {*}
     */
    getUser = () => {
        ajax.get({
            url: "/api/users"
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        })
    }

    render() {
        let { isShowMenu, isGetUser } = this.props;
        if (isGetUser) this.getUser();

        return <section className="headBox">
            {/* 基本导航栏 */}
            <ul className="headBox-nav" style={{ transform: isShowMenu ? "translateX(220px)" : "translateX(0)" }}>
                <li onClick={() => this.props.init()}>
                    <MenuFoldOutlined style={{ fontSize: "16px" }} />
                </li>
                <li onClick={this.clickChange}>
                    <GlobalOutlined style={{ fontSize: "16px" }} />
                </li>
                <li className="min-box" onClick={this.clickChange}>
                    <ReloadOutlined style={{ fontSize: "16px" }} />
                </li>
                <li className="min-box">
                    <Search placeholder="搜索" onSearch={value => console.log(value)} enterButton style={{ verticalAlign: "middle" }} />
                </li>
            </ul>

            {/* 用户模块 */}
            <div className="headBox-user min-box">
                <span>{this.state.username}</span>
                <dl className="headBox-user-dl">
                    <dd>
                        <NavLink to={"/sets/basic"}>{"基本资料"}</NavLink>
                    </dd>
                    <dd>
                        <NavLink to={"/sets/password"}>{"修改密码"}</NavLink>
                    </dd>
                    <dd>
                        <NavLink to={"/login?logout=true"} onClick={e => localStorage.removeItem('mytok')}>{"退出"}</NavLink>
                    </dd>
                </dl>
            </div>
        </section>
    }
}


export default withRouter(connect(state => ({ ...state.menu, ...state.login }), { ...action.menu, ...action.login })(Head));
// 公共左边菜单
import React from 'react';
import {CaretDownOutlined, HomeOutlined, PicRightOutlined, AuditOutlined, SettingOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

// 头部样式
import '../static/less/head-nav.less';

class Nav extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            isShow: false,
            contentIndex: null,
            lastIndex: null
        };
    }

    /* 
        @params: e事件对象

        @return: undefined

        点击显示菜单
    */
    showList = async e => {
        let value = e.target.text;
        e.nativeEvent.stopImmediatePropagation();//阻止事件冒泡
        if(!value) return;
        switch(value){//控制菜单
            case "主页":
                await this.setState({
                    contentIndex: 0,
                    isShow: !this.state.isShow
                })
                break;
            case "博客管理":
                await this.setState({
                    contentIndex: 1,
                    isShow: !this.state.isShow
                })
                break;
            case "用户管理":
                await this.setState({
                    contentIndex: 2,
                    isShow: !this.state.isShow
                })
                break;
            case "设置":
                await this.setState({
                    contentIndex: 3,
                    isShow: !this.state.isShow
                })
                break;
        }
        if(this.state.lastIndex === this.state.contentIndex) return;//判断索引是否一样
        this.setState({
            isShow: true,
            lastIndex: this.state.contentIndex
        })
            
    }


    render(){
        // 提取变量
        let {isShow, contentIndex} = this.state,
            {isShowMenu} = this.props;
        return <section className="navBox" style={{transform: isShowMenu ? "translate3d(0,0,0)" : "translate3d(-220px,0,0)"}}>
            {/* 标题 */}
            <div className="navBox-title">Joseph博客后台管理</div>

            {/* 导航栏链接 */}
            <ul className="navBox-ul" onClick={this.showList}>
                <li>
                    
                    <a href="javascript:;">
                        <HomeOutlined style={{fontSize: "16px", position: 'absolute', left: "5%", top: "50%", marginTop: "-8px"}}/>
                        <span>主页</span>
                        <CaretDownOutlined style={{fontSize: "16px", position: 'absolute', right: "10%", top: "50%", marginTop: "-8px"} } rotate={isShow && contentIndex === 0 ? 180 : 0}/>
                    </a>
                    
                    <dl className="navBox-ul-dl" style={{display: isShow && contentIndex === 0 ? "block" : "none"}}>
                        <dd>
                            <NavLink to="/" exact activeClassName="navBox-ul-dl-active">控制台</NavLink>
                        </dd>
                    </dl>
                </li>
                <li>
                    
                    <a href="javascript:;">
                        <PicRightOutlined style={{fontSize: "16px", position: 'absolute', left: "5%", top: "50%", marginTop: "-8px"}}/>
                        <span>博客管理</span>
                        <CaretDownOutlined style={{fontSize: "16px", position: 'absolute', right: "10%", top: "50%", marginTop: "-8px"}} rotate={isShow && contentIndex === 1 ? 180 : 0}/>
                    </a>
                    <dl className="navBox-ul-dl" style={{display: isShow && contentIndex === 1 ? "block" : "none"}}>
                        <dd>
                            <NavLink to="/blog/articles" activeClassName="navBox-ul-dl-active">文章分类</NavLink>
                        </dd>
                        <dd>
                            <NavLink to="/blog/message" activeClassName="navBox-ul-dl-active">消息中心</NavLink>
                        </dd>
                    </dl>
                </li>
                <li>
                    <a href="javascript:;">
                        <AuditOutlined style={{fontSize: "16px", position: 'absolute', left: "5%", top: "50%", marginTop: "-8px"}}/>
                        <span>用户管理</span>
                        <CaretDownOutlined style={{fontSize: "16px", position: 'absolute', right: "10%", top: "50%", marginTop: "-8px"}} rotate={isShow && contentIndex === 2 ? 180 : 0}/>
                    </a>
                    
                    <dl className="navBox-ul-dl" style={{display: isShow && contentIndex === 2 ? "block" : "none"}}>
                        <dd>
                            <NavLink to="/user/role" exact activeClassName="navBox-ul-dl-active">角色管理</NavLink>
                        </dd>
                        <dd>
                            <NavLink to="/user/administrators" activeClassName="navBox-ul-dl-active">后台管理员</NavLink>
                        </dd>
                    </dl>
                </li>
                <li>
                    <a href="javascript:;">
                        <SettingOutlined style={{fontSize: "16px", position: 'absolute', left: "5%", top: "50%", marginTop: "-8px"}}/>
                        <span>设置</span>
                        <CaretDownOutlined style={{fontSize: "16px", position: 'absolute', right: "10%", top: "50%", marginTop: "-8px"}} rotate={isShow && contentIndex === 3 ? 180 : 0}/>
                    </a>
                    
                    <dl className="navBox-ul-dl" style={{display: isShow && contentIndex === 3 ? "block" : "none"}}>
                        <dd>
                            <NavLink to="/sets/basic"  activeClassName="navBox-ul-dl-active">基本资料</NavLink>
                        </dd>
                        <dd>
                            <NavLink to="/sets/password" activeClassName="navBox-ul-dl-active">修改密码</NavLink>
                        </dd>
                    </dl>
                </li>
            </ul>
        </section>
    }
}

export default connect(state => ({...state.menu}))(Nav);
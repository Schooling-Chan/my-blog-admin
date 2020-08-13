// 基本样式
import React, { useState } from 'react';
import { Input} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';


// 导入样式
import '../../static/less/main-content.less';

function Password(props) {
    const [newPassword, setPass] = useState(null);

    return <section className="routerBox">
        {/* 头部 */}
        <div className="routerBox-head">
            修改密码
        </div>

        {/* 内容 */}
        <div className="routerBox-form">
            <div className="routerBox-form-item">
                <label>用户名</label>
                <Input placeholder="用户名" prefix={<UserOutlined />} disabled  style={{width: '50%'}} value={props.userData.username}/>
            </div>
            <div className="routerBox-form-item">
                <label>当前密码</label>
                <Input  placeholder="输入你的密码" style={{width: '50%'}}/>
            </div>
            <div className="routerBox-form-item">
                <label>新密码</label>
                <Input  placeholder="输入你的新密码" style={{width: '50%'}}/>
            </div>
            <div className="routerBox-form-item">
                <label>确认新密码</label>
                <Input  placeholder="输入你的新密码" style={{width: '50%'}}/>
            </div>
        </div>

        <div className="content-button-box">
            <button>确认修改</button>
        </div>
    </section>
}

export default connect(state => ({...state.login}))(Password);
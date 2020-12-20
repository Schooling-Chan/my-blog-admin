// 基本样式
import React, { useState } from 'react';
import { connect } from 'react-redux';

// 导入自定义
import CommonComponent from '../../component/common-content';


// 导入样式
import '../../static/less/main-content.less';

function Role() {
    return <section className="routerBox">
        <CommonComponent thead={{ id: "ID", title: "角色名", time: "加入时间", operation: "操作" }} buttonType="查看" articlesType="角色管理" menuType="用户管理" />
    </section>
}

export default connect(state => ({ ...state.login }))(Role);
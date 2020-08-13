// 基本样式
import React, { useState } from 'react';

// 导入自定义
import CommonComponent from '../../component/common-content';


// 导入样式
import '../../static/less/main-content.less';

export default function Articles() {
    return <section className="routerBox">
        <CommonComponent thead={{id: "消息ID", title: "消息标题", time: "提交时间", operation: "操作"}} buttonType = "查看" articlesType = "消息中心"/>
    </section>
}
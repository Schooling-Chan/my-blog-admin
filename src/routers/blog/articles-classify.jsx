import React, { useState } from 'react';

// 导入组件
// import {NavLink, Switch, Route, Redirect} from 'react-router-dom';
// 导入自定义
import CommonComponent from '../../component/common-content';

// 导入样式
import '../../static/less/main-content.less';


export default function Articles() {
    const [clickState, setState] = useState("HTML");

    return <section style={{height: "100%", width: "100%", position: "relative"}}>
        {/* 导航 */}
        <div className="content-head">
            <ul onClick={e => {
                /* 
                    @params: 时间对象
                    @return function 设置state
                */
                let val = e.target.getAttribute("data-attr");
                return setState(val);
            }}>
                <li>
                    <a className={clickState === "HTML" ? "content-head-active" : ""} data-attr="HTML">HTML</a>
                </li>
                <li>
                    <a className={clickState === "CSS" ? "content-head-active" : ""} data-attr="CSS">CSS</a>
                </li>
                <li>
                    <a className={clickState === "JS" ? "content-head-active" : ""} data-attr="JS">JS</a>
                </li>
                <li>
                    <a className={clickState === "React" ? "content-head-active" : ""} data-attr="React">React</a>
                </li>
                <li>
                    <a className={clickState === "Node" ? "content-head-active" : ""} data-attr="Node">Node</a>
                </li>
                <li>
                    <a className={clickState === "Safe" ? "content-head-active" : ""} data-attr="Safe">Safe</a>
                </li>
            </ul>
        </div>

        {/* 主体内容 */}
        <div className="routerBox">
            <CommonComponent type={clickState} thead={{id: "文章ID", title: "文章标题", time: "上传时间", operation: "操作"}}/>
        </div>
    </section>
}
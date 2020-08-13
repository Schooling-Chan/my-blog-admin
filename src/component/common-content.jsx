import React, { useState } from 'react';

// 导入组件
import {NavLink} from 'react-router-dom';
import { Checkbox, Pagination  } from 'antd';

// 导入样式
import '../static/less/main-content.less';



export default function Articles(props) {
    // 判断哪个页面
    let {type, buttonType = "编辑", articlesType = "文章分类", thead:{id, title, time, operation}, menuType = "博客管理"} = props;
    return <section style={{width: "100%",overflowX: "hidden"}}>
        {/* 头部 */}
        <div className="content-head-box">
                <NavLink to="/blog/">{menuType}</NavLink>
            <span>/</span>
            <NavLink to="/blog/articles">{articlesType}</NavLink>
            {type ? (<>
                <span>/</span>
                <NavLink to="/blog/articles">{type}</NavLink>
            </>) : " "}
        </div>
        
        {/* 按钮 */}
        <div className="content-button-box">
            <button type="delete">批量删除</button>
        </div>

        {/* 内容 */}
        <div className="content-main-box">
            <table>
                <thead className="content-main-box-thead">
                    <tr>
                        <th width="5%">
                            <Checkbox style={{fontSize: "16px"}}></Checkbox>
                        </th>
                        <th>
                            {id}
                        </th>
                        <th>
                            {title}
                        </th>
                        <th>
                            {time}
                        </th>
                        <th>
                            {operation}
                        </th>
                    </tr>
                </thead>

                <tbody className="content-main-box-tbody">
                    <tr>
                        <td>
                            <Checkbox style={{fontSize: "16px"}}></Checkbox>
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            js继承js继承js继承js继承js继承js继承js继承js继承js继承js继承
                        </td>
                        <td>
                            20201415
                        </td>
                        <td>
                            <div className="content-button-box">
                                <button type="delete">删除</button>
                                <button>{buttonType}</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Checkbox style={{fontSize: "16px"}}></Checkbox>
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            js继承js继承js继承js继承js继承js继承js继承js继承js继承js继承
                        </td>
                        <td>
                            20201415
                        </td>
                        <td>
                            <div className="content-button-box">
                                <button type="delete">删除</button>
                                <button>{buttonType}</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>    


        {/* 尾部分页 */}
        <div className="footerBox">
            <Pagination defaultCurrent={1} total={50} />
        </div>
    </section>
}
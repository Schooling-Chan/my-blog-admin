/*
 * @Author: your name
 * @Date: 2020-07-30 13:42:30
 * @LastEditTime: 2020-11-22 09:59:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\store\index.js
 */
/* 
    创建reducer容器
    文件默认导入index
*/

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

//reducer插件
import reduxLogger from 'redux-logger';
let store = createStore(reducer, applyMiddleware(reduxLogger));

export default store;
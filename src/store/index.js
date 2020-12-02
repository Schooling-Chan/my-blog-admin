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
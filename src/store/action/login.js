/*
 * @Author: your name
 * @Date: 2020-08-04 18:53:38
 * @LastEditTime: 2020-11-29 23:21:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\store\action\login.js
 */
import * as TYPE from '../action-type';

let menu = {
    login(payload) { //登录获取用户信息
        return {
            type: TYPE.IS_LOGIN,
            payload
        }
    },
};

export default menu;
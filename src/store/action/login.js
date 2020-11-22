/*
 * @Author: your name
 * @Date: 2020-08-04 18:53:38
 * @LastEditTime: 2020-11-22 10:11:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\store\action\login.js
 */
import * as TYPE from '../action-type';

let menu = {
    login(payload) {
        return {
            type: TYPE.IS_LOGIN,
            payload
        }
    },
    getUser() {
        return {
            type: TYPE.GET_LOGIN
        }
    }
};

export default menu;
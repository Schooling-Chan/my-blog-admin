/* 
    reducer结合各个模块的reducer

*/
import { combineReducers } from 'redux'; //结合reducer

// 结合模块
import menu from './menu';
import login from './login';

let reducer = combineReducers({
    menu,
    login
});
export default reducer;
import * as TYPE from '../action-type';

export default function Menu(state = {
    userData: {},

}, action) {
    state = JSON.parse(JSON.stringify(state)); // 把原有的信息深度克隆一份防止修改原有的状态信息，return才覆盖原有的信息

    switch (action.type) {
        case TYPE.IS_LOGIN:
            state.userData = {...action.payload }
            break;
    }
    return state;
}
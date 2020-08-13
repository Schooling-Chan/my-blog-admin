import * as TYPE from '../action-type';

let menu = {
    login(payload) {
        return {
            type: TYPE.IS_LOGIN,
            payload
        }
    }
};

export default menu;
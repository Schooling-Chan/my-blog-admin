// 引入axios
import ajax from '../util/axios-init';
// 退出登录
function logout() {
    return ajax.get({
        url: '/api/logout'
    }).then(res => {
        if (res.success) {
            return res;
        } else {
            throw res;
        }
    })
}

// 登录
function login(reqHead) {
    return ajax.post({
        url: "/api/login",
        headers: {
            "Fetch-Site": reqHead.slice(0, reqHead.length >> 1),
            "Fetch-Res": reqHead.slice(reqHead.length >> 1),
        }
    }).then(res => {
        if (res.success) {
            return res;
        } else {
            throw res;
        }
    })
}


// 注册
function register(reqHead) {
    return ajax.post({
        url: "/api/register",
        headers: {
            "Fetch-Site": reqHead.slice(0, reqHead.length >> 1),
            "Fetch-Res": reqHead.slice(reqHead.length >> 1),
        }
    }).then(res => {
        if (res.success) {
            return res;
        } else {
            throw res;
        }
    })
}

// 是否过期
function isLogout() {
    return ajax.get({
        url: '/api/users'
    }).then(res => {
        if (res.success) {
            return res;
        } else {
            throw res;
        }
    })
}

export default {
    logout,
    login,
    register,
    isLogout
}
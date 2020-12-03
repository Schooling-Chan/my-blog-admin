// 设置修改有关
// 引入axios
import ajax from '../util/axios-init';

// 检测密码正确
function checkPass(password) {
    return ajax.put({
        url: '/api/user/password',
        headers: {
            "Fetch-Site": password.slice(0, password.length >> 1),
            "Fetch-Res": password.slice(password.length >> 1),
        }
    }).then(res => {
        if (res.success) {
            return res;
        } else {
            throw res;
        }
    })
}

export default {
    checkPass
}
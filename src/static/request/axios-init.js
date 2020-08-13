import axios from 'axios';

// 默认配置项
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = "http://localhost:8080";
axios.interceptors.response.use(function(response) {
    return response.data; //返回值就是then函数的res的内容，直接返回res中data的内容
}, function(error) {
    return Promise.reject(error);
});
// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    let token = window.localStorage.getItem("mytok")
    if (token) {
        config.headers["accessToken"] = token; //将token放到请求头发送给服务器
        return config;
    }
    return config;
});


export function get() {
    return axios.get;
}

export function post() {
    return axios.post;
}
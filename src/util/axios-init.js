import axios from 'axios';

// 默认配置项
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = "http://127.0.0.1:81";
axios.interceptors.response.use(function(response) {
    return response.data; //返回值就是then函数的res的内容，直接返回res中data的内容
}, function(error) {
    return Promise.reject(error);
});
// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    let token = window.localStorage.getItem("shahsxpb");
    let isLogin = window.localStorage.getItem("isLogin");
    if (token !== "") {
        config.headers["Oc-Pd"] = token; //将token放到请求头发送给服务器
    }
    if (isLogin === "true") {
        config.headers["Oc-Is"] = isLogin;
    }
    return config;
});


export default {
    // headers: application/json;charset=utf-8
    get(params) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'get',
                    url: params.url,
                    params: params.data || '',
                    headers: {
                        "Content-Type": 'application/json;charset=utf-8',
                    },
                })
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // headers: application/x-www-form-urlencoded;charset=UTF-8
    getForm(params) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'get',
                    url: params.url,
                    params: params.data || '',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                })
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // headers: application/json;charset=utf-8
    post(params) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'post',
                    url: params.url,
                    data: params.data || '',
                    headers: {
                        "Content-Type": 'application/json;charset=utf-8',
                        ...params.headers
                    },
                })
                .then(function(res) {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // headers: application/x-www-form-urlencoded;charset=UTF-8
    postForm(params) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'post',
                    url: params.url,
                    data: params.data || '',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                })
                .then(function(res) {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // headers: application/json;charset=utf-8
    del(params) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'delete',
                    url: params.url,
                    data: params.data || '',
                    headers: {
                        "Content-Type": 'application/json;charset=utf-8'
                    },
                })
                .then(function(res) {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // headers: application/x-www-form-urlencoded;charset=UTF-8
    delForm(params) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'delete',
                    url: params.url,
                    data: params.data || '',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                })
                .then(function(res) {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // headers: application/json;charset=utf-8
    put(params) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'put',
                    url: params.url,
                    data: params.data || '',
                    headers: {
                        "Content-Type": 'application/json;charset=utf-8'
                    },
                })
                .then(function(res) {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // headers: application/x-www-form-urlencoded;charset=UTF-8
    putForm(params) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'put',
                    url: params.url,
                    data: params.data || '',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                })
                .then(function(res) {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';

//css
import './static/less/reset.css';

// 自定义组件
import Head from './component/head';
import LeftNav from './component/left-nav';
import Login from './component/login';

// reducer
import store from './store';

// 路由
import Blog from './routers/blog';
import Home from './routers/home';
import User from './routers/user';
import Sets from './routers/sets';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            {/* 公共头部 */}
            <Head></Head>
            {/* 左边菜单 */}
            <LeftNav></LeftNav>

            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/user' component={User} />
                <Route path='/blog' component={Blog} />
                <Route path='/login' exact component={Login} />
                <Route path='/sets' component={Sets} />

                {/* 非法页面 */}
                <Redirect to={document.cookie !== '' ? "/?type=unsafe" : '/login'} />
            </Switch>

        </HashRouter>

    </Provider>,
    document.getElementById('root')
);
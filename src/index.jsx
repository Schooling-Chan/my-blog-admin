import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

//css
import './static/less/reset.css';

// reducer
import store from './store';

// 自定义组件
// import Head from './component/head';
// import LeftNav from './component/left-nav';
import Login from './component/login';
const Head = lazy(() => import('./component/head'));
const LeftNav = lazy(() => import('./component/left-nav'));



// 路由
// import Blog from './routers/blog';
// import Home from './routers/home';
// import User from './routers/user';
// import Sets from './routers/sets';
const Sets = lazy(() => import('./routers/sets'));
const User = lazy(() => import('./routers/user'));
const Home = lazy(() => import('./routers/home'));
const Blog = lazy(() => import('./routers/blog'));

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
        </HashRouter>

    </Provider>,
    document.getElementById('root')
);
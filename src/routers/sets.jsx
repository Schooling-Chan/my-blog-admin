import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// 自定义组件
import Info from './sets/my-info';
import Password from './sets/password';

// css
import  '../static/less/head-nav.less';

class Sets extends React.Component{
    constructor(props, context){
        super(props, context);
        if(localStorage.getItem('mytok') === null) this.props.history.push("/login")
    }
    render(){
        let {isShowMenu} = this.props;
        return <section className='contentBox' style={{left: isShowMenu ? "220px" : "0"}}>
            <Switch>
                <Route path='/sets/basic'   component={Info}/>
                <Route path='/sets/password'   component={Password}/>

                {/* 非法页面 */}
                <Redirect from="/sets" exact to="/sets/basic"/>
            </Switch>
        </section>
    }
}

export default connect(state => ({...state.menu}))(Sets);
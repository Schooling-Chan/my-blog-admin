import React from 'react';

export default class Home extends React.Component{
    constructor(props, context){
        super(props, context);
        if(localStorage.getItem('mytok') === null) this.props.history.push("/login");
    }

    render(){
        return <section>

        </section>
    }
}
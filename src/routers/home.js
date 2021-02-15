import React from 'react';

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (document.cookie === '') this.props.history.push("/login");
    }

    render() {
        return <section>

        </section>
    }
}
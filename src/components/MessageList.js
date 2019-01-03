import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <section className='.RColumn-MessageArea'>
                <main className='Messages'>
                    <h3>{ this.props.activeRoom.name }</h3>
                    
                </main>
            </section>
        )
    }
}
export default MessageList;

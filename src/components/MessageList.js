import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
        this.messagesRef = this.props.firebase.database().ref('Messages');
    }

    componentDidMount() {
        if(!this.props.activeRoom.key) {return}; 
            this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoom.key).on('child_added', snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
                this.setState({ messages: this.state.messages.concat( message ) })
            });
    }

    render() {
        return(
            <section className='.RColumn-MessageArea'>
                <main className='Messages'>

                    <table>
                        <thead>
                            <tr>
                                <th>{ this.props.activeRoom.name }, { this.props.activeRoom.key }</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.messages.map( (message, index) => 
                                    <tr key={ index } classRoom='message'>
                                        <td>{ message.username }</td>
                                        <td>{ message.content }</td>
                                        <td>{ message.sentAt }</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    
                </main>
            </section>
        )
    }
}
export default MessageList;

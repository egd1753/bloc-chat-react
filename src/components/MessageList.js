import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMessages: [],
        };
        this.messagesRef = this.props.firebase.database().ref('Messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const messageObject = snapshot.val();
            messageObject.key = snapshot.key;
            this.setState({ allMessages: this.state.allMessages.concat( messageObject ) })
        });
    }


    render() {
        return(
            <section className='.RColumn-MessageArea'>
                <main className='Messages'>

                    <table>
                        <thead>
                            <tr>
                                <th>{ this.props.activeRoom.name }</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                this.state.allMessages
                                    .filter(message => message.roomId == this.props.activeRoom.key)
                                    .map( (message, index) => 
                                        <tr key={ index } className='message'>
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

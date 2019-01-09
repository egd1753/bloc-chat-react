import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMessages: [],
            newMessage: ''
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
    
    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }
    
    handleCreateMessage(e) {
        e.preventDefault();
        if(!this.state.newMessage) { return }
        const newMessageObject = { username: this.props.currentUser.displayName, content: this.state.newMessage, sentAt: "9:20", roomId: this.props.activeRoom.key };
        this.messagesRef.push(newMessageObject);
        this.setState({ newMessage: '' });
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

                <form onSubmit={ (e) => this.handleCreateMessage(e) }>
                        <input 
                            type='text'  
                            value={ this.state.newMessage }
                            onChange={ (message) => this.handleChange(message) }
                        />
                        <input 
                            type='submit' 
                            value='Send'
                        />
                    </form>
            </section>
        )
    }
}
export default MessageList;

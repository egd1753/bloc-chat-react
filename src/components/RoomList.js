import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName: '',
        };
    this.roomsRef = this.props.firebase.database().ref('rooms'); 
    
    }

    
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value });
    }

    handleCreateRoom(e) {
        e.preventDefault();
        if(!this.state.newRoomName) { return }
        const newRoom = { name: this.state.newRoomName };
        this.roomsRef.push(newRoom);
        this.setState({ newRoomName: '' });
    }

    handleRoomClick(room) {
        this.props.setActiveRoom(room);
    }

    render() {
        return (
            <section className='RoomListComponent'>
                <div className='LColumn-RoomList'>
                    <header>
                        <h2>Bloc Chat</h2>
                    </header>

                    <nav>
                        <ul>
                            {
                                this.state.rooms.map( (room, index) => 
                                    <li
                                        key={ index }
                                        className='room'
                                        onClick={ () => this.handleRoomClick(room) }
                                    >
                                    { room.name }
                                    </li>
                                )
                            }
                        </ul> 
                    </nav> 

                    <form onSubmit={ (e) => this.handleCreateRoom(e) }>
                        <input 
                            type='text' 
                                value={ this.state.newRoomName } 
                                onChange={ (e) => this.handleChange(e) }
                            />
                        <input type='submit' />
                    </form>

                </div>

                <div className='RColum-MessageArea'>
                    <header className='MessageHeader'>
                    </header>
                    <main className='Messages'>
                    </main>
                </div>
            </section>
        )
    }
}

export default RoomList;
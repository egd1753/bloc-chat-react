import React, { Component } from 'react';

/*
const liStyle = {
    backgroundColor : 'lightblue'
}
*/

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
            const roomObject = snapshot.val();
            roomObject.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( roomObject ) })
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
/*
    handleActiveRoomHighlight(room) {
        
    }
*/

    

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
                            onChange={ (room) => this.handleChange(room) }
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
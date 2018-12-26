import React, { Component } from 'react';


class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
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
                                        key={index}
                                        className='room'
                                    >
                                    {room.name}
                                    </li>
                                )
                            }
                        </ul> 
                    </nav> 
                </div>
                <div className='RColum-MessageArea'>
                    <header className='MessageHeader'>
                        <h1></h1>
                    </header>
                    <main className='Messages'>

                    </main>
                </div>
            </section>
        )
    }
}

export default RoomList;
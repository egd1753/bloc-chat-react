import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAuHGz9PM2QsFhtOKf0omEXP7VT_6jXlfs",
  authDomain: "bloc-chat-react-c9b16.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-c9b16.firebaseio.com",
  projectId: "bloc-chat-react-c9b16",
  storageBucket: "bloc-chat-react-c9b16.appspot.com",
  messagingSenderId: "762262567180"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: []
    };
      
  }
   
  setActiveRoom(room) {
    this.setState({ activeRoom: room });
    console.log("App.js says activeRoom key is", this.state.activeRoom.key);
  }

  render() {
    return (
      <div className="App">
        <RoomList 
          firebase={ firebase } 
          activeRoom={ this.state.activeRoom } 
          setActiveRoom={ (currentRoom) => this.setActiveRoom(currentRoom) }
        />        
        <MessageList 
          firebase={ firebase } 
          activeRoom={ this.state.activeRoom }
        />
      </div>
    );
  }
}

export default App;

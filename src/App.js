import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList'; 
import User from './components/User/User.js';


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
      activeRoom: [],
      isLoggedIn: false,
      currentUser: []
    }; 
  }
   
  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ currentUser: user });
  }

  setIsLoggedIn() {
    this.setState({ isLoggedIn: true }); 
  }

  setIsLoggedOff() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <div className="AppComponents">
        <RoomList 
          firebase={ firebase } 
          activeRoom={ this.state.activeRoom } 
          setActiveRoom={ (currentRoom) => this.setActiveRoom(currentRoom) }
        />

        <User 
          firebase={ firebase }
          setUser={ (x) => this.setUser(x) }
          currentUser={ this.state.currentUser }
          isLoggedIn= { this.state.isLoggedIn }
          setIsLoggedIn={ () => this.setIsLoggedIn() }
          setIsLoggedOff={ () => this.setIsLoggedOff() }
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

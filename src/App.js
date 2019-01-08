import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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


  render() {
    return (
      <div className="App">
      <main>
        <RoomList firebase={firebase}/>
        {/*
        <header>
          <nav>
            <Link to='/'>RoomList</Link>
          </nav>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <Route exact path="/" component={RoomList} />
        </main>
        */}
        </main>
      </div>
    );
  }
}

export default App;

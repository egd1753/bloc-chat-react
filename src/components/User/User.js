import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.handleDisplayUsername = this.handleDisplayUsername.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
          });
    }

    handleLogIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        this.props.setIsLoggedIn();  
    }

    handleLogOut() {
        this.props.firebase.auth().signOut();
        this.props.setIsLoggedOff();
    }

    handleDisplayUsername() {
        if(!this.props.isLoggedIn) {
            return "Guest";
        } else {
            return this.props.currentUser.displayName;
        }
    }

    render() {
        return(
            <section className='user-info'>
                <header>
                    <h3>Welcome, { this.handleDisplayUsername() }</h3>
                </header>
                <button onClick={ () => this.handleLogIn() }>Log In</button>
                <button onClick={ () => this.handleLogOut() }>Log Out</button>
                {
                    /*
                    <form className='user-info' onSubmit={ (e) => this.handleLogIn(e) }>
                        <input />
                    </form>
                    */
                }
            </section>
        )
    }
}

export default User;
import React, { Component } from 'react';
import Login from './Login';
import Chat from './Chat';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userName: "", 
      loggedIn: false,
      usernameError: null,
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onUsernameError = this.onUsernameError.bind(this);
  }

  onUsernameError(errorMessage){
    this.setState({ usernameError: errorMessage });
  }

  onChangeName(e) {
    this.setState({ userName: e.target.value });
  }
  onLogin() {
    this.setState({ loggedIn: true });
  }
  onLogout() {
    this.setState({ loggedIn: false });
  }
  render() {
    let main = null;
    if (this.state.loggedIn) {
      main = <Chat userName={this.state.userName} onLogout={this.onLogout}/>;
    } else {
      main = (
        <Login
          onUsernameError={this.onUsernameError}
          usernameError={this.state.usernameError}
          userName={this.state.userName}
          onChange={this.onChangeName}
          onLogin={this.onLogin}
        />
      );
    }
    return (
      <div className="App">
        {main}
      </div>
    );
  }
}

export default App;



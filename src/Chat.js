import React, { Component } from 'react';
import io from "socket.io-client";
import MessageList from './MessageList';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      allMessages: [],
    };    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() { // denna kickar igång när loggedIn === true
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    this.socket.on('messages', (messages) => { // om jag kör arrow fn kmr this att vara samma som det är utanför funktionen
      this.setState({allMessages: messages});
      console.log("Ansluten");
      console.log("20 st messages:", messages);
    });   
    this.socket.on('new_message', (message) => {
      this.setState({allMessages: [...this.state.allMessages, message]});
    });
    console.log('componentDidMount');
  }
  componentWillUnmount() { // när vi säger monterar menar man att den renderas i DOM:en.
    console.log('componentWillUnmount');
    this.socket.disconnect();
    this.socket = null;
  }
  onSubmit (e) {
    e.preventDefault();
    this.setState({message: ""});
    this.socket.emit("message", {
      username: this.props.userName,
      content: this.state.message,
    }, (response) => {
      console.log(response);

      this.setState({ allMessages: [...this.state.allMessages, response.data.newMessage]});
    }); 
  }
  onChange(e) {
    this.setState({message: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <header>
          <h2>Du är inloggad som {this.props.userName}!</h2>
          <button onClick={this.props.onLogout}>Log out</button>
        </header>
        <main>
          <div className="chat-container">
            <MessageList
              messages={this.state.allMessages}
            />
            <div className="chat-controls">
            <form className="form-controll" onSubmit={this.onSubmit}>
              <input type="text" value={this.state.message} onChange={this.onChange} maxLength={200} required/>
              <button type="submit">Send message</button>
            </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Chat;

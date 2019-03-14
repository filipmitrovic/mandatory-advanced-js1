import React, {Component} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

class MessageList extends Component {
  render() {
    return (
      <ScrollToBottom className="messages"> 
      {this.props.messages.map(x => {
        const contentWithLinks = x.content
          .split(" ")
          .map((word, i) => {
            let urlRegex = /^(https?:\/\/[^\s]+)/g;
            if (urlRegex.test(word)) {
              return <a key={i} href={word}>{word}</a>
            }

            if (word === ':beer:') {
              return '🍺';
            }
            else if (word === ':smile:') {
              return '😊';
            }
            else if (word === ':cry:') {
              return '😭';
            }
            else if (word === ':angry:') {
              return '😡';
            }
            return word;
          })
          .map((x) => {
            return [x, " "];
          });

        return (
        <div className="message" key={x.id}>
          <p className="username" >Från:{x.username}</p>
          <span className="chat-message">Meddelande:{contentWithLinks}</span>
          <p className="msg_time">Tid:{new Date(x.timestamp).toLocaleString("sv-SE")}</p>
        </div>
        );
        })
      }
      </ScrollToBottom>
    )
  }
}

export default MessageList
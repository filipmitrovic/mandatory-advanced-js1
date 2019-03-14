import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit (e) {
    e.preventDefault(); 
    const { userName } = this.props;
    let checkSymbols = null;
    if (!userName.match(/[^0-9a-z_-]/i)) { // obs skriv - i slutet om och inte ha mellanrum i slutet
      this.props.onLogin();
    } else {
      this.props.onUsernameError("Username is invalid");
    }

    // if (userName.length < 10 && userName.length >= 1)  {
    //   console.log(this.props.userName);
      
    //   console.log('1-10');
    // }
    // this.props.onLogin();
    // console.log('submited');
  }
  render() {
    return (
      <div className="">
        <form onSubmit={this.onSubmit}>
        <p>The username can only contain alphanumeric characters, “-”, “_” and spaces and must be between 1 and 12 characters long</p>
          <input 
            type="text"
            value={this.props.userName}
            onChange={this.props.onChange}
            required
            maxLength={12}
            pattern="[a-zA-Z0-9_ -]+"
          />
          <button type="submit">Login</button>     
        </form>
        {this.props.usernameError}
      </div>
    );
  }
}

export default Login;

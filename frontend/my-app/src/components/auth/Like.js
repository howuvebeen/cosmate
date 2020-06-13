import React, { Component } from "react";


class LikeControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  LikeButton(props) {
    return (
      <button onClick={props.onClick}>
        Like
      </button>
    );
  }
  
  UnlikeButton(props) {
    return (
      <button onClick={props.onClick}>
        Unlike
      </button>
    );
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LikeButton onClick={this.handleLogoutClick} />;
    } else {
      button = <UnlikeButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
}

function LikeButton(props) {
  return (
    <button onClick={props.onClick}>
      Like
    </button>
  );
}

function UnlikeButton(props) {
  return (
    <button onClick={props.onClick}>
      Unlike
    </button>
  );
}

export default LikeControl;

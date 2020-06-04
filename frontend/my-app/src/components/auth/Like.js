import React, { Component } from "react";

class LikeControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLike = this.handleLike.bind(this);
      this.handleUnlike = this.handleUnlike.bind(this);
      this.state = {isLiked: false};
    }
  
    handleLike() {
      this.setState({isLiked: true});
    }
  
    handleUnlike() {
      this.setState({isLiked: false});
    }
  
    render() {
      const isLiked = this.state.isLiked;
      let button;
  
      if (isLiked) {
        button = <LikeButton onClick={this.handleLike} />;
      } else {
        button = <UnlikeButton onClick={this.handleUnlike} />;
      }
  
      return (
        <div>
          <Greeting isLiked={isLiked} />
          {button}
        </div>
      );
    }
  }

  function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }
  
  function Greeting(props) {
    const isLiked = props.isLiked;
    if (isLiked) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }
  function LikeButton(props) {
    return (
      <button onClick={props.onClick}>
        ♡
      </button>
    );
  }
  
  function UnlikeButton(props) {
    return (
      <button onClick={props.onClick}>
        ♥︎
      </button>
    );
  }
  
  ReactDOM.render(
    <LikeControl />,
    document.getElementById('root')
  );
  
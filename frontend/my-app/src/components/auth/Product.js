import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getTokenUser } from "../../actions/authActions";
import { getProduct } from "../../actions/authActions";
import { getReviewList } from "../../actions/authActions";

class Product extends Component {
  static propTypes = {
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object,

    getReviewList: PropTypes.func.isRequired,
    review: PropTypes.object,

    getTokenUser: PropTypes.func.isRequired,
    user: PropTypes.object,

    authenticated: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.state = {isLiked: false,
                  isAdded: false };
  }

  componentWillMount() {
    this.props.getProduct(this.props);
    this.props.getReviewList(this.props);

    const token = localStorage.getItem("token");
    this.props.getTokenUser(token);
  }

  handleLoginClick() {
    this.setState({isLiked: true});
  }

  handleLogoutClick() {
    this.setState({isLiked: false});
  }

  handleAddClick() {
    this.setState({isAdded: true});
  }

  handleRemoveClick() {
    this.setState({isAdded: false});
  }

  Tag(type) {
    if (type != null){
      var arrayLength = type.length;
      var result = "";
      for (var i = 0; i < arrayLength; i++) {
        if (type[i] == "O") {
          var result = result.concat("Oily");
        } else if (type[i] == "D") {
          var result = result.concat("Dry");
        } else {
          var result = result.concat("Combinational");
        }
        var result = result.concat(" ");
      }
      return result;
    };  
  }

  List(type) {
    if (type != null){
      var arrayLength = type.length;
      var result = "";
      for (var i = 0; i < arrayLength; i++) {
        if (type[i] == "T") {
          var result = result.concat("Trouble");
        } else if (type[i] == "A") {
          var result = result.concat("Acne");
        } else if (type[i] == "SS") {
          var result = result.concat("Sensitive Skin");
        } else {
          var result = result.concat("None");
        }
        var result = result.concat(" ");
      }
      return result;
    } 
  };
  
  Star(star){
    if (star != null){
      if (star < 1){
        return "☆☆☆☆☆";
      } else if (star >= 1 && star < 2) {
        return "★☆☆☆☆";
      } else if (star >= 2 && star < 3) {
        return "★★☆☆☆";
      } else if (star >= 3 && star < 4) {
        return "★★★☆☆";
      } else if (star >= 4 && star < 5) {
        return "★★★★☆";
      } else {
        return "★★★★★";
      }
    }
  };

  Space(ingredient) {
    if (ingredient != null){
      var arrayLength = ingredient.length;
      var result = ""; 
      for (var i = 0; i < arrayLength; i++) {
        var result = result.concat(ingredient[i]);
        var result = result.concat(" ");
      }
      return result;
    }
  };  

  renderProduct() {
    const product = this.props.product;
    const authenticated = this.props.authenticated;
    console.log(authenticated);
    const isAdded = this.state.isAdded;
    let link; 

    if (isAdded) {
      link = <AddLink onClick={this.handleRemoveClick} />;
    } else {
      link = <RemoveLink onClick={this.handleAddClick} />;
    }

    if (product && !(authenticated)) {
      return (
        <div className="p-5">
          <div>
            <p>{product.company}</p>
            <h4>{product.name}</h4>
            <p>{this.Star(product.average_star)}</p>
            <p>{this.Tag(product.skintype)}</p>
            <p>{this.Space(product.ingredients)}</p>
          </div>
        </div>
      );
    } else if (product && authenticated) {
      return (
        <div className="p-5">
          <div>
            <p>{product.company}</p>
            <h4>{product.name}</h4>
            <p>{this.Star(product.average_star)}</p>
            <p>{this.Tag(product.skintype)}</p>
            <p>{this.Space(product.ingredients)}</p>
          </div>
          <div>
            {link}
          </div>
        </div>
      );
    }
    return null;
  }

  renderReviewList() {
    const product = this.props.product;
    const reviews = this.props.review;
    const authenticated = this.props.authenticated;
    const user = this.props.user;
    const isLiked = this.state.isLiked;
    let button;

    if (isLiked) {
      button = <LikeButton onClick={this.handleLogoutClick} />;
    } else {
      button = <UnlikeButton onClick={this.handleLoginClick} />;
    }

    return (
      null
    );
  }

  render() {
    return (
      <div>
        {this.renderProduct()}
        <hr />
        {this.renderReviewList()}
      </div>
    );
  }
}

function LikeButton(props) {
  return (
    <button className="btn btn-light" onClick={props.onClick}>
      Like
    </button>
  );
}

function UnlikeButton(props) {
  return (
    <button className="btn btn-light" onClick={props.onClick}>
      Unlike
    </button>
  );
}

function AddLink(props) {
  return (
    <Link onClick={props.onClick}>
        + Add to Interested Products
    </Link>
  );
}

function RemoveLink(props) {
  return (
    <Link onClick={props.onClick}>
        - Remove from Interested Products
    </Link>
  );
}

function mapStateToProps(state) {
  return {
    product: state.auth.product,
    review: state.auth.review,
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { getProduct, getReviewList, getTokenUser})(Product);

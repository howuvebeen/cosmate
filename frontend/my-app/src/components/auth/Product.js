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

  componentWillMount() {
    this.props.getProduct(this.props);
    this.props.getReviewList(this.props);

    const token = localStorage.getItem("token");
    this.props.getTokenUser(token);
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

    if (product) {
      return (
        <div className="p-5">
          <p>{product.company}</p>
          <h4>{product.name}</h4>
          <p>{this.Star(product.average_star)}</p>
          <p>{this.Tag(product.skintype)}</p>
          <p>{this.Space(product.ingredients)}</p>
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
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LikeButton onClick={this.handleLogoutClick} />;
    } else {
      button = <UnlikeButton onClick={this.handleLoginClick} />;
    }

    if (reviews && product && user) {
      return (
        <div class="col p-3">
          <h4>Influencer Reviews</h4>
          {reviews.map((review) => {
            if (review.influencer == "Y"){
              if (authenticated && user.username == review.author){
                return (
                  <div class="row p-3 ml-3">
                    <div class="col-md-3">
                      <h4>{review.author} ✅</h4>
                      <p>{review.pub_date}</p>
                      <p>Skin Type: {this.Tag(review.skintype)}</p>
                      <p>Skin Issue: {this.List(review.skinissue)}</p>
                      <p>Age: {review.age}</p>
                    </div>
                    <div class="col-md-6">
                      <p>{this.Star(review.star)}</p>
                      <h5>{review.title}</h5>
                      <p>{review.review}</p>
                    </div>
                    <div class="ml-auto col-md-1">
                      {button}
                      <Link to={`/skincare/${product.category[0].toLowerCase()}/${product.pk}/review/edit`} class="text-md-left"><button className="btn btn-light">Edit</button></Link>
                      <Link to={`/skincare/moisturizers/${product.pk}/review/delete`} class="text-md-left"><button className="btn btn-light">Delete</button></Link>
                    </div>
                  </div>
                );
              } else if (authenticated){
                return (
                  <div class="row p-3 ml-3">
                    <div class="col-md-3">
                      <h4>{review.author} ✅</h4>
                      <p>{review.pub_date}</p>
                      <p>Skin Type: {this.Tag(review.skintype)}</p>
                      <p>Skin Issue: {this.List(review.skinissue)}</p>
                      <p>Age: {review.age}</p>
                    </div>
                    <div class="col-md-6">
                      <p>{this.Star(review.star)}</p>
                      <h5>{review.title}</h5>
                      <p>{review.review}</p>
                    </div>
                    <div class="ml-auto col-md-1">
                      {button}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div class="row p-3 ml-3">
                    <div class="col-md-3">
                      <h4>{review.author} ✅</h4>
                      <p>{review.pub_date}</p>
                      <p>Skin Type: {this.Tag(review.skintype)}</p>
                      <p>Skin Issue: {this.List(review.skinissue)}</p>
                      <p>Age: {review.age}</p>
                    </div>
                    <div class="col-md-6">
                      <p>{this.Star(review.star)}</p>
                      <h5>{review.title}</h5>
                      <p>{review.review}</p>
                    </div>
                  </div>
                );
              }
            } else {
              return null;
            }
          })}
          <hr />
          <h4>Reviews</h4>
          {reviews.map((review) => {
            if (review.influencer == "N"){
              if (authenticated && user.username == review.author){
                return (
                  <div class="row p-3 ml-3">
                    <div class="col-md-3">
                      <h4>{review.author}</h4>
                      <p>{review.pub_date}</p>
                      <p>Skin Type: {this.Tag(review.skintype)}</p>
                      <p>Skin Issue: {this.List(review.skinissue)}</p>
                      <p>Age: {review.age}</p>
                    </div>
                    <div class="col-md-6">
                      <p>{this.Star(review.star)}</p>
                      <h5>{review.title}</h5>
                      <p>{review.review}</p>
                    </div>
                    <div class="ml-auto col-md-1">
                      {button}
                      <Link to={`/skincare/${product.category[0].toLowerCase()}/${product.pk}/review/edit`} class="text-md-left"><button className="btn btn-light">Edit</button></Link>
                      <Link to={`/skincare/moisturizers/${product.pk}/review/delete`} class="text-md-left"><button className="btn btn-light">Delete</button></Link>
                    </div>
                  </div>
                );
              } else if (authenticated){
                return (
                  <div class="row p-3 ml-3">
                    <div class="col-md-3">
                      <h4>{review.author}</h4>
                      <p>{review.pub_date}</p>
                      <p>Skin Type: {this.Tag(review.skintype)}</p>
                      <p>Skin Issue: {this.List(review.skinissue)}</p>
                      <p>Age: {review.age}</p>
                    </div>
                    <div class="col-md-6">
                      <p>{this.Star(review.star)}</p>
                      <h5>{review.title}</h5>
                      <p>{review.review}</p>
                    </div>
                    <div class="ml-auto col-md-1">
                      {button}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div class="row p-3 ml-3">
                    <div class="col-md-3">
                      <h4>{review.author}</h4>
                      <p>{review.pub_date}</p>
                      <p>Skin Type: {this.Tag(review.skintype)}</p>
                      <p>Skin Issue: {this.List(review.skinissue)}</p>
                      <p>Age: {review.age}</p>
                    </div>
                    <div class="col-md-6">
                      <p>{this.Star(review.star)}</p>
                      <h5>{review.title}</h5>
                      <p>{review.review}</p>
                    </div>
                  </div>
                );
              }
            } else {
              return (null);
            }
          })}
          <div class="ml-auto text-right">
            <Link to={`/skincare/${product.category[0].toLowerCase()}/${product.pk}/review/upload`} class="text-md-left"><button className="btn btn-info">New Review</button></Link>
          </div>      
        </div>
      );
    }
    return null;
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

function mapStateToProps(state) {
  return {
    product: state.auth.product,
    review: state.auth.review,
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { getProduct, getReviewList, getTokenUser})(Product);

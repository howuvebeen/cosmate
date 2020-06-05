import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProduct } from "../../actions/authActions";
import { getReviewList } from "../../actions/authActions";

class Product extends Component {
  static propTypes = {
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object,

    getReviewList: PropTypes.func.isRequired,
    review: PropTypes.object,
  };

  componentWillMount() {
    this.props.getProduct(this.props);
    this.props.getReviewList(this.props, "N");
  }

  renderProduct() {
    const product = this.props.product;

    function Star(star) {
      if (star < 1) {
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

    function Tag(type) {
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
    }

    function Space(ingredient) {
      var arrayLength = ingredient.length;
      var result = "";
      for (var i = 0; i < arrayLength; i++) {
        var result = result.concat(ingredient[i]);
        var result = result.concat(" ");
      }
      return result;
    }

    if (product) {
      return (
        <div className="p-5">
          <p>{product.company}</p>
          <h4>{product.name}</h4>
          <p>{Star(product.average_star)}</p>
          <p>{Tag(product.skintype)}</p>
          <p>{Space(product.ingredients)}</p>
        </div>
      );
    }
    return null;
  }

  renderReviewList() {
    const { handleSubmit, error } = this.props;
    const reviews = this.props.review;

    function Tag(type) {
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
    }

    function List(type) {
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

    function Star(star) {
      if (star < 1) {
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

    if (reviews) {
      return (
        <div class="col p-3">
          <h4>Influencer Reviews</h4>
          {reviews.map((review) => {
            if (review.author.influencer == "Y") {
              return (
                <div class="row p-3 ml-3">
                  <div class="col-md-3">
                    <h4>{review.author.user} ✅</h4>
                    <p>{review.pub_date}</p>
                    <p>Skin Type: {Tag(review.author.skintype)}</p>
                    <p>Skin Issue: {List(review.author.skinissue)}</p>
                    <p>Age: {review.author.age}</p>
                  </div>
                  <div class="col-md-6">
                    <p>{Star(review.star)}</p>
                    <h5>{review.title}</h5>
                    <p>{review.review}</p>
                  </div>
                  <div class="ml-auto col-md-1">
                    <Link to="/review/like" class="text-md-left">
                      <button className="btn btn-light">Like</button>
                    </Link>
                    <Link to="/review/edit" class="text-md-left">
                      <button className="btn btn-light">Edit</button>
                    </Link>
                    <Link to="/review/delete" class="text-md-left">
                      <button className="btn btn-light">Delete</button>
                    </Link>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
          <hr />
          <h4>Reviews</h4>
          {reviews.map((review) => {
            if (review.author.influencer == "N") {
              return (
                <div class="row p-3 ml-3">
                  <div class="col-md-3">
                    <h4>{review.author.user}</h4>
                    <p>{review.pub_date}</p>
                    <p>Skin Type: {Tag(review.author.skintype)}</p>
                    <p>Skin Issue: {List(review.author.skinissue)}</p>
                    <p>Age: {review.author.age}</p>
                  </div>
                  <div class="col-md-6">
                    <p>{Star(review.star)}</p>
                    <h5>{review.title}</h5>
                    <p>{review.review}</p>
                  </div>
                  <div class="ml-auto col-md-1">
                    <Link to="/review/like" class="text-md-left">
                      <button className="btn btn-light">Like</button>
                    </Link>
                    <Link to="/review/edit" class="text-md-left">
                      <button className="btn btn-light">Edit</button>
                    </Link>
                    <Link to="/review/delete" class="text-md-left">
                      <button className="btn btn-light">Delete</button>
                    </Link>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
          <div class="ml-auto text-right">
            <Link to="/review/upload" class="text-md-left">
              <button className="btn btn-info">New Review</button>
            </Link>
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

function mapStateToProps(state) {
  return {
    product: state.auth.product,
    review: state.auth.review,
  };
}

export default connect(mapStateToProps, { getProduct, getReviewList })(Product);

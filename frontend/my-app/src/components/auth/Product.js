import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { renderField, renderError} from "../../utils/renderUtils";

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
    this.props.getReviewList(this.props);
  }
  
  renderProduct() {
    const product = this.props.product;

    function Star(star){
      if (star < 1){
        return "☆☆☆☆☆";
      } else if (star >=1 && star <2){
        return "★☆☆☆☆"
      } else if (star >=2 && star <3){
        return "★★☆☆☆"
      } else if (star >=3 && star <4){
        return "★★★☆☆"
      } else if (star >=4 && star <5){
        return "★★★★☆"
      } else {
        return "★★★★★"
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
    };  

    function Space(ingredient) {
      var arrayLength = ingredient.length;
      var result = ""; 
      for (var i = 0; i < arrayLength; i++) {
        var result = result.concat(ingredient[i]);
        var result = result.concat(" ");
      }
      return result;
    };  
      
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

    function Star(star){
      if (star < 1){
        return "☆☆☆☆☆";
      } else if (star >=1 && star <2){
        return "★☆☆☆☆"
      } else if (star >=2 && star <3){
        return "★★☆☆☆"
      } else if (star >=3 && star <4){
        return "★★★☆☆"
      } else if (star >=4 && star <5){
        return "★★★★☆"
      } else {
        return "★★★★★"
      }
    }

    if (reviews) {
      return (
        <div class="col p-3">
          {reviews.map((review) => (
            <div class="row p-3">
              <div class="pr-3">
                <h4>{review.author.user}</h4>
                <p>{review.pub_date}</p>
              </div>
              <div class="pl-3">
                <p>{Star(review.star)}</p>
                <h5>{review.title}</h5>
                <p>{review.review}</p>
              </div>
              <div class="ml-auto text-center">
                <h4>{(review.likes)}</h4>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <button action="submit" className="btn btn-light">Edit</button>
                    </fieldset>
                </form>
              </div> 
            </div>
          ))}
                  
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

export default connect(mapStateToProps, { getProduct, getReviewList})(Product);
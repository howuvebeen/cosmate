
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getTokenUser } from "../../actions/authActions";
import { getProduct } from "../../actions/authActions";
import { getReviewList } from "../../actions/authActions";

class ProductInfo extends Component {
    static propTypes = {
      getProduct: PropTypes.func.isRequired,
      product: PropTypes.object,
    };
  
    componentWillMount() {
      this.props.getProduct(this.props);
      console.log(this.props);
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
  
    render() {
      return (
        <div>
          {this.renderProduct()}
          <hr />
        </div>
      );
    }
  }
  
  function mapStateToProps(state) {
    return {
      product: state.auth.product
    };
  }
  
  export default connect(mapStateToProps, { getProduct})(ProductInfo);
  
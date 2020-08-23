
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProduct, getInterestedProduct, getTokenUser } from "../../actions/authActions";
import DeleteInterestedProduct from "./DeleteInterestedProduct.js";
import AddInterestedProduct from "./AddInterestedProduct.js";

class ProductInfo extends Component {
    static propTypes = {
      getProduct: PropTypes.func.isRequired,
      product: PropTypes.object,

      getInterestedProduct: PropTypes.func.isRequired,
      interest: PropTypes.object,

      getTokenUser: PropTypes.func.isRequired,
      user: PropTypes.object,
    };
  
    componentWillMount() {
      this.props.getProduct(this.props.UR);
      this.props.getInterestedProduct(this.props.UR);
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

  renderAdd(){
    const UR = this.props.UR;

    return (
      <div>
        <AddInterestedProduct UR={UR}/>
      </div>
    );
  }

  renderDelete(pk){
    const UR = this.props.UR;

    return (
      <div>
        <DeleteInterestedProduct UR={UR} pk={pk}/>
      </div>
    );
  }

  renderInterest() {
    const { product } = this.props.UR.match.params;
    const interests  = this.props.interest;
    let result = []; 

    if (interests && interests.length != 0 && product != null){
      let interest;
      let i;
      for (i = 0; i < interests.length; i++) {
        interest = interests[i];
        if (interest.product == product){
          result.unshift(this.renderDelete(interest.pk));
        } else {
          result.push(this.renderAdd());
        }
      } 
    } else if (interests && interests.length == 0){
      return this.renderAdd();
    } return result[0];
    
  }

  
  renderProduct() {
    const product = this.props.product;
    const authenticated = this.props.authenticated;

    if (product && !(authenticated)) {
      return (
        <div>
          <div class="p-5">
            <p>{product.company}</p>
            <h2>{product.name}</h2>
            <p>{this.Star(product.average_star)} {product.average_star} ({product.review_number})</p>
            <p>{product.description}</p>
            <p>{this.Tag(product.skintype)}</p>
          </div>
          <hr/>
          <div class="p-3 text-center">
            <h2>{product.average_star}</h2>
            <h2>{this.Star(product.average_star)}</h2>
            <p>{product.review_number} Reviews</p>
          </div>
        </div>
      );
    } else if (product && authenticated) {
      return (
        <div>
          <div class="p-5">
            <p>{product.company}</p>
            <h4>{product.name}</h4>
            <p>{this.Star(product.average_star)} {product.average_star} ({product.review_number})</p>
            <p>{product.description}</p>
            <p>{this.Tag(product.skintype)}</p>
            {this.renderInterest()}
          </div>
          <hr/>
          <div class="p-3 text-center">
            <h2>{product.average_star}</h2>
            <h2>{this.Star(product.average_star)}</h2>
            <p>{product.review_number} Reviews</p>
            {/* <Link to={`/skincare/${product.category[0].toLowerCase()}/${product.pk}/review/upload`} class="text-md-left"><button className="btn btn-info">Write Review</button></Link> */}
            <Link to={`/skincare/moisturizers/${product.pk}/review/upload`} class="text-md-left"><button className="btn btn-info">Write Review</button></Link>
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
      </div>
    );
  }
}
  
  function mapStateToProps(state) {
    return {
      product: state.auth.product,
      authenticated: state.auth.authenticated,
      interest: state.auth.interest,
      user: state.auth.user
    };
  }
  
  export default connect(mapStateToProps, { getProduct, getInterestedProduct, getTokenUser })(ProductInfo);
  
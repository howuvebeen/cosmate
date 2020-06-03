import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
    this.props.getReviewList();
  }

  renderProduct() {
    const product = this.props.product;

    const tag = function (type) {
      if (type == "O") {
        return "Oily";
      } else if (type == "D") {
        return "Dry";
      } else {
        return "Combinational";
      }
    };
    if (product) {
      return (
        <div className="mx-2">
          <p>{product.company}</p>
          <h4>{product.name}</h4>
          <p>{product.average_star}</p>
          {/* <p>{tag({product.skintype})}</p> */}
          <p>{product.ingredients}</p>
        </div>
      );
    }
    return null;
  }

  renderReviewList() {
    const reviews = this.props.review;

    if (reviews) {
      return (
        <div class="row p-3">
          {reviews.map((review) => (
            <div class="p-5">
              <div>
                <p>{review.star}</p>
                <h4>{review.author}</h4>
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
        {this.renderProduct()} <hr />
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

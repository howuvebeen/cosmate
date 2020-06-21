
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProduct } from "../../actions/authActions";

class ReviewInfo extends Component {
    static propTypes = {
      getProduct: PropTypes.func.isRequired,
      product: PropTypes.object,
    };
  
    constructor(props) {
      super(props);
    }
  
    componentWillMount() {
      this.props.getProduct(this.props.UR);
    }

  renderProduct() {
    const product = this.props.product;
    const authenticated = this.props.authenticated;
    
    if (product && authenticated) {
      return (
        <div className="col col-sm-6 mt-2 p-2">
          <h4 class="pt-4">Your Review</h4>
          <div class="pl-5">
            <p>{product.company}</p>
            <p><strong>{product.name}</strong></p>
          </div>
        </div>
      );
    }
    return null;
  }

  
  render() {
    return (
      <div class="d-flex flex-column align-items-center">
        {this.renderProduct()}
      </div>
    );
  }
}

  function mapStateToProps(state) {
    return {
      product: state.auth.product,
      authenticated: state.auth.authenticated
    };
  }
  
  export default connect(mapStateToProps, { getProduct })(ReviewInfo);
  
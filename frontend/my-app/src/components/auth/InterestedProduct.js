import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInterestedProduct } from "../../actions/authActions";

class InterestedProduct extends Component {

    static propTypes = {
        getInterestedProduct: PropTypes.func.isRequired,
        interest: PropTypes.object
    };

    componentWillMount() {
        this.props.getInterestedProduct();
    }

    Star(star){
        if (star != null){
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
    };

    renderInterestedProduct() {
        const interests  = this.props.interest;

        if (interests) {
            return (
                <div>
                    {interests.map((interest) => {
                        return (
                            <div class="p-3">
                                <p>{interest.product_company}</p>
                                <h4>{interest.product_name}</h4>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderInterestedProduct()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        interest: state.auth.interest
    }
}

export default connect(mapStateToProps, { getInterestedProduct } )( InterestedProduct );
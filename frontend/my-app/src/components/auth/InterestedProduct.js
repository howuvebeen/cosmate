import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInterestedProduct } from "../../actions/authActions";
import DeleteInterestedProduct from "./DeleteInterestedProduct.js";
import { Link } from "react-router-dom";

class InterestedProduct extends Component {

    static propTypes = {
        getInterestedProduct: PropTypes.func.isRequired,
        interest: PropTypes.object
    };

    componentWillMount() {
        this.props.getInterestedProduct();
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

    renderNoResult(){
        return (
            <div class="text-center mt-5">
                <p>No Interested Products yet</p>
            </div>
        );
    }

    renderYesResult(){
        const interests  = this.props.interest;

        return (
            <div>
                <h3 class="mt-5 ml-3 mb-5">Interested Products</h3>
                <p class="ml-3 mb-5">{interests.length} Products</p>
                <div class="row justify-content-md-left">
                    {interests.map((interest) => (
                        <div class="col-md-4">
                            <div class="card p-5 m-4">
                                <div>
                                    <p>{interest.product_company}</p>
                                    <h4>{interest.product_name}</h4>
                                    <p>{this.Star(interest.product_average_star)} {interest.product_average_star} ({interest.product_review_number})</p>
                                </div>
                            </div>
                            <div class="ml-4">
                                <DeleteInterestedProduct pk={interest.pk}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderInterestedProduct() {
        const interests  = this.props.interest;
    
        if (interests) {
            if (interests.length==0){
                return (
                    <div>
                        {this.renderNoResult()}
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.renderYesResult()}
                    </div>
                );
            }
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
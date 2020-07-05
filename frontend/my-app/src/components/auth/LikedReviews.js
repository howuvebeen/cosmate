import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLikedReviews } from "../../actions/authActions";

class LikedReviews extends Component {

    static propTypes = {
        getLikedReviews: PropTypes.func.isRequired,
        lreview: PropTypes.object
    };

    componentWillMount() {
        this.props.getLikedReviews();
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

    renderNoResult(){
        return (
            <div class="text-center mt-5">
                <p>No Interested Products yet</p>
            </div>
        );
    }

    renderYesResult(){
        const lreviews  = this.props.lreview;

        return (
            <div>
                <h3 class="mt-5 ml-3 mb-5">Liked Reviews</h3>
                <p class="ml-3 mb-5">{lreviews.length} Reviews</p>
                <div class="row justify-content-md-center">
                    {lreviews.map((lreview) => (
                        <div class="w-100 p-5">
                            <div>
                                <div class="row">
                                  <div class="col-md-4">
                                        <h5>{lreview.product}</h5>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{this.Star(lreview.star)}</p>
                                        <h5>{lreview.title}</h5>
                                        <p>{lreview.review}</p>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderLikedReviews() {
        const lreviews  = this.props.lreview;
    
        if (lreviews) {
            if (lreviews.length==0){
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
                {this.renderLikedReviews()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lreview: state.auth.lreview
    }
}

export default connect(mapStateToProps, { getLikedReviews } )( LikedReviews );
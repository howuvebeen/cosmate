import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getTokenUser } from "../../actions/authActions";
import { getUserProfile } from "../../actions/authActions";

class SkinInformation extends Component {

    static propTypes = {
        getTokenUser: PropTypes.func.isRequired,
        profile: PropTypes.object,

        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    componentWillMount() {
        this.props.getTokenUser();
        this.props.getUserProfile();
    }

    Tag(type) {
        if (type != null){
          var arrayLength = type.length;
          var result = "";
          for (var i = 0; i < arrayLength; i++) {
            if (type[i] == "Oily") {
              var result = result.concat("Oily");
            } else if (type[i] == "Dry") {
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
            if (type[i] == "Trouble") {
              var result = result.concat("Trouble");
            } else if (type[i] == "Acne") {
              var result = result.concat("Acne");
            } else if (type[i] == "Sensitive Skin") {
              var result = result.concat("Sensitive Skin");
            } else {
              var result = result.concat("None");
            }
            var result = result.concat(" ");
          }
          return result;
        } 
      };

    renderProfile() {
        const profile = this.props.profile;
        
        if (profile) {
            return (
              <div className="m-2 p-2">
                <h5 class="mb-4">Skin Information</h5>
                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Skin Type</strong></p>
                    <p><strong>Skin Issue</strong></p>
                  </div>
                  <div class="col-md-4 mt-auto mb-4">
                    <p>{this.Tag(profile.skintype)}</p>
                    <p>{this.List(profile.skinissue)}</p>
                  </div>
                </div>
                <div>
                  <Link className="btn btn-light" to="/profile/skin">Edit</Link>
                </div>
              </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className="m-1 p-1">
                {this.renderProfile()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.auth.profile,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getTokenUser, getUserProfile } )(SkinInformation);
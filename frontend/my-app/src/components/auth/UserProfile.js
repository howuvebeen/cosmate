import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getTokenUser } from "../../actions/authActions";
import { getUserProfile } from "../../actions/authActions";

class UserProfile extends Component {

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

    renderProfile() {
        const profile = this.props.profile;
        if (profile) {
            return (
                <div>
                    <p>{profile.firstname} {profile.lastname}</p>
                    <p>{profile.user}</p>
                    <p>Email: {profile.email}</p>
                    <p>Gender: {profile.gender}</p>
                    <p>Age: {profile.age}</p>
                    <hr />
                    <p><strong>Skin Type: {this.Tag(profile.skintype)}</strong> </p>
                    <p><strong>Skin Issue: {this.List(profile.skinissue)}</strong> </p>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className="m-5">
                {this.renderProfile()}
                {" "}
                <div class="float-right">
                    <Link className="btn btn-light" to="/profile/edit">Edit Profile</Link>
                </div>
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

export default connect(mapStateToProps, { getTokenUser, getUserProfile } )(UserProfile);
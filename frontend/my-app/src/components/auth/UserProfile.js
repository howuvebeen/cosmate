import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUserInfo } from "../../actions/authActions";
import { getUserProfile } from "../../actions/authActions";

class UserProfile extends Component {

    static propTypes = {
        getUserInfo: PropTypes.func.isRequired,
        profile: PropTypes.object,

        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    componentWillMount() {
        this.props.getUserInfo();
        this.props.getUserProfile();
    }

    renderProfile() {
        const profile = this.props.profile;
        if (profile) {
            return (
              <div class="row">
                <div class="col-md-4">
                  <p><strong>Name</strong></p>
                  <p><strong>ID</strong></p>
                  <p><strong>Email</strong></p>
                  <p><strong>Gender</strong></p>
                  <p><strong>DOB</strong></p>
                </div>
                <div class="col-md-8 mt-auto">
                  <p>{profile.firstname} {profile.lastname}</p>
                  <p>{profile.user}</p>
                  <p>{profile.email}</p>
                  <p>{profile.gender}</p>
                  <p>{profile.dob}</p>
                </div>
              </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className="m-2 p-2">
                {this.renderProfile()}
                <Link to="/profile/edit"><button class="btn btn-light">Edit</button></Link>
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

export default connect(mapStateToProps, { getUserInfo, getUserProfile } )(UserProfile);
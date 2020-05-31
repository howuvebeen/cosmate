import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../actions/authActions";

class UserProfile extends Component {

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    componentWillMount() {
        this.props.getUserProfile();
    }

    renderUser() {
        const user = this.props.user;
        if (user) {
            return (
                <div className="mx-2">
                    <p>{user.username}</p>
                    <p>{user.first_name} {user.last_name}</p>
                    <hr />
                    <p><strong>Skin Type</strong> </p>
                    <p><strong>Skin Shade</strong> </p>
                    <p><strong>Age Range</strong> </p>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderUser()}
                {" "}
                <hr />
                <Link className="btn btn-light mr-2" to="/profile_edit">Update Profile</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getUserProfile } )(UserProfile);
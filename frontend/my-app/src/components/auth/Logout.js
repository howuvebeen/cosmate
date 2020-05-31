import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Logout extends Component {
    constructor(props, context){
        super(props, context);
    }

    static propTypes = {
        logoutUser: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.logoutUser();
    }
    render() {
        return (
            <p> Log out failed. Try again. </p>
        );
    }
}

export default connect(null, { logoutUser })(Logout);
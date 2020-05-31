import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {

    static propTypes = {
        authenticated: PropTypes.bool
    };
    //If authenticated, show Profile and Logout in nav-bar
    renderLinks() {
        if (this.props.authenticated) {
            return (
                [
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/newsfeed" className="navbar-brand">Depco</Link>
                        <ul className="navbar-nav float-right">
                            <li className="nav-item" key="skincare">
                                <Link className="nav-link" to="/skincare">Skincare Products</Link>
                            </li>
                            <li className="nav-item" key="makeup">
                                <Link className="nav-link" to="/makeup">Makeup Products</Link>
                            </li>
                            <li className="nav-item" key="interest">
                                <Link className="nav-link" to="/interest">Interested Products</Link>
                            </li>
                            <li className="nav-item" key="logout">
                                <Link className="nav-link" to="/profile">Account Information</Link>
                            </li>
                            <li className="nav-item" key="logout">
                                <Link className="nav-link" to="/logout">Sign out</Link>
                            </li>
                        </ul>
                    </nav>
                   
                ]
            );
        //If not authenticated, show Login and Sign up in nav-bar
        } else {
            return (
                [
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand">Depco</Link>
                        <ul className="navbar-nav pr-0">
                            <li className="nav-item" key="signup">
                                <Link className="nav-link" to="/signup">Create an Account</Link>
                            </li>
                            <li className="nav-item" key="login">
                                <Link className="nav-link" to="/login">Sign In</Link>
                            </li>
                        </ul>
                    </nav>
                    
                ]
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderLinks()}
            </div>
        )
    }
}

// we need authenticated data from state changed to prop 
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}
/* to read data from the store, enable by calling connect with the mapStateToProps parameter, 
 a function describing which part of the data we need from the store.*/
export default connect(mapStateToProps)(Header);
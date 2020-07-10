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
                    <div class="row">
                    <nav className="col-md-9 navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand mb-auto">Depco</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item" key="skincare">
                                <Link className="nav-link" to="/skincare">Skincare Products</Link>
                            </li>
                            <li className="nav-item" key="makeup">
                                <Link className="nav-link" to="/makeup">Makeup Products</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="col-md-3 navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav">
                            <li className="nav-item" key="interest">
                                <Link className="nav-link" to="/interest">Interest</Link>
                            </li>
                            <li className="nav-item" key="search">
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>
                            <li className="nav-item" key="account">
                                <Link className="nav-link" to="/account">Account</Link>
                            </li>
                        </ul>
                    </nav>
                    </div>
                ]
            );
        //If not authenticated, show Login and Sign up in nav-bar
        } else {
            return (
                [
                    <div class="row">
                    <nav className="col-md-8 navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand mb-auto">Depco</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item" key="skincare">
                                <Link className="nav-link" to="/skincare">Skincare Products</Link>
                            </li>
                            <li className="nav-item" key="makeup">
                                <Link className="nav-link" to="/makeup">Makeup Products</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="col-md-4 navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav">
                        <li className="nav-item" key="login">
                            <Link className="nav-link" to="/login">Sign In</Link>
                            </li>
                        <li className="nav-item" key="signup">
                            <Link className="nav-link" to="/signup">Create an Account</Link>
                        </li>
                        <li className="nav-item" key="search">
                            <Link className="nav-link" to="/search">Search</Link>
                        </li>
                        </ul>
                    </nav>
                    </div>
                    
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
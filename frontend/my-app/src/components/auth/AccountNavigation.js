import React, { Component } from "react";
import { Link } from "react-router-dom";

class AccountNavigation extends Component {
    render() {
        return (
            <div class="m-4 p-4">
                <p><Link to="/profile">Profile & Skin Information</Link></p>
                <p><Link to="/review">Review History</Link></p>
                <p><Link to="/interest">Interested Products</Link></p>
                <p><Link to="/like">Liked Review</Link></p>
                <p><Link to="/logout">Logout</Link></p>
            </div>                                     
        );
    } 
}

export default AccountNavigation;
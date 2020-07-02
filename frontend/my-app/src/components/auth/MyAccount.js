import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserProfile from "./UserProfile.js";
import SkinInformation from "./SkinInformation.js";

class MyAccount extends Component {
    render() {
        const UR = this.props;
        const username = localStorage.getItem("username");

        return (
            <div class="m-4 p-4">
                <h3>Hello,</h3>
                <h3 class="pb-4">{username}</h3>
                <div class="mb-4 row">
                    <div class="col-md-4 mr-4 card">
                        <UserProfile UR={UR}/>
                    </div>
                    <div class="col-md-4 card">
                        <SkinInformation UR={UR}/>
                    </div>
                </div>
                <div>
                    <p><Link to="/profile/password">Change Password</Link></p>
                    <p><Link to="/profile/influencer">Want to change your account into an influencer account?</Link></p>
                </div>
            </div>                                     
        );
    } 
}

export default MyAccount;
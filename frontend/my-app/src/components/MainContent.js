import React from "react";
import { Switch, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Landing from "./Landing";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";
import SignupDone from "./auth/SignupDone";
import AccountActivation from "./auth/AccountActivation";
import PasswordReset from "./auth/PasswordReset";
import PasswordResetDone from "./auth/PasswordResetDone";
import PasswordResetConfirm from "./auth/PasswordResetConfirm";
import IdReset from "./auth/IdReset.js";
import IdResetDone from "./auth/IdResetDone.js";
import UserProfile from "./auth/UserProfile.js";
import UserProfileEdit from "./auth/UserProfileEdit.js";
import Skincare from "./auth/Skincare.js";
import Product from "./auth/Product.js";
import NoMatch from "./NoMatch";

const MainContent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signup_done" component={SignupDone}/>
            <Route path="/account/:confirm"  component={AccountActivation}/>
            <Route path="/reset_password" component={PasswordReset}/>
            <Route path="/reset_password_done" component={PasswordResetDone}/>
            <Route path="/reset/:confirm" component={PasswordResetConfirm}/>
            <Route path="/reset_id" component={IdReset}/>
            <Route path="/reset_id_done" component={IdResetDone}/>
            <Route path="/profile" component={UserProfile}/>
            <Route path="/profile_edit" component={UserProfileEdit}/>
            <Route exact path="/skincare" component={Skincare}/>
            <Route exact path="/skincare/:product" component={Product}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
);

export default MainContent;
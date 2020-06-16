import React from "react";
import { Switch, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Landing from "./Landing";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";
import SignupInfluencer from "./auth/SignupInfluencer";
import SignupDone from "./auth/SignupDone";
import AccountActivation from "./auth/AccountActivation";
import PasswordReset from "./auth/PasswordReset";
import PasswordResetDone from "./auth/PasswordResetDone";
import PasswordResetConfirm from "./auth/PasswordResetConfirm";
import IdReset from "./auth/IdReset";
import IdResetDone from "./auth/IdResetDone";
import UserProfile from "./auth/UserProfile";
import UserProfileEdit from "./auth/UserProfileEdit";
import UserProfileComplete from "./auth/UserProfileComplete";
import Skincare from "./auth/Skincare";
import SkinCategory from "./auth/SkinCategory";
import Product from "./auth/Product";
import UploadReview from "./auth/UploadReview";
import EditReview from "./auth/EditReview";
import DeleteReview from "./auth/DeleteReview";
import InterestedProduct from "./auth/InterestedProduct";
import NoMatch from "./NoMatch";

import LikeControl from "./auth/Like";


const MainContent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signup/influencer" component={SignupInfluencer}/>
            <Route exact path="/signup/done" component={SignupDone}/>
            <Route path="/account/:confirm"  component={AccountActivation}/>
            <Route path="/reset_password" component={PasswordReset}/>
            <Route path="/reset_password_done" component={PasswordResetDone}/>
            <Route path="/reset/:confirm" component={PasswordResetConfirm}/>
            <Route path="/reset_id" component={IdReset}/>
            <Route path="/reset_id_done" component={IdResetDone}/>
            <Route exact path="/profile" component={UserProfile}/>
            <Route exact path="/profile/edit" component={UserProfileEdit}/>
            <Route exact path="/profile/complete" component={UserProfileComplete}/>
            <Route exact path="/skincare" component={Skincare}/>
            <Route exact path="/skincare/moisturizers" component={SkinCategory}/>
            <Route exact path="/skincare/moisturizers/:product" component={Product}/>
            <Route exact path="/skincare/moisturizers/:product/review/upload" component={UploadReview}/>
            <Route exact path="/skincare/moisturizers/:product/review/edit" component={EditReview}/>
            <Route exact path="/skincare/moisturizers/:product/review/delete" component={DeleteReview}/>
            <Route exact path="/interest" component={InterestedProduct}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
);

export default MainContent;
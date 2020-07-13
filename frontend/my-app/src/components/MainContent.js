import React from "react";
import { Switch, Route } from "react-router-dom";
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
import Search from "./auth/Search";
import SearchEngine from "./auth/SearchEngine";
import IdReset from "./auth/IdReset";
import IdResetDone from "./auth/IdResetDone";
import AccountNavigation from "./auth/AccountNavigation";
import MyAccount from "./auth/MyAccount";
import UserProfileEdit from "./auth/UserProfileEdit";
import SkinProfileEdit from "./auth/SkinProfileEdit";
import PasswordProfileEdit from "./auth/PasswordProfileEdit";
import UserProfileComplete from "./auth/UserProfileComplete";
import LikedReviews from "./auth/LikedReviews";
import ReviewHistory from "./auth/ReviewHistory";
import Skincare from "./auth/Skincare";
import SkinCategory from "./auth/SkinCategory";
import Product from "./auth/Product";
import UploadReview from "./auth/UploadReview";
import EditReview from "./auth/EditReview";
import DeleteReview from "./auth/DeleteReview";
import InterestedProduct from "./auth/InterestedProduct";
import NoMatch from "./NoMatch";

const MainContent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signup/done" component={SignupDone}/>
            <Route path="/signup/:confirm"  component={AccountActivation}/>
            <Route path="/password/reset" component={PasswordReset}/>
            <Route path="/password/reset/done" component={PasswordResetDone}/>
            <Route path="/password/reset/:confirm" component={PasswordResetConfirm}/>

            <Route path="/id/reset" component={IdReset}/>
            <Route path="/id/reset/done" component={IdResetDone}/>

            <Route exact path="/search" component={SearchEngine}/>
            <Route exact path="/search/:product" component={Search}/>
            <Route exact path="/account" component={AccountNavigation}/>
            <Route exact path="/profile" component={MyAccount}/>
            <Route exact path="/profile/edit" component={UserProfileEdit}/>
            <Route exact path="/profile/influencer" component={SignupInfluencer}/>
            <Route exact path="/profile/skin" component={SkinProfileEdit}/>
            <Route exact path="/profile/password" component={PasswordProfileEdit}/>
            <Route exact path="/profile/complete" component={UserProfileComplete}/>
            <Route exact path="/like" component={LikedReviews}/>
            <Route exact path="/review" component={ReviewHistory}/>
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
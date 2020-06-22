import React, { Component } from "react";
import ReviewForm from "./ReviewForm.js";
import ReviewInfo from "./ReviewInfo.js";

class UploadReview extends Component {

    render() {
        const UR = this.props;
        return (
            <div>
                <div>
                    <ReviewInfo UR={UR} />
                    <ReviewForm/>
                </div>
            </div>
        );
    } 
}

export default UploadReview;
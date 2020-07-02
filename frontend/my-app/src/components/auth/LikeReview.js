import React, { Component } from "react";
import { reduxForm, propTypes } from "redux-form";
import { likeReview } from "../../actions/authActions";

class LikeReview extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-light">Like</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "likeReview",
    onSubmit: likeReview
})(LikeReview));
import React, { Component } from "react";
import { reduxForm, propTypes } from "redux-form";
import { unlikeReview } from "../../actions/authActions";

class UnlikeReview extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit } = this.props;
        const like = this.props.like;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-warning">Unlike {like}</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "unlikeReview",
    onSubmit: unlikeReview
})(UnlikeReview));
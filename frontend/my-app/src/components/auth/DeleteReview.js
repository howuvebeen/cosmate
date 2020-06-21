import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";

import { renderField, renderTextAreaField, renderError} from "../../utils/renderUtils";
import { deleteReview } from "../../actions/authActions";

class DeleteReview extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="d-flex flex-column align-items-center">
                <form
                    className="col col-sm-4 card mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <p className="text-md-center">Are you sure you want to delete the reivew?</p>
                    <div class="row">
                        <fieldset className="form-group col-sm-12 text-center">
                            <button action="submit" className="btn btn-danger w-100">Yes</button>
                        </fieldset>
                    </div>
                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "deleteReview",
    onSubmit: deleteReview
})(DeleteReview));
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
                    <h4 className="text-md-center">Are you sure you want to delete the reivew?</h4>
                    <div class="row">
                        <fieldset className="form-group col-sm-12 text-center">
                            <button className="btn btn-primary btn-md center-block mr-3 col-md-5">No</button>
                            <button action="submit" className="btn btn-danger btn-md center-block ml-3 col-md-5">Yes</button>
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
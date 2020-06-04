import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators"

import { renderField, renderError} from "../../utils/renderUtils";
import { uploadReview } from "../../actions/authActions";

class UploadReview extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="d-flex flex-column align-items-center">
                <form
                    className="col col-sm-4 card mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">New Review</h4>

                    <fieldset className="form-group">
                        <Field name="title" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                               placeholder="Subject"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="star" component="select">
                            <option value="1">★☆☆☆☆</option>
                            <option value="2">★★☆☆☆</option>
                            <option value="3">★★★☆☆</option>
                            <option value="4">★★★★☆</option>
                            <option value="5">★★★★★</option>
                        </Field>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="review" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                               placeholder="Review"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        { renderError(error) }
                        <button action="submit" className="btn btn-primary w-100">Post</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "uploadreview",
    onSubmit: uploadReview
})(UploadReview);
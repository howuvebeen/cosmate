import React, { Component } from "react";
import { reduxForm, Field, Select, propTypes } from "redux-form";
import { renderLabelField, renderTextAreaField, renderError} from "../../utils/renderUtils";
import { required } from "redux-form-validators"

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
                    <h4 className="text-md-center">Your DepCo Moisturizers Review</h4>

                    <fieldset className="form-group">
                    <   Field label="Rating:" name="star" component={renderLabelField}
                               type="number" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field label="Review Title:" name="title" component={renderLabelField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field label="Review:" name="review" component={renderTextAreaField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        { renderError(error) }
                        <button action="submit" className="btn btn-primary w-100">Write a Review</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "upload_review",
    onSubmit: uploadReview
})(UploadReview));
import React, { Component } from "react";
import { reduxForm, Field, Select, propTypes } from "redux-form";
import { renderLabelSelect, renderLabelField, renderTextAreaField, renderError} from "../../utils/renderUtils";
import { required } from "redux-form-validators"

import { uploadReview } from "../../actions/authActions";

class ReviewForm extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;
        const options = [
            {
              label: '★☆☆☆☆',
              value: '1',
            },
            {
                label: '★★☆☆☆',
                value: '2',
              },
            {
                label: '★★★☆☆',
                value: '3',
            },
            {
                label: '★★★★☆',
                value: '4',
            },
            {
                label: '★★★★★',
                value: '5',
            },
          ];

        return (
            <div className="d-flex flex-column align-items-center">
                <form
                    className="col col-sm-6 mt-2 p-2"
                    onSubmit={handleSubmit}
                >
                    <fieldset className="form-group">
                        <Field label="Rating:" name="star" component={renderLabelSelect}
                                options={options} validate={[required({message: "This field is required."})]}
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
                        <button action="submit" className="btn btn-primary w-30">Write a Review</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "upload_review",
    onSubmit: uploadReview
})(ReviewForm));
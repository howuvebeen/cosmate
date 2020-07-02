import React, { Component } from "react";
import { reduxForm, Field, Select, propTypes } from "redux-form";
import { renderLabelSelect, renderLabelField, renderError} from "../../utils/renderUtils";
import { required } from "redux-form-validators"

import { editReview } from "../../actions/authActions";

class EditReview extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;
        const options = [
            {
              label: '★☆☆☆☆',
              value: 1,
            },
            {
                label: '★★☆☆☆',
                value: 2,
              },
            {
                label: '★★★☆☆',
                value: 3,
            },
            {
                label: '★★★★☆',
                value: 4,
            },
            {
                label: '★★★★★',
                value: 5,
            },
          ];

        return (
            <div className="d-flex flex-column align-items-center">
                <form
                    className="col col-sm-4 card mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Edit Review</h4>

                    <fieldset className="form-group">
                        <Field label="Rating:" name="star" component={renderLabelSelect}
                                options={options} 
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field label="Review Title:" name="title" component={renderLabelField}
                               type="text"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field label="Review:" name="review" component={renderLabelField}
                               type="text"
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
    form: "edit_review",
    onSubmit: editReview
})(EditReview));
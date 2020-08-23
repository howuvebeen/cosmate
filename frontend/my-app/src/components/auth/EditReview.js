import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderLabelSelect, renderLabelField, renderError} from "../../utils/renderUtils";

import { editReview, getReview } from "../../actions/authActions";

class EditReview extends Component {

    static propTypes = {
        getReview: PropTypes.func.isRequired,
        review: PropTypes.object
    };

    componentWillMount() {
        this.props.getReview(this.props);
    }

    render() {
        const { handleSubmit, error } = this.props;
        const review = this.props.review;

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

        this.props.initialize({
            star: review.star,
            title: review.title,
            review: review.review,
        });
        
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

EditReview = reduxForm({
    form: 'editReview',
    onSubmit: editReview
})(EditReview);

EditReview = connect(
  state => ({
    review: state.auth.review
}),
  { getReview }
)(EditReview);

export default EditReview;

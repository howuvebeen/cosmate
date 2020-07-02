import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { deleteInterestedProduct } from "../../actions/authActions";

class DeleteInterestedProduct extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-warning">Delete from Interested Product</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "deleteInterestedProduct",
    onSubmit: deleteInterestedProduct
})(DeleteInterestedProduct));
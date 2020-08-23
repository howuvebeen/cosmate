import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { addInterestedProduct } from "../../actions/authActions";

class AddInterestedProduct extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-warning">Add</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "addInterestedProduct",
    onSubmit: addInterestedProduct
})(AddInterestedProduct));
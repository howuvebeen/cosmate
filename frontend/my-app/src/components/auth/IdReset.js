import React, { Component } from "react";
import { Link } from "react-router-dom";

import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { renderField, renderError} from "../../utils/renderUtils";
import { resetId } from "../../actions/authActions";

class IdReset extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="d-flex flex-column align-items-center">
                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Forgot Your Id?</h4>

                    <p> Enter Your Email Address and we will send you an information to find your Id.</p>

                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    { renderError(error) }

                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-primary w-100">Find Id</button>
                    </fieldset>

                    <Link to="/login" class="text-md-left">Back to Log In</Link>

                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "resetId",
    onSubmit: resetId
})(IdReset);
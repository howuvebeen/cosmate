import React, { Component } from "react";
import { Link } from "react-router-dom";

import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { renderField, renderError} from "../../utils/renderUtils";
import { resetPassword } from "../../actions/authActions";

class PasswordReset extends Component {

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
                    <h4 className="text-md-center">Forgot Your Password?</h4>

                    <p> Enter Your Email Address and we will send you a link to reset your Password.</p>

                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    { renderError(error) }

                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-primary w-100">Reset Password</button>
                    </fieldset>

                    <Link to="/login" class="text-md-left">Back to Log In</Link>

                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "password_reset",
    onSubmit: resetPassword
})(PasswordReset);
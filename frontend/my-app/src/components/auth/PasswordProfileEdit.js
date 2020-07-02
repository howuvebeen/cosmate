import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { renderField, renderError} from "../../utils/renderUtils";
import { confirmPasswordChange } from "../../actions/authActions";

class PasswordProfileEdit extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="d-flex flex-column">
                <form
                    className="col col-sm-4 mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 class="mb-5">Change Password</h4>

                    <fieldset className="form-group pb-4">
                        <Field name="password_c" placeholder="Current Password" component={renderField}
                               type="password_c" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password" placeholder="New Password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group mb-5">
                        <Field name="password_v" placeholder="New Password Verification" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <div class="form-group form-row">
                        <fieldset className="col">
                            <button action="submit" className="mr-3 btn btn-primary">Confirm</button>
                            <Link to="/profile"><button className="btn btn-light">Cancel</button></Link>
                        </fieldset>
                    </div>
                </form>
            </div>
        )
    }
}

const validateForm = values => {
    const errors = {};
    const { password, password_v } = values;
    if (password !== password_v) {
        errors.password_v = "Password does not match."
    }
    return errors;
};

export default reduxForm({
    form: "password_reset_confirm",
    onSubmit: confirmPasswordChange,
    validate: validateForm
})(PasswordProfileEdit);
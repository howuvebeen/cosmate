import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { renderField, renderError } from "../../utils/renderUtils";
import { signupUser } from "../../actions/authActions";

class Signup extends Component {

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
                    <h4 className="text-md-center">Sign Up</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="username" label="Username" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="first_name" label="First Name" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="last_name" label="Last Name" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="email" label="Email Address" component={renderField}
                               type="text"/>
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password_confirm" label="Confirm Password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    { renderError(error) }

                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-primary w-100">Sign Up</button>
                    </fieldset>
                </form>
                <p class="col col-sm-4 card mt-3 p-2 text-md-center d-inline">Have an account? <Link to="/login">Log in</Link></p>
            </div>

        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { password, password_confirm } = values;
    if (password !== password_confirm) {
        errors.password_confirm = "Password does not match."
    }
    return errors;
};

export default reduxForm({
    form: "signup",
    validate: validateForm,
    onSubmit: signupUser
})(Signup);
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
                    className="col col-sm-4 card mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Create an Account</h4>

                    <p> It's quick and easy.</p>

                    <div className="form-group form-row">
                        <fieldset className="col">
                            <Field name="first_name" component={renderField}
                                type="text" validate={[required({message: "This field is required."})]}
                                placeholder="First Name"
                            />
                        </fieldset>

                        <fieldset className="col">
                            <Field name="last_name" component={renderField}
                                type="text" validate={[required({message: "This field is required."})]}
                                placeholder="Last Name"
                            />
                        </fieldset>
                    </div>

                    <fieldset className="form-group">
                        <Field name="username" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                               placeholder="Id"
                        />
                    </fieldset>
                    
                    <fieldset className="form-group">
                        <Field name="email" component={renderField}
                               type="text"
                               placeholder="Email"
                        />
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                               placeholder="Password"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password_confirm" component={renderField}
                               type="password" validate={[required({message: "This field is required."})]}
                               placeholder="Password Verification"
                        />
                    </fieldset>

                    { renderError(error) }

                    <br/>

                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-primary w-100">Create Account</button>
                    </fieldset>

                    <p class="text-md-left d-inline">Sign in to Depco</p>
                    <Link to="/login"><button className="btn btn-light w-100">Sign in</button></Link>
                </form>
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
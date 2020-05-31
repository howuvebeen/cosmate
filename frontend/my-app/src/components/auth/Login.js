import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators"

import { renderField, renderError} from "../../utils/renderUtils";
import { loginUser } from "../../actions/authActions";

class Login extends Component {

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
                    <h4 className="text-md-center">Sign In</h4>

                    <Link to="/login"><button className="btn btn-light w-100">Continue with Facebook</button></Link>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="username" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                               placeholder="Id"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="email" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                               placeholder="Email"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password" component={renderField}
                               type="password"  validate={[required({message: "This field is required."})]}
                               placeholder="Password"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        { renderError(error) }
                        <button action="submit" className="btn btn-primary w-100">Sign In</button>
                    </fieldset>

                    <Link to="/reset_id" class="text-md-left">Forgot your id?</Link>
                    <Link to="/reset_password" class="text-md-left">Forgot password?</Link>

                    <br/>

                    <p class="text-md-left d-inline">Don't have an account yet?</p>
                    <Link to="/signup"><button className="btn btn-light w-100">Create Account</button></Link>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "login",
    onSubmit: loginUser
})(Login);
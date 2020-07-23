import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { reduxForm, Field, propTypes } from "redux-form";
import { required } from "redux-form-validators"
import { renderLabelField2, renderError } from "../../utils/renderUtils";
import { signupInfluencer } from "../../actions/authActions";

class SignupInfluencer extends Component {

    static propTypes = {
        ...propTypes
    };


    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="d-flex flex-column">
                <form
                    className="col col-sm-8 mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4>Sign Up for Influencer Account</h4>

                    <p> Provide an URL to your account to verify that you are an influencer.
                        After consideration, we will register you as an influencer.
                        It can take 2-3 business days to verify your account.</p>

                    <fieldset className="form-group col-md-6">
                        <Field name="influencer_link" component={renderLabelField2}
                               type="link" validate={[required({message: "This field is required."})]}
                               label="URL"
                        />
                    </fieldset>

                    { renderError(error) }

                    <div class="form-group form-row">
                        <fieldset className="col">
                            <button action="submit" className="mr-3 btn btn-primary">Confirm</button>
                            <Link to="/profile"><button className="btn btn-light">Cancel</button></Link>
                        </fieldset>
                    </div>
                </form>
            </div>

        );
    }
}

export default reduxForm({
    form: "signupinfluencer",
    onSubmit: signupInfluencer
})(SignupInfluencer);
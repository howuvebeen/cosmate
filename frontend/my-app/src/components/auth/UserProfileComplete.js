import React, { Component } from "react";
import { reduxForm, Field, Select, propTypes } from "redux-form";
import { renderField, renderSelect, renderError} from "../../utils/renderUtils";
import { required } from "redux-form-validators"

import { userProfileComplete } from "../../actions/authActions";

class UserProfileComplete extends Component {

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
                    <h4 className="text-md-center">Complete Your Profile</h4>

                    <fieldset className="form-group">
                        <Field name="gender" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                               placeholder="Gender"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="dob" component={renderField}
                               type="date" validate={[required({message: "This field is required."})]}
                               placeholder="Date of Birth"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="skintype" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                               placeholder="Skin Type"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="skinissue" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                               placeholder="Skin Issue"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <button action="submit" className="btn btn-primary w-100">Profile</button>
                    </fieldset>

                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "userProfileComplete",
    onSubmit: userProfileComplete
})(UserProfileComplete));
import React, { Component } from "react";
import { reduxForm, Field, Select, propTypes } from "redux-form";
import { renderField, renderSelect, renderError} from "../../utils/renderUtils";
import { required } from "redux-form-validators"

import { userProfileEdit } from "../../actions/authActions";

class UserProfileEdit extends Component {

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
                    <h4 className="text-md-center">Edit Profile</h4>

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
                        <button action="submit" className="btn btn-primary w-100">Edit Profile</button>
                    </fieldset>

                </form>
            </div>
        )
    }
}

export default (reduxForm({
    form: "userProfileEdit",
    onSubmit: userProfileEdit
})(UserProfileEdit));
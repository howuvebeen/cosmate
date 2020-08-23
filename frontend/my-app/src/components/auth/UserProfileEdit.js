import React, { Component } from "react";
import { reduxForm, Field, Select, propTypes } from "redux-form";
import { renderLabelField, renderLabelField2 } from "../../utils/renderUtils";
import { Link } from "react-router-dom";

import { userProfileEdit } from "../../actions/authActions";

class UserProfileEdit extends Component {

    static propTypes = {
        ...propTypes
    };

    constructor(props) {
        super(props);
        this.state = {
            dry: false,
            oily: false,
            neutral: false,
            combinational: false,
            influencer_Y: false,
            influencer_N: false,
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });

    }
    
    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="d-flex flex-column">
                <form
                    className="col col-sm-4 mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 class="mb-5">Edit Personal Information</h4>

                    <fieldset className="form-group">
                        <Field name="first_name" component={renderLabelField2}
                            type="text"
                            placeholder="First Name"
                            label="Name"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="last_name" component={renderLabelField2}
                            type="text"
                            placeholder="Last Name"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="email" component={renderLabelField2}
                            type="email"
                            placeholder="Email"
                            label="Email"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="username" component={renderLabelField2}
                               type="text"
                               placeholder="ID"
                               label="ID"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="gender" component={renderLabelField2}
                               type="text"
                               placeholder="Gender"
                               label="Gender"
                        />
                    </fieldset>

                    <fieldset className="form-group mb-5">
                        <Field name="dob" component={renderLabelField2}
                               type="date"
                               label="DOB"
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

export default (reduxForm({
    form: "userProfileEdit",
    onSubmit: userProfileEdit
})(UserProfileEdit));
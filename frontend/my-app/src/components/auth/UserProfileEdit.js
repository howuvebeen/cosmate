import React, { Component } from "react";
import { reduxForm, Field, Select, propTypes } from "redux-form";
import { renderCheckbox, renderSelect, renderField } from "../../utils/renderUtils";

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
            <div className="d-flex flex-column align-items-center">
                <form
                    className="col col-sm-4 card mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Edit Profile</h4>

                    <div className="form-group form-row">
                        <fieldset className="col">
                            <Field name="first_name" component={renderField}
                                type="text"
                                placeholder="First Name"
                            />
                        </fieldset>

                        <fieldset className="col">
                            <Field name="last_name" component={renderField}
                                type="text"
                                placeholder="Last Name"
                            />
                        </fieldset>
                    </div>

                    <fieldset className="form-group">
                        <Field name="username" component={renderField}
                               type="text"
                               placeholder="Id"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="gender" component={renderField}
                               type="text"
                               placeholder="Gender"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="dob" component={renderField}
                               type="date"
                               placeholder="Date of Birth"
                        />
                    </fieldset>

                    <div class="mb-2 card">
                    <p class="ml-2 mt-2 mb-0">Skin Type</p>
                        <div class="ml-2 d-flex flex-row">
                            <fieldset class="mr-3">
                                <Field label="oily" component={renderCheckbox}
                                    type="checkbox" name="oily"
                                />
                            </fieldset>
                            <fieldset class="mr-3">
                                <Field label="dry" component={renderCheckbox}
                                    type="checkbox" name="dry"
                                />
                            </fieldset>
                            <fieldset class="mr-3">
                                <Field label="neutral" component={renderCheckbox}
                                    type="checkbox" name="neutral"
                                />
                            </fieldset>
                            <fieldset class="mr-3">
                                <Field label="combinational" component={renderCheckbox}
                                    type="checkbox" name="combinational"
                                />
                            </fieldset>
                        </div>
                    </div>

                    <fieldset class="form-group row ml-2 mb-0">
                        <p class="mr-3"> Are you an Influencer?</p>
                        <label class="mr-3">
                        Yes
                        <input
                            name="influencer_Y"            
                            type="checkbox"
                            checked={this.state.influencer_Y}
                            unchecked={this.state.influencer_N}
                            onChange={this.handleInputChange} />
                        </label>
                        <label>
                        No
                        <input
                            name="influencer_N"            
                            type="checkbox"
                            checked={this.state.influencer_N}
                            unchecked={this.state.influencer_Y}
                            onChange={this.handleInputChange} />
                        </label>
                    </fieldset>

                    {this.state.influencer_Y ? (
                        <fieldset className="form-group">
                            <Field name="influencer_link" component={renderField}
                                type="text"
                                placeholder="Link to your social media account"
                            />
                        </fieldset>
                    ) : (
                        null
                    )}
                    
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
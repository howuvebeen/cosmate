import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderLabelField2 } from "../../utils/renderUtils";
import { Link } from "react-router-dom";

import { getUserInfo, getUserProfile, editUserProfile } from "../../actions/authActions";

class UserProfileEdit extends Component {

    static propTypes = {
        getUserInfo: PropTypes.func.isRequired,
        user: PropTypes.object,

        getUserProfile: PropTypes.func.isRequired,
        profile: PropTypes.object

    };

    componentWillMount() {
        this.props.getUserInfo();
        this.props.getUserProfile();
    }

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
        const { handleSubmit } = this.props;       
        const profile = this.props.profile;
        const user = this.props.user;

        this.props.initialize({
            first_name: profile.firstname,
            last_name: profile.lastname,
            email: profile.email,
            username: user.username,
            gender: profile.gender,
            dob: profile.dob,
        });

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

UserProfileEdit = reduxForm({
    form: 'editUserProfile',
    onSubmit: editUserProfile
})(UserProfileEdit);

UserProfileEdit = connect(
  state => ({
    profile: state.auth.profile,
    user: state.auth.user
}),
  { getUserInfo, getUserProfile }
)(UserProfileEdit);

export default UserProfileEdit;

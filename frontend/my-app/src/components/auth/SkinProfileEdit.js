import React, { Component } from "react";
import { reduxForm, Field, Select, propTypes } from "redux-form";
import { renderCheckbox, renderRadio } from "../../utils/renderUtils";
import { Link } from "react-router-dom";

import { skinProfileEdit } from "../../actions/authActions";

class SkinProfileEdit extends Component {

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

            acne: false,
            trouble: false,
            sensitive_skin: false,
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
        const initial = this.props.initial;
        console.log(initial);
        
        return (
            <div className="d-flex flex-column">
                <form
                    className="col col-sm-4 mt-3 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 class="mb-5">Edit Skin Information</h4>
                        <p>{initial}</p>
                        <div class="mb-5">
                            <p><strong>Skin Type</strong></p>
                            <fieldset>
                                <Field component={renderRadio} type="radio" 
                                    checked={true} label="All" 
                                /> 
                            </fieldset>
                            <fieldset>
                                <Field component={renderRadio} type="radio" 
                                    value="dry" name="dry" label="Dry" 
                                /> 
                            </fieldset>
                            <fieldset>
                                <Field component={renderRadio} type="radio" 
                                    value="oily" name="oily" label="Oily"
                                /> 
                            </fieldset>
                            <fieldset>
                                <Field component={renderRadio} type="radio" 
                                    value="neutral" name="neutral" label="Neutral"
                                /> 
                            </fieldset>
                            <fieldset>
                                <Field component={renderRadio} type="radio" 
                                    value="combinational" name="combinational" label="Combinational"
                                />
                            </fieldset>
                        </div>

                        <div class="mb-5">
                            <p><strong>Skin Issue</strong></p>
                            <fieldset>
                                <Field component={renderCheckbox} type="checkbox" 
                                    label="All"
                                />
                            </fieldset>
                            <fieldset>
                                <Field component={renderCheckbox} type="checkbox" 
                                    value="acne" name="acne" label="Acne"
                                />
                            </fieldset>
                            <fieldset>
                                <Field component={renderCheckbox} type="checkbox" 
                                    value="trouble" name="trouble" label="Trouble"
                                />
                            </fieldset>
                            <fieldset>
                                <Field component={renderCheckbox} type="checkbox" 
                                    value="sensitive_skin" name="sensitive_skin" label="Sensitive Skin"
                                />
                            </fieldset>
                        </div>

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
    form: "skinProfileEdit",
    onSubmit: skinProfileEdit
})(SkinProfileEdit));
import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { renderCheckbox, renderRadio } from "../../utils/renderUtils";
import { sortingReview } from "../../actions/authActions";

class SortingReview extends Component {

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

            zero: false,
            ten: false,
            twenty: false,
            thirty: false,
            fourty: false,

        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        // const value = target.type === 'radio' ? target.checked : target.value;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    renderRanking(){
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                <div class="pl-0">
                    <div class="mb-4">
                        <p>Skin Type</p>
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
                    <div class="mb-4">
                        <p>Skin Issue</p>
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
                    <div class="mb-4">
                        <p>Price Range</p>
                        <fieldset>
                            <Field label="0-9" component={renderRadio}
                                checked={true} type="radio" value="0+-+9" name="zero"
                            />
                        </fieldset>
                        <fieldset>
                            <Field label="10-19" component={renderRadio}
                                type="radio" value="10+-+19" name="ten"
                            />
                        </fieldset>
                        <fieldset>
                            <Field label="20-29" component={renderRadio}
                                type="radio" value="20+-+29" name="twenty"
                            />
                        </fieldset>
                        <fieldset>
                            <Field label="30-39" component={renderRadio}
                                type="radio" value="30+-+39" name="thirty"
                            />
                        </fieldset>
                        <fieldset>
                            <Field label="40-49" component={renderRadio}
                                type="radio" name="40+-+49" name="fourty"
                            />
                        </fieldset>
                    </div>
                    <div class="mt-5">
                        <fieldset>
                            <button action="submit" className="btn btn-primary">Submit</button>
                        </fieldset>
                    </div>
                </div>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div class="m-3 card">
                <div class="m-3">
                    {this.renderRanking()}
                </div>
            </div>
        );
    }
}

export default (reduxForm({
    form: "sortingReview",
    onSubmit: sortingReview
})(SortingReview));
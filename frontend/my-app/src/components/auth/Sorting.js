import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { renderCheckbox, renderRadio, renderField } from "../../utils/renderUtils";
import { sorting } from "../../actions/authActions";

class Sorting extends Component {

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

    renderRanking(){
        const { handleSubmit } = this.props;
        const options = [
            {
              label: 'Ranking (Descending)',
              value: '-rank_score',
            },
            {
              label: 'Ranking (Ascending)',
              value: 'rank_score',
            },
            {
              label: 'Number of Reviews (Descending)',
              value: '-average_star',
            },
            {
                label: 'Number of Reviews (Ascending)',
                value: 'average_star',
            },
            {
                label: 'Average Star (Descending)',
                value: '-review_number',
            },
            {
                label: 'Average Star (Ascending)',
                value: 'review_number',
            },
          ];

        return (
            <div>
                <form onSubmit={handleSubmit}>
                <div class="pl-0">
                    <div class="mb-4">
                        <p>Skin Type</p>
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
                        <hr/>
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
                        <hr/>
                    </div>
                    <div class="mb-4">
                        <p>Price Range</p>
                        <div>
                            <fieldset>
                                <Field name="price_min" component={renderField}
                                    type="text"
                                />
                            </fieldset>
                            <fieldset>
                                <Field name="price_max" component={renderField}
                                    type="text"
                                />
                            </fieldset>
                        </div>
                    </div>
                    <div class="mt-5">
                        <fieldset>
                            <button action="submit" className="btn btn-primary w-100">Apply Filter</button>
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
    form: "sorting",
    onSubmit: sorting
})(Sorting));
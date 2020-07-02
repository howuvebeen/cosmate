import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { renderCheckbox, renderSelect, renderField } from "../../utils/renderUtils";
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
                            <Field label="oily" component={renderCheckbox}
                                type="checkbox" name="oily"
                            />
                        </fieldset>
                        <fieldset>
                            <Field label="dry" component={renderCheckbox}
                                type="checkbox" name="dry"
                            />
                        </fieldset>
                        <fieldset>
                            <Field label="neutral" component={renderCheckbox}
                                type="checkbox" name="neutral"
                            />
                        </fieldset>
                        <fieldset>
                            <Field label="combinational" component={renderCheckbox}
                                type="checkbox" name="combinational"
                            />
                        </fieldset>
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
                    <div class="mb-4">
                        <p>Sort By</p>
                        <fieldset>
                            <Field name="sortby" component={renderSelect}
                                options={options}
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
    form: "sorting",
    onSubmit: sorting
})(Sorting));
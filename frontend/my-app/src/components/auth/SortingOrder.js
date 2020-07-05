import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { renderCheckbox, renderSelect, renderField } from "../../utils/renderUtils";
import { sorting } from "../../actions/authActions";

class SortingOrder extends Component {

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
              value: '-review_number',
            },
            {
                label: 'Number of Reviews (Ascending)',
                value: 'review_number',
            },
            {
                label: 'Average Star (Descending)',
                value: '-average_star',
            },
            {
                label: 'Average Star (Ascending)',
                value: 'average_star',
            },
          ];

        return (
            <div class="col-md-4 mb-4 ml-auto">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <Field name="sortby" component={renderSelect}
                            options={options}
                        />
                    </fieldset>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    {this.renderRanking()}
                </div>
            </div>
        );
    }
}

export default (reduxForm({
    form: "sorting",
    onSubmit: sorting
})(SortingOrder));
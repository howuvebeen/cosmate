import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { renderCheckbox, renderSelect, renderField } from "../../utils/renderUtils";
import { search } from "../../actions/authActions";

class SearchEngine extends Component {

    static propTypes = {
        ...propTypes
    };

    renderSearch(){
        const { handleSubmit, error } = this.props;

        return (
            <div class="d-flex flex-column align-items-center mt-5">
                <form class="col col-sm-6 mt-3 p-2"
                      onSubmit={handleSubmit}>
                    <h5 class="mb-3">Search</h5>
                    <div class="row">
                        <fieldset className="col col-md-9">
                            <Field name="result" component={renderField}
                                type="text" placeholder="Enter Your Search Term..."
                            />
                        </fieldset>
                        <fieldset className="col col-md-1">
                            <button action="submit" className="btn btn-primary">search</button>
                        </fieldset>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div class="m-3">
                <div class="m-3">
                    {this.renderSearch()}
                </div>
            </div>
        );
    }
}

export default (reduxForm({
    form: "search",
    onSubmit: search
})(SearchEngine));
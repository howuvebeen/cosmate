import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInstagram } from "../../actions/authActions";

class Instagram extends Component {

    static propTypes = {
        getInstagram: PropTypes.func.isRequired,
        lproduct: PropTypes.object
    };

    componentWillMount() {
        this.props.getInstagram();
    }

    renderInstagram() {
        const instagrams  = this.props.instagram;
    
        if (instagrams) {
            return (
                <div>
                    <h4>Instagram</h4>
                    <div class="row justify-content-md-left">
                        {instagrams.slice(0,17).map((instagram) => (
                            <div class="m-3 card">
                                <div class="m-5 p-3">
                                    {instagram.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div class="mt-5 pt-5 pl-5 mb-5">
                {this.renderInstagram()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        instagram: state.auth.instagram
    }
}

export default connect(mapStateToProps, { getInstagram } )( Instagram );
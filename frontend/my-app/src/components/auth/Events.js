import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEvents } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Events extends Component {

    static propTypes = {
        getEvents: PropTypes.func.isRequired,
        lproduct: PropTypes.object
    };

    componentWillMount() {
        this.props.getEvents();
    }

    renderEvents() {
        const events  = this.props.event;
    
        if (events) {
            return (
                <div>
                    <h4>Events</h4>
                    <div class="row justify-content-md-left">
                        {events.slice(0,2).map((event) => (
                            <div class="m-3 card col-md-5">
                                <div class="m-5 p-3">
                                    {event.title}
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
            <div class="mt-5 pt-5 pl-5">
                {this.renderEvents()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.auth.event
    }
}

export default connect(mapStateToProps, { getEvents } )( Events );
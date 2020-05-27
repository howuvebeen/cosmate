import React, { Component } from "react";

export default class PasswordResetDone extends Component {
    render() {
        return (
            <div class="mt-5 pt-5">
                <h3 class="text-md-center">A password reset link has been sent to your email.</h3>
                <p class="text-md-center">Please follow the link sent to your provided email to reset your password.</p>
            </div>
        )
    }
}
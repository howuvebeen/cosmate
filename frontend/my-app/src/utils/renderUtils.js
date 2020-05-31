import React from "react";

export const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <div>
        <div>
            <input className="form-control" {...input} type={type} placeholder={placeholder}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderTextAreaField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <div>
        <div>
            <textarea className="form-control" {...input} type={type} placeholder={placeholder}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderError = (errorMessages) => {
    if ( errorMessages) {
        return (
            <div className="alert alert-danger">
                {errorMessages}
            </div>
        )
    }
};
import React from "react";

export const renderLabelField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
    <div>
        <div>
            <label>{label}</label>
            <input className="form-control" {...input} type={type} placeholder={placeholder}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderSelect = ({ input, label, value }) => (
    <div>
        <div>
            <select {...input} >
                <options label={label} value={value} />
            </select>
        </div>
    </div>
);

export const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <div>
        <div>
            <input className="form-control" {...input} type={type} placeholder={placeholder}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderTextAreaField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
    <div>
        <div>
            <label>{label}</label>
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
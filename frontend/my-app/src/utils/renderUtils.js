import React from "react";
import Select from "react-select";
import Checkbox from "react-checkbox";


export const renderCheckbox = ({ input, label, name, type, meta: { touched, error } }) => (
    <div>
        <div>
            <label>{label}
            <input {...input} type={type} name={name} onChange={input => input.handleInputChange}/>
            </label>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderLabelField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
    <div>
        <div>
            <label>{label}</label>
            <input className="form-control" {...input} type={type} placeholder={placeholder}/>
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderSelect = ({ input, options, meta: { touched, error }}) => (
    <div>
        <div>
            <Select {...input} onChange={value => input.onChange(value)} 
                    onBlur={() => input.onBlur(input.value)} options={options} 
            />
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
    </div>
);

export const renderLabelSelect = ({ input, label, options, meta: { touched, error }}) => (
    <div>
        <label>{label}</label>
        <div>
            <Select {...input} onChange={value => input.onChange(value)} 
                    onBlur={() => input.onBlur(input.value)} options={options} 
            />
        </div>
        {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
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
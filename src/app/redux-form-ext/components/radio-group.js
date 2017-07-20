import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { change, Field } from 'redux-form';

function handleOnChange({input, meta, fieldsToResetOnChange, value}) {
  // call default behavior
  input.onChange(value);
  // check if other fields in the form need to be reset as a result of this change
  fieldsToResetOnChange.forEach((field) => {
    meta.dispatch(change(meta.form, field.name, field.value))
  });
}

const RadioGroup = ({className, input, meta, options, fieldsToResetOnChange}) => (
  <div className={'radio-group ' + className}>
    {options.map(o => (<div className="radio-group-item" key={o.value}><label><input type="radio" {...input} onChange={(value) => {handleOnChange({input, value, meta, fieldsToResetOnChange})}} value={o.value} checked={o.value === input.value} /><span className={o.className}>{o.title}</span></label></div>))}
    {meta.touched && meta.error && <span className="error">{meta.error}</span>}
  </div>
);

function checkIsRequired(isRequired, value) {
  return (isRequired && !value) ? '* Required' : undefined;
}

const RadioGroupField = ({className, groupName, isRequired, options, fieldsToResetOnChange}) => (
  <Field component={RadioGroup} className={className} name={groupName} validate={checkIsRequired.bind(this, isRequired)} fieldsToResetOnChange={fieldsToResetOnChange} options={options} />
);

RadioGroupField.propTypes = {
  className: PropTypes.string,
  groupName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isRequired: PropTypes.bool,
  fieldsToResetOnChange: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};

RadioGroupField.defaultProps = {
  className: '',
  isRequired: false,
  fieldsToResetOnChange: []
};

export default RadioGroupField;

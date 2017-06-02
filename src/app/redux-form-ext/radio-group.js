import React, { Component, PropTypes } from 'react';
import { change, Field } from 'redux-form';

function handleOnChange({input, meta, resetFieldsOnChange, value}) {
  // call default behavior
  input.onChange(value);
  // check if other fields in the form need to be reset as a result of this change
  resetFieldsOnChange.forEach((field) => {
    meta.dispatch(change(meta.form, field.name, field.value))
  });
}

const RadioGroup = ({className, input, meta, options, resetFieldsOnChange}) => (
  <div className={'radio-group ' + className}>
    {options.map(o => (<div className="radio-group-item" key={o.value}><label><input type="radio" {...input} onChange={(value) => {handleOnChange({input, value, meta, resetFieldsOnChange})}} value={o.value} checked={o.value === input.value} /><span className={o.className}>{o.title}</span></label></div>))}
    {meta.touched && meta.error && <span className="error">{meta.error}</span>}
  </div>
);

function checkIsRequired(isRequired, value) {
  return (isRequired && !value) ? '* Required' : undefined;
}

const RadioGroupField = ({className, groupName, isRequired, options, resetFieldsOnChange}) => (
  <Field component={RadioGroup} className={className} name={groupName} validate={checkIsRequired.bind(this, isRequired)} resetFieldsOnChange={resetFieldsOnChange} options={options} />
);

RadioGroupField.propTypes = {
  className: PropTypes.string,
  groupName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isRequired: PropTypes.bool,
  resetFieldsOnChange: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};

RadioGroupField.defaultProps = {
  className: '',
  isRequired: false,
  resetFieldsOnChange: []
};

export default RadioGroupField;

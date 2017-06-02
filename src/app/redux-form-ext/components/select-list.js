import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const SelectList = ({label, input, options}) => (
  <div className="select-list form-group form-group-select-list row no-side-margin">
    <label className="col-md-3 block label-box" htmlFor={label}>
      <span>{label}</span>
      <span className="disclaimer"></span>
    </label>
    <div className="col-md-9 no-side-padding">
      <select className="form-control" {...input}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.name}</option>
        )) }
      </select>
    </div>
  </div>
);

const FieldSelectList = ({label, name, options, validate}) => (
  <Field name={name} label={label} component={SelectList} type="input" options={options} validate={validate} />
);

FieldSelectList.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  validate: PropTypes.array
};

FieldSelectList.defaultProps = {
  label: '',
  validate: []
};

export default FieldSelectList;

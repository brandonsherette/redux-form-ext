import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

class Checkbox extends Component {
  render() {
    const {
      autoFocus,
      input,
      label,
      meta: {dirty, touched, error, warning, valid}
    } = this.props;

    const inputStyles = classNames(
      'form-control',
      {
        'valid': (valid),
        'invalid': (!valid && (dirty || touched))
      }
    );

    return (
      <div className="form-group form-group-checkbox">
        <label htmlFor={input.name}>
          <input autoFocus={autoFocus} type="checkbox" {...input} />&nbsp;
          {label}
        </label>
        {touched && error && (<div className="font-danger error">{error}</div>)}
      </div>
    );
  }
}

const CheckboxField = (props) => (
  <Field {...props} component={Checkbox} type="checkbox" />
);

CheckboxField.propTypes = {
  autoFocus: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.any.isRequired
};

CheckboxField.defaultProps = {
  autoFocus: false,
};

export default CheckboxField;
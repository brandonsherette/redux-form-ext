import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'redux-form';

class SelectList extends Component {
  render() {
    const { autoFocus, label, labelHint, input, options, meta: { dirty, touched, error, warning, valid } } = this.props;
    const labelStyles = classNames(
      'col-md-3',
      'block',
      'label-box',
      {
        'valid': (valid),
        'invalid': (!valid && (dirty || touched))
      }
    );
    const inputWrapperStyles = classNames(
      'input-wrapper',
      'col-md-9',
      'px-0',
      {
        'valid': (valid),
        'invalid': (!valid && (dirty || touched))
      }
    );

    return (
      <div className="select-list form-group form-group-select-list row mx-0">
        <label className={labelStyles} htmlFor={label}>
          <span>{label}</span>
          <span className="disclaimer label-hint">{labelHint}</span>
        </label>
        <div className={inputWrapperStyles}>
          <select autoFocus={autoFocus} className="form-control" {...input}>
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.name}</option>
            ))}
          </select>
          {renderNotification(touched, error, warning)}
        </div>
      </div>
    );
  }
}

const FieldSelectList = (props) => (
  <Field {...props} component={SelectList} type="input" />
);

FieldSelectList.propTypes = {
  autoFocus: PropTypes.bool,
  label: PropTypes.string,
  labelHint: PropTypes.node,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  validate: PropTypes.array
};

FieldSelectList.defaultProps = {
  autoFocus: false,
  label: '',
  validate: []
};

export default FieldSelectList;

///////////////////

function renderNotification(touched, error, warning) {
  if (!touched) {
    return null;
  }

  if (error) {
    return (<span className="error">{error}</span>);
  }

  if (warning) {
    return (<span className="warning">{warning}</span>);
  }

  return null;
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';
import Normalize from '../normalize';

const renderNotification = (touched, error, warning) => {
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

class renderField extends Component {  
  render() {
    const {input, label, labelDisclaimer, isLabelInline, placeholder, type, meta: {dirty, touched, error, warning, valid}} = this.props;

    const inputStyles = classNames(
      'form-control',
      {
        'valid': (valid),
        'invalid': (!valid && (dirty || touched))
      }
    );

    const inputStateIconStyles = classNames(
      'input-state-icon',
      {
        'valid': (valid),
        'invalid': (!valid && (dirty || touched))
      }
    );

    if (isLabelInline) {
      return (
        <div className="form-group form-group-text row no-side-margin">
          <label className="col-md-3 block label-box" htmlFor={label}>
            <span>{label}&nbsp; </span>
            <span className="disclaimer">{labelDisclaimer}</span>
          </label>
          <div className="col-md-9 no-side-padding input-wrapper">
            <input {...input} type={type} className={inputStyles} placeholder={placeholder} />
            <span className={inputStateIconStyles}></span>
            {renderNotification(touched, error, warning) }
          </div>
        </div>
      );
    }

    return (
      <div className="form-group form-group-text">
        <label>
          <span>{label}&nbsp; </span>
          <span className="disclaimer">{labelDisclaimer}</span>
        </label>
        <div className="input-wrapper">
          <span className={inputStateIconStyles}></span>
          <input {...input} type={type} className={inputStyles} placeholder={placeholder} />
          {renderNotification(touched, error, warning) }
        </div>
      </div>
    )
  }
}

const Phone = ({reduxFormChange, label, labelDisclaimer, name, isLabelInline, placeholder, type, validate}) => (
  <div>
    <Field normalize={Normalize.phone} name={name} type={type} labelDisclaimer={labelDisclaimer} placeholder={placeholder} component={renderField} label={label} isLabelInline={isLabelInline} validate={validate} />
  </div>
);

Phone.propTypes = {
  label: PropTypes.string.isRequired,
  labelDisclaimer: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isLabelInline: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.array
};

Phone.defaultProps = {
  labelDisclaimer: '',
  placeholder: '',
  isLabelInline: true,
  type: 'text',
  validate: []
};

export default Phone;

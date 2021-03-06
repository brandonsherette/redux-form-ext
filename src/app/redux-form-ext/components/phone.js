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
    const {
      autoFocus, 
      input, 
      label, 
      labelDisclaimer, 
      isLabelInline, 
      placeholder, 
      type, 
      meta: {dirty, touched, error, warning, valid}
    } = this.props;

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
            <input autoFocus={autoFocus} {...input} type={type} className={inputStyles} placeholder={placeholder} />
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
          <input autoFocus={autoFocus} {...input} type={type} className={inputStyles} placeholder={placeholder} />
          {renderNotification(touched, error, warning) }
        </div>
      </div>
    )
  }
}

const Phone = (props) => (
  <div>
    <Field normalize={Normalize.phone} component={renderField} {...props} />
  </div>
);

Phone.propTypes = {
  autoFocus: PropTypes.bool,
  label: PropTypes.any,
  labelDisclaimer: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isLabelInline: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.array
};

Phone.defaultProps = {
  autoFocus: false,
  label: '',
  labelDisclaimer: '',
  placeholder: '',
  isLabelInline: true,
  type: 'text',
  validate: []
};

export default Phone;

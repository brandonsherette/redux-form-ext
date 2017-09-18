import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

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
      maxLength, 
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
        <div className="form-group form-group-textarea row no-side-margin">
          <label className="col-md-3 block label-box" htmlFor={label}>
            <span>{label}&nbsp; </span>
            <span className="disclaimer">{labelDisclaimer}</span>
          </label>
          <div className="col-md-9 no-side-padding input-wrapper">
            <textarea autoFocus={autoFocus} {...input} maxLength={maxLength} type={type} className="form-control" placeholder={placeholder}></textarea>
            <span className={inputStateIconStyles}></span>
            {renderNotification(touched, error, warning) }
          </div>
        </div>
      );
    }

    return (
      <div className="form-group form-group-textarea">
        <label>
          <span>{label}&nbsp;</span>
          <span className="disclaimer">{labelDisclaimer}</span>
        </label>
        <div className="input-wrapper">
          <span className={inputStateIconStyles}></span>
          <textarea autoFocus={autoFocus} {...input} maxLength={maxLength} type={type} className={inputStyles} placeholder={placeholder}></textarea>
          {renderNotification(touched, error, warning) }
        </div>
      </div>
    )
  }
}

const TextArea = (props) => (
  <div>
    <Field {...props} component={renderField} />
  </div>
);

TextArea.propTypes = {
  autoFocus: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelDisclaimer: PropTypes.any,
  maxLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  normalize: PropTypes.func,
  placeholder: PropTypes.string,
  isLabelInline: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.array
};

TextArea.defaultProps = {
  autoFocus: false,
  labelDisclaimer: '',
  maxLength: null,
  placeholder: '',
  normalize: null,
  isLabelInline: true,
  type: 'textarea',
  validate: []
};

export default TextArea;

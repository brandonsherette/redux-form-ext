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
        <div className="form-group form-group-text row no-side-margin">
          <label className="col-md-3 block label-box" htmlFor={input.name}>
            <span>{label}&nbsp; </span>
            <span className="disclaimer">{labelDisclaimer}</span>
          </label>
          <div className="col-md-9 no-side-padding input-wrapper">
            <input autoFocus={autoFocus} {...input} maxLength={maxLength} type={type} className="form-control" placeholder={placeholder} />
            <span className={inputStateIconStyles}></span>
            {renderNotification(touched, error, warning) }
          </div>
        </div>
      );
    }

    return (
      <div className="form-group form-group-text">
        {(label !== '') && (
          <label>
            <span>{label}&nbsp;</span>
            <span className="disclaimer">{labelDisclaimer}</span>
          </label>
        )}
        <div className="input-wrapper">
          <span className={inputStateIconStyles}></span>
          <input autoFocus={autoFocus} {...input} maxLength={maxLength} type={type} className={inputStyles} placeholder={placeholder} />
          {renderNotification(touched, error, warning) }
        </div>
      </div>
    )
  }
}

const Text = (props) => (
  <div className={props.className}>
    <Field {...props} component={renderField} />
  </div>
);

Text.propTypes = {
  autoFocus: PropTypes.bool,
  label: PropTypes.any,
  labelDisclaimer: PropTypes.any,
  maxLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  normalize: PropTypes.func,
  placeholder: PropTypes.string,
  isLabelInline: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.array
};

Text.defaultProps = {
  autoFocus: false,
  label: '',
  labelDisclaimer: '',
  maxLength: null,
  placeholder: '',
  normalize: null,
  isLabelInline: true,
  type: 'text',
  validate: []
};

export default Text;

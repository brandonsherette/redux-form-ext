import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';

class Captcha extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.refs.recaptcha.reset();
    // need to notify form to change to null to force re-attempt on captcha
    this.props.input.onChange(null);
  }

  render() {
    const { input, sitekey } = this.props;

    return (
      <ReCAPTCHA ref="recaptcha" className="captcha" sitekey={sitekey} {...input} />
    );
  }
}

const CaptchaField = ({ name, sitekey }) => (
  <div>
    <Field sitekey={sitekey} name={name} component={Captcha} />
    <div className="break-2x"></div>
  </div>
);

CaptchaField.propTypes = {
  name: PropTypes.string.isRequired,
  sitekey: PropTypes.string.isRequired
};

export default CaptchaField;

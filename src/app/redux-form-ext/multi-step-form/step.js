import React from 'react';
import PropTypes from 'prop-types';

const Step = ({children, title}) => (
  <div className={'multi-step-form__step ' + title}>
    {children}
  </div>
);

Step.propTypes = {
  title: PropTypes.string.isRequired
} 

export default Step;

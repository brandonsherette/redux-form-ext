import React from 'react';
import PropTypes from 'prop-types';

const Step = ({children, title}) => (
  <div className={'multi-step-form__step ' + title}>
    {children}
  </div>
);

Step.propTypes = {
  stepError: PropTypes.any,
  title: PropTypes.string.isRequired
}

Step.defaultProps = {
  stepError: null
};

export default Step;

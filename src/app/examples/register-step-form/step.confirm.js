import React from 'react';
import { FormComponents, MultiStepForm } from '../../redux-form-ext/index';

const StepConfirm = (props) => (
  <MultiStepForm.Step {...props}>
    <h1>Confirm Registration?</h1>
  </MultiStepForm.Step>
);

export default StepConfirm;
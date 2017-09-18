import React from 'react';
import { FormComponents, MultiStepForm } from '../../redux-form-ext/index';

const StepLogin = (props) => (
  <MultiStepForm.Step {...props}>
    <FormComponents.Text autoFocus={true} label="* Email" placeholder="Email" name="email" isLabelInline={false} />
    <FormComponents.Text label="* Password" placeholder="Password" name="password" type="password" isLabelInline={false} />
  </MultiStepForm.Step>
);
StepLogin.formInputs = ['email', 'password'];

export default StepLogin;

import React from 'react';
import { FormComponents, MultiStepForm } from '../../redux-form-ext/index';

const StepAccount = (props) => (
  <MultiStepForm.Step {...props}>
    <FormComponents.Text autoFocus={true} name="firstname" label="Firstname" isLabelInline={false} />
    <FormComponents.Text name="lastname" label="Lastname" isLabelInline={false} />
  </MultiStepForm.Step>
);
StepAccount.formInputs = ['firstname', 'lastname'];

export default StepAccount;
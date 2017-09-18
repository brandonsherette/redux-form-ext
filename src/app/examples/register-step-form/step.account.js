import React from 'react';
import { FormComponents, Normalize, MultiStepForm } from '../../redux-form-ext/index';

const StepAccount = (props) => (
  <MultiStepForm.Step {...props}>
    <FormComponents.Text autoFocus={true} normalize={Normalize.name} label="* Firstname" placeholder="Firstname" name="firstname" isLabelInline={false} />
    <FormComponents.Text normalize={Normalize.name} label="* Lastname" placeholder="Lastname" name="lastname" isLabelInline={false} />
    <FormComponents.Phone label="Phone" placeholder="Phone" name="phone" isLabelInline={false} />
  </MultiStepForm.Step>
);
StepAccount.formInputs = ['firstname', 'lastname', 'phone'];

export default StepAccount;
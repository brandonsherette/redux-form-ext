import React from 'react';
import { FormComponents, MultiStepForm } from '../../redux-form-ext/index';

const actTypeOptions = [
  {
    name: 'Select Account Type',
    value: ''
  },
  {
    name: 'General',
    value: 'general'
  },
  {
    name: 'Admin',
    value: 'admin'
  },
  {
    name: 'Power User',
    value: 'power'
  }
]

const StepAccount = (props) => (
  <MultiStepForm.Step {...props}>
    <FormComponents.SelectList
      autoFocus={true}
      name="accountType"
      options={actTypeOptions}
      label="Account Type"
      labelHint={(
        <i
          role="button"
          className="fa fa-question-circle"
          onClick={() => { alert('Account type determines the permissions the account has.') }}>
        </i>
      )}
    />
  </MultiStepForm.Step>
);
StepAccount.formInputs = ['accountType'];

export default StepAccount;
import React from 'react';
import PropTypes from 'prop-types';
import { FormComponents, Normalize, MultiStepForm } from '../../redux-form-ext/index';

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
];

const StepAccountType = (props) => (
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
    <FormComponents.SelectListAdv
      label="Account Type"
      name="accountType2"
      isLabelInline={true}
      options={[
        {
          label: 'General',
          value: 'general'
        },
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'Power User',
          value: 'power'
        }
      ]}
      reduxFormChange={props.handleUpdateField}
    />
  </MultiStepForm.Step>
);

StepAccountType.propTypes = Object.assign({}, MultiStepForm.Step.propTypes || {}, {
  handleUpdateField: PropTypes.func.isRequired
});

StepAccountType.formInputs = ['accountType', 'accountType2'];

export default StepAccountType;
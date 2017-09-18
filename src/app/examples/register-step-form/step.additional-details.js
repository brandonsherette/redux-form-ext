import React from 'react';
import { FormComponents, Normalize, MultiStepForm } from '../../redux-form-ext/index';

const StepAdditionalDetails = (props) => (
  <MultiStepForm.Step {...props}>
    <FormComponents.TextArea autoFocus={true} label="Account Notes" placeholder="Account Notes" name="accountNotes" isLabelInline={false} />
    <FormComponents.ToggleGroup
      fieldsToResetOnChange={[
        {
          name: 'accountType',
          value: ''
        }
      ]}
      groupName="subscribe"
      label="Subscribe"
      labelHint={(
        <i
          role="button"
          className="fa fa-question-circle"
          onClick={() => { alert('Subscribing will allow you to get notified when new changes occur.') }}>
        </i>
      )}
      options={[
        {
          name: 'Yes',
          value: 'yes'
        },
        {
          name: 'Maybe',
          value: 'maybe'
        },
        {
          name: 'No',
          value: 'no'
        }
      ]}
    />
    <p className="disclaimer">* Is Required</p>
  </MultiStepForm.Step>
);
StepAdditionalDetails.formInputs = ['accountNotes', 'subscribe'];

export default StepAdditionalDetails;
import React from 'react';
import { FormComponents, Normalize } from '../../redux-form-ext/index';

const Step1 = () => (
  <div>
    <FormComponents.Text label="* Email" placeholder="Email" name="email" isLabelInline={false} />
    <FormComponents.Text label="* Password" placeholder="Password" name="password" type="password" isLabelInline={false} />
  </div>
);

export default Step1;

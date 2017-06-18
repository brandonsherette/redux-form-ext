import React from 'react';
import { FormComponents, Normalize } from '../../redux-form-ext/index';

const Step2 = () => (
  <div>
    <FormComponents.Text normalize={Normalize.name} label="* Firstname" placeholder="Firstname" name="firstname" isLabelInline={false} />
    <FormComponents.Text normalize={Normalize.name} label="* Lastname" placeholder="Lastname" name="lastname" isLabelInline={false} />
    <FormComponents.Phone label="Phone" placeholder="Phone" name="phone" isLabelInline={false} />
  </div>
);

export default Step2;
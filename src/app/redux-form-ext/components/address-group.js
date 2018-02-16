import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from './text';
import USStateList from './us-state-list';
import Normalize from '../normalize';

require('./address-group.scss');

class AddressGroup extends Component {
  render() {
    const { fieldNamePrefix } = this.props;

    return (
      <div className="address-group">
        <div className="field-group">
          <Text
            autoComplete="given-name"
            className="firstname"
            placeholder="First Name"
            name={fieldNamePrefix + 'Firstname'}
            normalize={Normalize.name}
            label="First Name"
            isLabelInline={false}
            isLabelHidden={true}
          />
          <Text
            autoComplete="family-name"
            className="lastname"
            placeholder="Last Name"
            label="Last Name"
            name={fieldNamePrefix + 'Lastname'}
            normalize={Normalize.name}
            isLabelInline={false}
            isLabelHidden={true}
          />
        </div>
        <div className="field-group">
          <Text
            autoComplete="address-line1"
            className="address1"
            placeholder="Street Address"
            label="Address"
            name={fieldNamePrefix + 'Address'}
            normalize={Normalize.name}
            isLabelInline={false}
            isLabelHidden={true}
          />
          <Text
            autoComplete="address-line2"
            className="address2"
            placeholder="Apt, suite, etc... (optional)"
            label="Address 2"
            name={fieldNamePrefix + 'Address2'}
            normalize={Normalize.name}
            isLabelInline={false}
            isLabelHidden={true}
          />
        </div>
        <div className="field-group">
          <Text
            autoComplete="address-level2"
            className="city"
            placeholder="City"
            label="City"
            name={fieldNamePrefix + 'City'}
            normalize={Normalize.name}
            isLabelInline={false}
            isLabelHidden={true}
          />
          <div className="state">
            <USStateList
              name={fieldNamePrefix + 'State'}
              isLabelInline={false}
              isLabelHidden={true}
            />
          </div>
          <Text
            autoComplete="postal-code"
            type="number"
            className="zip"
            placeholder="Zip"
            label="Zip"
            name={fieldNamePrefix + 'Zip'}
            isLabelInline={false}
            isLabelHidden={true}
          />
        </div>
      </div>
    )
  }
}

AddressGroup.propTypes = {
  fieldNamePrefix: PropTypes.string,
};

AddressGroup.defaultProps = {
  fieldNamePrefix: '',
};

AddressGroup.evalFormValues = (formValues, fieldNamePrefix) => {
  const errors = {};
  const simpleValidation = [
    'Firstname',
    'Lastname',
    'Address',
    'City',
    'State',
  ];

  simpleValidation.forEach((field) => {
    if (!formValues[fieldNamePrefix + field]) {
      errors[fieldNamePrefix + field] = 'Required';
    }
  });

  // zip has different validation
  const zipValue = formValues[fieldNamePrefix + 'Zip'];
  if (!zipValue) {
    errors[fieldNamePrefix + 'Zip'] = 'Required';
  }

  if (!/^[\d]{5,}$/.test(zipValue)) {
    errors[fieldNamePrefix + 'Zip'] = 'Invalid Zip';
  }

  return errors;
};

export default AddressGroup;
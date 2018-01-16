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
            className="firstname"
            placeholder="Firstname"
            name={fieldNamePrefix + 'Firstname'}
            normalize={Normalize.name}
            label="Firstname"
            isLabelInline={false}
            isLabelHidden={true}
          />
          <Text
            className="lastname"
            placeholder="Lastname"
            label="Lastname"
            name={fieldNamePrefix + 'Lastname'}
            normalize={Normalize.name}
            isLabelInline={false}
            isLabelHidden={true}
          />
        </div>
        <div className="field-group">
          <Text
            className="address1"
            placeholder="Street Address"
            label="Address"
            name={fieldNamePrefix + 'Address'}
            normalize={Normalize.name}
            isLabelInline={false}
            isLabelHidden={true}
          />
          <Text
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { change, Field } from 'redux-form';
import RadioGroup from './radio-group';

class ToggleGroup extends Component {
  render() {
    const {className, groupName, label, labelHint, options, fieldsToResetOnChange} = this.props;

    return (
      <div className="toggle-group form-group">
        <div className="row mx-0">
          <div className="label-box col-md-3">
            <span>{label}</span>
            <span className="disclaimer label-hint">{labelHint}</span>
          </div>
          <div className="input-wrapper col-md-9 px-0">
            <RadioGroup
              className={className}
              groupName={groupName}
              options={options}
              fieldsToResetOnChange={fieldsToResetOnChange}
            />
          </div>
        </div>
      </div>
    );

    /*return (
      <div className={'toggle-group ' + className}>
        {options.map(o => (
          <div className="toggle-group-item" key={o.value}>
            <label>
              <input 
                type="radio" {...input} 
                onChange={(value) => {
                  this.handleOnChange({input, value, meta, fieldsToResetOnChange})
                }}
                value={o.value}
              />
            </label>
          </div>
        ))}
      </div>
    );*/
  }
}

ToggleGroup.propTypes = {
  className: PropTypes.string,
  groupName: PropTypes.string.isRequired,
  label: PropTypes.any,
  labelHint: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  fieldsToResetOnChange: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
}

ToggleGroup.defaultProps = {
  className: '',
  label: '',
  labelHint: null,
  isRequired: false,
  fieldsToResetOnChange: []
};

/*const ToggleGroupField = ({className, groupName, options, fieldsToResetOnChange}) => (
  <Field component={ToggleGroup} className={className} name={groupName} fieldsToResetOnChange={fieldsToResetOnChange} options={options} /> 
);*/

export default ToggleGroup;
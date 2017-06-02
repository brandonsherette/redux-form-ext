import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Slider from 'rc-slider';

require('./styles/rc-slider.css');

function calcRemainingValue(capValue, totalValue) {
  return capValue - totalValue;
}

function calcTotalValue(values) {
  let totalValue = 0;

  for (let key in values) {
    totalValue += values[key];
  }

  return totalValue;
}

function checkIfVaild(capValue, values) {
  return (calcTotalValue(values) === capValue) ? undefined : '* Total value must be ' + capValue;
}

function generateMarks(max) {
  const marks = {};

  for (let x = 0; x <= max; x += 1) {
    marks[x] = x;
  }

  return marks;
}

class SliderGroup extends Component {
  handleSliderChange(field, value) {
    const { capValue, input, triggerFieldChange } = this.props;
    // check if value is at the cap
    const curValues = Object.assign({}, input.value);
    const curTotalValue = calcTotalValue(curValues);
    
    const targetValues = Object.assign({}, curValues);
    targetValues[field] = value;

    const targetTotalValue = calcTotalValue(targetValues);
    
    if (targetTotalValue > capValue) {
      // find out the cap value and apply it
      const remainingValue = calcRemainingValue(capValue, curTotalValue);
      targetValues[field] = curValues[field] + remainingValue;
    }

    triggerFieldChange(input.name, targetValues);
  }

  render() {
    const { options } = this.props;
    const inputs = options.map((option, index) => {
      return this.renderSliderInput(option, index);
    });

    return (
      <div className="slider-group">
        {inputs}
      </div>
    );
  }

  renderSliderInput(option, key) {
    const { capValue, input, max, options } = this.props;
    const mVal = (input.value[option.fieldName]) ? input.value[option.fieldName] : 0;

    return (
      <div className="slider-input break-2x" key={key}>
        <div className="label-box">{option.label}</div>
        <div className="slider-wrapper">
          <Slider min={0} max={max} marks={generateMarks(max)} step={1} onChange={this.handleSliderChange.bind(this, option.fieldName)} value={mVal} />
        </div>
        <div className="label-box">{mVal}</div>
      </div>
    );
  }
}

const SliderGroupField = ({capValue, groupName, max, options, triggerFieldChange}) => (
  <Field component={SliderGroup} name={groupName} capValue={capValue} max={max} options={options} triggerFieldChange={triggerFieldChange} validate={checkIfVaild.bind(this, capValue)} />
);

SliderGroupField.propTypes = {
  capValue: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired
  })).isRequired,
  triggerFieldChange: PropTypes.func.isRequired
};

export default SliderGroupField;

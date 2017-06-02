import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(option, e) {
    const prevGroupValues = this.props.input.value.slice(0);
    const index = this.findGroupValuesIndex(option.value);
    const isChecked = (index > -1);
    let nextGroupValues = prevGroupValues.slice(0);

    if (this.props.limit && this.props.limit > 0 && prevGroupValues.length >= this.props.limit && !isChecked) {
      // do nothing since the option has reached its limit
      return;
    }

    if (isChecked) {
      // need to remove
      nextGroupValues.splice(index, 1);
    } else {
      // need to check so push 
      nextGroupValues.push(option.value);
    }

    this.props.updateField(this.props.input.name, nextGroupValues);
  }

  findGroupValuesIndex(value) {
    const prevGroupValues = this.props.input.value.slice(0);

    for (let x = 0; x < prevGroupValues.length; x += 1) {
      if (prevGroupValues[x] === value) {
        return x;
      }
    }

    return -1;
  }

  getSelectionNumber(value) {
    const groupValues = this.props.input.value;

    for (let x = 0; x < groupValues.length; x += 1) {
      if (groupValues[x] === value) {
        return x + 1;
      }
    }

    return '';
  }

  isOptionChecked(option) {
    const index = this.findGroupValuesIndex(option.value);

    if (index === -1) {
      return false;
    }

    return true;
  }

  render() {
    const {className, input, meta, options} = this.props;

    return (
      <div className={'checkbox-group ' + className}>
        {options.map((o, index) => (
          <div className="checkbox-group-item" key={o.value}>
            <label>
              <span className="selection-number">{this.getSelectionNumber(o.value)}</span>
              <input name={input.name} className={input.className} checked={(this.isOptionChecked(o))} type="checkbox" onChange={this.handleChange.bind(this, o)} value={o.value} />
              <span className={o.className}>
                {o.name}
                <span className="subtitle">{o.subtitle || ''}</span>
              </span>
            </label>
          </div>
        ))}
        {meta.touched && meta.error && <span className="error">{meta.error}</span>}
      </div>
    );
  }
}

const CheckboxGroupField = ({className, limit, name, updateField, options, validate}) => (
  <Field name={name} limit={limit} component={CheckboxGroup} validate={validate} updateField={updateField} className={className} options={options} />
);

CheckboxGroupField.propTypes = {
  className: PropTypes.string,
  limit: PropTypes.number,
  validate: PropTypes.array,
  name: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    value: PropTypes.string.isRequired,
    className: PropTypes.string
  })).isRequired
};

CheckboxGroupField.defaultProps = {
  className: '',
  limit: 0,
  validate: []
};

export default CheckboxGroupField;

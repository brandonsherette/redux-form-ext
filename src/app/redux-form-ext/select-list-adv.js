import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Select from 'react-select';
import classNames from 'classnames';

require('./react-select.css');

class SelectList extends Component {
  handleChange(option) {
    const value = (option) ? option.value : '';

    this.props.reduxFormChange(value);
  }

  render() {
    const { label, labelDisclaimer, input, options, isLabelInline, meta, meta: {dirty, touched, error, warning, valid} } = this.props;
    const inputStyles = classNames(
      'form-control-select',
      {
        'valid': (valid),
        'invalid': (!valid && (dirty || touched))
      }
    );

    if (isLabelInline) {
      return (
        <div className="select-list form-group form-group-select-list row no-side-margin">
          <label className="col-md-3 block label-box" htmlFor={label}>
            <span>{label}</span>
            <span className="disclaimer">{labelDisclaimer}</span>
          </label>
          <div className="col-md-9 no-side-padding">
            <Select className={inputStyles} options={options} name={input.name} value={input.value} onChange={(option) => { this.handleChange(option) } } />
            {renderNotification(touched, error, warning) }
          </div>
        </div>
      )
    }

    return (
      <div className="form-group form-group-select-list">
        <label>
          <span>{label}&nbsp; </span>
          <span className="disclaimer">{labelDisclaimer}</span>
        </label>
        <div className="">
          <Select className={inputStyles} options={options} name={input.name} value={input.value} onChange={(option) => { this.handleChange(option) } } />
          {renderNotification(touched, error, warning) }
        </div>
      </div>
    );
  }
}

const FieldSelectList = ({label, labelDisclaimer, isLabelInline, name, options, reduxFormChange, validate}) => (
  <Field name={name} label={label} reduxFormChange={reduxFormChange} labelDisclaimer={labelDisclaimer} isLabelInline={isLabelInline} component={SelectList} type="input" options={options} validate={validate} />
);

FieldSelectList.propTypes = {
  label: PropTypes.string,
  labelDisclaimer: PropTypes.string,
  isLabelInline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  reduxFormChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  validate: PropTypes.array
};

FieldSelectList.defaultProps = {
  label: '',
  labelDisclaimer: '',
  isLabelInline: true,
  validate: []
};

export default FieldSelectList;

///////////////////// 

function renderNotification(touched, error, warning) {
  if (!touched) {
    return null;
  }

  if (error) {
    return (<span className="error">{error}</span>);
  }

  if (warning) {
    return (<span className="warning">{warning}</span>);
  }

  return null;
}

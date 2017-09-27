import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Select from 'react-select';
import classNames from 'classnames';

require('./styles/react-select.css');

class SelectList extends Component {
  handleChange(option) {
    const value = (option) ? option.value : '';

    this.props.reduxFormChange(this.props.input.name, value);
  }

  render() {
    const { 
      autoFocus, 
      label, 
      labelDisclaimer, 
      input, 
      options, 
      isLabelInline, 
      meta, 
      meta: {dirty, touched, error, warning, valid} 
    } = this.props;
    const inputStyles = classNames(
      'form-control-select',
      {
        'valid': (valid),
        'invalid': (!valid && (dirty || touched))
      }
    );

    if (isLabelInline) {
      return (
        <div className="select-list form-group form-group-select-list row mx-0 label-inline">
          <label className="col-md-3 col-sm-3 col-xs-12 block label-box" htmlFor={input.name}>
            <span>{label}</span>
            <span className="disclaimer">{labelDisclaimer}</span>
          </label>
          <div className="col-md-9 col-sm-9 col-xs-12 px-0">
            <Select autoFocus={autoFocus} className={inputStyles} options={options} name={input.name} value={input.value} onChange={(option) => { this.handleChange(option) } } />
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
          <Select autoFocus={autoFocus} className={inputStyles} options={options} name={input.name} value={input.value} onChange={(option) => { this.handleChange(option) } } />
          {renderNotification(touched, error, warning) }
        </div>
      </div>
    );
  }
}

const FieldSelectList = (props) => (
  <Field {...props} component={SelectList} type="input" />
);

FieldSelectList.propTypes = {
  autoFocus: PropTypes.bool,
  label: PropTypes.any,
  labelDisclaimer: PropTypes.string,
  isLabelInline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  reduxFormChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  validate: PropTypes.array
};

FieldSelectList.defaultProps = {
  autoFocus: false,
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

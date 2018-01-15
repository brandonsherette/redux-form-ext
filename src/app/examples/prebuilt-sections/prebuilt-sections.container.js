import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change as reduxFormChange, reduxForm } from 'redux-form';
import Loading from '../../vendor/loading/loading';
import { FormComponents, Normalize } from '../../redux-form-ext/index';

class PrebuiltSections extends Component {
  render() {
    const {
      handleSubmit, 
      handleSave, 
      handleResetSaveState, 
      isSaving, 
      isSaveCompleted, 
      saveError
    } = this.props;

    if (isSaving) {
      return (
        <section>
          <Loading title="Saving..." />
        </section>
      );
    }

    if (isSaveCompleted) {
      return (
        <section>
          <header>
            <h1>Prebuilt Sections</h1>
          </header>
          <div>
            <h3>Save Completed!</h3>
            <div className="text-center">
              <button type="button" onClick={handleResetSaveState} className="btn btn-primary">Continue</button>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section>
        <header>
          <h1>Prebuilt Sections</h1>
        </header>
        <form className="form" onSubmit={handleSubmit((values) => { handleSave(values) }) }>
          <h3>Shipping</h3>
          <FormComponents.AddressGroup fieldNamePrefix="shipTo" />
          <h3>Billing</h3>
          <FormComponents.AddressGroup fieldNamePrefix="billTo" />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    );
  }
}

PrebuiltSections.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  isSaveCompleted: PropTypes.bool.isRequired,
  saveError: PropTypes.string,
  handleResetSaveState: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isSaving: false,
    isSaveCompleted: false,
    saveError: ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleResetSaveState: () => { },
    handleSave: (user) => { },
  };
};

const Form = reduxForm({
  form: 'prebuilt-sections',
  validate: (values) => {
    const errors = {};
    // add custom validation

    return Object.assign({}, 
      FormComponents.AddressGroup.evalFormValues(values, 'shipTo'), 
      FormComponents.AddressGroup.evalFormValues(values, 'billTo'), 
      errors
    );
  }
})(PrebuiltSections);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

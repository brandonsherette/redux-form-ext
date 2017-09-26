import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { MultiStepForm, FormComponents } from '../../redux-form-ext/index';
import StepAccountTypes from './step.account-types';
import StepAccount from './step.account';
import StepConfirm from './step.confirm';
import Loading from '../../vendor/loading/loading';
import { save, resetSaveState } from './actions';

const FORM_NAME = 'manual-step-invalid';

class ManualStepInvalid extends Component {
  render() {
    const {
      formValues,
      handleSubmit, 
      handleSave, 
      handleResetSaveState, 
      handleUpdateField, 
      isSaving, 
      isSaveCompleted, 
      saveError, 
      formSyncErrors 
    } = this.props;

    const accountStepError = (formValues.accountType.toLowerCase() === 'admin')
      ? (<div className="alert alert-danger"><i className="fa fa-times-circle"></i>&nbsp;Account needs to be verified.</div>)
      : null;

    const steps = [
      <StepAccountTypes title="Account Type" />,
      <StepAccount title="Account" stepError={accountStepError} />,
      <StepConfirm title="Confirm" />,
    ];

    if (isSaveCompleted) {
      return (
        <section>
          <header>
            <h1>Manual Step Invalid</h1>
          </header>
          <div>
            <h3>Save Completed!</h3>
            <div className="text-center">
              <button type="button" onClick={handleResetSaveState} className="btn btn-primary">Continue</button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section>
        <header>
          <h1>Manual Step Invalid</h1>
        </header>
        <MultiStepForm
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          isSaving={isSaving}
          isSavingComponent={(<Loading title="Saving..." />)}
          saveError={saveError}
          steps={steps}
          errors={formSyncErrors}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formValues: (state.form[FORM_NAME]) ? state.form[FORM_NAME].values : state.manualStepInvalid.initialFormValues,
    initialValues: Object.assign({}, state.manualStepInvalid.initialFormValues),
    isSaving: state.manualStepInvalid.isSaving,
    isSaveCompleted: state.manualStepInvalid.isSaveCompleted,
    saveError: state.manualStepInvalid.error,
    formSyncErrors: (state.form[FORM_NAME]) ? state.form[FORM_NAME].syncErrors : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleResetSaveState: () => { dispatch(resetSaveState()) },
    handleSave: (values) => { dispatch(save(values, FORM_NAME)) },
    handleUpdateField: (field, values) => {
      dispatch(reduxFormChange(FORM_NAME, field, values));
    }
  };
};

const ManualStepInvalidForm = reduxForm({
  form: FORM_NAME,
  validate: (values) => {
    const errors = {};

    if (!values.accountType) {
      errors.accountType = 'Required';
    }

    if (!values.firstname) {
      errors.firstname = 'Required';
    }

    if (!values.lastname) {
      errors.lastname = 'Required';
    }

    return errors;
  }
})(ManualStepInvalid);

export default connect(mapStateToProps, mapDispatchToProps)(ManualStepInvalidForm);
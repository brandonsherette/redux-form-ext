import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change as reduxFormChange, reduxForm } from 'redux-form';
import Loading from '../../vendor/loading/loading';
import { MultiStepForm } from '../../redux-form-ext/index';
import validate from '../validate';
import { save, resetSaveState } from './actions';
import StepAccountType from './step.account-type';
import StepAccount from './step.account';
import StepAdditionalDetails from './step.additional-details';
import StepConfirm from './step.confirm';
import StepLogin from './step.login';

// the name of the multi-step form
const FORM_NAME = 'register-step-form';

class RegisterStepForm extends Component {
  render() {
    const {
      handleSubmit, 
      handleSave, 
      handleResetSaveState, 
      handleUpdateField, 
      isSaving, 
      isSaveCompleted, 
      saveError, 
      formSyncErrors 
    } = this.props;
    const steps = [
      <StepLogin title="Login" />,
      <StepAccount title="Account" />,
      <StepAccountType title="Account Type" handleUpdateField={handleUpdateField} />,
      <StepAdditionalDetails title="Additional Details" />,
      <StepConfirm title="Confirm" />,
    ];

    if (isSaveCompleted) {
      return (
        <section>
          <header>
            <h1>Multi Step Registration</h1>
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
          <h1>Multi Step Registration</h1>
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
    );
  }
}

RegisterStepForm.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  isSaveCompleted: PropTypes.bool.isRequired,
  saveError: PropTypes.string,
  handleResetSaveState: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    initialValues: Object.assign({}, state.user.defaultModel),
    isSaving: state.stepForm.isSaving,
    isSaveCompleted: state.stepForm.isSaveCompleted,
    saveError: state.stepForm.error,
    formSyncErrors: (state.form[FORM_NAME]) ? state.form[FORM_NAME].syncErrors : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleResetSaveState: () => { dispatch(resetSaveState()) },
    handleSave: (user) => { dispatch(save(user, FORM_NAME)) },
    handleUpdateField: (field, values) => {
      dispatch(reduxFormChange(FORM_NAME, field, values));
    }
  };
};

/*const Form = reduxForm({
  form: 'register-step-form',
  validate: validate
})(RegisterStepForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);*/

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterStepForm);

export default reduxForm({
  form: FORM_NAME,
  validate: validate
})(FormContainer);

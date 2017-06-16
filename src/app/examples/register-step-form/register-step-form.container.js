import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Loading from '../../vendor/loading/loading';
import { MultiStepForm } from '../../redux-form-ext/index';
import validate from '../validate';
import { save, resetSaveState } from './actions';
import Step1 from './step1';
import Step2 from './step2';

class RegisterStepForm extends Component {
  render() {
    const {handleSubmit, handleSave, handleResetSaveState, isSaving, isSaveCompleted, saveError} = this.props;
    const steps = [
      <MultiStepForm.Step title="Login"><Step1 /></MultiStepForm.Step>,
      <MultiStepForm.Step title="Account"><Step2 /></MultiStepForm.Step>
    ];

    console.debug('Steps', steps);

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
        <MultiStepForm handleSubmit={handleSubmit} handleSave={handleSave} saveError={saveError} steps={steps} />
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
    saveError: state.stepForm.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleResetSaveState: () => { dispatch(resetSaveState()) },
    handleSave: (user) => { dispatch(save(user)) }
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
  form: 'register-step-form',
  validate: validate
})(FormContainer);

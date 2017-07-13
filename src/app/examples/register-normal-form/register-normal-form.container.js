import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Loading from '../../vendor/loading/loading';
import { FormComponents, Normalize } from '../../redux-form-ext/index';
import validate from '../validate';
import { save, resetSaveState } from './actions';

class RegisterNormalForm extends Component {
  render() {
    const {handleSubmit, handleSave, handleResetSaveState, isSaving, isSaveCompleted, saveError} = this.props;

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
            <h1>Normal Form Registration</h1>
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
          <h1>Normal Form Registration</h1>
        </header>
        <form className="form" onSubmit={handleSubmit((values) => { handleSave(values) }) }>
          <FormComponents.Text label="* Email" placeholder="Email" name="email" isLabelInline={false} />
          <FormComponents.Text normalize={Normalize.name} label="* Firstname" placeholder="Firstname" name="firstname" isLabelInline={false} />
          <FormComponents.Text normalize={Normalize.name} label="* Lastname" placeholder="Lastname" name="lastname" isLabelInline={false} />
          <FormComponents.Text label="* Password" placeholder="Password" name="password" type="password" isLabelInline={false} />
          <FormComponents.Phone label="Phone" placeholder="Phone" name="phone" isLabelInline={false} />
          <FormComponents.TextArea label="Account Notes" placeholder="Account Notes" name="accountNotes" isLabelInline={false} />
          <p className="disclaimer">* Is Required</p>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    );
  }
}

RegisterNormalForm.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  isSaveCompleted: PropTypes.bool.isRequired,
  saveError: PropTypes.string,
  handleResetSaveState: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    initialValues: Object.assign({}, state.user.defaultModel),
    isSaving: state.normalForm.isSaving,
    isSaveCompleted: state.normalForm.isSaveCompleted,
    saveError: state.normalForm.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleResetSaveState: () => { dispatch(resetSaveState()) },
    handleSave: (user) => { dispatch(save(user)) }
  };
};

const Form = reduxForm({
  form: 'register-normal-form',
  validate: validate
})(RegisterNormalForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

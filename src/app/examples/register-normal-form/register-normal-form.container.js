import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change as reduxFormChange, reduxForm } from 'redux-form';
import Loading from '../../vendor/loading/loading';
import { FormComponents, Normalize } from '../../redux-form-ext/index';
import asyncValidate from '../async-validate';
import validate from '../validate';
import { save, resetSaveState } from './actions';

class RegisterNormalForm extends Component {
  render() {
    const {handleSubmit, handleSave, handleResetSaveState, isSaving, isSaveCompleted, reduxFormChange, saveError} = this.props;
    const actTypeOptions = [
      {
        name: 'Select Account Type',
        value: ''
      },
      {
        name: 'General',
        value: 'general'
      },
      {
        name: 'Admin',
        value: 'admin'
      },
      {
        name: 'Power User',
        value: 'power'
      }
    ];

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
          <div className="break-2x"></div>
          <FormComponents.SelectList 
            name="accountType" 
            options={actTypeOptions} 
            label="Account Type" 
            labelHint={(
              <i 
                role="button" 
                className="fa fa-question-circle" 
                onClick={() => { alert('Account type determines the permissions the account has.')} }>
              </i>
            )} 
          />
          <FormComponents.SelectListAdv
            label="Account Type"
            name="accountType2"
            isLabelInline={true}
            options={[
              {
                label: 'General',
                value: 'general'
              },
              {
                label: 'Admin',
                value: 'admin'
              },
              {
                label: 'Power User',
                value: 'power'
              }
            ]}
            reduxFormChange={reduxFormChange}
          />
          <FormComponents.TextArea label="Account Notes" placeholder="Account Notes" name="accountNotes" isLabelInline={false} />
          <FormComponents.ToggleGroup
            fieldsToResetOnChange={[
              {
                name: 'accountType',
                value: ''
              }
            ]}
            groupName="subscribe" 
            label="Subscribe"
            labelHint={(
               <i 
                role="button" 
                className="fa fa-question-circle" 
                onClick={() => { alert('Subscribing will allow you to get notified when new changes occur.')} }>
              </i>
            )}
            options={[
              {
                name: 'Yes',
                value: 'yes'
              },
              {
                name: 'Maybe',
                value: 'maybe'
              },
              {
                name: 'No',
                value: 'no'
              }
            ]}
          />
          <FormComponents.Hidden name="validation" />
          <FormComponents.Checkbox label="Subscribe to newsletter." name="subscribeToNewsletter" />
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
    initialValues: Object.assign({}, state.user.defaultModel, {
      subscribeToNewsletter: false,
    }),
    isSaving: state.normalForm.isSaving,
    isSaveCompleted: state.normalForm.isSaveCompleted,
    saveError: state.normalForm.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleResetSaveState: () => { dispatch(resetSaveState()) },
    handleSave: (user) => { dispatch(save(user)) },
    reduxFormChange: (field, values) => {
      dispatch(reduxFormChange('register-normal-form', field, values));
    }
  };
};

const Form = reduxForm({
  form: 'register-normal-form',
  asyncValidate,
  asyncBlurFields: ['accountType'],
  validate: validate
})(RegisterNormalForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

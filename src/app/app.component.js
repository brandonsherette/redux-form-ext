import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ManualStepInvalid } from './examples/manual-step-invalid/index';
import RegisterNormalForm from './examples/register-normal-form/register-normal-form.container';
import RegisterStepForm from './examples/register-step-form/register-step-form.container';
import PrebuiltSections from './examples/prebuilt-sections/prebuilt-sections.container';

class AppComponent extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="app-component">
        <div className="app-header">
          <h1>Redux Form Ext</h1>
          <h5>Extention for redux form.Pre-built form components.</h5>
        </div>
        <div className="container">
          <div className="w-50 mx-auto">
            <ManualStepInvalid />
            <div className="break-4x"></div>
            <RegisterStepForm />
            <div className="break-4x"></div>
            <RegisterNormalForm />
            <div className="break-4x"></div>
            <PrebuiltSections />
          </div>
        </div>
      </div>
    );
  }
}

export default AppComponent;

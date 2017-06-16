import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import RegisterNormalForm from './examples/register-normal-form/register-normal-form.container';
import RegisterStepForm from './examples/register-step-form/register-step-form.container';

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
          <div className="w-50">
            <RegisterStepForm />
            <div className="break-4x"></div>
            <RegisterNormalForm />
          </div>
        </div>
      </div>
    );
  }
}

export default AppComponent;

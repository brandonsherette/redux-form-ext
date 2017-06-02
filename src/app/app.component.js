import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FormComponents } from './redux-form-ext/index';
import validate from './validate';

class AppComponent extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="app-component">
        <div className="container">
        <h1>Redux Form Ext</h1>
        <p>Extention for redux form. Pre-built form components.</p>
        <form className="form-sm" onSubmit={handleSubmit((values) => { console.debug('Form Submitted Values', values);})}>
          <FormComponents.Text label="* Username" placeholder="Username" name="username" isLabelInline={false} />
          <FormComponents.Text label="* Email" placeholder="Email" name="email" isLabelInline={false} />
          <FormComponents.Text label="* Password" placeholder="Password" name="password" type="password" isLabelInline={false} />
          <FormComponents.Phone label="Phone" placeholder="Phone" name="phone" isLabelInline={false} />
          <p className="disclaimer">* Is Required</p>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
      </div>
    );
  }
}

const AppComponentForm = reduxForm({
  form: 'demo',
  validate: validate
})(AppComponent);

const mapStateToProps = (state) => {
  return {
    initialValues: {
      email: '',
      password: '',
      phone: '',
      username: ''
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponentForm);

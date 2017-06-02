import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FormComponents, Validate } from './redux-form-ext/index';

class AppComponent extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="app-component">
        <div className="container-fluid">
        <h1>Redux Form Ext</h1>
        <p>Extention for redux form. Pre-built form components.</p>
        <form className="form-sm" onSubmit={handleSubmit((values) => { console.debug('Form Submitted Values', values);})}>
          <FormComponents.Text label="Username" placeholder="Username" name="username" isLabelInline={false} />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
      </div>
    );
  }
}

const AppComponentForm = reduxForm({
  form: 'demo'
})(AppComponent);

const mapStateToProps = (state) => {
  return {
    initialValues: {
      username: ''
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponentForm);

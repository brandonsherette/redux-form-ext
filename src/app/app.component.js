import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ReduxFormExt } from './redux-form-ext/index';

console.debug('Redux Form Ext', ReduxFormExt);

class AppComponent extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="app-component">
        <h1>Redux Form Ext</h1>
        <p>Extention for redux form. Pre-built form components.</p>
        <form onSubmit={handleSubmit(() => { console.debug('Form Submitted Values', values);})}>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
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

# Redux Form Extension
Extension for redux form. Prebuilt styled form components, validation, input normalization, multi step form (form wizard), and more.

# Dependencies
- classnames
- prop-types
- rc-slider
- react
- react-async-script
- react-dom
- react-google-recaptcha
- react-redux
- react-select
- redux
- redux-form

# How to Install
```js 
npm install --save https://github.com/brandonsherette/redux-form-ext.git
```

```js 
import { FormComponents, Normalize, Validator } from 'redux-form-ext';
```

# Normalize Methods
- name(str : String) : String
  - Difference between title and name is title, lowercase everything but first letter in word.
  - Example
    ```javascript
    var name = Normalize.name('mC doNalds'); // result 'MC DoNalds'
    ```
- middleInitial(str : String) : String
  - Example
    ```javascript
    var middleInitial = Normalize.middleInitital('iGaloo'') // result 'I'
    ```
- phone(value : String) : String
  - Example
    ```javascript
    var phone = Normalize.phone(1112223333); // result: "(111) 222 - 3333"
    ```
- title(str : String) : String
  - Difference between title and name is title, lowercase everything but first letter in word.
  - Example
    ```javascript
    var title = Normalize.title('mC dOnalds'); // result 'Mc Donalds';
    ```

# Validator Methods
- isValidEmail(email : String) : Boolean
- isValidPhone(phone : String) : Boolean
- isValidMiddleInitial(str : String) : Boolean
- isValidNameString(str : String) : Boolean
  - First character must be a letter.
  - After the first character, spaces are allowed.
  - Must be at least 1 character long.
- isValidTitleString(str : String) : Boolean
  - First character must be a letter or number.
  - After the first letter, letters, numbers, spaces, and the following special characters are allowed:
  - !?.,()-
- isValidZip(str : String) : Boolean
  - Value must be inbetween 4 - 10 numbers long (only numbers allowed).

# FormComponents
Form Components are react components that work along with redux form, and streamline several features such as 
success and error styling on form elements, and various other built in features.

## Import FormComponents
```javascript
import { FormComponents } from 'redux-form-ext';
```

## Available FormComponents

### Address Group
- Props
  - fieldNamePrefix: String (optional)
    - The prefix to prepend to the name property of each field in the address group. For example, fieldNamePrefix="shipTo" would change the address name to "shipToAddress", without the prefix the name of the field would be "Address".
- Example
```js
<FormComponents.AddressGroup fieldNamePrefix="shipTo" />
```
- Validation
  - Address Group has built in validation for its specific fields.
- Validation Example
```js
reduxForm({
  form: 'my-component-form-name',
  validate: (values) => {
    // FormComponents.evalFormValues(formValues, fieldNamePrefix);
    // in this example if you have have 2 Address Groups, one for shipping, one for billing
    return Object.assign({}, 
      FormComponents.evalFormValues(values, 'shipTo'), 
      FormComponents.evalFormValues(values, 'billTo'),
      // any other form validation you need
    );
  }
})(MyComponent);
```

### Captcha
- Props
  - name: String (required)
  - sitekey: String
    - The sitekey to your google re-captcha.

### Checkbox
- Props
  - autoFocus: Boolean (optional)
  - label: String|Node (required)
  - name: String (required)
  
### CheckboxGroup
- Needs intialValues the have an array with the name of the checkbox group to be able to do array type actions.
- updateField passes in fieldName and values
- Props
  - className: String (optional)
  - limit: Int (optional)
  - name: String (required)
  - updateField: Function (required)
    - Helps notify redux-form about the full collection of changes made as a group.
    - Example
      ```javascript
      updateField={(fieldName, values) => { reduxFormChange('nameOfForm', fieldName, values) }}
      ```
    - reduxFormChange will then dispatch the redux change event
  - options: (required)
    - ArrayOfObjects
      - name (required)
        - The Display Name.
      - subtitle (optional)
      - value (required)
      - className (optional)
- Example
```javascript
import React, { Component } from 'react';
import { change, reduxForm } from 'redux-form';
import { FormComponents } from 'redux-form-ext';

class MyForm extends Component {
  render() {
    var options = [
      {
        name: 'Option 1',
        subtitle: 'Subtitle (Optional)',
        value: 'option1',
        className: 'custom-css-classes'
      }
    ];

    return (
      <form onSubmit={handleSubmit}>
        <FormComponents.CheckboxGroup className="my-custom-class" limit="4" name="myCheckboxName" updateField={(inputName, nextGroupValues) => {reduxChange(inputName, nextGroupValues)}} options={options} />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.myReducer.myCurrentValues
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxChange: (inputName, values) => { dispatch(change('myFormName', inputName, values))}
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(MyForm);

export default reduxForm({
  'form': 'myFormName'
});
```

### Hidden
- Hidden text field, useful for validating state outside of a form, but sync up with the form's validation.
- Props
  - name: String (required)
  - showNotifications: Boolean (optional defaults to true)
    - Whether or not to show error/warning notifications if the field is invalid.

### Phone
- Phone text field with auto US phone normalization.
- Props
  - autoFocus: Boolean (optional)
  - label: String|Node (optional)
  - labelDisclaimer: String (optional)
  - name: String (required)
  - placeholder: String (optional)
  - isLabelInline: Boolean (optional defaults to true)

### RadioGroup
- Props
  - className: String (optional)
  - groupName: String (required)
  - options: ArrayOfObjects (required)
    - name (required)
      - The Display Name.
    - value (required)
  - isRequired: Boolean (optional)
  - fieldsToResetOnChange: ArrayOfObjects (optional)
    - name (required)
      - The Display Name.
    - value (required)

#### SelectList
- Props
  - autoFocus: Boolean (optional defaults to false)
  - label: String|Node (optional)
  - labelHint: Node (optional)
    - Used to add font awesome icons and click actions to open up tooltips or modals with additional information.
  - name: String (required)
  - options: ArrayOfObjects (required)
    - name (required)
      - The Display Name.
    - value (required)
- Example
```javascript
<FormComponents.SelectList 
  name="accountType" 
  options={[
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
  ]}
  label="Account Type" 
  labelHint={(
    <i role="button" className="fa fa-question-circle" onClick={() => { alert('Account type determines the permissions the account has.')} }></i>
  )}
/>
```

#### SelectListAdv
- Props
  - autoFocus: Boolean (optional)
  - label: String|Node (optional)
  - labelDisclaimer: String (optional)
  - isLabelInline: Boolean (optional defaults to true)
  - name: String (required)
  - reduxFormChange: Function (required)
    - A way to dispatch redux-form change action.
  - options: ArrayOfObjects (required)
    - label (required)
      - The Display Name.
    - value (required)
- Example
```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change as reduxFormChange, reduxForm } from 'redux-form';
import { FormComponents } from 'redux-form-ext';

class MyForm extends Component {
  render() {
    const { handleSubmit, handleSave } = this.props;
        
    return (
      <form onSubmit={handleSubmit((values) => { handleSave(values) })}>
        <FormComponents.SelectListAdv
          label="Account Type"
          name="accountType"
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
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: {
      accountType: ''
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxFormChange: (field, values) => {
      dispatch(reduxFormChange('myForm', field, values));
    }
  };
};

const MyFormContainer = connect(mapStateToProps, mapDispatchToProps)(MyForm);

export default reduxForm({
  form: 'myForm',
  validate: (values) => {
    const errors = {};

    if (!values.accountType) {
      errors.accountType = 'Required';
    }

    return errors;
  }
})(MyFormContainer);
```

#### SliderGroup
- Props
  - capValue (required)
    - The max value the slider can allow (this is different than what it's shown, for example if 12 is shown as the max, and capValue is 6, the slider will never go pass the 6 value)
  - groupName (required)
    - name of the form element.
  - max (required)
    - max value shown to the user.
  - options (required)
    - ArrayOfObjects
      - label (required)
      - fieldName (required)
  - triggerFieldChange (required)
    - Event to trigger when there is a value changed.

#### TextArea
- Props
  - autoFocus: Boolean (optional defaults to false)
  - label: String|Node (optional)
  - labelDisclaimer: String (optional)
  - maxLength: Int (optional)
  - name: String (required)
  - normalize: Function (optional)
    - Function to normalize the value (use ReduxFormExt Normalize class).
  - placeholder: String (optional)
  - isLabelInline: Boolean (optional defaults to true)

#### Text
- Props
  - autoComplete: String (optional)
  - autoFocus: Boolean (optional defaults to false)
  - label: String|Node (optional)
  - labelDisclaimer: String (optional)
  - maxLength: Int (optional)
  - name: String (required)
  - normalize: Function (optional)
    - Function to normalize the value (use ReduxFormExt Normalize class).
  - placeholder:String (optional)
  - isLabelInline: Boolean (optional defaults to true)
  - type: String (optional defaults to 'text', other option is 'password')

#### ToggleGroup
- Props
  - className: String (optional)
  - groupName: String (required)
  - label: String|Node (optional)
  - labelHint: Node (optional)
  - options: ArrayOfObjects (required)
    - name (required)
      - The Display Name.
    - value
  - fieldsToResetOnChange: Array
- Example
```javascript
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
```

#### USStateList
- Props
  - autoFocus: Boolean (optional defaults to false)
  - reduxFormChange: Function (required)
    - Method to dispatch a change event to redux-form.

## Examples
See "src/app/app.component.js" for various form examples.

## Basic Form Example
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FormComponents, Normalize } from 'redux-form-ext';
import asyncValidate from './async-validate';
import validate from './validate';
import { save, resetSaveState } from './actions';

require('redux-form-ext/dist/redux-form-ext.css');

class RegisterNormalForm extends Component {
  render() {
    const {handleSubmit, handleSave, handleResetSaveState, isSaving, isSaveCompleted, saveError} = this.props;

    if (isSaving) {
      return (
        <section>
          <h2>Saving...</h2>
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
          <FormComponents.Text 
            label="* Email" 
            placeholder="Email" 
            name="email" 
            isLabelInline={false} 
          />
          <FormComponents.Text 
            normalize={Normalize.name} 
            label="* Firstname" 
            placeholder="Firstname" name="firstname" 
            isLabelInline={false} 
          />
          <FormComponents.Text 
            normalize={Normalize.name} 
            label="* Lastname" 
            placeholder="Lastname" 
            name="lastname" 
            isLabelInline={false} 
          />
          <FormComponents.Text 
            label="* Password" 
            placeholder="Password" 
            name="password" 
            type="password" 
            isLabelInline={false} 
          />
          <FormComponents.Phone 
            label="Phone" 
            placeholder="Phone" 
            name="phone" 
            isLabelInline={false} 
          />
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
          <FormComponents.Hidden name="validate" showNotifications={true} />
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
  asyncValidate,
  asyncBlurFields: ['accountType'],
  validate,
})(RegisterNormalForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
```

### async-validate.js
```javascript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values) => {
  return sleep(500).then(() => {
    if (values.accountType.toLowerCase() === 'admin') {
      throw { validation: 'Account needs to be verified' }
    }
  });
};

export default asyncValidate;
```

### validate.js
```javascript
const validate = (values) => {
  const errors = {};

  if (!values.email || !Validator.isValidEmail(values.email)) {
    errors.email = 'Invalid Format';
  }
  if (!values.firstname || !Validator.isValidNameString(values.firstname)) {
    errors.firstname = 'Invalid Format';
  }
  if (!values.lastname || !Validator.isValidNameString(values.lastname)) {
    errors.lastname = 'Invalid Format';
  }
  if (values.phone && !Validator.isValidPhone(values.phone)) {
    errors.phone = 'Invalid Phone';
  }
  if (!values.password || !Validator.isValidPassword(values.password)) {
    errors.password = 'Invalid Password';
  }

  return errors;
};

export default validate;
```

## Multi Step Form Example
### register-step-form.js
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { MultiStepForm } from 'redux-form-ext';
import validate from './validate';
import { save, resetSaveState } from './actions';
import StepLogin from './step.login';
import StepAccount from './step.account';

require('redux-form-ext/dist/redux-form-ext.css');

const FORM_NAME = 'register-step-form';

class RegisterStepForm extends Component {
  render() {
    const { 
      handleSubmit, 
      handleSave, 
      handleResetSaveState, 
      isSaving, 
      isSaveCompleted, 
      saveError, 
      formSyncErrors 
    } = this.props;
    
    // configure steps
    const steps = [
      <StepLogin title="Login" />,
      <StepAccount title="Account" />,
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
          isSavingComponent={(
            <section>
              <h2>Saving...</h2>
            </section>
          )}
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
    formSyncErrors: (state.form[FORM_NAME]) ? state.form[FORM_NAME].syncErrors : null,
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

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterStepForm);

export default reduxForm({
  form: FORM_NAME,
  validate: validate
})(FormContainer);
```
### validate.js
```javascript
const validate = (values) => {
  const errors = {};

  if (!values.email || !Validator.isValidEmail(values.email)) {
    errors.email = 'Invalid Format';
  }
  if (!values.firstname || !Validator.isValidNameString(values.firstname)) {
    errors.firstname = 'Invalid Format';
  }
  if (!values.lastname || !Validator.isValidNameString(values.lastname)) {
    errors.lastname = 'Invalid Format';
  }
  if (values.phone && !Validator.isValidPhone(values.phone)) {
    errors.phone = 'Invalid Phone';
  }
  if (!values.password || !Validator.isValidPassword(values.password)) {
    errors.password = 'Invalid Password';
  }

  return errors;
};

export default validate;
```

### step.login.js
```javascript
import React from 'react';
import { FormComponents, MultiStepForm, Normalize } from 'redux-form-ext';

const StepLogin = (props) => (
  <MultiStepForm.Step {...props}>
    <FormComponents.Text autoFocus={true} label="* Email" placeholder="Email" name="email" isLabelInline={false} />
    <FormComponents.Text label="* Password" placeholder="Password" name="password" type="password" isLabelInline={false} />
  </MultiStepForm.Step>
);

// helps determine if this specific step is invalid
StepLogin.formInputs = ['email', 'password'];

export default StepLogin;
```

### step.account.js
```javascript
import React from 'react';
import { FormComponents, MultiStepForm, Normalize } from '../../redux-form-ext/index';

const StepAccount = (props) => (
  <MultiStepForm.Step {...props}>
    <FormComponents.Text autoFocus={true} normalize={Normalize.name} label="* Firstname" placeholder="Firstname" name="firstname" isLabelInline={false} />
    <FormComponents.Text normalize={Normalize.name} label="* Lastname" placeholder="Lastname" name="lastname" isLabelInline={false} />
    <FormComponents.Phone label="Phone" placeholder="Phone" name="phone" isLabelInline={false} />
  </MultiStepForm.Step>
);

// helps determine if this specific step is invalid
StepAccount.formInputs = ['firstname', 'lastname', 'phone'];

export default StepAccount;
```

## MultiStepForm Props
- handleSubmit: Function (required)
  - ReduxForm's handleSubmit method.
- handleSave(formValues: Object): Function (required)
  - the function to call when the form is valid and ready for the form values to be saved.
- isSaving: Boolean (required)
  - Whether or not the form data is currently being saved or not.
- isSavingComponent: ReactNode (optional)
  - The component to show when the form is being saved (when isSaved property is set to true).
- onStepDidChange: function (optional)
  - The event that a step has changed.
  - onStepDidChange(prevStepTitle, nextStepTitle)
- saveError: String (optional)
  - The error from the save task.
- showBackButton: Boolean (optional)
  - Whether or not to show the back button (DEFAULT: true).
- stepError: Node|String (optional)
  - Manual override if a step should be invalid, useful for notifiying a user of additional steps to make that step valid.
- steps: ArrayOfMultiStepForm.Step (required)
- errors: Object (optional)
  - The sync errors from the form.

## CSS
To include styling for the form elements in es6, you can require the stylesheet as shown below:

```javascript
require('redux-form-ext/dist/redux-form-ext.css');
```

Or you can copy over the files from **node_modules/redux-form-ext/dist/redux-form-ext.css** and include them into your webpage.
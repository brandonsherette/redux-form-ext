# Redux Form Extension
## Currently In Development
## Description
Extension for redux form.
## Versions
**v0.1.1-rc1**
- Added TextArea Component.
- Updated Readme with more details on the different form components and their props.

**v0.1.0-rc3**
- Fixed issues with normalize middle initial and title.

**v0.1.0-rc2**
- Added npmingore file.

**v0.1.0-rc1**
- Added Multi Step Form Functionality and Examples.
- Created example folder to see how to interact with the extension.

**v0.0.1-alpha1**
- Base code implemented.

## How to Install
```js 
npm install --save https://github.com/brandonsherette/redux-form-ext.git
```

```js 
import { FormComponents, Normalize, Validator } from 'redux-form-ext';
```

## Normalize Methods
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

## Validator Methods
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

## FormComponents
Form Components are react components that work along with redux form, and streamline several features such as 
success and error styling on form elements, and various other built in features.

### Import FormComponents
```javascript
import { FormComponents } from 'redux-form-ext';
```

### Available Components
- CheckboxGroup
  - Props
    - className (optional)
    - limit (optional)
    - name (required)
    - updateField (required)
      - Helps notify redux-form about the full collection of changes made as a group.
    - options (required)
      - ArrayOfObjects
        - name (required)
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
- Phone
  - Phone text field with auto US phone normalization.
  - Props
    - label (required)
    - labelDisclaimer (optional)
    - name (required)
    - placeholder (optional)
    - isLabelInline (optional defaults to true)
- RadioGroup
  - Props
    - className (optional)
    - groupName (required)
    - options (required)
      - ArrayOfObjects
        - value (required)
        - name (required)
    - isRequired (optional)
    - resetFieldsOnChange (optional)
      - ArrayOfObjects
        - name (required)
        - value (required)
- SelectList
  - Props
    - label (optional)
    - name (required)
    - options (required)
      - ArrayOfObjects
        - value (required)
        - name (required)
- SelectListAdv
  - Props
    - label (optional)
    - labelDisclaimer (optional)
    - isLabelInline (optional defaults to true)
    - name (required)
    - reduxFormChange (required)
      - A way to dispatch redux-form change action.
    - options (required)
      - ArrayOfObjects
        - value (required)
        - name (required)
- SliderGroup
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
- TextArea
  - Props
    - label (required)
    - labelDisclaimer (optional)
    - maxLength (optional)
    - name (required)
    - normalize (optional)
      - Function to normalize the value (use ReduxFormExt Normalize class).
    - placeholder (optional)
    - isLabelInline (optional defaults to true)
- Text
  - Props
    - label (required)
    - labelDisclaimer (optional)
    - maxLength (optional)
    - name (required)
    - normalize (optional)
      - Function to normalize the value (use ReduxFormExt Normalize class).
    - placeholder (optional)
    - isLabelInline (optional defaults to true)
    - type (optional defaults to 'text', other option is 'password')
- USStateList
  - Props
    - reduxFormChange (required)
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
          <FormComponents.Text label="* Email" placeholder="Email" name="email" isLabelInline={false} />
          <FormComponents.Text normalize={Normalize.name} label="* Firstname" placeholder="Firstname" name="firstname" isLabelInline={false} />
          <FormComponents.Text normalize={Normalize.name} label="* Lastname" placeholder="Lastname" name="lastname" isLabelInline={false} />
          <FormComponents.Text label="* Password" placeholder="Password" name="password" type="password" isLabelInline={false} />
          <FormComponents.Phone label="Phone" placeholder="Phone" name="phone" isLabelInline={false} />
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
import Step1 from './step1';
import Step2 from './step2';

require('redux-form-ext/dist/redux-form-ext.css');

class RegisterStepForm extends Component {
  render() {
    const {handleSubmit, handleSave, handleResetSaveState, isSaving, isSaveCompleted, saveError} = this.props;
    const steps = [
      <MultiStepForm.Step title="Login"><Step1 /></MultiStepForm.Step>,
      <MultiStepForm.Step title="Account"><Step2 /></MultiStepForm.Step>
    ];

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

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterStepForm);

export default reduxForm({
  form: 'register-step-form',
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

### step1.js
```javascript
import React from 'react';
import { FormComponents, Normalize } from 'redux-form-ext';

const Step1 = () => (
  <div>
    <FormComponents.Text label="* Email" placeholder="Email" name="email" isLabelInline={false} />
    <FormComponents.Text label="* Password" placeholder="Password" name="password" type="password" isLabelInline={false} />
  </div>
);

export default Step1;
```

### step2.js
```javascript
import React from 'react';
import { FormComponents, Normalize } from '../../redux-form-ext/index';

const Step2 = () => (
  <div>
    <FormComponents.Text normalize={Normalize.name} label="* Firstname" placeholder="Firstname" name="firstname" isLabelInline={false} />
    <FormComponents.Text normalize={Normalize.name} label="* Lastname" placeholder="Lastname" name="lastname" isLabelInline={false} />
    <FormComponents.Phone label="Phone" placeholder="Phone" name="phone" isLabelInline={false} />
  </div>
);

export default Step2;
```

## CSS
To include styling for the form elements in es6, you can require the stylesheet as shown below:

```javascript
require('redux-form-ext/dist/redux-form-ext.css');
```

Or you can copy over the files from **node_modules/redux-form-ext/dist/redux-form-ext.css** and include them into your webpage.
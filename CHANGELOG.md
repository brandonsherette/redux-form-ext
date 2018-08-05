# v0.11.6
## Maintenance
- Updated dependencies.

# v0.11.5
## Updates
- Updated placeholder for First Name and Last Name.

# v0.11.4
## Updates
- Added autoComplete values to AddressGroup.

# v0.11.3
## Updates
- Added autoComplete prop to FormComponents.Text.

# v0.11.2
## Updates
- Made zip number field.

## Bugs/Fixes
- Potential fix for input autoComplete.

# v0.11.1
## Features
- Added showBackButton prop to MultiStepFormComponent.
## Updates
- Updated MultiStep Footer Styles
## Bugs/Fixes
- Fixed Validation for Zip Code.

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

# v0.11.0
## Features
- Added AddressGroup to FormComponents.

# v0.10.0
## Features
- Added optional onStepDidChange prop to MultiStepForm.

# v0.9.0
## Features
- Added Captcha Field (requires react-google-recaptcha v0.9.7).

## Bugs/Fixes
- Fixed issue in USStateList where text wasn't showing in options.

# v0.8.0
## Features
- Added Checkbox FormComponent.

# v0.7.2
## Updates
- Updated FormComponents "label" property to no longer just be a string value, but can be a React Node for better customization.

# v0.7.1
## Bugs/Fixes
- Updated MultiStepForm shouldComponentUpdate to now check the specified step component's stepError and formValues property for any changes.

# v0.7.0
## Features
- Added stepError property to MultiStepForm to allow for manual step invalid functionality for when a step needs to have addtional steps taken outside of form inputs for that particular step to be valid.
## Bugs/Fixes
- Updated MultiStepForm shouldComponentUpdate to help reduce the amount of times the component re-renders.

# v0.6.0
- Added New Form Component "Hidden".

# v0.5.0
- Added isSaving property to Multi Step Form.
- Added isSavingComponent property to Multi Step Form.
- Fixed issue with Multi Step Form state being reset when async save fails, however the isSaving and isSavingComponent property must be utilized for it work properly.

# v0.4.0
- Fixed issue with Multi Step Form breadcrumb state not updating correctly.

# v0.3.0
- Refactored Form Components.
- Added autoFocus prop to many form components.
- Updated Multi Step Form Example.
- Updated Multi Step Form Component to now properly show errors in breadcrumb when error occurs in a different step.
- ReFactored Multi Step Form to better deal with each steps state.

# v0.2.1
- Updated SelectListAdv reduxFormChange to now properly send correct data to the redux change method.
- Updated styling for SelectListAdv.

# v0.2.0-rc1
- Updated Radio Group options to use the name "name" instead of "title" for the options array.
- Changed resetFieldsOnChange to fieldsToResetOnChange in radio group.
- Added Toggle Group Component.

# v0.1.2-rc1
- Updated styling for select list.
- Select list now properly shows error state.
- Added labelHint prop to Select List Component.

# v0.1.1-rc1
- Added TextArea Component.
- Updated Readme with more details on the different form components and their props.

# v0.1.0-rc3
- Fixed issues with normalize middle initial and title.

# v0.1.0-rc2
- Added npmingore file.

# v0.1.0-rc1
- Added Multi Step Form Functionality and Examples.
- Created example folder to see how to interact with the extension.

# v0.0.1-alpha1
- Base code implemented.
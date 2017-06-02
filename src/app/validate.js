import { Validator } from './redux-form-ext';

const validate = (values, previousValues) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.email || !Validator.isValidEmail(values.email)) {
    errors.email = 'Invalid Email';
  }

  if (!values.password || !Validator.isValidPassword(values.password)) {
    errors.password = 'Invalid password';
  }

  if (values.phone && !Validator.isValidPhone(values.phone)) {
    errors.phone = 'Required';
  }

  return errors;
};

export default validate;

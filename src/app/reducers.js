import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as manualStepInvalid } from './examples/manual-step-invalid';
import stepForm from './examples/register-step-form/reducer';
import normalForm from './examples/register-normal-form/reducer';
import user from './examples/user.reducer';

export default combineReducers({
  form,
  stepForm,
  manualStepInvalid,
  normalForm,
  user
});

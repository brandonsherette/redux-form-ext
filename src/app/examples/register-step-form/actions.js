import UserActionTypes from '../user.actions';
import { reset as reduxFormReset } from 'redux-form';

const ActionTypes = {
  MULTI_STEP_FORM_SAVE_START: 'MULTI_STEP_FORM_SAVE_START',
  MULTI_STEP_FORM_SAVE_FAILURE: 'MULTI_STEP_FORM_SAVE_FAILURE',
  MULTI_STEP_FORM_SAVE_SUCCESS: 'MULTI_STEP_FORM_SAVE_SUCCESS',
  MULTI_STEP_FORM_RESET_SAVE_STATE: 'MULTI_STEP_FORM_RESET_SAVE_STATE'
};

export default ActionTypes;

export const resetSaveState = () => {
  return { type: ActionTypes.MULTI_STEP_FORM_RESET_SAVE_STATE };
};

export const save = (user, formName) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.MULTI_STEP_FORM_SAVE_START });

    // perform server action 
    // simulating server response wait time 
    window.setTimeout(() => {
      dispatch({ type: ActionTypes.MULTI_STEP_FORM_SAVE_SUCCESS });
      dispatch(reduxFormReset(formName));
      dispatch({
        type: UserActionTypes.USER_ADD,
        payload: user
      });
    }, 1000);
  };
};
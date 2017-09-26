import UserActionTypes from '../user.actions';
import { reset as reduxFormReset } from 'redux-form';

const ACTION_PREFIX = 'MANUAL_STEP_INVALID-'

const ActionTypes = {
  SAVE_START: ACTION_PREFIX + 'SAVE_START',
  SAVE_FAIL: ACTION_PREFIX + 'SAVE_FAIL',
  SAVE_SUCCESS: ACTION_PREFIX + 'SAVE_SUCCESS',
  RESET_SAVE_STATE: ACTION_PREFIX + 'RESET_SAVE_STATE',
}

export default ActionTypes;

export const resetSaveState = () => {
  return { type: ActionTypes.RESET_SAVE_STATE };
};

export const save = (values, formName) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SAVE_START });

    // perform server action 
    // simulating server response wait time 
    window.setTimeout(() => {
      dispatch({ type: ActionTypes.SAVE_SUCCESS });
      dispatch(reduxFormReset(formName));
    }, 500);
  };
};
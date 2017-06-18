import UserActionTypes from '../user.actions';

const ActionTypes = {
  NORMAL_FORM_SAVE_START: 'NORMAL_FORM_SAVE_START',
  NORMAL_FORM_SAVE_FAILURE: 'NORMAL_FORM_SAVE_FAILURE',
  NORMAL_FORM_SAVE_SUCCESS: 'NORMAL_FORM_SAVE_SUCCESS',
  NORMAL_FORM_RESET_SAVE_STATE: 'NORMAL_FORM_RESET_SAVE_STATE'
};

export default ActionTypes;

export const resetSaveState = () => {
  return { type: ActionTypes.NORMAL_FORM_RESET_SAVE_STATE };
};

export const save = (user) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.NORMAL_FORM_SAVE_START });

    // perform server action 
    // simulating server response wait time 
    window.setTimeout(() => {
      dispatch({ type: ActionTypes.NORMAL_FORM_SAVE_SUCCESS });
      dispatch({
        type: UserActionTypes.USER_ADD,
        payload: user
      });
    }, 1000);
  };
};
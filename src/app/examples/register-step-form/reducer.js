import ActionTypes from './actions';

const initialState = {
  error: null,
  isSaving: false,
  isSaveCompleted: false
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.MULTI_STEP_FORM_SAVE_START: {
      return Object.assign({}, state, {
        error: null,
        isSaving: true,
        isSaveCompleted: false
      });
    }

    case ActionTypes.MULTI_STEP_FORM_SAVE_FAILURE: {
      return Object.assign({}, state, {
        error: action.payload,
        isSaving: false,
      });
    }

    case ActionTypes.MULTI_STEP_FORM_SAVE_SUCCESS: {
      return Object.assign({}, state, {
        isSaving: false,
        isSaveCompleted: true
      });
    }

    case ActionTypes.MULTI_STEP_FORM_RESET_SAVE_STATE: {
      return Object.assign({}, initialState);
    }

    default: { return state; }
  }
}
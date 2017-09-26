import ActionTypes from './actions';

const initialState = {
  error: null,
  initialFormValues: {
    accountType: '',
    firstname: '',
    lastname: '',
  },
  isSaving: false,
  isSaveCompleted: false
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.SAVE_START: {
      return Object.assign({}, state, {
        error: null,
        isSaving: true,
        isSaveCompleted: false
      });
    }

    case ActionTypes.SAVE_FAIL: {
      return Object.assign({}, state, {
        error: action.payload,
        isSaving: false,
      });
    }

    case ActionTypes.SAVE_SUCCESS: {
      return Object.assign({}, state, {
        isSaving: false,
        isSaveCompleted: true
      });
    }

    case ActionTypes.RESET_SAVE_STATE: {
      return Object.assign({}, initialState);
    }

    default: { return state; }
  }
}
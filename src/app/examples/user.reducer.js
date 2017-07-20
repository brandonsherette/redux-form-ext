import ActionTypes from './user.actions';

const defaultModel = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  phone: '',
  accountNotes: '',
  subscribe: 'no',
};
const initialState = {
  defaultModel,
  users: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USER_ADD: {
      return Object.assign({}, state, {
        users: [...state.users, action.payload]
      });
    }

    default: { return state; }
  }
}
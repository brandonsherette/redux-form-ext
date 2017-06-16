const ActionTypes = {
  USER_ADD: 'USER_ADD'
};

export default ActionTypes;

export const add = (user) => {
  return {
    type: ActionTypes.USER_ADD,
    payload: user
  };
};
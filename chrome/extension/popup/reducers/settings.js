import * as ActionTypes from '../constants/ActionTypes';

const actionsMap = {
  [ActionTypes.UPDATE_SETTINGS](state, action) {
    return { ...state, ...action.payload };
  },
};

export default function settings(state = {}, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

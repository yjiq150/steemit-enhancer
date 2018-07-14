import * as types from '../constants/ActionTypes';

export function updateSettings(settingObj) {
  return {
    type: types.UPDATE_SETTINGS,
    payload: settingObj
  };
}

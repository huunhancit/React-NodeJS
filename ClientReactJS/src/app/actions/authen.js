import * as Services from 'app/services';
import * as ActionTypes from './ActionTypes';

export const login = (username, password) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.LOGIN_PENDING })
    Services.login(username, password)
      .then((response) => {
        dispatch({ type: ActionTypes.LOGIN_SUCCESS, data: response })
      })
      .catch((message) => {
        dispatch({ type: ActionTypes.LOGIN_FAIL, message })
      })
  }
}
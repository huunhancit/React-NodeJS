import * as Services from 'app/services';
import * as ActionTypes from './ActionTypes';


export const getMessages = (to, from) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.GET_MESSAGE_PENDING });
    Services.getMessages(to, from)
      .then((messages) => {
        dispatch({ type: ActionTypes.GET_MESSAGE_SUCCESS, messages })
      })
      .catch(message => {
        dispatch({ type: ActionTypes.GET_MESSAGE_FAIL, message })
      })
  }
}
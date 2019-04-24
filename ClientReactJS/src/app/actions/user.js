import * as Services from 'app/services';
import * as ActionTypes from './ActionTypes';


export const getUsers = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_USER_PENDING })
    Services.getUsers()
      .then((response) => {
        dispatch({ type: ActionTypes.GET_USER_SUCCESS, users: response });
      })
      .catch((message) => {
        dispatch({ type: ActionTypes.GET_USER_FAIL, message })
      })
  }
}

export const updateEmail = (userId, email) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.UPDATE_MAIL_PENDING })
    Services.updateEmail(userId, email)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_MAIL_SUCCESS })
      })
      .catch((message) => {
        dispatch({ type: ActionTypes.UPDATE_MAIL_FAIL, message })
      })
  }
}

export const addUser = (user) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.ADD_USER_PENDING })
    Services.addUser(user)
      .then((response) => {
        dispatch({ type: ActionTypes.ADD_USER_SUCCESS })
      })
      .catch((message) => {
        dispatch({ type: ActionTypes.ADD_USER_FAIL, message })
      })
  }
}

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.DELETE_USER_PENDING })
    Services.deleteUser(id)
      .then((response) => {
        dispatch({ type: ActionTypes.DELETE_USER_SUCCESS })
      })
      .catch((message) => {
        dispatch({ type: ActionTypes.DELETE_USER_FAIL, message })
      })
  }
}

export const newMessage = (user, isNew) => {
  console.log(user);
  return { type: ActionTypes.USER_NEW_MESSAGE, user, isNew }
}
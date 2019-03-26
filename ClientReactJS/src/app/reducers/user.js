
import * as ActionTypes from 'app/actions/ActionTypes'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_PENDING:
    case ActionTypes.UPDATE_MAIL_PENDING:
    case ActionTypes.ADD_USER_PENDING:
    case ActionTypes.DELETE_USER_PENDING:
      {
        return {
          ...state,
          type: action.type,
          message: ''
        }
      }
    case ActionTypes.GET_USER_FAIL:
    case ActionTypes.UPDATE_MAIL_FAIL:
    case ActionTypes.ADD_USER_FAIL:
    case ActionTypes.DELETE_USER_FAIL:
      {
        return {
          ...state,
          type: action.type,
          message: action.message
        }
      }
    case ActionTypes.GET_USER_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          message: '',
          users: action.users
        }
      }
    case ActionTypes.UPDATE_MAIL_SUCCESS:
    case ActionTypes.ADD_USER_SUCCESS:
    case ActionTypes.DELETE_USER_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          message: ''
        }
      }

    default:
      return state;
  }
}

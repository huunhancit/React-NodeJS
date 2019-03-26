
import * as ActionTypes from 'app/actions/ActionTypes'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_FAIL:
      {
        return {
          ...state,
          type: action.type,
          message: action.message
        }
      }
    case ActionTypes.LOGIN_PENDING:
      {
        return {
          ...state,
          type: action.type,
          message: ''
        }
      }
    case ActionTypes.LOGIN_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          userInfo: action.data
        }
      }
    default:
      return state;
  }
}

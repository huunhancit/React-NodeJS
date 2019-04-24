
import * as ActionTypes from 'app/actions/ActionTypes'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_MESSAGE_FAIL:
      {
        return {
          ...state,
          type: action.type,
          message: action.message
        }
      }
    case ActionTypes.GET_MESSAGE_PENDING:
      {
        return {
          ...state,
          type: action.type,
          message: ''
        }
      }
    case ActionTypes.GET_MESSAGE_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          messages: action.messages
        }
      }
    default:
      return state;
  }
}

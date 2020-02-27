import { ADD_NEW_BOARD, DELETE_BOARD } from '../actions/boards-actions'
import _ from 'lodash'

export default function boardsReducer(state = {}, { type, payload }) {
  switch (type) {
    case ADD_NEW_BOARD:
      return { ...state, [payload.id]: payload }
    case DELETE_BOARD:
      return _.omit(state, payload)
    default:
      return state
  }
}

import {
  INIT_NEW_TASKS,
  ADD_NEW_TASK,
  UPDATE_TASK_STATUS,
  DELETE_TASKS,
  DELETE_TASK,
  UPDATE_TASK,
} from '../actions/tasks-actions'
import _ from 'lodash'

export default function tasksReducer(state = {}, { type, payload }) {
  switch (type) {
    case INIT_NEW_TASKS:
      return { ...state, [payload]: {} }

    case ADD_NEW_TASK:
      const updatedTasks = state[payload.boardId]
      updatedTasks[payload.task.id] = payload.task

      return { ...state, [payload.boardId]: updatedTasks }

    case UPDATE_TASK_STATUS:
      const updatedTasks2 = state[payload.boardId]
      const newTask = updatedTasks2[payload.taskId]
      newTask.taskStatus = payload.newStatus
      const newTasks = { ...updatedTasks2, [payload.taskId]: newTask }

      return { ...state, [payload.boardId]: newTasks }

    case DELETE_TASKS:
      return _.omit(state, payload)

    case DELETE_TASK:
      const updatedTasks3 = _.omit(state[payload.boardId], payload.taskId)

      return { ...state, [payload.boardId]: updatedTasks3 }

    case UPDATE_TASK:
      const updatedTasks4 = {
        ...state[payload.boardId],
        [payload.task.id]: payload.task,
      }

      return { ...state, [payload.boardId]: updatedTasks4 }

    default:
      return state
  }
}

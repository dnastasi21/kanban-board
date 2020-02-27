export const ADD_NEW_TASK = 'task:addNewTask'
export const INIT_NEW_TASKS = 'task:initNewTasks'
export const DELETE_TASKS = 'task:deleteTasks'
export const UPDATE_TASK_STATUS = 'task:updateTaskStatus'
export const DELETE_TASK = 'task:deleteTask'
export const UPDATE_TASK = 'task:updateTask'

export function addNewTask(boardId, task) {
  return {
    type: ADD_NEW_TASK,
    payload: { boardId, task },
  }
}

export function initNewTasks(boardId) {
  return {
    type: INIT_NEW_TASKS,
    payload: boardId,
  }
}

export function deleteTasks(boardId) {
  return {
    type: DELETE_TASKS,
    payload: boardId,
  }
}

export function updateTaskStatus(boardId, taskId, newStatus) {
  return {
    type: UPDATE_TASK_STATUS,
    payload: { boardId, taskId, newStatus },
  }
}

export function deleteTask(boardId, taskId) {
  return {
    type: DELETE_TASK,
    payload: { boardId, taskId },
  }
}

export function updateTask(boardId, task) {
  return {
    type: UPDATE_TASK,
    payload: { boardId, task },
  }
}

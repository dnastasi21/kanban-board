import { createStore, combineReducers, compose } from 'redux'
import { loadLocalState, saveLocalState } from '../localStorage'
import { throttle } from 'lodash'

import boardsReducer from './reducers/boards-reducer'
import tasksReducer from './reducers/tasks-reducer'

const allReducers = combineReducers({
  boards: boardsReducer,
  tasks: tasksReducer,
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadLocalState()

export const store = createStore(
  allReducers,
  persistedState,
  composeEnhancers(),
)

store.subscribe(
  throttle(() => {
    saveLocalState({
      boards: store.getState().boards,
      tasks: store.getState().tasks,
    })
  }, 1000),
)

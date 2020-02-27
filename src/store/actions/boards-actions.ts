export const ADD_NEW_BOARD = 'board:addNewBoard'
export const DELETE_BOARD = 'board:deleteNewBoard'

export function addNewBoard(board) {
  return {
    type: ADD_NEW_BOARD,
    payload: board,
  }
}

export function deleteBoard(boardId) {
  return {
    type: DELETE_BOARD,
    payload: boardId,
  }
}

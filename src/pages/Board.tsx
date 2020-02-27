import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Segment, Grid, Header, Card, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'

import NewTaskModal from '../components/NewTaskModal'
import EditTaskModal from '../components/EditTaskModal'
import { deleteBoard } from '../store/actions/boards-actions'
import {
  addNewTask,
  deleteTasks,
  updateTaskStatus,
  deleteTask,
  updateTask,
} from '../store/actions/tasks-actions'
import { TaskType } from '../constants/interfaces'

const boardStatuses = [
  {
    status: 0,
    label: 'To do',
  },
  {
    status: 1,
    label: 'In progress',
  },
  {
    status: 2,
    label: 'Done',
  },
]

function Board({
  board,
  tasks,
  onDeleteBoard,
  onAddNewTask,
  onDeleteTasks,
  onUpdateTaskStatus,
  onDeleteTask,
  onUpdateTask,
}) {
  const { boardId } = useParams()
  const history = useHistory()
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null)
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)
  const [isTaskModalOpened, setIsTaskModalOpened] = useState<boolean | null>(
    false,
  )
  const [isEditTaskModalOpened, setIsEditTaskModalOpened] = useState<
    boolean | null
  >(false)

  function renderColumns(): JSX.Element[] {
    return boardStatuses.map((boardStatus, i) => {
      return (
        <Grid.Column key={i}>
          <Header as="h3" textAlign="center">
            <Header.Content>{boardStatus.label}</Header.Content>
          </Header>
          <Segment
            placeholder
            onDrop={event => onTaskDrop(event, boardStatus.status)}
            onDragOver={event => onTaskDragOver(event)}
          >
            <Card.Group centered>{renderTasks(boardStatus.status)}</Card.Group>
          </Segment>
        </Grid.Column>
      )
    })
  }

  function renderTasks(boardSection): JSX.Element | JSX.Element[] {
    if (!_.size(tasks)) {
      return <></>
    } else {
      return Object.values(tasks)
        .filter((task: any, i) => task.taskStatus === boardSection)
        .map((task: any, i) => {
          return (
            <Card
              key={i}
              draggable
              onDrag={event => onTaskDrag(event, task)}
              onDoubleClick={event => handleTaskDoubleClick(event, task)}
            >
              <Card.Content>
                <Card.Header>{task.name}</Card.Header>
                <Card.Description>{task.description}</Card.Description>
              </Card.Content>
            </Card>
          )
        })
    }
  }

  function onTaskDrag(event, task): void {
    event.preventDefault()

    setDraggedTask(task)
  }

  function onTaskDrop(event, boardStatus): void {
    event.preventDefault()

    onUpdateTaskStatus(board.id, draggedTask.id, boardStatus)
  }

  function onTaskDragOver(event): void {
    event.preventDefault()
  }

  function handleDeleteBoardClick(): void {
    onDeleteBoard(board.id)
    onDeleteTasks(board.id)
    history.push('/')
  }

  function handleTaskDoubleClick(event, task): void {
    setSelectedTask(task)
    setIsEditTaskModalOpened(true)
  }

  return (
    <div>
      <Header as="h2">
        <Header.Content>
          {board.name}{' '}
          <Icon
            link
            name="trash"
            size="tiny"
            onClick={() => handleDeleteBoardClick()}
          />
        </Header.Content>
      </Header>
      <Grid>
        <Grid.Row columns={boardStatuses.length as any}>
          {renderColumns()}
        </Grid.Row>
      </Grid>
      <Segment basic textAlign={'center'}>
        <Button
          primary
          onClick={() => setIsTaskModalOpened(true)}
          className="sem-btn-no-margin-right"
        >
          <Icon name="plus" />
          Add new task
        </Button>
      </Segment>
      <NewTaskModal
        isOpened={isTaskModalOpened}
        closeModal={() => setIsTaskModalOpened(false)}
        boardId={board.id}
        addNewTask={(task, boardId) => onAddNewTask(task, boardId)}
      />
      <EditTaskModal
        isOpened={isEditTaskModalOpened}
        closeModal={() => setIsEditTaskModalOpened(false)}
        task={selectedTask ? selectedTask : null}
        boardId={boardId}
        deleteTask={(boardId, taskId) => onDeleteTask(boardId, taskId)}
        updateTask={(boardId, task) => onUpdateTask(boardId, task)}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  board: state.boards[ownProps.match.params.boardId],
  tasks: state.tasks[ownProps.match.params.boardId],
})

const mapActionsToProps = {
  onDeleteBoard: deleteBoard,
  onAddNewTask: addNewTask,
  onDeleteTasks: deleteTasks,
  onUpdateTaskStatus: updateTaskStatus,
  onDeleteTask: deleteTask,
  onUpdateTask: updateTask,
}

export default connect(mapStateToProps, mapActionsToProps)(Board)

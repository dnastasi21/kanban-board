import React, { useState } from 'react'
import { Header, Segment, Icon, Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

import NewBoardModal from '../components/NewBoardModal'

import { addNewBoard } from '../store/actions/boards-actions'
import { initNewTasks } from '../store/actions/tasks-actions'

const Home = ({ boards, onAddNewBoard, onInitNewTasks }) => {
  const [isBoardModalOpened, setIsBoardModalOpened] = useState<boolean | null>(
    false,
  )

  function renderNoBoardsPresent(): JSX.Element {
    return (
      <>
        <Header icon>
          <Icon name="calendar times outline" />
          You have no boards stored
        </Header>
        {renderAddNewBoardButton()}
      </>
    )
  }

  function renderBoardsPresent(): JSX.Element {
    return (
      <Card.Group centered>
        {Object.values(boards).map((board: any, i) => {
          return (
            <Link key={i} to={`board/${board.id}`} style={{ margin: '10px' }}>
              <Card>
                <Card.Content>
                  <Card.Header>{board.name}</Card.Header>
                  {/* <Card.Meta>{board.tasks.length} tasks</Card.Meta> */}
                  <Card.Description>{board.description}</Card.Description>
                </Card.Content>
              </Card>
            </Link>
          )
        })}
      </Card.Group>
    )
  }

  function renderAddNewBoardButton(): JSX.Element {
    return (
      <Button primary onClick={() => setIsBoardModalOpened(true)}>
        <Icon name="plus" />
        Add new board
      </Button>
    )
  }

  return (
    <div>
      <Header as="h2" textAlign="center">
        <Header.Content>My Boards</Header.Content>
      </Header>
      <Segment placeholder>
        {_.size(boards) ? renderBoardsPresent() : renderNoBoardsPresent()}
      </Segment>
      {_.size(boards) ? (
        <Segment basic textAlign={'center'}>
          {renderAddNewBoardButton()}
        </Segment>
      ) : (
        <></>
      )}
      <NewBoardModal
        isOpened={isBoardModalOpened}
        closeModal={() => setIsBoardModalOpened(false)}
        addNewBoard={newBoard => onAddNewBoard(newBoard)}
        initNewTasks={boardId => onInitNewTasks(boardId)}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  boards: state.boards,
})

const mapActionsToProps = {
  onAddNewBoard: addNewBoard,
  onInitNewTasks: initNewTasks,
}

export default connect(mapStateToProps, mapActionsToProps)(Home)

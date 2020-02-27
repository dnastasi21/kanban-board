import React, { useState } from 'react'
import { Modal, Header, Button, Icon, Form } from 'semantic-ui-react'
import uniqid from 'uniqid'

function NewBoardModal({ isOpened, closeModal, addNewBoard, initNewTasks }) {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  function onCreateButtonClick(): void {
    const uniqId = uniqid()
    addNewBoard({
      name,
      description,
      id: uniqId,
    })
    initNewTasks(uniqId)
    closeModal()
  }

  return (
    <Modal open={isOpened} onClose={() => closeModal()} size="tiny">
      <Header content="New board" />
      <Modal.Content>
        <Form>
          <Form.Input
            label="Name"
            placeholder="My new board"
            value={name}
            onChange={(e, { value }) => setName(value)}
          />
          <Form.TextArea
            label="Description"
            placeholder="A description of my new board"
            value={description}
            onChange={(e, { value }) => setDescription(value as string)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="yellow" onClick={() => closeModal()}>
          <Icon name="times" /> Discard
        </Button>
        <Button color="green" onClick={() => onCreateButtonClick()}>
          <Icon name="checkmark" /> Create
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default NewBoardModal

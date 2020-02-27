import React, { useState, useEffect } from 'react'
import { Modal, Header, Button, Icon, Form } from 'semantic-ui-react'

function EditTaskModal({
  isOpened,
  closeModal,
  task,
  boardId,
  deleteTask,
  updateTask,
}) {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    setName(task ? task.name : '')
    setDescription(task ? task.description : '')
  }, [task])

  function handleDeleteTaskClick(): void {
    deleteTask(boardId, task.id)
    closeModal()
  }

  function handleUpdateTaskClick(): void {
    updateTask(boardId, {
      name,
      description,
      id: task.id,
      taskStatus: task.taskStatus,
    })
    closeModal()
  }

  return (
    <Modal open={isOpened} onClose={() => closeModal()} size="tiny">
      <Header content="New task" />
      <Modal.Content>
        <Form>
          <Form.Input
            label="Name"
            placeholder="My new task"
            value={name}
            onChange={(e, { value }) => setName(value)}
          />
          <Form.TextArea
            label="Description"
            placeholder="A description of my new task"
            value={description}
            onChange={(e, { value }) => setDescription(value as string)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => handleDeleteTaskClick()}
          className="action-modal-align-left"
        >
          <Icon name="trash" /> Delete
        </Button>
        <Button color="yellow" onClick={() => closeModal()}>
          <Icon name="times" /> Discard
        </Button>
        <Button color="green" onClick={() => handleUpdateTaskClick()}>
          <Icon name="checkmark" /> Update
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditTaskModal

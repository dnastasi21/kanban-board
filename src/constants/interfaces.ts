export interface TaskType {
  id: string
  name: string
  description: string
  taskStatus: number
}

export interface BoardType {
  id: string
  name: string
  description: string
  tasks: TaskType[]
}

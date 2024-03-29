import React, { useState } from 'react'
import { useTasksContext } from '../context/taskContext'

const Todo = (props) => {

  const [ isEditing, setIsEditing ] = useState(false)
  const [ newName, setNewName ] = useState('')
  const { deleteTask } = useTasksContext()

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.editTask(props.id, newName)
    setNewName('')
    setIsEditing(false)
  }

  const editingTemplate = (
    <form 
      className="stack-small"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input 
          id={props.id} 
          className="todo-text" 
          type="text" 
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn todo-cancel"
          onClick={() => setIsEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  )
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.complete}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn"
          onClick={() => setIsEditing(true)}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  )

  return (
    <li className='todo'>
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}

export default Todo
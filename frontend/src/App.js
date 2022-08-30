import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import Form from './components/Form';
import axios from 'axios';

const TaskContext = React.createContext(); 

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.complete,
  Completed: task => task.complete
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {

  const [ tasks, setTasks ] = useState([])
  const [filter, setFilter] = useState("All")

  const fetchTasks = async () => {
    await axios.get('/api/tasks')
    .then(res => {
      const taskdata = res.data.tasks;
      setTasks(taskdata)
      console.log(taskdata)
    })
  }

  useEffect(() => {
    fetchTasks()
  }, [tasks.length])

  const addTask = async (name) => {
    await axios.post('/api/tasks', { name })
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`)
    fetchTasks()
  }

  const editTask = async (id, name) => {
    await axios.put(`/api/tasks/${id}`, {name, completed: false})
    fetchTasks()
  }

  const toggleTaskCompleted = async (id) => {
    const name = await axios.get(`/api/tasks/${id}`)
    .then(res => res.data.name)

    const completed = await axios.get(`/api/tasks/${id}`)
    .then(res => res.data.completed) 

    await axios.put(`/api/tasks/${id}`, {name, completed:!completed})
    console.log(name, completed)
    fetchTasks()
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo 
      id={task._id}
      key={task._id}
      name={task.name} 
      complete={task.completed} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const tasksNoun = tasks.length === 1 ? 'task' : 'tasks' 
  const headingText = `${tasks.length} ${tasksNoun} remaining`

  return (
    <TaskContext.Provider value='hi'>
      <div className="todoapp stack-large">
        <h1>Todo</h1>
          <Form addTask={addTask}/>
        <div className="filters btn-group stack-exception">
          {filterList}
        </div>
        <h2 id="list-heading">{headingText}</h2>
        <ul
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
    </TaskContext.Provider>
  )
}

export default App;

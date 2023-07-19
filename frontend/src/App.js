import React, { useState } from 'react'

import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import Form from './components/Form';

import { useTasksContext } from './context/taskContext';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.complete,
  Completed: task => task.complete
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

const App = () => {
  let { tasks, deleteTask, editTask, toggleTaskCompleted } = useTasksContext();

  const [filter, setFilter] = useState("All")

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
    <div className="todoapp stack-large">
      <h1>Todo</h1>
        <Form />
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
  )
}

export default App;

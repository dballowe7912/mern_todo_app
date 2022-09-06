import axios from "axios"
import React, { useContext, useEffect, useReducer } from "react"
import reducer from './taskReducers'
import {
    GET_TASKS_BEGIN,
    GET_TASKS_SUCCESS,
    GET_TASKS_ERROR
} from './actions'

const url = '/api/tasks'

const initialState = {
    tasks_loading: false,
    tasks_error: false,
    tasks: [],
}

const TasksContext = React.createContext()

export const TasksProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const fetchTasks = async (url) => {
        dispatch({ type: GET_TASKS_BEGIN })
        try {
            const response = await axios.get(url)
            const tasks = response.data.tasks
            dispatch({ type: GET_TASKS_SUCCESS, payload: tasks })
        } catch (error) {
            dispatch({ type: GET_TASKS_ERROR })
        }
    }

    useEffect(() => {
        fetchTasks(url)
    }, [state.tasks.length])

    const addTask = async (name) => {
        await axios.post('/api/tasks', { name })
        fetchTasks()
    }

    const deleteTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`)
        fetchTasks()
      }

    return (
        <TasksContext.Provider 
            value={{ 
                ...state, 
                fetchTasks, 
                addTask,
                deleteTask
            }}>
            { children }
        </TasksContext.Provider>
    )
}

export const useTasksContext = () => {
    return useContext(TasksContext)
}


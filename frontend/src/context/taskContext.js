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
    }

    const deleteTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`)
    }

    const editTask = async (id, name) => {
        await axios.put(`/api/tasks/${id}`, {name, completed: false})
    }

    const toggleTaskCompleted = async (id) => {
        const name = await axios.get(`/api/tasks/${id}`)
        .then(res => res.data.name)

        const completed = await axios.get(`/api/tasks/${id}`)
        .then(res => res.data.completed)

        await axios.put(`/api/tasks/${id}`, {name, completed:!completed})
        await console.log(name, completed)
    }

    return (
        <TasksContext.Provider
            value={{
                ...state,
                fetchTasks,
                addTask,
                deleteTask,
                editTask,
                toggleTaskCompleted
            }}>
            { children }
        </TasksContext.Provider>
    )
}

export const useTasksContext = () => {
    return useContext(TasksContext)
}

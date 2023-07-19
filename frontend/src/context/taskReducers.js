import {
    GET_TASKS_BEGIN,
    GET_TASKS_SUCCESS,
    GET_TASKS_ERROR,
    ADD_TASK
} from './actions'

const tasks_reducer = (state, action) => {
    if (action.type === GET_TASKS_BEGIN) {
        return { ...state, tasks_loading: true }
    }
    if (action.type === GET_TASKS_SUCCESS) {
        return { ...state, tasks_loading: false, tasks: action.payload }
    }
    if (action.type === GET_TASKS_ERROR) {
        return { ...state, tasks_error: true, tasks_loading: false }
    }
    if (action.type === ADD_TASK) {
        return { ...state, task: [...state.tasks, action.payload]}
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default tasks_reducer

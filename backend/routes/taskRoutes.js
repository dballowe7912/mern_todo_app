import express from 'express'

const router = express.Router()

import {
    getTasks,
    createTask,
    getTaskById,
    deleteTask,
    updateTask
} from '../controllers/taskController.js'

router.route('/').get(getTasks).post(createTask)
router.route('/:id').get(getTaskById).delete(deleteTask).put(updateTask)

export default router
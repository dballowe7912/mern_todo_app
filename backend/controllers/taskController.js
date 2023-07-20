
import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

// @desc    Fetch all tasks
// @route   GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
    const fetchedTasks = await Task.find({})
    if (fetchedTasks) {
        return res.status(200).json({tasks: fetchedTasks})
    } else {
        return res.status(400).json({error: 'No tasks to show.'})
    }
})

// @desc   Create new task
// @route  POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
    const newTask = new Task({
        name: req.body.name
    })
    const createdTask = await newTask.save()

    res.status(200).json(createdTask)
})

// @desc   Get task by ID
// @route  GET /api/tasks/:id
const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (task) {
        res.json(task)
    } else {
        res.status(404).json({ error: 'Task not found'})
    }
})

// @desc   Delete task
// @route  DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (task) {
        await task.remove()
        res.json({ message: 'Task removed'})
    } else {
        res.status(404).json({ error: 'Task not found'})
    }
})

// @desc   Update task
// @route  PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
    const { name, completed } = req.body

    const task = await Task.findById(req.params.id)

    if (task) {
        task.name = name,
        task.completed = completed

        const updatedTask = await task.save()
        res.json(updatedTask)
    } else {
        res.status(404).json({ error: 'Task not found'})
    }
})

export {
    getTasks,
    createTask,
    getTaskById,
    deleteTask,
    updateTask
}

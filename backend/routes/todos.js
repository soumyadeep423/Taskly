const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

// @route   GET api/todos
// @desc    Get all todos
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/todos
// @desc    Add new todo
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text,
            user: req.user.id
        });

        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/todos/:id
// @desc    Update todo
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        // Make sure user owns todo
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        todo.completed = !todo.completed;
        todo = await todo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/todos/:id
// @desc    Delete todo
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        // Make sure user owns todo
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await todo.remove();
        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 
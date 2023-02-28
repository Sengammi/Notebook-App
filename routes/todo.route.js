const {Router} = require('express')
const router = Router();

const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query

        const todo = await Todo.find(
            {
                owner: userId
            })

        res.json(todo)

    } catch (err) {
        console.error(err);
    }
})

router.post('/add', async (req, res) => {
    try {
        const {text, userId} = req.body

        const todo = await new Todo({
            text,
            owner: userId,
            completed: false,
            important: false,
        })

        await todo.save();

        res.status(200).json({ message: 'Завдання додано'})

    }catch (err){
        console.error(err)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const {text, id} = req.body

        await Todo.findByIdAndUpdate({_id: id},{text})


        res.status(200).json({ message: 'Завдання додано'})

    }catch (err){
        console.error(err)
    }
})

router.delete('/delete/:id', async (req, res)=> {
    try {
        console.log(req.params.id)
        const todo = await Todo.findOneAndDelete({_id: req.params.id})
        return res.json(todo)
    } catch (err) {
        console.error(err)
    }
})

router.put('/complete/:id', async (req, res) => {
    try {

        const todo = await Todo.findOne({_id: req.params.id});
        todo.completed = !todo.completed;
        await todo.save();

        res.json(todo);

    }catch (err){
        console.error(err)
    }
})

router.put('/important/:id', async (req, res) => {
    try {

        const todo = await Todo.findOne({_id: req.params.id});
        todo.important = !todo.important;
        await todo.save();

        res.json(todo);

    }catch (err){
        console.error(err)
    }
})

module.exports = router;

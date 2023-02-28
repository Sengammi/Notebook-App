const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    owner: {type: ObjectId, ref: "User"},
    text: {type: String},
    completed: {type: Boolean ,date: false},
    important: {type: Boolean ,date: false},
})

module.exports = model('Todo', schema)
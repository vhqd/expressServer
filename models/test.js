const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    username: String,
    password: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
})

const testModel = mongoose.model('test', testSchema)

module.exports = testModel
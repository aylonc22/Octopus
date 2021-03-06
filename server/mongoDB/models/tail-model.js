
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tail = new Schema(
    {
        ID: { type: Number, required: true},
        Type: { type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('tail', Tail);
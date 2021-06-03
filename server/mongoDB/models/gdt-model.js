const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GDT = new Schema(
    {
        ID: { type: Number, required: true},
        Location: { type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('gdt', GDT);
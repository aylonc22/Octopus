const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Flight = new Schema(
    {
        Tail: { type: Number, required: true},
        Station: { type: Number, required: true},
        GDT: { type: Number, required: true},
        Frequency: { type: Number, required: true},
        Date: { type: Date, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('flight', Flight);
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Notification = new Schema(
    {
        Stations: { type: Array, required: true},
        Type: { type: String, required: true},
        Duplicate: { type: Number , required: true},
        Open: { type: Date, required: true},
        Close: { type: Date, required: true},
        Clients: { type: Array, required: false},
    },
    { timestamps: true },
)

module.exports = mongoose.model('notification', Notification);
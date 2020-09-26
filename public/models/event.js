const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: Buffer
    }
}, {
    timestamps: true
})

const eventModel = mongoose.model(eventSchema)

module.exports = eventModel
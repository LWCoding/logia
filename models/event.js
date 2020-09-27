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
    joinLink: {
        type: String
    },
    thumbnail: {
        type: Buffer
    }
}, {
    timestamps: true
})

eventSchema.methods.toJSON = function() {
    const event = this.toObject()
    delete event._id
    delete event.__v
    return event
}

const eventModel = mongoose.model("Event", eventSchema)

module.exports = eventModel
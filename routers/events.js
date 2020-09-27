const express = require("express")
const Event = require("../models/event")

const eventsRouter = express.Router()

eventsRouter.get("/get-events", async (req, res) => {
    const events = await Event.find().skip(0).limit(5)
    res.send({
        events
    })
})

module.exports = eventsRouter
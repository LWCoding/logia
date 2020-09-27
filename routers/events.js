const express = require("express")
const Event = require("../models/event")

const eventsRouter = express.Router()

eventsRouter.post("/create-event", async (req, res) => {
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        joinLink: req.body.joinLink
    })
    try {
        await event.save()
        res.status(200).send()
    } catch (error) {
        console.log("There was an error while trying to save an event!" + error)
        res.status(400).send()
    }
})

const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
eventsRouter.get("/get-events", async (req, res) => {
    const events = await Event.find().skip(0).limit(5)
    const sentEvents = []
    for (let i = 0; i < events.length; i++) {
        let event = events[i]
        sentEvents.push({
            name: event.name,
            description: event.description,
            month: months[event.date.getMonth()],
            day: event.date.getDay(),
            year: event.date.getYear(),
            thumbnail: event.thumbnail,
            joinLink: event.joinLink
        })
    }
    res.send({
        events: sentEvents
    })
})

module.exports = eventsRouter
const express = require("express")
const validator = require("validator")
const Event = require("../models/event")

const eventsRouter = express.Router()

eventsRouter.post("/create-event", async (req, res) => {
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        joinLink: req.body.joinLink,
        memberCap: req.body.memberCap
    })
    try {
        await event.save()
        res.status(200).send()
    } catch (error) {
        console.log("There was an error while trying to save an event! " + error)
        res.status(400).send()
    }
})

eventsRouter.delete("/delete-event", async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({name: req.body.name})
        if (!event) {
            return res.status(404).send()
        }
        res.status(200).send()
    } catch (error) {
        console.log("There was an error while trying to delete an event! " + error)
        res.status(400).send()
    }
})

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
eventsRouter.get("/get-events", async (req, res) => {
    try {
        const events = await Event.find().skip(0).limit(5)
        const sentEvents = []
        for (let i = 0; i < events.length; i++) {
            let event = events[i]
            sentEvents.push({
                name: event.name,
                description: event.description,
                month: months[event.date.getMonth()],
                day: event.date.getDate(),
                year: event.date.getFullYear(),
                time: `${event.date.getHours() > 12 ? event.date.getHours() % 12 : event.date.getHours()}:${event.date.getMinutes() == 0 ? "00" : event.date.getMinutes()} ${event.date.getHours() >= 12 ? "PM" : "AM"}`,
                thumbnail: event.thumbnail,
                memberCount: event.registeredEmails.length,
                currentMembers: event.currentMembers,
                memberCap: event.memberCap,
                joinLink: event.joinLink
            })
        }
        res.send({
            events: sentEvents
        })
    } catch (error) {
        res.status(503).send()
    }
})

eventsRouter.patch("/rsvp", async (req, res) => {
    try {
        const event = await Event.findOne({name: req.body.event})
        if (!event) {
            return res.status(404).send({error: "We couldn't find that event! Is it disabled?"})
        }
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).send({error: "Invalid email provided."})
        }
        if (event.registeredEmails.some((email) => email.email.toLowerCase() === req.body.email)) {
            return res.status(400).send({error: "Already registered for event!"})
        }
        event.registeredEmails.push({
            email: req.body.email
        })
        await event.save()
        res.status(200).send({})
    } catch (error) {
        res.status(400).send({error: "Something wrong happened on the server-side."})
    }
})

module.exports = eventsRouter
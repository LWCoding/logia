const express = require("express")
const path = require("path")
const router = express.Router()

router.get("/", (req, res) => {
    res.redirect("home")
})

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/homepage.html"))
})

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"))
})

router.get("/events", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/events.html"))
})

module.exports = router
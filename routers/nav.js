const express = require("express")
const path = require("path")
const router = express.Router()

router.get("/", (req, res) => {
    res.redirect("home")
})

router.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "../robots.txt"))
})

router.get("/sitemap.xml", (req, res) => {
    res.sendFile(path.join(__dirname, "../sitemap.xml"))
})

router.get("/home", (req, res) => {
    res.render("homepage", {
        middleText: "Logia"
    })
})

router.get("/about", (req, res) => {
    res.render("about", {
        middleText: "About Us"
    })
})

router.get("/events", (req, res) => {
    res.render("events", {
        middleText: "Upcoming Events"
    })
})

router.get("/admin", (req, res) => {
    if (req.query.password !== process.env.ADMIN_PASSWORD) {
        return res.redirect("/home")
    }
    res.render("admin", {
        middleText: "Admin Dashboard"
    })
})

module.exports = router
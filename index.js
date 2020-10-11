require("./db/mongoose")
const express = require("express")
const hbs = require("hbs")
const path = require("path")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3000

hbs.registerPartials(path.join(__dirname, "/templates/partials"))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "/templates/views"))

app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")))
app.use(cors())

const navRouter = require("./routers/nav")
const eventsRouter = require("./routers/events")
const emailRouter = require("./routers/emails")
app.use(navRouter)
app.use(eventsRouter)
app.use(emailRouter)

app.listen(port, () => {
    console.log("Listening on port " + port + ".")
})
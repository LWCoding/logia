const nodemailer = require("nodemailer")
const express = require("express")
const Event = require("../models/event")

const emailRouter = express.Router()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (mailOptions) => {
    const res = await transporter.sendMail(mailOptions)
    return res.accepted.length > 0
}

emailRouter.post("/notify", async (req, res) => {
    if (req.body.password !== process.env.ADMIN_PASSWORD) {
        return res.status(400).send({error: "Not properly authenticated."})
    }
    const event = await Event.findOne({name: req.body.name})
    if (!event) {
        return res.status(404).send({error: "Couldn't find specified event!"})
    }
    const emails = event.registeredEmails
    for (let i = 0; i < emails.length; i++) {
        var mailOptions = {
            from: process.env.EMAIL_ACCOUNT,
            to: emails[i].email,
            subject: req.body.subject,
            html: req.body.announcement
        };
        const emailSent = await sendEmail(mailOptions)
        if (!emailSent) {
            return res.status(400).send({error: "The email was not able to be sent!"})
        }
    }
    res.status(200).send({recipients: emails.length})
})

module.exports = emailRouter
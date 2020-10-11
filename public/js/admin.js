function createEvent(name, date, description, thumbnail, joinLink, memberCap) {
    if (!name || !date || !description || !thumbnail || !joinLink || !memberCap) {
        return $("#create-notice").stop(0).css("color", "red").text("Fill in all fields.").fadeIn(350).delay(1500).fadeOut(350)
    }
    fetch("/create-event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, date, description, thumbnail, joinLink, memberCap
        })
    }).then((res) => {
        $("#screen-cover").fadeOut(350)
        $("#create-event .name").val("")
        $("#create-event .date").val("")
        $("#create-event .description").val("")
        $("#create-event .joinLink").val("")
        $("#create-event .thumbnail").val("")
        $("#create-event .memberCap").val("")
        if (!res.ok) {
            $("#create-notice").stop(0).css("color", "red").text("Something went wrong.").fadeIn(350).delay(1500).fadeOut(350)
        } else {
            $("#create-notice").stop(0).css("color", "green").text("Event successfully created!").fadeIn(350).delay(1500).fadeOut(350)
        }
    })
}

function deleteEvent(name) {
    if (!name) {
        return $("#delete-notice").stop(0).css("color", "red").text("Fill in all fields.").fadeIn(350).delay(1500).fadeOut(350)
    }
    fetch("/delete-event", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name
        })
    }).then((res) => {
        $("#screen-cover").fadeOut(350)
        $("#delete-event .name").val("")
        if (!res.ok) {
            $("#delete-notice").stop(0).css("color", "red").text("Something went wrong.").fadeIn(350).delay(1500).fadeOut(350)
        } else {
            $("#delete-notice").stop(0).css("color", "green").text("Event successfully deleted!").fadeIn(350).delay(1500).fadeOut(350)
        }
    })
}

async function notifyPeople(name, subject, announcement) {
    let password = window.location.href.split("=")[1]
    $("#rsvp-notice").stop(0).css("color", "gray").text("Emailing... please wait.").fadeIn(350)
    const res = await fetch("/notify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({name, subject, announcement, password})
    })
    const json = await res.json()
    if (json.error) {
        $("#rsvp-notice").css("color", "red").text(json.error).delay(1500).fadeOut(350)
    } else {
        $("#screen-cover").fadeOut(350)
        $("#notify-event .name").val("")
        $("#subject").val("")
        $("#notify-event .announcement").val("")
        $("#rsvp-notice").css("color", "green").text("Successfully emailed " + json.recipients + " recipient(s)!").delay(1500).fadeOut(350)
    }
}

$("#submit-event").click(() => {
    let name = $("#create-event .name")[0]
    let date = $("#create-event .date")[0]
    let description = $("#create-event .description")[0]
    let joinLink = $("#create-event .joinLink")[0]
    let thumbnail = $("#create-event .thumbnail")[0]
    let memberCap = $("#create-event .memberCap")[0]
    createEvent(name.value, date.value, description.value, thumbnail.value, joinLink.value, memberCap.value)
})
$("#remove-event").click(() => {
    let name = $("#delete-event .name")[0]
    deleteEvent(name.value)
})
$("#announce-event").click(() => {
    let name = $("#notify-event .name")[0]
    let subject = $("#subject")[0]
    let announcement = $("#notify-event .announcement")[0]
    notifyPeople(name.value, subject.value, announcement.value)
})

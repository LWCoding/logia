function createEvent(name, date, description, thumbnail, joinLink, memberCap) {
    if (!name || !date || !description || !thumbnail || !joinLink || !memberCap) {
        throw new Error("createEvent parameters not completely supplied.")
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
        $("#create-event").hide(350)
        if (!res.ok) {
            throw new Error("Failure to create event!")
        }
    })
}

function deleteEvent(name) {
    if (!name) {
        throw new Error("deleteEvent parameters not completely supplied.")
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
        $("#delete-event").hide(350)
        if (!res.ok) {
            throw new Error("Failure to delete event!")
        }
    })
}

$(document).ready(() => {
    $("#submit-event").click(() => {
        let name = $("#create-event .name")[0]
        let date = $("#create-event .date")[0]
        let description = $("#create-event .description")[0]
        let joinLink = $("#create-event .joinLink")[0]
        let thumbnail = $("#create-event .thumbnail")[0]
        let memberCap = $("#create-event .memberCap")[0]
        createEvent(name.value, date.value, description.value, joinLink.value, thumbnail.value, memberCap.value)
    })
    $("#remove-event").click(() => {
        let name = $("#delete-event .name")[0]
        deleteEvent(name.value)
    })
})
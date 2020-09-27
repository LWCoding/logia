$(document).ready(() => {
    $("#to-events").css("color", "rgb(57, 223, 120)")
    $("a").css("transition", "color 0.2 ease")
    fetch("/get-events").then(async (res) => {
        if (res.ok) {
            const json = await res.json()
            const events = json.events
            if (events.length === 0) {
                $("#event-container").append("<p>There are currently no scheduled events. Please check again at a later time.</p>")
                return
            }
            for (let i = 0; i < events.length; i++) {
                let event = events[i]
                $("#event-container").append(`
                <div class="event">
                    <h3>${event.name}</h3>
                    <p>${event.month} ${event.day} ${event.year}</p>
                    <p>${event.description}</p>
                </div>
                `)
            }
        } else {
            $("#event-container").append("<p>There was an error loading the events. Please try again later.</p>")
        }
    })
})
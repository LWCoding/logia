$(document).ready(() => {
    $("#to-events").css("color", "rgb(57, 223, 120)")
    $("a").css("transition", "color 0.2 ease")
    fetch("/get-events").then(async (res) => {
        $("#event-container").empty()
        if (res.ok) {
            const json = await res.json()
            const events = json.events
            if (events.length === 0) {
                $("#event-container").append("<p>There are currently no scheduled events. Please check again at a later time.</p>")
                return
            }
            $(".small-spacer").remove()
            const maxChars = Math.max(100, Math.round($(window).width() / 6))
            for (let i = 0; i < events.length; i++) {
                let event = events[i]
                $("#event-container").append(`
                <div class="event">
                    <img class="thumbnail" src="${event.thumbnail}" alt="Event Thumbnail" onerror="$(this).remove();">
                    <div class="text">
                        <h3 class="name">${event.name}</h3>
                        <p class="date-text">Live <span class="date">${event.month} ${event.day} ${event.year}</span> at <span class="date">${event.time}</span>.</p>
                        <p class="description">${event.description.length > maxChars ? event.description.substr(0, maxChars).trim() + "..." : event.description}</p>
                        <div class="buttons">
                            <button>RSVP (0/${event.memberCap})</button>
                            <button style="background: rgb(49, 95, 223);" onclick="$('#info > .name').text('${event.name.replaceAll("'", "\\'")}'); $('#info > .full-description').text('${event.description.replaceAll("'", "\\'")}'); $('#screen-cover').fadeIn(350); $('#info').fadeIn(350);">Info</button>
                        </div>
                    </div>
                </div>
                `)
            }
        } else {
            $("#event-container").append("<p>There was an error loading the events. Please try again later.</p>")
        }
    })
})
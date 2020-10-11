$("#submit-rsvp").click(async () => {
    const res = await fetch("/rsvp", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            event: $("#selected-event").text(),
            email: $("#user-email").val()
        })
    })
    const json = await res.json()
    if (json.error) {
        $("#rsvp-notice").stop(0).css("color", "red").text(json.error).fadeIn(500).delay(1000).fadeOut(500)
    } else {
        $("#user-email").val("")
        $("#rsvp-notice").stop(0).css("color", "green").text("Successfully registered for event!").fadeIn(500).delay(1000).fadeOut(500)
    }
})
$(window).resize(() => {
    let events = $(".event")
    const maxChars = Math.max(100, Math.round($(window).width() / 6))
    for (let i = 0; i < events.length; i++) {
        let fullDesc = $(events[i]).find(".full-description").text();
        $(events[i]).find(".text").find(".description").text(fullDesc.length > maxChars ? fullDesc.substr(0, maxChars - 1).trim() + "..." : fullDesc)
    }
})
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
                    <span class="zoom-link" style="display: none;">${event.joinLink}</span>
                    <span class="full-description" style="display: none;">${event.description}</span>
                    <img class="thumbnail" src="${event.thumbnail}" alt="Event Thumbnail" onerror="$(this).remove();">
                    <div class="text">
                        <h3 class="name">${event.name}</h3>
                        <p class="date-text">Live <span class="date">${event.month} ${event.day} ${event.year}</span> at <span class="date">${event.time}</span>.</p>
                        <p class="description">${event.description.length > maxChars ? event.description.substr(0, maxChars - 1).trim() + "..." : event.description}</p>
                        <div class="buttons">
                            <button class="rsvp-button">RSVP (<span class="member-count">${event.memberCount}</span>/<span class="member-cap">${event.memberCap}</span>)</button>
                            <button class="info-button" style="background: rgb(49, 95, 223);">Info</button>
                        </div>
                    </div>
                </div>
                `)
            }
            $(".rsvp-button").click(function() {
                $('#screen-cover').fadeIn(350);
                $('#rsvp').fadeIn(350);
                $("#selected-event").text($(this).parents(".text").find(".name").text());
                if (parseInt($(this).parent().find(".member-count").text()) >= parseInt($(this).parent().find(".member-cap").text())) {
                    $("#rsvp-notice").css("color", "red").text("RSVPing for this event does not guarantee a spot, since it is over the member limit.").show()
                } else {
                    $("#rsvp-notice").hide()
                }
            })
            $(".info-button").click(function() {
                $('#info > .name').text($(this).parents(".text").find(".name").text());
                $('#info > .full-description').text($(this).parents(".event").find(".full-description").text().replaceAll("<", "\\<").replaceAll(">", "\\>"));
                $('#join-zoom').attr("onclick", "window.open('" + $(this).parents(".event").find(".zoom-link").text() + "', '_blank')");
                $('#screen-cover').fadeIn(350);
                $('#info').fadeIn(350);
            })
        } else {
            $("#event-container").append("<p>There was an error loading the events. Please try again later.</p>")
        }
    })
})
$(document).ready(async () => {
    $("#header > *:not(#overlay)").css("opacity", 0).delay(400).animate({
        top: "+=10"
    }, 0).animate({
        opacity: 1,
        top: "-=10"
    }, 400)
    $("#overlay").css("transition", "all 0.8s ease")
    $("#overlay").css("opacity", 0)
    $("a").css("transition", "color 0.4s ease")
})
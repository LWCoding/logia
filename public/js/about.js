$(document).ready(() => {
    $("#to-about").css("color", "rgb(57, 223, 120)")
    $(".image-block").css({opacity: 0.5})
    $(".image-block").waypoint(function(direction) {
        $(this[0, "element"]).addClass("fade-in")
    }, { offset: "95%" })
})
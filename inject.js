
$(document).ready(function() {
    $(".button").click(function () {
        $(".container").css('background-color', 'blue');
        $(".button").css('color', 'red');
    });
    $(".container").resizeable();
});
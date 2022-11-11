$(document).ready(function () {
    console.log('ready');
})

function passBetChange() {
    var passBet = $("#pass_bet").val();
    if (passBet > 0) {
        $("#pass_odds").prop("disabled", false);
    } else {
        $("#pass_odds").prop("disabled", true);
    }
}

function dontBetChange() {
    var dontBet = $("#dont_bet").val();
    if (dontBet > 0) {
        $("#dont_odds").prop("disabled", false);
    } else {
        $("#dont_odds").prop("disabled", true);
    }
}
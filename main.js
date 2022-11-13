function passBetChange() {
    var passBet = $("#pass_bet").val();
    if (passBet > 0) {
        $("#pass_odds").prop("disabled", false);
    } else {
        $("#pass_odds").prop("disabled", true);
    }

    handleBetChange();
}

function dontBetChange() {
    var dontBet = $("#dont_bet").val();
    if (dontBet > 0) {
        $("#dont_odds").prop("disabled", false);
    } else {
        $("#dont_odds").prop("disabled", true);
    }
}

function checkInput(input) {
    input.value = Math.floor(input.value);
}

function handleBetChange() {
    var wager = 0;
    var passBet = $("#pass_bet").val() * 1;
    wager += passBet;
    var passOdds = $("#pass_odds").val() * 1;
    wager += passOdds;
    var dontBet = $("#dont_bet").val() * 1;
    wager += dontBet;
    var dontOdds = $("#dont_odds").val() * 1;
    wager += dontOdds;

    var placeFour = $("#place_four").val() * 1;
    wager += placeFour;
    var buyFour = $("#buy_four").val() * 1;
    wager += buyFour;
    var layFour = $("#lay_four").val() * 1;
    wager += layFour;
    var placeFive = $("#place_five").val() * 1;
    wager += placeFive;
    var buyFive = $("#buy_five").val() * 1;
    wager += buyFive;
    var layFive = $("#lay_five").val() * 1;
    wager += layFive;
    var placeSix = $("#place_six").val() * 1;
    wager += placeSix;
    var buySix = $("#buy_six").val() * 1;
    wager += buySix;
    var laySix = $("#lay_six").val() * 1;
    wager += laySix;
    var placeEight = $("#place_eight").val() * 1;
    wager += placeEight;
    var buyEight = $("#buy_eight").val() * 1;
    wager += buyEight;
    var layEight = $("#lay_eight").val() * 1;
    wager += layEight;
    var placeNine = $("#place_nine").val() * 1;
    wager += placeNine;
    var buyNine = $("#buy_nine").val() * 1;
    wager += buyNine;
    var layNine = $("#lay_nine").val() * 1;
    wager += layNine;
    var placeTen = $("#place_ten").val() * 1;
    wager += placeTen;
    var buyTen = $("#buy_ten").val() * 1;
    wager += buyTen;
    var layTen = $("#lay_ten").val() * 1;
    wager += layTen;

    var comeBet = $("#come_bet").val() * 1;
    wager += comeBet;
    
    var comeFour = $("#come_four").html() * 1;
    wager += comeFour;
    var comeFourOdds = $("#come_four_odds").val() * 1;
    wager += comeFourOdds;
    var comeFive = $("#come_five").html() * 1;
    wager += comeFive;
    var comeFiveOdds = $("#come_five_odds").val() * 1;
    wager += comeFiveOdds;
    var comeSix = $("#come_six").html() * 1;
    wager += comeSix;
    var comeSixOdds = $("#come_six_odds").val() * 1;
    wager += comeSixOdds;
    var comeEight = $("#come_eight").html() * 1;
    wager += comeEight;
    var comeEightOdds = $("#come_eight_odds").val() * 1;
    wager += comeEightOdds;
    var comeNine = $("#come_nine").html() * 1;
    wager += comeNine;
    var comeNineOdds = $("#come_nine_odds").val() * 1;
    wager += comeNineOdds;
    var comeTen = $("#come_ten").html() * 1;
    wager += comeTen;
    var comeTenOdds = $("#come_ten_odds").val() * 1;
    wager += comeTenOdds;

    var field = $("#field").val() * 1;
    wager += field;

    var hardSix = $("#hard_six").val() * 1;
    wager += hardSix;
    var hardEight = $("#hard_eight").val() * 1;
    wager += hardEight;
    var hardFour = $("#hard_four").val() * 1;
    wager += hardFour;
    var hardTen = $("#hard_ten").val() * 1;
    wager += hardTen;

    var anySeven = $("#any_seven").val() * 1;
    wager += anySeven;
    var hornHighTwo = $("#horn_high_two").val() * 1;
    wager += hornHighTwo;
    var hornHighThree = $("#horn_high_three").val() * 1;
    wager += hornHighThree;
    var hornHighEleven = $("#horn_high_eleven").val() * 1;
    wager += hornHighEleven;
    var hornHighTwelve = $("#horn_high_twelve").val() * 1;
    wager += hornHighTwelve;
    var hornTwo = $("#horn_two").val() * 1;
    wager += hornTwo;
    var hornThree = $("#horn_three").val() * 1;
    wager += hornThree;
    var hornEleven = $("#horn_eleven").val() * 1;
    wager += hornEleven;
    var hornTwelve = $("#horn_twelve").val() * 1;
    wager += hornTwelve;
    var anyCraps = $("#any_craps").val() * 1;
    wager += anyCraps;

    $("#wager").html(wager);
}

function manualRoll() {
    var result_1 = $("#manual_die_1").val();
    var result_2 = $("#manual_die_2").val();

    displayResult(result_1 * 1, result_2 * 1);
}

function roll() {
    var result_1 = Math.floor(Math.random() * 6) + 1;
    var result_2 = Math.floor(Math.random() * 6) + 1;

    displayResult(result_1, result_2);
}

function displayResult(result_1, result_2) {
    var die_1 = $("#result_die_1");
    var die_2 = $("#result_die_2");

    switch (result_1) {
        case 1:
            die_1.attr("src", "images/one.png");
            break;
        case 2:
            die_1.attr("src", "images/two.png");
            break;
        case 3:
            die_1.attr("src", "images/three.png");
            break;
        case 4:
            die_1.attr("src", "images/four.png");
            break;
        case 5:
            die_1.attr("src", "images/five.png");
            break;
        case 6:
            die_1.attr("src", "images/six.png");
    }

    switch (result_2) {
        case 1:
            die_2.attr("src", "images/one.png");
            break;
        case 2:
            die_2.attr("src", "images/two.png");
            break;
        case 3:
            die_2.attr("src", "images/three.png");
            break;
        case 4:
            die_2.attr("src", "images/four.png");
            break;
        case 5:
            die_2.attr("src", "images/five.png");
            break;
        case 6:
            die_2.attr("src", "images/six.png");
    }
}

function determineGame() {
    
}
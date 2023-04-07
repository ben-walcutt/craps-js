var balance = 0;
var wager = 0;
var working = false;
var point = 0;
var payout = 0;
var previousRolls = [];
var totalRolls = 0;
var histogram = {
    "#histo_two": 0, 
    "#histo_three": 0, 
    "#histo_four": 0,
    "#histo_five": 0,
    "#histo_six": 0,
    "#histo_seven": 0,
    "#histo_eight": 0,
    "#histo_nine": 0,
    "#histo_ten": 0,
    "#histo_eleven": 0,
    "#histo_twelve": 0
};
var shooterCount = 1;
var shooterRolls = 0;
var pointsMade = 0;

function checkInput(input) {
    input.value = Math.floor(input.value);
}

function handleBetChange() {
    balance += wager;
    wager = 0;
    var passBet = $("#pass_bet").val() * 1;
    wager += passBet;
    var passOdds = $("#pass_odds").val() * 1;
    wager += passOdds;
    var dontBet = $("#dont_bet").val() * 1;
    wager += dontBet;
    var dontOdds = $("#dont_odds").val() * 1;
    wager += dontOdds;

    var buyFour = $("#buy_four").val() * 1;
    wager += buyFour;
    var layFour = $("#lay_four").val() * 1;
    wager += layFour;
    var buyFive = $("#buy_five").val() * 1;
    wager += buyFive;
    var layFive = $("#lay_five").val() * 1;
    wager += layFive;
    var buyNine = $("#buy_nine").val() * 1;
    wager += buyNine;
    var layNine = $("#lay_nine").val() * 1;
    wager += layNine;
    var buyTen = $("#buy_ten").val() * 1;
    wager += buyTen;
    var layTen = $("#lay_ten").val() * 1;
    wager += layTen;

    var dontCome = $("#dont_come").val() * 1;
    wager += dontCome;
    var dontComeFour = $("#dont_come_four_bet").html() * 1;
    wager += dontComeFour;
    var dontComeFourOdds = $("#dont_come_four_odds").val() * 1;
    wager += dontComeFourOdds;

    if (working) {
        var placeFour = $("#place_four").val() * 1;
        wager += placeFour;
        var placeFive = $("#place_five").val() * 1;
        wager += placeFive;
        var placeSix = $("#place_six").val() * 1;
        wager += placeSix;
        var placeEight = $("#place_eight").val() * 1;
        wager += placeEight;
        var placeNine = $("#place_nine").val() * 1;
        wager += placeNine;
        var placeTen = $("#place_ten").val() * 1;
        wager += placeTen;

        var hardSix = $("#hard_six").val() * 1;
        wager += hardSix;
        var hardEight = $("#hard_eight").val() * 1;
        wager += hardEight;
        var hardFour = $("#hard_four").val() * 1;
        wager += hardFour;
        var hardTen = $("#hard_ten").val() * 1;
        wager += hardTen;
    }

    var comeBet = $("#come_bet").val() * 1;
    wager += comeBet;
    
    var comeFour = $("#come_four_bet").html() * 1;
    wager += comeFour;
    var comeFourOdds = $("#come_four_odds").val() * 1;
    wager += comeFourOdds;
    var comeFive = $("#come_five_bet").html() * 1;
    wager += comeFive;
    var comeFiveOdds = $("#come_five_odds").val() * 1;
    wager += comeFiveOdds;
    var comeSix = $("#come_six_bet").html() * 1;
    wager += comeSix;
    var comeSixOdds = $("#come_six_odds").val() * 1;
    wager += comeSixOdds;
    var comeEight = $("#come_eight_bet").html() * 1;
    wager += comeEight;
    var comeEightOdds = $("#come_eight_odds").val() * 1;
    wager += comeEightOdds;
    var comeNine = $("#come_nine_bet").html() * 1;
    wager += comeNine;
    var comeNineOdds = $("#come_nine_odds").val() * 1;
    wager += comeNineOdds;
    var comeTen = $("#come_ten_bet").html() * 1;
    wager += comeTen;
    var comeTenOdds = $("#come_ten_odds").val() * 1;
    wager += comeTenOdds;

    var field = $("#field").val() * 1;
    wager += field;

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

    balance -= wager;
    $("#wager").html(wager);
    $("#balance").html(balance);

    if (balance < 0) {
        $("#auto_roll").prop("disabled", true);
        $("#manual_roll").prop("disabled", true);
    } else {
        $("#auto_roll").prop("disabled", false);
        $("#manual_roll").prop("disabled", false);
    }
}

function manualRoll() {
    var result_1 = $("#manual_die_1").val() * 1;
    var result_2 = $("#manual_die_2").val() * 1;

    displayResult(result_1 * 1, result_2 * 1);
    determinePayout(result_1, result_2);
    updateGame(result_1, result_2);
}

function roll() {
    var result_1 = Math.floor(Math.random() * 6) + 1;
    var result_2 = Math.floor(Math.random() * 6) + 1;

    displayResult(result_1, result_2);
    determinePayout(result_1, result_2);
    updateGame(result_1, result_2);
}

function displayResult(result_1, result_2) {
    totalRolls++;
    shooterRolls++;

    var rollTotal = result_1 + result_2;
    var die_1 = $("#result_die_1");
    var die_2 = $("#result_die_2");

    var prev1;
    var prev2;

    switch (rollTotal) {
        case 2:
            histogram["#histo_two"]++;
            break;
        case 3:
            histogram["#histo_three"]++;
            break;
        case 4:
            histogram["#histo_four"]++;
            break;
        case 5:
            histogram["#histo_five"]++;
            break;
        case 6:
            histogram["#histo_six"]++;
            break;
        case 7:
            histogram["#histo_seven"]++;
            break;
        case 8:
            histogram["#histo_eight"]++;
            break;
        case 9:
            histogram["#histo_nine"]++;
            break;
        case 10:
            histogram["#histo_ten"]++;
            break;
        case 11:
            histogram["#histo_eleven"]++;
            break;
        case 12:
            histogram["#histo_twelve"]++;
    }

    for (var key in histogram) {
        $(key).html(histogram[key]);
    }

    $("#percent_two").html((Math.floor(histogram["#histo_two"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_three").html((Math.floor(histogram["#histo_three"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_four").html((Math.floor(histogram["#histo_four"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_five").html((Math.floor(histogram["#histo_five"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_six").html((Math.floor(histogram["#histo_six"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_seven").html((Math.floor(histogram["#histo_seven"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_eight").html((Math.floor(histogram["#histo_eight"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_nine").html((Math.floor(histogram["#histo_nine"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_ten").html((Math.floor(histogram["#histo_ten"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_eleven").html((Math.floor(histogram["#histo_eleven"] * 100 / totalRolls * 100) / 100) + "%");
    $("#percent_twelve").html((Math.floor(histogram["#histo_twelve"] * 100 / totalRolls * 100) / 100) + "%");

    $("#total_rolls").html(totalRolls);


    // TODO: refactor to use the same image
    switch (result_1) {
        case 1:
            die_1.attr("src", "images/one.png");
            prev1 = $("<img>", {src: "images/one.png", height: 25, width: 25});
            break;
        case 2:
            die_1.attr("src", "images/two.png");
            prev1 = $("<img>", {src: "images/two.png", height: 25, width: 25});
            break;
        case 3:
            die_1.attr("src", "images/three.png");
            prev1 = $("<img>", {src: "images/three.png", height: 25, width: 25});
            break;
        case 4:
            die_1.attr("src", "images/four.png");
            prev1 = $("<img>", {src: "images/four.png", height: 25, width: 25});
            break;
        case 5:
            die_1.attr("src", "images/five.png");
            prev1 = $("<img>", {src: "images/five.png", height: 25, width: 25});
            break;
        case 6:
            die_1.attr("src", "images/six.png");
            prev1 = $("<img>", {src: "images/six.png", height: 25, width: 25});
    }

    switch (result_2) {
        case 1:
            die_2.attr("src", "images/one.png");
            prev2 = $("<img>", {src: "images/one.png", height: 25, width: 25});
            break;
        case 2:
            die_2.attr("src", "images/two.png");
            prev2 = $("<img>", {src: "images/two.png", height: 25, width: 25});
            break;
        case 3:
            die_2.attr("src", "images/three.png");
            prev2 = $("<img>", {src: "images/three.png", height: 25, width: 25});
            break;
        case 4:
            die_2.attr("src", "images/four.png");
            prev2 = $("<img>", {src: "images/four.png", height: 25, width: 25});
            break;
        case 5:
            die_2.attr("src", "images/five.png");
            prev2 = $("<img>", {src: "images/five.png", height: 25, width: 25});
            break;
        case 6:
            die_2.attr("src", "images/six.png");
            prev2 = $("<img>", {src: "images/six.png", height: 25, width: 25});
    }

    $("#shooter_rolls").html(shooterRolls);
    $("#shooter_count").html(shooterCount);

    $("#result").empty();
    if (working && rollTotal == 7) {
        shooterCount++;
        shooterRolls = 0;
        pointsMade = 0;
        $("#result").append("<div>Seven Out</div>");
    } else if (!working && (rollTotal == 7 || rollTotal == 11)) {
        $("#result").append("<div>Winner!</div>");
    } else if (working && rollTotal == point) {
        pointsMade++;
        $("#result").append("<div>Winner!</div>");
    }

    $("#points_made").html(pointsMade);

    $("#previous_rolls").empty();

    prevDiv = $("<div>", {class: "flex-col align-center p-1"});
    prevDiv.append(prev1);
    prevDiv.append(prev2);
    prevDiv.append(rollTotal);
    if (working && rollTotal == 7) {
        prevDiv.append("<div class=\"roll_result\">Seven out</div>");
    } else if (!working && rollTotal == 7) {
        prevDiv.append("<div class=\"roll_result\">Winner!</div>");
    } else if (working && rollTotal == point) {
        prevDiv.append("<div class=\"roll_result\">Winner!</div>")
    }

    previousRolls.unshift(prevDiv);

    for (i = 1; i < 10; i++) {
        $("#previous_rolls").append(previousRolls[i]);
    }
}

function determinePayout(die1, die2) {
    var rollTotal = die1 + die2;
    var payout = 0;

    if (working) {
        if (point == rollTotal) {
            payout += $("#pass_bet").val() * 1;
            payout -= $("#dont_bet").val() * 1;
            payout -= $("#dont_odds").val() * 1;
        }
        switch (rollTotal) {
            case 4: {
                payout += Math.floor($("#place_four").val() * 1 / 5 * 9);
                if (point == 4) {
                    payout += $("#pass_odds").val() * 1 * 2;
                }
                if (die1 == die2) {
                    payout += $("#hard_four").val() * 1 * 7;
                } else {
                    payout -= $("#hard_four").val() * 1;
                }
                break;
            }
            case 5: {
                payout += Math.floor($("#place_five").val() * 1 / 5 * 7);
                if (point == 5) {
                    payout += Math.floor($("#pass_odds").val() * 1 / 2 * 3);
                }
                break;
            }   
            case 6: {
                payout += Math.floor($("#place_six").val() * 1 / 6 * 7);
                if (point == 6) {
                    payout += Math.floor($("#pass_odds").val() * 1 * 1.2);
                }
                if (die1 == die2) {
                    payout += $("#hard_six").val() * 1 * 9;
                } else {
                    payout -= $("#hard_six").val() * 1;
                }
                break;
            }
            case 7: {
                payout -= $("#place_four").val() * 1;
                payout -= $("#place_five").val() * 1;
                payout -= $("#place_six").val() * 1;
                payout -= $("#place_eight").val() * 1;
                payout -= $("#place_nine").val() * 1;
                payout -= $("#place_ten").val() * 1;
                break;
            }
            case 8: {
                payout += Math.floor($("#place_eight").val() * 1 / 6 * 7);
                if (point == 8) {
                    payout += Math.floor($("#pass_odds").val() * 1 * 1.2);
                }
                if (die1 == die2) {
                    payout += $("#hard_eight").val() * 1 * 9;
                } else {
                    payout -= $("#hard_eight").val() * 1;
                }
                break;
            }
            case 9: {
                payout += Math.floor($("#place_nine").val() * 1 / 5 * 7);
                if (point == 9) {
                    payout += Math.floor($("#pass_odds").val() * 1 / 2 * 3);
                }
                break;
            }
            case 10: {
                payout += Math.floor($("#place_ten").val() * 1 / 5 * 9);
                if (point == 10) {
                    payout += $("#pass_odds").val() * 1 * 2;
                }
                if (die1 == die2) {
                    payout += $("#hard_ten").val() * 1 * 7;
                } else {
                    payout -= $("#hard_ten").val() * 1;
                }
                break;
            }
        }
    } else {
        switch (rollTotal) {
            case 2:
            case 3:
                payout -= Math.floor($("#pass_bet").val() * 1);
                payout += Math.floor($("#dont_bet").val() * 1);
                break;
            case 11:
                payout += Math.floor($("#pass_bet").val() * 1);
                payout -= Math.floor($("#dont_bet").val() * 1);
                break;
            case 12:
                payout -= Math.floor($("#pass_bet").val() * 1);
        }
    }

    switch (rollTotal) {
        case 2:
            payout += Math.floor($("#horn_two").val() * 1 * 30);
            payout += Math.floor($("#horn_high_two").val() * 1 / 5 * 2 * 30);
            payout += Math.floor($("#horn_high_three").val() * 1 / 5 * 30);
            payout += Math.floor($("#horn_high_eleven").val() * 1 / 5 * 30);
            payout += Math.floor($("#horn_high_twelve").val() * 1 / 5 * 30);

            payout += Math.floor($("#field").val() * 1 * 2);

            payout -= Math.floor($("#horn_three").val() * 1);
            payout -= Math.floor($("#horn_eleven").val() * 1);
            payout -= Math.floor($("#horn_twelve").val() * 1);

            payout -= Math.floor($("#come_bet").val() * 1);
            payout += Math.floor($("#dont_come").val() * 1);
            break;
        case 3:
            payout += Math.floor($("#horn_three").val() * 1 * 15);
            payout += Math.floor($("#horn_high_two").val() * 1 / 5 * 15);
            payout += Math.floor($("#horn_high_three").val() * 1 / 5 * 2 * 15);
            payout += Math.floor($("#horn_high_eleven").val() * 1 / 5 * 15);
            payout += Math.floor($("#horn_high_twelve").val() * 1 / 5 * 15);

            payout += Math.floor($("#field").val() * 1);
 
            payout -= Math.floor($("#horn_two").val() * 1);
            payout -= Math.floor($("#horn_eleven").val() * 1);
            payout -= Math.floor($("#horn_twelve").val() * 1);

            payout -= Math.floor($("#come_bet").val() * 1);
            payout += Math.floor($("#dont_come").val() * 1);
            break;
        case 4:
            payout += Math.floor($("#buy_four").val() * 1 * 2);
            payout -= Math.ceil($("#buy_four").val() * 1 / 20);

            payout -= Math.floor($("#lay_four").val() * 1);

            payout += $("#field").val() * 1;
            payout += $("#come_four_bet").html() * 1;
            payout += $("#come_four_odds").val() * 1 * 2;

            payout -= $("#dont_come_four_bet").html() * 1;
            payout -= $("#dont_come_four_odds").val() * 1;
            break;
        case 5: 
            payout += $("#buy_five").val() * 1 / 2 * 3;
            payout -=  Math.ceil($("#buy_five").val() * 1 / 20);

            payout -= $("#lay_five").val() * 1;
            payout -= $("#field").val() * 1;
            payout += $("#come_five_bet").html() * 1;
            payout += Math.floor($("#come_five_odds").val() * 1 / 2 * 3);

            payout -= $("#dont_come_five_bet").html() * 1;
            payout -= $("#dont_come_five_odds").val() * 1;
            break;
        case 6: {
            payout -= $("#field").val() * 1;
            payout += $("#come_six_bet").html() * 1;
            payout += Math.floor($("#come_six_odds").val() * 1 / 5 * 6);

            payout -= $("#dont_come_six_bet").html() * 1;
            payout -= $("#dont_come_six_odds").val() * 1;
            break;
        }
        case 8: {
            payout -= $("#field").val() * 1;
            payout += $("#come_eight_bet").html() * 1;
            payout += Math.floor($("#come_eight_odds").val() * 1 / 5 * 6);

            payout -= $("#dont_come_eight_bet").html() * 1;
            payout -= $("#dont_come_eight_odds").val() * 1;
            break;
        }
        case 9:
            payout += $("#buy_nine").val() * 1 / 2 * 3;
            payout -= Math.ceil($("#buy_nine").val() * 1 / 20);

            payout -= $("#lay_nine").val() * 1;

            payout += $("#field").val() * 1;
            payout += $("#come_nine_bet").html() * 1;
            payout += Math.floor($("#come_nine_odds").val() * 1 / 2 * 3);

            payout -= $("#dont_come_nine_bet").html() * 1;
            payout -= $("#dont_come_nine_odds").val() * 1;
            break;
        case 10:
            payout += $("#buy_ten").val() * 1 * 2;
            payout -= Math.ceil($("#buy_ten").val() * 1 / 20);

            payout -= $("#lay_ten").val() * 1;

            payout += $("#field").val() * 1;
            payout += $("#come_ten_bet").html() * 1;
            payout += $("#come_ten_odds").val() * 1 * 2;

            payout -= $("#dont_come_ten_bet").html() * 1;
            payout -= $("#dont_come_ten_odds").val() * 1;
            break;
        case 11:
            payout += $("#horn_eleven").val() * 1 * 15;
            payout += Math.floor($("#horn_high_two").val() * 1 / 5 * 15);
            payout += Math.floor($("#horn_high_three").val() * 1 / 5 * 15);
            payout += Math.floor($("#horn_high_eleven").val() * 1 / 5 * 2 * 15);
            payout += Math.floor($("#horn_high_twelve").val() * 1 / 5 * 15);

            payout += $("#field").val() * 1;
            payout += $("#come_bet").val() * 1;
            
            payout -= $("#horn_two").val() * 1;
            payout -= $("#horn_three").val() * 1;
            payout -= $("#horn_twelve").val() * 1;

            payout -= $("#dont_come").val() * 1;
            break;
        case 12:
            payout += $("#horn_twelve").val() * 1 * 30;
            payout += Math.floor($("#horn_high_two").val() * 1 / 5 * 30);
            payout += Math.floor($("#horn_high_three").val() * 1 / 5 * 30);
            payout += Math.floor($("#horn_high_eleven").val() * 1 / 5 * 30);
            payout += Math.floor($("#horn_high_twelve").val() * 1 / 5 * 2 * 30);

            payout += $("#field").val() * 1 * 3;

            payout -= $("#horn_two").val() * 1;
            payout -= $("#horn_three").val() * 1;
            payout -= $("#horn_eleven").val() * 1;

            payout -= $("#come_bet").val() * 1;
            break;
    }

    // handle other numbers and horn bets
    if (rollTotal != 2 && rollTotal != 3 && rollTotal != 11 && rollTotal != 12) {
        payout -= $("#horn_two").val() * 1;
        payout -= $("#horn_three").val() * 1;
        payout -= $("#horn_eleven").val() * 1;
        payout -= $("#horn_twelve").val() * 1;
        
        payout -= $("#horn_high_two").val() * 1;
        payout -= $("#horn_high_three").val() * 1;
        payout -= $("#horn_high_eleven").val() * 1;
        payout -= $("#horn_high_twelve").val() * 1;

        payout -= $("#any_craps").val() * 1;
    } else {
        payout += $("#any_craps").val() * 1 * 7;
    }

    // handle any seven
    if (rollTotal == 7) {
        payout += $("#any_seven").val() * 1 * 4;
        payout -= $("#field").val() * 1;

        var vig = 0;
        payout += $("#lay_four").val() * 1 / 2;
        vig += Math.floor($("#lay_four").val() * 1 / 2 / 20);
        payout += $("#lay_five").val() * 1 / 3 * 2;
        vig += Math.floor($("#lay_five").val() * 1 / 3 * 2 / 20);
        payout += $("#lay_nine").val() * 1 / 3 * 2;
        vig += Math.floor($("#lay_nine").val() * 1 / 3 * 2 / 20);
        payout += $("#lay_ten").val() * 1 / 2;
        vig += Math.floor($("#lay_ten").val() * 1 / 2 / 20);

        payout += $("#dont_come_four_bet").html() * 1;
        payout += Math.floor($("#dont_come_four_odds").val() * 1 / 2);
        payout += $("#dont_come_five_bet").html() * 1;
        payout += Math.floor($("#dont_come_five_odds").val() * 1 / 3 * 2);
        payout += $("#dont_come_six_bet").html() * 1;
        payout += Math.floor($("#dont_come_six_odds").val() * 1 / 6 * 5);
        payout += $("#dont_come_eight_bet").html() * 1;
        payout += Math.floor($("#dont_come_eight_odds").val() * 1 / 6 * 5);
        payout += $("#dont_come_nine_bet").html() * 1;
        payout += Math.floor($("#dont_come_nine_odds").val() * 1 / 3 * 2);
        payout += $("#dont_come_ten_bet").html() * 1;
        payout += Math.floor($("#dont_come_ten_odds").val() * 1 / 2);

        payout -= vig;

        payout -= $("#buy_four").val() * 1;
        payout -= $("#buy_five").val() * 1;
        payout -= $("#buy_nine").val() * 1;
        payout -= $("#buy_ten").val() * 1;

        if (working) {
            payout -= $("#pass_bet").val() * 1;
            payout -= $("#pass_odds").val() * 1;
            payout += $("#dont_bet").val() * 1;

            payout -= $("#hard_four").val() * 1;
            payout -= $("#hard_ten").val() * 1;
            payout -= $("#hard_six").val() * 1;
            payout -= $("#hard_eight").val() * 1;

            payout += $("#come_bet").val() * 1;
            payout -= $("#come_four_bet").html() * 1;
            payout -= $("#come_four_odds").val() * 1;
            payout -= $("#come_five_bet").html() * 1;
            payout -= $("#come_five_odds").val() * 1;
            payout -= $("#come_six_bet").html() * 1;
            payout -= $("#come_six_odds").val() * 1;
            payout -= $("#come_eight_bet").html() * 1;
            payout -= $("#come_eight_odds").val() * 1;
            payout -= $("#come_nine_bet").html() * 1;
            payout -= $("#come_nine_odds").val() * 1;
            payout -= $("#come_ten_bet").html() * 1;
            payout -= $("#come_ten_odds").val() * 1;

            switch (point) {
                case 4:
                    payout += Math.floor($("#dont_odds").val() * 1 / 2);
                    break;
                case 5:
                    payout += Math.floor($("#dont_odds").val() * 1 / 3 * 2);
                    break;
                case 6:
                    payout += Math.floor($("#dont_odds").val() * 1 / 6 * 5);
                    break;
                case 8: 
                    payout += Math.floor($("#dont_odds").val() * 1 / 6 * 5);
                    break;
                case 9:
                    payout += Math.floor($("#dont_odds").val() * 1 / 3 * 2);
                    break;
                case 10:
                    payout += Math.floor($("#dont_odds").val() * 1 / 2);
                    break;
            }
        } else {
            payout += $("#pass_bet").val() * 1;
            payout -= $("#dont_bet").val() * 1;
        }
    } else {
        payout -= $("#any_seven").val() * 1;
    }

    balance += payout;
    $("#balance").html(balance);
    $("#payout").html(payout);
}

function updateGame(die1, die2) {
    var rollTotal = die1 + die2;
    if (!working) {
        if (rollTotal == 4 || rollTotal == 5 || rollTotal == 6 || rollTotal == 8 || rollTotal == 9 || rollTotal == 10) {
            $("#puck_off").addClass("hide");
            $("#pass_bet").prop("disabled", true);
            if ($("#pass_bet").val() * 1 > 0) {
                $("#pass_odds").prop("disabled", false);
            }
            $("#dont_bet").prop("disabled", true);
            if ($("#dont_bet").val() * 1 > 0) {
                $("#dont_odds").prop("disabled", false);
            }

            $("#place_four").prop("disabled", false);
            $("#place_five").prop("disabled", false);
            $("#place_six").prop("disabled", false);
            $("#place_eight").prop("disabled", false);
            $("#place_nine").prop("disabled", false);
            $("#place_ten").prop("disabled", false);

            $("#come_bet").prop("disabled", false);
            $("#dont_come").prop("disabled", false);
        }
        switch (rollTotal) {
            case 2:
            case 3:
                $("#pass_bet").val("");
                break;
            case 4:
                $("#puck_four").removeClass("hide");
                $("#pass_odds").prop("max", $("#pass_bet").val() * 5);
                break;
            case 5:
                $("#puck_five").removeClass("hide");
                $("#pass_odds").prop("max", $("#pass_bet").val() * 4);
                break;
            case 6:
                $("#puck_six").removeClass("hide");
                $("#pass_odds").prop("max", $("#pass_bet").val() * 3);
                break;
            case 7:
                $("#dont_bet").val("");
                break;
            case 8:
                $("#puck_eight").removeClass("hide");
                $("#pass_odds").prop("max", $("#pass_bet").val() * 3);
                break;
            case 9:
                $("#puck_nine").removeClass("hide");
                $("#pass_odds").prop("max", $("#pass_bet").val() * 4);
                break;
            case 10:
                $("#puck_ten").removeClass("hide");
                $("#pass_odds").prop("max", $("#pass_bet").val() * 5);
                break;
            case 11:
                $("#dont_bet").val("");
                break;
            case 12:
                $("#pass_bet").val("");
        }
    } else {
        if (point == rollTotal) {
            $("#dont_bet").val("");
        } else if (rollTotal == 7) {
            $("#pass_bet").val("");
            $("#place_four").val("");
            $("#place_five").val("");
            $("#place_six").val("");
            $("#place_eight").val("");
            $("#place_nine").val("");
            $("#place_ten").val("");

            $("#hard_four").val("");
            $("#hard_six").val("");
            $("#hard_eight").val("");
            $("#hard_ten").val("");

            $("#come_bet").val("");
        }

        if (point == rollTotal || rollTotal == 7) {
            $("#pass_bet").prop("disabled", false);
            $("#pass_odds").prop("disabled", true);
            $("#pass_odds").val("");

            $("#dont_bet").prop("disabled", false);
            $("#dont_odds").prop("disabled", true);
            $("#dont_odds").val("");

            $("#dont_come").prop("disabled", true);

            $("#puck_off").removeClass("hide");
            $("#puck_four").addClass("hide");
            $("#puck_five").addClass("hide");
            $("#puck_six").addClass("hide");
            $("#puck_eight").addClass("hide");
            $("#puck_nine").addClass("hide");
            $("#puck_ten").addClass("hide");

            $("#place_four").prop("disabled", true);
            $("#place_five").prop("disabled", true);
            $("#place_six").prop("disabled", true);
            $("#place_eight").prop("disabled", true);
            $("#place_nine").prop("disabled", true);
            $("#place_ten").prop("disabled", true);
        }

        var comeBet = $("#come_bet").val() * 1;
        var dontComeBet = $("#dont_come").val() * 1;
        switch (rollTotal) {
            case 4:
                if (comeBet > 0) {
                    $("#come_four_bet").html(comeBet);
                    $("#come_four").removeClass("hide");
                } else {
                    $("#come_four_bet").html("");
                    $("#come_four_odds").val("");
                    $("#come_four").addClass("hide");
                }
                if ($("#dont_come_four_bet").html() * 1 > 0) {
                    $("#dont_come_four_bet").html("");
                    $("#dont_come_four_odds").val("");
                }
                if (dontComeBet > 0) {
                    $("#dont_come_four_bet").html(dontComeBet);
                    $("#dont_come_four").removeClass("hide");
                } else {
                    $("#dont_come_four_bet").html("");
                    $("#dont_come_four_odds").val("");
                    $("#dont_come_four").addClass("hide");
                }
                if (die1 != die2) {
                    $("#hard_four").val("");
                }
                break;
            case 5:
                if (comeBet > 0) {
                    $("#come_five_bet").html(comeBet);
                    $("#come_five").removeClass("hide");
                } else {
                    $("#come_five_bet").html("");
                    $("#come_five_odds").val("");
                    $("#come_five").addClass("hide");
                }
                if ($("#dont_come_five_bet").html() * 1 > 0) {
                    $("#dont_come_five_bet").html("");
                    $("#dont_come_five_odds").val("");
                }
                if (dontComeBet > 0) {
                    $("#dont_come_five_bet").html(dontComeBet);
                    $("#dont_come_five").removeClass("hide");
                } else {
                    $("#dont_come_five_bet").html("");
                    $("#dont_come_five_odds").val("");
                    $("#dont_come_five").addClass("hide");
                }
                break;
            case 6:
                if (comeBet > 0) {
                    $("#come_six_bet").html(comeBet);
                    $("#come_six").removeClass("hide");
                } else {
                    $("#come_six_bet").html("");
                    $("#come_six_odds").val("");
                    $("#come_six").addClass("hide");
                }
                if ($("#dont_come_six_bet").html() * 1 > 0) {
                    $("#dont_come_six_bet").html("");
                    $("#dont_come_six_odds").val("");
                }
                if (dontComeBet > 0) {
                    $("#dont_come_six_bet").html(dontComeBet);
                    $("#dont_come_six").removeClass("hide");
                } else {
                    $("#dont_come_six_bet").html("");
                    $("#dont_come_six_odds").val("");
                    $("#dont_come_six").addClass("hide");
                }
                if (die1 != die2) {
                    $("#hard_six").val("");
                }
                break;
            case 8:
                if (comeBet > 0) {
                    $("#come_eight_bet").html(comeBet);
                    $("#come_eight").removeClass("hide");
                } else {
                    $("#come_eight_bet").html("");
                    $("#come_eight_odds").val("");
                    $("#come_eight").addClass("hide");
                }
                if ($("#dont_come_eight_bet").html() * 1 > 0) {
                    $("#dont_come_eight_bet").html("");
                    $("#dont_come_eight_odds").val("");
                }
                if (dontComeBet > 0) {
                    $("#dont_come_eight_bet").html(dontComeBet);
                    $("#dont_come_eight").removeClass("hide");
                } else {
                    $("#dont_come_eight_bet").html("");
                    $("#dont_come_eight_odds").val("");
                    $("#dont_come_eight").addClass("hide");
                }
                if (die1 != die2) {
                    $("#hard_eight").val("");
                }
                break;
            case 9:
                if (comeBet > 0) {
                    $("#come_nine_bet").html(comeBet);
                    $("#come_nine").removeClass("hide");
                } else {
                    $("#come_nine_bet").html("");
                    $("#come_nine_odds").val("");
                    $("#come_nine").addClass("hide");
                }
                if ($("#dont_come_nine_bet").html() * 1 > 0) {
                    $("#dont_come_nine_bet").html("");
                    $("#dont_come_nine_odds").val("");
                }
                if (dontComeBet > 0) {
                    $("#dont_come_nine_bet").html(dontComeBet);
                    $("#dont_come_nine").removeClass("hide");
                } else {
                    $("#dont_come_nine_bet").html("");
                    $("#dont_come_nine_odds").val("");
                    $("#dont_come_nine").addClass("hide");
                }
                break;
            case 10:
                if (comeBet > 0) {
                    $("#come_ten_bet").html(comeBet);
                    $("#come_ten").removeClass("hide");
                } else {
                    $("#come_ten_bet").html("");
                    $("#come_ten_odds").val("");
                    $("#come_ten").addClass("hide");
                }
                if ($("#dont_come_ten_bet").html() * 1 > 0) {
                    $("#dont_come_ten_bet").html("");
                    $("#dont_come_ten_odds").val("");
                }
                if (dontComeBet > 0) {
                    $("#dont_come_ten_bet").html(dontComeBet);
                    $("#dont_come_ten").removeClass("hide");
                } else {
                    $("#dont_come_ten_bet").html("");
                    $("#dont_come_ten_odds").val("");
                    $("#dont_come_ten").addClass("hide");
                }
                if (die1 != die2) {
                    $("#hard_ten").val("");
                }
        }
    }

    switch (rollTotal) {
        case 4: {
            $("#lay_four").val("");
            break;
        }
        case 5: {
            $("#lay_five").val("");
            $("#field").val("");
            break;
        }
        case 6: {
            $("#field").val("");
            break;
        }
        case 7: {
            $("#buy_four").val("");
            $("#buy_five").val("");
            $("#buy_nine").val("");
            $("#buy_ten").val("");

            $("#come_four").addClass("hide");
            $("#come_four_bet").html("");
            $("#come_four_odds").val("");
            $("#come_five").addClass("hide");
            $("#come_five_bet").html("");
            $("#come_five_odds").val("");
            $("#come_six").addClass("hide");
            $("#come_six_bet").html("");
            $("#come_six_odds").val("");
            $("#come_eight").addClass("hide");
            $("#come_eight_bet").html("");
            $("#come_eight_odds").val("");
            $("#come_nine").addClass("hide");
            $("#come_nine_bet").html("");
            $("#come_nine_odds").val("");
            $("#come_ten").addClass("hide");
            $("#come_ten_bet").html("");
            $("#come_ten_odds").val("");

            $("#dont_come_four").addClass("hide");
            $("#dont_come_four_bet").html("");
            $("#dont_come_four_odds").val("");
            $("#dont_come_five").addClass("hide");
            $("#dont_come_five_bet").html("");
            $("#dont_come_five_odds").val("");
            $("#dont_come_six").addClass("hide");
            $("#dont_come_six_bet").html("");
            $("#dont_come_six_odds").val("");
            $("#dont_come_eight").addClass("hide");
            $("#dont_come_eight_bet").html("");
            $("#dont_come_eight_odds").val("");
            $("#dont_come_nine").addClass("hide");
            $("#dont_come_nine_bet").html("");
            $("#dont_come_nine_odds").val("");
            $("#dont_come_ten").addClass("hide");
            $("#dont_come_ten_bet").html("");
            $("#dont_come_ten_odds").val("");

            $("#field").val("");
            break;
        }
        case 8: {
            $("#field").val("");
            break;
        }
        case 9: {
            $("#lay_nine").val("");
            break;
        }
        case 10: {
            $("#lay_ten").val("");
            break;
        }
    }

    // handle horns
    if (rollTotal == 2) {
        $("#horn_high_three").val("");
        $("#horn_high_eleven").val("");
        $("#horn_high_twelve").val("");

        $("#horn_three").val("");
        $("#horn_eleven").val("");
        $("#horn_twelve").val("");

        $("#come_bet").val("");
    } else if (rollTotal == 3) {
        $("#horn_high_two").val("");
        $("#horn_high_eleven").val("");
        $("#horn_high_twelve").val("");

        $("#horn_two").val("");
        $("#horn_eleven").val("");
        $("#horn_twelve").val("");

        $("#come_bet").val("");
    } else if (rollTotal == 11) {
        $("#horn_high_two").val("");
        $("#horn_high_three").val("");
        $("#horn_high_twelve").val("");

        $("#horn_two").val("");
        $("#horn_three").val("");
        $("#horn_twelve").val("");

        $("#dont_come").val("");
    } else if (rollTotal == 12) {
        $("#horn_high_two").val("");
        $("#horn_high_three").val("");
        $("#horn_high_eleven").val("");

        $("#horn_two").val("");
        $("#horn_three").val("");
        $("#horn_eleven").val("");

        $("#come_bet").val("");
    } else {
        $("#horn_high_two").val("");
        $("#horn_high_three").val("");
        $("#horn_high_eleven").val("");
        $("#horn_high_twelve").val("");

        $("#horn_two").val("");
        $("#horn_three").val("");
        $("#horn_eleven").val("");
        $("#horn_twelve").val("");
        
        $("#any_craps").val("");
        $("#dont_come").val("");
    }

    // come bet comes down except on 11
    if (rollTotal !== 11 && rollTotal !== 7) {
        $("#come_bet").val("");
    }

    // working check
    if (rollTotal == 7 || point == rollTotal) {
        working = false;
        point = 0;
        $("#come_bet").prop("disabled", true);
        $("#dont_come").prop("disabled", true);
    } else if (!working && (rollTotal == 4 || rollTotal == 5 || rollTotal == 6 || rollTotal == 8 || rollTotal == 9 || rollTotal == 10)) {
        working = true;
        point = rollTotal;
    }
    
    if (rollTotal !== 7) {
        $("#any_seven").val("");
    }

    handleBetChange();
}

function buyin() {
    balance += $("#buy_in").val() * 1;
    handleBetChange();
    $("#buy_in").val("");
}

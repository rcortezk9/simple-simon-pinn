/**
 * Created by renecortez on 5/1/17.
 */
$(document).ready(function () {
    'use strict';
//    Starting Variables
    var simonSays = [];
    var playerSays = [];
    var simonSequence = "";
    var playerSequence = "";
    var round = 1; // Starting 'level' of the game. A max of 20 rounds
    var press = 0; // the index of simonSays array, i.e. simon's pad presses
    var mode = "safe"; // safe and strict


//    Audio files
//    var greenBoop =
//    var redBoop =
//    var yellowBoop =
//    var blueBoop =
//    var scream =
//    var cheer =


//    Functions for when the pads are press
    function greenPad() {
        $(".tl").css("background-color", "#96ff96");
        setTimeout(function() {
            $(".tl").css("background-color", "green");
        }, 500);
        // greenBoop.play();
    }

    function redPad() {
        $(".tr").css("background-color", "#ff8a8a");
        setTimeout(function() {
            $(".tr").css("background-color", "red");
        }, 500);
        // redBoop.play();
    }

    function yellowPad() {
        $(".bl").css("background-color", "#fcffa8");
        setTimeout(function() {
            $(".bl").css("background-color", "yellow");
        }, 500);
        // yellowBoop.play();
    }

    function bluePad() {
        $(".br").css("background-color", "#adb3ff");
        setTimeout(function() {
            $(".br").css("background-color", "blue");
        }, 500);
        // blueBoop.play();
    }

//    Populate Simon says
    function simonSaysWhat(){
        simonSays = [];
        for(var i = 0; i < 20; i++){
            simonSays.push(Math.floor(Math.random()*4)+1);
        }
    }

//    Simon's Play.  Make sure there is at least a one second wait between Simon's choices
    function simonTurn() {
        setTimeout(function() {
            if (simonSays[press] === 1) {
                greenPad();
            } else if (simonSays[press] === 2) {
                redPad();
            } else if (simonSays[press] === 3) {
                yellowPad();
            } else if (simonSays[press] === 4) {
                bluePad();
            }
            press++;
            if (press < round) {
                simonTurn();
            }
        }, 500)
    }
//    Compare players sequence to simon's sequence match.
    function comparedSequence() {
        simonSequence = simonSays.slice(0, round).join("");
        playerSequence = playerSays.join("");
        if (simonSequence === playerSequence) {
            return true;
        } else {
            return false;
        }
    }

//    Reset play
    function playReset() {
        press = 0;
        playerSays = [];
    }

//    reset game
    function gameReset() {
        playReset();
        round = 1;
        $(".display").text("01");
        simonSaysWhat();
    }

//    Update display
    function displayUpdate() {
        if (round < 10) {
            $(".display").text("0" + round);
        } else {
            $(".display").text(round);
        }
    }

//    Determine when to the next round

    function nextRound(){
        if (round < 20){
            if (playerSays.length === round){
                if (comparedSequence()){
                    round++;
                    displayUpdate();
                    playReset();
                    simonTurn();
                } else {
                    if (mode === 'safe'){
                        $('.display').text('!!');
                        playReset();
                        setTimeout(displayUpdate, 1000);
                        setTimeout(simonTurn, 500);
                    } else {
                        $('.display').text('XX');
                        // scream.play();
                    }
                }
            }
        } else if (playerSays.length === round && round === 20){
            if (comparedSequence()) {
                $('.display').text(';)');
                // cheer.play();
            } else {
                if (mode === 'safe'){
                    $('.display').text('?!');
                    playReset();
                    setTimeout(displayUpdate, 1000);
                    setTimeout(simonTurn, 500);
                } else {
                    $('.display').text('XX');
                    // scream.play();
                }
            }
        }
    }

    // Click
    $("#1").on("click", function() {
        greenPad();
        playerSays.push(1);
        nextRound();
    });


    $("#2").on("click", function() {
        redPad();
        playerSays.push(2);
        nextRound();
    });


    $("#3").on("click", function() {
        yellowPad();
        playerSays.push(3);
        nextRound();
    });


    $("#4").on("click", function() {
        bluePad();
        playerSays.push(4);
        nextRound();
    });

    // Start button
    $("#start-button").on("click", function() {
        gameReset();
        simonTurn();
    });

    //strict button
    $("#strict-button").on("click", function() {
        if (mode === "safe") {
            $("#strict-button").css({
                "background-color": "rgb(217, 0, 0)",
                "color": "yellow"
            });
            mode = "strict";
        } else {
            $("#strict-button").css({
                "background-color": "rgb(217, 83, 79)",
                "color": "white"
            });
            mode = "safe";
        }
    })

});
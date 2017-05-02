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
//     var greenBoop =
//     var redBoop =
//     var yellowBoop =
//     var blueBoop =


//    Functions for when the pads are press
    function greenPad() {
        $(".tl").css("background-color", "gba(150, 255, 150, 1)");
        setTimeout(function() {
            $(".tl").css("background-color", "green");
        }, 1000);
        greenBoop.play();
    }

    function redPad() {
        $(".tr").css("background-color", "rgba(255, 150, 150, 1)");
        setTimeout(function() {
            $(".tr").css("background-color", "red");
        }, 1000);
        redBoop.play();
    }

    function yellowPad() {
        $(".bl").css("background-color", "rgba(150, 255, 150, 1)");
        setTimeout(function() {
            $(".bl").css("background-color", "yellow");
        }, 1000);
        yellowBoop.play();
    }

    function bluePad() {
        $(".br").css("background-color", "rgba(150, 255, 150, 1)");
        setTimeout(function() {
            $(".br").css("background-color", "blue");
        }, 1000);
        blueBoop.play();
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
                simonPlays();
            }
        }, 1500)
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
        simonSayWhat();
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
            if (playerSays === round){
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

                    }

                }
            }
        }
    }

});
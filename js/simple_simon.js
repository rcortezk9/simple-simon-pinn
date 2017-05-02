/**
 * Created by renecortez on 5/1/17.
 */
$(document).ready(function () {
    'use strict'
//    Starting Variables
    var simonSays = [];
    var playerSays = [];
    var simonSequence = "";
    var playerSequence = "";
    var round = 1; // the 'level' of the game, max 20
    var press = 0; // the index of simonSays array, i.e. simon's pad presses
    var mode = "safe" // safe and strict


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
    function simonSays(){
        simonSays = [];
        for(i = 0; i < 20; i++){
            simonSays.push(Math.floor(Math.random()*4)+1);
        }
    }

//    Simon's turn.  Make sure there is like at least a one second wait between Simon's choices

//    Compare players sequence to simon's sequence match.

//    Reset play

//    reset game

//    Update display

});
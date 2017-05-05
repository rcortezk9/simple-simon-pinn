/**
 * Created by renecortez on 5/1/17.
 */
$(document).ready(function () {
    'use strict';

//    to put into strict mode
    var isStrict = false;
//    to power on
    var isOn = false;
//    if started
    var hasStarted = false;
//    store sequence
    var sequence = [];
//    current round
    var round = 0;
//    user input (inclusive 0-3)
    var press = -1;

    //event listener of the 4 buttons
    $("#handheld").on("mousedown",".clickable",function(event) {
        //only if start button has been pressed
        //hasStarted sets true
        if (hasStarted) {
            var id = event.target.id;

            switch (id) {
                case "tl":
                    press = 0;
                    break;
                case "tr":
                    press = 1;
                    break;
                case "br":
                    press = 2;
                    break;
                case "bl":
                    press = 3;
                    break;
            }
        }
    });

    $("#slider-box").click(function(){
        isOn = !isOn;
        $("#slider").toggleClass("on");
        if(!isOn){
            //turning off the game
            $("#indicator").removeClass("ind-on");
            isStrict=false;
            resetGame();
            display("");
        }else{
            //turning on the game
            display("--");
        }
    });

    $("#strict-btn").click(function(){
        //switching strict mode
        if(isOn){
            isStrict=!isStrict;
            $("#indicator").toggleClass("ind-on");
        }
    });

    $("#start-btn").click(function(){
        //start the game
        if(isOn) {
            startGame();
        }
    });
    //function to reset the game, but not start
    function resetGame(){
        hasStarted=false;
        press = -1;
        sequence = [];
        press = 0;
        display ("--");
        setTimeout(function(){
            $("#board div").removeClass("clickable");
        },500);
    }

    //function to start the game
    function startGame(){
        $("#handheld div").addClass("clickable");
        sequence = [];
        press = -1;
        hasStarted = true;
        //adding the first entry to our sequence
        addRandomNumber();
        //starting iteration through the sequence
        iterateThrough();
        press = 1;
        display(level);
    }

    //function to display data about game
    function display(data){
        if(data===""){
            $("#display").text("");
        }else{
            //display 2 characters string prepending 0-s if needed
            data="00"+data;
            data=data.substring(data.length-2);
            $("#display").text(data);
            //"blinking" effect
            setTimeout(function(){
                $("#display").css("color","#ccc");
            },300);
            setTimeout(function(){
                $("#display").css("color","#2ECC40");
            },600);

        }
    }

    //adding random number in range 0-3 inclusive
    function addRandomNumber(){
        var index=Math.floor(Math.random() * 4);
        sequence.push(index);
    }

    function iterateThrough(){

        if(hasStarted){
            //make the buttons unclickable during simon's sequence
            $("#handheld div").removeClass("clickable");
            playSequence(0);
            //after playing the sequence - wait user input
            checkInput(0);
        }
    }

    //make button clickable for player's sequence
    function playSequence(i){
        if(i>=sequence.length||!hasStarted){
            $("#handheld div").addClass("clickable");
            return;
        }
        playTune(sequence[i]);
        setTimeout(function(){playSequence(i+1)},800);
    }

    //play tune from the sequence
    function playTune(index){
        var id=null;
        switch(index){
            case 0:
                id="button-tl";
                break;
            case 1:
                id="button-tr";
                break;
            case 2:
                id="button-br";
                break;
            case 3:
                id="button-bl";
                break;
        }
        btnData[id].play();
        //effect to when pressing the button
        $("#"+id).addClass("clickeffect");
        setTimeout(function(){
            $("#"+id).removeClass("clickeffect");
        }, 400);
    }
// //    Starting Variables
//     var simonSays = [];
//     var playerSays = [];
//     var simonSequence = "";
//     var playerSequence = "";
//     var round = 1; // Starting 'level' of the game. A max of 20 rounds
//     var press = 0; // the index of simonSays array, i.e. simon's pad presses
//     var mode = "safe"; // safe and strict
//     var i = 0;
//
//
// //    Audio files
//     var greenBoop = new Audio ('audio/simonSound1.mp3');
//     var redBoop = new Audio ('audio/simonSound2.mp3');
//     var yellowBoop = new Audio ('audio/simonSound3.mp3');
//     var blueBoop = new Audio ('audio/simonSound4.mp3');
//     var scream = new Audio ('audio/scream.mp3');
//     var cheer = new Audio ('audio/cheering.mp3');
//
//
// //    Functions for when the pads are press
//     function greenPad() {
//         $(".tl").css("background-color", "#96ff96");
//         setTimeout(function() {
//             $(".tl").css("background-color", "green");
//         }, 500);
//         greenBoop.play();
//     }
//
//     function redPad() {
//         $(".tr").css("background-color", "#ff8a8a");
//         setTimeout(function() {
//             $(".tr").css("background-color", "red");
//         }, 500);
//         redBoop.play();
//     }
//
//     function yellowPad() {
//         $(".bl").css("background-color", "#ffffbd");
//         setTimeout(function() {
//             $(".bl").css("background-color", "yellow");
//         }, 500);
//         yellowBoop.play();
//     }
//
//     function bluePad() {
//         $(".br").css("background-color", "#adb3ff");
//         setTimeout(function() {
//             $(".br").css("background-color", "blue");
//         }, 500);
//         blueBoop.play();
//     }
//
// //    Populate Simon says
//     function simonSaysWhat(){
//         simonSays = [];
//         for(var i = 0; i < 20; i++){
//             simonSays.push(Math.floor(Math.random()*4)+1);
//         }
//     }
//
// //    Simon's Play.  Make sure there is at least a one second wait between Simon's choices
//     function simonTurn() {
//         setTimeout(function() {
//             if (simonSays[press] === 1) {
//                 greenPad();
//             } else if (simonSays[press] === 2) {
//                 redPad();
//             } else if (simonSays[press] === 3) {
//                 yellowPad();
//             } else if (simonSays[press] === 4) {
//                 bluePad();
//             }
//             press++;
//             if (press < round) {
//                 simonTurn();
//             }
//         }, 1000)
//     }
// //    Compare players sequence to simon's sequence match.
//     function comparedSequence() {
//         console.log("comparedSequence fired");
//         simonSequence = simonSays.slice(0, round).join("");
//         playerSequence = playerSays.join("");
//         if (simonSequence === playerSequence) {
//             return true;
//         } else {
//             playReset();
//             return false;
//         }
//     }
//
// //    Reset play
//     function playReset() {
//         press = 0;
//         playerSays = [];
//     }
//
// //    reset game
//     function gameReset() {
//         playReset();
//         round = 1;
//         $(".display").text("01");
//         simonSaysWhat();
//     }
//
// //    Update display
//     function displayUpdate() {
//         if (round < 10) {
//             $(".display").text("0" + round);
//         } else {
//             $(".display").text(round);
//         }
//     }
//
// //    Determine when to the next round
//
//     function nextRound(){
//         if (round < 20){
//             if (playerSays.length === round){
//                 if (comparedSequence()){
//                     round++;
//                     displayUpdate();
//                     playReset();
//                     simonTurn();
//                 } else {
//                     if (mode === 'safe'){
//                         $('.display').text('!!');
//                         playReset();
//                         setTimeout(displayUpdate, 1000);
//                         setTimeout(simonTurn, 500);
//                     } else {
//                         $('.display').text('XX');
//                         scream.play();
//                     }
//                 }
//             }
//         } else if (playerSays.length === round && round === 20){
//             if (comparedSequence()) {
//                 $('.display').text(':)');
//                 cheer.play();
//             } else {
//                 if (mode === 'safe'){
//                     $('.display').text('?!');
//                     playReset();
//                     setTimeout(displayUpdate, 1000);
//                     setTimeout(simonTurn, 500);
//                 } else {
//                     $('.display').text('XX');
//                     scream.play();
//                 }
//             }
//         }
//     }
//
//     // Click
//     $("#1").on("click", function() {
//         greenPad();
//         playerSays.push(1);
//         nextRound();
//     });
//
//
//     $("#2").on("click", function() {
//         redPad();
//         playerSays.push(2);
//         nextRound();
//     });
//
//
//     $("#3").on("click", function() {
//         yellowPad();
//         playerSays.push(3);
//         nextRound();
//     });
//
//
//     $("#4").on("click", function() {
//         bluePad();
//         playerSays.push(4);
//         nextRound();
//     });
//
//     // Start button
//     $("#start-button").on("click", function() {
//         gameReset();
//         simonTurn();
//     });
//
//     //strict button
//     $("#strict-button").on("click", function() {
//         if (mode === "safe") {
//             $("#strict-button").css({
//                 "background-color": "rgb(217, 0, 0)",
//                 "color": "yellow"
//             });
//             mode = "strict";
//         } else {
//             $("#strict-button").css({
//                 "background-color": "rgb(217, 83, 79)",
//                 "color": "white"
//             });
//             mode = "safe";
//         }
//     })

});
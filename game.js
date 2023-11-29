var gamePattern = [];  //for storing computer random picked colors
var userClickedPattern = []; //for storing user picked colors
var buttonName; //for storing id name of the randomly chosen color
var levelValue = 0;  //for incrementing level value
var stage = 1;  // when clearing the level -> 1  |  when failed the level -> 0
var started = false;  // uses to toggle the nextSequence() only for the first keypress
var userChosenColor;  // for storing the recent color picked by user


checkScreenSize();

$(window).resize(function() {
    checkScreenSize();
});

$(".startBtn").click(function(){
    if (!started) {  //toggle code
        $(".startBtn").hide();
        nextSequence();
    }
})


// player field
$(".btn").click(function () {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    $(this).addClass("pressed");
    var self = $(this);
    setTimeout(function () {
        $(self).removeClass("pressed");
    }, 100);

    checkAnswer();  // check answer after every user click
})

$(document).keydown(function () {
    if (!started) {  //toggle code
        nextSequence();
    }
});

function nextSequence() {
    stage = 1;
    levelValue += 1;
    $("h1").text("level " + levelValue);
    started = true;
    var button = $(".btn");
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = $(button[randomNumber]).attr("id");
    gamePattern.push(randomChosenColor);
    buttonName = "#" + randomChosenColor;   // custom id

    playSound(randomChosenColor);

    $(buttonName).addClass("pressed");
    setTimeout(function () {
        $(buttonName).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    for (let i = 0; i < userClickedPattern.length; i++) {  // check answer after every user click
        if (userClickedPattern[i] !== gamePattern[i]) {
            gameOver();
        }
    }
    
    if (gamePattern.length === userClickedPattern.length && stage === 1) { // next level when user clicks same number of color as the computer and clear the current level
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}

function playSound(name) {
    var audioPath = "./sounds/" + name + ".mp3";
    var sound = new Audio(audioPath);
    sound.play();
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
    playSound("wrong");
    levelValue = 0;

    if($(window).width() < 992){
        $("h1").text("Press Restart To Play");
        $(".startBtn").html("Restart");
        $(".startBtn").show();
    }

    else{
        $("h1").text("Game Over, Press Any Key to Restart");
    }

    started = false;
    gamePattern = [];
    userClickedPattern = [];
    stage = 0;
}

function checkScreenSize(){
    if($(window).width() < 992){
        $("h1").text("Press Start To Play");
        $(".startBtn").show();
    }
    
    else{
        $(".startBtn").hide();
    }    
}

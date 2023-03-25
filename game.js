var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function() {
    if(!started){
        $(".start-btn").hide(100);
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});
$(".start-btn").click(function() {
    $(".start-btn").hide(100);
    if(!started){
        
        $("h1").text("Level "+level);
        setTimeout(function(){
            nextSequence();
        },1000);
        
        started=true;
    }
});


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// calling game starting function

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        var audio = new Audio("wrong.mp3");
        audio.play();
        console.log("wrong");


        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key/Tap on start to Restart");

        //calling funtion after game over
        $(".start-btn").show(100);
        $(".start-btn").text("Restart");
        $(".start-btn").click(function() {
            $(".start-btn").hide(100);
            if(!started){
                
                $("h1").text("Level "+level);
                nextSequence();
                started=true;
            }
        });

        gameOver();
    }
}


function nextSequence() {
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level++;
    $("h1").text("Level "+level);
    
}

// playing sound

function playSound(name){
    var audio = new Audio(name+".mp3");
    audio.play();
}

// button click animation

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

// game over funtion

function gameOver(){
    level = 0;
    gamePattern=[];
    started=false;
}


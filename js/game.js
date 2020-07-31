var gamePattern = [];
var buttonColours = [ "red", "blue", "green", "yellow" ];
var useChoosenPattern =[];
var level = 0;
var started = false;





$(document).keypress(function(){
   if(!started){ 
       $("#level-title").text('Level'+level);
       nextSequence();
        
        started = true;
   }
});
function nextSequence(){
    useChoosenPattern = [];

    level++;
    
    $("#level-title").text('Level '+level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChoosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChoosenColour);
    // console.log(gamePattern);
    $("#"+randomChoosenColour).fadeOut(100).fadeIn(100);
    
    var audio = new Audio("sounds/" + randomChoosenColour + ".mp3");
    audio.play();
  
}

$(".btn").click(function(e){
    var idClicked = e.target.id;
    useChoosenPattern.push(idClicked);
    playSound(idClicked);
    animatePress(idClicked);
    // console.log(useChoosenPattern);
    checkAnswer(useChoosenPattern.length-1);
});

function  playSound(name) {
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
 
function animatePress(currentColour){
    console.log("ye hai"+currentColour);
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel) {
    if(useChoosenPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if(useChoosenPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }   
    else{
        console.log("wrong");
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("h1").text("Game Over! Press any key to restart");
        $(document).addClass("game-over");
        setTimeout(function(){
            $(document).removeClass("game-over");
        },500);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}
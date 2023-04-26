// ARRAY 
var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userPattern= []
var highestScore = []
var switcher= false
var level = 1
var generatedColour
var selectedColour

// starter Keypress
    $(document).keypress(function(){
        $("#level-title").html("Level "+ 0)
        if (!switcher) {
            newSequence()
            switcher = true
        } 
    })

// User choice 
    $(".btn").click(function(){
        selectedColour = this.id
        userPattern.push(selectedColour)
        console.log("You selected: "+ selectedColour)
        console.log(level)
        playSound(selectedColour)
        checkArray(userPattern.length - 1)
        showAnimation(selectedColour)
    })
// Generate Random Variable 

    function newSequence(){
        userPattern = []
        var randomNumber= Math.floor(Math.random()*4)
        var generatedColour = buttonColours[randomNumber]
        gamePattern.push(generatedColour)
        console.log("generated colour is: "+ generatedColour)
        showAnimation(generatedColour)
        playSound(generatedColour)
    }

// Check the answer

    function checkArray(currentLevel){
        if (userPattern[currentLevel] === gamePattern[currentLevel]){
            console.log(gamePattern)
            console.log(userPattern)
            if(gamePattern.length == userPattern.length){           
                setTimeout(function () {
                    newSequence()
                  }, 1000)
                $("h1").html("Level "+ level++)
                highestScore.push(level-1)
                var max = Math.max.apply(null, highestScore)
                highestLevel(max)
            }
        }
        
        else {
            $("body").addClass("game-over")
            $("#level-title").text("Game Over, Press any key to Restart")
            setTimeout(function () {
                $("body").removeClass("game-over")
              }, 1500)
            // highestScore.push(level)
            console.log(level)
            gameOver()

            
        }
    }
//


//play sound 
    function playSound(noise){
        var audioRandom = new Audio('sounds/'+noise+'.mp3')
        audioRandom.play()
    }

// Animation

    function showAnimation(light){
        setTimeout(function() { 
            $("#"+light).addClass("pressed")
        }, 200)
        $("#"+light).addClass("pressed")
        setTimeout(function() { 
            $("#"+light).removeClass("pressed")
        }, 500)
    }


// Game Over
    function gameOver(){
        playSound("wrong")
        gamePattern = []
        console.log(userPattern)
        switcher = false
        level = 1
    }

// Highest Score 
    function highestLevel(reachedLevel){
        console.log(highestScore)
        $("#highest").html("Highest Score: " + reachedLevel)
    }

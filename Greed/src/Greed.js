function ThrowDice(spot){   
    const spotElements = document.getElementsByClassName(spot)
    for(let i = 0; i < spotElements.length; i++) {
        spotElements[i].value = Math.ceil(Math.random() * 6)
    }
}

const pointsTable = {
    111: 1000,
    666: 600,
    555: 500,
    444: 400,
    333: 300,
    222: 200,
    1: 100,
    5: 50
}

function ShowScore(score) { 
   const output = document.getElementById("showScore");

   output.innerText = score;
};

function ScoreCalculator(...diceValues){
    let totalPoints = 0;
    let combinations = Object.keys(pointsTable);
    diceValues.sort();

    //look through all the dice values and add up the score
    let currentDiceSet = "";
    for (let i = 0; i < diceValues.length; i++) {
        currentDiceSet = diceValues[i].toString();
        //this if (and everything in it) should definitely be a function (will need a couple tweeks though)
        if(i + 1 < diceValues.length) {
            if(diceValues[i + 1] === diceValues[i]) {
                currentDiceSet += diceValues[i + 1]
                i++;
            }

            if(i + 1 < diceValues.length) {
                if(diceValues[i + 1] === diceValues[i]){
                    currentDiceSet += diceValues[i + 1]
                    i++;
                }
            }
        }
        //search the our points table for a combination of the three values as a string
        if(combinations.includes(currentDiceSet)){
            totalPoints += pointsTable[currentDiceSet];
        }
        //beautiful code
        else if(combinations.includes(currentDiceSet[0])){
            totalPoints += currentDiceSet.length === 2 ? pointsTable[currentDiceSet[0]] * 2 : pointsTable[currentDiceSet[0]]
        }
        currentDiceSet = 0;
    }

    return totalPoints;
}
console.log(ScoreCalculator(4,2,3,3,4))

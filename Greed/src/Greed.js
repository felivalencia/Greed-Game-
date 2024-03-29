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
    diceValues.sort();
    //look through all the dice values and add up the score
    let keyToMatch = "";

    let currentDiceSet = 0;
    for (let i = 0; i < diceValues.length; i++) {
        currentDiceSet += diceValues[i];
        //this if (and everything in it) should definitely be a function (will need a couple tweeks though)
        if(i + 1 < diceValues.length) {
            if(diceValues[i + 1] === diceValues[i]) {
                currentDiceSet *= 11
                i++;
            }

            if(i + 1 < diceValues.length) {
                if(diceValues[i + 1] === diceValues[i]){
                    currentDiceSet += 100 * diceValues[i]
                    i++;
                }
            }
        }
        //search the our points table for a combination of the three values as a string
        if(Object.keys(pointsTable).includes(currentDiceSet.toString())){
            totalPoints += pointsTable[currentDiceSet];
        }
        //ugly code, too lazy to fix it
        else if(Object.keys(pointsTable).includes(currentDiceSet.toString()[0])){
            totalPoints += pointsTable[currentDiceSet.toString()[0]]
            if(currentDiceSet.toString().length === 2)
                totalPoints += pointsTable[currentDiceSet.toString()[1]]
        }
        //console.log('totalPoints :', totalPoints);
        currentDiceSet = 0;
    }

    return totalPoints;
}

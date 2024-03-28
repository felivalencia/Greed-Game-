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

console.log(ScoreCalculator(1,5,6,4,5)) //200, passed
console.log(ScoreCalculator(1,5,1,4,5)) //300, passed
console.log(ScoreCalculator(4,3,6,4,2)) //0, passed
console.log(ScoreCalculator(1,1,1,4,5)) //1050, passed
console.log(ScoreCalculator(1,5,6,5,5)) //600, failed
console.log(ScoreCalculator(1,3,3,3,5)) //450, failed

function showScore(score) { 
   const output = document.getElementById(showScore);

   output.innerText = score;
};

//failed due to the three together being between the + 3 index change
//solution: search by number then increment by the length, not + 3
//ex: last test above, loop 1 array = 1, loop 2 array = 3,3,3, loop 3 array = 5 

function ScoreCalculator(...diceValues){
    let totalPoints = 0;
    diceValues.sort();
    //look through all the dice values and add up the score
    const valuesArray = []; 
    let keyToMatch = "";
    let i = -1;
    do {
        i += valuesArray.length;
        //after sorting the array we can look at each element and add up the score 
        valuesArray[0] = diceValues[i];
        valuesArray[1] = diceValues[i - 1];
        valuesArray[2] = diceValues[i - 2];
        //since there may be less diceValues that haven't been checked than 3 we don't want to use those duplicate dice values
        if(i >= diceValues.length)
            valuesArray[0] = false;
        if(i - 1 >= diceValues.length)
            valuesArray[1] = false;
        
        keyToMatch = valuesArray.join("")
        //search the our points table for a combination of the three values as a string
        if(Object.keys(pointsTable).includes(keyToMatch)){
            totalPoints += pointsTable[keyToMatch];
        }
        else{
            let onlyOnes = valuesArray.filter((item) => item === 1)
            let onlyFives = valuesArray.filter((item) => item === 5)
            totalPoints += onlyOnes.length * pointsTable["1"] + onlyFives.length * pointsTable["5"];
        }
    } while (i < diceValues.length)

    
    return totalPoints;
}

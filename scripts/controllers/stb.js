/**
 * @author Joe Sangiorgio
 * The stb [Shut The Box] file contains all information associated with the game. It
 * holds the current state of the game, and provides methods to interact with it.
 */
var stb = (function () {
    var stb = {};
    var dice=[];
    var cards=[];
    var diceIds = ["D6","D66"];
    var takenCards = {}
    var rollTotal = 0;
    var prevCardTotal = 0;
    var gameScore=45;
    var ROLL_DELAY = 650;
    var NUM_DICE;

    /**
     * Function that handles card click events. Its main purpose is to check if a click is valid,
     * and direct action accordingly.
     * @return -1 if not valid click
     */
    function cardClick() {

        //obtain card value from clicked element
        var cardVal = Number($(this).children()[0].textContent)

        //will validate against a temporary total
        var testTotal= cardVal + prevCardTotal

        //error checking to make sure the total is correct
        if (testTotal > rollTotal) {
            console.log('The card you clicked was over your current roll total')
            return -1
        }
        //all cards clicked equals the current roll, can move to next turn
        else if(testTotal == rollTotal){
            console.log('You have clicked cards equal to your score, roll again')
            $(".score").html('You have clicked cards equal to your last roll. Roll again!')
            validClick(this);
            prevCardTotal = 0;

            //disable roll button until next turn is complete
            $("#roll").prop('disabled', false);

            //disallow clicking any more cards
            $(".cardContainer").css("pointer-events", "none")
        }
        //user still needs to select cards that sum to the roll total
        else if(testTotal < rollTotal){
            console.log('Keep Clicking!')
            validClick(this)
            prevCardTotal = testTotal

        }else {}

        /**
         * Inner function fired when a click is determined to be valid
         */
        function validClick(elem){

            //update takenCards to reflect the newly-taken card
            takenCards[cardVal] = true;

            //update total game score
            gameScore-=cardVal;

            //finally, flip the card over
            $(elem).flip(true)

            //check for win, if every element of the takenCards obj is true
            var didWin = Object.keys(takenCards).every(function(e){
                return e == true
            });

            //if win, take necessary action
            if (didWin) {
                alert("Congratulations! You won the game!!")
                $(".score").html("Winner, winner"+ '</br>'+"Chicken Dinner!")
            } else {}

        }

        //flipped data property gets updated
        var isFlipped = $(this).data()["flipped"]
        $(this).data("flipped", !isFlipped)

        //disable card once its flipped
        var ignore = (!isFlipped) ? $(this).css("pointer-events", "none") : $.noop();

    }

    /**
     * Function that handles roll button click events. Its main purpose is to obtain a new rollTotal, and
     * validate that a user still has legal moves to make.
     */
    function rollAllDice() {
        rollTotal=0

        //roll each dice, add up for sum
        for (var i = 0; i < dice.length; i++) {
            rollTotal += dice[i].roll()
        }
        console.log("ROLLTOTAL IS "+ rollTotal)

        var availCards=[]
        //populate an array that has the remaining [unflipped] cards
        Object.keys(takenCards).filter(function( index ) {
            var ignore = (!takenCards[index]) ? availCards.push(index) : $.noop();
            })

        //wait until dice stop spinning to show score
        setTimeout(function(){
            $(".score").html("Current Total: "+ '</br>'+rollTotal)
        }, ROLL_DELAY);

        //check if you can flip cards to equal your rolltotal
        var isPossible = sumPossible(availCards,rollTotal)

        if (!isPossible) {
            //wait until dice stop spinning to show gameScore
            setTimeout(function(){
                //alert("Game Over! Your Score is: " + gameScore)
                $(".score").html("Game Over! Your Score is: "+gameScore)
            }, ROLL_DELAY);
        } else {}

        //disable roll button, user needs to interact before they can roll again
        $(this).prop('disabled', true);

        //allow clicking cards again since its a new turn
        $(".cardContainer").css("pointer-events", "all")

    }

    /**
     * A recursive function that checks if a given number can be made by any combination of
     * numbers inside a given array
     * @param {array} inArr - An array of numbers to check against
     * @param {integer} testSum - A sum that you are trying to create out of the array
     * @return {bool} if it is possible to create sum from the given array
     */
    function sumPossible(inArr, testSum) {
        var subArr = inArr.slice(1)
        return !testSum || (!inArr.length ? false : sumPossible(subArr, testSum) || sumPossible(subArr, testSum - inArr[0]))
    }

    /**
     * Function that handles reset button click events. It will re-initalize all necessary variables and
     * data structures to allow for a new game to be played.
     */
    function reset(){
        console.log("reset!!")

        //reset all data objects, tallies, and scores
        takenCards = {}
        rollTotal = 0;
        prevCardTotal = 0;
        gameScore=45;
        dice=[];

        //flip our cards back over, re-enable them, reset their data
        for (var i = 0; i < cards.length; i++) {
            takenCards[i+1] = false;
            cards[i].css("pointer-events", "auto")
            cards[i].data("flipped", false)
            cards[i].flip(false)
        }

        //right side prompt
        $(".score").html('Welcome to </br> Shut The Box!')

        //disable buttons
        $("#roll").prop('disabled', true);


        //spawn start/prompt container
        startPrompt();

    }

    /**
     * Spawns a new prompt that allows a user to start the game
     */
    function startPrompt(){
        //remove dice container
        $(".wrapper").remove()
        //create div with starting prompt
        new startBox("Click Here to Roll",startGame).prependTo(".row")
    }

    /**
     * Function that handles startBox click events. It will create dice for the current game, roll them, and
     * enable appropriate buttons
     */
    function startGame() {

        //remove start prompt div
        $(".startWrapper").remove()

        //create dice holder div
        $("<div/>",{"class": "wrapper"}).prependTo(".row")
        //add dice to dice holder
        for (var i = 0; i < NUM_DICE; i++) {
            var currDice = new Dice(diceIds[i], 6)
            $(".wrapper").append(currDice.getDiceElem())
            dice.push(currDice)
        }

        //enable reset button
        $("#reset").prop('disabled', false);

        //first roll of the game!
        rollAllDice();

    }
    /**
     * Initialization function that will set game variables and page elements depending on the given arguments.
     * It will also create buttons to interact with the game, although they will be disabled until the game actually starts.
     * @param {integer} numDice - The number of dice you would like to play with
     * @param {integer} numCards - The number of cards you would like to play with
     *
     * //TODO: Write further CSS to support other inputs besides STB defaults
     */
    stb.init = function (numDice,numCards) {

        //set game variables
        gameScore=0
        NUM_DICE = numDice

        //add cards to the page
        for (var i = 0; i < numCards; i++) {
            gameScore+=i+1;
            takenCards[i+1] = false;
            var currCard = new FlipCard(i + 1,cardClick)
            $(".cardContainer").append(currCard)
            cards.push(currCard)
        }

        //utilize jquery flip plugin for animations
        $(".flipCard").flip({
            trigger: 'manual'
        });

        //create roll button
        var rollBtn = new Button("roll","Roll!", rollAllDice)
        $(".buttonCont").append(rollBtn)

        //create reset button
        var resetBtn = new Button("reset","Reset", reset)
        $(".buttonCont").append(resetBtn)


        $("#roll").prop('disabled', true);
        $("#reset").prop('disabled', true);

        //create start prompt div
        startPrompt();
    }

    return stb;
}());


$(document).ready(function () {
    console.log('lets get the party started!')
    stb.init(2,9)
});
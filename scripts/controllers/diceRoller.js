/**
 * Note: Code adapted from http://www.andrewmaul.com/fun/DiceRoller/index.html
 * Constructor for diceRoller controller.
 * This will house all functions for interacting and animating the dice.
 * @param {string} diceId - a unique dice id
 * @param {Element} diceElem - The newly-constructed jquery dice element
 */
function diceRoller(diceId,diceElem) {
    var diceRoller = {};
    var shapeId, animationId, maxNumber, currClass, sideId, diceValue;
    var diceId = diceId;
    var diceElem = diceElem;

    /**
     * Function to "roll" your dice. Updates animations and obtains a random number to use.
     * @return {integer} the value of the dice that was just rolled
     */
    diceRoller.roll = function () {
            shapeId = "shape" + diceId;
            animationId = "animation" + diceId;
            maxNumber = diceId.substring(diceId.indexOf('D') + 1, diceId.indexOf('D') + 2);
            diceValue = randomNum(1, maxNumber);
            document.getElementById(shapeId).classList.add(animationId);
            document.getElementById(shapeId).addEventListener('webkitAnimationEnd', showSide, false); //chrome
            document.getElementById(shapeId).addEventListener('animationend', showSide, false); //firefox
            return diceValue;
    }

    /**
     * Getter function that returns the value of the dice
     * @return {integer} value of the dice
     */
    diceRoller.getValue = function () {
        return diceValue
    }

    /**
     * Getter function that returns the Dice Element
     * @return {Element} Associate Dice Element
     */
    diceRoller.getDiceElem = function () {
        return diceElem
    }

    /**
     * Animation function for dice
     */
    var showSide = function () {
        document.getElementById(shapeId).classList.remove(animationId);
        currClass = document.getElementById(shapeId).className;
        sideId = "show-side" + diceValue;
        document.getElementById(shapeId).classList.remove(currClass);
        document.getElementById(shapeId).classList.add(sideId);
    }

    /**
     * Function that will return a random number
     * @param {integer} min bottom bound
     * @param {integer} max top bound
     * @return {integer} a random number
     */
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return diceRoller;
};




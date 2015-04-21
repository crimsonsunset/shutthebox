/**
 * Constructor for a generalized Dice
 * @param {string} id - a unique dice id [css must be set up ahead externally]
 * @param {function} numSides - the number of sides for the dice
 */
function Dice(id, numSides) {

    var SHOW_CLASS = "show-side1"
    var FIGURE_CLASS_BASENAME = "side"
    var SHAPE_CLASS = "shape"
    var CONTAINER_CLASS = "container-shape"

    var currDice = $("<section/>", {
        "class": CONTAINER_CLASS+id
    })

    var innerDiv = $("<div/>",{
        "class": SHOW_CLASS,
        "id": SHAPE_CLASS+id
    })

    for (var i = 0; i < numSides; i++) {
        innerDiv.append($("<figure/>",{
            "class": FIGURE_CLASS_BASENAME+(i+1),
            "text": i+1
        }))
    }
    currDice.append(innerDiv)

    return new diceRoller(id, currDice);
}
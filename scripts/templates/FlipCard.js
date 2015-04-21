/**
 * Constructor for a generalized FlipCard
 * @param {string} id - a unique div id
 * @param {function} clickFunction - a function called when a card is clicked.
 */
function FlipCard(id,clickFunction) {
    var COMPONENT_CLASS = "flipCard"
    var FRONT_CLASS = "front"
    var BACK_CLASS = "back"

    var currCard = $("<div/>", {
        "class": COMPONENT_CLASS,
        "id": COMPONENT_CLASS + id
    }).append($("<div/>",{
        "class": FRONT_CLASS,
        "id": FRONT_CLASS + id,
        "text": id
    })).append($("<div/>",{
        "class": BACK_CLASS,
        "id": BACK_CLASS + id,
        "text": id
    })).on( "click", function() {
        clickFunction.apply(this,[])
    });

    currCard.data("flipped",false );
    return currCard
}
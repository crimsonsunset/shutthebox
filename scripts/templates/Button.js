/**
 * Constructor for a generalized button
 * @param {string} id - a unique button id
 * @param {string} text - text to be displayed on button
 * @param {function} clickFunction - a function called when a button is clicked.
 */
function Button(id,text,clickFunction) {
    var COMPONENT_CLASS = "button"

    var currBtn = $("<button/>", {
        "class": COMPONENT_CLASS,
        "id": id,
        "text": text
    }).on( "click", function() {
        clickFunction.apply(this,[])
    });
    return currBtn
}
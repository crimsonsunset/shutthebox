/**
 * Constructor for a startBox prompt
 * @param {string} inText - text to display
 * @param {function} clickFunction - a function called when a div is clicked.
 */
function startBox(inText,clickFunction){

    var MAIN_CLASS = "startWrapper"
    var SPAN_CLASS = "prompt"

    var mainDiv = $("<div/>", {
        "class": MAIN_CLASS
    }).append($("<span/>", {
        "class": SPAN_CLASS,
        "text": inText
    })).on( "click", function() {
        clickFunction.apply(this,[])
    });

    return mainDiv
}
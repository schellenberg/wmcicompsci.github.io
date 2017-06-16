;
require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

var highlight_button = document.getElementById("highlight");
record_id("highlight");

RUR.toggle_highlight = function () {  // keep part of RUR for Python
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
    } else {
        RUR.state.highlight = true;
        $("#highlight").addClass("active-element");
        $("#highlight").removeClass("blue-gradient");
    }
};
highlight_button.addEventListener("click", RUR.toggle_highlight, false);

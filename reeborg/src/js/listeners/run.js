
require("./../rur.js");
require("./reload.js");
require("./../runner/runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var run_button = document.getElementById("run");
record_id("run");

function run () {
    if (RUR.state.stop_called){
        RUR.state.stop_called = false;
        RUR.reload();
    }
    $("#stop").removeAttr("disabled");
    $("#pause").removeAttr("disabled");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
    $("#frame-selector").attr("disabled", "true").addClass("disabled").removeClass("enabled");

    clearTimeout(RUR._TIMER);
    RUR.runner.run(RUR.play);
}
run_button.addEventListener("click", run, false);

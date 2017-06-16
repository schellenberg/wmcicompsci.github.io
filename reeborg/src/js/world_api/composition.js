require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");
require("./../world_utils/get_world.js");
require("./obstacles.js");
require("./background_tile.js");

function conditions_satisfied (conditions, x, y) {
    "use strict";
    var c, cond, fn, name;
    if (Object.prototype.toString.call(conditions) != "[object Array]" ||
        conditions.length === 0) {
        throw new ReeborgError("Invalid conditions when attempting an automatic object transformation.");
    }
    try {
        for (c=0; c < conditions.length; c++) {
            cond = conditions[c];
            fn = cond[0];
            name = cond[1];
            if (!fn(name, x, y)) {
                return false;
            }
        }
    return true;
    } catch (e) {
        throw new ReeborgError("Invalid conditions when attempting an automatic object transformation.");
    }
}

function do_transformations (actions, x, y) {
    "use strict";
    var a, act, fn, name;
    if (Object.prototype.toString.call(actions) != "[object Array]" ||
        actions.length === 0) {
        throw new ReeborgError("Invalid actions when attempting an automatic object transformation.");
    }
    try {
        for (a=0; a < actions.length; a++) {
            act = actions[a];
            fn = act[0];
            name = act[1];
            fn(name, x, y);
        }
    } catch (e) {
        throw new ReeborgError("Invalid actions when attempting an automatic object transformation.");
    }
}


RUR.transform_tile = function (name, x, y, type) {
    "use strict";
    var t, transf, transformations, recording_state;
    if (RUR.TILES[name].transform === undefined) {
        return false;
    }
    transformations = RUR.TILES[name].transform;
    for (t=0; t < transformations.length; t++) {
        transf = transformations[t];
        if (conditions_satisfied(transf.conditions, x, y)) {

            recording_state = RUR.state.do_not_record;
            RUR.state.do_not_record = true;

            do_transformations(transf.actions, x, y);

            RUR.state.do_not_record = recording_state;
            return;
        }
    }
};

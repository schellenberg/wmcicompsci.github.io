require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");
require("./../world_utils/get_world.js");

/** @function add_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_decorative_object = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"decorative_objects"};
    RUR.add_artefact(args);
    RUR.record_frame("RUR.add_decorative_object", args);
};


/** @function remove_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function removes a background tile at a location.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 *        
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"decorative_objects", name:name};
    try {
        RUR.remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No tile to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_decorative_object", args);
};


/** @function get_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_decorative_object = function (x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"decorative_objects"};
    tile = RUR.get_artefacts(args);
    if (tile === null) {
        return null;
    } else {
        return RUR.TILES[tile[0]];
    }
};

RUR.is_decorative_object = function (name, x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"decorative_objects"};
    tile = RUR.get_artefacts(args);
    if (tile === null) {
        return false;
    } else if (tile[0] == name){
        return true;
    } else {
        return false;
    }
};


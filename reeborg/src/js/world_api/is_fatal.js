require("./../rur.js");
require("./background_tile.js");
require("./bridges.js");
require("./obstacles.js");

/** @function is_fatal
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @returns The message to show.
 */
RUR.is_fatal = function (x, y, protections){
    "use strict";
    // protections is from objects carried by the robot
    var tile, tiles;

    /* Both obstacles and background tiles can be fatal;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    // tile is a name; it could be a colour, which is never fatal.
    if (tile && RUR.TILES[tile] !== undefined) {
        tiles.push(tile);
    }

    // both existing bridges and objects carried can offer protection
    // against some types of otherwise fatal obstacles

    protections = protections.concat(RUR.get_bridge_protections(x, y));
    for (tile of tiles) {
        if (RUR.get_property(tile, "fatal")) {
            if (protections.indexOf(RUR.TILES[tile].fatal) === -1) {
                if (RUR.TILES[tile].message) {
                    return RUR.TILES[tile].message;
                } else {
                    return "Fatal tile needs message defined";
                }
            }
        }
    }
    return false;
};


/** @function is_detectable
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @returns The message to show.
 */
RUR.is_detectable = function (x, y){
    "use strict";
    var detectable, tile, tiles;

    /* Both obstacles and background tiles can be detectable;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    if (tile && RUR.TILES[tile] !== undefined) {
        tiles.push(tile);
    }
    for (tile of tiles) {
        if (RUR.get_property(tile, "detectable")) {
            return true;
        }
    }
    return false;
};


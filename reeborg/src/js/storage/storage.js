/* This file documents methods used to save worlds to and retrieve them
   from a browser's local storage.

   When a program is run successfully, it is saved in the browser; this
   way, when a user quits the site and starts a new session, he or she
   can resume from where they were.

   Furthermore, when editing a world, it is useful to save it; it is stored
   in the browser and its name is appended to the world html select menu.
   All such worlds are available to a user, unless they explicitly delete
   them from the menu.
*/

require("./../rur.js");
require("./../translator.js");
require("./../ui/world_select.js");


var export_world = require("./../world_utils/export_world.js").export_world;
var clone_world = require("./../world_utils/clone_world.js").clone_world;


RUR.storage = {};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        // replace existing
        localStorage.setItem("user_world:"+ name, export_world(RUR.CURRENT_WORLD));
    } else {
        RUR.storage.save_world(name);
    }
    /* We make an assumption here that the onload code has not been run */
    RUR.WORLD_BEFORE_ONLOAD = clone_world();
};

RUR.storage.save_world = function (name){
    "use strict";
    var url = "user_world:"+ name;
    if (RUR.state.editing_world) {
        localStorage.setItem(url, export_world(RUR.CURRENT_WORLD));
    } else {
        localStorage.setItem(url, export_world(RUR.WORLD_BEFORE_ONLOAD));
    }
    RUR.storage.append_world_name(name);
};

RUR.storage.append_world_name = function (name){
    "use strict";
    var url = "user_world:"+ name;
    RUR.storage.appending_world_name_flag = true;
    RUR.world_select.append_world({url:url, shortname:name, local_storage:true});
    RUR.world_select.set_url(url);  // reload as updating select choices blanks the world.
    /* appends name to world selector and to list of possible worlds to delete */
    $('#delete-world h3').append(
        '<button class="blue-gradient inline-block" onclick="RUR.storage.delete_world(' +
            "'"+ name + "'" + ');$(this).remove()"">' + RUR.translate('Delete ') + name + '</button>');
    $('#delete-world').show();
};

RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();

    try {
        RUR.world_select.set_url(
            RUR.world_select.url_from_shortname(
                localStorage.getItem("world"))
            );
    } catch (e) {
        RUR.world_select.set_default();
    }

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};

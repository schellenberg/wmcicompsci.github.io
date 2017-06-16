require("./../rur.js");
require("./../translator.js");
require("./../world_api/things.js"); // why ?
// probably need the other world_api files though, for removal of images.
require("./../world_utils/get_world.js");
//TODO add overlay object (like sensor)

RUR.vis_world = {};

RUR.vis_world.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.world_get.world_info();
};

RUR.vis_world.compute_world_geometry = function (cols, rows) {
    "use strict";
    var height, width, canvas;
    if (RUR.get_world().small_tiles) {
        RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH/2;
        RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS/2;
        RUR.SCALE = 0.5;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH;
        RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS;
        RUR.SCALE = 1;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }

    if (cols !== undefined && rows !== undefined) {
        height = (rows + 1.5) * RUR.WALL_LENGTH;
        width = (cols + 1.5) * RUR.WALL_LENGTH;
        RUR.MAX_Y = rows;
        RUR.MAX_X = cols;
    } else {
        height = (RUR.MAX_Y + 1.5) * RUR.WALL_LENGTH;
        width = (RUR.MAX_X + 1.5) * RUR.WALL_LENGTH;
    }
    RUR.get_world().rows = RUR.MAX_Y;
    RUR.get_world().cols = RUR.MAX_X;

    if (height !== RUR.HEIGHT || width !== RUR.WIDTH) {
        for (canvas of RUR.CANVASES) { //jshint ignore:line
            canvas.width = width;
            canvas.height = height;
        }
        RUR.HEIGHT = height;
        RUR.WIDTH = width;
    }

    RUR.vis_world.draw_all();
};


RUR.vis_world.draw_all = function () {
    "use strict";
    var ctx, world = RUR.get_world();

    if (world.blank_canvas) { // for game environment
        if (RUR.state.editing_world) {
            RUR.show_feedback("#Reeborg-shouts",
                                RUR.translate("Editing of blank canvas is not supported."));
            return;
         }
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = undefined;
        for (ctx of RUR.ALL_CTX) {
            ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        }
        return;
    }

    // For robot worlds, we do not need to redraw
    // the background or the grid walls, nor the coordinates
    // at each time the world is updated
    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.get_world().background_image !== undefined) {
        draw_background_image(RUR.BACKGROUND_IMAGE);
    } else {
        draw_grid_walls(RUR.BACKGROUND_CTX);
    }

    draw_coordinates();
    RUR.animated_images = false;
    RUR.vis_world.refresh();
};


RUR.vis_world.refresh = function () {
    "use strict";
    var canvas, canvases, goal, world = RUR.get_world();

    // This is not the most efficient way to do things; ideally, one
    // would keep track of changes (e.g. addition or deletion of objects)
    // and only redraw when needed.  However, it is not critical at
    // the moment
    canvases = ["TILES_CTX", "BRIDGE_CTX", "DECORATIVE_OBJECTS_CTX",
                "OBSTACLES_CTX", "GOAL_CTX", "OBJECTS_CTX",
                "PUSHABLES_CTX", "TRACE_CTX", "WALL_CTX", "ROBOT_CTX"];
    for (canvas of canvases) {
        RUR[canvas].clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }

    draw_border(RUR.WALL_CTX);
    draw_tiles(world.tiles, RUR.TILES_CTX);
    draw_tiles(world.bridge, RUR.BRIDGE_CTX);
    draw_tiles(world.decorative_objects, RUR.DECORATIVE_OBJECTS_CTX);
    draw_tiles(world.obstacles, RUR.OBSTACLES_CTX);
    draw_tiles(world.pushables, RUR.PUSHABLES_CTX);
    draw_tiles(world.walls, RUR.WALL_CTX);
    draw_tiles(world.objects, RUR.OBJECTS_CTX);

    draw_info();     // on ROBOT_CTX
    draw_robots(world.robots);  // on ROBOT_CTX; also draws the trace

    // Animated images are redrawn according to their own schedule
    // If we have not drawn any yet, we should see if we need to draw some
    if (!RUR.animated_images) {
        draw_animated_images();
    }

    if (RUR.state.editing_world || RUR.state.visible_grid) {
        // make them appear above background and tiles but below foreground walls.
        draw_grid_walls(RUR.GOAL_CTX, RUR.state.editing_world);
    }

    if (world.goal !== undefined){
        goal = true;
        if (world.goal.objects !== undefined){
            draw_tiles(world.goal.objects, RUR.GOAL_CTX, goal);
        }
        if (world.goal.walls !== undefined){
            draw_tiles(world.goal.walls, RUR.GOAL_CTX, goal);
        }
        if (world.goal.position !== undefined) {
            draw_goal_position(world.goal);
        }
    }

};

function draw_coordinates () {
    "use strict";
    var x, y, ctx = RUR.BACKGROUND_CTX, grid_size=RUR.WALL_LENGTH;

    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - grid_size/2;
    for(x=1; x <= RUR.MAX_X; x++){
        ctx.fillText(x, (x+0.5)*grid_size, y);
    }
    x = grid_size/2 -5;
    for(y=1; y <= RUR.MAX_Y; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*grid_size);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
}

function draw_grid_walls (ctx, edit){
    "use strict";
    var i, j, image_e, image_n, wall_e, wall_n,
        x_offset_e, x_offset_n, y_offset_e, y_offset_n;

    if (edit) {
        wall_e = RUR.TILES["east_edit"];
        wall_n = RUR.TILES["north_edit"];
    } else {
        wall_e = RUR.TILES["east_grid"];
        wall_n = RUR.TILES["north_grid"];
    }

    image_e = wall_e.image;
    x_offset_e = wall_e.x_offset;
    y_offset_e = wall_e.y_offset;

    image_n = wall_n.image;
    x_offset_n = wall_n.x_offset;
    y_offset_n = wall_n.y_offset;

    for (i = 1; i <= RUR.MAX_X; i++) {
        for (j = 1; j <= RUR.MAX_Y; j++) {
            draw_single_object(image_e, i, j, ctx, x_offset_e, y_offset_e);
            draw_single_object(image_n, i, j, ctx, x_offset_n, y_offset_n);
        }
    }
}

function draw_border (ctx) {
    "use strict";
    var j, image, wall, x_offset, y_offset;

    wall = RUR.TILES["east_border"];
    image = wall.image;
    x_offset = wall.x_offset;
    y_offset = wall.y_offset;

    for (j = 1; j <= RUR.MAX_Y; j++) {
        draw_single_object(image, 0, j, ctx, x_offset, y_offset);
    }
    for (j = 1; j <= RUR.MAX_Y; j++) {
        draw_single_object(image, RUR.MAX_X, j, ctx, x_offset, y_offset);
    }

    wall = RUR.TILES["north_border"];
    image = wall.image;
    x_offset = wall.x_offset;
    y_offset = wall.y_offset;

    for (j = 1; j <= RUR.MAX_X; j++) {
        draw_single_object(image, j, 0, ctx, x_offset, y_offset);
    }
    for (j = 1; j <= RUR.MAX_X; j++) {
        draw_single_object(image, j, RUR.MAX_Y, ctx, x_offset, y_offset);
    }
}


function draw_robots (robots) {
    "use strict";
    var robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        if (robots[robot].possible_initial_positions !== undefined && robots[robot].possible_initial_positions.length > 1){
            draw_robot_clones(robots[robot]);
        } else {
            RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        }
    }
}

function draw_robot_clones (robot){
    "use strict";
    var i, clone;
    RUR.ROBOT_CTX.save();
    RUR.ROBOT_CTX.globalAlpha = 0.4;
    for (i=0; i < robot.possible_initial_positions.length; i++){
            clone = JSON.parse(JSON.stringify(robot));
            clone.x = robot.possible_initial_positions[i][0];
            clone.y = robot.possible_initial_positions[i][1];
            clone._prev_x = clone.x;
            clone._prev_y = clone.y;
            RUR.vis_robot.draw(clone);
    }
    RUR.ROBOT_CTX.restore();
}


function draw_goal_position (goal) {
    "use strict";
    var image, i, coord, x_offset, y_offset, ctx;

    ctx = RUR.GOAL_CTX;

    if (goal.position.image !== undefined &&
        typeof goal.position.image === 'string' &&
        RUR.TILES[goal.position.image] !== undefined){
        image = RUR.TILES[goal.position.image].image;
        x_offset = RUR.TILES[goal.position.image].x_offset;
        y_offset = RUR.TILES[goal.position.image].y_offset;
    } else {    // For anyone wondering, this step might be needed only when using older world
                // files that were created when there was not a choice
                // of image for indicating the home position.
                // In that case, it is ok to have x_offset and y_offset undefined.
        image = RUR.TILES["green_home_tile"].image;
    }
    if (goal.possible_final_positions !== undefined && goal.possible_final_positions.length > 1){
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (i=0; i < goal.possible_final_positions.length; i++){
                coord = goal.possible_final_positions[i];
                draw_single_object(image, coord[0], coord[1], ctx, x_offset, y_offset);
        }
        ctx.restore();
    } else {
        draw_single_object(image, goal.position.x, goal.position.y, ctx, x_offset, y_offset);
    }
}


function draw_tiles (tiles, ctx, goal){
    "use strict";
    var i, j, coords, keys, key, image, tile, colour, t, tile_array;
    if (tiles === undefined) {
        return;
    }

    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        coords = keys[key].split(",");
        i = parseInt(coords[0], 10);
        j = parseInt(coords[1], 10);
        if (tiles[keys[key]] !== undefined) {
            tile_array = tiles[keys[key]];
            if (Object.prototype.toString.call(tile_array) == "[object Object]") {
                tile_array = Object.keys(tile_array);
            }
            for (t=0; t<tile_array.length; t++) {
                tile = RUR.TILES[tile_array[t]];
                if (tile === undefined || tile.color) {
                    if (tile === undefined) {
                        colour = tiles[keys[key]];
                    } else {
                        colour = tile.color;
                    }
                    draw_coloured_tile(colour, i, j, ctx);
                    continue;
                } else if (goal) {
                    image = tile.goal.image;
                    if (image === undefined){
                        console.warn("problem in draw_tiles; tile =", tile, ctx);
                        throw new ReeborgError("Problem in draw_tiles; goal image not defined.");
                    }
                    draw_single_object(image, i, j, ctx, tile.x_offset, tile.y_offset);
                } else if (tile.choose_image === undefined){
                    image = tile.image;
                    if (image === undefined){
                        console.warn("problem in draw_tiles; tile =", tile, ctx);
                        throw new ReeborgError("Problem in draw_tiles; image not defined.");
                    }
                    draw_single_object(image, i, j, ctx, tile.x_offset, tile.y_offset);
                }
            }
        }
    }
}

function draw_animated_images (){
    "use strict";
    var i, flag, anims, canvas, canvases, obj, ctx, world = RUR.get_world();
    clearTimeout(RUR.ANIMATION_FRAME_ID);


    canvases = ["TILES_ANIM_CTX", "BRIDGE_ANIM_CTX", "DECORATIVE_OBJECTS_ANIM_CTX",
                "OBSTACLES_ANIM_CTX", "GOAL_ANIM_CTX", "OBJECTS_ANIM_CTX",
                "PUSHABLES_ANIM_CTX"];
    for (canvas of canvases) {
        RUR[canvas].clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }

    flag = false; // We have not drawn any animated images yet, on this cycle

    anims = [[world.tiles, RUR.TILES_ANIM_CTX],
             [world.bridge, RUR.BRIDGE_ANIM_CTX],
             [world.decorative_objects, RUR.DECORATIVE_OBJECTS_ANIM_CTX],
             [world.obstacles, RUR.OBSTACLES_ANIM_CTX],
             [world.goal, RUR.GOAL_ANIM_CTX],
             [world.objects, RUR.OBJECTS_ANIM_CTX],
             [world.pushables, RUR.PUSHABLES_ANIM_CTX]];

    for (i=0; i < anims.length; i++) {
        obj = anims[i][0];
        if (obj) {
            ctx = anims[i][1];
            /* Important: flag must come after draw_anim to avoid
               short-circuit evaluation which would result in draw_anim
               being called only once.
            */
            flag = draw_anim(obj, ctx) || flag;
        }
    }

    if (flag) {
        RUR.ANIMATION_FRAME_ID = setTimeout(draw_animated_images,
            RUR.ANIMATION_TIME);
    }

    // make it known globally for refresh() whether or not we have drawn
    // animated images
    RUR.animated_images = flag;
}

function draw_anim (objects, ctx) {
    "use strict";
    var i, j, i_j, coords, flag, k, n, image, obj, obj_here, elem,
        recording_state, remove_flag, images_to_remove=[];

    flag = false;
    coords = Object.keys(objects);
    for (k=0; k < coords.length; k++){
        i_j = coords[k].split(",");
        i = parseInt(i_j[0], 10);
        j = parseInt(i_j[1], 10);

        obj_here = objects[coords[k]];
        if (Object.prototype.toString.call(obj_here) == "[object Object]") {
            obj_here = Object.keys(obj_here);
        }

        if (Object.prototype.toString.call(obj_here) == "[object Array]") {
            for (n=0; n < obj_here.length; n++) {
                obj = RUR.TILES[obj_here[n]];
                if (obj === undefined) {
                    continue;
                } else if (obj.choose_image !== undefined){
                    remove_flag = _draw_single_animated(obj, coords[k], i, j, ctx, obj.x_offset, obj.y_offset);
                    if (remove_flag == RUR.END_CYCLE) {
                        images_to_remove.push([i, j, obj.name, ctx]);
                    }
                    flag = true;
                }
            }
        } else {
            console.warn("Problem: unknown type in draw_anim; canvas =", ctx.canvas);
            console.log("obj_here = ", obj_here, "objects = ", objects);
        }
    }

    for (k=0; k < images_to_remove.length; k++){
        // removing object normally result in the recording of a
        // frame since we normally want the display to be updated
        // to reflect the removal. Here, we are updating the display,
        // and we do not want to trigger new frames recording: at this
        // stage, we are playing back the recorded frames.
        recording_state = RUR.state.do_not_record;
        RUR.state.do_not_record = true;
        __remove_animated_object(images_to_remove[k]);
        RUR.state.do_not_record = false;
    }
    return flag;
}

function __remove_animated_object(args) {
    var x, y, name, ctx;
    x = args[0];
    y = args[1];
    name = args[2];
    ctx = args[3];

    switch (ctx) {
        case RUR.TILES_ANIM_CTX:
            RUR.remove_background_tile(name, x, y);
            break;
        case RUR.OBSTACLES_ANIM_CTX:
            RUR.remove_obstacle(name, x, y);
            break;
        default:
            console.warn("unknown ctx in __remove_animated_object.");
    }
}

function _draw_single_animated (obj, coords, i, j, ctx, x_offset, y_offset){
    var image, id = coords + ctx.canvas.id + obj.name;
    // each image is uniquely identified by its "id".
    image = obj.choose_image(id);
    if (image === undefined){
        console.warn("problem in _draw_single_animated; obj =", obj);
        throw new ReeborgError("Problem in _draw_single_animated at" + coords);
    } else if (image == RUR.END_CYCLE) {
        return RUR.END_CYCLE;
    }
    draw_single_object(image, i, j, ctx, x_offset, y_offset);
    return false;
}

function draw_coloured_tile (colour, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS, grid_size = RUR.WALL_LENGTH;
    var x, y;
    if (i > RUR.MAX_X || j > RUR.MAX_Y){
        return;
    }
    x = i*grid_size + thick/2;
    y = RUR.HEIGHT - (j+1)*grid_size + thick/2;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, grid_size, grid_size);
}

function draw_single_object (image, i, j, ctx, x_offset, y_offset) {
    var x, y, offset=RUR.WALL_THICKNESS/2, grid_size=RUR.WALL_LENGTH;
    if (x_offset === undefined) {
        x_offset = 0;
    }
    if (y_offset === undefined) {
        y_offset = 0;
    }
    if (RUR.CURRENT_WORLD.small_tiles) {
        x_offset /= 2;
        y_offset /= 2;
    }
    x = i*grid_size + offset + x_offset;
    y = RUR.HEIGHT - (j+1)*grid_size + offset + y_offset;
    try{
        if (RUR.CURRENT_WORLD.small_tiles) {
            ctx.drawImage(image, x, y, image.width/2, image.height/2);
        } else {
            ctx.drawImage(image, x, y);
        }
    } catch (e) {
        console.warn("problem in draw_single_object", image, ctx, e);
    }
}


function draw_background_image (image) {
    // we draw the image so that it fills the entire world
    var thick=RUR.WALL_THICKNESS/2, grid_size=RUR.WALL_LENGTH,
        image_width, image_height, world_width, world_height,
        x, y, ctx=RUR.BACKGROUND_CTX;

    world_width = RUR.MAX_X*grid_size;  // space to
    world_height = RUR.MAX_Y*grid_size; // be filled

    image_width = image.width;
    image_height = image.height;

    if (image_width > world_width) {
        image_width = world_width;  // crop
    }
    if (image_height > world_height) {
        image_height = world_height;
    }

    y = RUR.HEIGHT - (RUR.MAX_Y+1)*grid_size + thick; // location of top ...
    x = grid_size + thick;                            // ... left corner

    try{
        ctx.drawImage(image, 0, 0, image_width, image_height,
                             x, y, world_width, world_height);
    } catch (e) {
        console.warn("problem in draw_background_image", image, ctx, e);
    }
}

function compile_info () {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drawn - if anything.
    var coords, obj, quantity, world = RUR.get_world();
    RUR.vis_world.information = {};
    RUR.vis_world.goal_information = {};
    RUR.vis_world.goal_present = false;
    if (world.goal !== undefined && world.goal.objects !== undefined) {
        compile_partial_info(RUR.get_world().goal.objects,
            RUR.vis_world.goal_information, 'goal');
            RUR.vis_world.goal_present = true;
    }

    if (world.objects !== undefined) {
        compile_partial_info(world.objects, RUR.vis_world.information, 'objects');
    }
}

function compile_partial_info (objects, information, type){
    "use strict";
    var coords, obj, quantity, color, goal_information;
    if (type=="objects") {
        color = "black";
        goal_information = RUR.vis_world.goal_information;
    } else {
        color = "blue";
    }

    for (coords in objects) {
        if (objects.hasOwnProperty(coords)){
            // objects found here
            for(obj in objects[coords]){
                if (objects[coords].hasOwnProperty(obj)){
                    if (information[coords] !== undefined){
                        // already at least one other object there
                        information[coords] = [undefined, "?"];  // assign impossible object
                    } else {
                        quantity = objects[coords][obj];
                        if (quantity.toString().indexOf("-") != -1) {
                            quantity = "?";
                        } else if (quantity == "all") {
                            quantity = "?";
                        } else {
                            try{
                                quantity = parseInt(quantity, 10);
                            } catch (e) {
                                quantity = "?";
                                console.warn("WARNING: this should not happen in compile_info");
                            }
                        }
                        if (RUR.vis_world.goal_present && typeof quantity == 'number' && goal_information !== undefined) {
                            if ( goal_information[coords] !== undefined &&  goal_information[coords][1] == objects[coords][obj]) {
                            information[coords] = [obj, objects[coords][obj], RUR.GREEN];
                            } else {
                                information[coords] = [obj, objects[coords][obj], RUR.RED];
                            }
                        } else {
                            information[coords] = [obj, quantity, color];
                        }
                    }
                }
            }
        }
    }
}

function draw_info () {
    var i, j, coords, keys, key, info, ctx;
    var scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;

    compile_info();
    if (RUR.vis_world.information === undefined &&
        RUR.vis_world.goal_information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;
    ctx.font = RUR.BACKGROUND_CTX.font;

    if (RUR.vis_world.information !== undefined) {
        keys = Object.keys(RUR.vis_world.information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.information[coords][1];
            if (i <= RUR.MAX_X && j <= RUR.MAX_Y){
                text_width = ctx.measureText(info).width/2;
                ctx.fillStyle = RUR.vis_world.information[coords][2];
                // information drawn to left side of object
                ctx.fillText(info, (i+0.2)*scale, Y - (j)*scale);
            }
        }
    }

    if (RUR.vis_world.goal_information !== undefined) {
        keys = Object.keys(RUR.vis_world.goal_information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.goal_information[coords][1];
            if (i <= RUR.MAX_X && j <= RUR.MAX_Y){
                text_width = ctx.measureText(info).width/2;
                ctx.fillStyle = RUR.vis_world.goal_information[coords][2];
                // information drawn to right side of object
                ctx.fillText(info, (i+0.8)*scale, Y - (j)*scale);
            }
        }
    }
}

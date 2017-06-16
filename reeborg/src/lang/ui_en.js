// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac users:</b> please see <a href="https://github.com/aroberge/reeborg/blob/master/known_problems.md" target="_blank" rel="noopener">Known problems</a>.';

exports.ui_en = ui_en = {};
exports.en_to_en = en_to_en = {};

ui_en["en-fr"] = "Mixed mode: User Interface in English; programming language in French.<br>" +
    "Mode mixte: interface graphique en anglais; programmation en français.";

ui_en["SITE NAME"] = "Reeborg's World";
ui_en["WORLD INFO"] = "World Info";
ui_en["EDITOR VISIBLE"] = "Keep editor visible";

ui_en["apple"] = en_to_en["apple"] = "apple";
ui_en["banana"] = en_to_en["banana"] = "banana";
ui_en["beeper"] = en_to_en["beeper"] = "beeper";
ui_en["box"] = en_to_en["box"] = "box";
ui_en["bridge"] = en_to_en["bridge"] = "bridge";
ui_en["carrot"] = en_to_en["carrot"] = "carrot";
ui_en["daisy"] = en_to_en["daisy"] = "daisy";
ui_en["dandelion"] = en_to_en["dandelion"] = "dandelion";
ui_en["leaf"] = en_to_en["leaf"] = "leaf";
ui_en["orange"] = en_to_en["orange"] = "orange";
ui_en["square"] = en_to_en["square"] = "square";
ui_en["star"] = en_to_en["star"] = "star";
ui_en["strawberry"] = en_to_en["strawberry"] = "strawberry";
ui_en["token"] = en_to_en["token"] = "token";
ui_en["triangle"] = en_to_en["triangle"] = "triangle";
ui_en["tulip"] = en_to_en["tulip"] = "tulip";

ui_en["Problem with onload code."] = "Invalid Javascript onload code; contact the creator of this world.";

ui_en["Too many steps:"] = "Too many steps: {max_steps}";
ui_en["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg is at the correct x position.</li>";
ui_en["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg is at the wrong x position.</li>";
ui_en["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg is at the correct y position.</li>";
ui_en["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg is at the wrong y position.</li>";
ui_en["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>All objects are at the correct location.</li>";
ui_en["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>One or more objects are not at the correct location.</li>";
ui_en["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>All walls have been built correctly.</li>";
ui_en["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>One or more walls missing or built at wrong location.</li>";
ui_en["Last instruction completed!"] = "Last instruction completed!";
ui_en["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>done()</code> executed.</p>";

ui_en["Unknown object"] = "Unknown object: <code>{obj}</code>";
ui_en["No object found here"] = "No <code>{obj}</code> found here!";
ui_en["object"] = "object";
ui_en["I don't have any object to put down!"] = "I don't have any <code>{obj}</code> to put down!";
ui_en["There is already a wall here!"] = "There is already a wall here!";
ui_en["There is no wall to remove!"] = "There is no wall to remove!";
ui_en["Ouch! I hit a wall!"] = "Ouch! I hit a wall!";
ui_en["Done!"] = "Done!";
ui_en["There is no position as a goal in this world!"] = "There is no position as a goal in this world!";
ui_en["There is no goal in this world!"] = "There is no goal in this world!";
ui_en["I carry too many different objects. I don't know which one to put down!"] = "I carry too many different objects. I don't know which one to put down!";
ui_en["Many objects are here; I do not know which one to take!"] = "Many different objects are here; I do not know which one to take!";

ui_en.east = "east";
ui_en.north = "north";
ui_en.west = "west";
ui_en.south = "south";
ui_en["Unknown orientation for robot."] = "Unknown orientation for robot.";

ui_en["Invalid position."] = "{pos} is an invalid position.";
ui_en["Invalid orientation."] = "'{orient}' is an unknown orientation.";

ui_en["World selected"] = "World {world} selected";
ui_en["Could not find world"] = "Could not find world {world}";
ui_en["Object names"] = " library, token, star, triangle, square, etc.";

ui_en["Invalid world file."] = "Invalid world file.";
ui_en["PERMALINK"] = "PERMALINK";
ui_en["Could not find link: "] = "Could not find link: ";

ui_en["Click on world to move robot."] = "Click on world to add or remove possible starting positions for Reeborg.";
ui_en["Added robot."] = "Added Reeborg.";
ui_en["Click on image to turn robot"] = "Click on image to turn Reeborg";
ui_en["Robot now has tokens."] = "Reeborg now has {x_tokens} tokens.";
ui_en["Click on world to add object."] = "Click on world to set number of <code>{obj}</code>.";
ui_en["Click on desired object below."] = "Click on desired object below.";
ui_en["Click on world to toggle walls."] = "Click on world to toggle walls.";
ui_en["Click on world to set home position for robot."] = "Click on world to add/remove possible final positions for robot.";
ui_en["Click on world to toggle additional walls to build."] = "Click on world to toggle additional walls to build.";
ui_en["Click on desired goal object below."] = "Click on desired goal object below.";
ui_en["Click on world to set number of goal objects."] = "Click on world to set number of goal <code>{obj}</code>.";
ui_en["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Enter number of tokens for Reeborg to carry.";
ui_en[" is not a valid value!"] = " is not a valid value!";
ui_en["Enter number of objects desired at that location."] = "Click on world to set number <code>{obj}</code>.";
ui_en["Objects found here:"] = "Objects found here:";
ui_en["Description"] = "Description";
ui_en["A robot located here carries no objects."] = "A robot located at {x},{y} carries no objects.";
ui_en["Goal to achieve:"] = "Goal to achieve:";
ui_en["A robot located here carries:"] = "A robot located at {x},{y} carries:";
ui_en["random location"] = "random location";
ui_en["Enter number of objects to give to robot."] = "Enter number of <code>{obj}</code> to give to robot.";
ui_en["Special information about this location:"] = "Special information about this location:";
ui_en["Click on world to toggle tile."] = "Click on world to toggle <code>{obj}</code> tile.";
ui_en["Click on desired tile below."] = "Click on desired tile below or on the colour selector.";
ui_en["mud"] = "mud";
ui_en["water"] = "water";
ui_en["grass"] = "grass";
ui_en["gravel"] = "gravel";
ui_en["ice"] = "ice";
ui_en["A wall must be built east of this location."] = "A wall must be built east of this location.";
ui_en["A wall must be built north of this location."] = "A wall must be built north of this location.";
ui_en["A wall must be built west of this location."] = "A wall must be built west of this location.";
ui_en["A wall must be built south of this location."] = "A wall must be built south of this location.";
ui_en["The final required position of the robot will be chosen at random."] = "The final required position of the robot will be chosen at random.";
ui_en["The final position of the robot must be (x, y) = "] = "The final position of the robot must be (x, y) = ";
ui_en["Click on world to fill with given tile."] = "Click on world to fill with given tile.";
ui_en["Click on desired object below."] = "Click on desired object below.";
ui_en["Enter url of image to use as background."] = "Enter url of image to use as background.";
ui_en["Replace editor content"] = "Do you wish to replace your editor code by that provided by the creator of this world?";
ui_en["Replace library content"] = "Do you wish to replace your library code by that provided by the creator of this world?";
ui_en["colour"] = "colour";

ui_en["Name already exist; confirm that you want to replace its content."] = "Name already exist; confirm that you want to replace its content.";
ui_en["No such world!"] = "No such world!";
ui_en["Enter world name to save"] = "Enter world name to save; names in use: ";
ui_en["Enter world name to delete"] = "Enter world name to delete; existing worlds: ";
ui_en["Delete "] = "Delete ";

ui_en["Error found at or near line {number}."] = "Error found at or near line {number}.";
ui_en["<br>Perhaps a missing colon is the cause."] = "<br>Perhaps a missing colon is the cause.";
ui_en["<br>Perhaps you forgot to add parentheses ()."] = "<br>Perhaps you forgot to add parentheses ().";
ui_en["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Perhaps you misspelled a word or forgot to define a function or a variable.";
ui_en["I cannot help you with this problem."] = "I cannot help you with this problem.";

ui_en["I'm stuck in mud."] = "I'm stuck in mud.";
ui_en["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.";
ui_en["I'm slipping on ice!"] = "I'm slipping on ice!";
ui_en["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location.";
ui_en["Grass: usually safe."] = "Grass: usually safe.";
ui_en["Gravel: usually safe."] = "Gravel: usually safe.";
ui_en["I'm in water!"] = "I'm in water!";
ui_en["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.";
ui_en["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green home tile: Reeborg <b>can</b> detect this tile using at_goal().";
ui_en["Crash!"] = "Crash!";
ui_en["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.";
ui_en["I hit a fence!"] = "I hit a fence!";
ui_en["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
ui_en["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Bridge: Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

ui_en["Something is blocking the way!"] = "Something is blocking the way!";
ui_en["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>can</b> detect this using at_goal().";
ui_en["green home tile:"] = "green home tile:";
ui_en["home:"] = "home:";
ui_en["racing flag:"] = "racing flag:";
ui_en["house:"] = "house:";

ui_en["fence_right"] = "fence";
ui_en["fence_left"] = "fence";
ui_en["fence_double"] = "fence";
ui_en["fence_vertical"] = "fence";

ui_en["Local variables"] = "Local variables";
ui_en["Global variables"] = "Global variables";
ui_en["Watched expressions"] = "Watched expressions";

ui_en["move forward"] = "move forward";
ui_en["turn left"] = "turn left";
ui_en["take object"] = "take object";
ui_en["put object"] = "put object";
ui_en["Pause the program's execution."] = "Pause the program's execution.";
ui_en["Build a wall in front of the robot."] = "Build a wall in front of the robot.";
ui_en["End the program's execution."] = "End the program's execution.";
ui_en["True if a wall is blocking the way."] = "True if a wall is blocking the way";
ui_en["True if nothing is blocking the way."] = "True if nothing is blocking the way.";
ui_en["True if desired destination."] = "True if desired destination.";
ui_en["True if robot carries at least one object."] = "True if robot carries at least one object.";
ui_en["True if there is at least one object here."] = "True if there is at least one object here.";
ui_en["True if robot is facing North."] = "True if robot is facing North.";
ui_en["Delay between actions; default is 300 ms."] = "Delay between actions; default is 300 ms.";

ui_en["Save world in browser"] = "Save world in browser";
ui_en["LOAD BLOCKLY"] = "Import program (blocks) from file";
ui_en["LOAD BLOCKLY EXPLAIN"] = "Opens a local file and use its content to replace the content of the Blockly workspace.";
ui_en["LOAD EDITOR"] = "Import program from file";
ui_en["LOAD EDITOR EXPLAIN"] = "Opens a local file and use its content to replace the content of the Code editor.";
ui_en["LOAD LIBRARY"] = "Import library from a file";
ui_en["LOAD LIBRARY EXPLAIN"] = "Opens a file and use its content to replace the current content of the Library.";
ui_en["LOAD WORLD"] = "Open world from file";
ui_en["LOAD WORLD EXPLAIN"] = "Loads a world from a file on your computer.";
ui_en["SAVE BLOCKLY"] = "Save program to file";
ui_en["SAVE BLOCKLY EXPLAIN"] = "Saves the current blocks in a file." + mac_user_save_files_en;
ui_en["SAVE EDITOR"] = "Save program to file";
ui_en["SAVE EDITOR EXPLAIN"] = "Saves the content of the editor in a file." + mac_user_save_files_en;
ui_en["SAVE LIBRARY"] = "Save the library";
ui_en["SAVE LIBRARY EXPLAIN"] = "Saves the content of the library in a file." + mac_user_save_files_en;
ui_en["SAVE WORLD"] = "Save world to file";
ui_en["SAVE WORLD EXPLAIN"] = "Saves the world (as a json object) to a file on your computer." + mac_user_save_files_en;

ui_en["ADD CONTENT TO WORLD"] = "Add content to world from selected items below.";
ui_en["ADD BLOCKLY TEXT"] = "Code blocks";
ui_en["ADD EDITOR TEXT"] = "Code in editor";
ui_en["ADD LIBRARY TEXT"] = "Library";
ui_en["ADD PRE TEXT"] = "Pre";
ui_en["ADD POST TEXT"] = "Post";
ui_en["ADD DESCRIPTION TEXT"] = "Description";
ui_en["ADD ONLOAD TEXT"] = "Onload";

ui_en["KEYBOARD BUTTON"] = "Reeborg's keyboard";
ui_en["ADDITIONAL OPTIONS"] = "Additional options";

ui_en["BASIC COMMANDS"] = "Basic commands";
ui_en["DEFINING"] = "Defining";
ui_en["LOOPS"] = "Loops";
ui_en["DECISIONS"] = "Decisions";
ui_en["CONDITIONS"] = "Conditions";
ui_en["USING VARIABLES"] = "Using variables";
ui_en["COMMANDS"] = "Commandes";
ui_en["OTHER"] = "Other";
ui_en["OBJECTS"] = "Objects";

ui_en["Python Code"] = "Python Code";
ui_en["Javascript Code"] = "Javascript Code";
ui_en["LIBRARY"] = "library";
ui_en["PRE"] = "Pre";
ui_en["POST"] = "Post";
ui_en["DESCRIPTION"] = "Desc.";
ui_en["ONLOAD"] = "Onload";

ui_en["HIGHLIGHT IMPOSSIBLE"] = "A problem with your code has caused me to turn off the code highlighting.";
ui_en["COMMAND RESULT"] = "Select action to perform from menu below.";

ui_en["COPY"] = "Copy";
ui_en["COPY PERMALINK EXPLAIN"] = "Copy the permalink to the clipboard.";
ui_en["Save"] = "Save";
ui_en["Save permalink explanation"] = "Saves a copy of the permalink to a file.";
ui_en["REPLACE PERMALINK"] = "Replace";
ui_en["REPLACE PERMALINK EXPLAIN"] = "Replace the content above by a different permalink and click on Replace";
ui_en["CANCEL"] = "Cancel";

ui_en["DELETE WORLD TEXT"] = "The following refers to worlds currently stored in your browser which you can delete:";
ui_en["PYTHON ONLY"] = "Python only";
ui_en["COLLABORATION"] = "Collaboration";
ui_en["TOGETHERJS EXPLAIN"] = "Tool which permits collaboration with one or more other user using Mozilla's TogetherJS. Does not work with Blockly.";
ui_en["WORLD CREATION TITLE"] = "World: creation, edition, ...";
ui_en["EDIT WORLD"] = "Edit world";
ui_en["EDIT WORLD EXPLAIN"] = "You can create your own world by editing the current one.";
ui_en["PROGRAM IN EDITOR"] = "Program in editor";
ui_en["PROGRAM IN BLOCKLY WORKSPACE"] = "Program in blockly workspace";
ui_en["REVERSE STEP EXPLAIN"] = "Reverses the previous execution step.";
ui_en["CONTACT"] = "(English/French only) Email:";
ui_en["ISSUES"] = "Bug reports, suggestions, other issues, etc. (English/French only)";
ui_en["FORUM"] = "Discussion forum (English/French only)";
ui_en["HELP"] = "Help";
ui_en["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Documentation</a>';
ui_en["PYTHON HELP"] = "Using Python, execute a program with <code>help()</code> to get a list of commands or <code>help(move)</code> to get help on the <code>move()</code> function, etc.";
ui_en["KEYBOARD HELP"] = "Click on Reeborg keyboard to see a list of available commands, Python keywords, etc.";

ui_en["WORLD EDITOR"] = "World editor";
ui_en["m-east"] = "East";
ui_en["m-north"] = "North";
ui_en["m-west"] = "West";
ui_en["m-south"] = "South";
ui_en["m-random"] = "Random";
ui_en["m-dimensions"] = "World dimensions";
ui_en["m-add"] = "Add";
ui_en["m-add-robot"] = "Add robot";
ui_en["m-robot"] = "Robot";
ui_en["m-position"] = "Position(s)";
ui_en["m-turn"] = "Turn";
ui_en["m-objects"] = "Objects";
ui_en["m-walls"] = "Walls";
ui_en["m-objects2"] = "Objects";
ui_en["m-tiles"] = "Tiles";
ui_en["m-fill"] = "Fill";
ui_en["m-solid"] = "Obstacles";
ui_en["m-decorative"] = "Decorative objects";
ui_en["m-background"] = "Background image";
ui_en["m-goal"] = "Goal";
ui_en["mg-robot"] = "Robot";
ui_en["mg-walls"] = "Walls";
ui_en["mg-objects"] = "Objects";

ui_en["Reeborg says: I'm done!"] = "Reeborg says: I'm done!";
ui_en["Reeborg writes:"] = "Reeborg writes:";
ui_en["Reeborg shouts: Something is wrong!"] = "Reeborg shouts: Something is wrong!";
ui_en["Reeborg explores some Javascript code"] = "Reeborg explores some Javascript code";
ui_en["Reeborg states:"] = "Reeborg states:";
ui_en["Reeborg watches some variables!"] = "Reeborg watches some variables!";
ui_en["Click on the world to get some additional information."] = "Click on the world to get some additional information.";

ui_en["Reeborg's basic keyboard"] = "Reeborg's basic keyboard";
ui_en["kbd-command-btn"] = "Commands";
ui_en["kbd-condition-btn"] = "Conditions";
ui_en["kbd-python-btn"] = "Python";
ui_en["kbd-py-console-btn"] = "Python";
ui_en["kbd-javascript-btn"] = "Javascript";
ui_en["kbd-objects-btn"] = "Objects";
ui_en["kbd-special-btn"] = "Special";

ui_en["UNDO"] = "UNDO";
ui_en["REDO"] = "REDO";
ui_en["tab"] = "TAB";
ui_en["shift-tab"] = "Shift-TAB";
ui_en["enter"] = "\u23CE";
ui_en["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> is not a true Python keyword.";

ui_en["Colour:"] = "Colour:";
ui_en["Enter a colour"] = "Enter a colour";

ui_en["Background image"] = "Background image";

ui_en["NAME:"] = "Name:";
ui_en["Save world in browser"] = "Save world in browser";

ui_en["Set the world's dimensions"] = "Set the world's dimensions";
ui_en["set-dimensions-explain"] = "If so desired, you can set the size of the world to be different from the default dimensions. Please remember that smaller resolution screen may not be able to display very large worlds.";
ui_en["Maximum x value:"] = "Maximum x value:";
ui_en["Maximum y value:"] = "Maximum y value:";
ui_en["Use small tiles"] = "Use small tiles";

ui_en["Set goal number for object"] = "Set goal number for object";
ui_en["dialog-goal-object-explain"] = "Click on the checkbox if you wish that number to be equal to the total number of such objects found in the world at the beginning.";
ui_en["Number of objects"] = "Number of objects";
ui_en["All such objects"] = "All such objects";

ui_en["Number of objects:"] = "Number of objects:";
ui_en["Maximum:"] = "Maximum:";
ui_en["Add object in the world"] = "Set number of object";
ui_en["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

ui_en["Unlimited:"] = "Unlimited:";
ui_en["Give object to robot"] = "Give object to robot";
ui_en["GIVE OBJECT EXPLAIN"] = "Choose a number of objects for the robot to carry. Click on the checkbox if you wish that number to be unlimited.";

ui_en["UPDATE EDITOR CONTENT"] = "This world has some default content for the editor. To replace the current content of your editor, click on the button";
ui_en["UPDATE EDITOR BUTTON"] = "Replace editor content";
ui_en["UPDATE LIBRARY CONTENT"] = "This world has some default content for the library. To replace the current content of your library, click on the button";
ui_en["UPDATE LIBRARY BUTTON"] = "Replace library content";
ui_en["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
ui_en["UPDATE BLOCKLY BUTTON"] = "Replace existing blocks";
ui_en["Contents from World"] = "Contents from World";

// Sad Trombone

// load the womp-womp sound
let sadTrombone;

function preload() {
  sadTrombone = loadSound("assets/trombone.mp3");
}

function setup() {
  //create a button to play the sound
  let button = createButton("Sad");
  button.mousePressed(sadness);
}

function keyPressed() {
  if (key === " ") {
    sadness();
  }
}

function sadness() {
  if (!sadTrombone.isPlaying()) {
    sadTrombone.play();
  }
}
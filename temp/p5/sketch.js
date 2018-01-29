var locationData;

function preload() {
  locationData = getCurrentPosition();
}

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  }
  else {
    fill(255);
    rect(0, 0, width, height);
    stroke(0);
    text(locationData.latitude, 0, 0);
  }
}

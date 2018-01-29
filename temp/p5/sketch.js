var fence;
var isInFence = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //optional options object for geoFenceCircle
  //fence = new geoFenceCircle(44.979779, -93.325499, .05, insideTheFence, 'mi', fenceOptions)
  // fenceOptions = {
  //   enableHighAccuracy: false,
  //   timeout: 5000,
  //   maximumAge: 0
  // };

  fence = new geoFenceCircle(52.1742466, -106.6251851, 0.05, insideTheFence, outsideTheFence, 'km')
}

function insideTheFence(position) {
  print("INlat: " + position.latitude);
  print("INlong: " + position.longitude);
  print("user is inside of the fence")
  isInFence = true;
}

function outsideTheFence(position) {
  print("OUTlat: " + position.latitude);
  print("OUTlong: " + position.longitude);
  print("user is outside of the fence")
  isInFence = false;
}

function draw() {
  if (isInFence) {
    fill(0);
  } else {
    fill(255);
  }
  rect(0, 0, width, height);
}

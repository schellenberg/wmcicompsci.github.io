// Gift ID Lookup
// Dan Schellenberg
// Dec 5, 2018

let giftInput, lookupButton, result;
let giftIDs;
let giftData;

function preload() {
  giftData = loadStrings("assets/2023.txt");
}

function setup() {
  giftInput = createInput("");
  giftInput.attribute("placeholder", "Enter gift number here...");
  giftInput.attribute("class", "form-control");
  giftInput.attribute("type", "number");
  giftInput.attribute("pattern", "[0-9]*");
  giftInput.attribute("inputmode", "numeric");
  giftInput.parent("gifts");

  lookupButton = createButton("Whose Is It?");
  lookupButton.attribute("type", "button");  //will not reload page automatically when pressed
  lookupButton.attribute("class", "btn btn-primary");
  lookupButton.parent("gifts");
  lookupButton.mousePressed(checkIDs);

  result = createElement("h2");
  result.parent("container");

  setGiftIDs();
}

function draw() {

}

function setGiftIDs() {
  giftIDs = new Map();

  for (let line=0; line<giftData.length; line++) {
    let currentGiftInfo = giftData[line].split(",");
    giftIDs.set(Number(currentGiftInfo[0]), currentGiftInfo[1]);
  }
}

function checkIDs() {
  let inputValue = Number(giftInput.value().trim());
  let name = giftIDs.get(inputValue);
  displayResults(name);
}

function displayResults(name) {
  if (name !== undefined) {
    result.style("color", "green");
    result.html("It's for " + name + "!");
  }
  else {
    result.style("color", "red");
    result.html("Please check that number again...");
  }
  
}

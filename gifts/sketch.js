// Gift ID Lookup
// Dan Schellenberg
// Dec 5, 2018

let giftInput, lookupButton, result;
let giftIDs;

function setup() {
  giftInput = createInput("");
  giftInput.attribute("placeholder", "Enter gift number here...");
  giftInput.attribute("class", "form-control");
  giftInput.parent("gifts");

  lookupButton = createButton("Whose Is It?");
  lookupButton.attribute("type", "button");  //will not reload page automatically when pressed
  lookupButton.attribute("class", "btn btn-primary");
  lookupButton.parent("gifts");
  lookupButton.mousePressed(checkIDs);

  result = createElement("h2");
  result.parent("container");

  giftIDs = new Map();
  setGiftIDs();
}

function draw() {

}

function setGiftIDs() {
  giftIDs.set(927, "Zoe");
  giftIDs.set(301, "Zoe");
  giftIDs.set(693, "Zoe");

  giftIDs.set(562, "Eli");
  giftIDs.set(426, "Eli");
  giftIDs.set(369, "Eli");

  giftIDs.set(166, "Bree");
  giftIDs.set(631, "Bree");
  giftIDs.set(983, "Bree");

  giftIDs.set(810, "Whole Family!");
  giftIDs.set(385, "Whole Family!");
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

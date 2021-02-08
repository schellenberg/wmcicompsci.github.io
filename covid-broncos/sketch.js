// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let table;
let saskHistory = [];
let displayDates = [];
let busImg;

function preload() {
  table = loadTable("https://health-infobase.canada.ca/src/data/covidLive/covid19.csv", "csv", "header");
  busImg = loadImage("assets/bus.svg");
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  
  // imported momentjs in the index.html file to make date handling easier
  let now = moment();
  let startOfTheMadness = moment([2020, 2, 1]);
  numberOfDaysToRetrieve = now.diff(startOfTheMadness, 'days');

  let daysToRetrieve = [];
  for (let i = 0; i < numberOfDaysToRetrieve; i++) {
    //format that the csv files uses is DD-MM-YYYY;  
    now.subtract(1, "days");
    daysToRetrieve.push(now.format("DD-MM-YYYY"));
    displayDates.push(now.format("MMM Do"));
  }

  for (const d of daysToRetrieve) {
    let allProvinces = table.findRows(d, "date");

    for (const province of allProvinces) {
      if (province.get("prname") === "Saskatchewan") {
        saskHistory.push(province.get("numdeaths"));
      }
    }
  }

  let totalDeathsInSask = saskHistory[0];
  let numberOfBusses = totalDeathsInSask / 16;
  let roundedBusses = Math.round(numberOfBusses*10)/10;
  let theSize;

  if (windowWidth > windowHeight) {
    theSize = windowWidth / 8;
  }
  else {
    theSize = windowHeight / 4;
  }

  for (let i=0; i<floor(numberOfBusses); i++) {
    let someBus = createImg("assets/bus.png", "Bus Image");
    someBus.parent('busses');
    someBus.size(theSize, theSize);
  }

  //how many
  let howMany = "Unit of measure is one Humboldt Broncos tragedy. Since the start of the COVID-19 pandemic, we have had the equivalent of " + roundedBusses + " Humboldt Bronco tragedies in Saskatchewan.";
  let description = createP(howMany);
  description.parent("theHead");

  //date current as of
  let info = "Data accurate as of " + displayDates[0];
  let accurateDate = createSpan(info);
  accurateDate.parent("theFooter");
  accurateDate.class("text-muted");
}

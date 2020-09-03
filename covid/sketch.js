//Take a look at COVID-19 data from Health Canada

let table;
let saskHistory = [];
let displayDates = [];

function preload() {
  //might want to download this file to take a look at it in Excel...
  table = loadTable('https://health-infobase.canada.ca/src/data/covidLive/covid19.csv', 'csv', 'header');
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  // imported momentjs in the index.html file to make date handling easier
  let now = moment();
  let daysToRetrieve = [];
  for (let i = 1; i < 15; i++) {
    //format that the csv files uses is DD-MM-YYYY;
    let dateToGet = now.subtract(1, "days")
    daysToRetrieve.push(dateToGet.format("DD-MM-YYYY"));
    displayDates.push(dateToGet.format("MMM Do"));
  }

  for (const d of daysToRetrieve) {
    let allProvinces = table.findRows(d, "date");

    for (const province of allProvinces) {
      if (province.get('prname') === "Saskatchewan") {
        saskHistory.push(province.get('numtoday'));
      }
    }
  }

}

function draw() {
  background("white");
  
  fill("green");
  textSize(75);
  textAlign(CENTER, CENTER);
  text("Saskatchewan Daily COVID Cases", width/2, 200);
  
  fill("black");
  // history spread horizontally
  for (let i = 0; i < saskHistory.length; i++) {
    textSize(50);
    text(saskHistory[i], 100 + 100*i, height/2 - 50);

    textSize(15);
    text(displayDates[i], 100 + 100*i, height/2);
  }
}
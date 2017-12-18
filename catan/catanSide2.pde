/* @pjs preload="catanSide2.jpg"; */
/* @pjs preload="reset-icon.png"; */

PImage catanSide2;
ArrayList<Settlement> settlementArray;
ArrayList<City> cityArray;
ArrayList<Road> roadArray;
ArrayList<Knight> knightArray;
Score gameScore;
LongestRoad theLongestRoad;
LargestArmy theLargestArmy;
Reset gameReset;

void setup() {
  size(500, 750);
  catanSide2 = loadImage("catanSide2.jpg");
  gameScore = new Score();
  theLongestRoad = new LongestRoad();
  theLargestArmy = new LargestArmy();
  gameReset = new Reset();

  //set up all the settlements
  settlementArray = new ArrayList<Settlement>();
  settlementArray.add(new Settlement(196, 402));
  settlementArray.add(new Settlement(196, 557));
  settlementArray.add(new Settlement(204, 702));
  settlementArray.add(new Settlement(456, 554));
  settlementArray.add(new Settlement(455, 401));
  settlementArray.add(new Settlement(330, 329));
  settlementArray.add(new Settlement(203, 264));

  //set up all the cities
  cityArray = new ArrayList<City>();
  cityArray.add(new City(69, 480));
  cityArray.add(new City(70, 630));
  cityArray.add(new City(339, 631));
  cityArray.add(new City(335, 477));

  //set up all the knights
  knightArray = new ArrayList<Knight>();
  knightArray.add(new Knight(121, 360, 20));
  knightArray.add(new Knight(122, 509, 20));
  knightArray.add(new Knight(253, 583, 20));
  knightArray.add(new Knight(385, 510, 20));
  knightArray.add(new Knight(382, 362, 20));
  knightArray.add(new Knight(240, 290, 20));
  knightArray.add(new Knight(265, 290, 20));
  knightArray.add(new Knight(242, 437, 20));
  knightArray.add(new Knight(266, 437, 20));
  //categories for the knights
  knightArray.add(new Knight(122, 412, 50));
  knightArray.add(new Knight(123, 562, 50));
  knightArray.add(new Knight(251, 637, 50));
  knightArray.add(new Knight(383, 563, 50));
  knightArray.add(new Knight(382, 413, 50));
  knightArray.add(new Knight(253, 336, 50));
  knightArray.add(new Knight(253, 482, 50));

  //set up all the roads
  roadArray = new ArrayList<Road>();
  roadArray.add(new Road(100, 480, 44, 12, 0));  //  0
  roadArray.add(new Road(166, 428, 13, 46, 1));  //  roadArray.add(new Road(166, 430, 32, 48, 1));  //1 -- positive slope
  roadArray.add(new Road(163, 496, 13, 47, 2));  //  2 -- negative slope
  roadArray.add(new Road(166, 581, 13, 46, 1));  //  1 -- pos
  roadArray.add(new Road(100, 630, 45, 12, 0));  //  0
  roadArray.add(new Road(234, 702, 45, 12, 0));  //  0
  roadArray.add(new Road(299, 652, 13, 45, 1));  //  1 -- pos
  roadArray.add(new Road(366, 627, 45, 12, 0));  //  0
  roadArray.add(new Road(426, 575, 13, 46, 1));  //  1 -- pos
  roadArray.add(new Road(424, 494, 14, 45, 2));  //  2 -- neg
  roadArray.add(new Road(362, 477, 45, 12, 0));  //  0
  roadArray.add(new Road(427, 426, 13, 46, 1));  //  1 -- pos
  roadArray.add(new Road(425, 345, 13, 45, 2));  //  2 -- neg
  roadArray.add(new Road(362, 330, 45, 12, 0));  //  0
  roadArray.add(new Road(293, 270, 13, 48, 2));  //  2 -- neg
  roadArray.add(new Road(229, 254, 45, 12, 0));  //  0
}

void draw() {
  background(255);
  image(catanSide2, 0, 0, width, height);
  gameReset.display();
  
  for (int i = 0; i < settlementArray.size (); i++ ) {
    Settlement thisSettlement = settlementArray.get(i);
    if (gameReset.timeToReset() ) {
      thisSettlement.isCompleted = false;
    }
    thisSettlement.display();
  }
  for (int i = 0; i < cityArray.size (); i++ ) {
    City thisCity = cityArray.get(i);
    if (gameReset.timeToReset() ) {
      thisCity.isCompleted = false;
    }
    thisCity.display();
  }
  for (int i = 0; i < roadArray.size (); i++ ) {
    Road thisRoad = roadArray.get(i);
    if (gameReset.timeToReset() ) {
      thisRoad.isCompleted = false;
    }
    thisRoad.display();
  }
  for (int i = 0; i < knightArray.size (); i++ ) {
    Knight thisKnight = knightArray.get(i);
    if (gameReset.timeToReset() ) {
      thisKnight.isCompleted = false;
    }
    thisKnight.display();
  }

  if (gameReset.timeToReset() ) {
      theLongestRoad.isCompleted = false;
      theLargestArmy.isCompleted = false;
      gameScore.totalScore = 0;
      gameReset.startOver();
    }

  gameScore.display();
  theLongestRoad.display();
  theLargestArmy.display();
}

void mouseClicked() {
//  println(mouseX);
//  println(mouseY);

  for (int i = 0; i < settlementArray.size (); i++ ) {
    Settlement thisSettlement = settlementArray.get(i);
    if (thisSettlement.isClicked(mouseX, mouseY)) {
      thisSettlement.switchState(gameScore);
    }
  }

  for (int i = 0; i < cityArray.size (); i++ ) {
    City thisCity = cityArray.get(i);
    if (thisCity.isClicked(mouseX, mouseY)) {
      thisCity.switchState(gameScore);
    }
  }

  for (int i = 0; i < roadArray.size (); i++ ) {
    Road thisRoad = roadArray.get(i);
    if (thisRoad.isClicked(mouseX, mouseY)) {
      thisRoad.switchState();
    }
  }

  for (int i = 0; i < knightArray.size (); i++ ) {
    Knight thisKnight = knightArray.get(i);
    if (thisKnight.isClicked(mouseX, mouseY)) {
      thisKnight.switchState();
    }
  }

  if (theLongestRoad.isClicked(mouseX, mouseY)) {
    theLongestRoad.switchState(gameScore);
  }

  if (theLargestArmy.isClicked(mouseX, mouseY)) {
    theLargestArmy.switchState(gameScore);
  }
  
  if (gameReset.isClicked(mouseX, mouseY)) {
    gameReset.reset();
  }
}

class City {
  int x;
  int y;
  int cityWidth;
  int cityHeight;
  boolean isCompleted;

  City() {
    x = width/2;
    y = height/2;
    isCompleted = false;
    cityWidth = 15;
    cityHeight = 20;
  }

  City(int _x, int _y) {
    x = _x;
    y = _y;
    isCompleted = false;
    cityWidth = 16;
    cityHeight = 20;
  }

  void display() {
    if (isCompleted) {
      stroke(0);
      fill(0);
      rect(x, y-6, cityWidth, cityHeight+1);
      rect(x,y, -cityWidth-1, cityHeight-5); //left side
      triangle(x-3, y-6, x+7, y-11-6, x+cityWidth+3, y-6);
    }
  }

  boolean isClicked(int xPos, int yPos) {
    if ( (xPos > (x-cityWidth)) && (xPos < (x + cityWidth+3)) && (yPos > (y-17)) && (yPos < (y + cityHeight-5) ) ) {
      return true;
    } else {
      return false;
    }
  }

  void switchState(Score gameScore) {
    if (isCompleted) {
      isCompleted = false;
      gameScore.removeScore(2);
    } else {
      isCompleted = true;
      gameScore.addScore(2);
    }
  }
}

class Knight {
  int x;
  int y;
  int diameter;
  boolean isCompleted;

  Knight(int _x, int _y, int _diameter) {
    x = _x;
    y = _y;
    isCompleted = false;
    diameter = _diameter;
  }

  void display() {
    if (isCompleted) {
      noStroke();
      ellipseMode(CENTER);
      fill(255,0,0,125);
      ellipse(x,y,diameter,diameter);
    }
  }

  boolean isClicked(int xPos, int yPos) {
    if ( dist(xPos,yPos,x,y) < (diameter/2) ) {
      return true;
    } else {
      return false;
    }
  }

  void switchState() {
    if (isCompleted) {
      isCompleted = false;
    } else {
      isCompleted = true;
    }
  }
}

class LargestArmy {
  int x;
  int y;
  int boxWidth;
  int boxHeight;
  boolean isCompleted;

  LargestArmy() {
    x = 309;
    y = 118;
    isCompleted = false;
    boxWidth = 163;
    boxHeight = 25;
  }

  void display() {
    if (isCompleted) {
      noStroke();
      fill(255,0,0,125);
      rect(x,y,boxWidth,boxHeight);
    }
  }

  boolean isClicked(int xPos, int yPos) {
    if ( (xPos > x) && (xPos < (x + boxWidth)) && (yPos > y) && (yPos < (y + boxHeight) ) ) {
      return true;
    } else {
      return false;
    }
  }

  void switchState(Score gameScore) {
    if (isCompleted) {
      isCompleted = false;
      gameScore.removeScore(2);
    } else {
      isCompleted = true;
      gameScore.addScore(2);
    }
  }
}

class LongestRoad {
  int x;
  int y;
  int boxWidth;
  int boxHeight;
  boolean isCompleted;

  LongestRoad() {
    x = 309;
    y = 69;
    isCompleted = false;
    boxWidth = 163;
    boxHeight = 25;
  }

  void display() {
    if (isCompleted) {
      noStroke();
      fill(255,0,0,125);
      rect(x,y,boxWidth,boxHeight);
    }
  }

  boolean isClicked(int xPos, int yPos) {
    if ( (xPos > x) && (xPos < (x + boxWidth)) && (yPos > y) && (yPos < (y + boxHeight) ) ) {
      return true;
    } else {
      return false;
    }
  }

  void switchState(Score gameScore) {
    if (isCompleted) {
      isCompleted = false;
      gameScore.removeScore(2);
    } else {
      isCompleted = true;
      gameScore.addScore(2);
    }
  }
}

class Reset {
  PImage resetIcon;
  boolean isReset;
  int x;
  int y;
  int boxWidth;
  int boxHeight;

  Reset() {
    isReset = false;
    resetIcon = loadImage("reset-icon.png");
    x = 150;
    y = 20;
    boxWidth = 28;
    boxHeight = 29;
  }
  
  boolean timeToReset() {
    return isReset;
  }
  
  void reset() {
    isReset = true;
  }

  void startOver() {
    isReset = false;
  }

  void display() {
    stroke(0);
    fill(255, 255, 255, 80);
    rect(x, y, boxWidth, boxHeight);
    image(resetIcon,x-10,y-10,50,50);
  }

  boolean isClicked(int xPos, int yPos) {
    if ( (xPos > x) && (xPos < (x + boxWidth)) && (yPos > y) && (yPos < (y + boxHeight) ) ) {
      return true;
    } else {
      return false;
    }
  }
}

class Road {
  int x;
  int y;
  int boxWidth;
  int boxHeight;
  boolean isCompleted;
  float rotateAmount;
  int slopeType;

  Road(int _x, int _y, int _boxWidth, int _boxHeight, int _slopeType) {
    x = _x;
    y = _y;
    isCompleted = false;
    boxWidth = _boxWidth;
    boxHeight = _boxHeight;
    slopeType = _slopeType;
  }

  void display() {
    if (isCompleted) {
      noStroke();
      fill(120, 120, 120, 200);

    //to return to original state, just draw everything as it is for slopeType 0
      if (slopeType == 0) {
        rect(x, y, boxWidth, boxHeight);
      } 
      else if (slopeType == 1) {  //positive slope
        pushMatrix();
          translate(x+21, y+3);
          rotate(radians(30));
          rect(0, 0, boxWidth, boxHeight);
        popMatrix();
      } 
      else if (slopeType == 2) {  //negative slope
        pushMatrix();
          translate(x, y+6);
          rotate(radians(-30));
          rect(0, 0, boxWidth, boxHeight);
        popMatrix();
      }
    }
  }

  boolean isClicked(int xPos, int yPos) {
    if ( (xPos > x-20) && (xPos < (x + boxWidth+20)) && (yPos > y-15) && (yPos < (y + boxHeight+15) ) ) {
      return true;
    } else {
      return false;
    }
  }

  void switchState() {
    if (isCompleted) {
      isCompleted = false;
    } else {
      isCompleted = true;
    }
  }
}

class Score {
  int boxWidth;
  int boxHeight;
  int totalScore;

  Score() {
    totalScore = 0;
    boxHeight = 19;
    boxWidth = 20;
  }

  void display() {
    int x = 310;
    int y = 166;
    int boxSpace = 35;
    int vertSpace = 33;
    
    int maxScore = totalScore;
    maxScore = constrain(maxScore,0,10);
    
    for (int i=0; i<maxScore; i++) {
      stroke(0);
      fill(0);
      rect(x, y, boxWidth, boxHeight);
      x = x + boxSpace;
      if (i == 4) {
        y = y + vertSpace;
        x = 310;
      }
    }
  }

  void addScore(int amount) {
    totalScore = totalScore + amount;
  }

  void removeScore(int amount) {
    totalScore = totalScore - amount;
  }

  int theScore() {
    return totalScore;
  }
}

class Settlement {
  int x;
  int y;
  int settlementWidth;
  int settlementHeight;
  boolean isCompleted;

  Settlement() {
    x = width/2;
    y = height/2;
    isCompleted = false;
    settlementWidth = 15;
    settlementHeight = 19;
  }

  Settlement(int _x, int _y) {
    x = _x;
    y = _y;
    isCompleted = false;
    settlementWidth = 15;
    settlementHeight = 19;
  }

  void display() {
    if (isCompleted) {
      stroke(0);
      fill(0);
      rect(x, y, settlementWidth, settlementHeight);
      triangle(x-3, y, x+7, y-11, x+settlementWidth+3, y);
    }
  }

  boolean isClicked(int xPos, int yPos) {
    if ( (xPos > (x-3)) && (xPos < (x + settlementWidth+3)) && (yPos > (y-11)) && (yPos < (y + settlementHeight+3) ) ) {
      return true;
    } else {
      return false;
    }
  }

  void switchState(Score gameScore) {
    if (isCompleted) {
      isCompleted = false;
      gameScore.removeScore(1);
    } else {
      isCompleted = true;
      gameScore.addScore(1);
    }
  }
}



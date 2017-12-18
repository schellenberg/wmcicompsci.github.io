GameController game;

void setup() {
  size(300,300);
  game = new GameController();
}

void draw() {
  background(0,0,0);
  game.display();
}

void mouseClicked() {
  game.checkClick(mouseX, mouseY);
}
class Box {
  float x, y;
  boolean lightIsOn;
  float boxWidth, boxHeight;
  color lightOn;
  color lightOff;

  Box(float _x, float _y, float _boxWidth, float _boxHeight) {
    x = _x;
    y = _y;
    lightIsOn = true;
    boxWidth = _boxWidth;
    boxHeight = _boxHeight;

    lightOn = color(255, 161, 0);
    lightOff = color(20, 109, 204);
  }

  void setLocation(float _x, float _y) {
    x = _x;
    y = _y;
  }

  void toggle() {
    lightIsOn = !lightIsOn;
  }

  void turnOn() {
    lightIsOn = true;
  }

  void display() {
    if (lightIsOn) {
      fill(lightOn);
    } else {
      fill(lightOff);
    }
    rectMode(CENTER);
    rect(x, y, boxWidth, boxHeight);
  }

  boolean isClicked(float xPos, float yPos) {
    return (xPos > x - boxWidth/2) && (xPos < x + boxWidth/2) && (yPos > y - boxHeight/2) && (yPos < y + boxHeight/2);
  }
}
class Button {
  float x, y;
  float buttonWidth, buttonHeight;
  String label;
  color buttonColor, buttonBg;

  Button(float _x, float _y, float _buttonWidth, float _buttonHeight, String _label, color _buttonColor, color _buttonBg) {
    x = _x;
    y = _y;
    buttonWidth = _buttonWidth;
    buttonHeight = _buttonHeight;
    buttonColor = _buttonColor;
    buttonBg = _buttonBg;
    label = _label;
  }

  void display() {
    fill(buttonColor);
    rectMode(CENTER);
    rect(x, y, buttonWidth, buttonHeight);
    textAlign(CENTER, CENTER);
    fill(buttonBg);
    textSize(32);
    text(label, x, y);
  }

  boolean isClicked(float xPos, float yPos) {
    return (xPos > x - buttonWidth/2) && (xPos < x + buttonWidth/2) && (yPos > y - buttonHeight/2) && (yPos < y + buttonHeight/2);
  }

}
class GameBoard {
  int boardWidth;
  int boardHeight;
  int[][] boardState;
  Box[][] boardDisplay;
  float boxXSize;
  float boxYSize;
  float xOffset;
  float yOffset;
  Button reset;

  boolean hasWon;
  int totalSquares;
  int numberOfSquaresTurnedOff;

  GameBoard() {
    boardWidth = 2;
    boardHeight = 2;
    setSizes();

    reset = new Button(width/2, height - 0.1*height, 150, 0.15*height, "Reset", color(255, 161, 0), color(20, 109, 204) );

    boardState = new int[boardWidth][boardHeight];
    boardDisplay = new Box[boardWidth][boardHeight];

    //initialize boardState -- all on
    for (int i=0; i<boardWidth; i++) {
      for (int j=0; j<boardHeight; j++) {
        boardState[i][j] = 1;
      }
    }

    //initialize boardDisplay -- create each box
    for (int i=0; i<boardWidth; i++) {
      for (int j=0; j<boardHeight; j++) {
        boardDisplay[i][j] = new Box(i*boxXSize + xOffset, j*boxYSize + yOffset, boxXSize, boxYSize);
      }
    }
  }

  void setSizes() {
    boxXSize = width*.75/boardWidth;
    boxYSize = height*.75/boardHeight;
    xOffset = boxXSize/2 + width*.125;
    yOffset = boxYSize/2 + height*.05;

    hasWon = false;
    totalSquares = boardWidth * boardHeight;
    numberOfSquaresTurnedOff = 0;
  }

  void display() {
    //show each box
    for (int i=0; i<boardWidth; i++) {
      for (int j=0; j<boardHeight; j++) {
        boardDisplay[i][j].display();
      }
    }
    reset.display();
  }

  void checkClick(float x, float y) {
    //show each box
    for (int i=0; i<boardWidth; i++) {
      for (int j=0; j<boardHeight; j++) {
        if ( boardDisplay[i][j].isClicked(x, y) ) {
          toggleAdjacents(i, j);
        }
      }
    }
    if (reset.isClicked(x, y)) {
      resetBoard();
    }
  }

  void resetBoard() {
    setSizes();
    boardDisplay = new Box[boardWidth][boardHeight];

    //initialize boardDisplay -- create each box
    for (int i=0; i<boardWidth; i++) {
      for (int j=0; j<boardHeight; j++) {
        boardDisplay[i][j] = new Box(i*boxXSize + xOffset, j*boxYSize + yOffset, boxXSize, boxYSize);
      }
    }

    //turn all boxes on
    for (int i=0; i<boardWidth; i++) {
      for (int j=0; j<boardHeight; j++) {
        boardDisplay[i][j].turnOn();
      }
    }
    numberOfSquaresTurnedOff = 0;
  }

  void toggleAdjacents(int i, int j) {
    //toggle self
    boardDisplay[i][j].toggle();

    //toggle above
    if (j > 0) {
      boardDisplay[i][j-1].toggle();
    }

    //toggle below
    if (j < boardHeight-1) {
      boardDisplay[i][j+1].toggle();
    }

    //toggle left
    if (i > 0) {
      boardDisplay[i-1][j].toggle();
    }

    //toggle right
    if (i < boardWidth-1) {
      boardDisplay[i+1][j].toggle();
    }
  }

  boolean checkIfWon() {
    numberOfSquaresTurnedOff = 0;
    for (int i=0; i<boardWidth; i++) {
      for (int j=0; j<boardHeight; j++) {
        if ( boardDisplay[i][j].lightIsOn == false ) {
          numberOfSquaresTurnedOff++;
        }
      }
    }

    if (numberOfSquaresTurnedOff >= totalSquares) {
      hasWon = true;
    } else {
      hasWon = false;
    }
    return hasWon;
  }
}

class GameController {
  String state;
  GameBoard theGame;
  Menu theMenu;
  VictoryScreen winScreen;

  GameController() {
    state = "Menu";
    theGame = new GameBoard();
    theMenu = new Menu();
    winScreen = new VictoryScreen();
  }

  void display() {
    if (state == "Menu") {
      theMenu.display();
    } else if (state == "Game") {
      theGame.display();
    }
    else if (state == "Win Screen") {
      winScreen.display();
    }
  }

  void checkClick(float x, float y) {
    if (state == "Menu") {
      if (theMenu.checkClick(mouseX, mouseY) == "Play") {
        state = "Game";
      }
    }
    else if (state == "Game") {
      theGame.checkClick(mouseX, mouseY);
      if (theGame.checkIfWon() == true) {
        theGame.boardWidth++;
        theGame.boardHeight++;
        theGame.resetBoard();
//        state = "Win Screen";
      }
    }
  }
}
class Menu {
  Button play;
  //Button highScores;
  color playButton, buttonBg;

  Menu() {
    playButton = color(255, 161, 0);
    buttonBg = color(20, 109, 204);
    play = new Button(width/2, height/2, 150, 100, "Play", playButton, buttonBg);
  }

  void display() {
    play.display();
  }

  String checkClick(float x, float y) {
    if (play.isClicked(mouseX, mouseY)) {
      return "Play";
    } else {
      return "Nothing";
    }
  }
}
class VictoryScreen {
  String congratsMessage;
  color bgColor;

  VictoryScreen() {
    congratsMessage = "Way to go!";
    bgColor = color(0);
  }

  void display() {
    background(bgColor);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(48);
    text(congratsMessage, width/2, height*.3);
  }
}

/* @pjs font="GOTHIC.TTF"; */

//import ddf.minim.*;

//mac L
//colour game

//Minim minim;
//AudioPlayer song;

Swatch colour;
Menu menu;
ArrayList<ClickCircle> circles;
boolean clicked, okClick;

void setup() {
  size(500, 500);
  colour=new Swatch();
  circles=new ArrayList<ClickCircle>();
  clicked=false;
  okClick=true;
  menu=new Menu();
  
  //minim = new Minim(this);
  //song = minim.loadFile("Marconi Union - Weightless.mp3");
}

void draw() {

  //song.play();
  
  //basically the whole game is held in this one command
  menu.display(colour, menu);
  
//just an aesthetic, does the circle thing when you click
  for (int i= 0; i<circles.size (); i++) {
    circles.get(i).display(colour,menu);
  }
  //calls the click function for the circles
  click();
}


//click function
void click() {
  if (mousePressed) {
    if (clicked) {
      makeCircle();
      clicked=false;
    }
  } else {
    clicked=true;
  }
}


//makes the click circles
void makeCircle() {
  for (int i=1; i>0; i--) {
    circles.add(new ClickCircle());
  }
  for (int i=0; i<circles.size (); i++) {
    if (circles.get(i).breadth>=width/8) {
      circles.remove(i);
    }
  }
}

class ClickCircle {
  int x, y;
  float breadth, maxsize, opacity, iter;

  ClickCircle() {
    //defining the variables
    x=mouseX;
    y=mouseY;
    breadth=0;
    opacity=100;
    iter=0.1;
    ellipseMode(CENTER);
  }
  
  //tells the circles to get bigger, decrease expansion rate, and fade away
  void display(Swatch theSwatch) {
    maxsize=width/8;
    noStroke();
    if(!menu.start){
     fill(menu.rainbowF,opacity); 
    }else{
    fill(theSwatch.differentColour, opacity);
    }
    ellipse(x, y, breadth, breadth);
    breadth=50*log(iter)+50;
    iter+=0.3;
    opacity=100-50*log(iter)+50;
  }
}
/* @pjs font="GOTHIC.TTF"; */

class Swatch {

  //class variables
  PFont font, myFont;
  color levelColour, differentColour;
  int level, score, startTime, lengthOfTimer, passTime, difficulty, oneSwatch;
  boolean levelChange, checkForInput, correct, gameover, victory, goahead;
  float iter=0, bgr, bgb, bgg, outlineR, outlineG, outlineB, circleMinSize, r, g, b, difr, difg, difb, difx, dify, colourDif;
  String javaIntConduit;

  Swatch() {

    //defaults the difficulty to 3
    difficulty=3;

//picks the initial random colour
    r=int(random(255));
    g=int(random(255));
    b=int(random(255));
    
    //gives the breathing background something to mutate
    bgr=255;
    bgb=255;
    bgg=255;
    
    //reconciles the level colours
    levelColour=color(r, g, b);
    differentColour=color(r, g, b);
    
    //defines font
    font=loadFont("GOTHIC.TTF");
    
    //sets the level, score, and timer
    level=1;
    score=0;
    lengthOfTimer=0;
    startTime=1;
    
    //tells the game that it hasn't ended, and that a new level needs to start up
    levelChange=true;
    gameover=false;
    victory=false;
    goahead=false;
    
    rectMode(CENTER);
  }

  void display() {
    
    //makes the dimensions of the level match the difficulty
    int[] swatchLocations=new int[difficulty];
    
    //this redefines the size and difficulty, because it's mutable while the game is running
    oneSwatch=(3*(width/5))/difficulty;

    //determines background colour
    bgr=127.5*sin(iter)+127.5;
    bgb=127.5*sin(iter)+127.5;
    bgg=127.5*sin(iter)+127.5;
    background(map(bgr, 0, 255, 229, 255), map(bgb, 0, 255, 223, 255), map(bgg, 0, 255, 235, 255));
    
    //determines an inverted colour of the background for outlines
    outlineR=127.5*cos(iter)+127.5;
    outlineG=127.5*cos(iter)+127.5;
    outlineB=127.5*cos(iter)+127.5;
    //iterations
    iter+=0.02;

    if (!gameover && !victory && !mousePressed) {
      
      //shows the score and timer
      headsUp();
      
      //sets variables back to normal
      noStroke();
      if (!mousePressed) {
        checkForInput=true;
      }
      
      //draws the initial swatches
      for (int i=difficulty; i>0; i--) {
        swatchLocations[i-1]=(width/5 - oneSwatch)+((i)*oneSwatch);
      }

      fill(levelColour);
      for (int x = swatchLocations.length-1; x >= 0; x--) {
        for (int y = swatchLocations.length-1; y >= 0; y--) {
          fill(255-r, 255-g, 255-b, 50);
          rect(swatchLocations[x]+ oneSwatch/2, swatchLocations[y] + oneSwatch/2, oneSwatch-(50/difficulty)/2, oneSwatch-(50/difficulty)/2, 10);
          fill(levelColour);
          rect(swatchLocations[x] + oneSwatch/2, swatchLocations[y] + oneSwatch/2, oneSwatch-(50/difficulty), oneSwatch-(50/difficulty), 10);
        }
      }
      
      //draws the back option while playing
      if(mouseX<=100 && mouseY>=height-32 && mouseX>0 && mouseY<height){
        fill(255,255,0,50);
      }else{
      fill(0,0,0,50);
      }
      textSize(40);
      text("back", 50, height-2);

//checks for the level changing
      if (levelChange) {
        
        //defines the timer
        startTime+=(difficulty-lengthOfTimer)+2;
        
        //redefines the colours
        r=int(random(255));
        g=int(random(255));
        b=int(random(255));
        levelColour=color(r, g, b);
        differentColour=color(r, g, b);
        
        //finds a spot for the odd swatch
        difx=swatchLocations[int(random(difficulty))]+ oneSwatch/2;
        dify=swatchLocations[int(random(difficulty))]+ oneSwatch/2;
        levelChange=false;
      }
      
      //picks a different colour
      makeDif();
      
      //draws the different swatch
      fill(differentColour);
      rect(difx, dify, oneSwatch-(50/difficulty), oneSwatch-(50/difficulty), 10);
    }
  }

  void makeDif() {
    
    //picks different colour
    colourDif=(1-(13*log(level))+80);
    if (r-colourDif<0) {
      difr=r+colourDif;
    } else {
      difr=r-colourDif;
    }
    if (g-colourDif<0) {
      difg=g+colourDif;
    } else {
      difg=g-colourDif;
    }
    if (b+colourDif<0) {
      difb=b+colourDif;
    } else {
      difb=b-colourDif;
    }
    differentColour=color(difr, difg, difb);
  }

//checks for any sort of input from the player
  void input(Menu menu) {
    if (!gameover && !victory) {
      if (checkForInput && mousePressed) {
        
        //shows the victory screen if the player has one
        if (mouseX>=difx-(oneSwatch/2) && mouseX<=difx+(oneSwatch/2) && mouseY>=dify-(oneSwatch/2) && mouseY<=dify+(oneSwatch/2)) {
          if (level>=255) {
            victory=true;
            startTime+=9999-lengthOfTimer;
          }
          
          //moves on to the next level
          display();
          score+=1;
          level+=3;
          levelChange=true;
          checkForInput=false;
          
          //if someone wants to go back to the menu while playing the game
        } else if(mouseX<=100 && mouseY>=height-32 && mouseX>0 && mouseY<height){
        gameover=false;
        victory=false;
        level=1;
        score=0;
        levelChange=true;
        checkForInput=false;
        goahead=false;
        menu.start=false;
        menu.howto=false;
        menu.main=true;
        menu.buyTime=true;
        menu.okgo=false;
      }else {
        
        //shows game over screen if someone doesn't get the right swatch
          gameover=true;
          startTime+=9999-lengthOfTimer;

        }
      }
    }
  }

  void headsUp() {
    
    //outlines the score
    fill(map(outlineR, 0, 255, 229, 255), map(outlineG, 0, 255, 223, 255), map(outlineB, 0, 255, 235, 255));
    rect(width/2, 43, 105, 55, 10);
    fill(260-r, 260-g, 260-b);
    rect(width/2, 43, 100, 50, 10);
    
    //outlines the timer
    fill(map(outlineR, 0, 255, 229, 255), map(outlineG, 0, 255, 223, 255), map(outlineB, 0, 255, 235, 255));
    rect(width/2, 448, 105, 55, 10);
    fill(260-difr, 260-difg, 260-difb);
    rect(width/2, 448, 100, 50, 10);
    
    //sets the timer progression
    javaIntConduit=str(startTime-millis()/1000);
    lengthOfTimer=parseInt(javaIntConduit);
    
    //displays the values of the score and timer
    textAlign(CENTER);
    textSize(50);
    fill(levelColour);
    text(score, width/2, 60);
    fill(differentColour);
    text(lengthOfTimer, width/2, 465);
    
    //shows game over screen if time runs out
    if (lengthOfTimer<=0) {
      gameover=true;
      display();
      score+=1;
      level+=3;
      levelChange=true;
      checkForInput=false;
    }
  }
  
  //what happens when the player either wins or loses
  void result(Menu menu) {
    
    //if the player loses
    if (gameover && !mousePressed) {
      
      //determines background colour
      bgr=127.5*sin(iter)+127.5;
      bgb=127.5*sin(iter)+127.5;
      bgg=127.5*sin(iter)+127.5;
      background(map(bgr, 0, 255, 229, 255), map(bgb, 0, 255, 223, 255), map(bgg, 0, 255, 235, 255));
      iter+=0.02;
      
      //displays the message
      fill(0);
      textSize(75);
      text("GAME OVER", width/2, height/2-100);
      startTime=9999;
      textSize(50);
      text("play again", width/2, height/2+100);
      text("back to menu", width/2, height/2+200);
      text("your score:",width/2,height/2);
      text(level,width/2,height/2+50);
      goahead=true;
      victory=false;
    }
    
    //if the player wins
    if (victory && !mousePressed) {
      
      //determines background colour
      bgr=127.5*sin(iter)+127.5;
      bgb=127.5*sin(iter)+127.5;
      bgg=127.5*sin(iter)+127.5;
      background(map(bgr, 0, 255, 229, 255), map(bgb, 0, 255, 223, 255), map(bgg, 0, 255, 235, 255));
      iter+=0.02;
      
      //displays the message
      textSize(75);
      fill(0);
      text("YOU WIN", width/2, height/2-100); 
      startTime=9999;
      textSize(50);
      text("play again", width/2, height/2+100);
      text("back to menu", width/2, height/2+200);
      text("your score:",width/2,height/2);
      text(level,width/2,height/2+50);
      goahead=true;
      gameover=false;
    }

//starts the game over if the player selects play again
    if (mouseX>width/2-125 && mouseX<width/2+125 && mouseY>height/2+50 && mouseY<height/2+150) {
      if (mousePressed && (victory || gameover) && goahead) {
        gameover=false;
        victory=false;
        display();
        level=1;
        score=0;
        levelChange=true;
        checkForInput=false;
        goahead=false;
      }
    }
    
    //goes back to the main menu if the player selects back to menu
    if (mouseX>width/2-125 && mouseX<width/2+125 && mouseY>height/2+150 && mouseY<height/2+250) {
      if (mousePressed && (victory || gameover) && goahead) {
        gameover=false;
        victory=false;
        level=1;
        score=0;
        levelChange=true;
        checkForInput=false;
        goahead=false;
        menu.start=false;
        menu.howto=false;
        menu.main=true;
        menu.buyTime=true;
      }
    }
  }
  
  //basically compresses all the commands into one
  void go(Menu menu) {
    display();
    input(menu);
    result(menu);
  }
}
class Menu {

  boolean start, howto, main, okgo, startup, backToMenu, buyTime, difUp, difDown, uhoh;
  float bgr, bgg, bgb, iter, xgraph, rainR, rainG, rainB, xgraphF, rainRF, rainGF, rainBF;
  int difficulty;
  PFont font, myFont;
  color rainbow, rainbowF;

  Menu() {

    //makes it so the timer doesn't run out while the player is still on the menu
    buyTime=true;

    //tells the menu what to do
    backToMenu=false;
    startup=true;
    start=false;
    howto=false;
    main=true;

    //sets the menu to be ready for input
    okgo=true;

    //just gives dificulty a mutable value
    difficulty=0;

    //other stuff
    uhoh=true;
    xgraph=0.1;
    iter=0.2;
    textAlign(CENTER);
    font=loadFont("GOTHIC.TTF");
    myFont=createFont("GOTHIC.TTF",15,true);
  } 

  //shows the opening menu screen
  void display(Swatch theSwatch, Menu menu) {
    if(!okgo && !mousePressed){
          okgo=true;
        }

    //sets difficulty
    difficulty=theSwatch.difficulty;

    //just sets a really long timer
    if (buyTime) {
      theSwatch.startTime=9999;
      buyTime=false;
    }

    //font
    textFont(font);

    //background colour
    bgr=127.5*sin(iter)+127.5;
    bgb=127.5*sin(iter)+127.5;
    bgg=127.5*sin(iter)+127.5;
    background(map(bgr, 0, 255, 229, 255), map(bgb, 0, 255, 223, 255), map(bgg, 0, 255, 235, 255));
    iter+=0.02;

    //rainbow
    rainR=127.5*sin(xgraph + 4)+127.5;
    rainG=127.5*sin(xgraph + 2)+127.5;
    rainB=127.5*sin(xgraph)+127.5;
    rainbow=color(rainR, rainG, rainB);
    xgraph+=0.03;

    //fast rainbow
    rainRF=127.5*sin(xgraphF + 4)+127.5;
    rainGF=127.5*sin(xgraphF + 2)+127.5;
    rainBF=127.5*sin(xgraphF)+127.5;
    rainbowF=color(rainRF, rainGF, rainBF);
    xgraphF+=0.1;

    //writes the text
    if (main && okgo) {
      backToMenu=false;
      okgo=true;

      //main title
      textSize(70);
      fill(0);
      text("colour game", width/2 +1, height/3 +1);
      fill(rainbow);
      text("colour game", width/2, height/3);

      //play game text
      textSize(50);
      fill(160, 0, 0);
      text("start game", width/2 +1, height/2 +1);
      fill(255, 0, 0);
      text("start game", width/2, height/2);

      //how to play text
      fill(0, 0, 160);
      text("how to play", width/2 +1, 2*height/3 +1);
      fill(0, 0, 255);
      text("how to play", width/2, 2*height/3);

      //difficulty text
      fill(150, 150, 0);
      text(difficulty, width/2, 2*height/3 +100);
      text("+", width/2, 2*height/3+60);
      text("-", width/2, 2*height/3+140);
      fill(240, 240, 0);
      text(difficulty, width/2 +1, 2*height/3 +101);
      text("+", width/2 +1, 2*height/3+61);
      text("-", width/2 +1, 2*height/3+141);
      textSize(20);
      fill(0, 0, 0, 70);
      textFont(myFont);
      text("difficulty", width/2, height-20);
      textFont(font);

      //what happens if the howto option was selected
    } else if (howto) {
      okgo=true;

      //howto menu
      fill(192, 0, 174);
      textSize(30);
      text("Welcome to colour game!", width/2 +1, 51);
      text("To play, choose a dificulty.", width/2 +1, 101);
      text("A panel of swatches will have the", width/2 +1, 151);
      text("dimensions (difficulty x difficulty).", width/2 +1, 201);
      text("Click the swatch with a different", width/2 +1, 251);
      text("colour than the rest to move on to", width/2 +1, 301);
      text("the the next level, but be careful!", width/2 +1, 351);
      text("The further you progress,", width/2 +1, 401);
      text("the less the swatch sticks out!", width/2 +1, 451);
      fill(152, 59, 234);
      textSize(30);
      text("Welcome to colour game!", width/2, 50);
      text("To play, choose a dificulty.", width/2, 100);
      text("A panel of swatches will have the", width/2, 150);
      text("dimensions (difficulty x difficulty).", width/2, 200);
      text("Click the swatch with a different", width/2, 250);
      text("colour than the rest to move on to", width/2, 300);
      text("the the next level, but be careful!", width/2, 350);
      text("The further you progress,", width/2, 400);
      text("the less the swatch sticks out!", width/2, 450);

      //back option
      fill(152, 59, 234);
      if (mouseX<=110 && mouseX>=10 && mouseY<=height-5 && mouseY>=height-35) {
        fill(255, 255, 0);
        if (mousePressed && !backToMenu) {
          main=true;
          howto=false;
          start=false;
          okgo=false;
          backToMenu=true;
        }
      }
      //back to menu text
      text("MENU", 60, height-10);

      //if the player starts the game
    } else if (start) {
      theSwatch.go(menu);
      if (startup) {
        theSwatch.startTime+=5;
        startup=false;
      }

      //if the player increases the difficulty
    } else if (difUp) {
      if (!mousePressed) {
        theSwatch.difficulty+=1;
        main=true;
        difUp=false;
      }

      //if the player decreases the difficulty
    } else if (difDown) {
      if (!mousePressed) {
        if (theSwatch.difficulty>1) {
          theSwatch.difficulty-=1;
        }
        main=true;
        difDown=false;
      }
    }

    //runs the function that checks the type of input and reacts accordingly
    chosen(theSwatch);
  }

  //what happens when an option is selected
  void chosen(Swatch thisSwatch) {
    if (mousePressed && okgo) {

      //if the player selects start game
      if (mouseX>=width/2-135 && mouseX<=width/2+135 && mouseY>=height/2-13 -27.5 && mouseY<=height/2-13 +27.5 && !howto) {
        start=true;
        main=false;
        howto=false;
        okgo=false;
        thisSwatch.startTime+=thisSwatch.difficulty-thisSwatch.lengthOfTimer;

        //if the player selects howto
      } else if (mouseX>=width/2-145 && mouseX<=width/2+145 && mouseY>=2*height/3-13 -27.7 && mouseY<=2*height/3-13 +27.5 && !start) {
        howto=true;
        start=false;
        main=false;
        okgo=false;

        //if the player increases the difficulty
      } else if (mouseX>width/2-10 && mouseY<2*height/3+50 && mouseX<width/2+10 && mouseY>2*height/3+30 && !difUp && !howto) {
        difUp=true;
        howto=false;
        start=false;
        main=false;
        okgo=false;

        //if the player decreases the difficulty
      } else if (mouseX>width/2-10 && mouseY<2*height/3+130 && mouseX<width/2+10 && mouseY>2*height/3+110 && !howto) {
        difDown=true;
        howto=false;
        start=false;
        main=false;
        okgo=false;
      }
    }
  }
}



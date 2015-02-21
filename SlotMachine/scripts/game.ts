/// <reference path="button.ts" />
var canvas;
var stage: createjs.Stage;

// GAME OBJECTS
var game: createjs.Container; // Main Game Container Object
var background: createjs.Bitmap;
var spinButton: Button;
var betMaxButton: Button;
var betOneButton: Button;
var resetButton: Button;
var powerButton: Button;
var doubleBetButton: Button;

// Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var gameplayed = 0;

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

/* dislpay Variables */
var bet;
var credit;
var gamecount;
var winamount;
var jackpotText: createjs.Text;

// Variables for sound



var win = new Audio("assets/sound/winnning.wav");

// Tiles array
var tiles: createjs.Bitmap[] = [];
var tileContainers: createjs.Container[] = [];
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);    
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    main();
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
    winnings = 0;
}

function gameLoop() {
    stage.update();
}

function spinReels() {    
    // Add Spin Reels code here
    if (playerBet > 0) {
        game.removeChild(gamecount);
        gameplayed++;
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        console.log(fruits);
        for (var tile = 0; tile < 3; tile++) {
            if (turn > 0) {
                game.removeChild(tiles[tile]);
            }
            tiles[tile] = new createjs.Bitmap("assets/images/" + spinResult[tile] + ".jpg");
            tiles[tile].x = 62 + (127 * tile);
            tiles[tile].y = 95;
            game.addChild(tiles[tile]);
            console.log(game.getNumChildren());
            turn++;
        }
        addGameCount();
        resetFruitTally();

    }
    else {
        alert("Bet Not Placed.. Please Place the Bet");
    }
}
/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];
    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }  
    determineWinnings();
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        } else if (bananas == 3) {
            winnings = playerBet * 20;
        } else if (oranges == 3) {
            winnings = playerBet * 30;
        } else if (cherries == 3) {
            winnings = playerBet * 40;
        } else if (bars == 3) {
            winnings = playerBet * 50;
        } else if (bells == 3) {
            winnings = playerBet * 75;
        } else if (sevens == 3) {
            winnings = playerBet * 100;
            winnings += jackpot;
            game.removeChild(jackpotText);
            jackpotText = new createjs.Text("You Won The Jackpot of $ 5000", "18px  Consolas", "White");
            jackpotText.x = 80;
            jackpotText.y = 20;
            game.addChild(jackpotText);
        } else if (grapes == 2) {
            winnings = playerBet * 2;
        } else if (bananas == 2) {
            winnings = playerBet * 2;
        } else if (oranges == 2) {
            winnings = playerBet * 3;
        } else if (cherries == 2) {
            winnings = playerBet * 4;
        } else if (bars == 2) {
            winnings = playerBet * 5;
        } else if (bells == 2) {
            winnings = playerBet * 10;
        } else if (sevens == 2) {
            winnings = playerBet * 20;
        }
          else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        playerMoney += winnings;
        playerBet = 0;
        addBet();
         showWinMessage();
    } else {
        lossNumber++;
        playerBet = 0;
        addBet();
        showLossMessage();
    }
}

function showWinMessage() {   
    win.play(); 
    addCredit();
    addWinAmount();
}

function showLossMessage() {
    console.log("You Lost" + playerBet);
    addWinAmount();
}


function addCredit() {
    game.removeChild(credit);
    credit = new createjs.Text("  " + playerMoney, "22px  Consolas", "white");
    credit.x = 350;
    credit.y = 310;
    game.addChild(credit);
}

function addGameCount() {
    game.removeChild(gamecount);
    gamecount = new createjs.Text(" " + gameplayed, "22px  Consolas", "white");
    gamecount.x = 220;
    gamecount.y = 310;
    game.addChild(gamecount);
}

function addWinAmount() {
    game.removeChild(winamount);
    winamount = new createjs.Text("  " + winnings, "22px  Consolas", "white");
    winamount.x = 175;
    winamount.y = 50;
    game.addChild(winamount);
}


function addBet() {
    game.removeChild(bet);
    bet = new createjs.Text("  " + playerBet, "22px  Consolas", "white");
    bet.x = 58;
    bet.y = 310;
    game.addChild(bet);
}


// Functions for betMaxButton 

function betMaxButtonClicked() {

    game.removeChild(bet);
    game.removeChild(credit);
    if (playerBet+10 <= 100) {
        playerBet += 10;
        addBet();
        playerMoney -= 10;
        addCredit();
    }
    else {
        playerMoney += playerBet;
        playerBet = 0;
        game.removeChild(winamount);
        game.removeChild(gamecount);
        alert("Maximum Bet Amount is 100");
        addBet();
        addCredit();
        addGameCount();
        addWinAmount();
    }
}


// Functions for powerButton 

function powerButtonClicked()
{
    if (confirm("Are you Sure You Want to exit ?"))
    {
        self.close();
    }  
}

// Functions for resetButton 

function resetButtonClicked() {
    game.removeChild(bet);
    game.removeChild(credit);
    game.removeChild(winamount);
    game.removeChild(gamecount);
    resetFruitTally();
    playerBet = 0;
    gameplayed = 0;
    playerMoney = 1000;
    addBet();
    addCredit();
    addGameCount();
    addWinAmount();
}

// Functions for betOneButton 

function betOneButtonClicked() {                
        game.removeChild(bet);  
    game.removeChild(credit);    
    win.pause();      
    if (playerBet+1 <= 100) {
        playerBet++;
        addBet();
        playerMoney--;
        addCredit();
    }
    else {
        game.removeChild(gamecount);
        game.removeChild(winamount);
        playerMoney += playerBet;
        playerBet = 0;
        alert("Maximum Bet Amount is 100");        
        addBet();
        addCredit();
        addGameCount();
        addWinAmount();        
    }        
}

function doubleBetButtonClicked() {
    game.removeChild(bet);
    game.removeChild(credit); 
    if (playerBet*2 <= 100) {
        playerBet *= 2;
        addBet();
        playerMoney -= playerBet/2;
        addCredit();
    }
    else {
        game.removeChild(gamecount);
        game.removeChild(winamount);
        playerMoney += playerBet;
        playerBet = 0;
        alert("Maximum Bet Amount is 100");
        addBet();
        addCredit();
        addGameCount();
        addWinAmount();
        addWinAmount();
    }
}

function creatUI(): void {
   
    background = new createjs.Bitmap("assets/images/background.jpg");
    game.addChild(background); // Add the background to the game container

    // Spin Button

    spinButton = new Button("assets/images/spinButton.jpg",337,354);
    game.addChild(spinButton.getImage());    

    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinReels);    

    // Reset Button
    resetButton = new Button("assets/images/resetButton.jpg",20,20);
    game.addChild(resetButton.getImage());    

    // Reset Button Event Listeners
    resetButton.getImage().addEventListener("click", resetButtonClicked);

    // Power Button
    powerButton = new Button("assets/images/powerButton.jpg",380,20);
    game.addChild(powerButton.getImage());
   

    // Power Button Event Listeners
    powerButton.getImage().addEventListener("click", powerButtonClicked);

    // Doblebet Button 
    doubleBetButton = new Button("assets/images/doubleBetButton.jpg",124,354);
    game.addChild(doubleBetButton.getImage());  

    // DobleBetButton Event Listeners
    doubleBetButton.getImage().addEventListener("click", doubleBetButtonClicked);

    // Bet Max Button
    betMaxButton = new Button("assets/images/betMaxButton.jpg",231,354);
    game.addChild(betMaxButton.getImage()); 

    // betMax Button Event Listeners
    betMaxButton.getImage().addEventListener("click", betMaxButtonClicked);


    // Bet One Button
    betOneButton = new Button("assets/images/betOneButton.jpg",20,354);
    game.addChild(betOneButton.getImage());    

    // betOne Button Event Listeners
    betOneButton.getImage().addEventListener("click", betOneButtonClicked);    
}

// Our Game Kicks off in here
function main() {
    // instantiate my game container
    game = new createjs.Container();
    game.x = 23;
    game.y = 6;

    game.addChild(bet);
    game.addChild(winamount);
    game.addChild(gamecount);
    game.addChild(credit);
    creatUI();

    stage.addChild(game);
}
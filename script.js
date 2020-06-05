// @ts-nocheck

/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const STARTSCHERM = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3
const xPlayButton = 540;
const yPlayButton = 100;
var spelStatus = STARTSCHERM;

var spelerKolom = 11; // x-positie van speler
var spelerRij = 17; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandKolom = 11;   // x-positie van vijand
var vijandRij = 3;   // y-positie van vijand

var mouseKolom = Math.floor(mouseX / 40);
var mouseRij = Math.floor(mouseY / 40);
var score = 0; // aantal behaalde punten



var tegelBreedte = 40, tegelHoogte = 40;
var veldBreedte = 1280 / tegelBreedte - 6, veldHoogte = 720 / tegelHoogte;

var veld = [
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], //1
        [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1], //2
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //3
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //4
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1], //5
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1], //6
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 0, 0, 1, 0, 0, 1, 1, 1, 1], //7
        [1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 2, 2, 2, 2, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1], //8
        [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1], //9
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1], //10
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1], //11
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1], //12
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], //13
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //14        
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1], //15
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1], //16
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1], //17
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //18
]; // dit is het veld (A site Inferno)

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */

var schade = 0;
var hoeveelSchade = function () {
    var omhoogOmlaag = Math.floor(Math.random() * 2 + 1);
    console.log(omhoogOmlaag);

    var rngOmlaag = function() {
        schade = 30/* test */ * 1 + random(0,0.25);
        console.log(schade);
    };

    var rngOmhoog = function() {
        schade = 30 /* test */ * 1 - random(0,0.25);
        console.log(schade);
    };

    if (omhoogOmlaag = 1) {
        rngOmlaag()
    }

    if (omhoogOmlaag = 2) {
        rngOmhoog()
    }
    
};

var tekenTegel = function(kolom, rij) {
    if (veld[rij][kolom] === 0) {
    fill(255, 255, 255);
  } else if (veld[rij][kolom] === 1) {
    fill(0, 0, 0);
  } else if (veld[rij][kolom] === 2) {
    fill(255, 127, 80);
  }
  rect(kolom * 40, rij * 40, 40, 40);
}

var tekenVeld = function () {
    stroke(255, 211, 0);
    strokeWeight(1);
    rect(20, 20, width - 2 * 20, height - 2 * 20);

    for (var kolom = 0; kolom < veldBreedte; kolom += 1) {
        for (var rij = 0; rij < veldHoogte; rij += 1) {
         tekenTegel(kolom, rij); 
        } 
    }
    //actiekolom
    fill(255, 0, 0);
    rect(1040, 0, 240, 720);

    //einde beurtknop
    fill(200, 0, 150);
    rect(1040, 620, 240, 720);
    fill(0, 0, 0);
    textSize(35);
    text("Einde beurt", 1070, 680);

    //actieknoppen
    text("Acties", 1100, 50);
    line(1040, 60, 1280, 60);
    //bewegen
    fill(255, 255, 255);
    rect(1050, 80, 220, 50);
    fill(0, 0, 0);
    text("Bewegen", 1085, 117);
};

/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(spelerKolom, spelerRij) {
  fill(0, 255, 100);
  ellipse(spelerKolom * 40 + 20, spelerRij * 40 + 20, 30, 30);
};

var tekenVijand = function(vijandKolom, vijandRij) {
  fill(255, 0, 0);
  ellipse(vijandKolom * 40 + 20, vijandRij * 40 + 20, 30, 30);
};





/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};

// Acties

var beweegActie = function() {
    
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}


var speelButton = function() {
    fill(3, 252, 61);
    rect(xPlayButton,yPlayButton,200, 80);
    fill(0,0,0);
    textSize(50);
    text("Spelen",560,115,730,170);
    if(mouseIsPressed && mouseX < xPlayButton + 200 && mouseY < yPlayButton + 80 && mouseX > xPlayButton && mouseY > yPlayButton) {
        spelStatus = SPELEN;
    } 
}

var xUitlegButton = 540;
var yUitlegButton = 200;
var uitlegButton = function () {
    fill(3, 252, 61);
    rect(xUitlegButton,yUitlegButton,200,80);
    fill(0,0,0);
    textSize(50);
    text("Uitleg",575,215,730,270);
    if(mouseIsPressed && mouseX < xUitlegButton + 200 && mouseX > xUitlegButton && mouseY < yUitlegButton + 80 && mouseY > yUitlegButton) {
        spelStatus = UITLEG;
    }
}

 var uitlegScherm = function () {
    fill(3, 252, 61);
    rect(180,100,900,500);
    fill(0,0,0);
    text("Hier komt de uitleg",200,150,850,480);


 }
/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  console.log("start draw");
  switch (spelStatus) {
    case SPELEN:
      beweegKogel();
      hoeveelSchade();
    
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
        tekenVeld();
        tekenSpeler(spelerKolom, spelerRij);
        tekenVijand(vijandKolom, vijandRij);

        if(keyIsPressed) {
            if(key === "m") {
                beweegActie();
            }
        }

      break;
    case STARTSCHERM:
      	speelButton();
        uitlegButton();




    break;


    case GAMEOVER:




    break;


    case UITLEG:
        tekenVeld();
        uitlegScherm();
        



    break;
  }
  
}

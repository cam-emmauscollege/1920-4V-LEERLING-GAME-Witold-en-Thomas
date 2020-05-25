// @ts-nocheck

// VERSIE 0.2

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

var schade = 0;
// kolom is verticaal, rij is horizontaal
var spelerKolom = 2; // x-positie van speler
var spelerRij = 3; // y-positie van speler

var kleurTegelNulR = 0; // R-waarde tegels met var 0
var kleurTegelNulG = 0; // G-waarde tegels met var 0
var kleurTegelNulB = 0; // B-waarde tegels met var 0

var aanvalBereik = 1; // hoeveel tegels om je heen kan je aanvallen
var aanvalActie = false; // ben je aan het aanvallen ja of nee
var aanvalTekst = "Aanvallen"; // tekst aanvalknop

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandKolom = 2;   // x-positie van vijand
var vijandRij = 5;   // y-positie van vijand



var score = 0; // aantal behaalde punten



var tegelBreedte = 40, tegelHoogte = 40;
var veldBreedte = 1280 / tegelBreedte - 6, veldHoogte = 720 / tegelHoogte;

var veld = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //1
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //2
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], //3
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], //4
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], //5
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], //6
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], //7
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //8
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], //9
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], //10
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1], //11
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1], //12
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1], //13
        [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //14        
        [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //15
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //16
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //17
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //18
]; // dit is het veld

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */

// functie die berekent hoeveel schade je doet als je aanvalt.
var hoeveelSchade = function () {
    // doe je meer of minder schade dan de standaardschade?
    var omhoogOmlaag = Math.floor(Math.random() * 2 + 1);
    console.log(omhoogOmlaag);

    // hoeveel minder schade doe je dan?
    var rngOmlaag = function() {
        schade = 30/* test */ * 1 + random(0,0.25);
        console.log(schade);
    };

    // hoeveel meer schade doe je dan?
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
    
}

var aanvalKnop = function() {
    // aanvalknop -- als je hierop klikt kan je de vijand aanvallen.
    fill(255, 255, 255);
    rect(1050, 150, 220, 50);
    fill(0, 0, 0);
    text(aanvalTekst, 1083, 186);

    if (mouseIsPressed && mouseY >= 150 && mouseY <= 200 && mouseX >= 1050 && mouseX <= 1270){
        aanvalActie = true;
        aanvalTekst = "bezig";
        fill(255, 255, 255);
        rect(1050, 150, 220, 50);
        fill(0, 0, 0);
        text(aanvalTekst, 1083, 186);
        // fill(0,0,0);
        // rect(100,100,300,300);
    }
}

// tekent de vakjes als deze functie wordt aangeroepen
var tekenTegel = function(kolom, rij) {
    if (veld[rij][kolom] === 0) {
    fill(255, 255, 255);
  } else if (veld[rij][kolom] === 1) {
    fill(kleurTegelNulR, kleurTegelNulG, kleurTegelNulB);
  } else if (veld[rij][kolom] === 2) {
    fill(100, 255, 100);
  } else if (veld[rij][kolom] === 3) {
      fill(5,50,250);
  }
  rect(kolom * 40, rij * 40, 40, 40);
}

var tekenVeld = function () {
    stroke(255, 211, 0);
    strokeWeight(1);
    rect(20, 20, width - 2 * 20, height - 2 * 20);
    // genereert het aantal vakjes horizontaal(rij) en verticaal(kolom)
    for (var kolom = 0; kolom < veldBreedte; kolom += 1) {
        for (var rij = 0; rij < veldHoogte; rij += 1) {
         tekenTegel(kolom, rij); 
        } 
    }
    //actiekolom
    noStroke();
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

    //teken aanvalknop
    aanvalKnop();
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


var aanvallen = function() {
    // aanvalmogelijkheden -- vakjes die aangevallen kunnen worden veranderen van kleur
    if (aanvalActie === true) {

        if(veld[spelerKolom + aanvalBereik][spelerRij] === 0) {
            veld[spelerKolom + aanvalBereik].splice(spelerRij,1,3);
        }

        if(veld[spelerKolom - aanvalBereik][spelerRij] === 0) {
            veld[spelerKolom - aanvalBereik].splice(spelerRij,1,3);
        }

        if(veld[spelerKolom][spelerRij - aanvalBereik] === 0) {
            veld[spelerKolom].splice(spelerRij - aanvalBereik,1,3)
        }

        if(veld[spelerKolom][spelerRij + aanvalBereik] === 0) {
            veld[spelerKolom].splice(spelerRij + aanvalBereik,1,3)
        }
        
        if(veld[spelerKolom + aanvalBereik][spelerRij + aanvalBereik] === 0) {
            veld[spelerKolom + aanvalBereik].splice(spelerRij + aanvalBereik,1,3)
        }

        if(veld[spelerKolom + aanvalBereik][spelerRij - aanvalBereik] === 0) {
            veld[spelerKolom + aanvalBereik].splice(spelerRij - aanvalBereik,1,3)
        }

        if(veld[spelerKolom - aanvalBereik][spelerRij - aanvalBereik] === 0) {
            veld[spelerKolom - aanvalBereik].splice(spelerRij - aanvalBereik,1,3)
        }

        if(veld[spelerKolom + aanvalBereik][spelerRij - aanvalBereik] === 0){
            veld[spelerKolom - aanvalBereik].splice(spelerRij - aanvalBereik,1,3)
        }
    }    
}




/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegActie = function() {
    if(mouseX >= kolom * tegelBreedte && mouseX <= kolom * tegelBreedte + tegelBreedte && mouseY >= rij * tegelHoogte && mouseY <= rij * tegelHoogte + tegelHoogte ) {
        veld[rij][kolom] === 2
    }
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
      //hoeveelSchade();
    
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
        aanvallen();

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

// @ts-nocheck

// VERSIE 0.4

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
const UITLEG = 3;

const xPlayButton = 540;
const yPlayButton = 100;
const xUitlegButton = 540;
const yUitlegButton = 200;

const wit = 0;
const zwart = 1;
const oranje = 2;
const donkerblauw = 3;
const lichtblauw = 4;

var spelerTurn = true;
var vijandTurn = false;
var spelStatus = STARTSCHERM;

var schade = 0;

// kolom is verticale verplaatsing, rij is horizontale verplaatsing

var welkeSpelerKolom = 0; // relatief aan welke speler wordt een functie gebruikt
var welkeSpelerRij = 0; // relatief aan welke speler wordt een functie gebruikt
var welkeVijandKolom = 0; // relatief aan welke vijand wordt een functie gebruikt
var welkeVijandRij = 0; // relatief aan welke vijand wordt een functie gebruikt

var aanDeBeurt = "iemand";
var aanvalBereik = 1; // hoeveel tegels om je heen kan je aanvallen
var aanvalActie = false; // ben je aan het aanvallen ja of nee
var aanvalTekst = "Aanvallen"; // tekst aanvalknop
var aanvalKnopStatus = false;
var aanvalKlaar = false;
var spacebar = false;
var vijandBinnenBereik = false;

var spelerKolom = 8; // x-positie van speler
var spelerRij = 14; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandKolom = 9;   // x-positie van vijand
var vijandRij = 15;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var schade = 0; // hoeveel schade doe je als je iemand raakt
var spelerLevens = 100; // hoeveel levens heeft de speler
var vijandLevens = 500; // hoeveel levens heeft de vijand


var tegelBreedte = 40, tegelHoogte = 40;
var veldBreedte = 1280 / tegelBreedte - 6, veldHoogte = 720 / tegelHoogte;

//aanvalvakken selecteerstatus


// hieruit wordt de standaardschade gehaald als je iets aanvalt
var standaarSchadeArray = [30,40,50]  // WIP -- schade nu is testschade
//welke aanval wordt er gedaan en de bijbehorende schade
// deze variabele wordt aangepast afhankelijk van welke aanval er geselecteerd wordt.
var welkeAanval = 0;

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

var aanvalMouseKolom = function() {
    return Math.floor(mouseX /40);
}

var aanvalMouseRij = function() {
    return Math.floor(mouseY / 40);
}

// tekent de speelknop
var speelButton = function() {
    fill(3, 252, 61);
    rect(xPlayButton,yPlayButton,200, 80);
    fill(0,0,0);
    textSize(50);
    text("Spelen",560,115,730,170);

    if(mouseIsPressed && mouseX <= xPlayButton + 200 && mouseY <= yPlayButton + 80 && mouseX >= xPlayButton && mouseY >= yPlayButton) {
        spelStatus = SPELEN;
    } 
}

// tekent de uitlegknop
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

//tekent het uitlegscherm
var uitlegScherm = function () {
    fill(3, 252, 61);
    rect(180,100,900,500);
    fill(0,0,0);
    text("Hier komt de uitleg",200,150,850,480);
}

// laat zien hoeveel levens speler 1/vijand nog heeft
var levensVanSpeler = function() {
    stroke(41, 120, 51);
    strokeWeight(1);
    textSize(15);
    fill(41, 120, 51);
    text(spelerLevens, (spelerKolom * 40) + 7,spelerRij * 40);
}

// laat zien hoeveel leven speler 2/vijand nog heeft
var levensVanVijand = function() {
    textSize(15);
    fill(41, 120, 51);
    text(vijandLevens, (vijandKolom * 40) + 7,vijandRij * 40);
}

// functie die berekent hoeveel schade je doet als je aanvalt.
var hoeveelSchade = function (standaardSchade) {
    var omhoogOmlaag = Math.floor(Math.random(standaardSchade) * 2 + 1);

    // hoeveel minder schade doe je dan?
    var rngOmlaag = function() {
        schade = standaardSchade + (random(0,0.25) * standaardSchade);
    };

    // hoeveel meer schade doe je dan?
    var rngOmhoog = function() {
        schade = standaardSchade - (random(0,0.25) * standaardSchade);
    };

    if (omhoogOmlaag === 1) {
        rngOmlaag()
    }

    if (omhoogOmlaag === 2) {
        rngOmhoog()
    }

    schade = round(schade);
    
}

//laat zien wie er aan de beurt is
var wieIsAanDeBeurt = function() {
    textSize(22);
    stroke(0,0,0);
    strokeWeight(2);
    fill(0,0,0);
    text(aanDeBeurt + " is aan de beurt",1040,480,240,100);
}

// tekent de terugknop
var terugKnop = function(){
    strokeWeight(1)
    stroke(0,0,0)
    fill(255, 255, 255);
    rect(1040, 520, 240, 100);
    noStroke();
    fill(0, 0, 0);
    textSize(35);
    text("Terug", 1110, 580);
    if(mouseIsPressed) {
        if (mouseButton === LEFT &&
            mouseX <= 1280 &&
            mouseX >= 1040 &&
            mouseY <= 620 &&
            mouseY >= 520) {
                aanvalActie = false;
                veranderKleurRondSpeler(donkerblauw,wit,welkeSpelerKolom,welkeSpelerRij);
                aanvalTekst = "Aanvallen";
                fill(255, 255, 255);
                rect(1050, 150, 220, 50);
                fill(0, 0, 0);
                text(aanvalTekst, 1083, 186);
                veranderKleurRondSpeler(lichtblauw,wit,welkeSpelerKolom,welkeSpelerRij);
                aanvalKnopStatus = false;
        }
    }
}

var aanvalKnop = function() {
    // aanvalknop -- als je hierop klikt kan je de vijand aanvallen.
    fill(255, 255, 255);
    rect(1050, 150, 220, 50);
    fill(0, 0, 0);
    text(aanvalTekst, 1083, 186);

    if(mouseIsPressed) {
        if (mouseButton === LEFT && mouseY >= 150 && mouseY <= 200 && mouseX >= 1050 && mouseX <= 1270){
            aanvalActie = true;
            aanvalKnopStatus = true;
        }
    }

    if(aanvalKnopStatus === true){
            fill(47, 255, 0);
            rect(1050, 150, 220, 50);
            fill(0, 0, 0);
            text(aanvalTekst, 1083, 186);
    }
}


var aanvalVakSelectie = function() {
    if(aanvalActie === true) {
        deselecteerVak();
        selecteerVak(welkeSpelerKolom,welkeSpelerRij);
            
        }
    }

var selecteerVak = function(wieIsSpelerKolom,wieIsSpelerRij) {
    // alleen linkermuisknop detecteren als muis ingedrukt wordt
        if (mouseIsPressed) {
            var mouseKolom = aanvalMouseKolom();
            var mouseRij = aanvalMouseRij();
         
            if (mouseKolom >= wieIsSpelerKolom - aanvalBereik &&
                mouseKolom <= wieIsSpelerKolom + aanvalBereik && 
                mouseRij >= wieIsSpelerRij - aanvalBereik && 
                mouseRij <= wieIsSpelerRij + aanvalBereik &&
                !(mouseRij == wieIsSpelerRij &&
                mouseKolom == wieIsSpelerKolom) && veld[mouseRij][mouseKolom] !== zwart){
                    if(mouseButton === LEFT){
                        veranderKleurRondSpeler(lichtblauw,donkerblauw,welkeSpelerKolom,welkeSpelerRij);
                        veld[mouseRij].splice(mouseKolom,1,lichtblauw)
                    }
            }            
        }
}

var deselecteerVak = function () {
    // een vak deselecteren
        if(keyIsPressed === true && keyCode === BACKSPACE) {
            veranderKleurRondSpeler(lichtblauw,donkerblauw,welkeSpelerKolom,welkeSpelerRij);
        }
}        
        
// tekent de vakjes als deze functie wordt aangeroepen
var tekenTegel = function(kolom, rij) {
    if (veld[rij][kolom] === wit) {
    fill(255, 255, 255);
  } else if (veld[rij][kolom] === zwart) {
    fill(0, 0, 0);
  } else if (veld[rij][kolom] === oranje) {
    fill(100, 255, 100);
  } else if (veld[rij][kolom] === donkerblauw) {
    fill(0,0,255);
  } else if(veld[rij][kolom] === lichtblauw) {
    fill(0,217,255);
  }
  rect(kolom * 40, rij * 40, 40, 40);
}

var tekenVeld = function () {
    stroke(255, 0, 115);
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

    //terugknop
    terugKnop();

    //wie is er aan de beurt
    wieIsAanDeBeurt();
}

// tekent de speler
var tekenSpeler = function(spelerKolom, spelerRij) {
  fill(0, 255, 100);
  ellipse(spelerKolom * 40 + 20, spelerRij * 40 + 20, 30, 30);
}

// tekent de vijand
var tekenVijand = function(vijandKolom, vijandRij) {
  fill(255, 0, 0);
  ellipse(vijandKolom * 40 + 20, vijandRij * 40 + 20, 30, 30);
}


var aanvallen = function() {
    // aanvalmogelijkheden -- vakjes die aangevallen kunnen worden veranderen van kleur
    if (aanvalActie === true) {
        veranderKleurRondSpeler(wit,donkerblauw,welkeSpelerKolom,welkeSpelerRij);
        vijandDetectie(welkeSpelerKolom,welkeSpelerRij,welkeVijandRij,welkeVijandKolom);
        aanvalVakSelectie();

        if(veld[welkeVijandRij][welkeVijandKolom] === lichtblauw){
            document.body.onkeyup = function(e){
                if(e.keyCode == 32){
                    spacebar = true;
                }
            }
        }

        if(spacebar === true){
        schadeDoenTegenVijand();
        }

        if(aanvalKlaar === true) {
            veranderKleurRondSpeler(donkerblauw,wit,welkeSpelerKolom,welkeSpelerRij);
            veranderKleurRondSpeler(lichtblauw,wit,welkeSpelerKolom,welkeSpelerRij);
            beurtCheck();
            aanvalActie = false;
            aanvalKlaar = false;
        }
    }    
}

// oudekleur = oude kleur vakje
// nieuwekleur = nieuwe kleur vakje
var veranderKleurRondSpeler = function(oudekleur,nieuwekleur,wieIsSpelerKolom,wieIsSpelerRij) {
    for(var k = wieIsSpelerKolom - aanvalBereik; k < wieIsSpelerKolom + aanvalBereik + 1; k++){
        for(var r = wieIsSpelerRij - aanvalBereik; r < wieIsSpelerRij + aanvalBereik + 1; r++){
		    if(!(k === wieIsSpelerKolom && r === wieIsSpelerRij) && veld[r][k] === oudekleur) {
				veld[r].splice(k,1,nieuwekleur)
			}
        }
    }
}


var gameOver = function() {
    if(vijandLevens <=  0 || spelerLevens <= 0) {
        spelStatus = GAMEOVER;
    } 
}
// wordt er op de spacebar gedrukt?


// als er op de spacebar gedrukt wordt en het vak van de vijand is geselecteerd
// doe dan x schade(schade is voorlopig nog random)
var schadeDoenTegenVijand = function() {    
    aanvalSelectie();
    hoeveelSchade(standaarSchadeArray[welkeAanval]);
    if(spelerTurn === true) {
        vijandLevens = vijandLevens - schade;
    }
    if(vijandTurn === true) {
        spelerLevens = spelerLevens - schade;
    }
    levensVanVijand();
    aanvalKlaar = true;
    spacebar = false;
    fill(255, 255, 255);
    rect(1050, 150, 220, 50);
    fill(0, 0, 0);
    text(aanvalTekst, 1083, 186);
    aanvalKnopStatus = false; 
}

// detecteert of de vijand in het aanvalbereik zit
var vijandDetectie = function(wieIsSpelerKolom,wieIsSpelerRij,wieIsVijandRij, wieIsVijandKolom) {
    for(var k = wieIsSpelerKolom - aanvalBereik; k < wieIsSpelerKolom + aanvalBereik + 1; k++){
        for(var r = wieIsSpelerRij - aanvalBereik; r < wieIsSpelerRij + aanvalBereik + 1; r++){
		    if(wieIsVijandRij === r && wieIsVijandKolom === k) {
                vijandBinnenBereik = true;
            }
        }
    }
}

// aanvalselectie is tijdelijk random
var aanvalSelectie = function(){
    welkeAanval = Math.floor(random(0,standaarSchadeArray.length));
}


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegActie = function() {
    if(mouseX >= kolom * tegelBreedte && mouseX <= kolom * tegelBreedte + tegelBreedte && mouseY >= rij * tegelHoogte && mouseY <= rij * tegelHoogte + tegelHoogte ) {
        veld[rij][kolom] === 2
    }
}

// wat moet de vijand doen als hij aan de beurt is
var turnVijand = function() {
    besteOptie(); // op deze manier? ff over hebben
    if(besteOptie() === 1) {
        beweegVijand();
    }
    if(besteOptie() === 2) {
        vijandAanval();
    }
    // meer opties later
}

var gameOverScherm = function() {
    createCanvas(1280, 720);
    background("blue")
    fill(3, 252, 61);
    rect(400,100,500, 100);
    fill(0,0,0);
    textSize(50);
    text("Opnieuw Spelen",470,125,730,170);
    vijandLevens = 100;
    spelerLevens = 100;
    spelerTurn = true;
    vijandTurn = false;

    if(mouseIsPressed && mouseX <= 900 && mouseY <= 200 && mouseX >= 400 && mouseY >= 100) {
        spelStatus = SPELEN;
    }
}

var beurtCheck = function(){
    if(spelerTurn === true) {
        spelerTurn = false;
        vijandTurn = true;
    } else if (vijandTurn === true) {
        spelerTurn = true;
        vijandTurn = false;
    }
}

var welkeSpelerRijKolom = function() {
    if(spelerTurn === true){
        welkeSpelerKolom = spelerKolom;
        welkeSpelerRij = spelerRij;
        welkeVijandKolom = vijandKolom;
        welkeVijandRij = vijandRij;
        aanDeBeurt = "Speler 1";
    } else if(vijandTurn === true){
        welkeSpelerRij = vijandRij;
        welkeSpelerKolom = vijandKolom;
        welkeVijandRij = spelerRij;
        welkeVijandKolom = spelerKolom;
        aanDeBeurt = "Speler 2";
    }
}




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



/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */

function draw() {
  console.log("start draw");
  switch (spelStatus) {
    case SPELEN:
        welkeSpelerRijKolom();
        tekenVeld();
        tekenSpeler(spelerKolom, spelerRij);
        tekenVijand(vijandKolom, vijandRij);

        if(spelerTurn === true) {
            aanvallen();
        }

        if(vijandTurn === true) {
            aanvallen();
        }

        levensVanSpeler();
        levensVanVijand();

        if(keyIsPressed) {
            if(key === "m") {
                beweegActie();
            }
        }

        gameOver();
    break;


    case STARTSCHERM:
      	speelButton();
        uitlegButton();




    break;

    case GAMEOVER:
        gameOverScherm();




    break;

    case UITLEG:
        uitlegScherm();
        



    break;
  }
  
}

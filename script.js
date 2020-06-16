// @ts-nocheck

// VERSIE 0.5

/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

const gamelogging = true;


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
const lichtgroen = 5;

var spelerTurn = true;
var vijandTurn = false;
var spelStatus = STARTSCHERM;

var schade = 0;

// kolom is verticale verplaatsing, rij is horizontale verplaatsing

var kleurTegelNulR = 0; // R-waarde tegels met var 0
var kleurTegelNulG = 0; // G-waarde tegels met var 0
var kleurTegelNulB = 0; // B-waarde tegels met var 0

var aanvalBereik = 1; // hoeveel tegels om je heen kan je aanvallen
var aanvalActie = false; // ben je aan het aanvallen ja of nee
var aanvalTekst = "Aanvallen"; // tekst aanvalknop
var aanvalKnopStatus = false;
var aanvalKlaar = false;
var spacebar = false;
var vijandBinnenBereik = false;

var beweegActie = false;
var beweegTekst = "Bewegen";
var beweegKnopStatus = false;
var bewegingKlaar = false;
var beweegpuntenSpeler = 5; //hoever je kan lopen per beurt

var spelerKolom = 10; // x-positie van speler
var spelerRij = 17; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandKolom = 12;   // x-positie van vijand
var vijandRij = 2;   // y-positie van vijand

var beurt = 0; 
var maxBeurten = 20; //maximale aantal beurten per spel

var schade = 0; // hoeveel schade doe je als je iemand raakt
var spelerLevens = 100; // hoeveel levens heeft de speler
var vijandLevens = 100; // hoeveel levens heeft de vijand

var tegelBreedte = 40, tegelHoogte = 40;
var veldBreedte = 1280 / tegelBreedte - 6, veldHoogte = 720 / tegelHoogte;

var mouseBuitenVeld = false; //als de muis buiten veld is, niet bewegen of schieten
//aanvalvakken selecteerstatus

// hieruit wordt de standaardschade gehaald als je iets aanvalt
var standaarSchadeArray = [30,40,50]  // WIP -- schade nu is testschade
//welke aanval wordt er gedaan en de bijbehorende schade
// deze variabele wordt aangepast afhankelijk van welke aanval er geselecteerd wordt.
var welkeAanval = 0;

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
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] //18
]; // dit is het veld (A site Inferno)

var max_kolom = veld[0].length;
var max_rij = veld.length;

var gamelog = function(text) {
    if (gamelogging) {
        console.log(text)
    }
}
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

var mouseKolom = function() {
    if(mouseX >= 0 && mouseX < 1040 && mouseY >= 0 && mouseY < 720) {
        return Math.floor(mouseX / 40);
    } else {
        return mouseBuitenVeld === true;
    }
}

var mouseRij = function() {
    if(mouseX >= 0 && mouseX < 1040 && mouseY >= 0 && mouseY < 720) {
        return Math.floor(mouseY / 40);
    } else {
        return mouseBuitenVeld === true;
    }
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

var levensVanSpeler = function() {
    stroke(41, 120, 51);
    strokeWeight(1);
    textSize(15);
    fill(41, 120, 51);
    text(spelerLevens, (spelerKolom * 40) + 7,spelerRij * 40);
}

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

var beweegKnop = function() {
    fill(255, 255, 255);
    rect(1050, 230, 220, 50);
    fill(0, 0, 0);
    text(beweegTekst, 1085, 267);

    if(mouseIsPressed) {
        if (mouseButton === LEFT && mouseY >= 230 && mouseY <= 280 && mouseX >= 1050 && mouseX <= 1270 && beweegpuntenSpeler > 0){
            beweegActie = true;
            beweegKnopStatus = true;
            aanvalActie = false;
            aanvalKnopStatus = false;
        }
    }
    if(keyIsPressed) {
        if(key === "m" && beweegpuntenSpeler > 0) {
            beweegActie = true;
            beweegKnopStatus = true;
            aanvalActie = false;
            aanvalKnopStatus = false;
        }
    }

    if(beweegKnopStatus === true){
            fill(47, 255, 0);
            rect(1050, 230, 220, 50);
            fill(0, 0, 0);
            text(beweegTekst, 1085, 267);
    }
}

var terugKnop = function(){  //
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
                beweegActie = false;
                veranderKleurRondSpeler(donkerblauw,wit);
                veranderKleurRondSpeler(lichtblauw,wit);
                aanvalKnopStatus = false;
                beweegKnopStatus = false;
        }
    }
}

var aanvalKnop = function() {
    // aanvalknop -- als je hierop klikt kan je de vijand aanvallen.
    fill(255, 255, 255);
    rect(1050, 300, 220, 50);
    fill(0, 0, 0);
    text(aanvalTekst, 1083, 336);

    if(mouseIsPressed) {
        if (mouseButton === LEFT && mouseY >= 300 && mouseY <= 350 && mouseX >= 1050 && mouseX <= 1270){
            aanvalActie = true;
            aanvalKnopStatus = true;
            beweegActie = false;
            beweegKnopStatus = false;
        }
    }
    if(keyIsPressed) {
        if(key === "n") {
            aanvalActie = true;
            aanvalKnopStatus = true;
            beweegActie = false;
            beweegKnopStatus = false;
        }
    }

    if(aanvalKnopStatus === true){
            fill(47, 255, 0);
            rect(1050, 300, 220, 50);
            fill(0, 0, 0);
            text(aanvalTekst, 1083, 336);
    }
}


var aanvalVakSelectie = function() {
    if(aanvalActie === true) {
        deselecteerVak();
        selecteerVak();
            
        }
    }

var beweegVakSelectie = function() {
    if(beweegActie === true) {
        deselecteerVak();
        selecteerVak();
            
        }
    }

var selecteerVak = function() {
    // alleen linkermuisknop detecteren als muis ingedrukt wordt
        if (mouseIsPressed) {
            var mKolom = mouseKolom();
            var mRij = mouseRij();
         
            if (mKolom >= spelerKolom - aanvalBereik &&
                mKolom <= spelerKolom + aanvalBereik && 
                mRij >= spelerRij - aanvalBereik && 
                mRij <= spelerRij + aanvalBereik &&
                !(mRij == spelerRij &&
                mKolom == spelerKolom) && veld[mRij][mKolom] !== zwart){
                    if(mouseButton === LEFT){
                        veranderKleurRondSpeler(lichtblauw,donkerblauw);
                        veld[mRij].splice(mKolom,1,lichtblauw)
                    }
            }            
        }
}

var deselecteerVak = function () {
    // een vak deselecteren
        if(keyIsPressed === true && keyCode === ESCAPE) {
            veranderKleurRondSpeler(lichtblauw,donkerblauw);
        }
}        
        
// tekent de vakjes als deze functie wordt aangeroepen
var tekenTegel = function(kolom, rij) {
    if (veld[rij][kolom] === wit) {
    fill(255, 255, 255);
  } else if (veld[rij][kolom] === zwart) {
    fill(kleurTegelNulR, kleurTegelNulG, kleurTegelNulB);
  } else if (veld[rij][kolom] === oranje) {
    fill(255, 102, 0);
  } else if (veld[rij][kolom] === donkerblauw) {
    fill(0,0,255);
  } else if(veld[rij][kolom] === lichtblauw) {
    fill(0,217,255);
  } else if(veld[rij][kolom] === lichtgroen) {
    fill(152, 251, 152);
  }
  rect(kolom * 40, rij * 40, 40, 40);
}

var tekenVeld = function() {
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

    
    //info
    textSize(16);
    fill(0, 0, 0);
    text("Beurt: " + beurt + "/" + maxBeurten, 1050, 30);
    text("Bewegingspunten over: " + beweegpuntenSpeler, 1050, 60);
    //text("Wapen: " + wapenSpeler, 1050, 90); als we tijd hebben
    //text("Kogels over: " + kogelsOverSpeler, 1050, 120); 
    //text("Reservekogels over: " + reserveKogelsOverSeler, 1050, 150);

    //einde beurtknop
    fill(200, 0, 150);
    rect(1040, 820, 240, 720);
    fill(0, 0, 0);
    textSize(35);
    text("Einde beurt", 1070, 680);


    //actieknoppen
    text("Acties", 1100, 200);
    line(1040, 160, 1280, 160); //waarom werkt dit niet?
    rect(1040, 159, 240, 2);
    
    //bewegen
    beweegKnop();
 
    //teken aanvalknop
    aanvalKnop();

    //terugknop
    terugKnop();
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
        veranderKleurRondSpeler(wit,donkerblauw);
        vijandDetectie();
        aanvalVakSelectie();

        if(veld[vijandRij][vijandKolom] === lichtblauw){
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
            veranderKleurRondSpeler(donkerblauw,wit);
            veranderKleurRondSpeler(lichtblauw,wit);
            aanvalActie = false;
            aanvalKlaar = false;
        } 
    }    
}

// oudekleur = oude kleur vakje
// nieuwekleur = nieuwe kleur vakje
var veranderKleurRondSpeler = function(oudekleur,nieuwekleur) {
    for(var k = spelerKolom - aanvalBereik; k < spelerKolom + aanvalBereik + 1; k++){
        for(var r = spelerRij - aanvalBereik; r < spelerRij + aanvalBereik + 1; r++){
		    if(!(k === spelerKolom && r === spelerRij) && !(k < 0 || k > max_kolom -1) && !(r < 0 || r > max_rij - 1) && veld[r][k] === oudekleur) {
				veld[r].splice(k,1,nieuwekleur)
			}
        }
    }
}


var gameOver = function() {
    if(vijandLevens <=  0) {
        spelStatus = GAMEOVER;
    }
}
// wordt er op de spacebar gedrukt?


// als er op de spacebar gedrukt wordt en het vak van de vijand is geselecteerd
// doe dan x schade(schade is voorlopig nog random)
var schadeDoenTegenVijand = function() {    
    aanvalSelectie();
    hoeveelSchade(standaarSchadeArray[welkeAanval]);
    vijandLevens = vijandLevens - schade;
    levensVanVijand();
    aanvalKlaar = true;
    spacebar = false;
    fill(255, 255, 255);
    rect(1050, 150, 220, 50);
    fill(0, 0, 0);
    text(aanvalTekst, 1083, 186);
    aanvalKnopStatus = false;
    spelerTurn = false;
    vijandTurn = true;    
}

// detecteert of de vijand in het aanvalbereik zit
var vijandDetectie = function() {
    for(var k = spelerKolom - aanvalBereik; k < spelerKolom + aanvalBereik + 1; k++){
        for(var r = spelerRij - aanvalBereik; r < spelerRij + aanvalBereik + 1; r++){
		    if(vijandRij === r && vijandKolom === k) {
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
var bewegen = function() {
    if(beweegActie === true) {
        veranderKleurRondSpeler(wit, donkerblauw);
        beweegVakSelectie();
        for(var r = spelerRij - aanvalBereik; r < spelerRij + aanvalBereik + 1; r++){
            for(var k = spelerKolom - aanvalBereik; k < spelerKolom + aanvalBereik + 1; k++){
                if(!(k === spelerKolom && r === spelerRij) && !(k < 0 || k > max_kolom -1) && !(r < 0 || r > max_rij - 1)) {
                    if(veld[r][k] === lichtblauw) {
                        if(mouseIsPressed) {
                            if(mouseButton === LEFT) {
                                spelerKolom = mouseKolom;
                                spelerRij = mouseRij;
                            }
                        } else if(keyIsPressed) {
                            if(e.keycode == 27) {
                                beweegActie = false;
                                beweegKnopStatus = false;
                            }
                        }
                    }
                }
            }
        }
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

// simuleert wat de vijand kan doen en wat de uitkomst daarvan is en beslist
// op  basis daarvan wat de vijand doet
var besteOptie = function() {
    return Math.floor(random(0,3));
}

// beweegt de vijand
var beweegVijand = function() {
    vijandTurn = false;
    spelerTurn = true;
    console.log("vijand beweegt")
}

// vijand kan aanvallen
var vijandAanval = function() {
    vijandTurn = false;
    spelerTurn = true;
    console.log("vijand valt aan")
}

var opnieuwSpelen = function() {

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
        tekenVeld();
        tekenSpeler(spelerKolom, spelerRij);
        tekenVijand(vijandKolom, vijandRij);

        if(spelerTurn === true) {
            aanvallen();
            bewegen();
        }

        if(vijandTurn === true) {
            turnVijand();
        }

        levensVanSpeler();
        levensVanVijand();

    

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

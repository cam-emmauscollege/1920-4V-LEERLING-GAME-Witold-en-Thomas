// @ts-nocheck

// VERSIE 0.6 (game werkt in primitief)
// NIET TIJDENS AANVAL VERANDEREN NAAR BEWEGEN!!!!
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


// spelstatussen
const STARTSCHERM = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
const CREDITS = 4;
var spelStatus = STARTSCHERM;

//coördinaten van de speel- en uitlegknop
const xSpeelKnop = 540;
const ySpeelKnop = 250;
const xUitlegKnop = 540;
const yUitlegKnop = 350;
const xCreditsKnop = 540;
const yCreditsKnop = 450;

//kleuren van het veld
const wit = 0;
const zwart = 1;
const oranje = 2;
const donkerblauw = 3;
const lichtblauw = 4;
const lichtgroen = 5;

//wie is aan de beurt?
var spelerTurn = true;
var vijandTurn = false;


var schade = 0; // hoeveel schade?

// kolom is verticale verplaatsing, rij is horizontale verplaatsing

var welkeSpelerKolom = 0; // relatief aan welke speler wordt een functie gebruikt
var welkeSpelerRij = 0; // relatief aan welke speler wordt een functie gebruikt
var welkeVijandKolom = 0; // relatief aan welke vijand wordt een functie gebruikt
var welkeVijandRij = 0; // relatief aan welke vijand wordt een functie gebruikt

var aanDeBeurt = "iemand";// welke speler is aan de beurt?
var aanvalBereik = 1; // hoeveel tegels om je heen kan je aanvallen
var aanvalActie = false; // ben je aan het aanvallen ja of nee
var aanvalTekst = "Aanvallen"; // tekst aanvalknop
var aanvalKnopStatus = false;//is de aanvalknop groen?
var aanvalKlaar = false;//is de aanval afgelopen?
var spacebar = false;//wordt de spatiebalk ingedrukt?
var vijandBinnenBereik = false;//is de vijand binnen het aanvalbereik?
var aanvallenOver = 1; //max aantal aanvallen per beurt
var spelerHeeftAangevallen = false; //checkt of de speler net heeft aangevallen
var totaalAanvallenSpeler = 0; //hoe vaak de speler heeft aangevallen
var totaalAanvallenVijand = 0; //hoe vaak de vijand heeft aangevallen

var beweegActie = false; // is een beweging gestart?
var beweegTekst = "Bewegen"; // wleke tekst staat er op de beweegknop
var beweegKnopStatus = false; //is de beweegknop groen?
var beweegpunten = 0; //hoever je kan lopen per beurt
var spelerKolom = 0; // x-positie van speler
var spelerRij = 0; // y-positie van speler

var vijandKolom = 0;   // x-positie van vijand 11
var vijandRij = 0;   // y-positie van vijand 3

var spelerBeurt = 0; // hoeveel beurten heeft de speler gehad
var vijandBeurt = 0; //hoeveel beurten heeft de vijand(speler2) gehad
var maxBeurten = 20; //maximale aantal beurten per spel

var schade = 0; // hoeveel schade doe je als je iemand raakt
var spelerLevens = 100; // hoeveel levens heeft de speler
var vijandLevens = 100; // hoeveel levens heeft de vijand

var tegelBreedte = 40, tegelHoogte = 40; // hoe hoog en breed zijn de tegels van het veld
var veldBreedte = 1280 / tegelBreedte - 6, veldHoogte = 720 / tegelHoogte; // hoeveel horizontale en verticale tegels zijn er

var mouseBuitenVeld = false; //als de muis buiten veld is, niet bewegen of schieten
//aanvalvakken selecteerstatus

// hieruit wordt de standaardschade gehaald als je iets aanvalt
var standaarSchadeArray = [30,40,50]  // WIP -- schade nu is testschade
//welke aanval wordt er gedaan en de bijbehorende schade
// deze variabele wordt aangepast afhankelijk van welke aanval er geselecteerd wordt.
var welkeAanval = 0;

var veld = [
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], //1 - 26 kolommen
        [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1], //2
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //3
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //4
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //5
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //6
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1], //7
        [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1], //8
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

var max_kolom = veld[0].length; //wat is de hoogste index van een kolom?
var max_rij = veld.length; // wat is de hoogste index van een rij?

//functie om makkelijk te loggen of iets werkt
var gamelog = function(text) {
    if (gamelogging) {
        console.log(text)
    }
}
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

//geeft de kolom waarim de muis zich bevind
var mouseKolom = function() {
    if(mouseX >= 0 && mouseX < 1040 && mouseY >= 0 && mouseY < 720) {
        return Math.floor(mouseX / 40);
    } else {
        return mouseBuitenVeld === true;
    }
}

//geeft de rij waarin de muis zich bevind
var mouseRij = function() {
    if(mouseX >= 0 && mouseX < 1040 && mouseY >= 0 && mouseY < 720) {
        return Math.floor(mouseY / 40);
    } else {
        return mouseBuitenVeld === true;
    }
}

// tekent de speelknop
var speelKnop = function() {
    fill(3, 252, 61);
    rect(xSpeelKnop,ySpeelKnop, 200, 80);
    fill(0,0,0);
    textSize(50);
    text("Spelen", 560, 268, 730, 170);

    if(mouseIsPressed && mouseX <= xSpeelKnop + 200 && mouseY <= ySpeelKnop + 80 && mouseX >= xSpeelKnop && mouseY >= ySpeelKnop) {
        spelerLevens = 100;
        vijandLevens = 100;
        spelerBeurt= 1;
        vijandBeurt = 0;
        beweegpunten = 5;
        aanvallenOver = 1;
        spelerKolom = 10;
        spelerRij = 17;
        vijandKolom = 11;
        vijandRij = 3;
        spelStatus = SPELEN;
    } 
}

// tekent de uitlegknop
var uitlegKnop = function () {
    fill(3, 252, 61);
    rect(xUitlegKnop,yUitlegKnop,200,80);
    fill(0,0,0);
    textSize(50);
    text("Uitleg", 575, 368, 730, 270);

    if(mouseIsPressed && mouseX < xUitlegKnop + 200 && mouseX > xUitlegKnop && mouseY < yUitlegKnop + 80 && mouseY > yUitlegKnop) {
        spelStatus = UITLEG;
    }
}

//tekent de creditsknop
var creditsKnop = function() {
    fill(3, 252, 61);
    rect(xCreditsKnop,yCreditsKnop,200,80);
    fill(0,0,0);
    textSize(50);
    text("Credits", 560, 468, 730, 370);

    if(mouseIsPressed && mouseX < xCreditsKnop + 200 && mouseX > xCreditsKnop && mouseY < yCreditsKnop + 80 && mouseY > yCreditsKnop) {
        spelStatus = CREDITS;
    }
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
    }

    // hoeveel meer schade doe je dan?
    var rngOmhoog = function() {
        schade = standaardSchade - (random(0,0.25) * standaardSchade);
    }

    if (omhoogOmlaag === 1) {
        rngOmlaag();
    }

    if (omhoogOmlaag === 2) {
        rngOmhoog();
    }

    schade = round(schade);
    
}

//tekent de beweegknop
var beweegKnopTekenen = function(r,g,b) {
    textSize(35);
    fill(r, g, b);
    rect(1050, 260, 220, 50);
    fill(0, 0, 0);
    text(beweegTekst, 1083, 297);
}

//zorgt dat als de beweegknop gedrukt wordt dat de beweging wordt gestart
var beweegKnop = function() {
    beweegKnopTekenen(255,255,255);

    if(mouseIsPressed) { //twee methodes om te gaan bewegen, de knop en de m-toets, ook als caps lock aan staat
        if (mouseButton === LEFT && mouseY >= 260 && mouseY <= 310 && mouseX >= 1050 && mouseX <= 1270 && beweegpunten > 0) {
            beweegActie = true;
            beweegKnopStatus = true;
            aanvalActie = false;
            aanvalKnopStatus = false;
        }
    } 
    if(keyIsPressed) {
        if((key === "m" || key === "M") && beweegpunten > 0) {
            beweegActie = true;
            beweegKnopStatus = true;
            aanvalActie = false;
            aanvalKnopStatus = false;
        }
    }


    if(beweegKnopStatus === true){
        beweegKnopTekenen(47,255,0);
    }
}

//laat zien wie er aan de beurt is
var wieIsAanDeBeurt = function() {
    textSize(22);
    stroke(0,0,0);
    strokeWeight(1.5);
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
                beweegActie = false;
                veranderKleurRondSpeler(lichtblauw,wit,welkeSpelerKolom,welkeSpelerRij);
                veranderKleurRondSpeler(donkerblauw,wit,welkeSpelerKolom,welkeSpelerRij);
                aanvalTekst = "Aanvallen";
                aanvalKnopTekenen(255,255,255);
                veranderKleurRondSpeler(lichtblauw,wit,welkeSpelerKolom,welkeSpelerRij);
                aanvalKnopStatus = false;
                beweegKnopStatus = false;
        }
    }
}

//tekent de aanvalknop
var aanvalKnopTekenen = function(r,g,b) {
    textSize(35);
    fill(r,g,b);
    rect(1050, 330, 220, 50);
    fill(0, 0, 0);
    text(aanvalTekst, 1083, 366);
}

// zorgt dat als je op de aanvalknop drukt de aanval gestart wordt
var aanvalKnop = function() {
    aanvalKnopTekenen(255,255,255);

    if(mouseIsPressed && aanvallenOver > 0) { //twee methodes om te gaan aanvallen, knop en n-toets, ook als caps lock aan staat
        if (mouseButton === LEFT && mouseY >= 330 && mouseY <= 380 && mouseX >= 1050 && mouseX <= 1270){
            aanvalActie = true;
            aanvalKnopStatus = true;
            beweegActie = false;
            beweegKnopStatus = false;
        }
    } else if(keyIsPressed){
            if((key === "n" || key === "N") && aanvallenOver > 0) {
            aanvalActie = true;
            aanvalKnopStatus = true;
            beweegActie = false;
            beweegKnopStatus = false;
            }
        }

    if(aanvalKnopStatus === true && aanvallenOver > 0){
            aanvalKnopTekenen(47,255,0);
    }
}

//zorgt dat de eindebeurtknop werkt.
function mouseClicked() {
    if (mouseY >= 620 && mouseY <= 720 && mouseX >= 1040 && mouseX <= 1280) {
        aanvalActie = false;
        aanvalKnopStatus = false;
        beweegActie = false;
        beweegKnopStatus = false;
        beurtVeranderen();
        veranderKleur(donkerblauw,wit);
        veranderKleur(lichtblauw,wit);
    }
}

//tekent de eindebeurtknop
var eindeBeurtKnop = function() {
    fill(200, 0, 150);
    rect(1040, 620, 240, 100);
    fill(0, 0, 0);
    textSize(35);
    text("Einde beurt", 1070, 680);
}

//selecteert en deselecteert de vakjes bij een aanval
var aanvalVakSelectie = function() {
    if(aanvalActie === true) {
        deselecteerVak();
        selecteerVak(welkeSpelerKolom,welkeSpelerRij);
            
    }
}

// selecteert het vakje waar de speler heen beweegt
var beweegVakSelectie = function() {
    if(beweegActie === true) {
        selecteerVak(welkeSpelerKolom,welkeSpelerRij);
            
    }
}


// markeert een vakje tijdens aanval of beweging
var selecteerVak = function(wieIsSpelerKolom,wieIsSpelerRij) {
    // alleen linkermuisknop detecteren als muis ingedrukt wordt
        if (mouseIsPressed) {
            var mKolom = mouseKolom();
            var mRij = mouseRij();
         
            if (mKolom >= wieIsSpelerKolom - aanvalBereik &&
                mKolom <= wieIsSpelerKolom + aanvalBereik && 
                mRij >= wieIsSpelerRij - aanvalBereik && 
                mRij <= wieIsSpelerRij + aanvalBereik &&
                !(mRij == wieIsSpelerRij &&
                mKolom == wieIsSpelerKolom) && veld[mRij][mKolom] !== zwart){
                    if(mouseButton === LEFT){
                        veranderKleurRondSpeler(lichtblauw,donkerblauw,welkeSpelerKolom,welkeSpelerRij);
                        veld[mRij].splice(mKolom,1,lichtblauw);
                    }
            }            
        }
}

//deselecteert alle vakjes tijdens een aanval
var deselecteerVak = function () {
    // een vak deselecteren
        if(keyIsPressed === true && keyCode === BACKSPACE) {
            veranderKleurRondSpeler(lichtblauw,donkerblauw,welkeSpelerKolom,welkeSpelerRij);
        }
}        

// tekent hoeveel beurten de speler heeft gehad
var spelerBeurten = function(){
    textSize(16);
    fill(0, 0, 0);
    text("Beurt speler 1: " + spelerBeurt + "/" + maxBeurten, 1050, 30);
}

//tekent hoeveel beurten de vijand(speler2) heeft gehad
var vijandBeurten = function() {
    textSize(16);
    fill(0, 0, 0);
    text("Beurt speler 2: " + vijandBeurt + "/" + maxBeurten, 1050, 60);
}

// hoeveel vakjes kan een speler nog bewegen?
var spelerBeweegpunten = function() {
    textSize(16);
    text("Bewegingspunten over: " + beweegpunten + "/5", 1050, 90);
} 
var spelerAanvallenOver = function() {
    textSize(16);
    text("Aanvallen over: " + aanvallenOver + "/1", 1050, 120);
}


// tekent de vakjes als deze functie wordt aangeroepen
var tekenTegel = function(kolom, rij) {
    if (veld[rij][kolom] === wit) {
    fill(255, 255, 255);
  } else if (veld[rij][kolom] === zwart) {
    fill(0, 0, 0);
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


// tekent het veld en de inbegrepen knoppen etc
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
    spelerBeurten();
    vijandBeurten();
    spelerBeweegpunten();
    spelerAanvallenOver();
    //text("Wapen: " + wapenSpeler, 1050, 90); als we tijd hebben (nee)
    //text("Kogels over: " + kogelsOverSpeler, 1050, 120); 
    //text("Reservekogels over: " + reserveKogelsOverSeler, 1050, 150);

    //einde beurtknop
    eindeBeurtKnop();

    //actieknoppen
    text("Acties", 1100, 230);
    line(1040, 160, 1280, 160); //waarom werkt dit niet?
    //rect(1040, 189, 240, 2);
    
    //bewegen
    beweegKnop();
 
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


// zorgt ervoor dat de aanval uitgevoerd wordt
var aanvallen = function() {
    // aanvalmogelijkheden -- vakjes die aangevallen kunnen worden veranderen van kleur
    if (aanvalActie === true) {
        veranderKleurRondSpeler(wit,donkerblauw,welkeSpelerKolom,welkeSpelerRij);
        vijandDetectie(welkeVijandRij,welkeVijandKolom);
        aanvalVakSelectie();

        if(veld[welkeVijandRij][welkeVijandKolom] === lichtblauw){
            document.body.onkeyup = function(e){
                if(e.keyCode == 32){
                    spacebar = true;
                }
            }
        }

        if(spacebar === true && vijandBinnenBereik === true){
        schadeDoenTegenVijand();
        vijandBinnenBereik = false;
        } 

        if(aanvalKlaar === true) {
            aanvallenOver--;
            veranderKleurRondSpeler(donkerblauw,wit,welkeSpelerKolom,welkeSpelerRij);
            veranderKleurRondSpeler(lichtblauw,wit,welkeSpelerKolom,welkeSpelerRij);
            if(aanvallenOver === 0) {
                geenAanvallenOver();
            }
            aanvalKlaar = false;
            aanvalActie = false;
        } 
    }    
}

// oudekleur = oude kleur vakje
// nieuwekleur = nieuwe kleur vakje
var veranderKleurRondSpeler = function(oudekleur,nieuwekleur,wieIsSpelerKolom,wieIsSpelerRij) {
    for(var k = wieIsSpelerKolom - aanvalBereik; k < wieIsSpelerKolom + aanvalBereik + 1; k++){
        for(var r = wieIsSpelerRij - aanvalBereik; r < wieIsSpelerRij + aanvalBereik + 1; r++){
		    if(!(k === wieIsSpelerKolom && r === wieIsSpelerRij) && !(k < 0 || k > max_kolom -1) && !(r < 0 || r > max_rij - 1) && veld[r][k] === oudekleur) {
                    veld[r].splice(k,1,nieuwekleur);
            }
        }
    }
}

// verandert alle oude kleuren op het veld naar een nieuwe kleur
var veranderKleur = function(oudekleur,nieuwekleur) {
    for(var r = 0; r <= max_rij - 1; r++) {
        for(var k = 0; k <= max_kolom - 1; k++) {
        if(veld[r][k] === oudekleur) {
            veld[r].splice(k,1,nieuwekleur);
            }
        }
    }
}

//wanneer is het gameover?
var gameOver = function() {
    if(vijandLevens <=  0 || spelerLevens <= 0 || spelerBeurt > 20) {
        spelStatus = GAMEOVER;
    } 
}

// zorgt ervoor dat je maximaal 1 keer per beurt kan aanvallen
var geenAanvallenOver = function() {
    aanvalKnopTekenen(255,140,0);
}

// als er op de spacebar gedrukt wordt en het vak van de vijand is geselecteerd
// doe dan x schade(schade is voorlopig nog random)
var schadeDoenTegenVijand = function() {    
    aanvalSelectie();
    hoeveelSchade(standaarSchadeArray[welkeAanval]);
    if(spelerTurn === true) {
        vijandLevens = vijandLevens - schade;
        totaalAanvallenSpeler++;
    }
    if(vijandTurn === true) {
        spelerLevens = spelerLevens - schade;
        totaalAanvallenVijand++;
    }
    levensVanVijand();
    aanvalKlaar = true;
    spacebar = false;
    aanvalKnopTekenen(47,255,0);
    aanvalKnopStatus = false;
}

// detecteert of de vijand in het aanvalbereik zit
var vijandDetectie = function(wieIsVijandRij, wieIsVijandKolom) {
    if(veld[wieIsVijandRij][wieIsVijandKolom] === lichtblauw){
        vijandBinnenBereik = true;
    }   
}

// aanvalselectie is tijdelijk random
var aanvalSelectie = function(){
    welkeAanval = Math.floor(random(0, standaarSchadeArray.length));
}


// functie voor beweging speler
var bewegen = function(wieIsSpelerKolom,wieIsSpelerRij,wieIsVijandKolom,wieIsVijandRij) {
    if(beweegActie === true) {
        veranderKleurRondSpeler(wit,donkerblauw,welkeSpelerKolom,welkeSpelerRij);
        beweegVakSelectie();
        for(var r = wieIsSpelerRij - aanvalBereik; r < wieIsSpelerRij + aanvalBereik + 1; r++){
            for(var k = wieIsSpelerKolom - aanvalBereik; k < wieIsSpelerKolom + aanvalBereik + 1; k++){
                if(!(k === wieIsSpelerKolom && r === wieIsSpelerRij) && !(k < 0 || k > max_kolom -1) && !(r < 0 || r > max_rij - 1)) {
                    if(veld[r][k] === lichtblauw) {
                        if(mouseIsPressed) {
                            if(mouseButton === LEFT && !(mouseKolom() === wieIsVijandKolom && mouseRij() === wieIsVijandRij)) {
                                if(spelerTurn === true) {
                                spelerKolom = mouseKolom();
                                spelerRij = mouseRij();
                                } else if(vijandTurn === true) {
                                    vijandKolom = mouseKolom();
                                    vijandRij = mouseRij();
                                }
                                beweegpunten--;
                                tekenSpeler(spelerKolom,spelerRij);
                                tekenVijand(vijandKolom,vijandRij);
                                veranderKleur(donkerblauw,wit);
                                veranderKleur(lichtblauw,wit);
                                if(beweegpunten === 0) {
                                    beweegKnopTekenen(255,255,255);
                                    beweegActie = false;
                                    beweegKnopStatus = false;
                                }
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

//tekent het gameoverscherm als de game voorbij is
var gameOverScherm = function() {
    createCanvas(1280, 720);
    if(vijandLevens <= 0) {
        background('green');
        fill(0, 0, 0);
        textSize(40);
        strokeWeight(1);
        text("Speler 1 heeft gewonnen door de tegenstander uit te schakelen.", 70, 125);
        textSize(30);
        if(totaalAanvallenSpeler === 1) {
            text("Speler 1 heeft in 1 aanval " + (100-vijandLevens) + " schade gedaan.", 330, 185);
        } else {
            text("Speler 1 heeft in " + totaalAanvallenSpeler + " aanvallen " + (100-vijandLevens) + " schade gedaan.", 330, 185);
        }
        if(totaalAanvallenVijand === 1) {
            text("Speler 2 heeft in 1 aanval " + (100-spelerLevens) + " schade gedaan.", 330, 220);
        } else {
            text("Speler 2 heeft in " + totaalAanvallenVijand + " aanvallen " + (100-spelerLevens) + " schade gedaan.", 330, 220);
        }
    } else if(spelerLevens <= 0) {
        background('red');
        fill(0, 0, 0);
        textSize(40);
        strokeWeight(1);
        text("Speler 2 heeft gewonnen door de tegenstander uit te schakelen.", 70, 125);
        textSize(30);
        if(totaalAanvallenSpeler === 1) {
            text("Speler 1 heeft in 1 aanval " + (100-vijandLevens) + " schade gedaan.", 330, 185);
        } else {
            text("Speler 1 heeft in " + totaalAanvallenSpeler + " aanvallen " + (100-vijandLevens) + " schade gedaan.", 330, 185);
        }
        if(totaalAanvallenVijand === 1) {
            text("Speler 2 heeft in 1 aanval " + (100-spelerLevens) + " schade gedaan.", 330, 220);
        } else {
            text("Speler 2 heeft in " + totaalAanvallenVijand + " aanvallen " + (100-spelerLevens) + " schade gedaan.", 330, 220);
        }
    } else {
        background('yellow');
        fill(0, 0, 0);
        textSize(40);
        strokeWeight(1);
        text("Gelijkspel door het bereiken van het maximale aantal beurten.", 100, 125);
        textSize(30);
        if(totaalAanvallenSpeler === 1) {
            text("Speler 1 heeft in 1 aanval " + (100-vijandLevens) + " schade gedaan.", 330, 185);
        } else {
            text("Speler 1 heeft in " + totaalAanvallenSpeler + " aanvallen " + (100-vijandLevens) + " schade gedaan.", 330, 185);
        }
        if(totaalAanvallenVijand === 1) {
            text("Speler 2 heeft in 1 aanval " + (100-spelerLevens) + " schade gedaan.", 330, 220);
        } else {
            text("Speler 2 heeft in " + totaalAanvallenVijand + " aanvallen " + (100-spelerLevens) + " schade gedaan.", 330, 220);
        }
    }

    fill(3, 252, 61);
    rect(50, 550, 400, 100);
    rect(830, 550, 400, 100);
    fill(0,0,0);
    textSize(50);
    text("Hoofdmenu", 112, 615);
    text("Opnieuw Spelen", 844, 615/*, 730, 170*/);
    spelerTurn = true;
    vijandTurn = false;

    if(mouseIsPressed && mouseX <= 1230 && mouseY <= 650 && mouseX >= 830 && mouseY >= 550) {
        spelerLevens = 100;
        vijandLevens = 100;
        spelerBeurt= 1;
        vijandBeurt = 0;
        beweegpunten = 5;
        aanvallenOver = 1;
        spelerKolom = 10;
        spelerRij = 17;
        vijandKolom = 11;
        vijandRij = 3;
        spelStatus = SPELEN;
    } else if(mouseIsPressed && mouseX <= 450 && mouseY <= 650 && mouseX >= 50 && mouseY >= 550) {
        spelStatus = STARTSCHERM;
    }
}

//tekent het uitlegscherm
var uitlegScherm = function () {
    background('lightgreen');
    fill(3, 252, 61);
    rect(50, 550, 200, 100);
    fill(0,0,0);
    textSize(50);
    text("De uitleg", 500, 70);
    textSize(23);
    text("Het doel is om de andere speler uit te schakelen. Het spel is opgedeel in beurten. Er zijn twee acties: bewegen en aanvallen.\n\n" + 
    "- Bewegen: Je kan maximaal 5 stappen zetten per beurt. Om te bewegen kan je of op 'm' klikken of op de knop 'bewegen'. Dan klik je op een blauwgekleurd vakje om erheen te bewegen.\n" +
    "- Aanvallen: Om aan te vallen moet je naast de vijand staan. Dan druk je op 'n' of de 'aanvallen' knop. Vervolgens moet je het vakje selecteren waar de vijand op staat. " +
    "Druk op 'spatie' om aan te vallen. Je doet minimaal 22, en maximaal 62 schade. je hebt 1 aanval per beurt.\n\nAls je een actie hebt geselecteerd, maar je wilt terug, " +
    "dan moet je op de terugknop drukken. Als je klaar bent met je beurt, druk dan op einde beurt. Dan is je tegenstander aan zet.\n" +
    "Dit gaat zo door totdat beide spelers 20 beurten hebben gehad, of als een speler all zijn levenspunten verloren heeft. In het eerste geval is het een gelijkspel, " +
    "in het tweede geval wint de speler die nog in leven is.", 100, 100, 1000);
    textSize(50);
    text("Terug", 85, 615);
    if(mouseIsPressed && mouseX <= 250 && mouseY <= 650 && mouseX >= 50 && mouseY >= 550) {
        spelStatus = STARTSCHERM;
    }
}

var creditScherm = function() {
    background('lightblue');
    fill(3, 252, 61);
    rect(50, 550, 200, 100);
    strokeWeight(1.5);
    fill(0, 0, 0);
    textSize(70);
    text("Het Team", 520, 75);
    line(0, 100, 1280, 100);
    textSize(50);
    text("Thomas van Egmond", 450, 200);
    text("Witold Kamphorst", 450, 300);
    text("Terug", 85, 615);
    if(mouseIsPressed && mouseX <= 250 && mouseY <= 650 && mouseX >= 50 && mouseY >= 550) {
        spelStatus = STARTSCHERM;
    }
}

//verandert de beurt naar de andere speler
var beurtVeranderen = function(){
        if(spelerTurn === true) {
            beweegpunten = 5;
            aanvallenOver = 1;
            vijandBeurt++;
            spelerTurn = false;
            vijandTurn = true;
        } else if (vijandTurn === true) {
            beweegpunten = 5;
            aanvallenOver = 1;
            spelerBeurt++;
            spelerTurn = true;
            vijandTurn = false;
        }
}

//bepaald welke speler de speler is en welke speler de vijand
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
            bewegen(welkeSpelerKolom,welkeSpelerRij,welkeVijandKolom,welkeVijandRij);
        }

        if(vijandTurn === true) {
            aanvallen();
            bewegen(welkeSpelerKolom,welkeSpelerRij,welkeVijandKolom,welkeVijandRij);
        }

        levensVanSpeler();
        levensVanVijand();

    

        gameOver();
    break;


    case STARTSCHERM:
        background('lightblue');
        textSize(70);
        text("Counter-Strike: Execution Force", 130, 150);
      	speelKnop();
        uitlegKnop();
        creditsKnop();




    break;

    case GAMEOVER:
        gameOverScherm();




    break;

    case UITLEG:
        uitlegScherm();
        

    break;

    case CREDITS:
        creditScherm();

    break;
  }
  
}

// @ts-nocheck

// VERSIE 0.3

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
const xUitlegButton = 540;
const yUitlegButton = 200;

var spelStatus = STARTSCHERM;

var schade = 0;

// kolom is verticale verplaatsing, rij is horizontale verplaatsing
var spelerKolom = 2; // x-positie van speler
var spelerRij = 8; // y-positie van speler

var kleurTegelNulR = 0; // R-waarde tegels met var 0
var kleurTegelNulG = 0; // G-waarde tegels met var 0
var kleurTegelNulB = 0; // B-waarde tegels met var 0

var aanvalBereik = 1; // hoeveel tegels om je heen kan je aanvallen
var aanvalActie = false; // ben je aan het aanvallen ja of nee
var aanvalTekst = "Aanvallen"; // tekst aanvalknop
var aanvalKnopStatus = false;
var spelerKolom = 8; // x-positie van speler
var spelerRij = 15; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandKolom = 2;   // x-positie van vijand
var vijandRij = 5;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var schade = 0; // hoeveel schade doe je als je iemand raakt
var spelerLevens = 100; // hoeveel levens heeft de speler
var vijandLevens = 100; // hoeveel levens heeft de vijand


var tegelBreedte = 40, tegelHoogte = 40;
var veldBreedte = 1280 / tegelBreedte - 6, veldHoogte = 720 / tegelHoogte;

//aanvalvakken selecteerstatus
var vakSelectieStatus = [0,0,0,0,0,0,0,0] // 0 = false, 1 = true -- is het vakje geselecteerd?

// hieruit wordt de standaardschade gehaald als je iets aanvalt
var standaarSchadeArray = [30,40,50]  // WIP -- schade nu is testschade
//welke aanval wordt er gedaan en de bijbehorende schade
var aanval1 = 0;
var aanval2 = 1;
var aanval3 = 2;
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
    noStroke();
    textSize(15);
    fill(15, 3, 252);
    text(spelerLevens, (spelerKolom * 40) + 7,spelerRij * 40);
}

var levensVanVijand = function() {
    noStroke();
    textSize(15);
    fill(15, 3, 252);
    text(vijandLevens, (vijandKolom * 40) + 7,vijandRij * 40);
}

// functie die berekent hoeveel schade je doet als je aanvalt.

    // doe je meer of minder schade dan de standaardschade?

var hoeveelSchade = function () {
    var omhoogOmlaag = Math.floor(Math.random() * 2 + 1);

    // hoeveel minder schade doe je dan?
    var rngOmlaag = function() {
        schade = 30/* test */ * 1 + random(0,0.25);
    };

    // hoeveel meer schade doe je dan?
    var rngOmhoog = function() {
        schade = 30 /* test */ * 1 - random(0,0.25);
    };

    if (omhoogOmlaag === 1) {
        rngOmlaag()
    }

    if (omhoogOmlaag === 2) {
        rngOmhoog()
    }
    
}

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
                markeerVakjesRondSpeler(spelerKolom,spelerRij,3,0);
                aanvalTekst = "Aanvallen";
                fill(255, 255, 255);
                rect(1050, 150, 220, 50);
                fill(0, 0, 0);
                text(aanvalTekst, 1083, 186);
                markeerVakjesRondSpeler(spelerKolom,spelerRij,4,0);
                vakSelectieStatus.splice(0,8,0,0,0,0,0,0,0,0)
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
        selecteerVak();
            
        }
    }

var selecteerVak = function() {
    // alleen linkermuisknop detecteren als muis ingedrukt wordt
        if(mouseIsPressed){
            // vak onder speler selecteren
            if (mouseButton === LEFT &&
                mouseX <= (spelerKolom + 1) * 40 &&
                mouseX >= (spelerKolom) * 40 &&
                mouseY <= (spelerRij + 2) * 40 &&
                mouseY >= (spelerRij + 1) * 40){
                    vakSelectieStatus.splice(0,1,1);
            }
            
                if(vakSelectieStatus[0] === 1) {
                veld[spelerRij + aanvalBereik].splice(spelerKolom,1,4)
            }

            // vak rechts speler selecteren
            if (mouseButton === LEFT &&
                mouseX <= (spelerKolom + 2) * 40 &&
                mouseX >= (spelerKolom + 1) * 40 &&
                mouseY <= (spelerRij + 1) * 40 &&
                mouseY >= (spelerRij) * 40) {
                    vakSelectieStatus.splice(1,1,1)
            }
            
            if(vakSelectieStatus[1] === 1) {
                veld[spelerRij].splice(spelerKolom + aanvalBereik,1,4)
            }

            // vak boven speler selecteren
            if (mouseButton === LEFT && 
                mouseX <= (spelerKolom + 1) * 40 &&
                mouseX >= (spelerKolom) * 40 &&
                mouseY <= (spelerRij) * 40 &&
                mouseY >= (spelerRij - 1) * 40 ){
                    vakSelectieStatus.splice(2,1,1)
            }

            if(vakSelectieStatus[2] === 1) {
                veld[spelerRij - aanvalBereik].splice(spelerKolom,1,4)
            }
            
            // vak links speler selecteren
               if (mouseButton === LEFT &&
                mouseX <= (spelerKolom) * 40 &&
                mouseX >= (spelerKolom - 1) * 40 &&
                mouseY <= (spelerRij + 1) * 40 &&
                mouseY >= (spelerRij) * 40) {
                    vakSelectieStatus.splice(3,1,1)
            }

            if(vakSelectieStatus[3] === 1) {
                veld[spelerRij].splice(spelerKolom - aanvalBereik,1,4)
            }

            // vak linksboven speler selecteren veld[spelerRij - aanvalBereik][spelerKolom - aanvalBereik]
            if (mouseButton === LEFT  &&
                mouseX <= (spelerKolom) * 40 &&
                mouseX >= (spelerKolom - 1) * 40 &&
                mouseY <= (spelerRij) * 40 &&
                mouseY >= (spelerRij - 1) * 40) {
                    vakSelectieStatus.splice(4,1,1)
                }

            if(vakSelectieStatus[4] === 1) {
                veld[spelerRij - aanvalBereik].splice(spelerKolom - aanvalBereik,1,4)
            }
            
            // vak rechtsboven speler selecteren
            if (mouseButton === LEFT &&
                mouseX <= (spelerKolom + 2) * 40 &&
                mouseX >= (spelerKolom + 1) * 40 &&
                mouseY <= (spelerRij) * 40 &&
                mouseY >= (spelerRij - 1) * 40) {
                    vakSelectieStatus.splice(5,1,1)
            }

            if(vakSelectieStatus[5] === 1) {
                veld[spelerRij - aanvalBereik].splice(spelerKolom + aanvalBereik,1,4)
            }

            // vak linksonder speler selecteren veld[spelerRij + aanvalBereik][spelerKolom - aanvalBereik]
            if (mouseButton === LEFT &&
                mouseX <= (spelerKolom) * 40 &&
                mouseX >= (spelerKolom - 1) * 40 &&
                mouseY <= (spelerRij + 2) * 40 &&
                mouseY >= (spelerRij + 1) * 40) {
                    vakSelectieStatus.splice(6,1,1)
                }
            
            if(vakSelectieStatus[6] === 1) {
                veld[spelerRij + aanvalBereik].splice(spelerKolom - aanvalBereik,1,4)
            }

            // vak rechtsonder speler selecteren
            if (mouseButton === LEFT &&
                mouseX <= (spelerKolom + 2) * 40 &&
                mouseX >= (spelerKolom + 1) * 40 &&
                mouseY <= (spelerRij + 2) * 40 &&
                mouseY >= (spelerRij + 1) * 40) {
                    vakSelectieStatus.splice(7,1,1)
            }

            if(vakSelectieStatus[7] === 1) {
                veld[spelerRij + aanvalBereik].splice(spelerKolom + aanvalBereik,1,4)
            }
    }
}

var deselecteerVak = function () {
    // een vak deselecteren
        if(keyIsPressed === true && keyCode === ESCAPE) {
            vakSelectieStatus.splice(0,8,0,0,0,0,0,0,0,0)
        }
        
        if(vakSelectieStatus[0] === 0) {
            veld[spelerRij + aanvalBereik].splice(spelerKolom,1,3)
        }

        if(vakSelectieStatus[1] === 0) {
            veld[spelerRij].splice(spelerKolom + aanvalBereik,1,3)
        }
        
        if(vakSelectieStatus[2] === 0) {
            veld[spelerRij - aanvalBereik].splice(spelerKolom,1,3)
        }
        
        if(vakSelectieStatus[3] === 0) {
            veld[spelerRij].splice(spelerKolom - aanvalBereik,1,3)
        }
        
        if(vakSelectieStatus[4] === 0) {
            veld[spelerRij - aanvalBereik].splice(spelerKolom - aanvalBereik,1,3)
        }
        
        if(vakSelectieStatus[5] === 0) {
            veld[spelerRij - aanvalBereik].splice(spelerKolom + aanvalBereik,1,3)
        }
        
        if(vakSelectieStatus[6] === 0) {
            veld[spelerRij + aanvalBereik].splice(spelerKolom - aanvalBereik,1,3)
        }
        
        if(vakSelectieStatus[7] === 0) {
            veld[spelerRij + aanvalBereik].splice(spelerKolom + aanvalBereik,1,3)
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
    fill(0,0,255);
  } else if(veld[rij][kolom] === 4) {
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

    //selecteert welk vak je wilt aanvallen
    aanvalVakSelectie();

    //terugknop
    terugKnop();
    
}

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
}

var tekenVijand = function(vijandKolom, vijandRij) {
  fill(255, 0, 0);
  ellipse(vijandKolom * 40 + 20, vijandRij * 40 + 20, 30, 30);
}


var aanvallen = function() {
    // aanvalmogelijkheden -- vakjes die aangevallen kunnen worden veranderen van kleur
    if (aanvalActie === true) {
        markeerVakjesRondSpeler(spelerKolom,spelerRij,0,3);
    }    
}

// x = spelerKolom
// y = spelerRij
// oudekleur = oude kleur vakje
// nieuwekleur = nieuwe kleur vakje
var markeerVakjesRondSpeler = function(x,y,oudekleur,nieuwekleur) {
    // onder speler
        if(veld[y + aanvalBereik][x] === oudekleur) {
            veld[y + aanvalBereik].splice(x,1,nieuwekleur);
            
        }
        // boven speler
        if(veld[y - aanvalBereik][x] === oudekleur) {
            veld[y - aanvalBereik].splice(x,1,nieuwekleur);
        }
        // links speler
        if(veld[y][x - aanvalBereik] === oudekleur) {
            veld[y].splice(x - aanvalBereik,1,nieuwekleur)
        }
        // rechts speler
        if(veld[y][x + aanvalBereik] === oudekleur) {
            veld[y].splice(x + aanvalBereik,1,nieuwekleur)
        }
        // rechtsonder speler
        if(veld[y + aanvalBereik][x + aanvalBereik] === oudekleur) {
            veld[y + aanvalBereik].splice(x + aanvalBereik,1,nieuwekleur)
        }
        // linksonder speler
        if(veld[y + aanvalBereik][x - aanvalBereik] === oudekleur) {
            veld[y + aanvalBereik].splice(x - aanvalBereik,1,nieuwekleur)
        }
        // linksboven speler
        if(veld[y - aanvalBereik][x - aanvalBereik] === oudekleur) {
            veld[y - aanvalBereik].splice(x - aanvalBereik,1,nieuwekleur)
        }
        // rechtsboven speler
        if(veld[y - aanvalBereik][x + aanvalBereik] === oudekleur){
            veld[y - aanvalBereik].splice(x + aanvalBereik,1,nieuwekleur)
        }
}




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
        aanvallen();
        levensVanSpeler();
        levensVanVijand();
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
        uitlegScherm();
        



    break;
  }
  
}

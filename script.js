// @ts-nocheck

/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

var aanvalBereikPlus = 1;
var spelerKolom = 1;
var SpelerRij = 2;
var vakOnderSpeler = mouseX <= (spelerKolom + aanvalBereikPlus) * 40 && mouseX >= (spelerKolom) * 40;


function setup() {
    createCanvas(100,100);


    background('blue');
}
function test() {
    console.log(vakOnderSpeler)
}
function draw () {
test();
}

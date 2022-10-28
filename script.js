var cislo1 = 0;
var cislo2 = 0;
var operator = '+';
var spusteno = false;
var skore = 0;

window.addEventListener('load', (event) => {
    nactiPriklad();
  });

function nactiPriklad(){
    if (skore > 80){
        nactiNahodne();
    }else if (skore > 60){
        nactiDeleni();
    }else if (skore > 40){
        nactiNasobeni();
    }else if (skore > 20){
        nactiOdcitani();
    } else {
        nactiScitani();
    }

    document.getElementById("cislo1").innerHTML = cislo1;
    document.getElementById("cislo2").innerHTML = cislo2;
    document.getElementById("operator").innerHTML = operator;
    document.getElementById("vysledek").value = "";
}

function nactiNahodne(){
    var nahodneCislo = Math.floor(Math.random() * 4);
    switch (nahodneCislo){
        case 3:
            nactiDeleni();
            break;
        case 2:
            nactiNasobeni();
            break;
        case 1:
            nactiOdcitani();
            break;
        default:
            nactiScitani();
    }
}

function nactiScitani(){
    cislo1 = Math.floor(Math.random() * 51);
    cislo2 = Math.floor(Math.random() * 51);
    operator = '+';
}

function nactiOdcitani(){
    cislo1 = Math.floor(Math.random() * 101);
    cislo2 = Math.floor(Math.random() * (cislo1 + 1));
    operator = '-';
}

function nactiNasobeni(){
    cislo1 = Math.floor(Math.random() * 11);
    cislo2 = Math.floor(Math.random() * 11);
    operator = '*';
}

function nactiDeleni(){
    cislo1 = Math.floor(Math.random() * 101);
    while (true) {
        cislo2 = Math.floor((Math.random() * 10) + 1);
        if (cislo1 % cislo2 == 0) {
            break;
        }
    }

    operator = '/';
}

document.getElementById("formular").onsubmit = function(event) {
    event.preventDefault();
    if(zkontrolujVysledek()){
        document.getElementById("cas").value += 5;
        skore += 1;
        document.getElementById("skore").innerHTML = skore;
        if (skore >= 110) {
            zastavHru();
            alert("Vyhrál jsi. Co jsi čekal? Gratuluji")
        }
    }

    spustHru();
    nactiPriklad();
}

function zkontrolujVysledek(){
    switch (operator) {
        case "+":
            return document.getElementById("vysledek").value == cislo1 + cislo2;
        case "-":
            return document.getElementById("vysledek").value == cislo1 - cislo2;
        case "*":
            return document.getElementById("vysledek").value == cislo1 * cislo2;
        case "/":
            return document.getElementById("vysledek").value == cislo1 / cislo2;
    }
}

function uberCas(){
    document.getElementById("cas").value -= 1;

    if(document.getElementById("cas").value == 0){
        alert("Zpackal jsi to. Zkus to znovu, jsi amatér");
        zastavHru();
    }else{
        window.setTimeout(uberCas, 1000);   
    }
    
}

function spustHru(){
    if(spusteno == false){
        skore = 0;
        document.getElementById("skore").innerHTML = skore;
        uberCas();
    }

    spusteno = true;
}

function zastavHru(){
    spusteno = false;
    document.getElementById("cas").value = 30;
}
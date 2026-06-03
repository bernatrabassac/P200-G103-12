/*
* APLICACIÓ PRINCIPAL
*/

let joc;
let idAnimacio; 
let nivellEscollit = 0;

$(document).ready(function() {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    // --- NOU: ACCIÓ CLIC ALS BOTONS DE NIVELL ---
    $(".btn-nivell").click(function() {
        // vlaor del nivell triat (0, 1 o 2)
        nivellEscollit = parseInt($(this).attr("data-nivell"));
        
        $(".btn-nivell").css("box-shadow", "none");
        $(this).css("box-shadow", "0 0 10px #FF00FF");
    });

    // --- ACCIÓ: CLIC AL BOTÓ JUGAR ---
    $("#btn-jugar").click(function() {
        let nom = $("#nom-usuari").val();
        if (nom.trim() === "") {
            nom = "Jugador 1"; 
        }
        let velocitatEscollida = parseInt($("#velocitat-bola").val()) || 4;

        $("#menu-inicial").hide();
        $("#joc").show();
        joc = new Joc(myCanvas, ctx, velocitatEscollida, nivellEscollit);
        joc.inicialitza();
        
        idAnimacio = requestAnimationFrame(animacio);
    });

    // --- ACCIÓ: CLIC AL BOTÓ TORNAR AL MENÚ (GAME OVER) ---
    $("#btn-tornar-menu").click(function() {
        $("#game-over").hide();
        $("#menu-inicial").show();
        $(".btn-nivell").css("box-shadow", "none");
        nivellEscollit = 0; 
    });

});

function animacio() {
    joc.update();
    
    if (joc.vides <= 0) {
        cancelAnimationFrame(idAnimacio);
        
        $("#joc").hide();
        
        $("#puntuacio-final").text(joc.puntuacio);
        $("#game-over").show();

    } else {
        idAnimacio = requestAnimationFrame(animacio);    
    }
}
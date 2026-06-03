/*
* APLICACIÓ PRINCIPAL
*/

let joc;
let idAnimacio; // Variable per poder aturar el bucle de la pantalla

$(document).ready(function() {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    // --- ACCIÓ: CLIC AL BOTÓ JUGAR ---
    $("#btn-jugar").click(function() {
        let nom = $("#nom-usuari").val();
        if (nom.trim() === "") {
            nom = "Jugador 1"; 
        }

        // Llegim la velocitat triada per l'usuari
        let velocitatEscollida = parseInt($("#velocitat-bola").val()) || 4;

        $("#menu-inicial").hide();
        $("#joc").show();

        // Passem la velocitat com a tercer paràmetre al constructor de Joc
        joc = new Joc(myCanvas, ctx, velocitatEscollida);
        joc.inicialitza();
        
        idAnimacio = requestAnimationFrame(animacio);
    });

    // --- ACCIÓ: CLIC AL BOTÓ TORNAR AL MENÚ (GAME OVER) ---
    $("#btn-tornar-menu").click(function() {
        $("#game-over").hide();
        $("#menu-inicial").show();
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
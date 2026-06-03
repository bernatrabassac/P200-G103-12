/*
* APLICACIÓ PRINCIPAL
*/

let joc;
let idAnimacio; 
let nivellEscollit = 0; 

$(document).ready(function() {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    $(".btn-nivell").click(function() {
        nivellEscollit = parseInt($(this).attr("data-nivell"));
        $(".btn-nivell").css("box-shadow", "none");
        $(this).css("box-shadow", "0 0 10px #FF00FF");
    });

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

    $("#btn-tornar-menu").click(function() {
        $("#game-over").hide();
        $("#menu-inicial").show();
        $(".btn-nivell").css("box-shadow", "none");
        nivellEscollit = 0; 
    });

    $("#btn-tornar-menu-victoria").click(function() {
        $("#victoria").hide();
        $("#menu-inicial").show();
        $(".btn-nivell").css("box-shadow", "none");
        nivellEscollit = 0; 
    });

    // --- NOU: ACCIÓ PASSAR AL SEGÜENT NIVELL ---
    $("#btn-seguent-nivell").click(function() {
        // Passem al nivell següent matemàticament
        nivellEscollit++;

        // Guardem les dades importants abans de reiniciar la classe Joc
        let puntuacioAcumulada = joc.puntuacio;
        let velocitatMantiguda = joc.velocitatInicial;

        $("#victoria").hide();
        $("#joc").show();

        // Creem el joc amb el nou nivell
        joc = new Joc(myCanvas, ctx, velocitatMantiguda, nivellEscollit);
        
        // Li injectem la puntuació que portàvem perquè no comenci de zero
        joc.puntuacio = puntuacioAcumulada; 
        
        joc.inicialitza();
        idAnimacio = requestAnimationFrame(animacio);
    });

});

function animacio() {
    joc.update();
    
    // Comprovem Game Over
    if (joc.vides <= 0) {
        cancelAnimationFrame(idAnimacio);
        $("#joc").hide();
        $("#puntuacio-final").text(joc.puntuacio);
        $("#game-over").show();
        
    // Comprovem Victòria
    } else if (joc.nivellSuperat) {
        cancelAnimationFrame(idAnimacio);
        $("#joc").hide();
        $("#puntuacio-victoria").text(joc.puntuacio);
        
        // --- NOU: Si estem a l'últim nivell (el 2), amaguem el botó de següent ---
        if (nivellEscollit >= 2) {
            $("#text-victoria").text("Has completat TOT EL JOC!");
            $("#btn-seguent-nivell").hide();
        } else {
            $("#text-victoria").text("Has netejat el nivell!");
            $("#btn-seguent-nivell").show();
        }

        $("#victoria").show();
        
    } else {
        idAnimacio = requestAnimationFrame(animacio);    
    }
}
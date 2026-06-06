/*
* APLICACIÓ PRINCIPAL
*/

let joc;
let idAnimacio; 
let nivellEscollit = 0; 
let musicaIniciada = false; 
let nomJugadorActual = "Jugador 1";

// variables de so per arreglar el problema amb el so
window.soActivat = true;
window.audioCtx = null;

let musicaMenu = new Audio("audio/menu_music.mp3");
musicaMenu.loop = true; 
musicaMenu.volume = 0.4; 

$(document).ready(function() {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    //ranquing per pantalla
    mostraRanquing();

    // engeguem l'audio 
    $("body").on("click keydown", function() {
        
        // barrera de seguretat per problema de audio
        if (!window.audioCtx) {
            window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Si la música no ha arrencat, el so està activat i som al menú, la posem
        if (!musicaIniciada && window.soActivat && $("#menu-inicial").is(":visible")) {
            musicaMenu.play();
            musicaIniciada = true;
        }
    });

    // boto de desactivar el so
    $("#btn-toggle-so").click(function() {
        window.soActivat = !window.soActivat;
        
        if (window.soActivat) {
            $(this).text("So: ON");
            if ($("#menu-inicial").is(":visible")) {
                musicaMenu.volume = 0.4;
                musicaMenu.play();
                musicaIniciada = true;
            }
        } else {
            $(this).text("So: OFF");
            musicaMenu.volume = 0;
            musicaMenu.pause();
            musicaIniciada = false;
        }
    });

    $(".btn-nivell").click(function() {
        nivellEscollit = parseInt($(this).attr("data-nivell"));
        $(".btn-nivell").css("box-shadow", "none");
        $(this).css("box-shadow", "0 0 10px #FF00FF");
    });

    $("#btn-jugar").click(function() {
        nomJugadorActual = $("#nom-usuari").val().trim();
        if (nomJugadorActual === "") {
            nomJugadorActual = "Jugador 1"; 
        }
        let velocitatEscollida = parseInt($("#velocitat-bola").val()) || 4;


        //baixar musica de fons quan comenci el joc
        if (window.soActivat && !musicaMenu.paused) {
            let intervalFade = setInterval(function() {
                if (musicaMenu.volume > 0.05) {
                    musicaMenu.volume -= 0.05;
                } else {
                    clearInterval(intervalFade);
                    musicaMenu.pause();
                    musicaMenu.volume = 0.4; 
                    musicaIniciada = false; // perquè torni a sonar al menú
                }
            }, 50);
        }

        $("#menu-inicial").hide();
        $("#pantalla-joc").show(); 

        joc = new Joc(myCanvas, ctx, velocitatEscollida, nivellEscollit);
        joc.inicialitza();
        
        idAnimacio = requestAnimationFrame(animacio);
    });

    // tornar al menu al mig del joc
    $("#btn-tornar-mig-joc").click(function() {
        cancelAnimationFrame(idAnimacio);
        $("#pantalla-joc").hide();
        $("#menu-inicial").show();
        $(".btn-nivell").css("box-shadow", "none");
        nivellEscollit = 0; 
        if (window.soActivat) {
            musicaMenu.volume = 0.4;
            musicaMenu.play();
            musicaIniciada = true;
        }
    });

    $("#btn-tornar-menu, #btn-tornar-menu-victoria").click(function() {
        $("#game-over, #victoria").hide();
        $("#menu-inicial").show();
        $(".btn-nivell").css("box-shadow", "none");
        nivellEscollit = 0; 
        
        if (window.soActivat) {
            musicaMenu.volume = 0.4;
            musicaMenu.play();
            musicaIniciada = true;
        }
    });

    $("#btn-seguent-nivell").click(function() {
        nivellEscollit++;
        let puntuacioAcumulada = joc.puntuacio;
        let velocitatMantiguda = joc.velocitatInicial + 1; //incrementem difcilutat

        $("#victoria").hide();
        $("#pantalla-joc").show();

        joc = new Joc(myCanvas, ctx, velocitatMantiguda, nivellEscollit);
        joc.puntuacio = puntuacioAcumulada; 
        joc.inicialitza();
        idAnimacio = requestAnimationFrame(animacio);
    });

});

function animacio() {
    joc.update();
    
    if (joc.vides <= 0) {
        cancelAnimationFrame(idAnimacio);
        $("#pantalla-joc").hide();
        $("#puntuacio-final").text(joc.puntuacio);
        
        // guardem el ranquing local
        actualitzaRanquing(nomJugadorActual, joc.puntuacio);
        
        $("#game-over").show();
        
    } else if (joc.nivellSuperat) {
        cancelAnimationFrame(idAnimacio);
        $("#pantalla-joc").hide();
        $("#puntuacio-victoria").text(joc.puntuacio);
        
        if (nivellEscollit >= 2) {
            $("#text-victoria").text("Has completat TOT EL JOC!");
            actualitzaRanquing(nomJugadorActual, joc.puntuacio);
            
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



//ranking local
function actualitzaRanquing(nom, puntuacio) {
    if (puntuacio <= 0) return;

    let ranquing = JSON.parse(localStorage.getItem('breakoutRanquing')) || [];
    
    // afegim puntuació
    ranquing.push({ nom: nom, punts: puntuacio });
    ranquing.sort(function(a, b) {
        return b.punts - a.punts;
    });
    
    //top 5
    ranquing = ranquing.slice(0, 5);
    
    localStorage.setItem('breakoutRanquing', JSON.stringify(ranquing));
    mostraRanquing();
}

function mostraRanquing() {
    let ranquing = JSON.parse(localStorage.getItem('breakoutRanquing')) || [];
    let llistaHTML = "";
    
    if (ranquing.length === 0) {
        llistaHTML = "<li>Encara no hi ha puntuacions</li>";
    } else {
        for (let i = 0; i < ranquing.length; i++) {
            llistaHTML += "<li><strong>" + ranquing[i].nom + "</strong>: " + ranquing[i].punts + " pts</li>";
        }
    }
    
    $("#llista-ranquing").html(llistaHTML);
}
/*
* CLASSE JOC
*/
class Joc {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        this.totxoamplada = 22; 
        this.totxoalcada = 10; 
       
        this.bola = new Bola(new Punt(this.canvas.width/2, this.canvas.height/2), 3);
        this.pala = new Pala(new Punt((this.canvas.width-60)/2, this.canvas.height-15), 60, 4);
        
        this.mur = new Mur();
        this.mur.generaMur(0, this.totxoamplada, this.totxoalcada, 30, 20); 

        this.puntuacio = 0;
        this.vides = 3; // --- NOU: Comencem amb 3 vides ---

        this.key = {
            LEFT: {code:37, pressed:false},
            RIGHT: {code:39, pressed:false}
        };      
    }

    draw() {
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.mur.draw(this.ctx);

        // --- MARCADOR PUNTUACIÓ I VIDES ---
        this.ctx.save(); 
        
        this.ctx.font = "bold 16px 'Courier New', Courier, monospace"; 
        this.ctx.fillStyle = "#FFFFFF"; 
        this.ctx.shadowColor = "#FF00FF"; 
        this.ctx.shadowBlur = 8;          
        
        // Puntuació a la dreta
        this.ctx.textAlign = "right";   
        this.ctx.fillText("SCORE: " + this.puntuacio, this.amplada - 15, 25);

        // Vides a l'esquerra
        this.ctx.textAlign = "left";
        this.ctx.shadowColor = "#00FFFF"; // Un to cian per les vides
        this.ctx.fillText("LIVES: " + this.vides, 15, 25);
        
        this.ctx.restore(); 
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    inicialitza() {
        this.draw(); 
        
        $(document).on("keydown", {joc:this}, function(e){
            if(e.keyCode === e.data.joc.key.LEFT.code) e.data.joc.key.LEFT.pressed = true;
            if(e.keyCode === e.data.joc.key.RIGHT.code) e.data.joc.key.RIGHT.pressed = true;        
        });
        
        $(document).on("keyup", {joc:this}, function(e){
            if(e.keyCode === e.data.joc.key.LEFT.code) e.data.joc.key.LEFT.pressed = false;
            if(e.keyCode === e.data.joc.key.RIGHT.code) e.data.joc.key.RIGHT.pressed = false;
        });
    }

    update() {
        // Recollim l'objecte amb els resultats de la bola
        let dadesActualitzacio = this.bola.update(this.amplada, this.alcada, this.pala, this.mur);
        
        // Sumem els punts
        if (dadesActualitzacio.punts > 0) {
            this.puntuacio += dadesActualitzacio.punts;
        }

        //buit?
        if (dadesActualitzacio.vidaPerduda) {
            this.vides--;
            
            if (this.vides > 0) {
                // Ressituem la bola i la pala al centre per seguir jugant
                this.bola = new Bola(new Punt(this.amplada/2, this.alcada/2), 3);
                this.pala = new Pala(new Punt((this.amplada-60)/2, this.alcada-15), 60, 4);
            } else {
                // GAME OVER
                alert("GAME OVER! Has aconseguit " + this.puntuacio + " punts.");
                
                this.vides = 3;
                this.puntuacio = 0;
                this.mur.generaMur(0, this.totxoamplada, this.totxoalcada, 30, 20);
                this.bola = new Bola(new Punt(this.amplada/2, this.alcada/2), 3);
                this.pala = new Pala(new Punt((this.amplada-60)/2, this.alcada-15), 60, 4);
            }
        }

        this.pala.update(this.key, this.amplada); 
        this.draw();       
    }
}
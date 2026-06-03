/*
* CLASSE JOC
*/
class Joc {
    constructor(canvas, ctx, velocitatBola = 4) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        
        this.totxoamplada = 45; 
        this.totxoalcada = 20; 
       
        this.velocitatInicial = velocitatBola;

        this.bola = new Bola(new Punt(this.amplada / 2, this.alcada / 2), 7, this.velocitatInicial); 
        

        let velocitatPala = this.velocitatInicial + 2;
        this.pala = new Pala(new Punt((this.amplada - 100) / 2, this.alcada - 25), 100, 12, velocitatPala); 
        
        this.mur = new Mur();
        
        let columnesTotals = 12; 
        let ampladaTotalMur = this.totxoamplada * columnesTotals;
        let margeEsquerraCentrat = (this.amplada - ampladaTotalMur) / 2;

        this.mur.generaMur(0, this.totxoamplada, this.totxoalcada, 55, margeEsquerraCentrat); 

        this.puntuacio = 0;
        this.vides = 3; 

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
        this.ctx.shadowColor = "#00FFFF"; 
        this.ctx.fillText("LIVES: " + this.vides, 15, 25);
        
        this.ctx.restore(); 
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.amplada, this.alcada);
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
        let dadesActualitzacio = this.bola.update(this.amplada, this.alcada, this.pala, this.mur);
        
        if (dadesActualitzacio.punts > 0) {
            this.puntuacio += dadesActualitzacio.punts;
        }

        if (dadesActualitzacio.vidaPerduda) {
            this.vides--;
            
            if (this.vides > 0) {
                this.bola = new Bola(new Punt(this.amplada / 2, this.alcada / 2), 7, this.velocitatInicial);
                
                // velocitat proporcional a la pala
                let velocitatPala = this.velocitatInicial + 2;
                this.pala = new Pala(new Punt((this.amplada - 100) / 2, this.alcada - 25), 100, 12, velocitatPala);
            } 
        }

        this.pala.update(this.key, this.amplada); 
        this.draw();       
    }
}
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

        this.bola.update(this.amplada, this.alcada, this.pala, this.mur);
        this.pala.update(this.key, this.amplada); 
        this.draw();       
    }
}
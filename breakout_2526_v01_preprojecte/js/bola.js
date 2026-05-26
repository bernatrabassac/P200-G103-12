class Bola {
    constructor(puntPosicio, radi) {
        this.radi = radi;
        this.posicio = puntPosicio;
        this.vx = 1;
        this.vy = -1;
        this.color = "#fff";
      
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posicio.x, this.posicio.y, this.radi, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    mou(x,y){
        this.posicio.x += x;
        this.posicio.y += y;
    }
    update(amplada, alcada){

        let puntActual = this.posicio;
        let puntSeguent= new Punt(this.posicio.x + this.vx,
                            this.posicio.y + this.vy);
        let trajectoria= new Segment(puntActual, puntSeguent);
        let exces;
        let xoc = false;
        

        //Xoc amb els laterals del canvas
        //Xoc lateral superior
        if(trajectoria.puntB.y - this.radi < 0){
            exces= (trajectoria.puntB.y - this.radi)/this.vy;
            this.posicio.x = trajectoria.puntB.x - exces*this.vx;
            this.posicio.y = this.radi;
            xoc = true;
            this.vy = -this.vy;
        }
        //Xoc lateral dret
        else if(trajectoria.puntB.y + this.radi > alcada) {
            exces = (trajectoria.puntB.y + this.radi - alcada) / this.vy;
            this.posicio.x = trajectoria.puntB.x - exces * this.vx;
            this.posicio.y = alcada - this.radi;
            xoc = true;
            this.vy = -this.vy;
        }
        //Xoc lateral esquerra
        if(trajectoria.puntB.x - this.radi < 0){
            exces = (trajectoria.puntB.x - this.radi) / this.vx;
            this.posicio.x = this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy; // aqui la Y es mou amb exces
            xoc = true;
            this.vx = -this.vx;
        }
        //Xoc lateral inferior
        else if(trajectoria.puntB.x + this.radi > amplada) {
            exces = (trajectoria.puntB.x + this.radi - amplada) / this.vx;
            this.posicio.x = amplada - this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy;
            xoc = true;
            this.vx = -this.vx;
        }
        //Xoc amb la pala

        //Xoc amb els totxos del mur
        
        //Utilitzem el mètode INTERSECCIOSEGMENTRECTANGLE
        

        if (!xoc){
            this.posicio.x = trajectoria.puntB.x;
            this.posicio.y = trajectoria.puntB.y;
        }     
        
    }

    interseccioSegmentRectangle(segment, rectangle){
       let puntI;
       let distanciaI;
       let puntIMin = null;
       let distanciaIMin = Infinity;
       let voraI = null;

       let voraSuperior = new Segment(rectangle.posicio, new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y));
       let voraInferior = new Segment(new Punt(rectangle.posicio.x, rectangle.posicio.y + rectangle.alcada), new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y + rectangle.alcada));
       let voraEsquerra = new Segment(rectangle.posicio, new Punt(rectangle.posicio.x, rectangle.posicio.y + rectangle.alcada));
       let voraDreta = new Segment(new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y), new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y + rectangle.alcada));

       let vores = [
           { seg: voraSuperior, nom: "superior" },
           { seg: voraInferior, nom: "inferior" },
           { seg: voraEsquerra, nom: "esquerra" },
           { seg: voraDreta, nom: "dreta" }
       ];

       for (let vora of vores) {
           puntI = segment.puntInterseccio(vora.seg);
           if (puntI){
               distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);

               if (distanciaI < distanciaIMin){
                   distanciaIMin = distanciaI;
                   puntIMin = puntI;
                   voraI = vora.nom;
               }
           }
       }

       if(voraI){
           return {pI: puntIMin, vora: voraI};
       }
       return null;
    }

    distancia = function(p1,p2){
        return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
    }
}


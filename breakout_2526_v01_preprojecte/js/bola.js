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

    mou(x, y) {
        this.posicio.x += x;
        this.posicio.y += y;
    }

    // AFEGIM LA PALA COM A PARÀMETRE AQUÍ
    update(amplada, alcada, pala) {
        let puntActual = this.posicio;
        let puntSeguent = new Punt(this.posicio.x + this.vx, this.posicio.y + this.vy);
        let trajectoria = new Segment(puntActual, puntSeguent);
        let exces;
        let xoc = false;
        
        // --- Xoc amb els laterals del canvas ---
        
        // Xoc lateral superior (eix Y)
        if (trajectoria.puntB.y - this.radi < 0) {
            exces = (trajectoria.puntB.y - this.radi) / this.vy;
            this.posicio.x = trajectoria.puntB.x - exces * this.vx;
            this.posicio.y = this.radi;
            xoc = true;
            this.vy = -this.vy;
        }
        // Xoc lateral inferior (eix Y)
        else if (trajectoria.puntB.y + this.radi > alcada) {
            exces = (trajectoria.puntB.y + this.radi - alcada) / this.vy;
            this.posicio.x = trajectoria.puntB.x - exces * this.vx;
            this.posicio.y = alcada - this.radi;
            xoc = true;
            this.vy = -this.vy;
        }

        // Xoc lateral esquerra (eix X)
        if (trajectoria.puntB.x - this.radi < 0) {
            exces = (trajectoria.puntB.x - this.radi) / this.vx;
            this.posicio.x = this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy;
            xoc = true;
            this.vx = -this.vx;
        }
        // Xoc lateral dret (eix X)
        else if (trajectoria.puntB.x + this.radi > amplada) {
            exces = (trajectoria.puntB.x + this.radi - amplada) / this.vx;
            this.posicio.x = amplada - this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy;
            xoc = true;
            this.vx = -this.vx;
        }

        // --- Xoc amb la pala ---
        let dadesColisio = this.interseccioSegmentRectangle(trajectoria, pala);

        if (dadesColisio) {
            xoc = true;
            // Invertim la velocitat vertical perquè reboti
            this.vy = -this.vy;
            
            // DUBTE PROFE: la bola al xocar amb la pala no faria coses rares?
            this.posicio.x = trajectoria.puntB.x; 
            this.posicio.y = trajectoria.puntB.y;
        }

        // --- Xoc amb els totxos del mur ---
        // Utilitzem el mètode INTERSECCIOSEGMENTRECTANGLE
        

        // Actualització si no hi ha hagut cap xoc
        if (!xoc) {
            this.posicio.x = trajectoria.puntB.x;
            this.posicio.y = trajectoria.puntB.y;
        }     
    }

    interseccioSegmentRectangle(segment, rectangle) {
       //1r REVISAR SI EXISTEIX UN PUNT D'INTERSECCIÓ EN UN DELS 4 SEGMENTS
       let puntI;
       let distanciaI;
       let puntIMin;
       let distanciaIMin = Infinity;
       let voraI;

       //vora superior
       let segmentVoraSuperior = new Segment(rectangle.posicio,
           new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y));
       //vora inferior
      
       //vora esquerra
      
       //vora dreta
      

       //2n REVISAR SI EXISTEIX UN PUNT D'INTERSECCIÓ EN UN DELS 4 SEGMENTS
       //vora superior
       puntI = segment.puntInterseccio(segmentVoraSuperior);
       if (puntI){
           //distancia entre dos punts, el punt inicial del segment i el punt d'intersecció
           distanciaI = Punt.distanciaDosPunts(segment.puntA,puntI);
           if (distanciaI < distanciaIMin){
               distanciaIMin = distanciaI;
               puntIMin = puntI;
               voraI = "superior";
           }
       }
       //vora inferior
       
       //vora esquerra
      
       //vora dreta
       
       //Retorna la vora on s'ha produït la col·lisió, i el punt (x,y)
       if(voraI){
           return {pI: puntIMin, vora: voraI};
       }
    }

    distancia = function(p1,p2){
        return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
    }
}
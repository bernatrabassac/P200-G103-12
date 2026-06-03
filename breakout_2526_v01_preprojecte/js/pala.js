/*
* CLASSE PALA
*/
class Pala {
    constructor(puntPosicio, amplada, alcada, velocitat = 6) {
        this.posicio = puntPosicio;
        this.amplada = amplada;
        this.alcada = alcada;
        this.velocitat = velocitat; 
        this.color = "#FF3366"; 
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posicio.x, this.posicio.y, this.amplada, this.alcada);
        ctx.closePath();
    }

    update(key, ampladaCanvas) {
        // utilitzem this.velocitat que és la que decideix el usuari
        if (key.LEFT.pressed) {
            this.posicio.x -= this.velocitat;
        }
        if (key.RIGHT.pressed) {
            this.posicio.x += this.velocitat;
        }

        // pq la pala no surti del canvas
        if (this.posicio.x < 0) {
            this.posicio.x = 0;
        }
        if (this.posicio.x + this.amplada > ampladaCanvas) {
            this.posicio.x = ampladaCanvas - this.amplada;
        }
    }
}
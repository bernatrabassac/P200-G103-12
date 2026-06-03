/*
* CLASSE PALA
*/
class Pala {
    // Afegim el paràmetre 'velocitat' al final del constructor
    constructor(puntPosicio, amplada, alcada, velocitat = 6) {
        this.posicio = puntPosicio;
        this.amplada = amplada;
        this.alcada = alcada;
        this.velocitat = velocitat; // Guardem la velocitat dinàmica
        this.color = "#FF3366"; // Color neó fúcsia modern
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        // Dibuixem el rectangle de la pala
        ctx.fillRect(this.posicio.x, this.posicio.y, this.amplada, this.alcada);
        ctx.closePath();
    }

    update(key, ampladaCanvas) {
        // NOU: Ara es mou utilitzant 'this.velocitat' en lloc d'un número fix
        if (key.LEFT.pressed) {
            this.posicio.x -= this.velocitat;
        }
        if (key.RIGHT.pressed) {
            this.posicio.x += this.velocitat;
        }

        // Límits del canvas perquè la pala no surti de la pantalla
        if (this.posicio.x < 0) {
            this.posicio.x = 0;
        }
        if (this.posicio.x + this.amplada > ampladaCanvas) {
            this.posicio.x = ampladaCanvas - this.amplada;
        }
    }
}
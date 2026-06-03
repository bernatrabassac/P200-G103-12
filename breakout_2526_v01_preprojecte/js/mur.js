/*
* CLASSE MUR
*/
class Mur {
    constructor() {
        this.defineixNivells(); 
        this.llistaTotxos = []; 
    }

    generaMur(numNivell, ampladaTotxo, alcadaTotxo, margeSuperior = 40, margeEsquerra = 15) {
        this.llistaTotxos = []; 
        
        let dadesNivell = this.nivells[numNivell]; // Agafem el nivell triat (0, 1 o 2)
        let color = dadesNivell.color;
        let files = dadesNivell.totxos;

        let separacio = 3; 

        for (let i = 0; i < files.length; i++) {
            let filaStr = files[i];
            
            for (let j = 0; j < filaStr.length; j++) {
                
                if (filaStr[j] === 'a') {
                    let posX = margeEsquerra + (j * ampladaTotxo);
                    let posY = margeSuperior + (i * alcadaTotxo);
                    
                    let nouTotxo = new Totxo(
                        new Punt(posX, posY), 
                        ampladaTotxo - separacio, 
                        alcadaTotxo - separacio, 
                        color
                    );
                    
                    this.llistaTotxos.push(nouTotxo);
                }
            }
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.llistaTotxos.length; i++) {
            let totxo = this.llistaTotxos[i];
            if (!totxo.tocat) {
                totxo.draw(ctx);
            }
        }
    }
     
    defineixNivells() {
        this.nivells=[
            {
                color: "#4CF", // blue cel
                totxos:[
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                ]
            },
            {
                color: "#8D1", // verd
                totxos:[
                    "aaaaaaaaaaaa",
                    "     aa     ",
                    "   aaaaaa   ",
                    "   aaaaaa   ",
                    "     aa     ",
                ]
            },
            {
                color: "#D30", // vermell
                totxos:[
                    "aaaaaaaaaaaa",
                    "a          a",
                    " a        a ",
                    "aa        aa",
                    "  aaaaaaaa  ",
                ]
            }

        ];
    }
}
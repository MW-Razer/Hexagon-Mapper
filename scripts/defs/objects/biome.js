// biomes (duh)

let biomes = [];

let biomeTab = document.getElementById('objectsDivBiomes');

let selectedBiome = null;

class Biome {
    constructor(name, abb, color) {

        this.name = name;
        this.abb = abb;
        this.color = color;

        this.id = biomes.length;

        biomes.push(this);

        appendBiomePanel(biomeTab, ['3%', '70px'], ['94%', '200px'], this.id);

        // shift all the other panels down
        for (let i = 0; i < biomes.length - 1; i++) {

            let el = document.getElementById(`biomePanel${i}`);

            el.style.top = `${parseInt(el.style.top.split('px')) + 210}px`;

        }

        // store hex locations
        this.hexes = [];

    }

    addHex(hex, a) {

        // let hex = grid.hexes[x][y];

        let thisIndex = hex.bio.findIndex((arr) => arr[0] == this.id);

        if (thisIndex != -1) { // previous opacity of this biome found

            if (a > 0) {
                hex.bio[thisIndex][1] = a;
            } else {
                hex.bio.splice(thisIndex, 1);
                this.hexes.splice(this.hexes.findIndex((i) => i[0] == hex.x && i[1] == hex.y), 1);
            }

        } else if (a > 0) { // no previous opacity of this biome

            hex.bio.push([this.id, a]);
            this.hexes.push([hex.x, hex.y]);

        }

        hex.update();
        hex.draw();

    }

    updateHexes() {

        for (let i = 0; i < this.hexes.length; i++) {

            grid.hexes[this.hexes[i][0]][this.hexes[i][1]].update()
            grid.hexes[this.hexes[i][0]][this.hexes[i][1]].draw();

        }

    }

    delete() {

        // remove hexes
        for (let i = 0; i < this.hexes.length; i++) {

            let hex = grid.hexes[this.hexes[i][0]][this.hexes[i][1]];

            hex.bio.splice(hex.bio.findIndex((arr) => arr[0] == this.id), 1);

            hex.update()
            hex.draw();

        }

        // remove panel
        document.getElementById(`biomePanel${this.id}`).remove();

        for (let i = this.id + 1; i < biomes.length; i++) {

            let el = document.getElementById(`biomePanel${i}`);

            el.id = `biomePanel${i - 1}`;

        }

        // move other panels
        for (let i = this.id - 1; i >= 0; i--) {

            let el = document.getElementById(`biomePanel${i}`);

            el.style.top = `${parseInt(el.style.top.split('px')) - 210}px`;

        }

        // remove from array
        biomes.splice(this.id, 1);

        // shift biome id down, and change other hexes to match new biome ids
        for (let i = this.id; i < biomes.length; i++) {

            biomes[i].id--;

            for (let k = 0; k < biomes[i].hexes.length; k++) {

                let hex = grid.hexes[biomes[i].hexes[k][0]][biomes[i].hexes[k][1]];

                for (let l = 0; l < hex.bio.length; l++) {

                    if (hex.bio[l][0] == biomes[i].id + 1) {
                        hex.bio[l][0] = biomes[i].id;
                    }

                }

            }

        }

        

    }

}

let biome4 = new Biome('0', 'void', new Color(0, 0, 0, 1));
let biome3 = new Biome('b', 'blue', new Color(0, 0, 255, 1));
let biome2 = new Biome('g', 'green', new Color(0, 255, 0, 1));
let biome1 = new Biome('r', 'red', new Color(255, 0, 0, 1));
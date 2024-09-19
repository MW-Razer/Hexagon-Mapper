// defines the hexagon
// o mighty bestagon

let smallSin = Math.sin(rad(30));

class Hex {
    constructor(x, y, parent) {

        this.x = x;
        this.y = y;

        this.cx = (x + 1) * grid.hexSize * 1.5;
        this.cy = (y + 1) * 2 * grid.hexApothem;

        if (x % 2 == 1) {
          this.cy += grid.hexApothem;
        }

        this.bio = [];
        this.res = [];
        this.fac = null;
        this.poi = null;

        this.points = [];
        this.strokePoints = [];

        this.color = new Color(0, 0, 0, 0);

        /*
        let lw = hexLineWidth;
        let lwh = hexLineWidth / 2;
        let lwd = hexLineWidth * 2;
        let lwy = hexLineWidth / smallSin;
        */
        // sin(30) = lw/lwy
        // lwy = lw/sin(30)

        let offset = 1;

        for (let i = 0; i < 6; i++) {

            this.points.push([(this.cx + (grid.hexSize + offset) * hexCos[i]), (this.cy + (grid.hexSize + offset) * hexSin[i])]);

            this.strokePoints.push([(this.cx + (grid.hexSize) * hexCos[i]), (this.cy + (grid.hexSize) * hexSin[i])]);

        }

    }

    // updates its colors and such to match current values
    update() {

        this.bio.sort((a, b) => b - a);
        this.res.sort((a, b) => b - a);

        let bioColors = [];
        for (let i = 0; i < this.bio.length; i++) {

            // console.log(this.bio[i][0], biomes[this.bio[i][0]]);

            bioColors.push(biomes[this.bio[i][0]].color.getNewOpacityMultiplied(this.bio[i][1]));

        }

        let resColors = [];
        for (let i = 0; i < this.res.length; i++) {

            let c = resources[this.res[i][0]].color;

            resColors.push(c.getNewOpacityMultiplied(this.res[i][1]));

        }

        let colors = [
            this.bio.length > 0 ? blendColors(bioColors).getNewOpacityMultiplied(grid.bioA) : null,
            this.res.length > 0 ? blendColors(resColors).getNewOpacityMultiplied(grid.resA) : null,
            this.fac != null ? factions[this.fac].color.getNewOpacityMultiplied(grid.facA) : null
        ];
        
        this.color = overlapCanvColors(colors);

    }

    draw() {

        grid.ctx.beginPath();

        grid.ctx.fillStyle = this.color.toStr();

        grid.ctx.moveTo(this.points[0][0], this.points[0][1]);

        for (let i = 1; i < this.points.length; i++) {

            grid.ctx.lineTo(this.points[i][0], this.points[i][1]);

        }

        grid.ctx.closePath();

        grid.ctx.fill();
        
    }

    drawBorder() {

        grid.borderCtx.beginPath();

        grid.borderCtx.moveTo(this.strokePoints[0][0], this.strokePoints[0][1]);

        for (let i = 1; i < this.strokePoints.length; i++) {

            grid.borderCtx.lineTo(this.strokePoints[i][0], this.strokePoints[i][1]);

        }

        grid.borderCtx.closePath();

        grid.borderCtx.stroke();

    }

    getNeighbors() {

        let dy = this.x % 2 == 0 ? -1 : 1;

        return [
            this.x - 1 > -1 ? grid.hexes[this.x - 1][this.y] : null,
            this.x + 1 < grid.width ? grid.hexes[this.x + 1][this.y] : null,
            this.y + 1 < grid.height ? grid.hexes[this.x][this.y + 1] : null,
            this.y - 1 > -1 ? grid.hexes[this.x][this.y - 1] : null,
            this.x - 1 > -1 && this.y + dy > -1 && this.y + dy < grid.height ? grid.hexes[this.x - 1][this.y + dy] : null,
            this.x + 1 < grid.width && this.y + dy > -1 && this.y + dy < grid.height ? grid.hexes[this.x + 1][this.y + dy] : null
        ];

    }

    isPointIn(cx, cy) {

        grid.ctx.beginPath();

        grid.ctx.moveTo(this.points[0][0], this.points[0][1]);

        for (let i = 1; i < this.points.length; i++) {
            grid.ctx.lineTo(this.points[i][0], this.points[i][1]);
        }

        return grid.ctx.isPointInPath(cx, cy);

    }

    // returns the index of the biome in the hex's bio arr (same goes for all other object arrs)
    getBiome(id) {
        
        let index = this.bio.findIndex((b) => b[0] == id);

        return index == -1 ? null : index;

    }

    getResource(id) {
        
        let index = this.res.findIndex((r) => r[0] == id);

        return index == -1 ? null : index;

    }

    hasSameBiomes(hex, testStrength = true) {

        if (!(hex.bio.length === this.bio.length)) {
            return false;
        }

        if (testStrength === true) {
            for (let i = 0; i < this.bio.length; i++) {
                if (!(this.bio[i][0] == hex.bio[i][0] && this.bio[i][1] == hex.bio[i][1])) {
                    return false;
                }
            }
        } else {
            for (let i = 0; i < this.bio.length; i++) {
                if (!(this.bio[i][0] == hex.bio[i][0])) {
                    return false;
                }
            }
        }

        return true;

    }

    getNewCopy() {

        let copy = new Hex(this.x, this.y);
        copy.bio = this.bio.slice();
        copy.res = this.res.slice();
        copy.fac = this.fac;
        copy.poi = this.poi;

        copy.update();

        return copy;

    }

    bioToStr() {

        if (this.bio.length > 0) {

            let str = '\nBiomes:\n';

            for (let i = 0; i < this.bio.length; i++) {

                str += `id: ${this.bio[i][0]}, strength: ${this.bio[i][1]}\n`;

            }

            return str;

        } else {

            return '\nBiomes:\nNone';

        }

    }

}


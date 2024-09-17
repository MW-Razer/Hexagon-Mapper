// defines the grid and its thingies

let gridWidth = 10;
let gridHeight = 10;
let gridRes = 1080;
let gridResWidth = 1000;
let gridResHeight = 1000;

const hexSin = [0, 0.866, 0.866, 0, -0.866, -0.866, 0];
const hexCos = [1, 0.5, -0.5, -1, -0.5, 0.5, 1];

class Grid {
    constructor(width, height, res) {

        grid = this;

        this.x = 100;
        this.y = 100;
        this.z = 1;

        this.minZ = 0.1;
        this.maxZ = 100;

        this.width = width;
        this.height = height;

        this.hexes = [];

        this.hoverHex = null;

        this.selectedObject = null; // selected bio, res, fac, or poi

        // setup changeable vars
        // opacities
        this.poiA = 1;
        this.facA = 0.5;
        this.resA = 0.3;
        this.bioA = 1;

        this.borderColor = new Color(0, 0, 0, 1);

        // setup hex measurements relative to resolution
        this.res = res;

        if (width > height) {
            this.resWidth = res;
            this.resHeight = Math.ceil(res * (height / width));
        } else {
            this.resHeight = res;
            this.resWidth = Math.ceil(res * (width / height));
        }
        
        this.hexSize = Math.min(this.resWidth / this.width, this.resHeight / this.height);
        this.hexApothem = this.hexSize / (2 * Math.tan(rad(30)));

        this.hexPoints = [];
        this.hexStrokePoints = [];

        this.hexLineWidth = this.hexSize / 15;

        for (let i = 0; i < 6; i++) {

            this.hexPoints.push([(this.hexSize * hexCos[i]), (this.hexSize * hexSin[i])]);

            this.hexStrokePoints.push([((this.hexSize + this.hexLineWidth) * hexCos[i]), ((this.hexSize + this.hexLineWidth) * hexSin[i])]);
            
        }

        for (let hx = 0; hx < width; hx++) {

            let column = [];

            for (let hy = 0; hy < height; hy++) {

                column.push(new Hex(hx, hy, this.canv));

            }

            this.hexes.push(column);

        }

        // setup canvases
        let canvWidth = (width + 2) * this.hexSize * 1.5;
        let canvHeight = (height + 2) * this.hexApothem * 2;

        // draws grid
        this.canv = document.getElementById('gridCanv');

        this.canv.width = canvWidth * window.devicePixelRatio;
        this.canv.height = canvHeight * window.devicePixelRatio;

        this.canv.style.width = `${canvWidth}px`;
        this.canv.style.height = `${canvHeight}px`;

        this.canv.style.left = `${this.x}px`;
        this.canv.style.top = `${this.y}px`;

        this.ctx = this.canv.getContext('2d');

        // draws things in a loop
        this.drawCanv = document.getElementById('gridDrawCanv');

        this.drawCanv.width = canvWidth * window.devicePixelRatio;
        this.drawCanv.height = canvHeight * window.devicePixelRatio;

        this.drawCanv.style.width = `${canvWidth}px`;
        this.drawCanv.style.height = `${canvHeight}px`;

        this.drawCanv.style.left = `${this.x}px`;
        this.drawCanv.style.top = `${this.y}px`;

        this.drawCtx = this.drawCanv.getContext('2d');
        

    }

    zoomBy(transformOrigin = [0, 0], newz) {
      
        let oldz = this.z;

        this.z = newz;
            
        if (this.z > this.maxZ) {
          this.z = this.maxZ;
        } else if (this.z < this.minZ) {
          this.z = this.minZ;
        }
        
        // maintain accurate position during zoom
        
        let dscale = this.z - oldz;
        
        this.translate(-transformOrigin[0] * dscale, -transformOrigin[1] * dscale);
    
        this.canv.style.scale = `${this.z} ${this.z}`;
        this.drawCanv.style.scale = `${this.z} ${this.z}`;

    }

    translate(x, y) {

        this.x += x;
        this.y += y;

        this.canv.style.left = `${this.x}px`;
        this.canv.style.top = `${this.y}px`;

        this.drawCanv.style.left = `${this.x}px`;
        this.drawCanv.style.top = `${this.y}px`;

    }

    draw() {

        for (let hx = 0; hx < this.width; hx++) {

            for (let hy = 0; hy < this.height; hy++) {

                let h = this.hexes[hx][hy];

                h.update();

                h.draw();

            }

        }

    }

    getHexAt(cx, cy) {

        let hx = Math.round((cx / (this.hexSize * 1.5)) - 1.0);
        let hy = Math.round((cy / (this.hexApothem * 2)) - 1.0);

        // console.log(`checking hexes at (${hx}, ${hy})...`);
        
        if (hx > -1 && hy > -1 && hx < this.width && hy < this.width) {

            let checkHexes = this.hexes[hx][hy].getNeighbors();
            checkHexes.push(this.hexes[hx][hy]);

            for (let i = 0; i < checkHexes.length; i++) {

                if (checkHexes[i] != null && checkHexes[i].isPointIn(cx, cy)) {
                    // console.log(`(!) got hex at (${checkHexes[i].x}, ${checkHexes[i].y})`);
                    // console.log(checkHexes[i].bio);
                    // console.log(checkHexes[i].res);
                    // console.log(checkHexes[i].fac);
                    // console.log(`overlapping colors...`);
                    // console.log(overlapCanvColors([checkHexes[i].bio.color, checkHexes[i].res.color, checkHexes[i].fac.color]));

                    return checkHexes[i];

                }

            }

        }

        return null;

    }

    remove() {

        this.canv = null;

        grid = null;

    }

}

/*
let gridWidth = 10;
let gridHeight = 10;

class Grid {
    constructor(width, height) {

        grid = this;

        this.x = 0;
        this.y = 0;

        this.zoom = 1;
        this.zoomMax = 10;
        this.zoomMin = 0.1;
        this.zoomTo = 1;
        this.zoomVel = 0;

        this.width = width;
        this.height = height;

        this.color = new Color(255, 255, 255, 1);

        this.hexes = [];

        for (let x = 0; x < width; x++) {

            let column = [];

            for (let y = 0; y < height; y++) {
            
                column.push(new Hex(x, y));

            }

            this.hexes.push(column);

        }

        this.canv = document.createElement('canvas');

        let canvWidth = (width + 1) * size * 1.5;
        let canvHeight = (height + 1) * apothem * 2;

        this.canv.width = canvWidth * window.devicePixelRatio;
        this.canv.height = canvHeight * window.devicePixelRatio;

        this.canv.style.width = `${canvWidth}px`;
        this.canv.style.height = `${canvHeight}px`;

        document.getElementById('canvasDiv').appendChild(this.canv);

        this.q = this.canv.getContext('2d');

    }

    // offsets x and y
    translate(x, y) {

        this.x += x;
        this.y += y;

        this.canv.style.left = `${this.x}px`;
        this.canv.style.top = `${this.y}px`;

    }

    smoothZoom() {

        let w = this.canv.width;
        let h = this.canv.height;

        if (this.zoomTo > this.zoomMax) {
            this.zoomTo = this.zoomMax;
        } else if (this.zoomTo < this.zoomMin) {
            this.zoomTo = this.zoomMin;
        }
        
        if (this.zoom != this.zoomTo) {
            
            let oldz = this.zoom;
            
            let diff = Math.abs(this.zoom - this.zoomTo);
            
            if (diff <= this.zoomVel) {
                this.zoom = this.zoomTo;
            } else {
                this.zoomVel = this.zoom / 10;
            }
            
            if (this.zoom < this.zoomTo) {
                
                this.zoom += this.zoomVel;
                
            } else if (this.zoom > this.zoomTo) {
                
                this.zoom -= this.zoomVel;
                
            }
            
            if (this.zoom > this.zoomMax) {
                this.zoom = this.zoomMax;
            } else if (this.zoom < this.zoomMin) {
                this.zoom = this.zoomMin;
            }
            
            // maintain accurate position during zoom
            
            let dscale = this.zoom - oldz;

            let hx = (mouse.x) / (size * 1.5) / this.zoom;
            let hy = (mouse.y) / (apothem * 2) / this.zoom;
            
            this.x -= hx * (size * 1.5) * dscale;
            this.y -= hy * (apothem * 2) * dscale;
            
            if (this.x + (size * 1.5 * (this.width - 1)) * this.zoom - 10 < 0) {
                this.x = -((size * 1.5 * (this.width - 1)) * this.zoom - 10);
            } else if (this.x + 10 > w) {
                this.x = w - 10;
            }
            
            if (this.y + (apothem * 2 * (this.height - 1)) * this.zoom - 60 < 0) {
                this.y = -((apothem * 2 * (this.height - 1)) * this.zoom - 60);
            } else if (this.y + 60 > h) {
                this.y = h - 60;
            }
          
        } else {
          
          this.zoomVel = this.zoom / 10
          
        }

        this.canv.style.scale = `${this.zoom} ${this.zoom}`;

        this.canv.style.left = `${this.x}px`;
        this.canv.style.top = `${this.y}px`;

    }

    // draws the entire grid
    draw() {
        
        for (let hx = 0; hx < this.width; hx++) {
            for (let hy = 0; hy < this.height; hy++) {
                this.hexes[hx][hy].draw();
            }
        }

    }

    getHoverHex() {

        let hx = (mouse.x) / (size * 1.5) / this.zoom;
        let hy = (mouse.y) / (apothem * 2) / this.zoom;
        

        return hx >= 0 && hy >= 0 && hx < this.width && hy < this.height ? this.hexes[Math.floor(hx)][Math.floor(hy)] : null;

    }

    remove() {

        this.canv.remove();

        grid = null;

    }

}
*/
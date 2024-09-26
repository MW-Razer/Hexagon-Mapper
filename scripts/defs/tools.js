// tools to use on the map
// under rework



///*
class Tool {
    constructor(targetFunc, useFunc, data) {

        this.size = 1;
        this.opacity = {start: 1, end: 1};
        this.shape = 'square';

        // targetFunc returns an array of target hexes and a center hex for the useFunc [hexes, center]
        this.targetFunc = targetFunc;

        // target array is input into useFunc
        this.useFunc = useFunc;

        // misc data (unique to each tool)
        this.data = data;

    }

    use(drawHexes = false, drawHexesAll = false) {

        this.useFunc(this.targetFunc(this.size, this.opacity, this.shape, this.data, drawHexes, drawHexesAll), this.data);

    }

    // draws the tool's effected hexagons
    draw(targets, drawAllTargets = true) {

        if (drawAllTargets === true) {

            grid.drawCtx.beginPath();

            grid.drawCtx.strokeStyle = grid.selectedObject != null ? blendColors([grid.borderColor.getSecondary(75).getNewOpacity(0.5), grid.selectedObject.color.getNewOpacity(0.75)]).toStr() : grid.borderColor.getNewOpacity(1.0).getSecondary(75).toStr();
            grid.drawCtx.lineWidth = grid.hexLineWidth * 2.0;

            for (let i = 0; i < targets.list.length; i++) {
    
                let hex = grid.hexes[targets.list[i].x][targets.list[i].y];

                grid.drawCtx.moveTo(hex.points[0][0], hex.points[0][1]);

                for (let k = 1; k < hex.points.length; k++) {

                    grid.drawCtx.lineTo(hex.points[k][0], hex.points[k][1]);

                }

                grid.drawCtx.lineTo(hex.points[0][0], hex.points[0][1]);
    
            }

            // grid.drawCtx.closePath();
            grid.drawCtx.stroke();

        } else {

            let target = targets.center;

            grid.drawCtx.beginPath();

            grid.drawCtx.strokeStyle = grid.selectedObject != null ? blendColors([grid.borderColor.getSecondary(75).getNewOpacity(0.5), grid.selectedObject.color.getNewOpacity(0.75)]).toStr() : grid.borderColor.getSecondary(75).toStr();
            grid.drawCtx.lineWidth = grid.hexLineWidth * 2.0;

            for (let i = 0; i < target.length; i++) {
    
                let hex = grid.hexes[target[i].y][target[i].x];

                grid.drawCtx.moveTo(hex.points[0][0], hex.points[0][1]);

                for (let k = 1; k < hex.points.length; k++) {

                    grid.drawCtx.lineTo(hex.points[k][0], hex.points[k][1]);

                }

                grid.drawCtx.lineTo(hex.points[0][0], hex.points[0][1]);
    
            }

            // grid.drawCtx.closePath();
            grid.drawCtx.stroke();

        }

    }

}

const tools = [
    // pen
    new Tool((size, opacity, shape, data, drawHexes, drawHexesAll) => {

        let hexes = [];

        switch (shape) {
            case 'square':

                let sx = grid.hoverHex.x - Math.floor(size / 2);
                let sy = grid.hoverHex.y - Math.floor(size / 2);

                let mx = grid.hoverHex.x + Math.ceil(size / 2) - 1;
                let my = grid.hoverHex.y + Math.ceil(size / 2) - 1;

                // console.log(sx, sy, mx, my);

                for (let x = sx; x <= mx; x++) {

                    for (let y = sy; y <= my; y++) {

                        if (y >= 0 && x >= 0 && y < grid.height && x < grid.width) {
                            hexes.push({x: x, y: y, opacity: opacity.start});
                        }

                    }

                }

                break;
        }

        //console.log(hexes, grid.hoverHex);

        if (drawHexes === true) {
            tools[0].draw({list: hexes, center: grid.hoverHex}, drawHexesAll);
        }

        return {list: hexes, center: grid.hoverHex};

    }, (targets, data) => {

        for (let i = 0; i < targets.list.length; i++) {

            grid.selectedObject.addHex(grid.hexes[targets.list[i].x][targets.list[i].y], targets.list[i].opacity);

        }

    }, {}),
    // brush
    new Tool((size, opacity, shape, data, drawHexes, drawHexesAll) => {

        let hexes = [];

        return [hexes, grid.hoverHex];

    }, (targets, data) => {

        for (let i = 0; i < targets[0].length; i++) {

            grid.selectedObject.addHex(grid.hexes[targets[0][i][0]][targets[0][i][1]], targets[0][i][2]);
            // console.log(targets[0][i][0], targets[0][i][1]);

        }

    }),
    // erase
    new Tool((size, opacity, shape, data, drawHexes, drawHexesAll) => {

        let hexes = [];

        switch (shape) {
            case 'square':

                let sx = grid.hoverHex.x - (size - 1);
                let sy = grid.hoverHex.y - (size - 1);

                let mx = grid.hoverHex.x + (size - 1);
                let my = grid.hoverHex.y + (size - 1);

                // console.log(sx, sy, mx, my);

                for (let x = sx; x <= mx; x++) {

                    for (let y = sy; y <= my; y++) {

                        if (y >= 0 && x >= 0 && y < grid.height && x < grid.width) {
                            hexes.push([x, y, opacity[0]]);
                        }

                    }

                }

                break;
        }

        //console.log(hexes, grid.hoverHex);

        if (drawHexes === true) {
            tools[0].draw({list: hexes, center: grid.hoverHex}, drawHexesAll);
        }

        return [hexes, grid.hoverHex];

    }, (targets, data) => {

        for (let i = 0; i < targets[0].length; i++) {

            let hex = grid.hexes[targets[0][i][0]][targets[0][i][1]];

            switch (grid.selectedObject.constructor.name) {
                case 'Biome':
                    hex.bio = [];
                    hex.update();
                    hex.draw();
                    break;
                case 'Resource':
                    hex.res = [];
                    hex.update();
                    hex.draw();
                    break;
                case 'Faction':
                    hex.fac = null;
                    hex.update();
                    hex.draw();
                    break;
                case 'POI':
                    hex.poi = null;
                    hex.update();
                    hex.draw();
                    break;
            }

        }

    }),
    // fill
    new Tool((size, opacity, shape) => {

        let hexes = [[grid.hoverHex.x, grid.hoverHex.y, opacity]];

        return [hexes, grid.hoverHex];

    }, (targets) => {

        let objType = grid.selectedObject == null ? null : grid.selectedObject.constructor.name;
        console.log(objType);

        let initialHex = targets[1].getNewCopy();
        
        let anchorHexes = [initialHex];

        let openHexes = [];
        let filledHexes = [];

        switch (objType) {
            case 'Biome':

                let bioId = initialHex.getBiome(grid.selectedObject.id);
                
                // if starting hex would not change
                console.log(bioId);
                //(targets[0][0][2][1] === false && (bioId != null))
                if (bioId != null && initialHex.bio[bioId][1] == targets[0][0][2][0]) {

                    break;

                } else {

                    grid.selectedObject.addHex(targets[1], targets[0][0][2][0]);

                    do {
                
                        for (let i = 0; i < anchorHexes.length; i++) {
                            
                            let testHexes = anchorHexes[i].getNeighbors();
                            
                            for (let j = 0; j < testHexes.length; j++) {
    
                                if (testHexes[j] != null) {
    
                                    if (targets[0][0][2][1] === true) { // ignore strength true
    
                                        console.log(`comparing:`, testHexes[j].bioToStr(), initialHex.bioToStr());
    
                                        if (testHexes[j].hasSameBiomes(initialHex, true)) {
                                        
                                            openHexes.push(testHexes[j]);
                                            filledHexes.push(testHexes[j]);
        
                                            grid.selectedObject.addHex(grid.hexes[testHexes[j].x][testHexes[j].x], targets[0][0][2][0]);
                                            
                                        }
    
                                    } else { // ignore strength false
    
                                        console.log(`comparing:`, testHexes[j].bioToStr(), initialHex.bioToStr());
    
                                        if (testHexes[j].hasSameBiomes(initialHex, false)) {
                                        
                                            openHexes.push(testHexes[j]);
                                            filledHexes.push(testHexes[j]);
                                            
                                            
                                            console.log(`before addHex: ${testHexes[j].bioToStr()}`);
                                            console.log(initialHex.bioToStr());
                                            grid.selectedObject.addHex(grid.hexes[testHexes[j].x][testHexes[j].x], targets[0][0][2][0]);
                                            console.log(`after addHex: ${testHexes[j].bioToStr()}`);
                                            console.log(initialHex.bioToStr());
                                            console.log(testHexes[j].x, testHexes[j].y, targets[0][0][2][0]);
                                            console.log(testHexes[j] == initialHex, testHexes[j].bio == initialHex.bio);
                                            
                                        }
    
                                    }
    
                                }
    
                            } // end of testHex loop

                            testHexes.splice(0, testHexes.length);
                            
                        } // end of anchorHex loop
                        
                        console.log(`\n\nExited anchorHex loop\n\n`, anchorHexes, openHexes);
                        
                        anchorHexes.splice(0, anchorHexes.length);
                        anchorHexes = openHexes.slice();
                        openHexes.splice(0, openHexes.length);
    
                        console.log(`Changed anchors:`, anchorHexes, openHexes);
                    
                    } while (anchorHexes.length > 0);

                }

                console.log(anchorHexes, openHexes, filledHexes);
                
                break;

        }

    }),
];


let selectedTool = tools[0];

tools[3].opacity[1] = false;
//*/
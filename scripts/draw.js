const sq3 = Math.sqrt(3);

const fastGetHexPoints = (x, y, hw) => [
    [x + hw*-0.5,y + hw*0.8660254037844386],
    [x + hw*-1,  y + 0],
    [x + hw*-0.5,y + hw*-0.8660254037844386],
    [x + hw*0.5, y + hw*-0.8660254037844387],
    [x + hw*1,   y + 0],
    [x + hw*0.5, y + hw*0.8660254037844385]];

const drawGridHexagon = (board, px, py, sz, c) => {
    const points = fastGetHexPoints(px, py, sz);
    let [x, y] = points[0]
    //board.strokeStyle = "#FFFFFF";
    board.moveTo(x, y);

    for (let i = 1; i <= c; i++) {
        [x, y] = points[i % 6];
        board.lineTo(x,y);
    }
}

export const drawHexGrid = (gridCanvas, [sx,sy]) => {
    const sizeX = gridCanvas.width/(sx*2);
    const sizeY = gridCanvas.height/(sy*2);
    const size = sizeX < sizeY ? sizeX: sizeY;
    const spacing = size*2;

    const gridContext = gridCanvas.getContext("2d");
    gridContext.beginPath();

    let tx = 0;
    let ty = 0;
    let sideCount = 6;

    for (let x = 0; x < sx; x++) {
        for (let y = 0; y < sy; y++) {
            tx = x*size*1.5 + spacing;
            ty = y*size*sq3 + spacing;

            if (x % 2 === 0) ty -= size*sq3/2;

            //if (x === sx - 1 || y === sy - 1) sideCount = 6;
            //else if (y === 0 && x % 2 === 0) sideCount = 4;
            //else sideCount = 3;

            drawGridHexagon(gridContext, tx, ty, size, sideCount);
        }
    }

    gridContext.fillStyle = "#3264C8";
    gridContext.fill();
    gridContext.stroke();

    gridContext.beginPath();
    gridContext.moveTo(0,0);
    gridContext.lineTo(spacing*sx, 0);
    gridContext.lineTo(spacing*sx, spacing*sy);
    gridContext.lineTo(0, spacing*sy);
    gridContext.stroke();
}

export const drawHexMap = (hexMap, gridCanvas) => {
    const {factions, hexes, width, height, hexOpacity, imageData, image} = hexMap
    let hexInfo = new Array(factions.length).fill(0).map(() => []);

    const convertFaction = (s) => factions.findIndex(({id}) => id === s);

    hexes.forEach((row, c) => {
        row.forEach((s, r) => {
            if (s === null || s === undefined) return;
            hexInfo[convertFaction(s)].push([c,r]);
        })});

    const sizeX = gridCanvas.width/(width*1.5);
    const sizeY = gridCanvas.height/(height*1.5);
    const size = sizeX < sizeY ? sizeX: sizeY;
    const spacing = size*2;

    const gridContext = gridCanvas.getContext("2d");
    const opacity = (Math.floor(hexOpacity*255)).toString(16).toUpperCase();
    
    let x, y, tx, ty;
    let sideCount = 6;

    const imageFile = new Image(image.width, image.height);
    imageFile.src = imageData;
    gridContext.drawImage(imageFile, 0,0, gridCanvas.width, gridCanvas.height);

    for (let i = 0; i < hexInfo.length; i++) {
        gridContext.beginPath();
        for (let j = 0; j < hexInfo[i].length; j++) {
            [x,y] = hexInfo[i][j];
            tx = x*size*1.5 + 3*size/4;
            ty = y*size*sq3;

            if (x % 2 === 0) ty -= size*sq3/2;

            drawGridHexagon(gridContext, tx, ty, size, sideCount);
        }
        gridContext.fillStyle = `#${factions[i].fill.toUpperCase()}${opacity}`;
        gridContext.strokeStyle = "#00000000"
        gridContext.closePath();
        gridContext.stroke();
        gridContext.fill();
    }

    gridContext.beginPath();
    gridContext.moveTo(0,0);
    gridContext.lineTo(spacing*width, 0);
    gridContext.lineTo(spacing*width, spacing*height);
    gridContext.lineTo(0, spacing*height);
    gridContext.stroke();
}
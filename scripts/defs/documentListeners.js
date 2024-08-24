// document-wide listener events

// important elems
let infoPanel = document.getElementById('hexinfo');
let infoPanelTitle = document.getElementById('hexinfoTitle');
let infoPanelBio = document.getElementById('hexinfoBio');
let infoPanelRes = document.getElementById('hexinfoRes');

let mouse = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    click: false,
    left: false,
    right: false,
    target: null
};

let key = {
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false
}

addEventListener('mousedown', (e) => {

    mouse.target = e.target;

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (grid != null) {

        mouse.x -= grid.x;
        mouse.y -= grid.y;

        mouse.x /= grid.z;
        mouse.y /= grid.z;

        grid.hoverHex = grid.getHexAt(mouse.x, mouse.y);

    }

    mouse.click = true;

    if (e.button == 0) {
        mouse.left = true;
    }
    if (e.button == 2) {
        mouse.right = true;
        e.preventDefault();
    }

    if (!e.target.classList.contains('dropdownoption') && !e.target.classList.contains('dropdownUnderDiv') && !e.target.classList.contains('dropdowndiv')) {
        if (openDropdown != null) {
            openDropdown.classList.add('closed');
            openDropdown = null;
        }
    }

    if (grid != null && mouse.left) {

        if (grid.hoverHex != null && grid.selectedObject != null) {
            
            selectedTool.use();

        }

    }

});

addEventListener('mouseup', (e) => {

    mouse.click = false;

    if (e.button == 0) {
        mouse.left = false;
    }
    if (e.button == 2) {
        mouse.right = false;
        e.preventDefault();
    }

});

addEventListener('mousemove', (e) => {

    mouse.target = e.target;

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    mouse.vx = e.movementX;
    mouse.vy = e.movementY;

    if (grid != null) {

        mouse.x -= grid.x;
        mouse.y -= grid.y;

        mouse.x /= grid.z;
        mouse.y /= grid.z;

        grid.hoverHex = grid.getHexAt(mouse.x, mouse.y);

    }

    if (mouse.right) {

        if (grid != null) {

            grid.translate(mouse.vx, mouse.vy);

        }

    }

    // check elems
    if (!e.target.parentElement.classList.contains('warning')) {

        let warnButtons = document.getElementsByClassName('warning');

        for (let i = 0; i < warnButtons.length; i++) {
            warnButtons[i].click();
        }

    }

    infoPanel.style.left = `${e.clientX + 10}px`;
    infoPanel.style.top = `${e.clientY + 10}px`;

    if (grid == null || grid.hoverHex == null) {
        infoPanel.classList.add('hidden');
    } else if (key.shift) {
        updateHexInfo();
        infoPanel.classList.remove('hidden');
    }

});

addEventListener('wheel', (e) => {

    if (grid != null && (e.target.id == 'gridCanv' || e.target.id == 'gridDrawCanv' || e.target.id == 'mapScreenDiv')) {

        grid.zoomBy([mouse.x, mouse.y], grid.z - (grid.z * (e.deltaY / 800)));

    }

});

addEventListener('keydown', (e) => {

    if (key[e.key.toLowerCase()] != undefined) {
        key[e.key.toLowerCase()] = true;
    }

    if (grid != null && grid.hoverHex != null && key.shift) {

        updateHexInfo();
        infoPanel.classList.remove('hidden');

    }

});

addEventListener('keyup', (e) => {

    if (key[e.key.toLowerCase()] != undefined) {
        key[e.key.toLowerCase()] = false;
    }

    infoPanel.classList.add('hidden');

});
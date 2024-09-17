// creates a biome panel for the biome list

function appendBiomePanel(elem, pos, dim, id) {

    let div = document.createElement('div');
    div.classList.add('panelbutton');
    div.classList.add('biomepanel');
    div.style.left = pos[0];
    div.style.top = pos[1];
    div.style.width = dim[0];
    div.style.height = dim[1];

    div.id = `biomePanel${id}`;

    div.onclick = function() {

        if (!mouse.target.parentElement.classList.contains('warning')) {

            let bioId = parseInt(div.id.split('biomePanel')[1]);

            selGroup(getElem(div.id), `biomepanel`);

            selectedBiome = biomes[bioId];

            grid.selectedObject = biomes[bioId];
            grid.selectedBio = biomes[bioId];

            document.getElementById('objectsDisplay').innerHTML = biomes[bioId].getQuickInfo();

        }

    }

    let abb = document.createElement('input');
    abb.classList.add('ghost');
    abb.type = 'text';
    abb.style.top = `5px`;
    abb.style.left = `5px`;
    abb.style.width = `200px`;
    abb.style.height = `35px`;
    abb.style.font = `20px var(--header-font)`;
    abb.value = biomes[id].abb;
    abb.placeholder = `Abbreviation...`;

    abb.oninput = function() {

        if (biomes[parseInt(div.id.split('biomePanel')[1])].abb != abb.value) {

            applyCon.classList.remove('grayed');
            revertCon.classList.remove('grayed');

        } else {

            applyCon.classList.add('grayed');
            revertCon.classList.add('grayed');

        }

    }

    let name = document.createElement('input');
    name.classList.add('ghost');
    name.type = 'text';
    name.style.top = `45px`;
    name.style.left = `5px`;
    name.style.width = `200px`;
    name.style.height = `25px`;
    name.value = biomes[id].name;
    name.placeholder = `Name...`;

    name.oninput = function() {

        if (biomes[parseInt(div.id.split('biomePanel')[1])].name != name.value) {

            applyCon.classList.remove('grayed');
            revertCon.classList.remove('grayed');

        } else {

            applyCon.classList.add('grayed');
            revertCon.classList.add('grayed');

        }

    }

    let color = document.createElement('input');
    color.type = 'color';
    color.style.top = `10px`;
    color.style.right = `10px`;
    color.style.width = `40px`;
    color.style.height = `45px`;
    color.style.cursor = 'var(--cursor-pointer)';
    color.value = '#00ff00';

    color.oninput = function() {

        hexCode.value = color.value.split('#')[1];

        if (biomes[parseInt(div.id.split('biomePanel')[1])].color.toHexStr() != color.value) {

            applyCon.classList.remove('grayed');
            revertCon.classList.remove('grayed');

        } else {

            applyCon.classList.add('grayed');
            revertCon.classList.add('grayed');

        }

    }

    let hexCode = document.createElement('input');
    hexCode.type = 'text';
    hexCode.style.top = `15px`;
    hexCode.style.right = `55px`;
    hexCode.style.width = `65px`;
    hexCode.style.height = `30px`;
    hexCode.value = '00ff00';

    let hexCodeHash = document.createElement('h4');
    hexCodeHash.style.top = `-2px`;
    hexCodeHash.style.right = `131px`;
    hexCodeHash.innerHTML = `#`;

    hexCode.oninput = function() {

        if (hexCode.value.length < 1) {
            return;
        }

        hexCode.value = whitelistChars(`0-9a-fA-F`, hexCode.value.substring(0, 6).toLowerCase());

        color.value = `#${hexCode.value}`;

        if (biomes[parseInt(div.id.split('biomePanel')[1])].color.toHexStr() != color.value) {

            applyCon.classList.remove('grayed');
            revertCon.classList.remove('grayed');

        } else {

            applyCon.classList.add('grayed');
            revertCon.classList.add('grayed');

        }

    }

    // apply changes

    let applyCon = document.createElement('div');
    applyCon.classList.add('mechcontainer');
    applyCon.classList.add('grayed');
    applyCon.style.bottom = `15px`;
    applyCon.style.left = `10px`;
    applyCon.style.width = `100px`;
    applyCon.style.height = `50px`;

    applyCon.onclick = function() {

        if (!applyCon.classList.contains('grayed')) {

            biomes[parseInt(div.id.split('biomePanel')[1])].abb = abb.value;

            biomes[parseInt(div.id.split('biomePanel')[1])].name = name.value;

            biomes[parseInt(div.id.split('biomePanel')[1])].color = hexToRgb(color.value);

            biomes[parseInt(div.id.split('biomePanel')[1])].updateHexes();

            revertCon.classList.add('grayed');
            applyCon.classList.add('grayed');

        }

    }

    let applyDiv = document.createElement('div');

    let applyButton = document.createElement('button');
    applyButton.innerHTML = `Apply`;

    applyCon.appendChild(applyDiv);
    applyCon.appendChild(applyButton);

    // revert changes

    let revertCon = document.createElement('div');
    revertCon.classList.add('mechcontainer');
    revertCon.classList.add('grayed');
    revertCon.style.bottom = `15px`;
    revertCon.style.left = `115px`;
    revertCon.style.width = `100px`;
    revertCon.style.height = `50px`;

    revertCon.onclick = function() {

        if (!revertCon.classList.contains('grayed')) {

            abb.value = biomes[parseInt(div.id.split('biomePanel')[1])].abb;

            name.value = biomes[parseInt(div.id.split('biomePanel')[1])].name;

            color.value = biomes[parseInt(div.id.split('biomePanel')[1])].color.toHexStr();

            hexCode.value = biomes[parseInt(div.id.split('biomePanel')[1])].color.toHexStr().split('#')[1].toLowerCase();

            revertCon.classList.add('grayed');
            applyCon.classList.add('grayed');

        }

    }

    let revertDiv = document.createElement('div');

    let revertButton = document.createElement('button');
    revertButton.innerHTML = `Revert`;

    revertCon.appendChild(revertDiv);
    revertCon.appendChild(revertButton);

    // delete button

    let delCon = document.createElement('div');
    delCon.classList.add('mechcontainer');
    delCon.style.bottom = `15px`;
    delCon.style.right = `5px`;
    delCon.style.width = `50px`;
    delCon.style.height = `50px`;
    // delCon.style.borderRadius = `10px 10px 10px 10px`;

    delCon.onclick = function() {

        if (delCon.classList.contains('warning')) {

            if (mouse.target != null && mouse.target.parentElement == delCon) {

                biomes[parseInt(div.id.split('biomePanel')[1])].delete();
                
            } else {
    
                delCon.classList.remove('warning');
                delButton.innerHTML = `x`;
                delCon.style.width = `50px`;
                // delCon.style.borderRadius = `10px 10px 10px 10px`;
    
            }

        } else {

            delCon.classList.add('warning');
            delButton.innerHTML = `Delete`;
            delCon.style.width = `100px`;
            // delCon.style.borderRadius = `var(--mech-border-radius);`;

        }

    }

    let delDiv = document.createElement('div');

    let delButton = document.createElement('button');
    delButton.innerHTML = `x`;

    delCon.appendChild(delDiv);
    delCon.appendChild(delButton);

    div.appendChild(abb);
    div.appendChild(name);
    div.appendChild(color);
    div.appendChild(hexCode);
    div.appendChild(hexCodeHash);
    div.appendChild(applyCon);
    div.appendChild(revertCon);
    div.appendChild(delCon);

    elem.appendChild(div);

}
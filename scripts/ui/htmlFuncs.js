// css var setters

const css_root = document.querySelector(':root');

function css_get(v) {

  return getComputedStyle(css_root).getPropertyValue(v);

}

function css_set(v, prop) {

  css_root.style.setProperty(v, prop);

}

// helpful functions
function whitelistChars(str, whitelist) {
  let regex = new RegExp(`[^${whitelist}]`, 'g');
  return str.replace(regex, '');
}

// common functionalities

function getElem(comp) {

  return typeof comp === "string" ? document.getElementById(comp) : comp;

}

function click(elem) {

  getElem(elem).click();

}

function val(elem) {

  return getElem(elem).value;

}

function hide(elem) {

  elem = getElem(elem);

  elem.classList.add('hidden');
  elem.style.opacity = 0;

}

function show(elem) {

  elem = getElem(elem);

  elem.classList.remove('hidden');
  elem.style.opacity = 1;

}

function toggleVis(elem) {

  elem = getElem(elem);

  if (elem.classList.contains('hidden')) {
    show(elem);
  } else {
    hide(elem);
  }

}

// shows elem, hides group
function showGroup(elem, group) {

  if (typeof group === "string") {
    group = document.getElementsByClassName(group);
  }

  elem = getElem(elem);

  for (let i = 0; i < group.length; i++) {
    hide(group[i]);
  }

  show(elem);

}


function sel(elem) {

  elem = getElem(elem);

  elem.classList.add('selected');

}

function desel(elem) {

  elem = getElem(elem);

  elem.classList.remove('selected');

}

function toggleSel(elem) {

  elem = getElem(elem);

  if (elem.classList.contains('selected')) {
    desel(elem);
  } else {
    sel(elem);
  }

}

// selects elem, desels all in group (class name if string)
function selGroup(elem, group) {

  if (typeof group === "string") {
    group = document.getElementsByClassName(group);
  }

  elem = getElem(elem);

  for (let i = 0; i < group.length; i++) {
    if (group[i].classList.contains('selected') && group[i] != elem) {
      group[i].click();
      desel(group[i]);
    }
  }

  sel(elem);

}

function deselGroup(elem, group) {

  if (typeof group === "string") {
    group = document.getElementsByClassName(group);
  }

  elem = getElem(elem);

  for (let i = 0; i < group.length; i++) {
    if (group[i].classList.contains('selected') && group[i] != elem) {
      group[i].click();
      desel(group[i]);
    }
  }

  desel(elem);

}

function toggleGroup(elem, group) {

  if (elem.classList.contains('selected')) {
    deselGroup(elem, group);
  } else {
    selGroup(elem, group);
  }

}

// if not selected, click elem
function active(elem) {

  elem = getElem(elem);

  if (!elem.classList.contains('selected')) {
    elem.click();
  }

}

// if selected, click elem
function deactive(elem) {

  elem = getElem(elem);

  if (elem.classList.contains('selected')) {
    elem.click();
  }

}

// moves elem to (x, y) pos based on top and left styles
function move(elem, pos) {

  elem = getElem(elem);

  elem.style.left = pos[0];
  elem.style.top = pos[1];

}

// reverts elem to pos 2 if pos 1 is the same as current pos
function toggleMove(elem, p1, p2) {

  elem = getElem(elem);

  if (p1[0] == elem.style.left && p1[1] == elem.style.top) {

    elem.style.left = p2[0];
    elem.style.top = p2[1];

  } else {

    elem.style.left = p1[0];
    elem.style.top = p1[1];

  }

}

// menu functionality

function toggleViewSelector() {

  let elem = getElem('viewSelectorButtonButton');

  elem.innerHTML = elem.innerHTML == '&lt;' ? '&gt;' : '&lt;';

}

// turns an input into a resizing input (using ch measurement)
function fitTextInput(input, minWidth, maxWidth) {

  input.onchange = function() {

    let w = input.innerHTML;

    if (w < minWidth) {
      input.style.width = `${minWidth}ch`;
    } else if (w > maxWidth) {
      input.style.width = `${maxWidth}ch`;
    } else {
      input.style.width = `${w}ch`;
    }

  }
  
}

// updates hex info panel
function updateHexInfo() {

  infoPanelTitle.innerHTML = `Hexagon (${grid.hoverHex.x}, ${grid.hoverHex.y})`;

  // biomes
  infoPanelBio.innerHTML = `<li style="font: 18px var(--header-font);">Biomes:</li>`;

  if (grid.hoverHex.bio.length == 0) {

    let el = document.createElement('li');
    el.classList.add('light');
    el.innerHTML = `None`;

    infoPanelBio.appendChild(el)

  } else {

    grid.hoverHex.bio.sort((a, b) => b - a);
  
    // calculate total bio
    let totalBio = 0;
    for (let i = 0; i < grid.hoverHex.bio.length; i++) {
  
      totalBio += grid.hoverHex.bio[i][1];
  
    }
  
    for (let i = 0; i < grid.hoverHex.bio.length; i++) {
  
      let el = document.createElement('li');
      el.innerHTML = `${Math.round(grid.hoverHex.bio[i][1] * 100)} (${Math.round((grid.hoverHex.bio[i][1] * 100) / totalBio)}%): ${biomes[grid.hoverHex.bio[i][0]].name}`;
  
      infoPanelBio.appendChild(el);
  
    }

  }

  // resources
  infoPanelRes.innerHTML = `<li style="font: 18px var(--header-font);">Resources:</li>`;

  if (grid.hoverHex.res.length == 0) {

    let el = document.createElement('li');
    el.classList.add('light');
    el.innerHTML = `None`;

    infoPanelRes.appendChild(el)

  } else {

    grid.hoverHex.res.sort((a, b) => b - a);

    // calculate total res
    let totalRes = 0;
    for (let i = 0; i < grid.hoverHex.res.length; i++) {

      totalRes += grid.hoverHex.res[i][1];

    }

    for (let i = 0; i < grid.hoverHex.res.length; i++) {

      let el = document.createElement('li');
      el.innerHTML = `${Math.round(grid.hoverHex.res[i][1] * 100)} (${Math.round((grid.hoverHex.res[i][1] * 100) / totalRes)}%): ${resources[grid.hoverHex.res[i][0]].name}`;

      infoPanelRes.appendChild(el);

    }

  }

}
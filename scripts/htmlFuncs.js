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

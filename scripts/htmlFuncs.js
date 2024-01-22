// css var setters

const css_root = document.querySelector(':root');

function css_get(v) {

  return getComputedStyle(css_root).getPropertyValue(v);

}

function css_set(v, prop) {

  css_root.style.setProperty(v, prop);

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

// selects elem, desels all in group
function selGroup(elem, group) {

  for (let i = 0; i < group.length; i++) {
    desel(group[i]);
  }

  sel(elem);

}

// menu functionality

const css_root = document.querySelector(':root');

function css_get(v) {

  return getComputedStyle(css_root).getPropertyValue(v);

}

function css_set(v, prop) {

  css_root.style.setProperty(v, prop);

}

function hide(elem) {
  elem.classList.add('hidden');
  elem.style.opacity = 0;
}

function show(elem) {
  elem.classList.remove('hidden');
  elem.style.opacity = 1;
}

function toggleVis(elem) {
  if (elem.classList.contains('hidden')) {
    show(elem);
  } else {
    hide(elem);
  }
}

function sel(elem) {
  elem.classList.add('selected');
}

function desel(elem) {
  elem.classList.remove('selected');
}

function toggleSel(elem) {
  if (elem.classList.contains('selected')) {
    desel(elem);
  } else {
    sel(elem);
  }
}

// menu functionality

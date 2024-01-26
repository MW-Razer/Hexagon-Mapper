// boolean selector (switch)

function appendSwitch(elem, pos, dim, label, val) {

    elem = getElem(elem);

    let d = document.createElement('div');
    d.classList.add('switchcontainer');

    d.style.top = pos[0];
    d.style.left = pos[1];

    d.style.width = dim[0];
    d.style.height = dim[1];

    let s = document.createElement('div');
    s.classList.add('switch');

    let h = document.createElement('div');
    h.classList.add('handle');

    let hd = document.createElement('div');
    hd.classList.add('handlediv');

    s.appendChild(hd);
    s.appendChild(h);
    d.appendChild(s);
    elem.appendChild(d);

}
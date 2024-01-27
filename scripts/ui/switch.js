// boolean selector (switch)

function appendSwitch(elem, pos, dim, label, val, inputFunc) {

    elem = getElem(elem);

    let d = document.createElement('div');
    d.classList.add('switchcontainer');

    d.style.left = pos[0];
    d.style.top = pos[1];

    d.style.width = dim[0];
    d.style.height = dim[1];

    let s = document.createElement('div');
    s.classList.add('switch');

    let h = document.createElement('div');
    h.classList.add('handle');

    let hd = document.createElement('div');
    hd.classList.add('handlediv');

    let p = document.createElement('p');
    p.classList.add('clickthru');
    p.innerHTML = `${label}`;

    d.onclick = function() {

        let state = false;

        if (s.classList.contains('on')) {

            s.classList.remove('on');

        } else {

            s.classList.add('on');
            
            state = true;

        }

        inputFunc(state);

    }

    if (val === true) {
        d.click();
    }

    s.appendChild(hd);
    s.appendChild(h);
    d.appendChild(p);
    d.appendChild(s);
    elem.appendChild(d);

}
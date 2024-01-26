// dropdown thingies

let openDropdown = null;

function appendDropdown(elem, pos, dim, label, options, inputFunc) {

    elem = getElem(elem);

    let d = document.createElement('div');
    d.classList.add('dropdowncontainer');

    d.style.left = pos[0];
    d.style.top = pos[1];

    d.style.width = dim[0];
    d.style.height = dim[1];

    let underDiv = document.createElement('div');
    underDiv.classList.add('dropdownUnderDiv');

    underDiv.style.width = `100%`;
    underDiv.style.height = `100%`;

    let p = document.createElement('p');
    p.classList.add('clickthru');
    p.innerHTML = `${label}`;

    let b = document.createElement('button');
    b.classList.add('dropdown');

    b.style.width = `200px`;
    b.style.height = `30px`;

    b.innerHTML = `${options[0]}`;

    let od = document.createElement('div');
    od.classList.add('dropdowndiv');
    od.classList.add('closed');

    od.style.width = `200px`;

    for (let i = 0; i < options.length; i++) {

        let o = document.createElement('button');
        o.classList.add('dropdownoption');
        o.innerHTML = `${options[i]}`;

        o.style.top = `${i * 30}px`

        o.onclick = function() {

            b.innerHTML = this.innerHTML;

            od.classList.add('closed');
            openDropdown = null;

        }

        od.appendChild(o);

    }

    underDiv.onclick = function() {

        if (od.classList.contains('closed')) {
            od.classList.remove('closed');
            openDropdown = od;
        } else {
            od.classList.add('closed');
            openDropdown = null;
        }

    }

    b.onclick = function() {

        if (od.classList.contains('closed')) {
            od.classList.remove('closed');
            openDropdown = od;
        } else {
            od.classList.add('closed');
            openDropdown = null;
        }

    }

    b.onchange = function() {

        inputFunc(this);

    }

    d.appendChild(underDiv);
    d.appendChild(p);
    d.appendChild(b);
    d.appendChild(od);
    elem.appendChild(d);

}
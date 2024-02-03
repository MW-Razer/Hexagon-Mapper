// setup num sliders and option sliders

function appendSliderNum(elem, pos, dim, label, range, val, inputFunc) {

    elem = getElem(elem);

    let div = document.createElement('div');
    div.classList.add('slidercontainer');

    div.style.left = pos[0];
    div.style.top = pos[1];

    div.style.width = dim[0];
    div.style.height = dim[1];

    let underDiv = document.createElement('div');
    underDiv.style.width = `100%`;
    underDiv.style.height = `100%`;

    let slider = document.createElement('input');
    slider.type = 'range';
    slider.classList.add('slider');
    slider.min = range[0];
    slider.max = range[1];
    slider.value = val;

    let num = document.createElement('input');
    num.type = 'number';
    num.classList.add('slidernum');
    num.min = range[0];
    num.max = range[1];
    num.value = val;

    let text = document.createElement('p');
    text.classList.add('sliderlabel');
    text.classList.add('clickthru');
    text.innerHTML = `${label}`;

    underDiv.onclick = function() {

        num.select();
        num.focus();

    }

    slider.oninput = function() {

        num.innerHTML = this.value;
        num.value = this.value;

        inputFunc(this);

    }

    num.oninput = function() {

        this.value = this.value == '' ? 0 : parseFloat(this.value);

        if (this.value > parseFloat(this.max)) {
            this.value = this.max;
        } else if (this.value < parseFloat(this.min)) {
            this.value = this.min
        }

        slider.value = this.value;
        this.innerHTML = this.value;

        inputFunc(this);

    }

    div.appendChild(underDiv);
    div.appendChild(text);
    div.appendChild(num);
    div.appendChild(slider);
    elem.appendChild(div);

}

function appendSliderOption(elem, pos, dim, label, options, val, inputFunc) {

    elem = getElem(elem);

    let d = document.createElement('div');
    d.classList.add('dropdowncontainer');

    d.style.left = pos[0];
    d.style.top = pos[1];

    d.style.width = dim[0];
    d.style.height = dim[1];

    let slider = document.createElement('input');
    slider.type = 'range';
    slider.classList.add('slider');
    slider.min = 0;
    slider.max = (options.length - 1);
    slider.value = val;

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

    b.innerHTML = `${options[val]}`;

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

            slider.value = `${i}`;

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

    slider.oninput = function() {

        b.innerHTML = `${options[parseInt(this.value)]}`;

    }

    d.appendChild(underDiv);
    d.appendChild(p);
    d.appendChild(b);
    d.appendChild(od);
    d.appendChild(slider);
    elem.appendChild(d);

}
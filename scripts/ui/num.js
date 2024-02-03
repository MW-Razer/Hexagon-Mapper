// setup number boxes

function appendNum(elem, pos, dim, label, range, val, inputFunc) {

    elem = getElem(elem);

    let div = document.createElement('div');
    div.classList.add('numcontainer');

    div.style.left = pos[0];
    div.style.top = pos[1];

    div.style.width = dim[0];
    div.style.height = dim[1];

    let underDiv = document.createElement('div');
    underDiv.style.width = `100%`;
    underDiv.style.height = `100%`;

    let num = document.createElement('input');
    num.type = 'number';
    num.classList.add('num');
    num.min = range[0];
    num.max = range[1];
    num.value = val;

    let text = document.createElement('p');
    text.classList.add('numlabel');
    text.classList.add('clickthru');
    text.innerHTML = `${label}`;

    underDiv.onclick = function() {

        num.select();
        num.focus();

    }

    num.oninput = function() {

        this.value = this.value == '' ? 0 : parseFloat(this.value);

        if (this.value > parseFloat(this.max)) {
            this.value = this.max;
        } else if (this.value < parseFloat(this.min)) {
            this.value = this.min
        }

        this.innerHTML = this.value;

        inputFunc(this);

    }

    div.appendChild(underDiv);
    div.appendChild(text);
    div.appendChild(num);
    elem.appendChild(div);

}
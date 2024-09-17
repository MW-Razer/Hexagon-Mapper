// setup number boxes

function appendNum(elem, pos, dim, label, range, val, inputFunc, rightText = false, minPos = null, minDim = null, inputSize = null) {

    elem = getElem(elem);

    let div = document.createElement('div');
    div.classList.add('numcontainer');

    if (minPos != null) {

        div.style.left = `max(${pos[0]}, ${minPos[0]})`;
        div.style.top = `max(${pos[1]}, ${minPos[1]})`;

    } else {

        div.style.left = pos[0];
        div.style.top = pos[1];

    }

    div.style.width = dim[0];
    div.style.height = dim[1];

    if (minDim != null) {

        div.style.minWidth = minDim[0];
        div.style.minHeight = minDim[1];

    }

    let underDiv = document.createElement('div');
    underDiv.style.width = `100%`;
    underDiv.style.height = `100%`;

    let num = document.createElement('input');
    num.type = 'number';
    num.classList.add('num');
    num.min = range[0];
    num.max = range[1];
    num.value = val;

    if (inputSize != null) {
        num.style.width = inputSize[0];
        num.style.height = inputSize[1];
    }

    let text = document.createElement('p');
    text.classList.add('numlabel');
    text.classList.add('clickthru');
    text.innerHTML = `${label}`;

    if (rightText === true) {

        text.style.right = 'calc(5% + 115px)';

    } else {

        text.style.left = '5%';

    }

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
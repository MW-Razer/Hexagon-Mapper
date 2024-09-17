// setup color picker thingy

function appendColor(elem, pos, dim, label, val, inputFunc, rightText = false, minPos = null, minDim = null, inputSize = null) {

    elem = getElem(elem);

    let div = document.createElement('div');
    div.classList.add('colorcontainer');

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

    let color = document.createElement('input');
    color.type = 'color';
    color.classList.add('color');
    color.value = val;

    color.id = `${label}input`;

    if (inputSize != null) {
        color.style.width = inputSize[0];
        color.style.height = inputSize[1];
    }

    let text = document.createElement('p');
    text.classList.add('colorlabel');
    text.classList.add('clickthru');
    text.innerHTML = `${label}`;

    if (rightText === true) {

        if (minDim != null) {
            text.style.right = `calc(5% + ${minDim[0] + 15}px)`;
        } else {
            text.style.right = 'calc(5% + 115px)';
        }

    } else {

        text.style.left = '5%';

    }

    underDiv.onclick = function() {

        color.select();
        color.focus();

        inputFunc(color);

    }

    color.oninput = function() {

        inputFunc(this);

    }

    color.onclick = function() {

        inputFunc(this);

    }

    div.appendChild(underDiv);
    div.appendChild(text);
    div.appendChild(color);
    elem.appendChild(div);

}
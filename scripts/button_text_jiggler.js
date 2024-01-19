// jiggle the text inside buttons
// buttons with jiggly text MUST be placed inside a same-size container

const letterDelay = 150;
const restartDelay = 800;

const buttons = document.getElementsByClassName("jigglebutton");

let jiggler = null;
let jigglerDelay = null;
let jiggling = false;

const jiggleFunc = (elem) => {

    jiggling = true;

    let counter = 0;

    jiggler = setInterval(() => {

        let spans = elem.children;

        for (let i = 0; i < spans.length; i++) {

            if (i == counter) {
                spans[i].classList.add('jiggle');
            } else {
                spans[i].classList.remove('jiggle');
            }
        
        }

        counter++;

        if (counter > spans.length) {

            if (jiggling) {
                jigglerDelay = setTimeout(() => {
                    jiggleFunc(elem);
                }, restartDelay);
            }

            clearInterval(jiggler);

        }

    }, letterDelay);

};

const clearJiggle = (elem) => {

    clearTimeout(jigglerDelay);

    jiggling = false;

    clearInterval(jiggler);

    let spans = elem.children;

    for (let i = 0; i < spans.length; i++) {

        spans[i].classList.remove('jiggle');

    }

};

for (let i = 0; i < buttons.length; i++) {

    let inner = buttons[i].innerHTML;

    buttons[i].innerHTML = ``;

    for (let k = 0; k < inner.length; k++) {

        let s = document.createElement('span');
        s.classList.add('jigglespan');

        s.innerHTML = inner[k];

        buttons[i].appendChild(s);

    }

    buttons[i].parentElement.addEventListener('mouseenter', (e) => {

        jiggleFunc(e.target.children[1]);

    });

    buttons[i].parentElement.addEventListener('mouseleave', (e) => {

        clearJiggle(e.target.children[1]);

    });

}

// ensure it goes away (the mouse leave event doesnt like working correctly)
addEventListener('mousemove', (e) => {
    
    if (!e.target.classList.contains('mechcontainer') && !e.target.classList.contains('jigglebutton') && !e.target.classList.contains('jigglediv') && !e.target.classList.contains('jigglespan')) {
        let newButtons = document.getElementsByClassName('jigglebutton');
        for (let i = 0; i < newButtons.length; i++) {
            clearJiggle(newButtons[i]);
        }
    }

});
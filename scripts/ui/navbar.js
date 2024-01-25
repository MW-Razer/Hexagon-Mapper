// setup navbars in panels

function appendNavbar(navbar, tabHeight, options = []) {

    navbar = getElem(navbar);

    let div = navbar.parentElement;

    let d = document.createElement('div');

    d.style.width = `${100 / options.length}%`;

    d.id = `${navbar.id}Underline`;

    navbar.appendChild(d);

    for (let i = 0; i < options.length; i++) {

        let b = document.createElement('button');

        b.style.width = `${100 / options.length}%`;
        b.style.left = `${(i * 100) / options.length}%`;

        b.innerHTML = options[i];

        b.onclick = function() {

            selGroup(this, this.parentElement.children);

            document.getElementById(`${navbar.id}Underline`).style.left = this.style.left;

            showGroup(document.getElementById(`${div.id}${this.innerHTML}`), `${div.id}Tab`);

        }

        navbar.appendChild(b);

        /*
        let t = document.createElement('div');
        t.classList.add('panel');
        t.classList.add('hidden');

        t.classList.add(`${div.id}Tab`);

        t.style.top = `45px`;
        t.style.width = div.style.width;
        t.style.height = tabHeight;

        t.id = `${div.id}${b.innerHTML}`;

        navbar.appendChild(t);
        */
        
        if (i == 0) {
            b.classList.add('selected');
        }

    }

}

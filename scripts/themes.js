// setup themes and shit

// returns array that conrains the value from an array of arrays 
function findContainer(arr, val, searchInsideString = false) {

    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].length; k++) {
            if (!searchInsideString) {
                if (arr[i][k] == val) {
                    return arr[i];
                }
            } else {
                if (arr[i][k].includes(val)) {
                    return arr[i];
                }
            }
        }
    }

    return null;

}

let themes = [];

class Theme {
    constructor(name = '', id = '', vars = []) { // vars contains arrays with the var name, style name (in js), and var value

        this.name = name;
        this.id = id;
        this.vars = vars;

        // create new mechanical button for the custom theme
        const bc = document.createElement('div');
        bc.classList.add('mechcontainer');
        bc.id = `${this.id}_container`;

        const d = document.createElement('div');
        d.classList.add('jigglediv');
        d.id = `${this.id}_div`;

        const b = document.createElement('button');
        b.classList.add('jigglebutton');
        b.id = `${this.id}_button`;

        // style this button according to its own styleset
        const s = document.createElement('style');

        bc.style.width = `90%`;
        bc.style.height = `50px`;
        bc.style.left = `5%`;
        bc.style.top = `${10 + 60 * themes.length}px`;

        s.innerHTML = `
        #${this.id}_container {\n
            cursor: var(--cursor-pointer);\n
            border-radius: ${findContainer(vars, '--mech-border-radius', true)[1]};\n
        }\n
        #${this.id}_button {\n
            position: absolute;\n
            cursor: var(--cursor-pointer);\n
            user-select: none;\n
            top: 10%;\n
            left: 0px;\n
            width: 100%;\n
            height: 90%;\n
            font: 16px ${findContainer(vars, '--header-font', true)[1]};\n
            border-radius: ${findContainer(vars, '--mech-border-radius', true)[1]};\n
            border: 1px solid ${findContainer(vars, '--mech-border-color', true)[1]};\n
            background-color: ${findContainer(vars, '--mech-color', true)[1]};\n
            color: ${findContainer(vars, '--mech-font-color', true)[1]};\n
            transition: top 0.1s ease-out, background-color 0.1s ease-out, color 0.05s ease-out;\n
        }\n
        #${this.id}_div {\n
            position: absolute;\n
            cursor: var(--cursor-pointer);\n
            top: 20%;\n
            left: 0px;\n
            width: calc(100% - 2px);\n
            height: 90%;\n
            border-radius: ${findContainer(vars, '--mech-border-radius', true)[1]};\n
            border: 1px solid ${findContainer(vars, '--mech-div-border-color', true)[1]};\n
            background-color: ${findContainer(vars, '--mech-div-color', true)[1]};\n
            transition: background-color 0.1s ease-out;\n
        }\n
        #${this.id}_container:hover button {\n
            background-color: ${findContainer(vars, '--mech-color-hover', true)[1]};\n
            top: 0%;\n
            transition: top 0.1s ease-out, background-color 0.1s ease-out;\n
        }\n
        #${this.id}_container:hover div {\n
            background-color: ${findContainer(vars, '--mech-div-color-hover', true)[1]};\n
            transition: background-color 0.1s ease-out;\n
        }\n
        #${this.id}_container:active button {\n
            background-color: ${findContainer(vars, '--mech-color-active', true)[1]};\n
            color: ${findContainer(vars, '--mech-font-color-active', true)[1]};\n
            top: 15%;\n
            transition: top 0.05s ease-out, background-color 0.05s ease-out;\n
        }\n
        #${this.id}_container:active div {\n
            background-color: ${findContainer(vars, '--mech-div-color-active', true)[1]};\n
            transition: background-color 0.05s ease-out;\n
        }\n
        #${this.id}_container.selected button {\n
            background-color: ${findContainer(vars, '--mech-color-sel', true)[1]};\n
            color: ${findContainer(vars, '--mech-font-color-sel', true)[1]};\n
            border-color: ${findContainer(vars, '--mech-border-color-sel', true)[1]};\n
            top: 15%;\n
            transition: top 0.1s ease-out, background-color 0.1s ease-out;\n
        }\n
        #${this.id}_container.selected div {\n
            background-color: ${findContainer(vars, '--mech-div-color-sel', true)[1]};\n
            border-color: ${findContainer(vars, '--mech-div-border-color-sel', true)[1]};\n
            transition: background-color 0.1s ease-out;\n
        }\n
        #${this.id}_container.selected:hover button {\n
            background-color: ${findContainer(vars, '--mech-color-hover-sel', true)[1]};\n
            top: 12.5%;\n
            transition: top 0.1s ease-out, background-color 0.1s ease-out;\n
        }\n
        #${this.id}_container.selected:hover div {\n
            background-color: ${findContainer(vars, '--mech-div-color-hover-sel', true)[1]};\n
            transition: background-color 0.1s ease-out;\n
        }\n
        #${this.id}_container.selected:active button {\n
            background-color: ${findContainer(vars, '--mech-color-active-sel', true)[1]};\n
            color: ${findContainer(vars, '--mech-font-color-active-sel', true)[1]};\n
            top: 17.5%;\n
            transition: top 0.05s ease-out, background-color 0.05s ease-out;\n
        }\n
        #${this.id}_container.selected:active div {\n
            background-color: ${findContainer(vars, '--mech-div-color-active-sel', true)[1]};\n
            transition: background-color 0.05s ease-out;\n
        }\n
        `;

        let themeCount = themes.length;

        bc.onclick = function() {

            selGroup(this, document.getElementById('themesDiv').children);

            themes[themeCount].set();

        };

        b.innerHTML = `${name}`;

        document.getElementById('themesDiv').appendChild(s);
        bc.appendChild(d);
        bc.appendChild(b);
        document.getElementById('themesDiv').appendChild(bc);

        addJiggle(b);

        themes.push(this);

    }

    set() {

        for (let i = 0; i < this.vars.length; i++) {

            css_set(this.vars[i][0], this.vars[i][1]);

        }

    }

}



const cool_light = new Theme('Cool Light', 'cool_light', [
    // background
    ['--background-color', 'rgb(240, 240, 240)'],
    ['--title-font', 'Geo'],
    ['--header-font', 'Josefin'],
    ['--text-font', 'Lato'],
    // mechanical buttons
    ['--mech-color', 'rgb(240, 240, 240)'],
    ['--mech-div-color', 'rgb(200, 200, 200)'],
    ['--mech-color-hover', 'rgb(190, 220, 240)'],
    ['--mech-div-color-hover', 'rgb(120, 190, 230)'],
    ['--mech-color-active', 'rgb(50, 150, 200)'],
    ['--mech-div-color-active', 'rgb(0, 75, 150)'],
	['--mech-border-color', 'rgb(10, 10, 10)'],
	['--mech-div-border-color', 'rgb(50, 50, 50)'],
    ['--mech-font-color', 'rgb(0, 0, 0)'],
    ['--mech-font-color-active', 'rgb(255, 255, 255)'],
    ['--mech-color-sel', 'rgb(50, 150, 200)'],
    ['--mech-div-color-sel', 'rgb(0, 75, 150)'],
    ['--mech-color-hover-sel', 'rgb(70, 170, 220)'],
    ['--mech-div-color-hover-sel', 'rgb(20, 95, 170)'],
    ['--mech-color-active-sel', 'rgb(30, 130, 180)'],
    ['--mech-div-color-active-sel', 'rgb(0, 50, 130)'],
	['--mech-border-color-sel', 'rgb(10, 10, 10)'],
	['--mech-div-border-color-sel', 'rgb(50, 50, 50)'],
    ['--mech-font-color-sel', 'rgb(255, 255, 255)'],
    ['--mech-font-color-active-sel', 'rgb(255, 255, 255)'],
	['--mech-border-radius', '20px 5px 20px 5px'],
    // panels
    ['--panel-color', 'rgb(240, 240, 240)'],
    ['--panel-shadow', '1px 3px 2px rgba(0, 0, 0, 0.5)'],
    ['--panel-border-color', 'rgb(10, 10, 10)'],
    ['--panel-border-radius', '10px 10px 10px 10px']
]);

document.getElementById('cool_light_container').click();

const cool_dark = new Theme('Cool Dark', 'cool_dark', [
    // background
    ['--background-color', 'rgb(10, 10, 10)'],
    ['--title-font', 'Geo'],
    ['--header-font', 'Josefin'],
    ['--text-font', 'Lato'],
    // mechanical buttons
    ['--mech-color', 'rgb(40, 40, 60)'],
    ['--mech-div-color', 'rgb(20, 20, 40)'],
    ['--mech-color-hover', 'rgb(30, 30, 90)'],
    ['--mech-div-color-hover', 'rgb(15, 15, 50)'],
    ['--mech-color-active', 'rgb(50, 50, 150)'],
    ['--mech-div-color-active', 'rgb(20, 20, 120)'],
	['--mech-border-color', 'rgb(210, 210, 210)'],
	['--mech-div-border-color', 'rgb(150, 150, 150)'],
    ['--mech-font-color', 'rgb(255, 255, 255)'],
    ['--mech-font-color-active', 'rgb(255, 255, 255)'],
    ['--mech-color-sel', 'rgb(50, 50, 150)'],
    ['--mech-div-color-sel', 'rgb(20, 20, 120)'],
    ['--mech-color-hover-sel', 'rgb(70, 70, 170)'],
    ['--mech-div-color-hover-sel', 'rgb(40, 40, 140)'],
    ['--mech-color-active-sel', 'rgb(30, 30, 130)'],
    ['--mech-div-color-active-sel', 'rgb(0, 0, 100)'],
	['--mech-border-color-sel', 'rgb(210, 210, 210)'],
	['--mech-div-border-color-sel', 'rgb(150, 150, 150)'],
    ['--mech-font-color-sel', 'rgb(255, 255, 255)'],
    ['--mech-font-color-active-sel', 'rgb(255, 255, 255)'],
	['--mech-border-radius', '20px 5px 20px 5px'],
    // panels
    ['--panel-color', 'rgb(30, 30, 30)'],
    ['--panel-shadow', '1px 3px 2px rgba(0, 0, 0, 0.5)'],
    ['--panel-border-color', 'rgb(210, 210, 210)'],
    ['--panel-border-radius', '10px 10px 10px 10px']
]);

const matrix = new Theme('Matrix', 'matrix', [
    // background
    ['--background-color', 'rgb(0, 0, 0)'],
    ['--title-font', 'Geo'],
    ['--header-font', 'Courier'],
    ['--text-font', 'Lato'],
    // mechanical buttons
    ['--mech-color', 'rgb(10, 15, 10)'],
    ['--mech-div-color', 'rgb(5, 10, 5)'],
    ['--mech-color-hover', 'rgb(10, 90, 10)'],
    ['--mech-div-color-hover', 'rgb(5, 60, 5)'],
    ['--mech-color-active', 'rgb(40, 180, 40)'],
    ['--mech-div-color-active', 'rgb(20, 120, 20)'],
	['--mech-border-color', 'rgb(10, 220, 10)'],
	['--mech-div-border-color', 'rgb(10, 150, 10)'],
    ['--mech-font-color', 'rgb(40, 250, 40)'],
    ['--mech-font-color-active', 'rgb(0, 0, 0)'],
    ['--mech-color-sel', 'rgb(40, 180, 40)'],
    ['--mech-div-color-sel', 'rgb(20, 120, 20)'],
    ['--mech-color-hover-sel', 'rgb(50, 200, 50)'],
    ['--mech-div-color-hover-sel', 'rgb(30, 140, 30)'],
    ['--mech-color-active-sel', 'rgb(30, 160, 30)'],
    ['--mech-div-color-active-sel', 'rgb(10, 100, 10)'],
	['--mech-border-color-sel', 'rgb(40, 180, 40)'],
	['--mech-div-border-color-sel', 'rgb(20, 120, 20)'],
    ['--mech-font-color-sel', 'rgb(0, 0, 0)'],
    ['--mech-font-color-active-sel', 'rgb(0, 0, 0)'],
	['--mech-border-radius', '5px 5px 5px 5px'],
    // panels
    ['--panel-color', 'rgb(5, 10, 5)'],
    ['--panel-shadow', '1px 3px 2px rgba(10, 200, 10, 0.5)'],
    ['--panel-border-color', 'rgb(10, 210, 10)'],
    ['--panel-border-radius', '10px 10px 10px 10px']
]);
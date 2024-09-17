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
            background: ${findContainer(vars, '--mech-color', true)[1]};\n
            background-size: 101% 100%;\n
            color: ${findContainer(vars, '--mech-font-color', true)[1]};\n
            transition: top 0.1s ease-out, background-color 0.1s ease-out, background-image 0.1s ease-out, color 0.05s ease-out;\n
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
            background: ${findContainer(vars, '--mech-div-color', true)[1]};\n
            background-size: 101% 100%;\n
            transition: background-color 0.1s ease-out, background-image 0.1s ease-out;\n
        }\n
        #${this.id}_container:hover button {\n
            background: ${findContainer(vars, '--mech-color-hover', true)[1]};\n
            background-size: 101% 100%;\n
            top: 0%;\n
            transition: top 0.1s ease-out, background-color 0.1s ease-out, background-image 0.1s ease-out;\n
        }\n
        #${this.id}_container:hover div {\n
            background: ${findContainer(vars, '--mech-div-color-hover', true)[1]};\n
            background-size: 101% 100%;\n
            transition: background-color 0.1s ease-out, background-image 0.1s ease-out;\n
        }\n
        #${this.id}_container:active button {\n
            background: ${findContainer(vars, '--mech-color-active', true)[1]};\n
            background-size: 101% 100%;\n
            color: ${findContainer(vars, '--mech-font-color-active', true)[1]};\n
            top: 15%;\n
            transition: top 0.05s ease-out, background-color 0.05s ease-out, background-image 0.05s ease-out;\n
        }\n
        #${this.id}_container:active div {\n
            background: ${findContainer(vars, '--mech-div-color-active', true)[1]};\n
            background-size: 101% 100%;\n
            transition: background-color 0.05s ease-out, background-image 0.05s ease-out;\n
        }\n
        #${this.id}_container.selected button {\n
            background: ${findContainer(vars, '--mech-color-sel', true)[1]};\n
            background-size: 101% 100%;\n
            color: ${findContainer(vars, '--mech-font-color-sel', true)[1]};\n
            border-color: ${findContainer(vars, '--mech-border-color-sel', true)[1]};\n
            top: 15%;\n
            transition: top 0.1s ease-out, background-color 0.1s ease-out, background-image 0.1s ease-out;\n
        }\n
        #${this.id}_container.selected div {\n
            background: ${findContainer(vars, '--mech-div-color-sel', true)[1]};\n
            background-size: 101% 100%;\n
            border-color: ${findContainer(vars, '--mech-div-border-color-sel', true)[1]};\n
            transition: background-color 0.1s ease-out, background-image 0.1s ease-out;\n
        }\n
        #${this.id}_container.selected:hover button {\n
            background: ${findContainer(vars, '--mech-color-hover-sel', true)[1]};\n
            background-size: 101% 100%;\n
            top: 12.5%;\n
            transition: top 0.1s ease-out, background-color 0.1s ease-out, background-image 0.1s ease-out;\n
        }\n
        #${this.id}_container.selected:hover div {\n
            background: ${findContainer(vars, '--mech-div-color-hover-sel', true)[1]};\n
            background-size: 101% 100%;\n
            transition: background-color 0.1s ease-out, background-image 0.1s ease-out;\n
        }\n
        #${this.id}_container.selected:active button {\n
            background: ${findContainer(vars, '--mech-color-active-sel', true)[1]};\n
            background-size: 101% 100%;\n
            color: ${findContainer(vars, '--mech-font-color-active-sel', true)[1]};\n
            top: 17.5%;\n
            transition: top 0.05s ease-out, background-color 0.05s ease-out, background-image 0.05s ease-out;\n
        }\n
        #${this.id}_container.selected:active div {\n
            background: ${findContainer(vars, '--mech-div-color-active-sel', true)[1]};\n
            background-size: 101% 100%;\n
            transition: background-color 0.05s ease-out, background-image 0.05s ease-out;\n
        }\n
        `;

        let themeCount = themes.length;

        bc.onclick = function() {

            selGroup(this, document.getElementById('themesDiv').children);

            themes[themeCount].set();

            localStorage.setItem('theme', id);

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
    ['--text-color', 'rgb(0, 0, 0)'],
    ['--text-color-light', 'rgb(50, 50, 50)'],
    // backgrounds for compound ui elems
    ['--compound-background-color', 'rgb(240, 240, 240)'],
    ['--compound-background-color-hover', 'rgb(230, 230, 230)'],
    ['--compound-background-color-active', 'rgb(220, 220, 220)'],
    // images / icons
    ['--icon-filter', 'saturate(0%) brightness(3.0)'],
    // scrollbars
    ['--scrollbar-color', 'rgb(200, 200, 200)'],
    ['--scrollbar-border-radius', '0px 10px 10px 0px'],
    ['--scrollbar-thumb-color', 'rgb(150, 150, 150)'],
    ['--scrollbar-thumb-color-hover', 'rgb(100, 120, 140)'],
    ['--scrollbar-thumb-color-active', 'rgb(70, 90, 120)'],
    ['--scrollbar-thumb-border-radius', '5px 5px 5px 5px'],
    // inputs
    ['--input-border-radius', '10px 10px 10px 10px'],
    ['--input-border-color', 'rgb(10, 10, 10)'],
    ['--input-color', 'rgb(240, 240, 240)'],
    ['--input-color-hover', 'rgb(190, 220, 240)'],
    ['--input-color-active', 'rgb(150, 200, 240)'],
    ['--input-font-color-active', 'rgb(0, 0, 0)'],
    // buttons
    ['--button-border-radius', '10px 10px 10px 10px'],
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
    ['--panel-color-hover', 'rgb(210, 210, 210)'],
    ['--panel-color-active', 'rgb(120, 170, 220)'],
    ['--panel-color-sel', 'rgb(150, 200, 250)'],
    ['--panel-color-hover-sel', 'rgb(100, 170, 250)'],
    ['--panel-color-active-sel',  'rgb(80, 140, 250)'],
    ['--panel-shadow', '1px 3px 2px rgba(0, 0, 0, 0.5)'],
    ['--panel-border-color', 'rgb(10, 10, 10)'],
    ['--panel-border-color-sel', 'rgb(10, 10, 80)'],
    ['--panel-border-radius', '10px 10px 10px 10px'],
    ['--panel-color-transparent', 'rgba(240, 240, 240, 0.5)'],
    // tabs
    ['--navbar-color', 'rgb(230, 230, 230)'],
    ['--navbar-border-radius', '10px 10px 0px 0px'],
    ['--navbar-underline-color', 'rgb(50, 150, 200)'],
    ['--navbar-underline-border-radius', '0px 0px 10px 10px'],
    ['--navbar-tab-color', 'rgb(230, 230, 230)'],
    ['--navbar-tab-color-hover', 'rgb(180, 220, 240)'],
    ['--navbar-tab-color-active', 'rgb(160, 200, 240)'],
    ['--navbar-tab-color-sel', 'rgb(160, 200, 240)'],
    ['--navbar-tab-color-hover-sel', 'rgb(170, 210, 250)'],
    ['--navbar-tab-color-active-sel', 'rgb(150, 190, 230)'],
    ['--navbar-tab-border', '1px solid rgb(200, 200, 200)'],
    ['--navbar-tab-font-color', 'rgb(0, 0, 0)'],
    ['--navbar-tab-font-color-sel', 'rgb(0, 0, 0)'],
    // sliders
    ['--slider-color', 'rgb(200, 200, 200)'],
    ['--slider-color-hover', 'rgb(180, 180, 180)'],
    ['--slider-border-color', 'rgb(200, 200, 200)'],
    ['--slider-border-color-hover', 'rgb(200, 200, 200)'],
    ['--slider-border-radius', '5px 5px 5px 5px'],
    ['--slider-handle-color', 'rgb(220, 220, 220)'],
    ['--slider-handle-border-color', 'rgb(40, 40, 40)'],
    ['--slider-handle-color-hover', 'rgb(230, 230, 230)'],
    ['--slider-handle-color-active', 'rgb(210, 210, 210)'],
    ['--slider-handle-border-color-active', 'rgb(10, 10, 10)'],
    ['--slider-handle-border-radius', '12.5px 12.5px 12.5px 12.5px'],
    // switches
    ['--switch-color', 'rgb(180, 180, 180)'],
    ['--switch-color-on', 'rgb(90, 160, 240)'],
    ['--switch-border-color', 'rgb(120, 120, 120)'],
    ['--switch-handle-border-radius', '5px 5px 5px 5px'],
    ['--switch-handle-color', 'rgb(250, 250, 250)'],
    ['--switch-handle-border-color', 'rgb(250, 250, 250)'],
    ['--switch-handle-color-on', 'rgb(250, 250, 250)'],
    ['--switch-handle-border-color-on', 'rgb(250, 250, 250)'],
    ['--switch-handle-div-color', 'rgb(210, 210, 210)'],
    ['--switch-handle-div-border-color', 'rgb(210, 210, 210)'],
    ['--switch-handle-div-color-on', 'rgb(210, 210, 210)'],
    ['--switch-handle-div-border-color-on', 'rgb(210, 210, 210)']
    
]);

const cool_dark = new Theme('Cool Dark', 'cool_dark', [
    // background
    ['--background-color', 'rgb(10, 10, 10)'],
    ['--title-font', 'Geo'],
    ['--header-font', 'Josefin'],
    ['--text-font', 'Lato'],
    ['--text-color', 'rgb(255, 255, 255)'],
    ['--text-color-light', 'rgb(200, 200, 200)'],
    // backgrounds for compound ui elems
    ['--compound-background-color', 'rgb(30, 30, 30)'],
    ['--compound-background-color-hover', 'rgb(30, 30, 40)'],
    ['--compound-background-color-active', 'rgb(30, 30, 60)'],
    // images / icons
    ['--icon-filter', 'hue-rotate(240deg) saturate(5%) brightness(4.0)'],
    // scrollbars
    ['--scrollbar-color', 'rgb(80, 80, 80)'],
    ['--scrollbar-border-radius', '0px 10px 10px 0px'],
    ['--scrollbar-thumb-color', 'rgb(130, 130, 130)'],
    ['--scrollbar-thumb-color-hover', 'rgb(150, 160, 180)'],
    ['--scrollbar-thumb-color-active', 'rgb(100, 120, 180)'],
    ['--scrollbar-thumb-border-radius', '5px 5px 5px 5px'],
    // inputs
    ['--input-border-radius', '10px 10px 10px 10px'],
    ['--input-border-color', 'rgb(210, 210, 210)'],
    ['--input-color', 'rgb(40, 40, 40)'],
    ['--input-color-hover', 'rgb(40, 40, 60)'],
    ['--input-color-active', 'rgb(40, 40, 90)'],
    ['--input-font-color-active', 'rgb(255, 255, 255)'],
    // buttons
    ['--button-border-radius', '10px 10px 10px 10px'],
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
    ['--panel-color-hover', 'rgb(60, 60, 60)'],
    ['--panel-color-active', 'rgb(50, 50, 100)'],
    ['--panel-color-sel', 'rgb(50, 50, 110)'],
    ['--panel-color-hover-sel', 'rgb(70, 70, 130)'],
    ['--panel-color-active-sel',  'rgb(40, 40, 80)'],
    ['--panel-shadow', '1px 3px 2px rgba(0, 0, 0, 0.5)'],
    ['--panel-border-color', 'rgb(210, 210, 210)'],
    ['--panel-border-color-sel', 'rgb(200, 200, 250)'],
    ['--panel-border-radius', '10px 10px 10px 10px'],
    ['--panel-color-transparent', 'rgba(30, 30, 30, 0.5)'],
    // tabs
    ['--navbar-color', 'rgb(40, 40, 40)'],
    ['--navbar-border-radius', '10px 10px 0px 0px'],
    ['--navbar-underline-color', 'rgb(20, 60, 220)'],
    ['--navbar-underline-border-radius', '0px 0px 10px 10px'],
    ['--navbar-tab-color', 'rgb(40, 40, 40)'],
    ['--navbar-tab-color-hover', 'rgb(30, 30, 60)'],
    ['--navbar-tab-color-active', 'rgb(50, 50, 110)'],
    ['--navbar-tab-color-sel', 'rgb(50, 50, 110)'],
    ['--navbar-tab-color-hover-sel', 'rgb(60, 60, 120)'],
    ['--navbar-tab-color-active-sel', 'rgb(40, 40, 100)'],
    ['--navbar-tab-border', '1px solid rgb(60, 60, 60)'],
    ['--navbar-tab-font-color', 'rgb(255, 255, 255)'],
    ['--navbar-tab-font-color-sel', 'rgb(255, 255, 255)'],
    // sliders
    ['--slider-color', 'rgb(70, 70, 70)'],
    ['--slider-color-hover', 'rgb(70, 70, 100)'],
    ['--slider-border-color', 'rgb(70, 70, 70)'],
    ['--slider-border-color-hover', 'rgb(70, 70, 100)'],
    ['--slider-border-radius', '5px 5px 5px 5px'],
    ['--slider-handle-color', 'rgb(250, 250, 250)'],
    ['--slider-handle-border-color', 'rgb(250, 250, 250)'],
    ['--slider-handle-color-hover', 'rgb(230, 230, 230)'],
    ['--slider-handle-color-active', 'rgb(210, 210, 210)'],
    ['--slider-handle-border-color-active', 'rgb(210, 210, 210)'],
    ['--slider-handle-border-radius', '12.5px 12.5px 12.5px 12.5px'],
    // switches
    ['--switch-color', 'rgb(50, 50, 50)'],
    ['--switch-color-on', 'rgb(60, 80, 200)'],
    ['--switch-border-color', 'rgb(180, 180, 180)'],
    ['--switch-handle-border-radius', '5px 5px 5px 5px'],
    ['--switch-handle-color', 'rgb(250, 250, 250)'],
    ['--switch-handle-border-color', 'rgb(250, 250, 250)'],
    ['--switch-handle-color-on', 'rgb(250, 250, 250)'],
    ['--switch-handle-border-color-on', 'rgb(250, 250, 250)'],
    ['--switch-handle-div-color', 'rgb(210, 210, 210)'],
    ['--switch-handle-div-border-color', 'rgb(210, 210, 210)'],
    ['--switch-handle-div-color-on', 'rgb(210, 210, 210)'],
    ['--switch-handle-div-border-color-on', 'rgb(210, 210, 210)']
]);

const matrix = new Theme('Matrix', 'matrix', [
    // background
    ['--background-color', 'rgb(0, 0, 0)'],
    ['--title-font', 'Geo'],
    ['--header-font', 'Courier'],
    ['--text-font', 'Lato'],
    ['--text-color', 'rgb(10, 240, 10)'],
    ['--text-color-light', 'rgb(70, 250, 70)'],
    // backgrounds for compound ui elems
    ['--compound-background-color', 'rgb(5, 10, 5)'],
    ['--compound-background-color-hover', 'rgb(5, 20, 5)'],
    ['--compound-background-color-active', 'rgb(10, 30, 10)'],
    // images / icons
    ['--icon-filter', 'hue-rotate(135deg) brightness(5.0)'],
    // scrollbars
    ['--scrollbar-color', 'rgb(20, 30, 20)'],
    ['--scrollbar-border-radius', '0px 5px 5px 0px'],
    ['--scrollbar-thumb-color', 'rgb(40, 160, 40)'],
    ['--scrollbar-thumb-color-hover', 'rgb(60, 190, 60)'],
    ['--scrollbar-thumb-color-active', 'rgb(50, 130, 50)'],
    ['--scrollbar-thumb-border-radius', '2px 2px 2px 2px'],
    // inputs
    ['--input-border-radius', '5px 5px 5px 5px'],
    ['--input-border-color', 'rgb(10, 220, 10)'],
    ['--input-color', 'rgb(5, 10, 5)'],
    ['--input-color-hover', 'rgb(10, 15, 10)'],
    ['--input-color-active', 'rgb(20, 40, 20)'],
    ['--input-font-color-active', 'rgb(70, 250, 70)'],
    // buttons
    ['--button-border-radius', '5px 5px 5px 5px'],
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
    ['--panel-color-hover', 'rgb(10, 20, 10)'],
    ['--panel-color-active', 'rgb(10, 60, 10)'],
    ['--panel-color-sel', 'rgb(5, 30, 5)'],
    ['--panel-color-hover-sel', 'rgb(15, 45, 15)'],
    ['--panel-color-active-sel',  'rgb(0, 60, 0)'],
    ['--panel-shadow', '1px 3px 2px rgba(10, 200, 10, 0.5)'],
    ['--panel-border-color', 'rgb(10, 210, 10)'],
    ['--panel-border-color-sel', 'rgb(5, 250, 5)'],
    ['--panel-border-radius', '5px 5px 5px 5px'],
    ['--panel-color-transparent', 'rgba(5, 10, 5, 0.5)'],
    // tabs
    ['--navbar-color', 'rgb(10, 15, 10)'],
    ['--navbar-border-radius', '5px 5px 0px 0px'],
    ['--navbar-underline-color', 'rgb(10, 250, 10)'],
    ['--navbar-underline-border-radius', '0px 0px 0px 0px'],
    ['--navbar-tab-color', 'rgb(10, 20, 10)'],
    ['--navbar-tab-color-hover', 'rgb(10, 60, 10)'],
    ['--navbar-tab-color-active', 'rgb(20, 120, 20)'],
    ['--navbar-tab-color-sel', 'rgb(20, 200, 20)'],
    ['--navbar-tab-color-hover-sel', 'rgb(30, 210, 30)'],
    ['--navbar-tab-color-active-sel', 'rgb(10, 180, 10)'],
    ['--navbar-tab-border', '1px solid rgb(50, 220, 50)'],
    ['--navbar-tab-font-color', 'rgb(20, 200, 20)'],
    ['--navbar-tab-font-color-sel', 'rgb(0, 0, 0)'],
    // sliders
    ['--slider-color', 'rgb(5, 10, 5)'],
    ['--slider-color-hover', 'rgb(5, 10, 5)'],
    ['--slider-border-color', 'rgb(20, 150, 20)'],
    ['--slider-border-color-hover', 'rgb(30, 170, 30)'],
    ['--slider-border-radius', '2px 2px 2px 2px'],
    ['--slider-handle-color', 'rgb(10, 20, 10)'],
    ['--slider-handle-border-color', 'rgb(20, 150, 20)'],
    ['--slider-handle-color-hover', 'rgb(20, 40, 20)'],
    ['--slider-handle-color-active', 'rgb(30, 170, 30)'],
    ['--slider-handle-border-color-active', 'rgb(40, 180, 40)'],
    ['--slider-handle-border-radius', '5px 5px 5px 5px'],
    // switches
    ['--switch-color', 'rgb(20, 25, 20)'],
    ['--switch-color-on', 'rgb(20, 80, 20)'],
    ['--switch-border-color', 'rgb(60, 180, 60)'],
    ['--switch-handle-border-radius', '2px 2px 2px 2px'],
    ['--switch-handle-color', 'rgb(30, 40, 30)'],
    ['--switch-handle-border-color', 'rgb(30, 200, 30)'],
    ['--switch-handle-color-on', 'rgb(30, 200, 30)'],
    ['--switch-handle-border-color-on', 'rgb(30, 200, 30)'],
    ['--switch-handle-div-color', 'rgb(25, 30, 25)'],
    ['--switch-handle-div-border-color', 'rgb(20, 160, 20)'],
    ['--switch-handle-div-color-on', 'rgb(20, 160, 20)'],
    ['--switch-handle-div-border-color-on', 'rgb(20, 160, 20)']
]);

const blood_moon = new Theme('Blood Moon', 'blood_moon', [
    // background
    ['--background-color', 'rgb(5, 0, 0)'],
    ['--title-font', 'Geo'],
    ['--header-font', 'Josefin'],
    ['--text-font', 'Lato'],
    ['--text-color', 'rgb(255, 240, 240)'],
    ['--text-color-light', 'rgb(255, 210, 210)'],
    // backgrounds for compound ui elems
    ['--compound-background-color', 'rgba(10, 5, 5, 0.5)'],
    ['--compound-background-color-hover', 'rgba(20, 5, 5, 0.5)'],
    ['--compound-background-color-active', 'rgba(30, 10, 10, 0.5)'],
    // images / icons
    ['--icon-filter', 'saturate(90%) brightness(1.0)'],
    // scrollbars
    ['--scrollbar-color', 'linear-gradient(0deg, rgba(50,20,20,1) 0%, rgba(20,5,5,1) 100%)'],
    ['--scrollbar-border-radius', '0px 5px 10px 0px'],
    ['--scrollbar-thumb-color', 'rgb(150, 30, 30)'],
    ['--scrollbar-thumb-color-hover', 'rgb(180, 40, 40)'],
    ['--scrollbar-thumb-color-active', 'rgb(120, 10, 10)'],
    ['--scrollbar-thumb-border-radius', '5px 5px 5px 5px'],
    // inputs
    ['--input-border-radius', '5px 5px 10px 5px'],
    ['--input-border-color', 'rgb(220, 10, 10)'],
    ['--input-color', 'rgb(10, 5, 5)'],
    ['--input-color-hover', 'rgb(15, 10, 10)'],
    ['--input-color-active', 'rgb(40, 20, 20)'],
    ['--input-font-color-active', 'rgb(250, 150, 150)'],
    // buttons
    ['--button-border-radius', '10px 10px 15px 10px'],
    // mechanical buttons
    ['--mech-color', 'linear-gradient(90deg, rgba(200,10,10,1) 0%, rgba(80,20,20,1) 40%, rgba(20,10,10,1) 100%)'],
    ['--mech-div-color', 'linear-gradient(90deg, rgba(150,10,10,1) 0%, rgba(50,10,10,1) 40%, rgba(10,5,5,1) 100%)'],
    ['--mech-color-hover', 'linear-gradient(90deg, rgba(200,10,10,1) 0%, rgba(80,20,20,1) 66%, rgba(20,10,10,1) 100%)'],
    ['--mech-div-color-hover', 'linear-gradient(90deg, rgba(150,10,10,1) 0%, rgba(50,10,10,1) 66%, rgba(10,5,5,1) 100%)'],
    ['--mech-color-active', 'linear-gradient(90deg, rgba(130,20,20,1) 0%, rgba(250,10,10,1) 49%, rgba(130,20,20,1) 100%)'],
    ['--mech-div-color-active', 'linear-gradient(90deg, rgba(100,20,20,1) 0%, rgba(200,10,10,1) 49%, rgba(100,20,20,1) 100%)'],
	['--mech-border-color', 'rgba(220, 10, 10, 0)'],
	['--mech-div-border-color', 'rgba(150, 10, 10, 0)'],
    ['--mech-font-color', 'rgba(255, 255, 255, 0.8)'],
    ['--mech-font-color-active', 'rgba(0, 0, 0, 0.8)'],
    ['--mech-color-sel', 'linear-gradient(90deg, rgba(130,20,20,1) 0%, rgba(250,10,10,1) 49%, rgba(130,20,20,1) 100%)'],
    ['--mech-div-color-sel', 'linear-gradient(90deg, rgba(100,20,20,1) 0%, rgba(200,10,10,1) 49%, rgba(100,20,20,1) 100%)'],
    ['--mech-color-hover-sel', 'linear-gradient(90deg, rgba(170,20,20,1) 0%, rgba(255,40,40,1) 49%, rgba(170,20,20,1) 100%)'],
    ['--mech-div-color-hover-sel', 'linear-gradient(90deg, rgba(130,20,20,1) 0%, rgba(220,30,30,1) 49%, rgba(130,20,20,1) 100%)'],
    ['--mech-color-active-sel', 'linear-gradient(90deg, rgba(100,20,20,1) 0%, rgba(220,10,10,1) 49%, rgba(100,20,20,1) 100%)'],
    ['--mech-div-color-active-sel', 'linear-gradient(90deg, rgba(80,20,20,1) 0%, rgba(200,10,10,1) 49%, rgba(80,20,20,1) 100%)'],
	['--mech-border-color-sel', 'rgba(180, 40, 40, 0)'],
	['--mech-div-border-color-sel', 'rgba(120, 20, 20, 0)'],
    ['--mech-font-color-sel', 'rgb(0, 0, 0)'],
    ['--mech-font-color-active-sel', 'rgb(0, 0, 0)'],
	['--mech-border-radius', '5px 5px 20px 5px'],
    // panels
    ['--panel-color', 'linear-gradient(0deg, rgba(30,10,10,1) 0%, rgba(5,5,5,1) 100%)'],
    ['--panel-color-hover', 'linear-gradient(0deg, rgba(50,10,10,1) 0%, rgba(25,5,5,1) 100%)'],
    ['--panel-color-active', 'linear-gradient(0deg, rgba(45,15,15,1) 0%, rgba(20,10,10,1) 100%)'],
    ['--panel-color-sel', 'linear-gradient(0deg, rgba(20,5,5,1) 0%, rgba(70,5,5,1) 49%, rgba(20,5,5,1) 100%)'],
    ['--panel-color-hover-sel', 'linear-gradient(0deg, rgba(20,10,10,1) 0%, rgba(80,5,5,1) 49%, rgba(20,10,10,1) 100%)'],
    ['--panel-color-active-sel',  'linear-gradient(0deg, rgba(30,20,20,1) 0%, rgba(90,20,20,1) 49%, rgba(30,20,20,1) 100%)'],
    ['--panel-shadow', '1px 3px 2px rgba(100, 10, 10, 0.5)'],
    ['--panel-border-color', 'rgb(100, 10, 10)'],
    ['--panel-border-color-sel', 'rgb(200, 20, 20)'],
    ['--panel-border-radius', '5px 5px 10px 5px'],
    ['--panel-color-transparent', 'linear-gradient(0deg, rgba(30,10,10,0.5) 0%, rgba(5,5,5,0.5) 100%)'],
    // tabs
    ['--navbar-color', 'rgb(15, 10, 10)'],
    ['--navbar-border-radius', '5px 5px 0px 0px'],
    ['--navbar-underline-color', 'linear-gradient(90deg, rgba(180,20,20,1) 0%, rgba(220,10,10,1) 49%, rgba(180,20,20,1) 100%)'],
    ['--navbar-underline-border-radius', '0px 0px 5px 5px'],
    ['--navbar-tab-color', 'linear-gradient(90deg, rgba(40,10,10,1) 0%, rgba(80,10,10,1) 49%, rgba(40,10,10,1) 100%)'],
    ['--navbar-tab-color-hover', 'linear-gradient(90deg, rgba(50,10,10,1) 0%, rgba(100,20,20,1) 49%, rgba(50,10,10,1) 100%)'],
    ['--navbar-tab-color-active', 'linear-gradient(90deg, rgba(30,10,10,1) 0%, rgba(60,10,10,1) 49%, rgba(30,10,10,1) 100%)'],
    ['--navbar-tab-color-sel', 'linear-gradient(90deg, rgba(170,40,40,1) 0%, rgba(255,50,50,1) 49%, rgba(170,40,40,1) 100%)'],
    ['--navbar-tab-color-hover-sel', 'linear-gradient(90deg, rgba(190,50,50,1) 0%, rgba(255,60,60,1) 49%, rgba(190,50,50,1) 100%)'],
    ['--navbar-tab-color-active-sel', 'linear-gradient(90deg, rgba(150,30,30,1) 0%, rgba(235,40,40,1) 49%, rgba(150,30,30,1) 100%)'],
    ['--navbar-tab-border', '1px solid rgb(200, 30, 30)'],
    ['--navbar-tab-font-color', 'rgb(255, 240, 240)'],
    ['--navbar-tab-font-color-sel', 'rgb(0, 0, 0)'],
    // sliders
    ['--slider-color', 'linear-gradient(90deg, rgba(100,10,10,1) 0%, rgba(50,5,5,1) 100%)'],
    ['--slider-color-hover', 'linear-gradient(90deg, rgba(120,15,15,1) 0%, rgba(70,15,15,1) 100%)'],
    ['--slider-border-color', 'rgba(150, 20, 20, 0)'],
    ['--slider-border-color-hover', 'rgba(170, 30, 30, 0)'],
    ['--slider-border-radius', '5px 5px 5px 5px'],
    ['--slider-handle-color', 'rgb(20, 10, 10)'],
    ['--slider-handle-border-color', 'rgb(150, 20, 20)'],
    ['--slider-handle-color-hover', 'rgb(40, 20, 20)'],
    ['--slider-handle-color-active', 'rgb(170, 30, 30)'],
    ['--slider-handle-border-color-active', 'rgb(180, 20, 20)'],
    ['--slider-handle-border-radius', '12.5px 12.5px 12.5px 12.5px'],
    // switches
    ['--switch-color', 'linear-gradient(90deg, rgba(60,10,10,1) 0%, rgba(20,5,5,1) 100%)'],
    ['--switch-color-on', 'linear-gradient(270deg, rgba(200,20,20,1) 0%, rgba(100,10,10,1) 100%)'],
    ['--switch-border-color', 'rgb(150, 10, 10)'],
    ['--switch-handle-border-radius', '5px 5px 5px 5px'],
    ['--switch-handle-color', 'rgb(180, 140, 140)'],
    ['--switch-handle-border-color', 'rgb(180, 140, 140)'],
    ['--switch-handle-color-on', 'rgb(190, 160, 160)'],
    ['--switch-handle-border-color-on', 'rgb(190, 160, 160)'],
    ['--switch-handle-div-color', 'rgb(120, 80, 80)'],
    ['--switch-handle-div-border-color', 'rgb(120, 80, 80)'],
    ['--switch-handle-div-color-on', 'rgb(120, 90, 90)'],
    ['--switch-handle-div-border-color-on', 'rgb(120, 90, 90)']
]);

/*
const test0 = new Theme('test0', 'test_0', [['--background-color', '#ff00ff']]);
const test1 = new Theme('test1', 'test_1', [['--background-color', '#ff00ff']]);
const test2 = new Theme('test2', 'test_2', [['--background-color', '#ff00ff']]);
const test3 = new Theme('test3', 'test_3', [['--background-color', '#ff00ff']]);
const test4 = new Theme('test4', 'test_4', [['--background-color', '#ff00ff']]);
const test5 = new Theme('test5', 'test_5', [['--background-color', '#ff00ff']]);
const test6 = new Theme('test6', 'test_6', [['--background-color', '#ff00ff']]);
const test7 = new Theme('test7', 'test_7', [['--background-color', '#ff00ff']]);
*/

// load the theme
let storedTheme = localStorage.getItem('theme');

if (storedTheme == null || storedTheme == undefined) {

    storedTheme = 'cool_light';

}

for (let i = 0; i < themes.length; i++) {

    if (themes[i].id == storedTheme) {
        document.getElementById(`${themes[i].id}_button`).click();
        break;
    }

}
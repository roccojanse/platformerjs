/* globals GameAssets, GameObjects */
/* exported Game */
'use strict';

class Game {

    constructor() {

        this._container = document.querySelector('#game');
        this._defWidth = 1280;
        this._defHeight = 720;
        this._width = this.defWidth;
        this._height = this.defHeight;
        this._scaleFactor = 1;

        this._fps = 60;
        this._loopCount = 0;
        this._reqAnimId = null;
        this._lastFrame = new Date().getTime();

    }

    init() {

        // init global asset and object managers
        window.GameAssets = new GameAssets();
        window.GameObjects = new GameObjects();
        
        // set game scale
        this.setScale();

        window.addEventListener('resize', this.debounce(() => {
            this.resize();
        }));
    }

    setScale() {
        
        // get current viewport width and height
        let winWidth = window.innerWidth,
            winHeight = window.innerHeight;

        // set proportions and scaling
        this._scaleFactor = winWidth / this._defWidth;

        // limit size if exceeds viewport height or viewport width
        let newWidth = Math.round(this._defWidth * this._scaleFactor),
            newHeight = Math.round(this._defHeight * this._scaleFactor);

        if (newHeight > winHeight) {
            this._scaleFactor = winHeight / this._defHeight;
        }
        if (newWidth > winWidth) {
            this._scaleFactor = winWidth / this._defWidth;
        }

        // set new dimensions
        this._width = Math.round(this._defWidth * this._scaleFactor);
        this._height = Math.round(this._defHeight * this._scaleFactor);

        // manipulate game element
        this._container.style.width = `${this._width}px`;
        this._container.style.height = `${this._height}px`;
    }

    debounce(fn, wait = 200) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, arguments), wait);
        };
    }

    resize() {

        this.setScale();
        console.log('RESIZE!');
    }
}
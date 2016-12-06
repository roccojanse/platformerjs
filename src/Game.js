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
        this.setScale();
    }

    setScale() {
        
        // get current viewport width
        let winWidth = window.innerWidth;

        // set proportions and scaling
        this._scaleFactor = winWidth / this._defWidth;
        this._width = Math.round(this._defWidth * this._scaleFactor);
        this._height = Math.round(this._defHeight * this._scaleFactor);

        // manipulate game element
        this._container.style.width = this._width + 'px';
        this._container.style.height = this._height + 'px';

    }

}

var Platformer = new Game();
Platformer.init();
console.log(Platformer);
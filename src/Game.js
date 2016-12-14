/* globals AssetManager, Renderer */
/* exported Game */
'use strict';

let Game = class Game {

    constructor() {

        this._container = document.querySelector('#game');
        this._defWidth = 1280;
        this._defHeight = 720;
        this._width = this._defWidth;
        this._height = this._defHeight;
        this._scaleFactor = 1;

        this._fps = 60;
        this._reqAnimId = null;

        this._lastFrame = 0;
        this._upcateCycleCount = 0;
        this._renderCycleCount = 0;
        this._physicsCycleCount = 0;

        this._gameState = {
            INIT: 1,
            MAINMENU: 2
        };

        this.init();
    }

    init() {

        // init global asset and object managers
        Game.AssetManager = new AssetManager();
        Game.Renderer = new Renderer();

        // set game scale
        this._container.width = this._width;
        this._container.height = this._height;
        this.setScale();

        var assets = [{
            id: 'omc-logo',
            path: '/assets/svg/omc-logo.svg',
            type: 'svg'
        },{
            id: 'omc-logo2',
            path: '/assets/svg/omc-logo.svg',
            type: 'svg'
        },{
            id: 'omc-logo3',
            path: '/assets/svg/omc-logo.svg',
            type: 'svg'
        },{
            id: 'omc-logo4',
            path: '/assets/svg/omc-logo.svg',
            type: 'svg'
        }];

        Game.AssetManager.addAssets(assets);
        console.log(Game.AssetManager.get('omc-logo4'));

        // tmp
        let ctx = this._container.getContext('2d');
        let img = new Image();

        img.onload = () => {
            ctx.drawImage(img, 0, 0, 1280, 720);
        };
        img.src = '/assets/svg/omc-logo.svg';
        

        // window events
        window.addEventListener('resize', this.debounce(() => {
            this.resize();
        }), false);
        window.addEventListener('orientationchange', this.debounce(() => {
            this.resize();
        }), false);
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
    }
};
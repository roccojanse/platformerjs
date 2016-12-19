/* globals AssetManager, Renderer, Main */
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

        this._gameState = {
            INIT: 1,
            MAINMENU: 2
        };

        this.init();
    }

    /**
     * Initializes game.
     */
    init() {

        // init global asset and object managers
        //Game.EventEmitter = new EventEmitter();
        Game.AssetManager = new AssetManager();
        Game.Renderer = new Renderer();
        Game.Main = new Main();

        // set game scale
        this._container.width = this._width;
        this._container.height = this._height;
        this.setScale();

        // var assets = [{
        //     id: 'omc-logo',
        //     path: '/assets/svg/omc-logo.svg',
        //     type: 'svg'
        // },{
        //     id: 'progressbar-base',
        //     path: '/assets/svg/ui/pb-base.svg',
        //     type: 'svg'
        // },{
        //     id: 'progressbar-bg',
        //     path: '/assets/svg/ui/pb-bg.svg',
        //     type: 'svg'
        // },{
        //     id: 'progressbar-bar',
        //     path: '/assets/svg/ui/pb-bar.svg',
        //     type: 'svg'
        // }];

        // // tmp
        // let ctx = this._container.getContext('2d');

        // Game.AssetManager.addAssets(assets);
        
        // Game.AssetManager.addEventListener('load', (progress) => {
        //     console.log(`Started loading ${progress.total} assets on ` + new Date(progress.timestamp).toLocaleString('nl-NL', 'Europe/Amsterdam'));
        // });

        // Game.AssetManager.addEventListener('progress', (progress) => {
        //     console.log(`Loading progress: ${progress.loaded}/${progress.total}, ${progress.errors} errors. ${(progress.loaded / progress.total) * 100}%.`);
        // });

        // Game.AssetManager.addEventListener('complete', (assets) => {
        //     console.log(`Loading complete. ${assets.loaded}/${assets.total}(${assets.errors}). Completed on ` + new Date(assets.timestamp).toLocaleString('nl-NL', 'Europe/Amsterdam'));
        //     let pbBase = Game.AssetManager.get('progressbar-base');
        //     let pbBg = Game.AssetManager.get('progressbar-bg');
        //     let pbBar = Game.AssetManager.get('progressbar-bar');
        //     ctx.drawImage(pbBase.img, 0, 0, pbBase.width, pbBase.height);
        //     ctx.drawImage(pbBg.img, 0, 0, pbBg.width, pbBg.height);
        //     ctx.drawImage(pbBar.img, 0, 0, pbBar.width, pbBar.height);
        // });

        // Game.AssetManager.load();

        // window events
        window.addEventListener('resize', this.debounce(() => {
            this.resize();
        }), false);
        window.addEventListener('orientationchange', this.debounce(() => {
            this.resize();
        }), false);

        // start mainLoop
        Game.Main.loop(window.performance.now());
    }

    /**
     * Determines and sets current scalefactor.
     */
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

    /**
     * 'Debounces' events so they won't be triggered every event.
     * @param {function} Fn Function to act as callback,
     * @param {number} wait=200 delay to trigger events
     */
    debounce(fn, wait=200) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, arguments), wait);
        };
    }

    /**
     * Resizes and rescales the game.
     */
    resize() {
        this.setScale();
    }
};
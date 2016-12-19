/* exported Renderer */
'use strict';

class Renderer {

    constructor() {

        this._objects = new Map();

        console.log(Game.AssetManager);

    }

    render(tFrame) {
        console.log('render');
    }

    clearObjects() {
        this._objects.clear();
    }
}
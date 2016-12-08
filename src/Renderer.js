/* exported Renderer */
'use strict';

class Renderer {

    constructor() {

        this._objects = new Map();

        console.log(Game.AssetManager);

    }

    clearObjects() {
        this._objects.clear();
    }
}
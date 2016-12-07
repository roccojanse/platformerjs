/* exported Renderer */
'use strict';

class Renderer {

    constructor() {

        this._objects = new Map();

    }

    clearObjects() {
        this._objects.clear();
    }
}
/* exported GameObject */
'use strict';

class GameObject {

    constructor(w, h, x=0, y=0, r=0) {

        this._type = 'Object';
        this._defWidth = w;
        this._defHeight = h;

        this._width = w;
        this._height = h;
        this._pos = { x: x, y: y };
        this._rotation = r;

        this._zoomLevel = 1;
        this._alpha = 1;

    }

    update() {

    }

    resize(scale=1) {
        this._width = this._defWidth * scale;
        this._height = this._defHeight * scale;
    }
}
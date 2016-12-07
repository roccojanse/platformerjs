/* exported GameAssetManager */
'use strict';

class GameAssetManager {

    constructor() {

        this._assets = new Map();

    }

    clear() {
        this._assets.clear();
    }
}
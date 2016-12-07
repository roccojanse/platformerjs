/* exported AssetManager */
'use strict';

class AssetManager {

    constructor() {

        this._assets = new Map();

    }

    clear() {
        this._assets.clear();
    }
}
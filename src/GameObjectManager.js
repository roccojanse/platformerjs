/* exported GameObjectManager */
'use strict';

class GameObjectManager {

    constructor() {

        this._objects = new Map();

    }

    clear() {
        this._objects.clear();
    }
}
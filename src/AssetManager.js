/* exported AssetManager */
'use strict';

class AssetManager {

    constructor() {

        this._assets = new Map();

    }

    addAsset(asset) {
        this._assets.set(asset.id, asset);
    }

    addAssets(arrOfAssets) {
        arrOfAssets.forEach((asset, i) => {
            this.addAsset(asset);
        });
    }

    get(assetId) {
        return this._assets.get(assetId);
    }

    clear() {
        this._assets.clear();
    }
}
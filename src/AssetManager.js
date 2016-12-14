/* exported AssetManager */
'use strict';

/**
 * Stores all game assets.
 * @author Rocco Janse <roccojanse@outlook.com> 
 * @class
 */
class AssetManager {

    constructor() {
        /** 
         * Map to hold current assigned assets.
         * @member {map}
         */
        this._assets = new Map();

        /** 
         * Current loaded assets.
         * @member {number} 
         */
        this._loaded = 0;

        /** 
         * Total assets assigned.
         * @member {number} 
         */
        this._total = 0;

        /** 
         * Boolean to indicate current loading state.
         * @member {boolean} 
         */
        this._isLoading = false;
    }

    /**
     * Adds an assets to preload.
     * @param {object} asset Asset object to insert.
     * @param {string} asset.id Id of asset to insert.
     * @param {string} asset.path Path of asset to insert.
     * @param {string} asset.type Type of asset to insert.
     */
    addAsset(asset) {
        this._assets.set(asset.id, asset);
        this.total = this._assets.length;
    }

    /**
     * Adds an array of assets to preload.
     * @param {array} arrOfAssets Array of asset objects to insert.
     * @see {@link AssetManager#addAsset}
     */
    addAssets(arrOfAssets) {
        arrOfAssets.forEach((asset, i) => {
            this.addAsset(asset);
        });
    }

    /**
     * Returns requested asset if exists.
     * @param {string} assetId Id of asset to return.
     * @returns {object|undefined} Found asset or undefined.
     */
    get(assetId) {
        return this._assets.get(assetId);
    }

    /**
     * Clears current asset list.
     */
    clear() {
        this._assets.clear();
        this._total = 0;
        this._loaded = 0;
        this._isLoading = false;
    }
}
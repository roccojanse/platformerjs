/* globals EventEmitter */
/* exported AssetManager */

/**
 * Stores all game assets.
 * @author Rocco Janse <roccojanse@outlook.com> 
 * @class
 */
class AssetManager extends EventEmitter {

    constructor() {
        
        super();

        /** 
         * Map to hold loaded assets.
         * @member {map}
         */
        this._cachedAssets = new Map();

        /** 
         * Map to hold current assigned asset objects.
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
         * Total errors while loading.
         * @member {number} 
         */
        this._errors = 0;

        /** 
         * Boolean to indicate current loading state.
         * @member {boolean} 
         */
        this._isLoading = false;

    }

    /**
     * Loads an image asset.
     * @param {object} image Image asset object.
     * @param {string} image.id Id of asset.
     * @param {string} image.path Path of source of asset.
     * @param {string} image.type Type of asset (i.e: png, jpg, svg).
     */
    loadImage(image, cb) {
        let img = new Image();
        img.addEventListener('load', (e) => {
            image.img = img;
            image.width = img.width;
            image.height = img.height;
            this._assets.set(image.id, image);
            this._cachedAssets.set(image.id, img);

            if (typeof cb === 'function') {
                cb(img);
            }

        }, false);
        img.addEventListener('error', (e) => {
            
            this._errors++;
            this._cachedAssets.set(image.id, null);

            if (typeof cb === 'function') {
                cb(false);
            }

        }, false);
        img.src = image.path;
    }

    /**
     * Loads an audio asset.
     * @param {object} sfx Audio asset object.
     * @param {string} sfx.id Id of asset.
     * @param {string} sfx.path Path of source of asset.
     * @param {string} sfx.type Type of asset (i.e: mp3, ogg).
     */
    loadSfx(sfx, cb) {
        // let audio = document.createElement('audio'),
        //     srcMp3 = document.createElement('source'),
        //     srcOgg = document.createElement('source');

        // audio.id = sfx.id;
        // audio.autoplay = false;
        // audio.preload = false;

        // audio.appendChild(srcOgg);
        // audio.appendChild(srcMp3);
        // document.body.appendChild(audio);
        
        // audio.addEventListener('canplaythrough', (e) => {
        //     audio.removeEventListener('canplaythrough');
        //     if (typeof cb === 'function') {
        //         cb(audio);
        //     }
        // }, false);
        // audio.addEventListener('error', (e) => {
        //     audio.removeEventListener('canplaythrough');
        //     audio.removeEventListener('error');
        //     if (typeof cb === 'function') {
        //         cb(false);
        //     }
        // }, false);

        // srcMp3.src = sfx.path;
        // srcMp3.type = 'audio/mpeg';

        // srcOgg.src = sfx.path.replace('.mp3', '.ogg');
        // srcOgg.type = 'audio/ogg';
    }

    /**
     * Starts loading assets.
     */
    load() {
        
        this._isLoading = true;
        this.dispatchEvent('load', { total: this._total, timestamp: Date.now() });

        this._assets.forEach((asset, i) => {
            if (asset.type === 'image' || asset.type === 'svg') {
                this.loadImage(asset, (asset) => {
                    this.onProgress(asset);
                });
            } else if (asset.type === 'sfx') {
                this.loadSfx(asset, (asset) => {
                    this.onProgress(asset);
                });                
            }
        });
    }

    /**
     * Gets called on progres in loading sequence.
     * @param {object} asset Asset object.
     * @param {string} asset.id Id of asset.
     * @param {string} asset.path Path of source of asset.
     * @param {string} asset.type Type of asset (i.e: png, jpg, svg, mp3, ogg).
     */
    onProgress(asset) {

        this._loaded++;
        this.dispatchEvent('progress', { loaded: this._loaded, total: this._total, errors: this._errors });

        if (this._loaded === this._total) {
            this._isLoading = false;
            this.dispatchEvent('complete', { loaded: this._loaded, total: this._total, errors: this._errors, timestamp: Date.now() });
        }
    }

    /**
     * Adds an assets to (pre)load.
     * @param {object} asset Asset object to insert.
     * @param {string} asset.id Id of asset to insert.
     * @param {string} asset.path Path of asset to insert.
     * @param {string} asset.type Type of asset to insert.
     */
    addAsset(asset) {
        this._assets.set(asset.id, asset);
        this._total = this._assets.size;
        return this;
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
        return this;
    }

    /**
     * Returns requested asset object if exists.
     * @param {string} assetId Id of asset object to return.
     * @returns {object|undefined} Found asset object or undefined.
     */
    get(assetId) {
        return this._assets.get(assetId);
    }

    /**
     * Returns requested asset from object if exists.
     * @param {string} assetId Id of corresponding asset to return.
     * @returns {object|undefined} Found asset or undefined.
     */
    getAsset(assetId) {
        return this._cachedAssets.get(assetId);
    }

    /**
     * Clears current asset list.
     */
    clear() {
        this._assets.clear();
        this._cachedAssets.clear();
        this._total = 0;
        this._loaded = 0;
        this._errors = 0;
        this._isLoading = false;
    }
}
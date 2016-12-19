/* exported EventEmitter */

/**
 * EventEmitter to emit events without DOM targets.
 * @author Rocco Janse <roccojanse@outlook.com> 
 * @class
 */
class EventEmitter {

    constructor() {
        
        /** 
         * Map to hold event listeners.
         * @member {map}
         */
        this._listeners = new Map();
    }

    /**
     * Adds an Event Listener.
     * @param {string} name Name of event to add.
     * @param {function} callback Callback function.
     */
    addEventListener(name, callback) {
        if (!this._listeners.has(name)) {
            this._listeners.set(name, []);
        } 
        this._listeners.get(name).push(callback);
    }

    /**
     * Remove an Event Listener.
     * @param {string} name Name of event to add.
     * @param {function} callback Callback function.
     * @returns {boolean} True or false.
     */
    removeEventListener(name, callback) {
        let listeners = this._listeners.get(name),
            index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (typeof listener === 'function' && listener === callback) ? i = index : i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this._listeners.set(name, listeners);
                return true;
            }
        }
        return false;
    }

    /**
     * Dispatches events.
     * @param {string} name Name of event to add.
     * @param {function|array} args (Array of) arguments.
     * @returns {boolean} True or false. 
     */
    dispatchEvent(name, ...args) {
        let listeners = this._listeners.get(name);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args);
            });
            return true;
        }
        return false;
    }
}
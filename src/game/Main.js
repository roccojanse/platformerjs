/* exported Main */
'use strict';

/**
 * Main game logic.
 * @author Rocco Janse <roccojanse@outlook.com> 
 * @class
 */
class Main {

    constructor() {

        this._lastTick = window.performance.now();
        this._tickLength = 50;
        this._lastRender = this._lastTick;
    }

    /**
     * Main game loop. Game loop logic happends here.
     * @param {DOMHighResTimestamp} tFrame Timestamp provided by requestAnimationFrame to accurately and precisely determine how much time elapsed since last run.
     */
    loop(tFrame) {
        this.mainLoop = window.requestAnimationFrame(this.loop.bind(this));
        
        let nextTick = this._lastTick + this._tickLength;
        let numTicks = 0;      
        
        //If tFrame < nextTick then 0 ticks need to be updated (0 is default for numTicks).
        //If tFrame = nextTick then 1 tick needs to be updated (and so forth).
        //Note: As we mention in summary, you should keep track of how large numTicks is.
        //If it is large, then either your game was asleep, or the machine cannot keep up.
        if (tFrame > nextTick) {
            let timeSinceTick = tFrame - this._lastTick;
            numTicks = Math.floor(timeSinceTick / this._tickLength);
        }

        // queue updates
        this.queueUpdates(numTicks);

        // render frame
        Game.Renderer.render(tFrame);   
        this._lastRender = tFrame;
    }

    /**
     * Update queue. Tries to keep up the logic updates with the framerendering (framerate).
     * @param {number} numTicks Number of missed game ticks.
     */
    queueUpdates(numTicks) {
        for(let i = 0; i < numTicks; i++) {
            this._lastTick = this._lastTick + this._tickLength; //Now lastTick is this tick.
            this.update(this._lastTick);
        }
    }

    /**
     * Updates game logic.
     * @param {DOMHighResTimestamp} tFrame Timestamp provided by requestAnimationFrame to accurately and precisely determine how much time elapsed since last run.
     */
    update(tFrame) {
        console.log('update');
    }
}
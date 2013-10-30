(function (window) {
    'use strict';

    /**
     * Module dependencies
     */
    var on = (window.addEventListener !== undefined) ? 'addEventListener' : 'attachEvent',
        off = (window.removeEventListener !== undefined) ? 'removeEventListener' : 'detachEvent',
        scrollEvent = (on !== 'addEventListener') ? 'onscroll' : 'scroll',
        scrolled = false,
        requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }()),
        scrolledElement,
        scroll,
        eve;


    /**
     * Captures the scroll event and the element who emits it.
     * @function
     * @private
     */
    function captureScroll(e) {
        // No changing, exit
        if (!scrolled) {
            scrolled = true;
            scrolledElement = this;
            eve = e || window.e;


            /**
             * requestAnimationFrame
             */
            requestAnimFrame(update);
        }
    }

    /**
     * If the scroll event exist, it will execute the scrolledElement listeners.
     * @function
     * @private
     */
    function update() {

        var i = 0,
            listeners = scroll._collection[scrolledElement].listeners,
            len = listeners.length;

        for (i; i < len; i += 1) {
            listeners[i].call(scrolledElement, eve);
        }

        scrolledElement = undefined;

        // Change scroll status
        scrolled = false;
    }

    /**
     * Scroll Constructor.
     * @constructor
     * @returns {scroll} Returns a new instance of Scroll.
     */
    function Scroll() {
        this.initialize();
        return this;
    }

    /**
     * Initializes a new instance of Scroll.
     * @function
     * @returns {scroll} Returns a new instance of Scroll.
     */
    Scroll.prototype.initialize = function () {
        this._collection = {};
        return this;
    };

    /**
     * Adds an el with a listener to the collection.
     * @memberof! Scroll.prototype
     * @function
     * @param {HTMLElement} [el] - A given HTMLElement to add to scroll.
     * @param {Funtion} listener - A given listener to execute when the given el is scrolled.
     * @returns {scroll}
     */
    Scroll.prototype.add = function (el, listener) {

        if ('function' === typeof el) {
            listener = el;
            el = window;
        }

        if (this._collection[el] === undefined) {
            this._collection[el] = {
                'listeners': []
            };

            el[on](scrollEvent, captureScroll, false);
        }

        // Add listeners to an el collection
        this._collection[el].listeners.push(listener);

        return this;
    };

    /**
     * Removes a HTMLElement and its listener from the collection with the given el.
     * @memberof! Scroll.prototype
     * @function
     * @param {HTMLElement} el - A given HTMLElement to remove.
     * @param {Funtion} [listener] - A given listener to remove.
     * @returns {scroll}
     */
    Scroll.prototype.remove = function (el, listener) {
        var listeners = this._collection[el].listeners,
            i = 0,
            len = listeners.length;

        if (len !== undefined) {
            for (i; i < len; i += 1) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }

        if (listeners.length === 0 || listener === undefined) {
            el[off](scrollEvent, captureScroll, false);
            delete this._collection[el];
        }

        return this;
    };

    // Defines a new instance of Scroll.
    scroll = new Scroll();

    /**
     * Adds an el with a listener to the collection.
     * @function
     * @param {HTMLElement} [el] - A given HTMLElement to add to scroll.
     * @param {Funtion} listener - A given listener to execute when the given el is scrolled.
     * @returns {scroll}
     */
    function scrolling(el, listener) {
        scroll.add(el, listener);

        return scrolling;
    }

    /**
     * Removes a HTMLElement and its listener from the collection with the given el.
     * @function
     * @param {HTMLElement} el - A given HTMLElement to remove.
     * @param {Funtion} [listener] - A given listener to remove.
     * @returns {scrolling}
     */
    scrolling.remove = function (el, listener) {
        scroll.remove(el, listener);

        return scrolling;
    };
    /**
     * Expose scrolling
     */
    // AMD suppport
    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('scrolling', [], function () {
            return scrolling;
        });

    // CommonJS suppport
    } else if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports = scrolling;

    // Default
    } else {
        window.scrolling = scrolling;
    }
}(this));

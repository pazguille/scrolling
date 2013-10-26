/**
 * Module dependencies
 */
var document = window.document,
    body = document.body,
    docEl = document.documentElement,
    on = (window.addEventListener !== undefined) ? 'addEventListener' : 'attachEvent',
    off = (window.removeEventListener !== undefined) ? 'removeEventListener' : 'dettachEvent',
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
    elementScrolled,
    scroll;

function update() {

    // No changing, exit
    if (!scrolled) { return; }

    if (elementScrolled !== undefined) {

        var i = 0;
            listeners = scroll._collection[elementScrolled].listeners;
            len = listeners.length;

        for (i; i < len; i += 1) {
            listeners[i]();
        }

        elementScrolled = undefined;
    }

    // Change scroll status
    scrolled = false;
}

function captureScroll() {
    scrolled = true;
    elementScrolled = this;
}

function Scroll() {
    this.initialize();
    return this;
}

Scroll.prototype.initialize = function() {
    this._collection = {};
    return this;
};

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

    // Add listeners to a el collection
    this._collection[el].listeners.push(listener);

    return this;
};

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

scroll = new Scroll();

function scrolling(el, listener) {
    scroll.add(el, listener);

    return scrolling;
}

scrolling.remove = function (el, listener) {
    scroll.remove(el, listener);

    return scrolling;
};

/**
 * Expose scrolling
 */
exports = module.exports = scrolling;

/**
 * requestAnimationFrame
 */
(function updateloop() {
    requestAnimFrame(updateloop);
    update();
}());
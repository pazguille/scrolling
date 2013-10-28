
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("scrolling/index.js", function(exports, require, module){
/**
 * Module dependencies
 */
var on = (window.addEventListener !== undefined) ? 'addEventListener' : 'attachEvent',
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


/**
 * Captures the scroll event and the element who emits it.
 * @function
 * @private
 */
function captureScroll() {

    // No changing, exit
    if (!scrolled) {
        scrolled = true;
        elementScrolled = this;

        /**
         * requestAnimationFrame
         */
        requestAnimationFrame(update);
    }
}

/**
 * If the scroll event exist, it will execute the elementScrolled listeners.
 * @function
 * @private
 */
function update() {

    var i = 0,
        listeners = scroll._collection[elementScrolled].listeners,
        len = listeners.length;

    for (i; i < len; i += 1) {
        listeners[i]();
    }

    elementScrolled = undefined;

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
exports = module.exports = scrolling;
});
require.alias("scrolling/index.js", "scrolling/index.js");


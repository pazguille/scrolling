# scrolling

Decouple the scroll event from the callback functions using requestAnimationFrames.

> It’s a very, very, bad idea to attach handlers to the window scroll event.

> Depending upon the browser the scroll event can fire a lot and putting code in the scroll callback will slow down any attempts to scroll the page (not a good idea). Any performance degradation in the scroll handler(s) as a result will only compound the performance of scrolling overall. Instead it’s much better to use some form of a timer to check every X milliseconds OR to attach a scroll event and only run your code after a delay (or even after a given number of executions – and then a delay).

> by [John Resig](http://ejohn.org/blog/learning-from-twitter/).

## Based on
- [John Resig](https://twitter.com/jeresig)'s article [Learning from Twitter](http://ejohn.org/blog/learning-from-twitter/).
- [Paul Lewis](https://twitter.com/aerotwist)'s article [Leaner, Meaner, Faster Animations with requestAnimationFrame](http://www.html5rocks.com/en/tutorials/speed/animations/#debouncing-scroll-events).


## Installation

    $ npm install scrolling

    $ bower install scrolling

    $ component install pazguille/scrolling


## Usage
First, requires the `scrolling` component:
```js
var scrolling = require('scrolling');
```

Now, define a listener for any HTMLElement:
```js
function foo(event) {
    console.log('foo');

    // The function receive the scroll event as parameter.
    console.log(event);

    // The function context is the scrolled element.
    console.log(this.scrollTop);
}

function bar() {
    console.log('bar');
}
```

Then, add some HTMLelements and its listeners to scrolling:
```js
scrolling(document.querySelector('#box'), foo);
```
```js
scrolling(window, bar);

// or

scrolling(bar);
```

## API
### scrolling(el, listener)
Adds an `el` with a `listener` to the collection.
- `el` [optional] - A given `HTMLElement` to add to scroll.
- `listener` - A given `listener` to execute when the given `el` is scrolled.

```js
scrolling(el, listener);
```

### scrolling#remove(el, listener)
Removes an `el` or its `listener` from the collection with the given `el`.
- `el` - A given `HTMLElement` to remove.
- `listener` [optional] - A given listener to remove.

```js
scrolling.remove(el, listener);

// or

scrolling.remove(el);
```

## Build

    npm run dist

## Test

Open file `./test/test.html` in your browser.

## Made with ❤ by
- Guillermo Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
MIT license. Copyright © 2014.

# scrolling

Decouple the scroll event from the callback functions using requestAnimationFrames.

> It’s a very, very, bad idea to attach handlers to the window scroll event.

> Depending upon the browser the scroll event can fire a lot and putting code in the scroll callback will slow down any attempts to scroll the page (not a good idea). Any performance degradation in the scroll handler(s) as a result will only compound the performance of scrolling overall. Instead it’s much better to use some form of a timer to check every X milliseconds OR to attach a scroll event and only run your code after a delay (or even after a given number of executions – and then a delay).

> by [John Resig](http://ejohn.org/blog/learning-from-twitter/).

## Based on
- [John Resig](https://twitter.com/jeresig)'s article [Learning from Twitter](http://ejohn.org/blog/learning-from-twitter/).
- [Paul Lewis](https://twitter.com/aerotwist)'s article [Leaner, Meaner, Faster Animations with requestAnimationFrame](http://www.html5rocks.com/en/tutorials/speed/animations/#debouncing-scroll-events).


## Installation

    $ component install pazguille/scrolling

See: [https://github.com/component/component](https://github.com/component/component)

### Standalone
Also, you can use the standalone version:
```html
<script src="scrolling.js"></script>
```

## How-to
[ TODO ]

## API
[ TODO ]

## Contact
- Guillermo Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
Copyright (c) 2013 [@pazguille](http://twitter.com/pazguille) Licensed under the MIT license.

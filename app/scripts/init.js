/* eslint-disable */

// Service worker
(function() {
  'use strict';

  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if ('serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        registration.onupdatefound = function() {

          if (navigator.serviceWorker.controller) {
            var installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':

                  break;

                case 'redundant':
                  throw new Error('The installing ' +
                    'service worker became redundant.');

                default:
                // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }
})();

// Main initialize
(function _Init() {
  const APP = Object.create(null);

  // Definition

  APP['Version'] = '1.0.0';
  APP['Title'] = 'آروین لادن';
  APP['Description'] = 'صفحه برخط آروین لادن';
  APP['Author'] = 'Arvinall, https://arvinall.github.io, arvinall021@gmail.com';

  window['Enviroment'] = Object.create(APP);

  // Initializing

  _Initializing.call(Enviroment);

  function _Initializing() {
    this['eventHandlers'] = Object.create(null);
    this['addEventListener'] = function() {};
    this['fireEvent'] = function() {};

    // handle addEventListener
    this.addEventListener = function addEventListener(operator, event, handler) {
      var eventHandler, operatorHandler;

      if (typeof operator !== 'string') {
        throw Error('Type of first argument as operator must be string')
      }

      if (typeof event !== 'string') {
        throw Error('Type of second argument as event must be string')
      }

      if (typeof handler !== 'function') {
        throw Error('Type of last argument as handler must be function')
      }

      // make access to the operator
      operatorHandler = this.eventHandlers[operator] = (
        typeof this.eventHandlers[operator] === 'object'
      ) ?
        this.eventHandlers[operator] :
        [];

      // make access to the event
      eventHandler = operatorHandler[event] = (
        typeof operatorHandler[event] === 'object'
      ) ?
        operatorHandler[event] :
        [];

      eventHandler.push(handler);

      return true
    };
    // fire events
    this.fireEvent = function(operator, event, args, constructor) {
      var handlers = this.eventHandlers[operator], handler;

      if (typeof handlers === 'object') {
        handlers = handlers[event]
        if (typeof handlers === 'object') {
          for (handler in handlers) {
            handlers[handler].apply(constructor !== undefined ? constructor : null, args);
          }
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    };

    _DOMResourcesEventHandling.call(this);
  }

  function _DOMResourcesEventHandling() {
    var base = 'DOM', self = this;

    document.onreadystatechange = function () {
      switch (this.readyState) {
        case 'loading':
          // The document is still loading.
          self.fireEvent(base , 'Loading', null, self);
          break;
        case 'interactive':
          // The document has finished loading. We can now access the DOM elements.
          self.fireEvent(base , 'Interactive', null, self);
          break;
        case 'complete':
          // The page is fully loaded.
          self.fireEvent(base , 'Complete', null, self);
      }
    };
  }
})();

/* eslint-disable */

// Route configs

(function mainRouteConfigs (P) {
  var self = this

  this['route'] = Object.create({
    'parser': new P(),
    'engine': hashHandler
  })

  function hashHandler () {
    function handler () {
      var hash = (location.hash || '#/').slice(2)

      if (self.route.parser.run(hash) === false) {
        if (typeof self.route['notFound'] === 'function') {
          self.route['notFound'](hash)
        }
      }
    }

    window.addEventListener('hashchange', handler);
    handler()
  }

}).call(Enviroment, PathParser)

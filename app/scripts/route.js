/* eslint-disable */

// Route configs

(function mainRouteConfigs (P) {
  var self = this

  this['route'] = Object.create({
    'parser': null,
    'engine': hashHandler
  })

  this.route.__proto__.parser = new P(this.route)
  this.route['notFound'] = null

  function hashHandler () {
    function handler (cb) {
      var hash = (location.hash || '#/').slice(2)

      Enviroment.fireEvent('Route', 'Change', self.route, Enviroment)

      if (self.route.parser.run(hash) === false) {
        if (typeof self.route.notFound === 'function') {
          self.route.notFound(hash)
        }
      }

      self.route.url = hash

      if (cb && typeof cb === 'function') cb()
    }

    window.addEventListener('hashchange', handler);
    handler(function () {
      delete self.route.__proto__.engine
    })
  }

}).call(Enviroment, PathParser)

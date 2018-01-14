/* eslint-disable */

// Route configs

(function mainRouteConfigs (P) {
  var self = this

  this['route'] = Object.create({
    'parser': null,
    'engine': hashHandler,
    'setPrevUrl': null
  })

  this.route.__proto__.parser = new P(this.route)

  this.route.controller = null
  this.route['notFound'] = null
  this.route['prevUrl'] = null
  this.route.setPrevUrl = function setPrevUrl (value) {
    if (typeof value === 'string') {
      self.route.prevUrl = '/' + value
    }
  }

  function hashHandler () {
    function handler (cb) {
      var hash = (location.hash || '#/').slice(2)

      self.route['controllerCache'] = typeof self.route.controller === 'string' ? self.route.controller : self.route.controllerCache
      self.route.prevUrl = typeof self.route.url === 'string' ? '/' + self.route.url : '/'
      self.route.controller = null
      self.fireEvent('Route', 'Change', null, self)

      if (self.route.parser.run(hash) === false) {
        if (typeof self.route.notFound === 'function') {
          self.route.notFound.call(Enviroment, hash)
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

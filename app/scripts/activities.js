/* eslint-disable */
// Handle Activity sections

(function Activities () {
  var self = this,
    activityElement,
    activitiesContext = Object.create(null),
    activityContext = Object.create(activitiesContext),
    controllers,
    loader_Element

  this.addEventListener('DOM', 'Complete', function ActivitiesDomActions () {
    activityElement = function (name) {
      return $('.Activities').find('[data-name="' + name + '"]')
    }
    loader_Element = $('.Loader')
  })

  this.activity = (function activity () {
    var element, C = this, P = Object.getPrototypeOf(C)

    controllers = Object.create(C);

    function argController (name, value) {
      return (typeof this[name] !== (typeof value === 'string' ? value : 'string'))
    }

    P['active'] = ''

    P['get'] = function getActivity (name) {
      if (typeof name === 'string') {
        return C[name]
      } else {
        return C
      }
    }

    P['add'] = function addActivity (options) {
      var aC, element, res

      if (typeof options !== 'object') {
        throw Error('Option argument must be provided')
      }

      aC = argController.bind(options)

      if (aC('name')) {
        return false
      }

      C[options.name] = options;

      (function () {
        this['element'] = activityElement(options.name)
        res = this
      }).call(C[options.name])


      return C.get()
    }

    P['activation'] = function activation (options) {
      var aC

      if (typeof options !== 'object') {
        throw Error('Option argument must be provided')
      }

      aC = argController.bind(options)

      if (aC('name')) {
        return false
      }

      (function () {
        var obj = C.get(options.name)

        if (obj) {
          P.active = obj.name
          if (!obj.element.hasClass('Activity--loaded')) {
            C.controllers.loader.on()
          }
        }

      })()

      return C.get()

    };

    // Controllers
    (function Controllers () {

      function activity_background () {
        var element = self.activity.get(self.activity.active).element

        element = element.find('.Activity__background')

        return element
      }

      P['controllers'] = controllers = {
        'loader': {
          on: function makeLoaderApear () {
            loader_Element.addClass('Loader--leave')
            loader_Element.addClass('Loader--open')

            setTimeout(function () {
              loader_Element.removeClass('Loader--leave')
            }, 50)
          },
          off: function makeLoaderDisapear () {
            loader_Element.addClass('Loader--leave')

            setTimeout(function () {
              loader_Element.removeClass('Loader--open')
              loader_Element.removeClass('Loader--leave')
            }, 500)
          }
        },
        'background': {
          on: function makeLoaderApear () {
            activity_background().addClass('Activity__background--show')
          },
          off: function makeLoaderDisapear () {
            activity_background().removeClass('Activity__background--show')
          },
          reverse: function makeLoaderReverse () {
            activity_background().addClass('Activity__background--reverse')
          }
        }
      }
    })()

    return C
  }).call(activityContext)
}).call(Enviroment)

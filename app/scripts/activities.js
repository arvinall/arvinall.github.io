/* eslint-disable */
// Handle Activity sections

(function Activities () {
  var self = this,
    activityElement,
    activitiesContext = Object.create(null),
    activityContext = Object.create(activitiesContext),
    controllers,
    loader_Element,
    arrow_element,
    title_element,
    Activities_Element,
    template_element

  this.addEventListener('DOM', 'Complete', function ActivitiesDomActions () {
    Activities_Element = $('.Activities')

    activityElement = function (name) {
      return Activities_Element.find('[data-name="' + name + '"]')
    }
    loader_Element = $('.Loader')
    arrow_element = $('.Arrow')
    title_element = $('.Board__title')
  })

  this.activity = (function activity (prototype) {
    var element, C = this, P = activitiesContext, template

    template = function template (name) {
      var element

      if (typeof name === 'string') {
        element = $('<section class="Activity" data-name="' + name + '"></section>')
        element.append($('<div class="Activity__background"></div>'))
        element.append($('<div class="Activity__template"></div>'))

        return element
      }

      return false
    }

    controllers = Object.create(C);

    P['active'] = ''

    P['get'] = function getActivity (name) {
      if (typeof name === 'string') {
        return C[name]
      } else {
        return C
      }
    }

    P['add'] = function addActivity (options) {
      var aC, element, res, object

      if (typeof options !== 'object') {
        throw Error('Option argument must be provided')
      }

      aC = Enviroment.argController.bind(options)

      if (aC('name')) {
        return false
      }

      object = Object.create(P)
      object['details'] = options

      C[options.name] = object;

      (function () {
        Activities_Element.append(template(options.name))
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

      aC = Enviroment.argController.bind(options)

      if (aC('name')) {
        return false
      }

      (function () {
        var obj = C.get(options.name)

        if (obj) {
          P.active = obj.name
          if (C.get(C.active).loaded === false) {
            C.controllers.loader.on()
          }
        }

      })()

      return C
    };

    // Controllers
    (function Controllers () {

      function activity_background () {
        var element = self.activity.get(self.activity.active).element

        element = element.find('.Activity__background')

        return element
      }

      P['controllers'] = controllers

      P.controllers.loader = {
        on: function makeLoaderApear (cb) {
          loader_Element.addClass('Loader--leave')
          loader_Element.addClass('Loader--open')

          setTimeout(function () {
            loader_Element.removeClass('Loader--leave')
          }, 50)

          if (cb) setTimeout(cb.bind(P.controllers), 500)
        },
        off: function makeLoaderDisapear (cb) {
          loader_Element.addClass('Loader--leave')

          setTimeout(function () {
            loader_Element.removeClass('Loader--open')
            loader_Element.removeClass('Loader--leave')

            if (cb) cb.call(P.controllers)
          }, 500)
        }
      }
      P.controllers.background = {
        on: function makeBackgroundApear (cb) {
          activity_background().addClass('Activity__background--show')

          if (cb) setTimeout(cb.bind(P.controllers), 450)
        },
        off: function makeBackgroundDisapear (cb) {
          activity_background().removeClass('Activity__background--show')

          if (cb) setTimeout(cb.bind(P.controllers), 450)
        },
        reverse: function makeBackgroundReverse (cb) {
          activity_background().addClass('Activity__background--reverse')

          if (cb) setTimeout(cb.bind(P.controllers), 450)
        }
      }
      P.controllers.backBtn = {
        on: function makeBackBtnApear (cb) {
          arrow_element.addClass('Arrow--open')

          if (cb) setTimeout(cb.bind(P.controllers), 250)
        },
        off: function makeBackBtnDisapear (cb) {
          arrow_element.removeClass('Arrow--open')

          if (cb) setTimeout(cb.bind(P.controllers), 250)
        },
        arrow: {
          on: function makeArrowApear (cb) {
            arrow_element.addClass('Arrow--loaded')

            if (cb) setTimeout(cb.bind(P.controllers), 250)
          },
          off: function makeArrowDisapear (cb) {
            arrow_element.removeClass('Arrow--loaded')

            if (cb) setTimeout(cb.bind(P.controllers), 250)
          }
        }
      }
      P.controllers.active = {
        on: function makeApearCurrentActivity (name, cb) {
          if (typeof name === 'string') C.active = name
          C.get(C.active).element.addClass('Activity--active')

          if (cb) setTimeout(cb.bind(P.controllers), 50)
        },
        off: function makeDisapearCurrentActivity (cb) {
          C.get(C.active).element.removeClass('Activity--active')

          C.active = null

          if (cb) cb.call(P.controllers)
        }
      }
      P.controllers.loaded = {
        on: function (name, cb) {
          C.get(name || C.active).loaded = true

          if (cb) cb.call(P.controllers)
        },
        off: function (cb) {
          C.get(name || C.active).loaded = false

          if (cb) cb.call(P.controllers)
        }
      }
      P.controllers.title = {
        on: function makeTitleApear (title, cb) {
          if (title) title_element.text(title)

          title_element.addClass('Board__title--show')

          if (cb) setTimeout(cb.bind(P.controllers), 500)
        },
        off: function makeTitleDisapear (cb) {
          title_element.removeClass('Board__title--show')

          if (cb) setTimeout(cb.bind(P.controllers), 500)
        }
      }
      P.controllers.template = {
        on: function makeTemplateApear (cb) {
          if (template_element === undefined) {
            template_element = $('.Activity__template')
          }

          template_element.addClass('Activity__template--show')

          if (cb) setTimeout(cb.bind(P.controllers), 250)
        },
        off: function makeTemplateeDisapear (cb) {
          if (template_element === undefined) {
            template_element = $('.Activity__template')
          }

          template_element.removeClass('Activity__template--show')

          if (cb) setTimeout(cb.bind(P.controllers), 250)
        }
      }
    })()

    return C
  }).call(activityContext, activitiesContext)
}).call(Enviroment)

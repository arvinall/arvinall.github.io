/* eslint-disable */

// Main
Enviroment.addEventListener('DOM', 'Complete', function Main () {
  var loader_Element = $('.Loader'),
    intro_Element = $('.Intro'),
    board_Element = $('.Board'),
    self = this

  // Finishing the loader
  setTimeout(function () {
    loader_Element.addClass('Loader--leave')

    setTimeout(function () {
      loader_Element.removeClass('Loader--open')
      loader_Element.removeClass('Loader--leave')

      sayHello(goodBye)
    }, 500)

  }, 1000)

  // Intro typing effect
  function sayHello (cb) {
    var welcoming_Element = $(intro_Element.children()[0])

    welcoming_Element.addClass('Intro__welcoming--start')

    setTimeout(cb, 2500 + 2000)
  }

  // Leave the intro
  function goodBye () {
    intro_Element.addClass('Intro--leave')
    board_Element.addClass('Board--show')

    setTimeout(function () {
      intro_Element.css('display', 'none')

      self.route.engine()
    }, 500)
  }

  // cache device display height
  Enviroment.temp.displayHeight = (function () {
    var h = $(window).height.bind($(window))

    $(window).resize(function () {
      Enviroment.temp.displayHeight = h()
    })

    return h()
  })();

  // Back button action
  (function BackButton () {
    var btn = $('.Arrow')

    btn.on('click', function () {
      location.hash = self.route.prevUrl
    })
  })();

  Enviroment.route.notFound = function notFound () {
    this.route.controller = 'notFound'
    this.route.setPrevUrl('')
  }
})

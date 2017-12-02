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
})

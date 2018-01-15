/* eslint-disable */

// Main
Enviroment.addEventListener('DOM', 'Complete', function Main() {
  var loader_Element = $('.Loader'),
    intro_Element = $('.Intro'),
    board_Element = $('.Board'),
    self = this;

  self['introRequired'] = true;

  // Finishing the loader
  setTimeout(function() {
    loader_Element.addClass('Loader--leave');

    setTimeout(function() {
      loader_Element.removeClass('Loader--open');
      loader_Element.removeClass('Loader--leave');

      // Run the router
      self.route.engine();
    }, 500);

  }, 1000);

  // Intro typing effect
  function sayHello(cb) {
    var welcoming_Element = $(intro_Element.children()[0]);

    welcoming_Element.addClass('Intro__welcoming--start');

    setTimeout(function () {
      goodBye(cb || null)
    }, 2500 + 2000);
  };

  // Leave the intro
  function goodBye(cb) {
    intro_Element.addClass('Intro--leave');
    board_Element.addClass('Board--show');

    setTimeout(function() {
      intro_Element.css('display', 'none');
      if (cb) cb()
    }, 500);
  };

  self['intro'] = function (cb) {
    sayHello(cb);
    self.introRequired = false;
  };

  // cache device display height
  Enviroment.temp.displayHeight = (function() {
    var h = $(window).height.bind($(window));

    $(window).resize(function() {
      Enviroment.temp.displayHeight = h();
    });

    return h();
  })();

  // Back button action
  (function BackButton() {
    var btn = $('.Arrow');

    btn.on('click', function() {
      if (!Enviroment.activity.get('booklet').details.backTransaction) {
        location.hash = self.route.prevUrl;
      }
    });
  })();

  Enviroment.route.notFound = function notFound() {
    this.route.controller = 'notFound';
    this.route.setPrevUrl('');
  };

  String.prototype['camelize'] = function camelize() {
    var str = this;

    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  };
  String.prototype['titlize'] = function titlize() {
    var camelCase = this;
    // no side-effects
    return camelCase
    // inject space before the upper case letters
      .replace(/([A-Z])/g, function(match) {
        return " " + match;
      })
      // replace first char with upper case
      .replace(/^./, function(match) {
        return match.toUpperCase();
      });
  };
});

/* eslint-disable */


// Navigation
(function Navigation() {
  var self = this,
    navigation_Element,
    navigationFrame_Element,
    navigationItem_Element,
    emptyItem_Element,
    navigationItemWithSpace_Element,
    background_Element;

  self.temp.navigationSizing = false;

  self.addEventListener('DOM', 'Complete', function NavigationElementFetching() {
    var handler, handlerParams = Object.create(null), scrollPos = 0;

    navigation_Element = $('.Navigation');
    navigationFrame_Element = $('.Navigation__frame');
    navigationItem_Element = $('.Navigation__item');
    emptyItem_Element = function() {
      var result = $(navigationItem_Element[0]).clone(),
        link = result.find('a');

      result.addClass('Navigation__item--empty');
      link.text('.');
      link.attr('href', 'javascript:void(0)');

      return result;
    };
    background_Element = $('.Background');

    handler = function() {
      var D = handlerParams;

      // Get blank spaces count for fix
      (function makeBaseNav() {
        var tmp, itemH = navigationItem_Element.outerHeight(),
          loopCheck, FRG = document.createDocumentFragment();

        self.temp.navigationSizing = true;

        if (navigationFrame_Element.outerHeight() > (itemH * navigationItem_Element.length)) {
          tmp = navigationFrame_Element.outerHeight() - (itemH * navigationItem_Element.length);
          tmp = tmp / itemH;
        } else {
          tmp = 4;
        }

        if (typeof D.cleaner === 'function') D.cleaner();

        for (loopCheck = 0; loopCheck < tmp; loopCheck++) {
          FRG.appendChild(emptyItem_Element()[0]);
        }

        navigationFrame_Element[0].insertBefore(FRG, $('.Navigation__frame')[0].children[0]);

        for (loopCheck = 0; loopCheck < tmp; loopCheck++) {
          FRG.appendChild(emptyItem_Element()[0]);
        }

        navigationFrame_Element[0].appendChild(FRG);

        if (typeof D.centerize === 'function') D.centerize();

        navigationItemWithSpace_Element = $('.Navigation__item');

        self.temp.navigationSizing = false;
      })();
    };

    handlerParams.cleaner = function cleaner() {
      navigationFrame_Element.empty();
      navigationFrame_Element.append(navigationItem_Element);
    };
    handlerParams.centerize = function centerize() {
      // Set scroll on center
      var position = (function() {
        var r, itemsHeight = navigationItem_Element.outerHeight() * navigationItem_Element.length;

        r = navigationItem_Element[0].offsetTop;

        if (self.temp.displayHeight > itemsHeight) {
          r = r - ((navigationFrame_Element.outerHeight() - itemsHeight) / 2);
        } else {
          r = r - (navigationItem_Element.outerHeight() * 1.5);
        }

        return r;
      })();

      navigationFrame_Element.scrollTop(position);
    };

    $(window).resize(handler);

    handler();

    // Movement effect
    navigationFrame_Element.on('scroll', function() {
      var source;

      if (self.temp.navigationSizing) return false;

      if (this.scrollTop < navigationItem_Element.outerHeight()) {
        navigationFrame_Element.prepend(navigationItemWithSpace_Element.clone());
      } else if (this.scrollTop + navigationFrame_Element.outerHeight() > navigationFrame_Element[0].scrollHeight - navigationItem_Element.outerHeight()) {
        navigationFrame_Element.append(navigationItemWithSpace_Element.clone());
      }

      // Change background base on scroll
      if (background_Element.hasClass('Background--show')) {
        if (scrollPos > navigationFrame_Element.scrollTop()) {
          background_Element.removeClass('Background--reverse');
        } else if (scrollPos < navigationFrame_Element.scrollTop()) {
          background_Element.addClass('Background--reverse');
        }
      }

      // Cache scroll position
      scrollPos = navigationFrame_Element.scrollTop();
    });
  });

  // Navigation controller
  self.route.parser.add('', function Navigation_Route() {
    self.route.controller = 'navigation';

    function enter() {
      // enter
      if (!navigation_Element.hasClass('Navigation--show'))
        navigation_Element.addClass('Navigation--show');
      if (!background_Element.hasClass('Background--show'))
        setTimeout(function() {
          background_Element.addClass('Background--show');
        }, 800);
    }

    // Make previews view disapear
    if (self.route.controllerCache) {
      if (self.route.controller !== self.route.controllerCache) {
        self.activity.get(self.route.controllerCache).details.activation.off(function() {
          enter();
        });
      }
    } else {
      enter();
    }
  });

  // Before quit
  self.addEventListener('Route', 'Change', function NavigationQuit(R) {
    // console.log(this.route.controllerCache)
  });
}).call(Enviroment);

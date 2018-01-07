/* eslint-disable */



(function () {
  var navigation_Element, navigationFrame_Element, navigationItem_Element, emptyItem_Element, navigationFrameWithSpace_Element

  Enviroment.temp.navigationCentering = false

  Enviroment.addEventListener('DOM', 'Complete', function NavigationElementFetching () {
    var handler, handlerParams = Object.create(null)

    navigation_Element = $('.Navigation')
    navigationFrame_Element = $('.Navigation__frame')
    navigationItem_Element = $('.Navigation__item')
    emptyItem_Element = function () {
      var result = $(navigationItem_Element[0]).clone()

      result.addClass('Navigation__item--empty')
      result.text('.')

      return result
    }

    handler = function () {
      var D = handlerParams

      // D for cache data
      if (typeof D !== 'object') D = Object.create(null);

      // Get blank spaces count for fix
      (function makeBaseNav () {
        var tmp, itemH = navigationItem_Element.outerHeight(),
          loopCheck, FRG = document.createDocumentFragment()

        if (navigationFrame_Element.outerHeight() > (itemH * navigationItem_Element.length)) {
          tmp = navigationFrame_Element.outerHeight() - (itemH * navigationItem_Element.length)
          tmp = tmp / itemH
        } else {
          tmp = 4
        }

        if (typeof D.cleaner === 'function') D.cleaner()

        for (loopCheck = 0; loopCheck < tmp; loopCheck++) {
          FRG.appendChild(emptyItem_Element()[0])
        }

        navigationFrame_Element[0].insertBefore(FRG, $('.Navigation__frame')[0].children[0])

        for (loopCheck = 0; loopCheck < tmp; loopCheck++) {
          FRG.appendChild(emptyItem_Element()[0])
        }

        navigationFrame_Element[0].appendChild(FRG)

        if (typeof D.centerize === 'function') D.centerize()

        navigationFrameWithSpace_Element = $('.Navigation__item')
      })();
    };

    handlerParams.cleaner = function cleaner () {
      navigationFrame_Element.empty()
      navigationFrame_Element.append(navigationItem_Element)
    }
    handlerParams.centerize = function centerize () {
      Enviroment.temp.navigationCentering = true

      // Set scroll on center
      var position = (function () {
        var r, itemsHeight = navigationItem_Element.outerHeight() * navigationItem_Element.length

        r = navigationItem_Element[0].offsetTop

        if (Enviroment.temp.displayHeight > itemsHeight) {
          r = r - ((navigationFrame_Element.outerHeight() - itemsHeight) / 2)
        } else {
          r = r - (navigationItem_Element.outerHeight() * 1.5)
        }

        return r
      })()

      navigationFrame_Element.scrollTop(position)

      Enviroment.temp.navigationCentering = false
    }

    $(window).resize(handler)

    handler()

    // Movement effect
    navigationFrame_Element.on('scroll', function () {

      if (Enviroment.temp.navigationCentering) return false

      if (this.scrollTop < navigationItem_Element.outerHeight()) {
        navigationFrame_Element.prepend(navigationFrameWithSpace_Element.clone())
      } else if (this.scrollTop + navigationFrame_Element.outerHeight() > navigationFrame_Element[0].scrollHeight - navigationItem_Element.outerHeight()) {
        navigationFrame_Element.append(navigationFrameWithSpace_Element.clone())
      }
    })
  })

  // Navigation controller
  Enviroment.route.parser.add('', function Navigation () {
    // enter
    navigation_Element.addClass('Navigation--show')
  })

  // Before quit
  Enviroment.addEventListener('Route', 'Change', function NavigationQuit (R) {
    navigation_Element.removeClass('Navigation--show')
  })
})()

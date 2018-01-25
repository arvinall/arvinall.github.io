/* eslint-disable */
var list_element, aC,
  fragment = document.createDocumentFragment();

// Booklet section
(function Booklet() {
  var self = this,
    activityOptions = {
      name: 'booklet',
      title: 'نبشته‌ها',
      loadChecker: [false, false],
      backTransaction: false,
      activation: Object.create(null)
    }, activity, MD = new showdown.Converter();

  // Apear and Disapear handler
  activityOptions.activation.on = (function bookletApear(cb) {
    this.activity.controllers.active.on(activityOptions.name, function() {
      this.controllers.background.on(function() {
        this.controllers.backBtn.on(function() {
          this.controllers.backBtn.arrow.on(function() {
            this.controllers.title.on(activityOptions.title, function() {
              this.controllers.template.on(function() {
                activityOptions.backTransaction = false;
                if (cb) cb();
              });
            });
          });
        });
      });
    });
  }).bind(self);
  activityOptions.activation.off = (function bookletDisapear(cb) {
    activityOptions.backTransaction = true;
    this.activity.controllers.backBtn.arrow.off(function() {
      this.controllers.backBtn.off(function() {
        this.controllers.template.off(function() {
          this.controllers.title.off(function() {
            this.controllers.background.off(function() {
              this.controllers.active.off(function() {
                activityOptions.backTransaction = false;
                if (cb) cb();
              });
            });
          });
        });
      });
    });
  }).bind(self);

  self.addEventListener('DOM', 'Complete', function BookletElementFetching() {
    // Add activity
    activity = this.activity.add(activityOptions)[activityOptions.name];

    // get main data and view
    (function mainData() {
      self.get.structure({name: activityOptions.name, success: function(result) {
        activity['data'] = result;
        self.loadChecker.apply(activityOptions.loadChecker, [0, activityOptions.name]);
      }});

      self.get.view({name: activityOptions.name, success: function(result) {
        activity['view'] = result;
        self.loadChecker.apply(activityOptions.loadChecker, [1, activityOptions.name]);
      }});
    })();
  });

  self.addEventListener('Activities', 'Load', function bookletOnLoad(Activity) {

    if (Activity.details.name === activityOptions.name) {
      aC = Enviroment.argController.bind(Enviroment.route);

      Activity.element.find('.Activity__template').html(Activity.view);

      // Make the list
      (function makeTheList() {
        var c;

        for (c = 0; c < this.data.length; c++) {
          fragment.append(
            $('<a href="' + location.protocol + '//' + location.host + '/#/' + activityOptions.name + '/' + this.data[c].enName.camelize() + '"></a>').
            append($('<li class="Booklet__listItem">' + this.data[c].faName + '</li>'))[0]
          );
        }

        if (list_element === undefined) {
          list_element = $('.Booklet__list ul');
        }

        list_element[0].appendChild(fragment);

      }).call(Activity);
      // Make the slider
      (function slider() {
        var sliderFrame_Element = $('.Activity__sliderFrame'), slideElementMaker = function (options) {
          var aC = self.argController.bind(options);

          return (function () {
            var slide = $(sliderFrame_Element[0].children[0]).clone();

            if (!aC('id', 'number')) {
              slide[0].dataset['id'] = options.id.toString();
            }

            if (!aC('enName')) {
              slide[0].dataset['name'] = options.enName;
            }

            if (!aC('faName')) {
              slide.find('h2').text(options.faName);
            }

            return slide
          })();
        }, c;

        for (c = 0; c < this.data.length; c++) {
          fragment.append(slideElementMaker(this.data[c])[0])
        }


        sliderFrame_Element.empty()
        sliderFrame_Element[0].appendChild(fragment)

        sliderFrame_Element.css('width', (100 * Activity.data.length) + '%')
      }).call(Activity);

      Activity.controllers.loader.off();
    }
  });

  self.route.parser.add('booklet/:enName', function Booklet_Route() {
    self.route.controller = activityOptions.name;

    activity.activation({
      name: activityOptions.name
    });

    if (aC('enName')) {
      $('.Activity[data-name="' + activityOptions.name + '"] .Activity__slider').removeClass('Activity__slider--show');
      $('.Booklet__list').removeClass('Booklet__list--hide');
      self.route.setPrevUrl('');
      if (self.route.controllerCache) {
        if (self.route.controllerCache === 'navigation') {
          activityOptions.activation.on()
        } else
        if (self.route.controllerCache !== self.route.controller) {
          self.activity.get(self.route.controllerCache).activation.off(function() {
            activityOptions.activation.on();
          });
        } else {
          if (self.activity.active === activityOptions.name) {

          } else {
            activityOptions.activation.on()
          }
        }
      } else {
        activityOptions.activation.on();
      }
    } else {
      self.route.setPrevUrl(activityOptions.name);
      if (self.activity.active !== activityOptions.name) {
        activityOptions.activation.on(function () {
          $('.Booklet__list').addClass('Booklet__list--hide');
        });
      } else {
        $('.Booklet__list').addClass('Booklet__list--hide');
      }


      self.activity.controllers.slider.active();

      $('.Activity[data-name="' + activityOptions.name + '"] .Activity__slider').addClass('Activity__slider--show');

      // Get markdown
      (function () {
        var markdownSelected = self.activity.get('booklet').data.find(function (E) {
          return E.enName === self.route.enName.titlize();
        });

        self.activity.controllers.slider.go(markdownSelected.id);

        self.get.resource({
          id: markdownSelected.id,
          type: 'markdown',
          success: function (R) {
            R = MD.makeHtml(R)
            $('.Activity__sliderSlide[data-name="' + markdownSelected.enName + '"] .Activity__sliderContent').html(R)
          }
        });
      })();
    }
  });

  self.addEventListener('Route', 'Change', function Booklet_Quit() {
    self.route.enName = null;
  });
}).call(Enviroment);

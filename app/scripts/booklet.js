/* eslint-disable */
var list_element, aC;

// Booklet section
(function Booklet() {
  var self = this,
    activityOptions = {
      name: 'booklet',
      title: 'نبشته‌ها',
      loadChecker: [false, false],
      backTransaction: false,
      activation: Object.create(null)
    }, activity;

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
    aC = Enviroment.argController.bind(Enviroment.route);

    Activity.element.find('.Activity__template').html(Activity.view);

    // Make the list
    (function makeTheList() {
      var fragment = document.createDocumentFragment(), c;

      for (c = 0; c < Activity.data.length; c++) {
        fragment.appendChild(
          $('<a href="' + location.protocol + '//' + location.host + '/#/' + activityOptions.name + '/' + Activity.data[c].enName.camelize() + '"></a>').
            append($('<li class="Booklet__listItem">' + Activity.data[c].faName + '</li>'))[0]
        );
      }

      if (list_element === undefined) {
        list_element = $('.Booklet__list ul');
      }

      list_element[0].appendChild(fragment);

    }).call(Activity);

    Activity.controllers.loader.off();
  });

  self.route.parser.add('booklet/:enName', function Booklet_Route() {
    self.route.controller = activityOptions.name;

    if (aC('enName')) {
      self.route.setPrevUrl('');
      if (self.route.controllerCache) {
        if (self.route.controllerCache === 'navigation') {
          activity.activation({
            name: activityOptions.name,
            callback: activityOptions.activation.on
          });
        } else
        if (self.route.controllerCache !== self.route.controller) {
          self.activity.get(self.route.controllerCache).activation.off(function() {
            activity.activation({
              name: activityOptions.name,
              callback: activityOptions.activation.on
            });
          });
        } else {
          if (self.activity.active === activityOptions.name) {
            self.activity.controllers.template.on();
          } else {
            activity.activation({
              name: activityOptions.name,
              callback: activityOptions.activation.on
            });
          }
        }
      } else {
        activity.activation({
          name: activityOptions.name,
          callback: activityOptions.activation.on
        });
      }
    } else {
      activityOptions.activation.on(function() {
        self.activity.controllers.template.off();
      });
      self.route.setPrevUrl(activityOptions.name);
    }
  });

  self.addEventListener('Route', 'Change', function Booklet_Quit() {
    self.route.enName = null;
  });
}).call(Enviroment);

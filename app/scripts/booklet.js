/* eslint-disable */

// Booklet section
(function Booklet () {
  var self = this,
    activityOptions = {
      name: 'booklet',
      title: 'نبشته‌ها',
      loadChecker: [false, false]
  }, activity

  self.addEventListener('DOM', 'Complete', function BookletElementFetching () {
    // Add activity
    activity = this.activity.add(activityOptions)[activityOptions.name];

    // get main data and view
    (function mainData () {
      self.get.structure({name: activityOptions.name, success: function (result) {
          activity['data'] = result
          self.loadChecker.apply(activityOptions.loadChecker, [0, activityOptions.name])
        }})

      self.get.view({name: activityOptions.name, success: function (result) {
          activity['view'] = result
          self.loadChecker.apply(activityOptions.loadChecker, [1, activityOptions.name])
        }})
    })()
  })

  self.addEventListener('Activities', 'Load', function bookletOnLoad (Activity) {
    Activity.controllers.loader.off()

    Activity.element.find('.Activity__template').html(Activity.view)
  })

  self.route.parser.add('booklet/:enName', function Booklet_Route () {
    self.route.controller = activityOptions.name

    Enviroment.activity.controllers.active.on(activityOptions.name, function () {
      this.controllers.background.on(function () {
        this.controllers.backBtn.on(function () {
          this.controllers.title.on(activityOptions.title)
        })
      })
    })
  })

  self.addEventListener('Route', 'Change', function Booklet_Quit (R) {
    if (self.route.controllerCache === activityOptions.name)
      self.activity.controllers.title.off(function () {
        this.controllers.backBtn.off(function () {
          this.controllers.background.off(function () {
            this.controllers.active.off()
          })
        })
      })
  })
}).call(Enviroment)

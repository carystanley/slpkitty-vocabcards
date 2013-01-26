YUI().use('app-base', 'model', 'view', 'handlebars', 'model-list', 'slider', 'item-model', 'item-modellist', 'exercise-model',  function (Y) {


  Y.SettingsView = Y.Base.create('settingsView', Y.View, [], {
    template: Y.Handlebars.compile(Y.one('#settings-template').getHTML()),

    events: {
      '#settings_submit': {click: 'startExercise'}
    },

    render: function () {
      var name = this.get('name'),
          html = this.template({name: name})
          slider = new Y.Slider({
            axis: 'x',
            min: 1,
            max: 9,
            value: 4
          });

      this.get('container').setHTML(html);

      slider.on('valueChange', function(e) {
        this.set("value", e.newVal);
      }, this.get('container').one('#text_count'));
      slider.render(this.get('container').one('#slider_count'));

      return this;
    },

    startExercise: function() {
      var count = this.get('container').one('#text_count').get("value");
      this.fire('start', {count: count});
      return false;
    }
  });

  Y.ExerciseView = Y.Base.create('exerciseView', Y.View, [], {
    events: {
      '.exercise div': {click: 'chooseItem'}
    },

    template: Y.Handlebars.compile(Y.one('#exercise-template').getHTML()),

    initializer: function () {
      var model = this.get('model');
      model.after(['reset', 'progressChange'], this.render, this);
    },

    render: function () {
      var exercise = this.get('model'),
          item = exercise.getCurrentItem(),
          set = this.get('model').getCurrentProblem(),
          html;

      if (!this.get('model').get('finished')) {
        html = this.template({item: item.toJSON(), set: set.toJSON()});
        this.get('container').setHTML(html);
      }
      return this;
    },

    chooseItem: function(e) {
      var node = e.currentTarget,
          item_id = node.getAttribute('data-id'),
          exercise = this.get('model');

      if (exercise.makeGuess(item_id)) {
        this.handleCorrect(node);
      } else {
        this.handleWrong(node);
      }
    },

    handleWrong: function(node) {
      node.addClass('wrong');
    },

    handleCorrect: function(node) {
      node.addClass('correct');
      Y.later(300, this, function() {
        this.get('model').nextProblem();
      });
    }
  });

  var app = new Y.App({
    container    : '#wrapper',
    viewContainer: '#wrapper',
    views: {
      settings: {type: 'SettingsView', preserve: true},
      exercise: {type: 'ExerciseView', preserve: false}
    }
  });

  app.set('navigateOnHash', true);

  app.route('/speech/', function () {
    this.showView('settings');
  });

  app.route('/speech/exercise/:count/', function (req) {
    var self = this,
        name = req.params.name,
        exercise = new Y.ExerciseModel({count: req.params.count});

    exercise.on('finished', function() {
      self.navigate('/speech/');
    });
    this.showView('exercise', {name: name, model: exercise})
  });

  app.on('*:start', function(e) {
    this.navigate('/speech/exercise/'+e.count+'/');
  });

  app.render().dispatch().navigate('/speech/');

});
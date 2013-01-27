YUI().use('app-base', 'item-model', 'item-modellist', 'exercise-model', 'settings-view', 'exercise-view',  'categories', function (Y) {

  var app = new Y.App({
    container    : '#wrapper',
    viewContainer: '#wrapper',
    views: {
      settings: {type: 'SettingsView', preserve: true},
      exercise: {type: 'ExerciseView', preserve: false}
    }
  });

  app.route('/speech/', function () {
    this.showView('settings');
  });

  app.route('/speech/exercise/', function (req) {
    var self = this
        exercise = this.get('exercise');

    exercise.on('finished', function() {
      self.navigate('/speech/');
    });
    this.showView('exercise', {name: name, model: exercise})
  });

  app.on('*:start', function(e) {
    this.set('exercise', new Y.ExerciseModel({
      count: e.count,
      items: Y.Categories[e.category]
    }));
    this.navigate('/speech/exercise/');
  });

  app.render().dispatch().navigate('/speech/');

});
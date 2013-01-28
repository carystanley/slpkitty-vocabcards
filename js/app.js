YUI().use('app-base', 'item-model', 'item-modellist', 'exercise-model', 'settings-view', 'exercise-view',  'categories', function (Y) {

  var app = new Y.App({
    container    : '#wrapper',
    viewContainer: '#wrapper',
    views: {
      settings: {type: 'SettingsView', preserve: true},
      exercise: {type: 'ExerciseView', preserve: false}
    }
  });

  app.route('/slpkitty-vocabcards/', function () {
    this.showView('settings');
  });

  app.route('/slpkitty-vocabcards/exercise/', function (req) {
    var self = this
        exercise = this.get('exercise');

    exercise.on('finished', function() {
      self.navigate('/slpkitty-vocabcards/');
    });
    this.showView('exercise', {name: name, model: exercise})
  });

  app.on('*:start', function(e) {
    this.set('exercise', new Y.ExerciseModel({
      count: e.count,
      items: Y.Categories[e.category]
    }));
    this.navigate('/slpkitty-vocabcards/exercise/');
  });

  app.render().dispatch().navigate('/slpkitty-vocabcards/');

});

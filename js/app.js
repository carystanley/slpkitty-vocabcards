YUI().use('app-base', 'item-model', 'item-modellist', 'exercise-model', 'settings-view', 'exercise-view',  function (Y) {

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
        exercise = new Y.ExerciseModel({count: parseInt(req.params.count, 10)});

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
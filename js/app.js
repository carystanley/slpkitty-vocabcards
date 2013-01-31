YUI.add('speech-app', function (Y, NAME) {
  Y.SpeechApp = Y.Base.create('speech-app', Y.App, [], {

    views: {
      settings: {type: 'SettingsView', preserve: true},
      exercise: {type: 'ExerciseView', preserve: false}
    },

    initializer: function () {
	  this.on('*:start', this.startExercise);
    },

    startExercise: function(e) {
      this.set('exercise', new Y.ExerciseModel({
        count: e.count,
          items: Y.Categories[e.category]
        }));
      this.navigate('/slpkitty-vocabcards/exercise/');
    },

    showExercise: function (req) {
      var self = this
          exercise = this.get('exercise');

      exercise.on('finished', function() {
        self.navigate('/slpkitty-vocabcards/');
      });
      this.showView('exercise', {name: name, model: exercise})
    },

    showSettings: function () {
      this.showView('settings');
    }

  }, {
    ATTRS: {
      routes: {
        value: [
          {path: '/slpkitty-vocabcards/', callbacks: 'showSettings'},
          {path: '/slpkitty-vocabcards/exercise/', callbacks: 'showExercise'}
        ]
      }
    }
  });

}, '0.0.2', {
    requires : [
        'app-base', 'item-model', 'item-modellist', 'exercise-model', 'settings-view', 'exercise-view',  'categories'
    ]
});

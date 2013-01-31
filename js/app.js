YUI.add('speech-app', function (Y, NAME) {
  Y.SpeechApp = Y.Base.create('speech-app', Y.App, [], {

    views: {
      settings: {type: 'SettingsView', preserve: true},
      exercise: {type: 'ExerciseView', preserve: false}
    },

    initializer: function () {
      this.on('*:start', this.startExercise);
      this.on('*:finished', this.showSettings);
    },

    startExercise: function(e) {
      this.set('exercise', new Y.ExerciseModel({
        count: e.count,
          items: Y.Categories[e.category]
        }));
      this.navigate('/slpkitty-vocabcards/exercise/');
    },

    showExercise: function (req) {
      this.showView('exercise', {name: name, model: this.get('exercise')})
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

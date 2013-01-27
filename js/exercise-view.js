YUI.add('exercise-view', function (Y, NAME) {

  Y.ExerciseView = Y.Base.create('exercise-view', Y.View, [], {
    events: {
      '.exercise div': {click: 'chooseItem'}
    },

    template: Y.Handlebars.compile(Y.one('#exercise-template').getHTML()),

    correctAudio: Y.Audio.create({baseUrl: 'audio/woohoo', format: ['wav']}),
    wrongAudio: Y.Audio.create({baseUrl: 'audio/sound96', format: ['wav']}),

    initializer: function () {
      var model = this.get('model');
      model.after(['reset', 'progressChange'], this.render, this);
    },

    render: function () {
      var exercise = this.get('model'),
          problem = this.get('model').getCurrentProblem(),
          html;

      if (!this.get('model').get('finished')) {
        html = this.template({problem: problem.toJSON()});
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
      this.wrongAudio.invoke('play');
    },

    handleCorrect: function(node) {
      node.addClass('correct');
      this.correctAudio.invoke('play');
      Y.later(300, this, function() {
        this.get('model').nextProblem();
      });
    }
  });



}, '0.0.2', {
    requires : [
        'view', 
        'handlebars',
        'exercise-model',
        'item-model',
        'gallery-audio'
    ]
});
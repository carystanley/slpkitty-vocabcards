YUI.add('exercise-model', function (Y, NAME) {

  Y.ExerciseModel = Y.Base.create('exercise-model', Y.Model, [], {

    initializer: function(config) {
       var x,
           count = config.count,
           category = this.get('items'),
           problems = new Y.ModelList();

       for (x = 0; x < category.size(); x++) {
         problems.add(new Y.ProblemModel({
           position: x,
           item: category.item(x),
           count: count,
           category: category
         }));
       }
       this.set('problems', problems);
    },

    nextProblem: function () {
      var pos = this.get('progress');
      if (pos+1 >= this.get('problems').size()) {
        this.set('finished', true);
        this.fire('finished');
      }
      this.set('progress', pos + 1);
    },

    makeGuess: function(item) {
      return this.getCurrentProblem().makeGuess(item);
    },

    getCurrentProblem: function() {
      var progress = this.get('progress'),
          problem = null;

      if (!this.get('finished')) {
        return this.get('problems').item(progress);
      }

      return problem;
    }

  }, {
    ATTRS: {
      progress: {
        value: 0 // default value
      },

      count: {
        value: 4 // default value
      },

      items: {
        value: Y.Categories['food']
      },

      problems: {
        value: null
      },

      current: {
        value: null
      },

      finished: {
        value: false
      }
    }
  });


}, '0.0.2', {
    requires : [
        'model',
        'model-list',
        'item-model',
        'item-modellist',
        'problem-model',
        'gallery-audio',
        'categories'
    ]
});
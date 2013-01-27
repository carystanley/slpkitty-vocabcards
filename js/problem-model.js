YUI.add('problem-model', function (Y, NAME) {

  Y.ProblemModel = Y.Base.create('problem-model', Y.Model, [], {

    initializer: function(config) {
      var map,
          x,
          pos = config.position,
          category = config.category,
          problem = new Y.ItemList();

      map = this._generateProblem(pos, config.count, category.size());
      for (x = 0; x < map.length ; x++) {
        problem.add(category.item(map[x]));
      }
      this.set('problem', problem);
    },

    makeGuess: function(item) {
      return (this.get('item').get('id') == item);
    },

    toJSON: function() {
      return {
        item: this.get('item').toJSON(),
        problem: this.get('problem').toJSON(),
        score: this.get('score')
      };
    },

    _generateProblem: function(item, count, total) {
      var x, set = [];
      for (x=0; x<total; x++) {
        if (x != item) {
          set.push(x);
        }
      }
      set = this._shuffle(set);
      set = set.slice(0,count-1);
      set.push(item);
      set = this._shuffle(set);
      return set;
    },

    _shuffle: function(array) {
      var tmp, current, top = array.length;

      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }

      return array;
    }
  }, {
    ATTRS: {
      problem: {
        value: null
      },

      category: {
        value: null
      },

      item: {
        value: null
      },

      score: {
        value: null
      }
    }
  });

}, '0.0.2', {
    requires : [
        'model'
    ]
});
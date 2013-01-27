YUI.add('problem-model', function (Y, NAME) {

  Y.ProblemModel = Y.Base.create('problem-model', Y.Model, [], {

    initializer: function(config) {
      var map,
          x,
          pos = config.position,
          category = config.category,
          choices = new Y.ItemList();

      map = this._generateProblem(pos, config.count, category.size());
      for (x = 0; x < map.length ; x++) {
        choices.add(category.item(map[x]));
      }
      this.set('choices', choices);
    },

    makeGuess: function(item) {
      var isCorrect = (this.get('item').get('id') == item);
      if (!isCorrect) this.set('misses', this.get('misses'))
      return isCorrect;
    },

    toJSON: function() {
      return {
        item: this.get('item').toJSON(),
        choices: this.get('choices').toJSON(),
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
      choices: {
        value: null
      },

      category: {
        value: null
      },

      item: {
        value: null
      },

      misses: {
        value: 0
      }
    }
  });

}, '0.0.2', {
    requires : [
        'model'
    ]
});
YUI.add('item-modellist', function (Y, NAME) {

  Y.ItemList = Y.Base.create('item-modellist', Y.ModelList, [], {
    model: Y.ItemModel,

    generateProblem: function (pos, count) {
      var map,
          x, 
          problem = new Y.ItemList();

      map = this._generateProblem(pos, count, this.size());
      for (x = 0; x < map.length ; x++) {
        problem.add(this.item(map[x]));
      }
      return problem;
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
  });

}, '0.0.2', {
    requires : [
        'model-list',
        'item-model'
    ]
});
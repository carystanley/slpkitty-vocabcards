YUI.add('exercise-model', function (Y, NAME) {

  Y.ExerciseModel = Y.Base.create('exercise-model', Y.Model, [], {

    nextProblem: function () {
      var pos = this.get('progress');
      if (pos+1 >= this.get('items').size()) {
        this.set('finished', true);
        this.fire('finished');
      }
      this.set('current', null);
      this.set('progress', pos + 1);
    },

    makeGuess: function(item) {
      return (this.getCurrentItem().get('id') == item);
    },

    getCurrentItem: function() {
      return this.get('items').item(this.get('progress'));
    },

    getCurrentProblem: function() {
      var problem = this.get('current');

      if (!problem && !this.get('finished')) {
        problem = this.get('items').generateProblem(this.get('progress'), this.get('count'));
        this.set('current', problem)
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
        value: new Y.ItemList({
          items: [
            new Y.ItemModel({id: 'apple', label: 'Apple', image: 'imgs/apple.svg'}),
            new Y.ItemModel({id: 'carrot', label: 'Carrot', image: 'imgs/carrot.svg'}),
            new Y.ItemModel({id: 'milk', label: 'Milk', image: 'imgs/milk.svg'}),
            new Y.ItemModel({id: 'bread', label: 'Bread', image: 'imgs/bread.svg'}),
            new Y.ItemModel({id: 'banana', label: 'Banana', image: 'imgs/banana.svg'}),
            new Y.ItemModel({id: 'orange', label: 'Orange', image: 'imgs/orange.svg'})
          ]
        })
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
        'item-model',
        'item-modellist'
    ]
});
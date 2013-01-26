/*
ToDo:

* Add image and other meta data to ItemModel
* Ability to do Audio prompt
* Different Prompt Config
* Have Settings View to setup the config for exercises
  * http://yuilibrary.com/yui/docs/slider/
* CSS Styling of Exercises
* Responsive CSS Styling of Exercises
* Score Screen?

* Refactor JS code
* Have YUI Seed
* Manifest File (http://www.html5rocks.com/en/tutorials/appcache/beginner/)
*/

YUI().use('app-base', 'model', 'view', 'handlebars', 'model-list', function (Y) {

  Y.ItemModel = Y.Base.create('itemModel', Y.Model, [], {
  }, {
    ATTRS: {
      id: {
        value: null
      },

      image: {
        value: null
      },

      label: {
        value: null
      },

      audio: {
        value: null
      }
    }
  });

  Y.ItemList = Y.Base.create('itemList', Y.ModelList, [], {
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

  Y.ExerciseModel = Y.Base.create('exerciseModel', Y.Model, [], {

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
            new Y.ItemModel({id: 'apple', label: 'Apple'}),
            new Y.ItemModel({id: 'carrot', label: 'Carrot'}),
            new Y.ItemModel({id: 'milk', label: 'Milk'}),
            new Y.ItemModel({id: 'bread', label: 'Bread'}),
            new Y.ItemModel({id: 'banana', label: 'Banana'}),
            new Y.ItemModel({id: 'orange', label: 'Orange'})
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

  Y.HomeView = Y.Base.create('homeView', Y.View, [], {
    template: Y.Handlebars.compile('Speech'),

    render: function () {
      var name = this.get('name'),
          html = this.template({name: name});

      this.get('container').setHTML(html);
      return this;
    }
  });

  Y.ExerciseView = Y.Base.create('exerciseView', Y.View, [], {
    events: {
      '.exercise div': {click: 'chooseItem'}
    },

    template: Y.Handlebars.compile('Choose {{item.label}}: <div class="exercise">{{#each set}}<div data-id="{{id}}" class="item">{{label}}</div>{{/each}}</div>'),

    initializer: function () {
      var model = this.get('model');
      model.after(['reset', 'progressChange'], this.render, this);
    },

    render: function () {
      var exercise = this.get('model'),
          item = exercise.getCurrentItem(),
          set = this.get('model').getCurrentProblem(),
          html;

      if (!this.get('model').get('finished')) {
        html = this.template({item: item.toJSON(), set: set.toJSON()});
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
    },

    handleCorrect: function(node) {
      node.addClass('correct');
      Y.later(300, this, function() {
        this.get('model').nextProblem();
      });
    }
  });

  var app = new Y.App({
    container    : '#wrapper',
    viewContainer: '#wrapper',
    views: {
      home: {type: 'HomeView', preserve: true},
      exercise: {type: 'ExerciseView', preserve: true}
    }
  });

  app.route('/speech/home', function () {
    this.showView('home', {name: 'Home'});
  });

  app.route('/speech/', function (req) {
    var self = this,
        name = req.params.name,
        exercise = new Y.ExerciseModel();

    exercise.on('finished', function() {
      self.navigate('/speech/home');
    });
    this.showView('exercise', {name: name, model: exercise})
  });

  app.render().dispatch();

});
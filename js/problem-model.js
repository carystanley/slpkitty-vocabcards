YUI.add('problem-model', function (Y, NAME) {

  Y.ProblemModel = Y.Base.create('problem-model', Y.Model, [], {
  }, {
    ATTRS: {
      item: {
        value: null
      },

      set: {
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
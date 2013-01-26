YUI.add('item-model', function (Y, NAME) {

  Y.ItemModel = Y.Base.create('item-model', Y.Model, [], {
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

}, '0.0.2', {
    requires : [
        'model'
    ]
});
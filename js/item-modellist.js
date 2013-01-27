YUI.add('item-modellist', function (Y, NAME) {

  Y.ItemList = Y.Base.create('item-modellist', Y.ModelList, [], {
    model: Y.ItemModel,
  });

}, '0.0.2', {
    requires : [
        'model-list',
        'item-model'
    ]
});
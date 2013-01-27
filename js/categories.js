YUI.add('categories', function (Y, NAME) {

  Y.Categories = {
    food: new Y.ItemList({
      items: [
        new Y.ItemModel({id: 'apple', label: 'Apple', image: 'imgs/apple.svg'}),
        new Y.ItemModel({id: 'carrot', label: 'Carrot', image: 'imgs/carrot.svg'}),
        new Y.ItemModel({id: 'milk', label: 'Milk', image: 'imgs/milk.svg'}),
        new Y.ItemModel({id: 'bread', label: 'Bread', image: 'imgs/bread.svg'}),
        new Y.ItemModel({id: 'banana', label: 'Banana', image: 'imgs/banana.svg'}),
        new Y.ItemModel({id: 'orange', label: 'Orange', image: 'imgs/orange.svg'})
      ]
    })
  };

}, '0.0.2', {
    requires : [
        'model'
    ]
});
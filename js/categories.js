YUI.add('categories', function (Y, NAME) {

  Y.Categories = {
    food: new Y.ItemList({
      items: [
        {id: 'apple', label: 'Apple', image: 'imgs/apple.svg'},
        {id: 'carrot', label: 'Carrot', image: 'imgs/carrot.svg'},
        {id: 'milk', label: 'Milk', image: 'imgs/milk.svg'},
        {id: 'bread', label: 'Bread', image: 'imgs/bread.svg'},
        {id: 'banana', label: 'Banana', image: 'imgs/banana.svg'},
        {id: 'orange', label: 'Orange', image: 'imgs/orange.svg'}
      ]
    })
  };

}, '0.0.2', {
    requires : [
        'model'
    ]
});
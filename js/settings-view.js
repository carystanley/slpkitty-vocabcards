YUI.add('settings-view', function (Y, NAME) {

  Y.SettingsView = Y.Base.create('settings-view', Y.View, [], {
    template: Y.Handlebars.compile(Y.one('#settings-template').getHTML()),

    events: {
      '#settings_submit': {click: 'startExercise'}
    },

    render: function () {
      var name = this.get('name'),
          html = this.template({categories: Object.keys(Y.Categories)})
          slider = new Y.Slider({
            axis: 'x',
            min: 1,
            max: 9,
            value: 4
          });

      this.get('container').setHTML(html);

      slider.on('valueChange', function(e) {
        this.set("value", e.newVal);
      }, this.get('container').one('#text_count'));
      slider.render(this.get('container').one('#slider_count'));

      return this;
    },

    startExercise: function() {
      var container = this.get('container');
      this.fire('start', {
        count: container.one('#text_count').get("value"), 
        category: container.one('#category').get("value")
      });
      return false;
    }
  });


}, '0.0.2', {
    requires : [
        'view',
        'slider',
        'handlebars',
        'categories'
    ]
});
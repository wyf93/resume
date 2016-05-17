define(['utils'], function (Utils) {

  function render(params) {
    var template = $$('#profileTemplate').html();
    var compiledTemplate = Template7.compile(template);
    var renderTemplate = compiledTemplate({model: params.model});

    $$('#profileContent').html(renderTemplate);
    Utils.bindEvents(params.bindings);
  }

  return {
    render: render
  }
})

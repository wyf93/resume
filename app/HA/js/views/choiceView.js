define(['utils'], function (Utils) {
  function render(params) {
    var template = $$('#choiceTemplate').html();
    var compiledTemplate = Template7.compile(template);
    var renderTemplate = compiledTemplate({model: params.model});

    $$('#choiceContent').html(renderTemplate);
    Utils.bindEvents(params.bindings);
  }

  return {
    render: render
  }
})

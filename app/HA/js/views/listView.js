define(['utils'], function (Utils) {

  function render(params) {
    var template = $$('#listTemplate').html();
    var compiledTemplate = Template7.compile(template);
    var renderTemplate = compiledTemplate({model: params.model });

    $$('#listContent').html(renderTemplate);
  }

  return {
    render: render
  };
});

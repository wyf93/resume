define(['utils'], function () {

  function render(params) {
    var template = $$('#infoConfirmTemplate').html();
    var compiledTemplate = Template7.compile(template);
    var renderTemplate = compiledTemplate({model: params.model});

    $$('#infoConfirmContent').html(renderTemplate);
  }

  return {
    render: render
  };
});

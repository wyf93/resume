define(['utils'], function (Utils) {

  function render(params) {
    var template = $$('#detail1Template').html();
    var comppiledTemplate = Template7.compile(template);
    var renderTemplate = comppiledTemplate({model: params.model});

    $$('#detail1Content').html(renderTemplate);
  }

  return {
    render: render
  };
});

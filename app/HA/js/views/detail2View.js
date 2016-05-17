define(['utils'], function (Utils) {

  function render(params) {
    var template = $$('#detail2Template').html();
    var comppiledTemplate = Template7.compile(template);
    var renderTemplate = comppiledTemplate({model: params.model});

    $$('#detail2Content').html(renderTemplate);
  }

  return {
    render: render
  };
});

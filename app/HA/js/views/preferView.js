define(['utils'], function (Utils) {

  function render(params) {
    var template = $$('#preferTemplate').html();
    var compiledTemplate = Template7.compile(template);
    var renderTemplate = compiledTemplate({model: params.model});

    $$('#preferContent').html(renderTemplate);
    Utils.bindEvents(params.bindings);
    Utils.setButtonPosition('.prefer-submit-button');
  }

  // function renderPopup(params) {
  //  var compiledTemplate = Template7.compile(riskPopupTemplate);
  //  var renderTemplate = compiledTemplate({model: params.model});

  //  $$('.popup').html(renderTemplate);
  //  Utils.bindEvents(params.bindings);
  // }

  return {
    render: render
    // renderPopup: renderPopup
  };
});

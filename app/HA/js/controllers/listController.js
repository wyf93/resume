define(['views/listView'], function (View) {

  function init() {
    haApp.showIndicator();
    $$.ajax({
      url: 'api/info.json',
      type: 'GET',
      success: function (data) {
        data = JSON.parse(data);
        if (data.errorNo === 0) {
          var model = data.model;
          View.render({
            model: model
          });
        }
        haApp.hideIndicator();
        $$('.card-after em').each(function () {
          if ($$(this).text() === '已开通') {
            $$(this).addClass('success');
          }
        });
      }
    });
  }

  return {
    init: init
  };
});

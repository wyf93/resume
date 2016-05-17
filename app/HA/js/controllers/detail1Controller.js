define(['views/detail1View'], function (View) {

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
        $$('.contact').click(function () {
          haApp.modal({
            title: '',
            text: '<div style="font-size: 16px;">0571-9888798</div>',
            buttons: [{
              text: '取消',
            }, {
              text: '呼叫'
            }]
          });
        });
      }
    });
  }

  return {
    init: init
  };
});

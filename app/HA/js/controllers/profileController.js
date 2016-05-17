define(['views/profileView'], function (View) {
  var bindings = [{
    element: '#profileContent .button',
    event: 'click',
    handler: nextPage
  }, {
    element: '.contact',
    event: 'click',
    handler: contactUs
  }];
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
            model: model,
            bindings: bindings
          });
          haApp.hideIndicator();
        }
      }
    });
  }

  function contactUs() {
    haApp.modal({
      title: '',
      text: '<div style="font-size: 16px;">0571-9888798</div>',
      buttons: [{
        text: '取消',
      }, {
        text: '呼叫'
      }]
    })
  }

  function nextPage() {
    if (validateProfile()) {
      haApp.modal({
        title: '',
        text: '<div>您的个人资料不完整，请联系客服处理</div>',
        buttons: [{
          text: '确定'
        }]
      });
    } else if (!$$('.agree-block input').prop('checked')) {
      haApp.modal({
        title: '',
        text: '<div>请勾选确认以上信息准确</div>',
        buttons: [{
          text: '确定'
        }]
      });
    } else {
      mainView.loadPage('risk.html');
    }
  }

  function validateProfile() {
    var flag = false;
    $$('.list-block .item-after').each(function () {
      if ($$(this).text() === ''||$$(this).find('span').text() === '') {
        flag = true;
        return;
      }
    });

    return flag;
  }

  return {
    init:init
  };
});

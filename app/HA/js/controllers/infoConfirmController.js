define(['views/infoConfirmView'], function (View) {

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
        $$('#infoConfirmContent .button').click(function () {
          haApp.modal({
            title: '',
            text: '<div class="dlg-wrap" style="padding-left:40px;text-align:left;line-height:22px;"><i class="iconfont dlg-icon icon-success" style="vertical-align:middle;color:#80d51f;font-size:34px;margin-left:-40px;margin-right: 6px;"></i>您的申请已经提交，客服人员将在不久后与您电话沟通，请保持电话畅通。</div>',
            buttons: [{
              text: '确定',
              onClick: function () {
                haApp.modal({
                  title: '',
                  text: '<div class="dlg-wrap" style="padding-left:40px;text-align:left;line-height:22px;"><i class="iconfont dlg-icon icon-fail" style="vertical-align:middle;color:#d71e4a;font-size:34px;margin-left:-40px;margin-right: 6px;"></i>您的申请提交失败，请重试！</div>',
                  buttons: [{
                    text: '取消',
                  }, {
                    text: '确定',
                    onClick: function () {
                      mainView.loadPage('list.html');
                    }
                  }]
                })
              }
            }]
          });
        });
      }
    });
  }

  return {
    init: init
  }
})

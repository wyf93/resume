define(['views/choiceView'], function (View) {
  var bindings = [{
    element: '.tab1',
    event: 'click',
    handler: specialize
  }, {
    element: '.tab2',
    event: 'click',
    handler: regular
  }, {
    element: '#choiceContent .button',
    event: 'click',
    handler: nextPage
  }];

  function init() {
    haApp.showIndicator();
    $$.ajax({
      url: 'api/choice.json',
      success: function (data) {
        data = JSON.parse(data);
        if (data.errorNo === 0) {
          var model = data.model;
          View.render({
            model: model,
            bindings: bindings
          });
          haApp.hideIndicator();
          var picker1 = haApp.picker({
            input: '#picker-feeRate',
            rotateEffect: true,
            toolbarTemplate:
              '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                  '<div class="left">' +
                    '<a href="#" class="link close-picker" style="color:#000;">取消</a>' +
                  '</div>' +
                  '<div class="right">' +
                    '<a href="#" class="link close-picker">确定</a>' +
                  '</div>' +
                '</div>' +
              '</div>',
            cols: [{
              textAlign: 'center',
              values: model.feeRate
            }]
          });
          var counselor = model.counselor;
          var picker2 = haApp.picker({
            input: '#picker-counselor',
            rotateEffect: true,
            toolbarTemplate:
              '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                  '<div class="left">' +
                    '<a href="#" class="link close-picker" style="color:#000;">取消</a>' +
                  '</div>' +
                  '<div class="right">' +
                    '<a href="#" class="link close-picker">确定</a>' +
                  '</div>' +
                '</div>' +
              '</div>',
            formatValue: function (picker, values) {
              return values[1];
            },
            cols: [{
              textAlign: 'left',
              values: model.department,
              onChange: function (picker, depart) {
                if (picker.cols[1].replaceValues) {
                  picker.cols[1].replaceValues(counselor[depart]);
                }
              }
            }, {
              values: counselor['莫干山路营业部'],
              width: 160,
            }]
          });
          var picker3 = haApp.picker({
            input: '#picker-product',
            rotateEffect: true,
            toolbarTemplate:
              '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                  '<div class="left">' +
                    '<a href="#" class="link close-picker" style="color:#000;">取消</a>' +
                  '</div>' +
                  '<div class="right">' +
                    '<a href="#" class="link close-picker">确定</a>' +
                  '</div>' +
                '</div>' +
              '</div>',
            cols: [{
              textAlign: 'center',
              values: model.products
            }]
          });
          $$('#picker-product').change(function () {
            var productFee = model.productFee;
            for (var i = 0; i < productFee.length; i++) {
              if (productFee[i].name === $$(this).val()) {
                $$('#fee').text(productFee[i].fee);
                return;
              }
            }
          });

          //计算协议共计时间
          $$('#endDay').change(function () {
            var start = $$('#startDay').val();
            var end = $$('#endDay').val();
            var days = DateDiff(end, start);
            $$('#titleDays').text(days + '天');
          });
        }
      }
    })
  }

  function regular() {
    $$('.tab1').removeClass('choosen');
    $$('.tab2').addClass('choosen');
    $$('.fee-rate').hide();
    $$('.counselor').hide();
    $$('.product').show();
    $$('.title').show();
  }

  function specialize() {
    $$('.tab2').removeClass('choosen');
    $$('.tab1').addClass('choosen')
    $$('.fee-rate').show();
    $$('.counselor').show();
    $$('.product').hide();
    $$('.title').hide();
  }

  function unselected() {
    $$('.smart-select select').each(function () {
      this.selectedIndex = -1;
    });
  }

  //计算两个日期间的天数
  function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2015-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2015格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays;
  }

   function validate() {
    if ($$('.tab1').hasClass('choosen')) {
      if ($$('#picker-feeRate').val() === ''||$$('#picker-feeRate').val() === ''||$$('#startDay').val() === ''||$$('#endDay').val() === '') {
        return true;
      }
    } else {
      if ($$('#startDay').val() === ''||$$('#endDay').val() === '') {
        return true;
      } else {
        return false;
      }
    }
  }

  function nextPage() {
    if (validate()) {
      haApp.modal({
        title: '',
        text: '<p>请完成产品所有内容选择</p>',
        buttons: [{
          text: '确定'
        }]
      });
    } else {
      mainView.loadPage('infoConfirm.html');
    }
  }

  return {
    init: init
  };
});

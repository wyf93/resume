define(['views/riskView'], function (View) {
  var nextPage = 'prefer.html';

  var bindings = [{
    element: '.risk-submit-button',
    event: 'click',
    handler: resultSubmit
  }, {
    element: '.topic-option',
    event: 'click',
    handler: autoNext
  }];

  var navbar_height = $$('.navbar').outerHeight();

  function init() {
    haApp.showIndicator();
    $$.ajax({
      url: 'api/risk.json',
      type: 'GET',
      success: function (data) {
        data = JSON.parse(data);
        if (data.errorNo === 0) {
          var model = data.model;
          View.render({
            bindings: bindings,
            model: model
          });
          haApp.hideIndicator();
        }
      }
    });
  }

  /**
   * 滚动至对应的题目
   * @param  {Number|String} index 题目的序列号
   * @return {void}
   */
  function scrollToTopic(index) {
    var topic = $$('#topic_' + index);
    var offset = topic[0].offsetTop;
    var gutter = parseInt(topic.css('margin-top'), 10) + navbar_height;

    $$('#riskContent').scrollTop(offset - gutter, 200);
  }

  /**
   * 点击题目选项自动滚动到下一题
   * @return {void}
   */
  function autoNext() {
    var topic_length = $$('.topic-options').length
    var index = $$(this).data('index');

    if (index === 'multi') return; // 多选不滚动

    if (index == topic_length) {
      var nextBtn = $$('.risk-submit-button');
      var offset = nextBtn[0].offsetTop;
      var gutter = parseInt(nextBtn.css('margin-top'), 10) + navbar_height;

      $$('#riskContent').scrollTop(offset - gutter, 200);
    } else {
      var nextIndex = +index + 1;
      setTimeout((function (_this) {
        return function () {
          var checked = $$(_this).find('input:checked');
          if (checked.length > 0) {
            scrollToTopic(nextIndex);
          }
        };
      })(this), 200);
    }
  }

  /**
   * 检查题目是否做完
   * @return {Array} 未做完题目的序列号
   */
  function checkAll() {
    var result = [];

    $$('.topic-options').each(function (index) {
      var checked = $$(this).find('input:checked');
      if (checked.length === 0) {
        result.push(index + 1);
      }
    });

    return result;
  }

  /**
   * 格式化评测答案
   * @return {Object} 格式化后的数据
   */
  function formatAnswers() {
    // resultData 为 {question_no: value} 的 Object 组
    // value 可能为 String 类型（单选），也可能为数组（多选）
    var resultData = haApp.formToJSON('#riskForm');
    var resultArray = [];
    var answers;

    for (var i in resultData) {
      var _result;
      if (resultData[i] instanceof Array) {
        _result = i + '&' + resultData[i].join('^');
      } else {
        _result = i + '&' + resultData[i];
      }
      resultArray.push(_result);
    }

    // 最终格式为：question_no&value|question_no&value|question_no&value^&value...
    answers = resultArray.join('|');
    return answers;
  }

  function resultSubmit() {
    var errIndex = checkAll();

    if (errIndex.length > 0) {
      haApp.alert('第' + errIndex[0] + '道题没完成', function () {
        scrollToTopic(errIndex[0]);
      });
      return;
    }

    var answers = formatAnswers();

    mainView.loadPage(nextPage);
  }

  return {
    init: init
  };
});

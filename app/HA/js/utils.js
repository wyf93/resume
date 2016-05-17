define([], function () {

    /**
     * Bind DOM event to some handler function in controller
     * @param  {Array} bindings
     */
    function bindEvents(bindings) {
        if ($$.isArray(bindings) && bindings.length > 0) {
            for (var i in bindings) {
                if (bindings[i].live) {
                    $$('body').on(bindings[i].event, bindings[i].element, bindings[i].handler);
                } else {
                    $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
                }
            }
        }
    }

    /**
     * Set the position of buttons, which queried by selector, dynamic
     * @param {String} selector
     */
    function setButtonPosition(selector, binded) {
        var pageContent = $$(selector).parents('.page-content');
        if (isScroll(pageContent[0])) {
            $$(selector).removeClass('fixed-bottom');
        } else {
            $$(selector).addClass('fixed-bottom');
        }

        if (binded) return;

        // When window resizing(such as keyboard popup), button need to be reposition
        $$(window).on('resize', function () {
            setButtonPosition.call(this, selector, true);
        });
    }

    /**
     * Detect whether the element has scrollbar
     * @param  {HTMLElement}  elem
     * @return {Boolean}      true: has scrollbar; false: hasn't
     */
    function isScroll(elem) {
        return elem.scrollHeight > elem.clientHeight;
    }

    /**
   * 重新设置 document.body 的高度
   * 因为 body 的默认高度为 100%，在
   * Android 下会造成一些问题，比如：
   * 键盘弹起使得一些元素定位出错
   */
  function resetBodyHeight() {
    var windowHeight;

    if (localStorage.getItem('wh')) {
      windowHeight = JSON.parse(localStorage.getItem('wh'));
    } else {
      windowHeight = document.documentElement.clientHeight;
      localStorage.setItem('wh', windowHeight);
    }

    document.body.style.height = windowHeight + 'px';
  }


    return {
        bindEvents: bindEvents,
        setButtonPosition: setButtonPosition,
        resetBodyHeight: resetBodyHeight
    };
});

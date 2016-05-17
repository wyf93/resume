define(['GS'], function (GS) {

    /**
     * Init router, that handle page events
     */
    function init() {
        $$(document).on('pageBeforeInit', function (e) {
            var page = e.detail.page;
            // console.log(page);
            load(page.name, page.query);
        });

        // $$('.logout').on('click', GS.logout);
        // $$('.version').on('click', GS.checkUpdate);
    }

    /**
     * Load (or reload) controller from js code (another controller) - call it's init function
     * @param  controllerName
     * @param  query
     */
    function load(controllerName, query) {
      // 无 controllerName 则不加载 controller
      if (!controllerName) { return; }

      // 排除掉一些特殊的 page, 一般是 F7 自动生成的
      if (controllerName.indexOf('smart-select') !== -1) { return; }

      require(['controllers/' + controllerName + 'Controller'], function (controller) {
        controller.init(query);
      });
    }

    return {
        init: init,
        load: load
    };
});

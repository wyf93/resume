require.config({
  baseUrl: 'js',
  paths: {
    Framework7: 'libs/Framework7',
    GS: 'services/globalService',
  },
  shim: {
    Framework7: {
      exports: 'Framework7'
    }
  }
})
require(['Framework7', 'router', 'utils'], function (Framework7, Router, Utils) {
  window.$$ = window.Dom7;

  var device = Framework7.prototype.device;

  if (device.android) {
    window.haApp = new Framework7({
      animatePages: false,
      swipeout: false,
      sortable: false,
      cache: false,
      pushState: false,
      swipeBackPage: false,
      preloadPreviousPage: false,
      popupCloseByOutside: false,
      animateNavBackIcon: true,
      modalTitle: '系统消息',
      modalButtonOk: '确定',
      modalButtonCancel: '取消',
      smartSelectBackText: '返回',
      smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>'
    });
  } else {
    window.haApp = new Framework7({
      cache: false,
      pushState: false,
      swipeBackPage: false,
      preloadPreviousPage: false,
      popupCloseByOutside: false,
      animateNavBackIcon: true,
      modalTitle: '系统消息',
      modalButtonOk: '确定',
      modalButtonCancel: '取消',
      smartSelectBackText: '返回',
      smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>'
    });
  }

  window.mainView = haApp.addView('#mainView', {
    dynamicNavbar: true
  })

  // Android 下的一些常见 Hack
  if (device.android) {

    // 重设 body 高度，默认的高度为 100%，在 Android 下会有问题
    Utils.resetBodyHeight();

    // 防止在 Android 下 Smart Select 组件点击穿透
    $$('body').on('touchend', '.smart-select-page li', function (e) {
      e.stopPropagation();
    });
  }

  Router.init();

  mainView.loadPage('login.html');
})

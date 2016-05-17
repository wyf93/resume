define([], function () {
    var $CONFIG = null;
    init();

    function init() {
        if (!$CONFIG) {
            $CONFIG = {};
            $CONFIG.currentUser = {};

            if (localStorage.getItem('user')) {
                $CONFIG.currentUser = JSON.parse(localStorage.getItem('user'));
            }

            if (localStorage.getItem('sid')) {
                $CONFIG.currentUser.sid = localStorage.getItem('sid');
            }
        }
    }

    function getCurrentUser() {
        return $CONFIG.currentUser;
    }

    function getSid() {
        var m = $$.parseUrlQuery(window.location.href || '');
        return m.sid || localStorage.getItem('sid');
    }

    function setCurrentUser(sid, user) {
        $CONFIG.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('sid', sid);
    }

    function removeCurrentUser() {
        $CONFIG.currentUser = {};
        localStorage.removeItem('user');
        localStorage.removeItem('sid');
    }

    function isLogin() {
        if ($CONFIG.currentUser && localStorage.getItem('sid')) {
            return true;
        } else {
            return false;
        }
    }

    function logout() {
        wtApp.confirm('您确定要退出登录吗？', function () {
            var currentPage = $$('.page-on-center').data('page');
            removeCurrentUser();
            wtApp.closeModal();
            // wtApp.closePanel();
            if (currentPage === 'video') {
                clearTimeout(window.videoQueryTimer);
                console.log('quit video query successful');
            }
            mainView.loadPage(startPage);
        });
    }

    function checkUpdate() {
        wtApp.modal({
            title: '当前版本',
            text: window.appParams.version,
            buttons: [{
                text: '检测更新',
                onClick: function () {
                    wtApp.alert('您当前的版本已经是最新');
                }
            }, {
                text: '返回'
            }]
        });
    }

    /**
     * 判断是否登录，如果已登录，就跳转至目标页
     * 如果未登录，则弹出登录框，同时记录下跳转的 url 和 view
     * @param  {String} url
     * @param  {Object} view
     * @param  {Bool}   isAnimate
     */
    function wtLoadPage(url, view, isAnimate) {
        $$.ajax({
            type: 'GET',
            url: url,
            success: function (data) {
                // data = 'no login';
                if (data === 'no login') {
                    wtApp.loginScreen();
                    $$('.login-button').data('url', url);
                    $$('.login-button').data('view', view);
                } else {
                    view.loadContent({
                        content: data,
                        animatePages: wtApp.device.android ? false : isAnimate
                    });
                }
            }
        });
    }

    /**
     * 具体业务的跳转，也要先判断是否登录
     * 逻辑与 wtLoadPage 一样
     * 只是 view 默认为 mainView
     * @param  {String} url
     */
    function bLoadPage(url) {
        wtLoadPage(url, mainView, true);
    }

    return {
        getSid: getSid,
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser,
        removeCurrentUser: removeCurrentUser,
        isLogin: isLogin,
        logout: logout,
        checkUpdate: checkUpdate,
        wtLoadPage: wtLoadPage,
        bLoadPage: bLoadPage
    };
});

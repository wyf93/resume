define(function () {
  function init() {
    $$('.button').click(function () {
      mainView.loadPage('profile.html');
    })
  }

  return {
    init:init
  };
});

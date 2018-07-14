import Main from './page/Main';

const main = new Main();

// initial call required if there's no XHR calls in the page.
main.injectMain();

hookXHR(() => {
  main.injectMain();
});


function hookXHR(callback) {
  const rawOpen = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function () {
    this.addEventListener('readystatechange', function(state) {

      if (this.readyState !== 4) {
        return;
      }

      callback();

    }, false);

    rawOpen.apply(this, arguments);
  };
}
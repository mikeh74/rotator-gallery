
window.addEventListener('DOMContentLoaded', function() {
  const throttle = (function() {
    let waiting = false;

    return function(callback, limit) {
      if (waiting === false) {
        waiting = true;
        callback.call();
        setTimeout(function() {
          waiting = false;
        }, limit);
      }
    };
  })();

  els = document.querySelectorAll('.rg-item');

  let rightImage = 1;
  let activeImage = 0;
  let leftImage = els.length - 1;
  let returnImage = els.length - 2;

  const init = function() {
    window.requestAnimationFrame(() => {
      els[activeImage].classList.add('rg-item-active');
      els[rightImage].classList.add('rg-item-right');
      els[leftImage].classList.add('rg-item-left');
    });
  };

  const setClasses = function() {
    window.requestAnimationFrame(() => {
      els[activeImage].classList.add('rg-item-active');
      els[activeImage].classList.add('rg-item-ra');
      els[activeImage].classList.remove('rg-item-right');
      els[activeImage].classList.remove('rg-item-left');

      els[rightImage].classList.add('rg-item-ir');
      els[rightImage].classList.add('rg-item-right');
      els[rightImage].classList.remove('rg-item-left');
      els[rightImage].classList.remove('rg-item-active');

      els[leftImage].classList.add('rg-item-al');
      els[leftImage].classList.add('rg-item-left');
      els[leftImage].classList.remove('rg-item-right');
      els[leftImage].classList.remove('rg-item-active');

      els[returnImage].classList.add('rg-item-li');
      els[returnImage].classList.remove('rg-item-left');
      els[returnImage].classList.remove('rg-item-right');
      els[returnImage].classList.remove('rg-item-active');
    });
  };

  init();

  /**
   * Check the index against the the length of the array of image elements
   *
   * @param {Number} i
   * @return {Number}
   */
  const checkIndex = function(i) {
    if (i > els.length - 1) {
      return i - els.length;
    } else if (i < 0) {
      return els.length - Math.abs(i);
    } else {
      return i;
    }
  };

  /**
   * Return the active index
   * @return {Number}
   */
  const getActiveIndex = function() {
    let i;
    els.forEach((element, index) => {
      if (element.classList.contains('rg-item-active')) {
        i = index;
      }
    });
    return i;
  };

  /**
   * Shift the active element forward
   */
  const moveForward = function() {
    // move the index along
    rightImage = checkIndex(activeImage + 2);
    leftImage = checkIndex(activeImage);
    returnImage = checkIndex(activeImage - 1);
    activeImage = checkIndex(activeImage + 1);
  };

  const forward = function() {
    activeImage = getActiveIndex();
    moveForward();
    setClasses();
  };

  document.getElementById('forward')
      .addEventListener('click', function() {
        throttle(forward, 600);
      });

  const reverseClasses = function() {
    els[activeImage].classList.add('rg-item-active');
    els[activeImage].classList.add('rg-item-la');
    els[activeImage].classList.remove('rg-item-left');
    els[activeImage].classList.remove('rg-item-right');

    els[rightImage].classList.add('rg-item-ar');
    els[rightImage].classList.add('rg-item-right');
    els[rightImage].classList.remove('rg-item-left');
    els[rightImage].classList.remove('rg-item-active');

    els[leftImage].classList.add('rg-item-il');
    els[leftImage].classList.add('rg-item-left');
    els[leftImage].classList.remove('rg-item-right');
    els[leftImage].classList.remove('rg-item-active');

    els[returnImage].classList.add('rg-item-ri');
    els[returnImage].classList.remove('rg-item-left');
    els[returnImage].classList.remove('rg-item-right');
    els[returnImage].classList.remove('rg-item-active');
  };

  /**
   * Shift the active element backward
   */
  const moveBackward = function() {
    // move the index along
    activeImage = checkIndex(activeImage - 1);
    rightImage = checkIndex(activeImage + 1);
    leftImage = checkIndex(activeImage - 1);
    returnImage = checkIndex(activeImage + 2);
  };

  const back = function() {
    activeImage = getActiveIndex();
    moveBackward();
    reverseClasses();
  };

  document.getElementById('back')
      .addEventListener('click', function() {
        throttle(back, 600);
      });
});

const updateClass = function(e) {
  const element = e.target;

  element.classList.remove('rg-item-ra');
  element.classList.remove('rg-item-ar');
  element.classList.remove('rg-item-la');
  element.classList.remove('rg-item-al');
  element.classList.remove('rg-item-ir');
  element.classList.remove('rg-item-ri');
  element.classList.remove('rg-item-il');
  element.classList.remove('rg-item-li');
};

document.addEventListener('animationend', function(e) {
  updateClass(e);
});

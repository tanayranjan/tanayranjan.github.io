/* Keep card content readable when nearby dates would otherwise overlap. */
(function () {
  function placeJourneyCards() {
    var timeline = document.querySelector('.journey-timeline--desktop');
    if (!timeline || window.matchMedia('(max-width: 700px)').matches) return;

    ['education', 'experience'].forEach(function (type) {
      var anchors = Array.prototype.slice.call(
        timeline.querySelectorAll('.journey-duration-entry--' + type + ' .journey-card-anchor')
      ).sort(function (a, b) {
        return a.parentElement.offsetTop - b.parentElement.offsetTop;
      });
      var previousBottom = -Infinity;

      anchors.forEach(function (anchor) {
        anchor.style.removeProperty('--journey-card-shift');
        var top = anchor.parentElement.offsetTop;
        var shift = Math.max(0, previousBottom + 20 - top);
        anchor.style.setProperty('--journey-card-shift', shift + 'px');
        previousBottom = top + shift + anchor.offsetHeight;
      });
    });
  }

  window.addEventListener('load', placeJourneyCards);
  window.addEventListener('resize', placeJourneyCards);
})();

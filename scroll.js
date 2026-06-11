// Dateline — real current date in the masthead
(function () {
  var el = document.getElementById('dateline');
  if (!el) return;
  var d = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
  el.textContent = d + ' · San Diego, CA';
})();

// Uptime — days since Doudou launch
(function () {
  var els = document.querySelectorAll('[data-uptime]');
  if (!els.length) return;
  var launch = new Date('2025-12-01T00:00:00');
  var days = Math.floor((Date.now() - launch.getTime()) / 86400000);
  els.forEach(function (el) { el.textContent = days; });
})();

// Replay — streams the recorded Doudou session when it scrolls into view.
// Messages exist in the HTML (visible without JS / with reduced motion);
// the script only choreographs their entrance.
(function () {
  var feed = document.getElementById('replay-feed');
  if (!feed) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var steps = Array.prototype.slice.call(feed.querySelectorAll('[data-step]'));
  if (reduce || !('IntersectionObserver' in window)) return; // transcript already fully visible
  feed.closest('.replay').classList.add('replay--js');

  function typingDot() {
    var t = document.createElement('div');
    t.className = 'typing is-on';
    t.innerHTML = '<i></i><i></i><i></i>';
    return t;
  }

  function play() {
    var i = 0;
    function next() {
      if (i >= steps.length) return;
      var msg = steps[i];
      var t = typingDot();
      feed.insertBefore(t, msg);
      feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
      setTimeout(function () {
        t.remove();
        msg.classList.add('is-rendered');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { msg.classList.add('is-on'); });
        });
        feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
        i += 1;
        setTimeout(next, 1150);
      }, i === 0 ? 900 : 1250);
    }
    setTimeout(next, 500);
  }

  var seen = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !seen) {
        seen = true;
        io.disconnect();
        play();
      }
    });
  }, { threshold: 0.35 });
  io.observe(feed);
})();

// Scroll reveal — subtle fade-up; skipped for reduced motion, content
// visible by default without JS.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var targets = document.querySelectorAll(
    '.index .row, .index .subrows, .colophon__grid > *, .case__section, .outcomes, .board__cell, .wip'
  );

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

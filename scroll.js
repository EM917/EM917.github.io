// Scroll-reveal + in-focus scale boost
console.log('[scroll.js] loaded');

(function () {
  if (!('IntersectionObserver' in window)) return;

  const revealTargets = document.querySelectorAll(
    'section, .case__section, .project, .wip, .phone'
  );
  console.log('[scroll.js] reveal targets:', revealTargets.length);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  const focusTargets = document.querySelectorAll('section, .case__section');
  console.log('[scroll.js] focus targets:', focusTargets.length);

  const focusObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.4) {
          entry.target.classList.add('in-focus');
        } else {
          entry.target.classList.remove('in-focus');
        }
      });
    },
    { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
  );
  focusTargets.forEach((el) => focusObserver.observe(el));
})();

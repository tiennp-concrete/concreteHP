/**
 * Concrete HP Theme JS
 *
 * - Smooth-scroll for in-page anchor links (offset by sticky header height).
 * - Scroll-reveal animations: any element with `.zh-animated` gains
 *   `.is-visible` when it enters the viewport. Reads `data-animation` and
 *   optional `data-animation-delay` (ms) to drive the CSS keyframes defined
 *   in _animations.scss.
 */
document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.zh-header');

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            var headerHeight = header ? header.offsetHeight : 0;
            var targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        });
    });

    var animatedEls = document.querySelectorAll('.zh-animated');
    if (!animatedEls.length) return;

    function applyAnimation(el) {
        var name = el.getAttribute('data-animation');
        if (!name) return;
        var speed = el.getAttribute('data-animation-speed') || 'fast';
        var delay = parseInt(el.getAttribute('data-animation-delay'), 10);
        if (delay > 0) el.style.animationDelay = delay + 'ms';
        el.classList.add('animate__animated', 'animate__' + speed, 'animate__' + name);
    }

    if (!('IntersectionObserver' in window)) {
        animatedEls.forEach(applyAnimation);
        return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            applyAnimation(entry.target);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    animatedEls.forEach(function (el) { observer.observe(el); });
});

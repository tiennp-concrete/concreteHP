/**
 * Concrete HP Theme JS - Sun* Asterisk style
 * Header scroll, particles, counter animation, WOW, mobile menu
 */

document.addEventListener('DOMContentLoaded', function () {

    // ================================================================
    // WOW.js Initialization
    // ================================================================
    if (typeof WOW !== 'undefined') {
        new WOW({
            boxClass: 'wow',
            animateClass: 'animate__animated',
            offset: 80,
            mobile: true,
            live: true
        }).init();
    }

    // ================================================================
    // Particles.js Banner
    // ================================================================
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-banner')) {
        particlesJS('particles-banner', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: {
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: { enable: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 4,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.6 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });
    }

    // ================================================================
    // Header Scroll Effect
    // ================================================================
    var header = document.getElementById('site-header');

    function handleHeaderScroll() {
        if (!header) return;
        var scrollPos = window.scrollY || window.pageYOffset;

        if (scrollPos > 80) {
            header.classList.remove('bg-transparent');
            header.classList.add('on-scroll');
        } else {
            header.classList.add('bg-transparent');
            header.classList.remove('on-scroll');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initial check

    // ================================================================
    // Mobile Menu
    // ================================================================
    var menuToggle = document.querySelector('.menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    var mobileClose = document.querySelector('.mobile-menu-close');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflowY = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        if (mobileClose) {
            mobileClose.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflowY = '';
            });
        }

        // Close on link click
        var mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflowY = '';
            });
        });
    }

    // ================================================================
    // Counter Animation on Scroll
    // ================================================================
    var counters = document.querySelectorAll('.counter');
    var counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;

        counters.forEach(function (counter) {
            var rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                counterAnimated = true;
                var target = parseInt(counter.getAttribute('data-target'), 10);
                var duration = 2000;
                var step = target / (duration / 16);
                var current = 0;

                var timer = setInterval(function () {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            }
        });
    }

    if (counters.length > 0) {
        window.addEventListener('scroll', animateCounters);
        animateCounters(); // Check on load
    }

    // ================================================================
    // Smooth Scroll for Anchor Links
    // ================================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });
});

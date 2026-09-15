/* kiedywakacje.com — jQuery + jQuery UI */
(function ($) {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── daty liczone w przeglądarce ────────────────────────────
    // Build zapiekłby "najbliższy weekend" na dniu deployu, więc te dwie liczymy na żywo.
    var dateFns = {
        nextWeekend: function () {
            var today = new Date(), dow = today.getDay();
            var d = new Date(today);
            d.setDate(today.getDate() + (dow === 0 ? 6 : 6 - dow));
            d.setHours(0, 0, 0, 0);
            return d;
        },
        nextSylwester: function () {
            return new Date(new Date().getFullYear(), 11, 31);
        }
    };

    // ── motyw ──────────────────────────────────────────────────
    $('#theme-toggle').on('click', function () {
        var dark = $('html').toggleClass('dark').hasClass('dark');
        try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    });

    // ── odliczanie ─────────────────────────────────────────────
    var pad = function (n, len) { return String(n).padStart(len, '0'); };

    function tick() {
        $('.countdown').each(function () {
            var $c = $(this);
            var left = new Date($c.data('countdown')).getTime() - Date.now();
            var $done = $c.siblings('.countdown-done');

            if (left <= 0) {
                if ($c.is(':visible')) {
                    $c.hide();
                    // ponytail: zamiast canvasowego confetti — efekt bounce z jQuery UI.
                    $done.prop('hidden', false).effect('bounce', { times: 3, distance: 20 }, 800);
                }
                return;
            }
            if ($done.is(':visible')) { $done.prop('hidden', true); $c.show(); }

            var s = Math.floor(left / 1000);
            $c.find('.js-days').text(pad(Math.floor(s / 86400), 3));
            $c.find('.js-hours').text(pad(Math.floor(s / 3600) % 24, 2));
            $c.find('.js-minutes').text(pad(Math.floor(s / 60) % 60, 2));
            $c.find('.js-seconds').text(pad(s % 60, 2));
        });
    }

    if ($('.countdown').length) {
        // ponytail: odpytywanie zamiast setTimeout do granicy sekundy — 250 ms wystarczy i nie dryfuje.
        tick();
        setInterval(tick, 250);
    }

    // ── wybór wydarzenia (strona główna) ───────────────────────
    var $countdown = $('.countdown');

    function gcalDate(d) { return d.toISOString().replace(/-|:|\.\d{3}/g, ''); }

    function selectEvent($btn) {
        var fn = $btn.data('date-fn');
        var date = fn && dateFns[fn] ? dateFns[fn]() : new Date($btn.data('date'));
        var label = $btn.data('label');
        var endRaw = $btn.data('end-date');

        // trwa właśnie? — odliczaj do końca, tak jak robił to React
        if (endRaw) {
            var end = new Date(endRaw), now = new Date();
            if (now >= date && now < end) { date = end; label = $btn.data('end-label'); }
        }

        $countdown.data('countdown', date.toISOString());
        $('.js-label').text(label);
        $('.js-date').text(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear());
        $('.js-cal').attr('href',
            'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent($btn.data('title')) +
            '&dates=' + gcalDate(date) + '/' + gcalDate(date) +
            '&details=' + encodeURIComponent($btn.data('label')));
        tick();
    }

    $('.js-event').on('click', function () {
        $('.js-event, .js-winter-toggle').removeClass('is-active');
        $(this).addClass('is-active');
        $('.js-winter-group').removeClass('is-active');
        closeWinter();
        selectEvent($(this));
    });

    // ── ferie zimowe: rozwijana lista ──────────────────────────
    var $winterMenu = $('#winter-menu'), $winterToggle = $('.js-winter-toggle');
    // atrybut hidden trzyma menu zamknięte zanim wczyta się JS; dalej stanem rządzi już :visible,
    // bo efekty jQuery UI ustawiają display inline i atrybutu nie ruszają.
    $winterMenu.prop('hidden', false).hide();

    var blind = { effect: 'blind', duration: 200 };

    function closeWinter() {
        if (!$winterMenu.is(':visible')) return;
        $winterToggle.attr('aria-expanded', 'false').removeClass('is-open');
        reduceMotion ? $winterMenu.hide() : $winterMenu.hide(blind);
    }

    $winterToggle.on('click', function () {
        if ($winterMenu.is(':visible')) { closeWinter(); return; }
        $('.js-event').removeClass('is-active');
        $winterToggle.addClass('is-active is-open').attr('aria-expanded', 'true');
        reduceMotion ? $winterMenu.show() : $winterMenu.show(blind);
        $('.js-winter-group').first().trigger('click');   // jak w wersji React: otwarcie wybiera 1. grupę
    });

    $('.js-winter-group').on('click', function () {
        $('.js-winter-group').removeClass('is-active');
        $(this).addClass('is-active');
        $('.js-event').removeClass('is-active');
        $winterToggle.addClass('is-active');
        selectEvent($(this));
    });

    $('.js-event').first().addClass('is-active');

    // ── FAQ ────────────────────────────────────────────────────
    if ($('#faq-accordion').length) {
        $('#faq-accordion').accordion({
            header: '.faq-q',
            collapsible: true,
            active: false,
            heightStyle: 'content',
            icons: false
        });
    }

    // ── wejście (zamiast framer-motion) ────────────────────────
    function enter($el, fromTop, delay) {
        if (reduceMotion) return;
        $el.css({ opacity: 0, position: 'relative', top: fromTop })
            .delay(delay)
            .animate({ opacity: 1, top: 0 }, { duration: 600, easing: 'easeOutBack' });
    }

    enter($('.anim-pop'), 20, 0);
    enter($('.anim-drop'), -40, 300);
    $('.anim-stagger').each(function (i) { enter($(this), 20, i * 300); });

}(jQuery));

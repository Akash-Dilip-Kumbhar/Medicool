/*!
* jquery.countup.js (Fixed Version)
*/
(function ($) {
"use strict";

$.fn.countUp = function (options) {

    var settings = $.extend({
        time: 2000,
        delay: 10
    }, options);

    return this.each(function () {

        var $this = $(this);
        var $settings = settings;

        var counterUpper = function () {

            if (!$this.data('counterupTo')) {
                $this.data('counterupTo', $this.text());
            }

            var time = parseInt($this.data("counter-time")) > 0
                ? parseInt($this.data("counter-time"))
                : $settings.time;

            var delay = parseInt($this.data("counter-delay")) > 0
                ? parseInt($this.data("counter-delay"))
                : $settings.delay;

            var divisions = time / delay;
            var num = $this.data('counterupTo');

            // Safety check
            if (!num || isNaN(num.toString().replace(/,/g, ''))) {
                return;
            }

            var nums = [];

            var isComma = /[0-9]+,[0-9]+/.test(num);
            num = num.toString().replace(/,/g, '');

            var isInt = /^[0-9]+$/.test(num);
            var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
            var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

            // Generate numbers
            for (var i = divisions; i >= 1; i--) {

                var newNum = isInt
                    ? Math.round(num / divisions * i)
                    : (num / divisions * i).toFixed(decimalPlaces);

                if (isComma) {
                    newNum = newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }

                nums.unshift(newNum);
            }

            $this.data('counterup-nums', nums);
            $this.text('0');

            var f = function () {
                var nums = $this.data('counterup-nums');

                // FIX: prevent null error
                if (!nums || !nums.length) {
                    return;
                }

                $this.text(nums.shift());

                if (nums.length) {
                    setTimeout($this.data('counterup-func'), delay);
                } else {
                    $this.removeData('counterup-nums');
                    $this.removeData('counterup-func');
                }
            };

            $this.data('counterup-func', f);

            setTimeout(f, delay);
        };

        // Waypoint trigger (safe)
        if (typeof $.fn.waypoint === "function") {
            $this.waypoint(counterUpper, {
                offset: '100%',
                triggerOnce: true
            });
        } else {
            // fallback (runs immediately if waypoint missing)
            counterUpper();
        }

    });
};

})(jQuery);
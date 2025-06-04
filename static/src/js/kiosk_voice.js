odoo.define('hr_attendance_kiosk_limit.kiosk_voice', function (require) {
    "use strict";

    const publicWidget = require('web.public.widget');
    const ajax = require('web.ajax');

    function speak(text) {
        if ('speechSynthesis' in window) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            msg.lang = 'bg-BG';
            window.speechSynthesis.speak(msg);
        }
    }

    publicWidget.registry.KioskVoiceOverride = publicWidget.Widget.extend({
        selector: '.o_hr_attendance_kiosk_body',
        start: function () {
            this._super.apply(this, arguments);
            this._overrideBarcodeHandler();
        },

        _overrideBarcodeHandler: function () {
            const self = this;
            const form = this.$el.find('form.o_hr_attendance_kiosk_mode_form');
            if (!form.length) return;

            form.on('submit', function (ev) {
                ev.preventDefault();
                const barcode = form.find('input[name="barcode"]').val();
                if (!barcode) return;

                ajax.jsonRpc('/hr_attendance/attendance_scan', 'call', {
                    barcode: barcode,
                    mode: 'manual'
                }).then(function (result) {
                    let message = '';
                    if (result.success) {
                        message = result.success;
                        speak(result.success);
                    } else if (result.warning) {
                        message = result.warning;
                        speak(result.warning);
                    } else if (result.error) {
                        message = result.error;
                        speak(result.error);
                    }

                    let resultBox = self.$el.find('#custom_kiosk_result');
                    if (!resultBox.length) {
                        resultBox = $('<div id="custom_kiosk_result" style="font-size: 24px; margin-top: 10px;"></div>');
                        self.$el.append(resultBox);
                    }
                    resultBox.text(message).show();

                    // Скриване след 2 секунди
                    setTimeout(function () {
                        resultBox.fadeOut();
                    }, 2000);

                    form.find('input[name="barcode"]').val('').focus();
                });
            });
        }
    });
});

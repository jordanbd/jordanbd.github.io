'use strict';

define(['jquery', 'app/ui/templates'], function($, templates) {

    var $modal;
    var disabled = false;

    function open(opts) {
        if (disabled) {
            var deferred = $.Deferred()
            deferred.resolve();
            return deferred;
        }

        $modal = $(templates.getTemplate('modalTmpl')({
            text: opts.text
        }));
        $('body').append($modal);

        if (!opts.buttons) {
            opts.buttons = [{
                text: "OK"
            }];
        }

        var deferred = $.Deferred();

        var buttons = [];
        for (var i = 0; i < opts.buttons.length; i++) {
            var click = function(btn) {
                if (btn.apply) {
                    btn.apply();
                }
                $modal.dialog('close');
            }.bind(this, opts.buttons[i]);

            buttons.push({
                text: opts.buttons[i].text,
                click: click
            });
        }

        $modal.dialog({
            dialogClass: 'no-close',
            modal: true,
            resizable: false,
            closeOnEscape: false,
            close: function(event, ui) {
                $modal.remove();
                $modal = null;
                return deferred.resolve();
            },
            buttons: buttons,
            // http://jwcooney.com/2015/01/25/how-to-fix-a-jquery-ui-dialog-strangely-positioning-itself/
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "none"
            },
            create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }
        });

        return deferred.promise();
    }

    function disable() {
        disabled = true;
    }

    function enable() {
        disabled = false;
    }

    return {
        open: open,
        enable: enable,
        disable: disable
    }

});
'use strict';

define(['jquery', 'app/ui/templates'], function($, templates) {

    function render(opts) {

    }

    function open(opts) {
        var $modal = $(templates.getTemplate('modalTmpl')({
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

        console.debug('using buttons: %O', buttons);

        $modal.dialog({
            dialogClass: 'no-close',
            modal: true,
            resizable: false,
            closeOnEscape: false,
            close: function(event, ui) {
                $modal.remove();
                return deferred.resolve();
            },
            buttons: buttons
        });

        return deferred.promise();
    }

    return {
        open: open
    }

});
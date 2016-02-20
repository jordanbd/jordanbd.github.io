requirejs.config({
    shim : {
        "underscore": {
            exports: "_"
        },
        "emitter": {
            init: function() {
                return new Events();
            }
        },
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        }
    },
    // By default load any module IDs from js/lib
    baseUrl: "js/lib",
    // Except, if the module ID starts with "app", load it from the js/app directory.
    // Paths config is relative to the baseUrl, and never includes a ".js" extension since he paths config could be for a directory.
    paths: {
        "app": "../app",
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",
        "jquery-ui": "//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
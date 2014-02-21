/* global JS:false */

var run = function() {
    JS.Test.autorun();
};

var ROOT = JS.ENV.ROOT || '..';
// JS.cache = false;

JS.load(ROOT + '/lib/autolink.js',
        ROOT + '/tests/autolink_spec.js',
        // add files here as the project grows
        run);

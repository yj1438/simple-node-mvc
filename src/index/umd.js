(function (root, factory) {
    'use strict';
    if (typeof define === 'function') {
        if (define.amd) {
            define(['jquery'], factory);
        }
        if (define.cmd) {
            define(function (require, exports, module) {
                var $ = require('jquery');
                module.exports = factory($);
            });
        }
    } else if (typeof exports === 'object') {
        module.exprots = factory(require('jquery'));
    } else {
        root.MyUMDdemo = factory(root.jQuery);
    }
}(this, function ($) {
    'use strict';
    
}));
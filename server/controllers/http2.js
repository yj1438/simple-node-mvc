
'use strict';

import BaseController from '../lib/BaseController';

class Http2 extends BaseController {

    constructor(req, res) {
        super(req, res);
    }

    index() {
        this.render('/http2/index', {});
    }

    demo() {
        let sequence = [],
            i;
        for (i = 1; i <= 400; i++) {
            sequence.push({img: 'photo_' + (i + 1000 + '').slice(1) + '.png'});
        }
        this.render('http2/http-demo', {sequence: sequence, start_time: this.params.start_time});
    }

    static() {
        this.render('/http2/static', {});
    }

}

export default Http2;

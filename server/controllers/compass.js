/**
 * 指南针
 */
'use strict';

import BaseController from '../lib/BaseController';

class Compass extends BaseController {
    
    constructor(req, res) {
        super(req, res);
    }

    index() {
        this.render('compass/index', {});
    }
}

export default Compass;

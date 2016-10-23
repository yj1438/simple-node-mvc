/**
 * iscroll
 */

'use strict';

import BaseController from '../lib/BaseController';

class Iscroll extends BaseController {

    constructor(req, res) {
        super(req, res);
    }

    index() {
        this.render('iscroll/main', {})
    }

}

export default Iscroll;

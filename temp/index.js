'use strict';

import path from 'path';

import Main from './main';

class Index extends Main {
    constructor(childMsg = 'this is child msg') {
        super();
        this.child = childMsg;
    }

    sayThis() {
        console.log(this.child);
    }

};

setTimeout(() => {
    const index = new Index();
    index.say();
    index.sayThis();
}, 1000);

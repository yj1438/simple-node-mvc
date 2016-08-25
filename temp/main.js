'use strict';

class Main {
    constructor() {
        this.parent = 'this is parent msg';
    }

    say() {
        setTimeout(() => {
            console.log(this.parent);
        }, 500);
    }
}

export default Main;
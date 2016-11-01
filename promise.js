let promise = new Promise((resolve, reject) => {
    if (false) {
        reject('this is first error!');
        return;
    }
    resolve({aaa: '111'});
});

//console.log(promise);

let thenData = function () {
    /*
    promise.then((data) => {
        return new Promise((resolve, reject) => {
            if (false) {
                reject('this is second error!');
                return;
            }
            resolve(Object.assign(data, {bbb: '222'}));
        });
    });
    */
    let promise = new Promise((resolve, reject) => {
        if (1 === 0) {
            reject('this is first error!');
            return;
        }
        resolve({aaa: '111'});
    });
    return promise;
};

//console.log(thenData());

(async () => {
    try {
        let result = await thenData();
    	console.log(result);
    } catch (err) {
        console.log(err);
    }
    
})();